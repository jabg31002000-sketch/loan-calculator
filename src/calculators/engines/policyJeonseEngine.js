/**
 * 정책 전세/월세 대출 공통 엔진
 * mode: "beotimmok" | "jeonseInterest" | "monthlyRent"
 *
 * productType에 따라 실제 대출비율 상한, 대출한도 캡, 부담률 기준이 달라짐
 */

// ── Rule Tables ──

export const BEOTIMMOK_RULES = {
  general: {
    label: "일반",
    maxRatio: 0.70,           // 최대 대출비율
    loanCap: 120_000_000,     // 대출 한도 캡 (수도권 기준)
    affordabilityThresholds: [0.25, 0.40],
    guidanceText: "일반 버팀목은 소득 5천만원 이하 무주택 세대주가 대상입니다.",
    ctaLabel: "전세대출 조건 비교하기",
  },
  youth: {
    label: "청년",
    maxRatio: 0.80,
    loanCap: 120_000_000,
    affordabilityThresholds: [0.30, 0.45],  // 청년은 소득 대비 기준 약간 완화
    guidanceText: "청년 버팀목은 만 19~34세, 소득 5천만원 이하 대상으로 금리가 더 낮습니다.",
    ctaLabel: "청년 전세대출 조건 보기",
  },
  newlywed: {
    label: "신혼부부",
    maxRatio: 0.80,
    loanCap: 200_000_000,     // 신혼부부는 한도 높음
    affordabilityThresholds: [0.30, 0.45],
    guidanceText: "신혼부부 버팀목은 결혼 7년 이내, 합산 소득 6천만원 이하 대상으로 한도가 더 높습니다.",
    ctaLabel: "신혼부부 전세대출 조건 보기",
  },
};

export const MONTHLY_RENT_RULES = {
  general: {
    label: "일반",
    maxRatio: 0.70,
    loanCap: 40_000_000,
    affordabilityThresholds: [0.25, 0.40],
    guidanceText: "일반 월세대출은 소득 5천만원 이하 무주택 세대주가 대상입니다.",
    ctaLabel: "대출 금리 비교하기",
  },
  youth: {
    label: "청년",
    maxRatio: 0.80,
    loanCap: 60_000_000,
    affordabilityThresholds: [0.30, 0.50],  // 청년은 주거비 비율 기준 완화
    guidanceText: "청년 월세대출은 만 19~34세 대상이며, 한도와 대출비율이 더 높습니다.",
    ctaLabel: "청년 월세대출 조건 보기",
  },
};

