import { formatCurrency, getRepaymentLabel } from "../../components/loan-calculator/utils";
import PrimaryCta from "../../components/shared/PrimaryCta";
import ResultCard from "../../components/shared/ResultCard";

function MetricBox({ label, value, sub, highlight, warn }) {
  const bg = warn ? "bg-red-50" : highlight ? "bg-emerald-50" : "bg-slate-50";
  const labelColor = warn ? "text-red-600" : highlight ? "text-emerald-600" : "text-slate-500";
  const valueColor = warn ? "text-red-700" : highlight ? "text-emerald-700" : "text-slate-900";
  const subColor = warn ? "text-red-500" : highlight ? "text-emerald-500" : "text-slate-400";
  return (
    <div className={`rounded-xl p-4 ${bg}`}>
      <p className={`text-xs font-medium ${labelColor}`}>{label}</p>
      <p className={`mt-1 text-lg font-bold ${valueColor}`}>{value}</p>
      {sub && <p className={`mt-0.5 text-xs ${subColor}`}>{sub}</p>}
    </div>
  );
}

function PriceRangeBar({ propertyPrice, comfortableMax, standardMax }) {
  // 전체 스케일: standardMax의 120%
  const scale = standardMax > 0 ? standardMax * 1.2 : propertyPrice * 1.5;
  const comfortPct = Math.min((comfortableMax / scale) * 100, 100);
  const standardPct = Math.min((standardMax / scale) * 100, 100);
  const currentPct = Math.min((propertyPrice / scale) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="relative h-8 w-full rounded-full bg-slate-100 overflow-hidden">
        {/* 여유 구간 */}
        <div className="absolute h-full bg-emerald-200 rounded-l-full" style={{ width: `${comfortPct}%` }} />
        {/* 가능 구간 */}
        <div className="absolute h-full bg-amber-200" style={{ left: `${comfortPct}%`, width: `${Math.max(0, standardPct - comfortPct)}%` }} />
        {/* 현재 위치 마커 */}
        <div
          className="absolute top-0 h-full w-0.5 bg-slate-800"
          style={{ left: `${currentPct}%` }}
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-white">
            현재
          </div>
        </div>
      </div>
      <div className="flex justify-between text-[11px] text-slate-500">
        <span>0</span>
        <span className="text-emerald-600 font-medium">여유 ~{formatCurrency(comfortableMax)}</span>
        <span className="text-amber-600 font-medium">가능 ~{formatCurrency(standardMax)}</span>
      </div>
    </div>
  );
}

