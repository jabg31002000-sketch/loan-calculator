import { formatCurrency } from "../../components/loan-calculator/utils";

/**
 * 정책 주택구입 대출 해석기
 * mode별, productType별 해석이 실제로 달라짐
 */
export default function policyHomePurchaseInterpreter(input, result) {
  if (!result) return null;

  const { maxLoanAmount, limitingFactor, selfFund, estimatedDsr, dsrLimit, propertyPrice, loan, affordabilityLevel, mode, rule, ltvWasCapped, priceRange, stabilityInfo } = result;

  const productLabel = rule?.label || "";

  if (maxLoanAmount <= 0) {
    const text = mode === "firstHome"
      ? "현재 조건으로는 대출이 어렵습니다. 자기자본을 늘리거나, 주택 가격을 낮춰보세요."
      : "현재 조건으로는 대출이 어렵습니다. 소득, 기존 대출, 또는 DSR 한도를 확인해보세요.";
    return {
      text,
      tone: "warning",
      details: [
        `제한 요인: ${limitingFactor}`,
        `필요 자기자본: ${formatCurrency(propertyPrice)}`,
      ],
    };
  }

  const dsrPercent = (estimatedDsr * 100).toFixed(1);
  const limitPercent = (dsrLimit * 100).toFixed(0);

  // ── 생애최초 전용 해석 ──
  if (mode === "firstHome" && priceRange) {
    const { priceVerdict, cashShortfall, comfortableMax, standardMax } = priceRange;

    if (priceVerdict === "over_budget") {
      return {
        text: `현재 자기자본과 소득 기준으로 ${formatCurrency(propertyPrice)} 주택은 예산을 초과합니다. 무리 없는 가격대는 약 ${formatCurrency(comfortableMax)} 이하입니다.`,
        tone: "warning",
        details: [
          `자기자본 부족분: ${formatCurrency(cashShortfall)}`,
          `무리 없는 구간: ~${formatCurrency(comfortableMax)}`,
          `가능한 최대 구간: ~${formatCurrency(standardMax)}`,
          `DSR ${dsrPercent}% / 한도 ${limitPercent}%`,
        ],
      };
    }

    if (priceVerdict === "stretched") {
      return {
        text: `${formatCurrency(propertyPrice)} 주택은 가능하지만 다소 부담되는 구간입니다. 여유 있는 가격대는 약 ${formatCurrency(comfortableMax)} 이하입니다.`,
        tone: "caution",
        details: [
          cashShortfall > 0 ? `자기자본 부족분: ${formatCurrency(cashShortfall)}` : `자기자본 여유: ${formatCurrency(priceRange.availableCash - selfFund)}`,
          `무리 없는 구간: ~${formatCurrency(comfortableMax)}`,
          `가능한 최대 구간: ~${formatCurrency(standardMax)}`,
          `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
        ],
      };
    }

    return {
      text: `${formatCurrency(propertyPrice)} 주택은 현재 자금과 소득으로 충분히 감당 가능한 구간입니다. 대출 약 ${formatCurrency(maxLoanAmount)} 가능합니다.`,
      tone: "good",
      details: [
        `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
        `총 이자: ${formatCurrency(loan.totalInterest)}`,
        `무리 없는 구간: ~${formatCurrency(comfortableMax)}`,
        `가능한 최대 구간: ~${formatCurrency(standardMax)}`,
      ],
    };
  }

  // ── 보금자리론 전용: 장기 상환 안정성 강조 ──
  if (mode === "bogeumjari" && stabilityInfo) {
    const { stabilityLevel, totalYears, interestToLoanRatio } = stabilityInfo;

    if (stabilityLevel === "risky") {
      return {
        text: `${productLabel}형 기준 최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능하지만, ${totalYears}년간 월 ${formatCurrency(loan.monthlyPayment)} 상환은 부담이 큽니다. 기간 연장이나 대출액 축소를 검토하세요.`,
        tone: "warning",
        details: [
          `월 상환금: ${formatCurrency(loan.monthlyPayment)} (소득의 ${(stabilityInfo.monthlyToIncomeRatio * 100).toFixed(1)}%)`,
          `총 이자: ${formatCurrency(loan.totalInterest)} (원금의 ${(interestToLoanRatio * 100).toFixed(0)}%)`,
          `${totalYears}년 고정금리 적용`,
          ltvWasCapped ? `${productLabel} 상품한도 ${formatCurrency(rule.loanCap)} 적용됨` : `${limitingFactor} 기준 적용`,
        ],
      };
    }

    if (stabilityLevel === "caution") {
      return {
        text: `${productLabel}형 기준 약 ${formatCurrency(maxLoanAmount)} 대출 가능합니다. ${totalYears}년간 월 ${formatCurrency(loan.monthlyPayment)}로 감당 가능하지만 여유 있는 수준은 아닙니다.`,
        tone: "caution",
        details: [
          `월 상환금: ${formatCurrency(loan.monthlyPayment)} (소득의 ${(stabilityInfo.monthlyToIncomeRatio * 100).toFixed(1)}%)`,
          `총 이자: ${formatCurrency(loan.totalInterest)} (원금의 ${(interestToLoanRatio * 100).toFixed(0)}%)`,
          `${totalYears}년 고정금리로 월 상환금 변동 없음`,
          `자기자본 ${formatCurrency(selfFund)} 필요`,
        ],
      };
    }

    return {
      text: `${productLabel}형 기준 약 ${formatCurrency(maxLoanAmount)} 대출 가능합니다. ${totalYears}년 고정금리로 월 ${formatCurrency(loan.monthlyPayment)} 안정적 상환이 가능합니다.`,
      tone: "good",
      details: [
        `월 상환금: ${formatCurrency(loan.monthlyPayment)} (소득의 ${(stabilityInfo.monthlyToIncomeRatio * 100).toFixed(1)}%)`,
        `총 이자: ${formatCurrency(loan.totalInterest)} (원금의 ${(interestToLoanRatio * 100).toFixed(0)}%)`,
        `${totalYears}년 고정금리로 월 상환금 변동 없음`,
        `자기자본 ${formatCurrency(selfFund)} 필요`,
      ],
    };
  }

  // ── 디딤돌 (기본) ──
  const limitDesc = limitingFactor === "상품한도"
    ? `${productLabel} 상품 한도 ${formatCurrency(rule.loanCap)} 기준`
    : limitingFactor === "LTV"
      ? `담보비율(LTV ${result.effectiveLtv}%) 기준`
      : `상환부담(DSR ${dsrPercent}%) 기준`;

  if (affordabilityLevel === "heavy" || estimatedDsr >= dsrLimit * 0.95) {
    return {
      text: `${productLabel}형 기준 최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능하지만, DSR ${dsrPercent}%로 상환 부담이 큽니다.`,
      tone: "warning",
      details: [
        `제한 요인: ${limitDesc}`,
        `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
        `DSR ${dsrPercent}% / 한도 ${limitPercent}%`,
        rule?.guidanceText,
      ].filter(Boolean),
    };
  }

  if (affordabilityLevel === "stretched") {
    return {
      text: `${productLabel}형 기준 최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능합니다. 상환은 가능하지만 다소 부담이 있습니다.`,
      tone: "caution",
      details: [
        `제한 요인: ${limitDesc}`,
        `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
        `자기자본 ${formatCurrency(selfFund)} 필요`,
        rule?.guidanceText,
      ].filter(Boolean),
    };
  }

  return {
    text: `${productLabel}형 기준 최대 약 ${formatCurrency(maxLoanAmount)} 대출 가능합니다. 자기자본 약 ${formatCurrency(selfFund)}이 필요합니다.`,
    tone: "good",
    details: [
      `제한 요인: ${limitDesc}`,
      `월 상환금: ${formatCurrency(loan.monthlyPayment)}`,
      `총 이자: ${formatCurrency(loan.totalInterest)}`,
      rule?.guidanceText,
    ].filter(Boolean),
  };
}
