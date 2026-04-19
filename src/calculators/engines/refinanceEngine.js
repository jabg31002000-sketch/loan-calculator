import { calculateLoan } from "../../components/loan-calculator/utils";

/**
 * 대환/갈아타기 계산 엔진
 * 현재 대출 vs 신규 대출을 비교하여 절약액, 손익분기점 계산
 */
export default function refinanceEngine(input) {
  const {
    currentBalance,
    currentRate,
    remainingMonths,
    currentRepayment,
    newRate,
    newMonths,
    newRepayment,
    switchingCost,
  } = input;

  // 현재 대출 계산
  const currentLoan = calculateLoan({
    principal: currentBalance,
    annualRate: currentRate,
    months: remainingMonths,
    graceMonths: 0,
    repaymentType: currentRepayment,
  });

  if (!currentLoan) return null;

  // 신규 대출 계산 (기간은 newMonths 또는 남은기간과 동일)
  const effectiveNewMonths = newMonths || remainingMonths;
  const effectiveNewRepayment = newRepayment || currentRepayment;
  const newLoan = calculateLoan({
    principal: currentBalance,
    annualRate: newRate,
    months: effectiveNewMonths,
    graceMonths: 0,
    repaymentType: effectiveNewRepayment,
  });

  if (!newLoan) return null;

  // 절약 계산
  const interestSaving = currentLoan.totalInterest - newLoan.totalInterest;
  const monthlySaving = currentLoan.monthlyPayment - newLoan.monthlyPayment;
  const totalSaving = interestSaving - (switchingCost || 0);
  const netSaving = Math.max(0, totalSaving);

  // 손익분기점 (대환 비용을 월 절약액으로 회수하는 데 걸리는 개월 수)
  let breakEvenMonths = null;
  if (switchingCost > 0 && monthlySaving > 0) {
    breakEvenMonths = Math.ceil(switchingCost / monthlySaving);
  }

  // 대환이 유리한지 판단
  const isWorthSwitch = totalSaving > 0;

  return {
    currentLoan,
    newLoan,
    interestSaving,
    monthlySaving,
    totalSaving,
    netSaving,
    switchingCost: switchingCost || 0,
    breakEvenMonths,
    isWorthSwitch,
    rateDiff: currentRate - newRate,
    // CalculatorPage에서 사용하는 표준 필드
    monthlyPayment: newLoan.monthlyPayment,
    totalInterest: newLoan.totalInterest,
    totalPayment: newLoan.totalPayment,
    rows: newLoan.rows,
  };
}
