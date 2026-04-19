import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * 전세 vs 월세 해석기
 */
export default function jeonseInterpreter(input, result) {
  if (!result) return null;

  const { isJeonseBetter, costDiff, periodMonths, breakEvenReturnRate, jeonse, rent } = result;
  const periodYears = Math.round(periodMonths / 12);
  const periodLabel = periodYears > 0 ? `${periodYears}년` : `${periodMonths}개월`;

  if (isJeonseBetter) {
    const details = [
      `전세 총 비용: 약 ${formatCurrency(jeonse.totalCost)}`,
      `월세 총 비용: 약 ${formatCurrency(rent.totalCost)}`,
    ];
    if (breakEvenReturnRate != null && breakEvenReturnRate > 0) {
      details.push(`보증금 투자수익률이 연 ${breakEvenReturnRate.toFixed(1)}% 이상이면 월세가 더 유리`);
    }
    return {
      text: `${periodLabel} 기준 전세가 월세보다 약 ${formatCurrency(costDiff)} 유리합니다.`,
      tone: "good",
      details,
    };
  }

  const details = [
    `전세 총 비용: 약 ${formatCurrency(jeonse.totalCost)}`,
    `월세 총 비용: 약 ${formatCurrency(rent.totalCost)}`,
  ];
  if (breakEvenReturnRate != null && breakEvenReturnRate > 0) {
    details.push(`보증금 투자수익률이 연 ${breakEvenReturnRate.toFixed(1)}% 이하이면 전세가 더 유리`);
  }

  return {
    text: `${periodLabel} 기준 월세가 전세보다 약 ${formatCurrency(costDiff)} 유리합니다.`,
    tone: "info",
    details,
  };
}
