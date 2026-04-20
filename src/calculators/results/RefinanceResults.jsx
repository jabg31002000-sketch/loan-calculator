import { ArrowDown, ArrowRight, TrendingDown } from "lucide-react";
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

export default function RefinanceResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const { currentLoan, newLoan, monthlySaving, interestSaving, totalSaving, switchingCost, breakEvenMonths, isWorthSwitch, rateDiff } = result;

  return (
    <>
      {/* 핵심 절약 요약 */}
      <section className="rounded-2xl bg-[#10353F] p-6 shadow-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E6D3BE]/60">
          {isWorthSwitch ? "대환 시 총 절약액" : "대환 결과"}
        </p>
        <p className={`mt-2 text-4xl font-bold tracking-tight sm:text-5xl ${isWorthSwitch ? "text-white" : "text-red-400"}`}>
          {isWorthSwitch ? `${formatCurrency(totalSaving)} 절약` : `${formatCurrency(Math.abs(totalSaving))} 손실`}
        </p>
        <p className="mt-2 text-xs text-[#E6D3BE]/60">
          금리 {input.currentRate}% → {input.newRate}% ({rateDiff > 0 ? `-${rateDiff.toFixed(1)}%p` : `+${Math.abs(rateDiff).toFixed(1)}%p`})
        </p>
      </section>

      {/* Before / After 비교 */}
      <ResultCard>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 현재 대출 */}
          <div>
            <p className="mb-3 text-sm font-bold text-[#0E2A3A] flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#5E6E73]" />
              현재 대출
            </p>
            <div className="space-y-2">
              <MetricBox label="월 상환금" value={formatCurrency(currentLoan.monthlyPayment)} sub={`${getRepaymentLabel(input.currentRepayment)}`} />
              <MetricBox label="총 이자" value={formatCurrency(currentLoan.totalInterest)} sub={`금리 ${input.currentRate}%`} />
              <MetricBox label="총 상환액" value={formatCurrency(currentLoan.totalPayment)} />
            </div>
          </div>

          {/* 새 대출 */}
          <div>
            <p className="mb-3 text-sm font-bold text-[#10353F] flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#10353F]" />
              갈아탈 대출
            </p>
            <div className="space-y-2">
              <MetricBox
                label="월 상환금"
                value={formatCurrency(newLoan.monthlyPayment)}
                sub={monthlySaving > 0 ? `월 ${formatCurrency(monthlySaving)} 절약` : null}
                highlight={monthlySaving > 0}
              />
              <MetricBox
                label="총 이자"
                value={formatCurrency(newLoan.totalInterest)}
                sub={interestSaving > 0 ? `${formatCurrency(interestSaving)} 절약` : null}
                highlight={interestSaving > 0}
              />
              <MetricBox label="총 상환액" value={formatCurrency(newLoan.totalPayment)} highlight={newLoan.totalPayment < currentLoan.totalPayment} />
            </div>
          </div>
        </div>
      </ResultCard>

      {/* 대환 비용 & 손익분기점 */}
      {switchingCost > 0 && (
        <ResultCard title="대환 비용 분석">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="대환 비용" value={formatCurrency(switchingCost)} sub="중도상환수수료 등" />
            <MetricBox
              label="손익분기점"
              value={breakEvenMonths ? `${breakEvenMonths}개월` : "-"}
              sub={breakEvenMonths ? `${breakEvenMonths}개월 후부터 이득` : "해당 없음"}
              highlight={breakEvenMonths != null}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <MetricBox label="이자 절약" value={formatCurrency(interestSaving)} />
            <MetricBox
              label="순 절약 (비용 차감)"
              value={formatCurrency(totalSaving)}
              highlight={totalSaving > 0}
            />
          </div>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={isWorthSwitch ? `갈아타면 약 ${formatCurrency(totalSaving)} 절약 가능` : null}
        disclaimer="실제 금리는 개인 신용 및 조건에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
