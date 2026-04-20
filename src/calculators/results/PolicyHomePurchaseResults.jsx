import { formatCurrency, getRepaymentLabel } from "../../components/loan-calculator/utils";
import PrimaryCta from "../../components/shared/PrimaryCta";
import ResultCard from "../../components/shared/ResultCard";

function MetricBox({ label, value, sub, highlight }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? "bg-[#10353F]/5" : "bg-[#F6F1EB]"}`}>
      <p className={`text-xs font-medium ${highlight ? "text-[#10353F]" : "text-[#5E6E73]"}`}>{label}</p>
      <p className={`mt-1 text-lg font-bold ${highlight ? "text-[#10353F]" : "text-[#0E2A3A]"}`}>{value}</p>
      {sub && <p className={`mt-0.5 text-xs ${highlight ? "text-[#10353F]/70" : "text-[#5E6E73]"}`}>{sub}</p>}
    </div>
  );
}

function FundBar({ propertyPrice, maxLoanAmount, selfFund }) {
  const loanPercent = propertyPrice > 0 ? (maxLoanAmount / propertyPrice) * 100 : 0;
  const selfPercent = 100 - loanPercent;
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between text-sm">
        <span className="font-semibold text-[#0E2A3A]">자금 구성</span>
        <span className="text-xs text-[#5E6E73]">주택 가격 {formatCurrency(propertyPrice)}</span>
      </div>
      <div className="flex h-8 w-full overflow-hidden rounded-full">
        <div className="flex items-center justify-center bg-[#10353F] text-xs font-bold text-white" style={{ width: `${Math.max(loanPercent, 10)}%` }}>
          대출 {loanPercent.toFixed(0)}%
        </div>
        <div className="flex items-center justify-center bg-[#E5E1DA] text-xs font-bold text-[#0E2A3A]" style={{ width: `${Math.max(selfPercent, 10)}%` }}>
          자기자본 {selfPercent.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

export default function PolicyHomePurchaseResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const {
    mode,
    propertyPrice,
    maxByLtv,
    maxByDsr,
    maxLoanAmount,
    limitingFactor,
    selfFund,
    loan,
    estimatedDsr,
    dsrLimit,
    affordabilityLevel,
    rule,
    ltvWasCapped,
    stabilityInfo,
  } = result;

  const hasLoan = maxLoanAmount > 0 && loan;
  const productLabel = rule?.label || "";
  const isBogeumjari = mode === "bogeumjari";

  return (
    <>
      {/* 핵심 요약 */}
      <section className="rounded-2xl bg-[#10353F] p-6 shadow-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E6D3BE]/60">
          {productLabel && `${productLabel}형 `}대출 가능 금액
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {hasLoan ? formatCurrency(maxLoanAmount) : "대출 불가"}
        </p>
        {hasLoan && (
          <p className="mt-2 text-xs text-[#E6D3BE]/60">
            {limitingFactor} 기준 · 자기자본 {formatCurrency(selfFund)} 필요
            {ltvWasCapped && ` · ${productLabel} 상품한도 적용`}
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
            sub={`LTV ${result.effectiveLtv}%${ltvWasCapped ? " · 상품한도 적용" : ""}`}
            highlight={limitingFactor === "LTV" || limitingFactor === "상품한도"}
          />
          <MetricBox
            label="DSR 기준 한도"
            value={maxByDsr != null ? formatCurrency(maxByDsr) : "제한 없음"}
            sub={`DSR ${(dsrLimit * 100).toFixed(0)}%`}
            highlight={limitingFactor === "DSR"}
          />
          <MetricBox
            label="최종 적용 한도"
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
        <ResultCard title={isBogeumjari ? "장기 상환 정보" : "상환 정보"}>
          <div className="grid grid-cols-2 gap-3">
            <MetricBox
              label="월 상환금"
              value={formatCurrency(loan.monthlyPayment)}
              sub={getRepaymentLabel(input.repaymentType)}
              highlight={isBogeumjari}
            />
            <MetricBox
              label="총 이자"
              value={formatCurrency(loan.totalInterest)}
              sub={`금리 ${input.annualRate}%${isBogeumjari ? " 고정" : ""}`}
              highlight={isBogeumjari}
            />
            <MetricBox
              label="총 상환액"
              value={formatCurrency(loan.totalPayment)}
              sub={`${input.months}개월 (${Math.round(input.months / 12)}년)`}
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

      {/* 보금자리론 전용: 장기 상환 안정성 */}
      {isBogeumjari && stabilityInfo && hasLoan && (
        <ResultCard title="장기 상환 안정성">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                stabilityInfo.stabilityLevel === "stable" ? "bg-emerald-100 text-emerald-700" :
                stabilityInfo.stabilityLevel === "caution" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              }`}>
                {stabilityInfo.stabilityLevel === "stable" ? "안정적" :
                 stabilityInfo.stabilityLevel === "caution" ? "주의 필요" : "부담 큼"}
              </span>
              <span className="text-xs text-[#5E6E73]">{stabilityInfo.totalYears}년 고정금리</span>
            </div>
            <p className="text-sm text-[#5E6E73]">
              {stabilityInfo.stabilityLevel === "stable" && `월 상환금 ${formatCurrency(loan.monthlyPayment)}은 소득의 ${(stabilityInfo.monthlyToIncomeRatio * 100).toFixed(1)}%로, ${stabilityInfo.totalYears}년간 안정적으로 상환 가능합니다.`}
              {stabilityInfo.stabilityLevel === "caution" && `월 상환금이 소득의 ${(stabilityInfo.monthlyToIncomeRatio * 100).toFixed(1)}%입니다. ${stabilityInfo.totalYears}년간 고정금리로 변동은 없지만, 비상자금을 확보하세요.`}
              {stabilityInfo.stabilityLevel === "risky" && `월 상환금이 소득의 ${(stabilityInfo.monthlyToIncomeRatio * 100).toFixed(1)}%로 높습니다. 대출 기간 연장이나 대출액 축소를 검토하세요.`}
            </p>
            <p className="text-xs text-[#5E6E73]">
              총 이자 {formatCurrency(loan.totalInterest)}은 원금의 {(stabilityInfo.interestToLoanRatio * 100).toFixed(0)}%입니다.
            </p>
          </div>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={hasLoan ? `${productLabel ? productLabel + "형 " : ""}최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능` : null}
        disclaimer="실제 대출 한도는 금융기관 심사 기준에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
