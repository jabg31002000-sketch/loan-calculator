import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, ShieldCheck, Building, Heart } from "lucide-react";
import policyHomePurchaseEngine from "../engines/policyHomePurchaseEngine";
import policyHomePurchaseInterpreter from "../interpreters/policyHomePurchaseInterpreter";
import FirstHomeResults from "../results/FirstHomeResults";

function trackFirstHomeCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "first_home_calculator",
    property_price: parsed.propertyPrice,
  });
}

const FIRST_HOME_FAQ = [
  {
    question: "생애최초 주택구입 대출이란?",
    answer: "생애최초 주택구입자를 대상으로 LTV, 금리 등에서 우대 혜택을 주는 정부 지원 대출입니다. 디딤돌 생애최초형, 보금자리론 생애최초형 등 여러 상품이 있습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "생애최초 요건은 무엇인가요?",
    answer: "본인과 배우자 모두 과거 주택을 소유한 적이 없어야 합니다. 주민등록 기준으로 확인하며, 상속·증여로 일시적 소유 후 처분한 경우는 예외가 될 수 있습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "생애최초라면 LTV가 더 높아지나요?",
    answer: "네. 생애최초 주택구입자는 LTV가 최대 80%까지 적용될 수 있습니다(일반 70%). 다만 지역과 규제 여부에 따라 다르며, DSR 한도는 동일하게 적용됩니다.",
    hasCalculatorLink: true,
  },
  {
    question: "이 계산기에서 어떤 기준으로 보여주나요?",
    answer: "주택 가격, LTV, 금리, 소득, DSR 한도를 입력하면 LTV 기준과 DSR 기준 두 한도를 계산합니다. 더 낮은 쪽이 실제 대출 가능액이며, 월 상환금과 '내 자금으로 가능한 구간' 해석도 함께 제공합니다.",
    hasCalculatorLink: false,
  },
];

