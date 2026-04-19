import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, Wallet, Home as HomeIcon, Banknote } from "lucide-react";
import policyJeonseEngine from "../engines/policyJeonseEngine";
import policyJeonseInterpreter from "../interpreters/policyJeonseInterpreter";
import PolicyJeonseResults from "../results/PolicyJeonseResults";

function trackMonthlyRentCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "monthly_rent_loan_calculator",
    event_label: parsed.productType,
    deposit: parsed.deposit,
  });
}

const MONTHLY_RENT_FAQ = [
  {
    question: "월세대출(보증부월세대출)이란?",
    answer: "보증부월세대출은 월세 보증금을 마련하기 위한 대출입니다. 보증금의 일정 비율을 대출받고, 월세와 대출이자를 함께 부담합니다.",
    hasCalculatorLink: false,
  },
  {
    question: "월세와 이자를 합한 총 주거비가 왜 중요한가요?",
    answer: "월세 보증금을 대출받으면 월세 외에도 이자를 납부해야 합니다. 이 둘을 합한 것이 실제 월 주거비이며, 이를 소득과 비교해 부담 수준을 판단해야 합니다.",
    hasCalculatorLink: true,
  },
  {
    question: "청년 월세대출 조건은?",
    answer: "만 19~34세, 연소득 5천만원 이하인 무주택 청년이 대상이며, 일반형보다 금리가 낮습니다. 정확한 조건은 주택도시기금 홈페이지에서 확인할 수 있습니다.",
    hasCalculatorLink: false,
  },
];

