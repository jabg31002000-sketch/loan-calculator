import { Home, Banknote } from "lucide-react";
import { formatCurrency } from "../../components/loan-calculator/utils";
import PrimaryCta from "../../components/shared/PrimaryCta";
import ResultCard from "../../components/shared/ResultCard";

function CostBar({ label, amount, maxAmount, color }) {
  const width = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#0E2A3A]">{label}</span>
        <span className="text-sm font-bold text-[#0E2A3A]">{formatCurrency(amount)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-[#F6F1EB]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function JeonseResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const { jeonse, rent, isJeonseBetter, costDiff, monthlyCostDiff, breakEvenReturnRate, periodMonths } = result;
  const maxCost = Math.max(jeonse.totalCost, rent.totalCost);
  const periodYears = Math.round(periodMonths / 12);
  const periodLabel = periodYears > 0 ? `${periodYears}년` : `${periodMonths}개월`;

  return (
    <>
      {/* 핵심 결론 */}
      <section className="rounded-2xl bg-[#10353F] p-6 shadow-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E6D3BE]/60">
          {periodLabel} 비교 결과
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {isJeonseBetter ? (
            <><span className="text-white">전세</span>가 약 {formatCurrency(costDiff)} 유리</>
          ) : (
            <><span className="text-[#E6D3BE]">월세</span>가 약 {formatCurrency(costDiff)} 유리</>
          )}
        </p>
        <p className="mt-2 text-xs text-[#E6D3BE]/60">
          월 기준 약 {formatCurrency(monthlyCostDiff)} 차이
        </p>
      </section>

      {/* 총 비용 비교 바 */}
      <ResultCard title="총 비용 비교">
        <div className="space-y-4">
          <CostBar label="전세" amount={jeonse.totalCost} maxAmount={maxCost} color="bg-[#10353F]" />
          <CostBar label="월세" amount={rent.totalCost} maxAmount={maxCost} color="bg-[#5E6E73]" />
        </div>
      </ResultCard>

      {/* 전세 상세 */}
      <ResultCard>
        <div className="flex items-center gap-2 mb-3">
          <Home className="h-4 w-4 text-[#10353F]" />
          <h3 className="text-sm font-bold text-[#0E2A3A]">전세 비용 내역</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs text-[#5E6E73]">전세대출 이자</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(jeonse.totalInterest)}</p>
            <p className="mt-0.5 text-xs text-[#5E6E73]">월 {formatCurrency(jeonse.monthlyInterest)}</p>
          </div>
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs text-[#5E6E73]">자기자금 기회비용</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(jeonse.opportunityCost)}</p>
            <p className="mt-0.5 text-xs text-[#5E6E73]">자기자금 {formatCurrency(jeonse.ownFunds)}</p>
          </div>
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs text-[#5E6E73]">대출 금액</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(jeonse.loanAmount)}</p>
          </div>
          <div className="rounded-xl bg-[#10353F]/5 p-3">
            <p className="text-xs font-medium text-[#10353F]">월 비용 환산</p>
            <p className="mt-1 text-base font-bold text-[#10353F]">{formatCurrency(jeonse.monthly)}</p>
          </div>
        </div>
      </ResultCard>

      {/* 월세 상세 */}
      <ResultCard>
        <div className="flex items-center gap-2 mb-3">
          <Banknote className="h-4 w-4 text-[#10353F]" />
          <h3 className="text-sm font-bold text-[#0E2A3A]">월세 비용 내역</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs text-[#5E6E73]">총 월세</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(rent.totalRent)}</p>
            <p className="mt-0.5 text-xs text-[#5E6E73]">월 {formatCurrency(input.monthlyRent)}</p>
          </div>
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs text-[#5E6E73]">보증금 기회비용</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(rent.opportunityCost)}</p>
            <p className="mt-0.5 text-xs text-[#5E6E73]">보증금 {formatCurrency(rent.deposit)}</p>
          </div>
          {rent.maintenanceDiff > 0 && (
            <div className="rounded-xl bg-[#F6F1EB] p-3">
              <p className="text-xs text-[#5E6E73]">관리비 차이</p>
              <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(rent.maintenanceDiff)}</p>
            </div>
          )}
          <div className="rounded-xl bg-[#10353F]/5 p-3">
            <p className="text-xs font-medium text-[#10353F]">월 비용 환산</p>
            <p className="mt-1 text-base font-bold text-[#10353F]">{formatCurrency(rent.monthly)}</p>
          </div>
        </div>
      </ResultCard>

      {/* 손익분기 투자수익률 */}
      {breakEvenReturnRate != null && breakEvenReturnRate > 0 && (
        <ResultCard title="투자수익률에 따른 판단">
          <p className="text-sm text-[#5E6E73]">
            보증금을 투자할 수 있다면, 연 <strong>{breakEvenReturnRate.toFixed(1)}%</strong> 이상의 수익률을 기대할 수 있을 때
            {isJeonseBetter ? " 월세가 전세보다 유리" : " 전세가 월세보다 유리"}해집니다.
          </p>
        </ResultCard>
      )}

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={isJeonseBetter ? "전세대출 금리를 비교해 더 절약해보세요" : null}
        disclaimer="실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
