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

export default function AutoResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const {
    vehiclePrice,
    acquisitionTax,
    totalCost,
    downPayment,
    principal,
    loan,
    monthlyPayment,
    totalInterest,
    totalPayment,
    totalOutOfPocket,
  } = result;

  const hasLoan = principal > 0 && loan;

  return (
    <>
      {/* 핵심 요약 */}
      <section className="rounded-2xl bg-[#10353F] p-6 shadow-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E6D3BE]/60">
          {hasLoan ? "월 할부금" : "대출 불필요"}
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {hasLoan ? `월 ${formatCurrency(monthlyPayment)}` : "전액 현금 구매"}
        </p>
        {hasLoan && (
          <p className="mt-2 text-xs text-[#E6D3BE]/60">
            {input.months}개월 · 금리 {input.annualRate}% · {getRepaymentLabel(input.repaymentType)}
          </p>
        )}
      </section>

      {/* 비용 구성 */}
      <ResultCard title="비용 구성">
        <div className="grid grid-cols-2 gap-3">
          <MetricBox label="차량 가격" value={formatCurrency(vehiclePrice)} />
          {acquisitionTax > 0 && (
            <MetricBox
              label="취득세"
              value={formatCurrency(acquisitionTax)}
              sub={`${input.acquisitionTaxRate ?? 7}%`}
            />
          )}
          {downPayment > 0 && (
            <MetricBox
              label="선수금 (계약금)"
              value={formatCurrency(downPayment)}
              sub={`차량가의 ${vehiclePrice > 0 ? ((downPayment / vehiclePrice) * 100).toFixed(0) : 0}%`}
            />
          )}
          <MetricBox
            label="대출 원금"
            value={formatCurrency(principal)}
            sub={hasLoan ? "할부 대상 금액" : "대출 없음"}
            highlight={hasLoan}
          />
        </div>
      </ResultCard>

      {/* 상환 정보 */}
      {hasLoan && (
        <ResultCard title="상환 정보">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox
              label="월 상환금"
              value={formatCurrency(monthlyPayment)}
              sub={getRepaymentLabel(input.repaymentType)}
              highlight
            />
            <MetricBox
              label="총 이자"
              value={formatCurrency(totalInterest)}
              sub={`원금의 ${principal > 0 ? ((totalInterest / principal) * 100).toFixed(1) : 0}%`}
            />
            <MetricBox
              label="총 상환액"
              value={formatCurrency(totalPayment)}
              sub="원금 + 이자"
            />
            <MetricBox
              label="실제 총 지출"
              value={formatCurrency(totalOutOfPocket)}
              sub="선수금 + 총 상환액"
            />
          </div>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={hasLoan ? `월 ${formatCurrency(monthlyPayment)} · 총 이자 ${formatCurrency(totalInterest)}` : null}
        disclaimer="실제 할부 금리는 금융기관 및 딜러 조건에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