const monthlyRentLoanConfig = {
  id: "monthlyRentLoan",
  name: "월세대출 계산기",
  introPath: "/monthly-rent-loan",
  calculatorPath: "/monthly-rent-loan/calculator",

  intro: {
    seoTitle: "월세대출 / 보증부월세 계산기 | 총 주거비 확인 - LoanClock",
    seoDescription: "월세 보증금 대출과 월세를 합한 실제 주거비 부담을 확인하세요.",
    badge: "월세대출 계산기",
    title: "월세대출 / 보증부월세 계산기",
    subtitle: "보증금 대출 이자와 월세를 합한 실제 월 주거비를 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HomeIcon, title: "보증금 대출", desc: "월세 보증금의 일부를 대출받아 부담을 줄일 수 있습니다." },
      { icon: Banknote, title: "총 주거비", desc: "월세 + 대출 이자를 합한 실제 주거비를 확인합니다." },
      { icon: Wallet, title: "소득 대비 부담", desc: "월 주거비가 소득의 몇 %인지 확인할 수 있습니다." },
    ],
    sections: [
      {
        title: "월세대출이란?",
        content: "월세대출(보증부월세대출)은 월세 계약 시 보증금의 일부를 대출받는 상품입니다. 전세대출과 달리 보증금이 적은 대신, 매달 월세를 추가로 부담해야 합니다.\n\n실제 월 주거비는 '월세 + 보증금 대출이자'이므로, 둘을 합산해 소득 대비 부담을 확인하는 것이 중요합니다.",
      },
      {
        title: "총 주거비 계산 원리",
        content: "보증금 대출 이자와 월세를 합산하면 실제 월 주거비가 됩니다.",
        visual: {
          type: "formula",
          items: [
            { label: "보증금 × 대출비율 × 금리/12" },
            { type: "op", label: "+" },
            { label: "월세" },
            { type: "op", label: "=" },
            { label: "월 주거비 총액" },
          ],
          caption: "예: 3천만원 × 80% × 3.5%/12 + 50만원 = 약 57만원",
        },
      },
      {
        title: "일반형과 청년형의 차이",
        content: "청년 월세대출은 만 19~34세를 대상으로 일반형보다 낮은 금리가 적용됩니다. 소득 기준과 보증금 한도도 다릅니다.",
        visual: {
          type: "comparison",
          items: [
            { icon: Banknote, title: "일반형", desc: "소득 기준 5천만원 이하. 시중 금리 기반." },
            { icon: Banknote, title: "청년형", desc: "만 19~34세. 금리 우대 적용. 소득 5천만원 이하.", accent: true },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 월세 조건에서 실제 주거비를 확인해보세요",
      subtitle: "보증금, 월세, 금리만 입력하면 됩니다",
    },
  },

  seo: {
    title: "월세대출 / 보증부월세 계산기 - LoanClock",
    description: "월세 보증금 대출과 월세를 합한 실제 주거비 부담을 확인하세요.",
  },

  hero: {
    title: "월세대출 받으면\n주거비가 얼마나 될까?",
    subtitle: "보증금 대출 이자와 월세를 합한 실제 월 주거비를 알려드려요.",
    badge: "월세대출 계산기",
  },

  infoParagraph: "월세 보증금을 대출받으면 매달 이자와 월세를 함께 부담하게 됩니다. 소득 대비 총 주거비를 확인해 무리 없는 수준인지 미리 점검해보세요.",

  formTitle: "월세 & 대출 조건",
  formSubtitle: "보증금, 월세, 대출 조건을 입력해주세요.",
  submitLabel: "총 주거비 확인하기",

  emptyStateMessage: "위에 보증금과 월세를 입력해주세요",
  emptyStateHint: "보증금, 월세, 금리만 넣으면 됩니다.",

  fields: [
    { key: "deposit", type: "currency", label: "월세보증금", placeholder: "예: 30,000,000", group: "basic", suffix: "원" },
    { key: "monthlyRent", type: "currency", label: "월세", placeholder: "예: 500,000", group: "basic", suffix: "원" },
    { key: "loanRatio", type: "number", label: "대출비율 (%)", placeholder: "예: 80", group: "basic", suffix: "%", gridCol: 1 },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 3.0", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "기간 (개월)", placeholder: "예: 24", group: "basic" },
    {
      key: "productType", type: "select", label: "상품 유형", group: "basic",
      options: [
        { value: "general", label: "일반" },
        { value: "youth", label: "청년" },
      ],
    },
    { key: "annualIncome", type: "currency", label: "연소득 (세전)", placeholder: "예: 40,000,000", group: "basic", suffix: "원", hint: "소득 대비 주거비 부담률 계산에 사용" },
  ],

  defaults: {
    deposit: "",
    monthlyRent: "",
    loanRatio: "80",
    annualRate: "",
    months: "24",
    productType: "general",
    annualIncome: "",
  },

  sideEffects: [
    {
      watch: "productType",
      apply: (productType) => {
        const ratioMap = { general: "70", youth: "80" };
        return { loanRatio: ratioMap[productType] || "70" };
      },
    },
  ],

  parseValues: (values) => ({
    mode: "monthlyRent",
    deposit: Number(String(values.deposit).replace(/,/g, "")),
    monthlyRent: Number(String(values.monthlyRent || "0").replace(/,/g, "")),
    loanRatio: Number(values.loanRatio) || 80,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    productType: values.productType ?? "general",
    annualIncome: Number(String(values.annualIncome || "0").replace(/,/g, "")),
  }),

  validate: (parsed) => {
    if (!parsed.deposit || parsed.deposit <= 0) return "월세보증금을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "기간을 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    deposit: formatInputNumber(String(input.deposit)),
    monthlyRent: input.monthlyRent ? formatInputNumber(String(input.monthlyRent)) : "",
    loanRatio: String(input.loanRatio),
    annualRate: String(input.annualRate),
    months: String(input.months),
    productType: input.productType,
    annualIncome: input.annualIncome ? formatInputNumber(String(input.annualIncome)) : "",
  }),

  engine: policyJeonseEngine,
  interpreter: policyJeonseInterpreter,
  ResultComponent: PolicyJeonseResults,

  getCtaUrl: (input, result) => {
    if (!input || !result) return "/compare";
    return buildCompareUrl(
      { principal: result.loanAmount, annualRate: input.annualRate, months: input.months },
      { totalInterest: result.totalInterest },
      null,
    );
  },
  getCtaLabel: (result) => result?.rule?.ctaLabel || "대출 금리 비교하기",
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    const level = result.affordabilityLevel;
    const tag = level === "heavy" ? "주거비 부담 높음" : `월 주거비 약 ${formatCurrency(result.monthlyHousingCost)}`;
    return tag;
  },

  trackCalculate: trackMonthlyRentCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcMonthlyRentV1",
  scenarioStorageKey: null,

  faqItems: MONTHLY_RENT_FAQ,
  faqTitle: "월세대출 Q&A",
  faqSubtitle: "자주 묻는 질문들",
};

export default monthlyRentLoanConfig;
