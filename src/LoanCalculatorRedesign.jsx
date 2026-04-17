import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSeo } from "./useSeo";
import { Bookmark, Copy } from "lucide-react";
import {
  BANK_RATES,
  PRIORITY_OPTIONS,
  formatInputNumber,
  buildScenarioSummary,
  calculateLoan,
  getBestRepaymentOption,
  getWorstRepaymentOption,
  getCtaUrl,
  trackCalculateEvent,
  trackSaveScenarioEvent,
  trackCtaClick,
  PURPOSE_DEFAULTS,
  getDiagnosis,
  getDiagnosisStyle,
  LoanHeroSection,
  LoanPurposeSelector,
  LoanQuickForm,
  LoanEmptyState,
  LoanResultSummary,
  LoanRecommendationCard,
  LoanSavingsCard,
  LoanPrimaryCta,
  LoanDetailAccordion,
  LoanRevisitHint,
  LoanFaqSection,
  LoanMobileStickyCta,
} from "./components/loan-calculator";

export default function LoanCalculatorRedesign() {
  const navigate = useNavigate();

  useSeo(
    "대출 이자 계산기 | 내 상황에 맞는 상환방식 비교 - LoanClock",
    "대출 이자 계산기로 월 납입금, 총 이자, 상환방식을 비교하세요. 내 상황에 맞는 추천까지 1분 안에 확인할 수 있습니다."
  );

  // ── 상태 ──
  const [loanPurpose, setLoanPurpose] = useState(null);
  const [priority, setPriority] = useState(null);
  const [principal, setPrincipal] = useState("");
  const [months, setMonths] = useState("");
  const [rate, setRate] = useState("");
  const [bank, setBank] = useState("직접입력");
  const [graceMonths, setGraceMonths] = useState("");
  const [hasGracePeriod, setHasGracePeriod] = useState("no");
  const [repaymentType, setRepaymentType] = useState("equal_payment");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submittedInput, setSubmittedInput] = useState(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);
  const inputRef = useRef(null);

  // ── localStorage 복원 ──
  useEffect(() => {
    const savedInputs = localStorage.getItem("loanCalculatorInputsV5");
    const savedScenarioList = localStorage.getItem("loanCalculatorSavedScenariosV4");

    if (savedInputs) {
      try {
        const parsed = JSON.parse(savedInputs);
        setBank(parsed.bank ?? "직접입력");
        setPrincipal(parsed.principal ?? "");
        setRate(parsed.rate ?? "");
        setMonths(parsed.months ?? "");
        setGraceMonths(parsed.graceMonths ?? "");
        setHasGracePeriod((parsed.graceMonths ?? 0) > 0 ? "yes" : "no");
        setRepaymentType(parsed.repaymentType ?? "equal_payment");
        setLoanPurpose(parsed.loanPurpose ?? null);
        setPriority(parsed.priority ?? null);
      } catch (err) {
        console.error("불러오기 실패", err);
      }
    }

    if (savedScenarioList) {
      try {
        setSavedScenarios(JSON.parse(savedScenarioList));
      } catch (err) {
        console.error("시나리오 불러오기 실패", err);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "loanCalculatorInputsV5",
      JSON.stringify({ bank, principal, rate, months, graceMonths, hasGracePeriod, repaymentType, loanPurpose, priority })
    );
  }, [isLoaded, bank, principal, rate, months, graceMonths, hasGracePeriod, repaymentType, loanPurpose, priority]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("loanCalculatorSavedScenariosV4", JSON.stringify(savedScenarios));
  }, [isLoaded, savedScenarios]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  // 우선목표 변경 시 상환방식 자동 설정
  useEffect(() => {
    if (!priority) return;
    const match = PRIORITY_OPTIONS.find((o) => o.value === priority);
    if (match) setRepaymentType(match.repayment);
  }, [priority]);

  // ── 계산 결과 ──
  const result = useMemo(() => {
    if (!submittedInput) return null;
    return calculateLoan(submittedInput);
  }, [submittedInput]);

  const comparisonResults = useMemo(() => {
    if (!submittedInput) return null;
    return [
      { title: "원리금균등상환", key: "equal_payment", data: calculateLoan({ ...submittedInput, repaymentType: "equal_payment" }) },
      { title: "원금균등상환", key: "equal_principal", data: calculateLoan({ ...submittedInput, repaymentType: "equal_principal" }) },
      { title: "만기일시상환", key: "bullet", data: calculateLoan({ ...submittedInput, repaymentType: "bullet" }) },
    ];
  }, [submittedInput]);

  const recommendation = useMemo(() => {
    if (!comparisonResults?.length || !submittedInput || !result) return null;
    const best = getBestRepaymentOption(comparisonResults);
    const worst = getWorstRepaymentOption(comparisonResults);
    const saving = Math.max(0, (worst?.data?.totalInterest ?? 0) - (best?.data?.totalInterest ?? 0));
    const currentVsBest = Math.max(0, (result?.totalInterest ?? 0) - (best?.data?.totalInterest ?? 0));
    return { best, worst, saving, currentVsBest, shouldChange: submittedInput.repaymentType !== best?.key };
  }, [comparisonResults, submittedInput, result]);

  const savingsAtLowerRate = useMemo(() => {
    if (!submittedInput || !result) return null;
    const lowerRate = Math.max(0, submittedInput.annualRate - 1);
    const lowerResult = calculateLoan({ ...submittedInput, annualRate: lowerRate });
    if (!lowerResult) return null;
    return Math.max(0, result.totalInterest - lowerResult.totalInterest);
  }, [submittedInput, result]);

  const diagnosis = useMemo(
    () => getDiagnosis({ result, submittedInput, savingsAtLowerRate, loanPurpose, priority, recommendation }),
    [result, submittedInput, savingsAtLowerRate, loanPurpose, priority, recommendation]
  );

  const ratePreviewResults = useMemo(() => {
    if (!submittedInput || !result) return [];
    return [-1, 0, 1]
      .map((diff) => {
        const previewRate = Math.max(0, submittedInput.annualRate + diff);
        const preview = calculateLoan({ ...submittedInput, annualRate: previewRate });
        return { label: `${previewRate.toFixed(1)}%`, diff, preview };
      })
      .filter((item) => item.preview);
  }, [submittedInput, result]);

  const comparisonChartData = comparisonResults?.map((item) => ({ name: item.title.replace("상환", ""), totalInterest: item.data?.totalInterest ?? 0 })) ?? [];

  const displaySavedScenarios = [...savedScenarios].reverse().map((item, index) => ({ ...item, displayName: `비교안 ${index + 1}` }));

  const savedScenarioChartData = displaySavedScenarios.map((item) => ({ name: item.displayName, monthlyPayment: item.result.monthlyPayment, totalInterest: item.result.totalInterest }));

  // ── 핸들러 ──
  const handleBankChange = (event) => {
    const selected = event.target.value;
    setBank(selected);
    if (selected === "직접입력") setRate("");
    else setRate(String(BANK_RATES[selected]));
  };

  const handleCalculate = useCallback(() => {
    const parsedPrincipal = Number(principal.replace(/,/g, ""));
    const parsedRate = Number(rate);
    const parsedMonths = Number(months);
    const parsedGraceMonths = hasGracePeriod === "yes" ? Number(graceMonths) : 0;

    if (!parsedPrincipal || parsedPrincipal <= 0) { setError("대출금액을 입력해주세요."); return; }
    if (!Number.isFinite(parsedRate) || parsedRate < 0) { setError("금리를 올바르게 입력해주세요."); return; }
    if (!parsedMonths || parsedMonths <= 0) { setError("대출기간(개월)을 입력해주세요."); return; }
    if (hasGracePeriod === "yes" && (!Number.isFinite(parsedGraceMonths) || parsedGraceMonths < 0)) { setError("거치기간을 올바르게 입력해주세요."); return; }
    if (parsedGraceMonths > parsedMonths) { setError("거치기간은 전체 대출기간보다 클 수 없습니다."); return; }

    setError("");
    trackCalculateEvent({ repaymentType, months: parsedMonths, graceMonths: parsedGraceMonths });

    setSubmittedInput({
      principal: parsedPrincipal,
      annualRate: parsedRate,
      months: parsedMonths,
      graceMonths: parsedGraceMonths,
      repaymentType,
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [principal, rate, months, graceMonths, hasGracePeriod, repaymentType]);

  const handleReset = () => {
    setSubmittedInput(null);
    setError("");
    setShowAdvanced(false);
    setHasGracePeriod("no");
    setGraceMonths("");
  };

  const handleSaveScenario = () => {
    if (!submittedInput || !result) return;
    const nextIndex = savedScenarios.length + 1;
    const scenario = { id: `${Date.now()}`, name: `비교안 ${nextIndex}`, bank, input: submittedInput, result, createdAt: new Date().toISOString() };
    setSavedScenarios((prev) => [scenario, ...prev].slice(0, 6));
    trackSaveScenarioEvent();
  };

  const handleDeleteScenario = (id) => {
    setSavedScenarios((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoadScenario = (scenario) => {
    setBank(scenario.bank ?? "직접입력");
    setPrincipal(formatInputNumber(String(scenario.input.principal)));
    setRate(String(scenario.input.annualRate));
    setMonths(String(scenario.input.months));
    setGraceMonths(scenario.input.graceMonths > 0 ? String(scenario.input.graceMonths) : "");
    setHasGracePeriod(scenario.input.graceMonths > 0 ? "yes" : "no");
    setRepaymentType(scenario.input.repaymentType);
    setSubmittedInput(scenario.input);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopySummary = async () => {
    if (!submittedInput || !result) return;
    try {
      await navigator.clipboard.writeText(buildScenarioSummary(submittedInput, result));
      setCopied(true);
    } catch (err) {
      console.error("복사 실패", err);
    }
  };

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasResult = result && submittedInput;
  const ctaUrl = hasResult ? getCtaUrl(submittedInput, result, savingsAtLowerRate) : "/compare";
  const ctaLabel = hasResult
    ? (PURPOSE_DEFAULTS[loanPurpose]?.ctaLabel ?? "지금보다 유리한 조건 확인하기")
    : "내 상황에 맞는 조건 확인하기";

  const handlePrimaryCtaClick = () => {
    trackCtaClick({ id: "result_primary", label: ctaLabel });
    navigate(ctaUrl);
  };

  const handleStickyCtaClick = () => {
    trackCtaClick({ id: "sticky_mobile", label: ctaLabel });
    navigate(ctaUrl);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 ${hasResult ? "pb-28 lg:pb-10" : ""}`}>
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">

        <LoanHeroSection />

        <LoanPurposeSelector loanPurpose={loanPurpose} onPurposeChange={setLoanPurpose} />

        <LoanQuickForm
          principal={principal} setPrincipal={setPrincipal}
          rate={rate} setRate={setRate}
          months={months} setMonths={setMonths}
          priority={priority} setPriority={setPriority}
          showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced}
          bank={bank} onBankChange={handleBankChange}
          hasGracePeriod={hasGracePeriod} setHasGracePeriod={setHasGracePeriod}
          graceMonths={graceMonths} setGraceMonths={setGraceMonths}
          repaymentType={repaymentType} setRepaymentType={setRepaymentType}
          onCalculate={handleCalculate} onReset={handleReset}
          error={error} hasResult={!!hasResult} inputRef={inputRef}
        />

        <div ref={resultRef}>
          {!hasResult ? (
            <LoanEmptyState />
          ) : (
            <div className="space-y-5">
              {diagnosis && (
                <section className={`rounded-2xl border px-5 py-4 ${getDiagnosisStyle(diagnosis.tone)}`}>
                  <p className="text-sm font-semibold leading-6">{diagnosis.text}</p>
                </section>
              )}

              <LoanResultSummary result={result} submittedInput={submittedInput} />

              <LoanRecommendationCard recommendation={recommendation} priority={priority} loanPurpose={loanPurpose} />

              <LoanSavingsCard result={result} submittedInput={submittedInput} savingsAtLowerRate={savingsAtLowerRate} />

              <LoanPrimaryCta ctaUrl={ctaUrl} ctaLabel={ctaLabel} savingsAtLowerRate={savingsAtLowerRate} onCtaClick={handlePrimaryCtaClick} />

              {/* 보조 액션 */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveScenario}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  비교안 저장
                </button>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "복사 완료" : "요약 복사"}
                </button>
              </div>

              <LoanDetailAccordion
                result={result}
                submittedInput={submittedInput}
                comparisonResults={comparisonResults}
                ratePreviewResults={ratePreviewResults}
                savedScenarios={savedScenarios}
                displaySavedScenarios={displaySavedScenarios}
                savedScenarioChartData={savedScenarioChartData}
                comparisonChartData={comparisonChartData}
                onDeleteScenario={handleDeleteScenario}
                onLoadScenario={handleLoadScenario}
              />

              <LoanRevisitHint onScrollToInput={scrollToInput} savedScenarios={savedScenarios} />
            </div>
          )}
        </div>

        <LoanFaqSection onScrollToInput={scrollToInput} />

        {/* Trust Note */}
        <section className="mb-8 rounded-2xl bg-slate-50 px-5 py-4 text-center">
          <p className="text-xs leading-5 text-slate-400">
            본 계산기는 참고용이며, 실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다.
            <br />
            LoanClock은 특정 금융 상품을 판매하거나 중개하지 않습니다.
          </p>
        </section>

      </div>

      {hasResult && (
        <LoanMobileStickyCta ctaUrl={ctaUrl} ctaLabel={ctaLabel} savingsAtLowerRate={savingsAtLowerRate} onCtaClick={handleStickyCtaClick} />
      )}
    </div>
  );
}
