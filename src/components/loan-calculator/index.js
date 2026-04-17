// Constants
export {
  BANK_RATES,
  REPAYMENT_OPTIONS,
  PURPOSE_OPTIONS,
  PRIORITY_OPTIONS,
  TRUST_POINTS,
  FAQ_ITEMS,
  REPAYMENT_COLORS,
  SCENARIO_CARD_THEMES,
} from "./constants";

// GA tracking
export { trackCalculateEvent, trackSaveScenarioEvent, trackCtaClick } from "./ga";

// Utilities & calculations
export {
  formatInputNumber,
  formatNumber,
  formatCurrency,
  formatRate,
  getRepaymentLabel,
  formatChartMoney,
  buildScenarioSummary,
  calcEqualPayment,
  calcEqualPrincipal,
  calcBullet,
  calculateLoan,
  generateChartData,
  getHalfPaidMonth,
  getPeakInterestMonth,
  getBestRepaymentOption,
  getWorstRepaymentOption,
  getMaxInterestValue,
  buildCompareUrl,
  getCtaUrl,
  getRecommendationReason,
} from "./utils";

// Purpose config
export { PURPOSE_DEFAULTS } from "./purposeConfig";

// Diagnosis
export { getDiagnosis, getDiagnosisStyle } from "./diagnosisEngine";

// UI Components — leaf
export { default as CustomChartTooltip } from "./CustomChartTooltip";
export { default as ComparisonTooltip } from "./ComparisonTooltip";
export { default as ScenarioCompareTooltip } from "./ScenarioCompareTooltip";
export { default as AccordionSection } from "./AccordionSection";
export { default as FaqItem } from "./FaqItem";

// UI Components — sections
export { default as LoanHeroSection } from "./LoanHeroSection";
export { default as LoanPurposeSelector } from "./LoanPurposeSelector";
export { default as LoanQuickForm } from "./LoanQuickForm";
export { default as LoanEmptyState } from "./LoanEmptyState";
export { default as LoanResultSummary } from "./LoanResultSummary";
export { default as LoanRecommendationCard } from "./LoanRecommendationCard";
export { default as LoanSavingsCard } from "./LoanSavingsCard";
export { default as LoanPrimaryCta } from "./LoanPrimaryCta";
export { default as LoanDetailAccordion } from "./LoanDetailAccordion";
export { default as LoanRevisitHint } from "./LoanRevisitHint";
export { default as LoanFaqSection } from "./LoanFaqSection";
export { default as LoanMobileStickyCta } from "./LoanMobileStickyCta";