export default function FirstHomeResults({
  input,
  result,
  ctaUrl,
  ctaLabel,
  onCtaClick,
}) {
  const {
    propertyPrice,
    maxLoanAmount,
    limitingFactor,
    selfFund,
    loan,
    estimatedDsr,
    dsrLimit,
    affordabilityLevel,
    priceRange,
    rule,
    ltvWasCapped,
    maxByLtv,
    maxByDsr,
  } = result;

  const hasLoan = maxLoanAmount > 0 && loan;
  const hasPriceRange = priceRange && priceRange.comfortableMax > 0;

  return (
    <>
      {/* 핵심: 집값 구간 중심 */}
      <section className="rounded-3xl bg-slate-900 p-6 shadow-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          첫 집 예산 진단
        </p>
        {hasPriceRange ? (
          <>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {priceRange.priceVerdict === "comfortable" && <span className="text-emerald-400">여유 있는 구간</span>}
              {priceRange.priceVerdict === "stretched" && <span className="text-amber-400">가능하지만 부담</span>}
              {priceRange.priceVerdict === "over_budget" && <span className="text-red-400">예산 초과</span>}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {formatCurrency(propertyPrice)} 주택 · 자기자본 {formatCurrency(priceRange.availableCash)}
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl">
              {hasLoan ? formatCurrency(maxLoanAmount) : "대출 불가"}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              자기자본 {formatCurrency(selfFund)} 필요
            </p>
          </>
        )}
      </section>

      {/* 가능한 집값 구간 시각화 */}
      {hasPriceRange && (
        <ResultCard title="내 자금으로 가능한 집값 구간">
          <PriceRangeBar
            propertyPrice={propertyPrice}
            comfortableMax={priceRange.comfortableMax}
            standardMax={priceRange.standardMax}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricBox
              label="여유 있는 구간"
              value={`~${formatCurrency(priceRange.comfortableMax)}`}
              sub="DSR 25% 이하"
              highlight
            />
            <MetricBox
              label="가능한 최대 구간"
              value={`~${formatCurrency(priceRange.standardMax)}`}
              sub={`DSR ${(dsrLimit * 100).toFixed(0)}% 이하`}
            />
          </div>
        </ResultCard>
      )}

      {/* 자기자본 분석 */}
      {hasPriceRange && (
        <ResultCard title="자기자본 분석">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox
              label="보유 자기자본"
              value={formatCurrency(priceRange.availableCash)}
              highlight={priceRange.cashShortfall === 0}
            />
            <MetricBox
              label="필요 자기자본"
              value={formatCurrency(selfFund)}
              sub={priceRange.cashShortfall > 0 ? `부족분 ${formatCurrency(priceRange.cashShortfall)}` : "충족"}
              warn={priceRange.cashShortfall > 0}
              highlight={priceRange.cashShortfall === 0}
            />
          </div>
          {priceRange.cashShortfall > 0 && (
            <p className="mt-3 text-xs text-red-600 font-medium">
              현재 자기자본으로는 {formatCurrency(priceRange.cashShortfall)}이 부족합니다.
              주택 가격을 낮추거나 자기자본을 더 마련해야 합니다.
            </p>
          )}
          {priceRange.cashShortfall === 0 && (
            <p className="mt-3 text-xs text-emerald-600 font-medium">
              자기자본이 충분합니다. 여유분 {formatCurrency(priceRange.availableCash - selfFund)}은 취득세·이사비 등에 활용하세요.
            </p>
          )}
        </ResultCard>
      )}

      {/* 대출 한도 */}
      {hasLoan && (
        <ResultCard title="대출 한도 분석">
          <div className="grid grid-cols-2 gap-3">
            <MetricBox
              label="LTV 기준 한도"
              value={formatCurrency(maxByLtv)}
              sub={`LTV ${result.effectiveLtv}%`}
              highlight={limitingFactor === "LTV" || limitingFactor === "상품한도"}
            />
            <MetricBox
              label="DSR 기준 한도"
              value={maxByDsr != null ? formatCurrency(maxByDsr) : "제한 없음"}
              sub={`DSR ${(dsrLimit * 100).toFixed(0)}%`}
              highlight={limitingFactor === "DSR"}
            />
            <MetricBox
              label="최대 대출 가능"
              value={formatCurrency(maxLoanAmount)}
              sub={`${limitingFactor} 기준`}
              highlight
            />
            <MetricBox
              label="월 상환금"
              value={formatCurrency(loan.monthlyPayment)}
              sub={getRepaymentLabel(input.repaymentType)}
            />
          </div>
        </ResultCard>
      )}

      {/* 첫 집 구매 해석 */}
      <ResultCard title="첫 집 구매 판단">
        <p className="text-sm text-slate-600 leading-relaxed">
          {hasPriceRange && priceRange.priceVerdict === "comfortable" && (
            <>현재 자금 {formatCurrency(priceRange.availableCash)}과 소득 기준으로 {formatCurrency(propertyPrice)} 주택은 무리 없이 감당 가능합니다. 월 상환금 {formatCurrency(loan?.monthlyPayment || 0)}을 꾸준히 납부할 수 있고, 취득세·이사비 등 부대비용도 커버할 여력이 있습니다.</>
          )}
          {hasPriceRange && priceRange.priceVerdict === "stretched" && (
            <>대출은 가능하지만, {formatCurrency(propertyPrice)} 주택은 현재 조건에서 다소 부담되는 구간입니다. 월 상환금 {formatCurrency(loan?.monthlyPayment || 0)} 외에 생활비·비상자금 여유를 확인하세요. 보수적으로 {formatCurrency(priceRange.comfortableMax)} 이하를 권장합니다.</>
          )}
          {hasPriceRange && priceRange.priceVerdict === "over_budget" && (
            <>{formatCurrency(propertyPrice)} 주택은 현재 자기자본과 소득 기준으로 무리입니다. {formatCurrency(priceRange.cashShortfall)}의 추가 자금이 필요하며, 현재 조건에서는 {formatCurrency(priceRange.standardMax)} 이하의 주택을 추천합니다.</>
          )}
          {!hasPriceRange && hasLoan && (
            <>최대 약 {formatCurrency(maxLoanAmount)} 대출이 가능합니다. 첫 집 구매 시에는 대출 한도 외에 취득세·중개비 등 부대비용도 반드시 고려하세요.</>
          )}
          {!hasLoan && "현재 조건으로는 대출이 어렵습니다. 소득, 기존 대출, 또는 주택 가격을 재검토해보세요."}
        </p>
      </ResultCard>

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={hasPriceRange
          ? `여유 구간 ~${formatCurrency(priceRange.comfortableMax)}`
          : hasLoan ? `최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능` : null
        }
        disclaimer="실제 대출 한도는 금융기관 심사 기준에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />
    </>
  );
}
