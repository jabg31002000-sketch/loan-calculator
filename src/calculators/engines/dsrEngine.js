import { calculateLoan } from "../../components/loan-calculator/utils";

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
    .filter((d) => {
      const bal = Number(String(d.balance).replace(/,/g, ""));
      const mp = Number(String(d.monthlyPayment).replace(/,/g, ""));
      return bal > 0 || mp > 0;
    })
    .map((d) => {
      const balance = Number(String(d.balance).replace(/,/g, ""));
      const rate = Number(d.rate) || 0;
      const monthlyPayment = Number(String(d.monthlyPayment).replace(/,/g, ""));
      const annualPayment = monthlyPayment * 12;
      totalExistingAnnualPayment += annualPayment;
      return { name: d.name || "기존 대출", balance, rate, monthlyPayment, annualPayment };
    });

  // ── 현재 DSR ──
  const currentDsr = annualIncome > 0 ? totalExistingAnnualPayment / annualIncome : 0;

  // ── 추가 대출 가능 연간 상환 여력 ──
  const maxAnnualRepayment = annualIncome * effectiveDsrLimit;
  const remainingAnnualCapacity = Math.max(0, maxAnnualRepayment - totalExistingAnnualPayment);
  const remainingMonthlyCapacity = remainingAnnualCapacity / 12;

  // ── 추가 가능 대출 금액 역산 ──
  // 월 상환 가능액으로부터 원금을 역산
  let maxLoanAmount = 0;
  const monthlyRate = desiredRate / 100 / 12;

  if (remainingMonthlyCapacity > 0 && desiredMonths > 0) {
    if (repaymentType === "equal_principal") {
      // 원금균등: 첫 회차가 가장 크므로 첫 회차 기준 역산
      // 첫 회차 = principal/months + principal*monthlyRate
      // capacity = P/M + P*r => P = capacity / (1/M + r)
      const denom = (1 / desiredMonths) + monthlyRate;
      maxLoanAmount = denom > 0 ? remainingMonthlyCapacity / denom : 0;
    } else if (repaymentType === "bullet") {
      // 만기일시: 월 이자만 납부
      // capacity = P * r => P = capacity / r
      maxLoanAmount = monthlyRate > 0 ? remainingMonthlyCapacity / monthlyRate : 0;
    } else {
      // 원리금균등: PMT 역산
      // PMT = P * r * (1+r)^n / ((1+r)^n - 1)
      // P = PMT * ((1+r)^n - 1) / (r * (1+r)^n)
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
