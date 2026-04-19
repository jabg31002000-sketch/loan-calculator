import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * 대환 계산기 해석기
 * 절약 중심의 해석 메시지 생성
 */
export default function refinanceInterpreter(input, result) {
  if (!result) return null;

  const { isWorthSwitch, totalSaving, monthlySaving, breakEvenMonths, rateDiff, switchingCost } = result;

  // 금리 차이가 없는 경우
  if (rateDiff <= 0) {
    return {
      text: "새 금리가 현재 금리보다 높거나 같습니다. 대환 시 오히려 불리할 수 있으니 다른 조건을 확인해보세요.",
      tone: "warning",
      details: [],
    };
  }

  // 대환 비용 감안해도 유리한 경우
  if (isWorthSwitch && totalSaving > 1000000) {
    const details = [
      `월 상환금 약 ${formatCurrency(Math.abs(monthlySaving))} ${monthlySaving > 0 ? "절약" : "증가"}`,
      `총 이자 약 ${formatCurrency(result.interestSaving)} 절약`,
    ];
    if (switchingCost > 0) {
      details.push(`대환 비용 ${formatCurrency(switchingCost)} 감안 후 순 절약: ${formatCurrency(totalSaving)}`);
    }
    if (breakEvenMonths) {
      details.push(`${breakEvenMonths}개월 후부터 이득`);
    }
    return {
      text: `갈아타면 총 ${formatCurrency(totalSaving)}을 절약할 수 있습니다. 대환을 적극 검토해보세요!`,
      tone: "good",
      details,
    };
  }

  if (isWorthSwitch) {
    return {
      text: `갈아타면 약 ${formatCurrency(totalSaving)} 절약 가능합니다. 금액이 크지 않으니 대환 비용과 번거로움을 함께 고려해보세요.`,
      tone: "info",
      details: [
        `월 상환금 약 ${formatCurrency(Math.abs(monthlySaving))} ${monthlySaving > 0 ? "절약" : "증가"}`,
        switchingCost > 0 ? `대환 비용 ${formatCurrency(switchingCost)} 감안 후 순 절약: ${formatCurrency(totalSaving)}` : null,
      ].filter(Boolean),
    };
  }

  // 대환 비용이 절약액보다 큰 경우
  return {
    text: `대환 비용을 감안하면 현재 조건이 더 유리합니다. 대환 비용을 줄이거나 더 낮은 금리를 찾아보세요.`,
    tone: "caution",
    details: [
      `이자 절약: ${formatCurrency(result.interestSaving)}`,
      `대환 비용: ${formatCurrency(switchingCost)}`,
      `순 손실: ${formatCurrency(Math.abs(totalSaving))}`,
    ],
  };
}
