import { calculateLoan } from "../../components/loan-calculator/utils";

/**
 * 자동차 / 할부 계산기 엔진
 * 차량 가격, 선수금, 할부 조건 기반 계산
 */
export default function autoEngine(input) {
  const {
    vehiclePrice,
    downPayment,
    annualRate,
    months,
    repaymentType,
    includeAcquisitionTax,
    acquisitionTaxRate,
  } = input;

  // ── 취득세 ──
  const effectiveTaxRate = includeAcquisitionTax ? (acquisitionTaxRate ?? 7) / 100 : 0;
  const acquisitionTax = Math.floor(vehiclePrice * effectiveTaxRate);
  const totalCost = vehiclePrice + acquisitionTax;

  // ── 대출 원금 ──
  const effectiveDown = Math.min(downPayment || 0, totalCost);
  const principal = Math.max(0, totalCost - effectiveDown);

  // ── 대출 계산 ──
  let loan = null;
  if (principal > 0 && months > 0) {
    loan = calculateLoan({
      principal,
      annualRate,
      months,
      graceMonths: 0,
      repaymentType: repaymentType || "equal_payment",
    });
  }

  // ── 총 비용 분석 ──
  const totalInterest = loan?.totalInterest ?? 0;
  const monthlyPayment = loan?.monthlyPayment ?? 0;
  const totalPayment = loan?.totalPayment ?? 0;
  const totalOutOfPocket = effectiveDown + totalPayment + acquisitionTax - (includeAcquisitionTax ? acquisitionTax : 0);
  // 실제 총 지출 = 선수금 + 대출 총상환 + 취득세 (취득세가 대출에 포함된 경우 중복 방지)

  // 이자 비율
  const interestRatio = principal > 0 ? totalInterest / principal : 0;

  return {
    vehiclePrice,
    acquisitionTax,
    totalCost,
    downPayment: effectiveDown,
    principal,
    loan,
    totalInterest,
    monthlyPayment,
    totalPayment,
    interestRatio,
    totalOutOfPocket: effectiveDown + totalPayment,
  };
}
