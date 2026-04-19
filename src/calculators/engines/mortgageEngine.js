import { calculateLoan } from "../../components/loan-calculator/utils";

/**
 * 주담대 / 내 집 대출 가능 계산기 엔진
 * 주택 가격, LTV, DSR 기반으로 대출 가능 금액과 상환 스케줄 계산
 */
export default function mortgageEngine(input) {
  const {
    propertyPrice,
    ltv,
    annualIncome,
    dsrLimit,
    existingMonthlyPayment,
    annualRate,
    months,
    repaymentType,
    graceMonths,
  } = input;

  // ── LTV 기준 최대 대출액 ──
  const ltvRatio = (ltv ?? 70) / 100;
  const maxByLtv = Math.floor(propertyPrice * ltvRatio);

  // ── DSR 기준 최대 대출액 (역산) ──
  let maxByDsr = Infinity;
  const effectiveDsrLimit = (dsrLimit ?? 40) / 100;

  if (annualIncome > 0) {
    const maxAnnualRepayment = annualIncome * effectiveDsrLimit;
    const existingAnnual = (existingMonthlyPayment || 0) * 12;
    const remainingAnnual = Math.max(0, maxAnnualRepayment - existingAnnual);
    const remainingMonthly = remainingAnnual / 12;

    if (remainingMonthly > 0 && months > 0) {
      const monthlyRate = annualRate / 100 / 12;

      if (repaymentType === "equal_principal") {
        const denom = (1 / months) + monthlyRate;
        maxByDsr = denom > 0 ? remainingMonthly / denom : 0;
      } else if (repaymentType === "bullet") {
        maxByDsr = monthlyRate > 0 ? remainingMonthly / monthlyRate : 0;
      } else {
        // 원리금균등
        if (monthlyRate === 0) {
          maxByDsr = remainingMonthly * months;
        } else {
          const factor = Math.pow(1 + monthlyRate, months);
          maxByDsr = remainingMonthly * (factor - 1) / (monthlyRate * factor);
        }
      }
      maxByDsr = Math.max(0, Math.floor(maxByDsr));
    } else {
      maxByDsr = 0;
    }
  }

  // ── 실제 대출 가능액 = min(LTV, DSR) ──
  const maxLoanAmount = Math.min(maxByLtv, maxByDsr);
  const limitingFactor = maxByLtv <= maxByDsr ? "LTV" : "DSR";

  // ── 자기자본 (필요 자금) ──
  const selfFund = Math.max(0, propertyPrice - maxLoanAmount);

  // ── 대출 상환 시뮬레이션 ──
  let loan = null;
  if (maxLoanAmount > 0) {
    loan = calculateLoan({
      principal: maxLoanAmount,
      annualRate,
      months,
      graceMonths: graceMonths || 0,
      repaymentType: repaymentType || "equal_payment",
    });
  }

  // ── DSR 계산 ──
  const existingAnnual = (existingMonthlyPayment || 0) * 12;
  const newMonthlyPayment = loan?.monthlyPayment ?? 0;
  const newAnnualPayment = newMonthlyPayment * 12;
  const totalAnnualPayment = existingAnnual + newAnnualPayment;
  const estimatedDsr = annualIncome > 0 ? totalAnnualPayment / annualIncome : 0;

  return {
    propertyPrice,
    maxByLtv,
    maxByDsr: maxByDsr === Infinity ? null : maxByDsr,
    maxLoanAmount,
    limitingFactor,
    selfFund,
    loan,
    ltvRatio,
    dsrLimit: effectiveDsrLimit,
    estimatedDsr,
    annualIncome,
    existingMonthlyPayment: existingMonthlyPayment || 0,
    // CalculatorPage 표준
    monthlyPayment: loan?.monthlyPayment ?? 0,
    totalInterest: loan?.totalInterest ?? 0,
    totalPayment: loan?.totalPayment ?? 0,
  };
}
