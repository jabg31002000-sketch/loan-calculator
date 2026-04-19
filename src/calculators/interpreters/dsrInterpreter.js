import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * DSR 계산기 해석기
 * 소득 대비 부채 비율 중심 해석
 */
export default function dsrInterpreter(input, result) {
  if (!result) return null;

  const { currentDsr, dsrLimit, maxLoanAmount, remainingMonthlyCapacity, parsedDebts } = result;
  const dsrPercent = (currentDsr * 100).toFixed(1);
  const limitPercent = (dsrLimit * 100).toFixed(0);

  // DSR이 이미 한도 초과
  if (currentDsr >= dsrLimit) {
    return {
      text: `현재 DSR ${dsrPercent}%로 이미 한도(${limitPercent}%)를 초과했습니다. 기존 대출 상환을 먼저 검토해보세요.`,
      tone: "warning",
      details: [
        `기존 대출 ${parsedDebts.length}건`,
        `월 상환액 합계: ${formatCurrency(result.totalExistingMonthlyPayment)}`,
        `추가 대출 여력 없음`,
      ],
    };
  }

  // 여력은 있지만 빠듯한 경우
  if (currentDsr >= dsrLimit * 0.8) {
    return {
      text: `현재 DSR ${dsrPercent}%로 한도에 가깝습니다. 추가로 최대 약 ${formatCurrency(maxLoanAmount)}까지 가능하지만 신중하게 검토하세요.`,
      tone: "caution",
      details: [
        `추가 가능 금액: 약 ${formatCurrency(maxLoanAmount)}`,
        `추가 시 월 상환 여력: ${formatCurrency(remainingMonthlyCapacity)}`,
        `DSR ${limitPercent}% 기준`,
      ],
    };
  }

  // 여유 있는 경우
  if (maxLoanAmount > 0) {
    return {
      text: `현재 DSR ${dsrPercent}%입니다. 추가로 최대 약 ${formatCurrency(maxLoanAmount)}까지 대출 가능합니다.`,
      tone: "good",
      details: [
        `추가 가능 금액: 약 ${formatCurrency(maxLoanAmount)}`,
        `추가 시 월 상환 여력: ${formatCurrency(remainingMonthlyCapacity)}`,
        `DSR ${limitPercent}% 기준`,
      ],
    };
  }

  return {
    text: `현재 DSR ${dsrPercent}%입니다. 소득 정보를 확인해주세요.`,
    tone: "info",
    details: [],
  };
}
