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

function DsrGauge({ currentDsr, dsrLimit }) {
  const percent = Math.min(currentDsr * 100, 100);
  const limitPercent = dsrLimit * 100;

  let barColor = "bg-emerald-500";
  if (percent >= limitPercent) barColor = "bg-rose-500";
  else if (percent >= limitPercent * 0.8) barColor = "bg-amber-500";

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between">
        <span className="text-sm font-semibold text-[#0E2A3A]">현재 DSR</span>
        <span className={`text-2xl font-bold ${percent >= limitPercent ? "text-rose-600" : percent >= limitPercent * 0.8 ? "text-amber-600" : "text-emerald-600"}`}>
          {percent.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-[#E5E1DA]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
        {/* 기준선 */}
        <div
          className="absolute top-0 h-full w-0.5 bg-[#5E6E73]"
          style={{ left: `${Math.min(limitPercent, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#5E6E73]">
        <span>0%</span>
        <span className="font-semibold text-[#5E6E73]">기준 {limitPercent.toFixed(0)}%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export default function DsrResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const {
    annualIncome,
    parsedDebts,
    currentDsr,
    dsrLimit,
    totalExistingMonthlyPayment,
    remainingMonthlyCapacity,
    maxLoanAmount,
    newLoan,
    newDsr,
  } = result;

  const hasCapacity = maxLoanAmount > 0;

  return (
    <>
      {/* DSR 게이지 */}
      <section className="rounded-2xl bg-[#10353F] p-6 shadow-sm">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#E6D3BE]/60">
          DSR 분석 결과
        </p>
        <div className="rounded-2xl bg-white p-5">
          <DsrGauge currentDsr={currentDsr} dsrLimit={dsrLimit} />
        </div>
        {hasCapacity && (
          <p className="mt-4 text-center text-lg font-bold text-white">
            예상 대출 여력: 최대 약 {formatCurrency(maxLoanAmount)}
          </p>
        )}
        {!hasCapacity && currentDsr >= dsrLimit && (
          <p className="mt-4 text-center text-lg font-bold text-rose-400">
            추가 대출 여력 없음
          </p>
        )}
      </section>

      {/* 소득 & 부채 요약 */}
      <ResultCard title="소득 대비 부채 현황">
        <div className="grid grid-cols-2 gap-3">
          <MetricBox label="연 소득" value={formatCurrency(annualIncome)} sub="세전 기준" />
          <MetricBox label="기존 대출" value={`${parsedDebts.length}건`} sub={`월 상환 ${formatCurrency(totalExistingMonthlyPayment)}`} />
          <MetricBox
            label="DSR 기준상 남은 상환 여력"
            value={formatCurrency(remainingMonthlyCapacity)}
            sub={`DSR ${(dsrLimit * 100).toFixed(0)}% 기준`}
            highlight={remainingMonthlyCapacity > 0}
          />
          <MetricBox
            label="DSR 적용 기준"
            value={`${(dsrLimit * 100).toFixed(0)}%`}
            sub={`현재 ${(currentDsr * 100).toFixed(1)}%`}
          />
        </div>
      </ResultCard>

      {/* 기존 대출 목록 */}
      {parsedDebts.length > 0 && (
        <ResultCard title="기존 대출 내역">
          <div className="space-y-2">
            {parsedDebts.map((debt, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-[#F6F1EB] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#0E2A3A]">{debt.name}</p>
                  <p className="text-xs text-[#5E6E73]">잔액 {formatCurrency(debt.balance)} · 금리 {debt.rate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0E2A3A]">월 {formatCurrency(debt.monthlyPayment)}</p>
                  <p className="text-xs text-[#5E6E73]">연 {formatCurrency(debt.annualPayment)}</p>
                </div>
              </div>
            ))}
          </div>
        </ResultCard>
      )}

      {/* 추가 대출 시 예상 결과 */}
      {hasCapacity && newLoan && (
        <ResultCard title="추가 대출 시 예상">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox
              label="참고용 예상 한도"
              value={formatCurrency(maxLoanAmount)}
              highlight
            />
            <MetricBox
              label="예상 월 상환금"
              value={formatCurrency(newLoan.monthlyPayment)}
              sub={getRepaymentLabel(input.repaymentType)}
            />
            <MetricBox
              label="예상 총 이자"
              value={formatCurrency(newLoan.totalInterest)}
              sub={`금리 ${input.desiredRate}%`}
            />
            <MetricBox
              label="대출 후 예상 DSR"
              value={`${(newDsr * 100).toFixed(1)}%`}
              sub={`기준 ${(dsrLimit * 100).toFixed(0)}%`}
            />
          </div>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={hasCapacity ? `참고용 예상 한도 최대 약 ${formatCurrency(maxLoanAmount)}` : null}
        disclaimer="실제 DSR 및 대출 한도는 금융기관 심사 기준에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
