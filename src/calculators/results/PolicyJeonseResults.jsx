import { formatCurrency } from "../../components/loan-calculator/utils";
import PrimaryCta from "../../components/shared/PrimaryCta";
import ResultCard from "../../components/shared/ResultCard";

function MetricBox({ label, value, sub, highlight }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? "bg-emerald-50" : "bg-slate-50"}`}>
      <p className={`text-xs font-medium ${highlight ? "text-emerald-600" : "text-slate-500"}`}>{label}</p>
      <p className={`mt-1 text-lg font-bold ${highlight ? "text-emerald-700" : "text-slate-900"}`}>{value}</p>
      {sub && <p className={`mt-0.5 text-xs ${highlight ? "text-emerald-500" : "text-slate-400"}`}>{sub}</p>}
    </div>
  );
}

function AffordabilityBadge({ level }) {
  const map = {
    comfortable: { label: "무난", color: "bg-emerald-100 text-emerald-700" },
    moderate: { label: "다소 부담", color: "bg-amber-100 text-amber-700" },
    heavy: { label: "부담 큼", color: "bg-red-100 text-red-700" },
  };
  const info = map[level];
  if (!info) return null;
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${info.color}`}>
      {info.label}
    </span>
  );
}

function CapNotice({ wasCapped, ratioWasClamped, rule }) {
  if (!wasCapped && !ratioWasClamped) return null;
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
      <p className="text-xs font-medium text-amber-700">
        {wasCapped && `${rule.label} 상품 한도(${formatCurrency(rule.loanCap)})가 적용되었습니다.`}
        {ratioWasClamped && !wasCapped && `${rule.label} 상품 최대 대출비율(${(rule.maxRatio * 100).toFixed(0)}%)이 적용되었습니다.`}
      </p>
    </div>
  );
}

