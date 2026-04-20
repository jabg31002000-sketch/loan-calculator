import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSeo } from "../useSeo";
import { BANK_RATES } from "../components/loan-calculator/constants";
import HeroSection from "../components/shared/HeroSection";
import EmptyState from "../components/shared/EmptyState";
import DiagnosisBar from "../components/shared/DiagnosisBar";
import PrimaryCta from "../components/shared/PrimaryCta";
import MobileStickyCta from "../components/shared/MobileStickyCta";
import FaqSection from "../components/shared/FaqSection";
import DynamicForm from "../components/shared/DynamicForm";
import CalculatorNav from "./CalculatorNav";

export default function CalculatorPage({ config }) {
  const navigate = useNavigate();
  useSeo(config.seo.title, config.seo.description);

  // ── 상태 ──
  const [values, setValues] = useState(() => ({ ...config.defaults }));
  const [submittedValues, setSubmittedValues] = useState(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [bank, setBank] = useState("직접입력");

  const resultRef = useRef(null);
  const inputRef = useRef(null);

  // ── localStorage 복원 ──
  useEffect(() => {
    if (config.storageKey) {
      const saved = localStorage.getItem(config.storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed._values) {
            setValues((prev) => ({ ...prev, ...parsed._values }));
          }
          if (parsed._bank) setBank(parsed._bank);
        } catch (err) {
          console.error("입력 복원 실패", err);
        }
      }
    }
    if (config.scenarioStorageKey) {
      const savedList = localStorage.getItem(config.scenarioStorageKey);
      if (savedList) {
        try { setSavedScenarios(JSON.parse(savedList)); }
        catch (err) { console.error("시나리오 복원 실패", err); }
      }
    }
    setIsLoaded(true);
  }, [config.storageKey, config.scenarioStorageKey]);

  // ── localStorage 저장 ──
  useEffect(() => {
    if (!isLoaded || !config.storageKey) return;
    localStorage.setItem(config.storageKey, JSON.stringify({ _values: values, _bank: bank }));
  }, [isLoaded, values, bank, config.storageKey]);

  useEffect(() => {
    if (!isLoaded || !config.scenarioStorageKey) return;
    localStorage.setItem(config.scenarioStorageKey, JSON.stringify(savedScenarios));
  }, [isLoaded, savedScenarios, config.scenarioStorageKey]);

  // ── sideEffects ──
  useEffect(() => {
    if (!config.sideEffects) return;
    let updates = {};
    config.sideEffects.forEach((effect) => {
      const watchVal = values[effect.watch];
      if (watchVal != null) {
        const result = effect.apply(watchVal, values);
        if (result) updates = { ...updates, ...result };
      }
    });
    if (Object.keys(updates).length > 0) {
      setValues((prev) => {
        const next = { ...prev, ...updates };
        // 실제 변경이 있는 경우에만 업데이트
        const changed = Object.keys(updates).some((k) => prev[k] !== updates[k]);
        return changed ? next : prev;
      });
    }
  }, [config.sideEffects, ...( config.sideEffects?.map((e) => values[e.watch]) ?? [])]);

  // ── 계산 ──
  const result = useMemo(() => {
    if (!submittedValues) return null;
    return config.engine(submittedValues);
  }, [submittedValues, config]);

  // ── 해석 ──
  const interpretation = useMemo(() => {
    if (!result || !submittedValues) return null;
    return config.interpreter(submittedValues, result, { savedScenarios });
  }, [result, submittedValues, savedScenarios, config]);

  // ── CTA ──
  const ctaUrl = config.getCtaUrl?.(submittedValues, result, { savedScenarios }) ?? "/compare";
  const ctaLabel = config.getCtaLabel?.(result) ?? "더 나은 조건 확인하기";
  const ctaSubtext = config.getCtaSubtext?.(submittedValues, result) ?? null;

  // ── 핸들러 ──
  const handleFieldChange = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleBankChange = useCallback((e) => {
    const selected = e.target.value;
    setBank(selected);
    // bankPreset 필드에 자동 금리 입력
    if (selected === "직접입력") {
      const rateField = config.fields.find((f) => f.bankPreset);
      if (rateField) setValues((prev) => ({ ...prev, [rateField.key]: "" }));
    } else {
      const rateField = config.fields.find((f) => f.bankPreset);
      if (rateField) setValues((prev) => ({ ...prev, [rateField.key]: String(BANK_RATES[selected]) }));
    }
  }, [config.fields]);

  const handleCalculate = useCallback(() => {
    // config.parseValues가 있으면 사용, 없으면 values 그대로
    const parsed = config.parseValues ? config.parseValues(values) : values;

    // 유효성 검사
    const validationError = config.validate?.(parsed);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    // GA 추적
    config.trackCalculate?.(parsed);

    setSubmittedValues(parsed);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [values, config]);

  const handleReset = useCallback(() => {
    setSubmittedValues(null);
    setError("");
  }, []);

  const handleSaveScenario = useCallback(() => {
    if (!submittedValues || !result) return;
    const scenario = {
      id: `${Date.now()}`,
      name: `비교안 ${savedScenarios.length + 1}`,
      bank,
      input: submittedValues,
      result,
      createdAt: new Date().toISOString(),
    };
    setSavedScenarios((prev) => [scenario, ...prev].slice(0, 6));
    config.trackSaveScenario?.();
  }, [submittedValues, result, bank, savedScenarios.length, config]);

  const handleDeleteScenario = useCallback((id) => {
    setSavedScenarios((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleLoadScenario = useCallback((scenario) => {
    if (scenario.bank) setBank(scenario.bank);
    if (config.restoreValues) {
      setValues(config.restoreValues(scenario.input));
    }
    setSubmittedValues(scenario.input);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [config]);

  const scrollToInput = useCallback(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePrimaryCtaClick = useCallback(() => {
    config.trackCtaClick?.({ id: "result_primary", label: ctaLabel });
    navigate(ctaUrl);
  }, [ctaUrl, ctaLabel, navigate, config]);

  const handleStickyCtaClick = useCallback(() => {
    config.trackCtaClick?.({ id: "sticky_mobile", label: ctaLabel });
    navigate(ctaUrl);
  }, [ctaUrl, ctaLabel, navigate, config]);

  const hasResult = result && submittedValues;
  const ResultComponent = config.ResultComponent;

  return (
    <div className={`min-h-screen bg-[#F6F1EB] text-[#0E2A3A] ${hasResult ? "pb-28 lg:pb-10" : ""}`}>
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">

        <CalculatorNav />

        <HeroSection
          title={config.hero.title}
          subtitle={config.hero.subtitle}
          badge={config.hero.badge}
        />

        {config.infoParagraph && (
          <p className="mb-10 rounded-2xl border border-[#E5E1DA] bg-white px-6 py-5 text-[14px] leading-relaxed text-[#5E6E73] shadow-sm">
            {config.infoParagraph}
          </p>
        )}

        <DynamicForm
          fields={config.fields}
          values={values}
          onFieldChange={handleFieldChange}
          onSubmit={handleCalculate}
          onReset={handleReset}
          error={error}
          hasResult={!!hasResult}
          inputRef={inputRef}
          bankState={{ bank, onBankChange: handleBankChange }}
          formTitle={config.formTitle}
          formSubtitle={config.formSubtitle}
          submitLabel={config.submitLabel}
        />

        <div ref={resultRef}>
          {!hasResult ? (
            <EmptyState
              message={config.emptyStateMessage}
              hint={config.emptyStateHint}
            />
          ) : (
            <div className="space-y-5">
              <DiagnosisBar interpretation={interpretation} />

              {ResultComponent && (
                <ResultComponent
                  input={submittedValues}
                  result={result}
                  interpretation={interpretation}
                  savedScenarios={savedScenarios}
                  onSaveScenario={handleSaveScenario}
                  onDeleteScenario={handleDeleteScenario}
                  onLoadScenario={handleLoadScenario}
                  ctaUrl={ctaUrl}
                  ctaLabel={ctaLabel}
                  ctaSubtext={ctaSubtext}
                  onCtaClick={handlePrimaryCtaClick}
                  onScrollToInput={scrollToInput}
                />
              )}
            </div>
          )}
        </div>

        <FaqSection
          items={config.faqItems}
          onScrollToInput={scrollToInput}
          title={config.faqTitle}
          subtitle={config.faqSubtitle}
        />

        {/* Trust Note */}
        <section className="mb-8 mt-14 rounded-2xl border border-[#E5E1DA] bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-semibold text-[#7A868B]">안내</p>
          <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[#7A868B]">
            <li>본 계산 결과는 참고용이며, 실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다.</li>
            <li>금리, 한도, 상환 조건 등은 개인 신용 및 담보 상황에 따라 변동됩니다.</li>
            <li>LoanClock은 특정 금융 상품을 판매하거나 중개하지 않습니다.</li>
          </ul>
        </section>
      </div>

      {hasResult && (
        <MobileStickyCta
          ctaUrl={ctaUrl}
          ctaLabel={ctaLabel}
          subtext={ctaSubtext}
          onCtaClick={handleStickyCtaClick}
        />
      )}
    </div>
  );
}
