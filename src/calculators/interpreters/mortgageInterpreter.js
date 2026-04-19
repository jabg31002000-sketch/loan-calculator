import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * 주담대 계산기 해석기
 * LTV/DSR 제한 요인 중심 해석
 */
export default function mortgageInterpreter(input, result) {
  if (!result) return null;

  const { maxLoanAmount, limitingFactor, selfFund, estimatedDsr, dsrLimit, propertyPrice, loan } = result;

  if (maxLoanAmount <= 0) {
    return {
      text: "현재 조건으로는 대출이 어렵습니다. 소득, 기존 대출, 또는 DSR 한도를 확인해보세요.",
      tone: "warning",
      details: [
        `제한 요인: ${limitingFactor}`,
        `필요 자기자본: ${formatCurrency(propertyPrice)}`,
      ],
    };
  }

  const loanRatio = maxLoanAmount / propertyPrice;
  const dsrPercent = (estimatedDsr * 100).toFixed(1);
  const limitPercent = (dsrLimit * 100).toFixed(0);

  // DSR이 한도에 가까운 경우
  if (estimatedDsr >= dsrLimit * 0.9) {
    return {
      text: `최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능하지만, DSR ${dsrPercent}%로 한도에 근접합니다. 자기자본 ${formatCurrency(selfFund)}이 필요합니다.`,
      tone: "caution",
      details: [
        `제한 요인: ${limitingFactor}`,
        `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
        `DSR ${dsrPercent}% / 한도 ${limitPercent}%`,
      ],
    };
  }

  // 정상 범위
  return {
    text: `최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능합니다 (${limitingFactor} 기준). 자기자본 약 ${formatCurrency(selfFund)}이 필요합니다.`,
    tone: "good",
    details: [
      `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
      `총 이자: ${formatCurrency(loan.totalInterest)}`,
      `DSR ${dsrPercent}% / 한도 ${limitPercent}%`,
    ],
  };
}