const firstHomeConfig = {
  id: "firstHome",
  name: "생애최초 주택구입 계산기",
  introPath: "/first-home",
  calculatorPath: "/first-home/calculator",

  intro: {
    seoTitle: "생애최초 주택구입 대출 계산기 | 내 첫 집 대출 가능 금액 - LoanClock",
    seoDescription: "생애최초 주택구입자를 위한 대출 계산기. LTV·DSR 기준 대출 가능 금액과 월 상환금을 확인하세요.",
    badge: "생애최초 주택구입",
    title: "생애최초 주택구입 계산기",
    subtitle: "첫 집 구매자를 위한 대출 가능 금액과 월 상환금을 친절하게 알려드립니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: Heart, title: "생애최초 우대", desc: "LTV, 금리 등에서 일반 대출보다 유리한 조건이 적용됩니다." },
      { icon: ShieldCheck, title: "LTV·DSR 분석", desc: "두 기준으로 실제 대출 가능 금액을 계산합니다." },
      { icon: Building, title: "자금 구간 해석", desc: "내 소득과 자금으로 감당 가능한 구간을 알려줍니다." },
    ],
    sections: [
      {
        title: "생애최초 주택구입, 무엇이 달라지나요?",
        content: "생애최초 주택구입자는 일반 대출자보다 유리한 조건으로 대출을 받을 수 있습니다.\n\nLTV가 최대 80%까지 확대되고, 일부 상품에서는 금리 우대도 적용됩니다. 단, DSR 한도는 동일하게 적용되므로 소득 대비 상환 능력도 함께 확인해야 합니다.",
        visual: {
          type: "comparison",
          items: [
            { icon: Building, title: "일반 주담대", desc: "LTV 최대 70%. 기본 금리 적용." },
            { icon: Heart, title: "생애최초", desc: "LTV 최대 80%. 금리 우대 가능. 소득 기준 완화.", accent: true },
          ],
        },
      },
      {
        title: "이 계산기에서 확인할 수 있는 것",
        content: "주택 가격, LTV, 금리, 소득 등을 입력하면 다음을 보여줍니다.",
        visual: {
          type: "steps",
          items: [
            { title: "최대 대출 가능 금액", desc: "LTV와 DSR 기준 중 낮은 쪽" },
            { title: "월 상환금 · 총 이자", desc: "상환 방식별 월 부담금과 총 이자 비용" },
            { title: "내 자금 가능 구간", desc: "현재 소득에서 감당 가능한 수준인지 해석" },
          ],
        },
      },
      {
        title: "첫 집 구매 전 꼭 확인하세요",
        content: "첫 집을 구매할 때는 대출 가능 금액뿐 아니라, 취득세·중개비·이사비 등 부대비용도 고려해야 합니다. 자기자본에 여유를 두는 것이 안전합니다.",
        highlight: "대출 한도 = 실제 구매 가능 금액이 아닙니다. 부대비용(취득세 등)도 반드시 고려하세요.",
      },
    ],
    bottomCta: {
      title: "내 첫 집, 얼마까지 가능한지 확인해보세요",
      subtitle: "주택 가격과 소득만 입력하면 됩니다",
    },
  },

  seo: {
    title: "생애최초 주택구입 대출 계산기 - LoanClock",
    description: "생애최초 주택구입자를 위한 대출 계산기. LTV·DSR 기준 대출 가능 금액과 월 상환금을 확인하세요.",
  },

  hero: {
    title: "내 자금으로\n어떤 집까지 가능할까?",
    subtitle: "보유 자금과 소득을 기준으로 감당 가능한 집값 구간을 알려드려요.",
    badge: "생애최초 주택구입 계산기",
  },

  infoParagraph: "생애최초 주택구입자는 LTV 우대(최대 80%) 등 유리한 조건으로 대출을 받을 수 있습니다. 주택 가격, 보유 자금, 소득을 입력하면 감당 가능한 집값 구간과 자기자본 부족 여부를 확인할 수 있습니다.",

  formTitle: "내 자금 & 소득 정보",
  formSubtitle: "보유 자금과 소득을 입력하면 가능한 집값 구간을 보여드려요.",
  submitLabel: "가능한 집값 구간 보기",

  emptyStateMessage: "위에 주택 가격과 보유 자금을 입력해주세요",
  emptyStateHint: "보유 자금과 소득만 넣으면 됩니다.",

  fields: [
    { key: "propertyPrice", type: "currency", label: "관심 주택 가격", placeholder: "예: 500,000,000", group: "basic", suffix: "원", hint: "구매를 고려하는 주택의 가격" },
    { key: "availableCash", type: "currency", label: "보유 자기자본", placeholder: "예: 100,000,000", group: "basic", suffix: "원", hint: "현재 동원 가능한 현금·예금 총액" },
    { key: "annualIncome", type: "currency", label: "연소득 (세전)", placeholder: "예: 50,000,000", group: "basic", suffix: "원" },
    { key: "ltv", type: "number", label: "LTV (%)", placeholder: "예: 80", group: "basic", suffix: "%", hint: "생애최초 최대 80%", step: 5, gridCol: 1 },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 3.0", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "대출기간 (개월)", placeholder: "예: 360", group: "basic", hint: "최대 30년(360개월)" },
    {
      key: "existingMonthlyPayment", type: "currency", label: "기존 대출 월 상환액",
      placeholder: "예: 300,000", group: "advanced", suffix: "원",
      hint: "다른 대출의 월 상환액 합계",
    },
    {
      key: "repaymentType", type: "select", label: "상환방식", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
    {
      key: "dsrLimit", type: "number", label: "DSR 한도 (%)", placeholder: "40",
      group: "advanced", suffix: "%", hint: "은행권 40%, 2금융권 50%", step: 5,
    },
  ],

  defaults: {
    propertyPrice: "",
    availableCash: "",
    annualIncome: "",
    ltv: "80",
    annualRate: "",
    months: "",
    existingMonthlyPayment: "",
    repaymentType: "equal_payment",
    dsrLimit: "40",
  },

  sideEffects: [],

  parseValues: (values) => ({
    mode: "firstHome",
    propertyPrice: Number(String(values.propertyPrice).replace(/,/g, "")),
    availableCash: Number(String(values.availableCash || "0").replace(/,/g, "")),
    ltv: Number(values.ltv) || 80,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    annualIncome: Number(String(values.annualIncome).replace(/,/g, "")),
    existingMonthlyPayment: Number(String(values.existingMonthlyPayment || "0").replace(/,/g, "")),
    repaymentType: values.repaymentType ?? "equal_payment",
    dsrLimit: Number(values.dsrLimit) || 40,
    productType: "firstHome",
  }),

  validate: (parsed) => {
    if (!parsed.propertyPrice || parsed.propertyPrice <= 0) return "주택 가격을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "대출기간을 입력해주세요.";
    if (!parsed.annualIncome || parsed.annualIncome <= 0) return "연소득을 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    propertyPrice: formatInputNumber(String(input.propertyPrice)),
    availableCash: input.availableCash ? formatInputNumber(String(input.availableCash)) : "",
    ltv: String(input.ltv),
    annualRate: String(input.annualRate),
    months: String(input.months),
    annualIncome: formatInputNumber(String(input.annualIncome)),
    existingMonthlyPayment: input.existingMonthlyPayment ? formatInputNumber(String(input.existingMonthlyPayment)) : "",
    repaymentType: input.repaymentType,
    dsrLimit: String(input.dsrLimit),
  }),

  engine: policyHomePurchaseEngine,
  interpreter: policyHomePurchaseInterpreter,
  ResultComponent: FirstHomeResults,

  getCtaUrl: (input, result) => {
    if (!input || !result || !result.maxLoanAmount) return "/compare";
    return buildCompareUrl(
      { principal: result.maxLoanAmount, annualRate: input.annualRate, months: input.months },
      result.loan,
      null,
    );
  },
  getCtaLabel: (result) => {
    if (!result?.maxLoanAmount) return "대출 상품 확인하기";
    if (result.priceRange?.priceVerdict === "over_budget") return "예산 맞는 주택 찾아보기";
    return "생애최초 대출 조건 비교하기";
  },
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    if (result.priceRange) return `여유 구간 ~${formatCurrency(result.priceRange.comfortableMax)}`;
    if (result.maxLoanAmount) return `최대 약 ${formatCurrency(result.maxLoanAmount)} 대출 가능`;
    return null;
  },

  trackCalculate: trackFirstHomeCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcFirstHomeV1",
  scenarioStorageKey: null,

  faqItems: FIRST_HOME_FAQ,
  faqTitle: "생애최초 주택구입 Q&A",
  faqSubtitle: "첫 집 구매 전 꼭 확인하세요",
};

export default firstHomeConfig;