export default function PolicyJeonseResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const { mode, loanAmount, selfFund, monthlyInterest, totalInterest, months } = result;

  // ── 전세대출 이자 (단순형) ──
  if (mode === "jeonseInterest") {
    return (
      <>
        <section className="rounded-3xl bg-slate-900 p-6 shadow-lg text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">전세대출 이자</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl">
            월 {formatCurrency(monthlyInterest)}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            대출원금 {formatCurrency(loanAmount)} · {months}개월
          </p>
        </section>

        <ResultCard title="상세 내역">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="대출원금" value={formatCurrency(loanAmount)} />
            <MetricBox label="월 이자" value={formatCurrency(monthlyInterest)} highlight />
            <MetricBox label="총 이자" value={formatCurrency(totalInterest)} sub={`${months}개월 기준`} />
            <MetricBox label="필요 자기자금" value={formatCurrency(selfFund)} />
          </div>
        </ResultCard>

        <PrimaryCta
          ctaUrl={ctaUrl}
          ctaLabel={ctaLabel}
          subtext={`월 이자 약 ${formatCurrency(monthlyInterest)}`}
          disclaimer="실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다"
          onCtaClick={onCtaClick}
        />
      </>
    );
  }

  // ── 월세대출 ──
  if (mode === "monthlyRent") {
    const { monthlyRent, monthlyHousingCost, affordabilityLevel, annualIncome, wasCapped, ratioWasClamped, rule } = result;
    return (
      <>
        <section className="rounded-3xl bg-slate-900 p-6 shadow-lg text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">월 주거비 총액</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl">
            {formatCurrency(monthlyHousingCost)}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            월세 {formatCurrency(monthlyRent)} + 대출이자 {formatCurrency(monthlyInterest)}
          </p>
          <div className="mt-3">
            <AffordabilityBadge level={affordabilityLevel} />
          </div>
        </section>

        <CapNotice wasCapped={wasCapped} ratioWasClamped={ratioWasClamped} rule={rule} />

        <ResultCard title="주거비 내역">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="월세" value={formatCurrency(monthlyRent)} />
            <MetricBox label="월 대출이자" value={formatCurrency(monthlyInterest)} />
            <MetricBox
              label="월 주거비 총액"
              value={formatCurrency(monthlyHousingCost)}
              sub={annualIncome > 0 ? `소득 대비 ${(result.affordabilityRatio * 100).toFixed(1)}%` : undefined}
              highlight
            />
            <MetricBox label="총 이자" value={formatCurrency(totalInterest)} sub={`${months}개월`} />
          </div>
        </ResultCard>

        <ResultCard title="보증금 정보">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="보증금 대출액" value={formatCurrency(loanAmount)} />
            <MetricBox label="보증금 자기부담" value={formatCurrency(selfFund)} highlight />
          </div>
        </ResultCard>

        {annualIncome > 0 && (
          <ResultCard title="소득 대비 주거비 비율">
            <div className="flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    affordabilityLevel === "comfortable" ? "bg-emerald-500" :
                    affordabilityLevel === "moderate" ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(result.affordabilityRatio * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-bold text-slate-700">
                {(result.affordabilityRatio * 100).toFixed(1)}%
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              월 소득 {formatCurrency(annualIncome / 12)} 기준 · 주거비(월세+이자) {formatCurrency(monthlyHousingCost)}
            </p>
          </ResultCard>
        )}

        <PrimaryCta
          ctaUrl={ctaUrl}
          ctaLabel={ctaLabel}
          subtext={affordabilityLevel === "heavy" ? "주거비 부담이 높습니다. 조건을 조정해보세요" : `월 주거비 총액 약 ${formatCurrency(monthlyHousingCost)}`}
          disclaimer="실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다"
          onCtaClick={onCtaClick}
        />
      </>
    );
  }

  // ── 버팀목 전세대출 ──
  const { monthlyPayment, affordabilityLevel, graceMonths, annualIncome, wasCapped, ratioWasClamped, rule, selfFundRatio, selfFundLevel } = result;
  return (
    <>
      {/* 핵심: 대출 가능액 + 자기자금 */}
      <section className="rounded-3xl bg-slate-900 p-6 shadow-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {rule?.label || ""} 예상 대출금
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl">
          {formatCurrency(loanAmount)}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          자기자금 {formatCurrency(selfFund)} 필요 (보증금의 {(selfFundRatio * 100).toFixed(0)}%)
        </p>
        <div className="mt-3">
          <AffordabilityBadge level={affordabilityLevel} />
        </div>
      </section>

      <CapNotice wasCapped={wasCapped} ratioWasClamped={ratioWasClamped} rule={rule} />

      {/* 자기자금 강조 카드 */}
      <ResultCard title="전세 진입 자금">
        <div className="grid grid-cols-2 gap-3">
          <MetricBox label="필요 자기자금" value={formatCurrency(selfFund)} sub={`보증금의 ${(selfFundRatio * 100).toFixed(0)}%`} highlight={selfFundLevel !== "ok"} />
          <MetricBox label="예상 대출금" value={formatCurrency(loanAmount)} highlight={selfFundLevel === "ok"} />
          <MetricBox label="월 부담금" value={formatCurrency(monthlyPayment)} sub={graceMonths > 0 ? `거치 ${graceMonths}개월 후` : "거치기간 없음"} />
          <MetricBox label="총 이자" value={formatCurrency(totalInterest)} sub={`${months}개월 기준`} />
        </div>
        {selfFundLevel === "heavy" && (
          <p className="mt-3 text-xs text-amber-600 font-medium">
            보증금의 절반 이상을 자기자금으로 준비해야 합니다. 보증금을 낮추거나, 대출비율이 높은 상품을 검토해보세요.
          </p>
        )}
      </ResultCard>

      {annualIncome > 0 && (
        <ResultCard title="소득 대비 부담률">
          <div className="flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  affordabilityLevel === "comfortable" ? "bg-emerald-500" :
                  affordabilityLevel === "moderate" ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.min(result.affordabilityRatio * 100, 100)}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-700">
              {(result.affordabilityRatio * 100).toFixed(1)}%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            월 소득 {formatCurrency(annualIncome / 12)} 기준 · 월 부담금 {formatCurrency(monthlyPayment)}
          </p>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={`자기자금 ${formatCurrency(selfFund)} · 대출 ${formatCurrency(loanAmount)}`}
        disclaimer="실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
