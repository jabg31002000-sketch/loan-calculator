import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * 자동차/할부 계산기 해석기
 * 이자 부담, 월 상환금 중심 해석
 */
export default function autoInterpreter(input, result) {
  if (!result) return null;

  const { principal, monthlyPayment, totalInterest, interestRatio, loan } = result;

  if (principal <= 0) {
    return {
      text: "선수금이 차량 가격 이상이므로 대출이 필요하지 않습니다.",
      tone: "good",
      details: [],
    };
  }

  // 이자 비율이 높은 경우 (원금 대비 20% 이상)
  if (interestRatio >= 0.2) {
    return {
      text: `총 이자가 ${formatCurrency(totalInterest)}로, 대출 원금의 ${(interestRatio * 100).toFixed(0)}%에 달합니다. 기간을 줄이거나 선수금을 늘리는 것을 검토해보세요.`,
      tone: "caution",
      details: [
        `월 상환금: ${formatCurrency(monthlyPayment)}`,
        `총 이자: ${formatCurrency(totalInterest)}`,
        `이자 비율: 원금의 ${(interestRatio * 100).toFixed(1)}%`,
      ],
    };
  }

  // 이자 비율이 적당한 경우 (10~20%)
  if (interestRatio >= 0.1) {
    return {
      text: `월 ${formatCurrency(monthlyPayment)} 상환, 총 이자는 ${formatCurrency(totalInterest)}입니다.`,
      tone: "info",
      details: [
        `대출 원금: ${formatCurrency(principal)}`,
        `총 이자: ${formatCurrency(totalInterest)}`,
        `이자 비율: 원금의 ${(interestRatio * 100).toFixed(1)}%`,
      ],
    };
  }

  // 이자 부담이 적은 경우
  return {
    text: `월 ${formatCurrency(monthlyPayment)} 상환, 이자 부담이 적은 편입니다. 총 이자 ${formatCurrency(totalInterest)}.`,
    tone: "good",
    details: [
      `대출 원금: ${formatCurrency(principal)}`,
      `총 이자: ${formatCurrency(totalInterest)}`,
      `이자 비율: 원금의 ${(interestRatio * 100).toFixed(1)}%`,
    ],
  };
}
