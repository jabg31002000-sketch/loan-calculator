import {
  calculateLoan,
  getBestRepaymentOption,
  getWorstRepaymentOption,
} from "../../components/loan-calculator/utils";

/**
 * 신용대출 계산 엔진
 * 기존 calculateLoan을 래핑하고, 비교/추천/절약 데이터도 함께 반환
 */
export default function creditEngine(input) {
  const result = calculateLoan(input);
  if (!result) return null;

  // 3가지 상환방식 비교
  const comparisonResults = [
    { title: "원리금균등상환", key: "equal_payment", data: calculateLoan({ ...input, repaymentType: "equal_payment" }) },
    { title: "원금균등상환", key: "equal_principal", data: calculateLoan({ ...input, repaymentType: "equal_principal" }) },
    { title: "만기일시상환", key: "bullet", data: calculateLoan({ ...input, repaymentType: "bullet" }) },
  ];

  // 추천
  const best = getBestRepaymentOption(comparisonResults);
  const worst = getWorstRepaymentOption(comparisonResults);
  const saving = Math.max(0, (worst?.data?.totalInterest ?? 0) - (best?.data?.totalInterest ?? 0));
  const currentVsBest = Math.max(0, (result.totalInterest ?? 0) - (best?.data?.totalInterest ?? 0));
  const recommendation = {
    best,
    worst,
    saving,
    currentVsBest,
    shouldChange: input.repaymentType !== best?.key,
  };

  // 금리 1%p 절약
  const lowerRate = Math.max(0, input.annualRate - 1);
  const lowerResult = calculateLoan({ ...input, annualRate: lowerRate });
  const savingsAtLowerRate = lowerResult ? Math.max(0, result.totalInterest - lowerResult.totalInterest) : 0;

  // 금리 민감도
  const ratePreviewResults = [-1, 0, 1]
    .map((diff) => {
      const previewRate = Math.max(0, input.annualRate + diff);
      const preview = calculateLoan({ ...input, annualRate: previewRate });
      return { label: `${previewRate.toFixed(1)}%`, diff, preview };
    })
    .filter((item) => item.preview);

  return {
    ...result,
    comparisonResults,
    recommendation,
    savingsAtLowerRate,
    ratePreviewResults,
  };
}
