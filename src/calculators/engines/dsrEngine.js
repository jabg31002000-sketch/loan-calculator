import { calculateLoan } from "../../components/loan-calculator/utils";
import { computeAnnualPayment } from "../../components/shared/DsrDebtListInput";

const LOAN_TYPE_LABELS = {
  credit: "신용대출",
  mortgage: "주택담보대출",
  jeonse: "전세대출",
  auto: "자동차 할부",
  cardloan: "카드론/현금서비스",
  revolving: "마이너스통장",
  other: "기타 대출",
};

/**
 * DSR / 대출한도 계산 엔진
 * 연소득, 기존 부채 목록 기반으로 DSR을 계산하고 추가 대출 가능 금액 역산
 */
export default function dsrEngine(input) {
  const {
    annualIncome,
    existingDebts,
    desiredRate,
    desiredMonths,
    dsrLimit,
    repaymentType,
  } = input;

  const effectiveDsrLimit = (dsrLimit ?? 40) / 100;

  // ── 기존 부채 연간 원리금 상환액 합산 ──
  const debts = Array.isArray(existingDebts) ? existingDebts : [];
  let totalExistingAnnualPayment = 0;

  const parsedDebts = debts
    .map((d) => {
      const annualPayment = computeAnnualPayment(d);
      if (annualPayment <= 0) return null;
      totalExistingAnnualPayment += annualPayment;
      const monthlyPayment = annualPayment / 12;

      // Extract display info
      const balance = Number(String(d.balance || d.usedAmount || "").replace(/,/g, "")) || 0;
      const rate = Number(d.rate || d.revolvingRate || 0);

      return {
        name: LOAN_TYPE_LABELS[d.loanType] || "기타 대출",
        loanType: d.loanType,
        balance,
        rate,
        monthlyPayment,
        annualPayment,
      };
    })
    .filter(Boolean);

  // ── 현재 DSR ──
  const currentDsr = annualIncome > 0 ? totalExistingAnnualPayment / annualIncome : 0;

  // ── 추가 대출 가능 연간 상환 여력 ──
  const maxAnnualRepayment = annualIncome * effectiveDsrLimit;
  const remainingAnnualCapacity = Math.max(0, maxAnnualRepayment - totalExistingAnnualPayment);
  const remainingMonthlyCapacity = remainingAnnualCapacity / 12;

  // ── 추가 가능 대출 금액 역산 ──
  let maxLoanAmount = 0;
  const monthlyRate = desiredRate / 100 / 12;

  if (remainingMonthlyCapacity > 0 && desiredMonths > 0) {
    if (repaymentType === "equal_principal") {
      const denom = (1 / desiredMonths) + monthlyRate;
      maxLoanAmount = denom > 0 ? remainingMonthlyCapacity / denom : 0;
    } else if (repaymentType === "bullet") {
      maxLoanAmount = monthlyRate > 0 ? remainingMonthlyCapacity / monthlyRate : 0;
    } else {
      if (monthlyRate === 0) {
        maxLoanAmount = remainingMonthlyCapacity * desiredMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, desiredMonths);
        maxLoanAmount = remainingMonthlyCapacity * (factor - 1) / (monthlyRate * factor);
      }
    }
  }

  maxLoanAmount = Math.max(0, Math.floor(maxLoanAmount));

  // ── 추가 대출 시 예상 결과 ──
  let newLoan = null;
  let newDsr = currentDsr;
  if (maxLoanAmount > 0) {
    newLoan = calculateLoan({
      principal: maxLoanAmount,
      annualRate: desiredRate,
      months: desiredMonths,
      graceMonths: 0,
      repaymentType: repaymentType || "equal_payment",
    });
    if (newLoan) {
      const newAnnualPayment = newLoan.monthlyPayment * 12;
      newDsr = annualIncome > 0 ? (totalExistingAnnualPayment + newAnnualPayment) / annualIncome : 0;
    }
  }

  return {
    annualIncome,
    parsedDebts,
    totalExistingAnnualPayment,
    totalExistingMonthlyPayment: totalExistingAnnualPayment / 12,
    currentDsr,
    dsrLimit: effectiveDsrLimit,
    remainingAnnualCapacity,
    remainingMonthlyCapacity,
    maxLoanAmount,
    newLoan,
    newDsr,
    desiredRate,
    desiredMonths,
    // CalculatorPage 표준
    monthlyPayment: remainingMonthlyCapacity,
    totalInterest: newLoan?.totalInterest ?? 0,
    totalPayment: newLoan?.totalPayment ?? 0,
  };
}
