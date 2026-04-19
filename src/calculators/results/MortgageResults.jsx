import { formatCurrency, getRepaymentLabel } from "../../components/loan-calculator/utils";
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

function FundBar({ propertyPrice, maxLoanAmount, selfFund }) {
  const loanPercent = propertyPrice > 0 ? (maxLoanAmount / propertyPrice) * 100 : 0;
  const selfPercent = 100 - loanPercent;

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between text-sm">
        <span className="font-semibold text-slate-700">자금 구성</span>
        <span className="text-xs text-slate-400">주택 가격 {formatCurrency(propertyPrice)}</span>
      </div>
      <div className="flex h-8 w-full overflow-hidden rounded-full">
        <div
          className="flex items-center justify-center bg-emerald-500 text-xs font-bold text-white"
          style={{ width: `${Math.max(loanPercent, 10)}%` }}
        >
          대출 {loanPercent.toFixed(0)}%
        </div>
        <div
          className="flex items-center justify-center bg-slate-300 text-xs font-bold text-slate-700"
          style={{ width: `${Math.max(selfPercent, 10)}%` }}
        >
          자기자본 {selfPercent.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

export default function MortgageResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const {
    propertyPrice,
    maxByLtv,
    maxByDsr,
    maxLoanAmount,
    limitingFactor,
    selfFund,
    loan,
    estimatedDsr,
    dsrLimit,
  } = result;

  const hasLoan = maxLoanAmount > 0 && loan;

  return (
    <>
      {/* 핵심 요약 */}
      <section className="rounded-3xl bg-slate-900 p-6 shadow-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          대출 가능 금액
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl">
          {hasLoan ? formatCurrency(maxLoanAmount) : "대출 불가"}
        </p>
        {hasLoan && (
          <p className="mt-2 text-xs text-slate-500">
            {limitingFactor} 기준 · 자기자본 {formatCurrency(selfFund)} 필요
          </p>
        )}
      </section>

      {/* 자금 구성 바 */}
      {hasLoan && (
        <ResultCard>
          <FundBar propertyPrice={propertyPrice} maxLoanAmount={maxLoanAmount} selfFund={selfFund} />
        </ResultCard>
      )}

      {/* LTV vs DSR 비교 */}
      <ResultCard title="대출 한도 분석">
        <div className="grid grid-cols-2 gap-3">
          <MetricBox
            label="LTV 기준 한도"
            value={formatCurrency(maxByLtv)}
            sub={`LTV ${(input.ltv ?? 70)}%`}
            highlight={limitingFactor === "LTV"}
          />
          <MetricBox
            label="DSR 기준 한도"
            value={maxByDsr != null ? formatCurrency(maxByDsr) : "제한 없음"}
            sub={`DSR ${(dsrLimit * 100).toFixed(0)}%`}
            highlight={limitingFactor === "DSR"}
          />
          <MetricBox
            label="적용 한도"
            value={formatCurrency(maxLoanAmount)}
            sub={`${limitingFactor} 기준 적용`}
            highlight
          />
          <MetricBox
            label="필요 자기자본"
            value={formatCurrency(selfFund)}
            sub={`주택가의 ${propertyPrice > 0 ? ((selfFund / propertyPrice) * 100).toFixed(0) : 0}%`}
          />
        </div>
      </ResultCard>

      {/* 상환 정보 */}
      {hasLoan && (
        <ResultCard title="상환 정보">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox
              label="월 상환금"
              value={formatCurrency(loan.monthlyPayment)}
              sub={getRepaymentLabel(input.repaymentType)}
            />
            <MetricBox
              label="총 이자"
              value={formatCurrency(loan.totalInterest)}
              sub={`금리 ${input.annualRate}%`}
            />
            <MetricBox
              label="총 상환액"
              value={formatCurrency(loan.totalPayment)}
              sub={`${input.months}개월`}
            />
            <MetricBox
              label="예상 DSR"
              value={`${(estimatedDsr * 100).toFixed(1)}%`}
              sub={`한도 ${(dsrLimit * 100).toFixed(0)}%`}
              highlight={estimatedDsr < dsrLimit * 0.8}
            />
          </div>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={hasLoan ? `최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능` : null}
        disclaimer="실제 대출 한도는 금융기관 심사 기준에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