export default function policyJeonseEngine(input) {
  const {
    mode,
    deposit,
    loanRatio,
    annualRate,
    months,
    annualIncome,
    productType,
    graceMonths,
    monthlyRent,
  } = input;

  // ── jeonseInterest: 단순형 ──
  if (mode === "jeonseInterest") {
    const ratio = (loanRatio ?? 80) / 100;
    const loanAmount = Math.floor(deposit * ratio);
    const selfFund = deposit - loanAmount;
    const monthlyRate = (annualRate ?? 0) / 100 / 12;
    const monthlyInterest = Math.round(loanAmount * monthlyRate);
    const totalInterest = monthlyInterest * months;

    return {
      mode,
      deposit,
      loanRatio: ratio,
      loanAmount,
      selfFund,
      monthlyInterest,
      totalInterest,
      months,
      monthlyPayment: monthlyInterest,
      totalPayment: totalInterest + loanAmount,
    };
  }

  // ── beotimmok / monthlyRent: rule table 기반 ──
  const rules = mode === "monthlyRent" ? MONTHLY_RENT_RULES : BEOTIMMOK_RULES;
  const rule = rules[productType] || rules.general;

  // 사용자 입력 대출비율을 rule의 maxRatio로 클램프
  const userRatio = (loanRatio ?? 80) / 100;
  const effectiveRatio = Math.min(userRatio, rule.maxRatio);
  const ratioWasClamped = userRatio > rule.maxRatio;

  // 대출 금액 = min(보증금 × 비율, 상품별 캡)
  const rawLoanAmount = Math.floor(deposit * effectiveRatio);
  const loanAmount = Math.min(rawLoanAmount, rule.loanCap);
  const wasCapped = rawLoanAmount > rule.loanCap;
  const selfFund = deposit - loanAmount;

  const monthlyRate = (annualRate ?? 0) / 100 / 12;
  const monthlyInterest = Math.round(loanAmount * monthlyRate);
  const totalInterest = monthlyInterest * months;

  // ── monthlyRent 모드 ──
  if (mode === "monthlyRent") {
    const rent = monthlyRent || 0;
    const monthlyHousingCost = monthlyInterest + rent;
    const monthlyIncome = (annualIncome || 0) / 12;
    const affordabilityRatio = monthlyIncome > 0 ? monthlyHousingCost / monthlyIncome : 0;

    const [comfortThreshold, heavyThreshold] = rule.affordabilityThresholds;
    let affordabilityLevel = "unknown";
    if (affordabilityRatio <= comfortThreshold) affordabilityLevel = "comfortable";
    else if (affordabilityRatio <= heavyThreshold) affordabilityLevel = "moderate";
    else affordabilityLevel = "heavy";

    return {
      mode,
      productType,
      rule,
      deposit,
      loanRatio: effectiveRatio,
      ratioWasClamped,
      loanAmount,
      wasCapped,
      selfFund,
      monthlyInterest,
      totalInterest,
      monthlyRent: rent,
      monthlyHousingCost,
      affordabilityRatio,
      affordabilityLevel,
      annualIncome: annualIncome || 0,
      months,
      monthlyPayment: monthlyHousingCost,
      totalPayment: totalInterest + (rent * months),
    };
  }

  // ── beotimmok 모드 ──
  const grace = graceMonths || 0;
  let monthlyPayment = monthlyInterest;
  let totalPayment = totalInterest + loanAmount;

  if (grace < months) {
    const remainMonths = months - grace;
    if (monthlyRate > 0 && remainMonths > 0) {
      const factor = Math.pow(1 + monthlyRate, remainMonths);
      monthlyPayment = Math.round(loanAmount * (monthlyRate * factor) / (factor - 1));
    } else {
      monthlyPayment = remainMonths > 0 ? Math.round(loanAmount / remainMonths) : 0;
    }
    const graceInterest = monthlyInterest * grace;
    const repayTotal = monthlyPayment * remainMonths;
    totalPayment = graceInterest + repayTotal;
  }

  const monthlyIncome = (annualIncome || 0) / 12;
  const affordabilityRatio = monthlyIncome > 0 ? monthlyPayment / monthlyIncome : 0;

  const [comfortThreshold, heavyThreshold] = rule.affordabilityThresholds;
  let affordabilityLevel = "unknown";
  if (affordabilityRatio <= comfortThreshold) affordabilityLevel = "comfortable";
  else if (affordabilityRatio <= heavyThreshold) affordabilityLevel = "moderate";
  else affordabilityLevel = "heavy";

  // 자기자금 부담 판단
  const selfFundRatio = deposit > 0 ? selfFund / deposit : 0;
  let selfFundLevel = "ok";
  if (selfFundRatio >= 0.50) selfFundLevel = "heavy";
  else if (selfFundRatio >= 0.30) selfFundLevel = "moderate";

  return {
    mode,
    productType,
    rule,
    deposit,
    loanRatio: effectiveRatio,
    ratioWasClamped,
    loanAmount,
    wasCapped,
    selfFund,
    selfFundRatio,
    selfFundLevel,
    monthlyInterest,
    totalInterest,
    monthlyPayment,
    totalPayment,
    graceMonths: grace,
    affordabilityRatio,
    affordabilityLevel,
    annualIncome: annualIncome || 0,
    months,
  };
}
