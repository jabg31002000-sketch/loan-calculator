export const PURPOSE_DEFAULTS = {
  housing: {
    placeholders: { principal: "예: 200,000,000 (전세보증금)", rate: "예: 3.8", months: "예: 24" },
    diagnosisContext: "전세/주거 대출",
    recommendationHint: "전세자금대출은 만기일시상환이 일반적이지만, 장기라면 원리금균등도 고려해보세요.",
    ctaLabel: "전세 대출 금리 비교하기",
  },
  car: {
    placeholders: { principal: "예: 30,000,000 (차량가)", rate: "예: 5.5", months: "예: 60" },
    diagnosisContext: "자동차 대출",
    recommendationHint: "자동차 대출은 기간이 짧아 원금균등상환이 총 이자를 크게 줄입니다.",
    ctaLabel: "자동차 대출 금리 비교하기",
  },
  living: {
    placeholders: { principal: "예: 10,000,000", rate: "예: 6.0", months: "예: 12" },
    diagnosisContext: "생활/급전 대출",
    recommendationHint: "신용대출은 금리가 높은 경우가 많습니다. 1%p만 낮춰도 부담이 크게 줄어요.",
    ctaLabel: "신용대출 금리 비교하기",
  },
  business: {
    placeholders: { principal: "예: 50,000,000", rate: "예: 4.5", months: "예: 60" },
    diagnosisContext: "사업자 대출",
    recommendationHint: "사업자금은 거치기간 활용 후 원금균등으로 전환하면 현금흐름에 유리합니다.",
    ctaLabel: "사업자 대출 금리 비교하기",
  },
  unknown: {
    placeholders: { principal: "예: 100,000,000", rate: "예: 4.5", months: "예: 360" },
    diagnosisContext: "대출",
    recommendationHint: "아직 용도가 정해지지 않았다면, 가장 무난한 원리금균등상환으로 먼저 비교해보세요.",
    ctaLabel: "내 조건에 맞는 금리 확인하기",
  },
};
