import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * 정책 전세/월세 대출 해석기
 * mode별, productType별 해석이 실제로 달라짐
 */
export default function policyJeonseInterpreter(input, result) {
  if (!result) return null;

  const { mode, loanAmount, monthlyInterest, selfFund, affordabilityLevel, monthlyHousingCost, wasCapped, ratioWasClamped, rule, selfFundLevel } = result;

  // ── 전세대출 이자 (단순형) ──
  if (mode === "jeonseInterest") {
    return {
      text: `대출 ${formatCurrency(loanAmount)} 기준, 월 이자는 약 ${formatCurrency(monthlyInterest)}입니다.`,
      tone: "info",
      details: [
        `자기자금: ${formatCurrency(selfFund)}`,
        `총 이자: ${formatCurrency(result.totalInterest)}`,
      ],
    };
  }

  // ── 월세대출 ──
  if (mode === "monthlyRent") {
    const toneMap = { comfortable: "good", moderate: "caution", heavy: "warning" };
    const productLabel = rule?.label || "일반";
    const cappedNote = wasCapped ? ` (${productLabel} 상품한도 적용)` : "";

    const textMap = {
      comfortable: `월세 포함 총 주거비 ${formatCurrency(monthlyHousingCost)}로 소득 대비 무난한 수준입니다.${cappedNote}`,
      moderate: `월세 포함 총 주거비 ${formatCurrency(monthlyHousingCost)}입니다. 소득의 상당 부분을 차지하므로 여유자금을 확인하세요.${cappedNote}`,
      heavy: `월세 포함 총 주거비 ${formatCurrency(monthlyHousingCost)}로 부담이 큽니다. 보증금 비율을 낮추거나 다른 조건을 검토해보세요.${cappedNote}`,
    };

    const details = [
      `보증금 대출: ${formatCurrency(loanAmount)}`,
      `보증금 자기부담: ${formatCurrency(selfFund)}`,
      `월 이자: ${formatCurrency(monthlyInterest)} + 월세: ${formatCurrency(result.monthlyRent)}`,
    ];
    if (ratioWasClamped) details.push(`${productLabel} 상품 최대 비율 ${(rule.maxRatio * 100).toFixed(0)}% 적용됨`);
    if (wasCapped) details.push(`${productLabel} 상품 한도 ${formatCurrency(rule.loanCap)} 적용됨`);

    return {
      text: textMap[affordabilityLevel] || `총 주거비 ${formatCurrency(monthlyHousingCost)}입니다.`,
      tone: toneMap[affordabilityLevel] || "info",
      details,
    };
  }

  // ── 버팀목 ──
  const toneMap = { comfortable: "good", moderate: "caution", heavy: "warning" };
  const productLabel = rule?.label || "일반";
  const cappedNote = wasCapped ? ` (${productLabel} 상품한도 ${formatCurrency(rule.loanCap)} 적용)` : "";

  // 자기자금 부담이 핵심인 경우 vs 월 부담이 핵심인 경우
  const isSelfFundIssue = selfFundLevel === "heavy" || selfFundLevel === "moderate";

  let text;
  if (isSelfFundIssue && affordabilityLevel === "comfortable") {
    text = `월 부담은 무난하지만, 자기자금 ${formatCurrency(selfFund)}이 필요합니다. 초기 자금 마련이 관건입니다.${cappedNote}`;
  } else if (affordabilityLevel === "comfortable") {
    text = `${productLabel}형 기준 예상 대출금 ${formatCurrency(loanAmount)}, 월 부담 약 ${formatCurrency(result.monthlyPayment)}으로 무난합니다.${cappedNote}`;
  } else if (affordabilityLevel === "moderate") {
    text = `${productLabel}형 기준 예상 대출금 ${formatCurrency(loanAmount)}, 월 부담 약 ${formatCurrency(result.monthlyPayment)}입니다. 소득 대비 다소 부담이 있습니다.${cappedNote}`;
  } else {
    text = `${productLabel}형 기준 예상 대출금 ${formatCurrency(loanAmount)}, 월 부담 약 ${formatCurrency(result.monthlyPayment)}으로 부담이 큽니다.${cappedNote}`;
  }

  const details = [
    `필요 자기자금: ${formatCurrency(selfFund)} (보증금의 ${(result.selfFundRatio * 100).toFixed(0)}%)`,
    `총 이자: ${formatCurrency(result.totalInterest)}`,
  ];
  if (result.annualIncome > 0) {
    details.push(`소득 대비 부담률: ${(result.affordabilityRatio * 100).toFixed(1)}%`);
  }
  if (ratioWasClamped) details.push(`${productLabel} 상품 최대 비율 ${(rule.maxRatio * 100).toFixed(0)}% 적용됨`);
  if (wasCapped) details.push(`${productLabel} 상품 한도 ${formatCurrency(rule.loanCap)} 적용됨`);
  if (rule?.guidanceText) details.push(rule.guidanceText);

  return {
    text,
    tone: isSelfFundIssue && affordabilityLevel === "comfortable" ? "caution" : (toneMap[affordabilityLevel] || "info"),
    details,
  };
}
