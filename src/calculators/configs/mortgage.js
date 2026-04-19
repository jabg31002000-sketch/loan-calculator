import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, Building, ShieldCheck } from "lucide-react";
import mortgageEngine from "../engines/mortgageEngine";
import mortgageInterpreter from "../interpreters/mortgageInterpreter";
import MortgageResults from "../results/MortgageResults";

function trackMortgageCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "mortgage_calculator",
    event_label: parsed.repaymentType,
    property_price: parsed.propertyPrice,
    ltv: parsed.ltv,
  });
}

const MORTGAGE_FAQ = [
  {
    question: "LTV란 무엇인가요?",
    answer: "LTV(담보인정비율)는 주택 가격 대비 대출 가능 비율입니다. 예를 들어 5억 주택에 LTV 70%면 최대 3.5억까지 대출할 수 있습니다. 지역, 주택 유형, 규제 여부에 따라 다릅니다.",
    hasCalculatorLink: false,
  },
  {
    question: "투기과열지구와 조정대상지역의 LTV 차이는?",
    answer: "투기과열지구는 LTV 40%(9억 이하), 조정대상지역은 50%(9억 이하)가 적용됩니다. 비규제지역은 70%까지 가능합니다. 다주택자는 더 낮은 LTV가 적용될 수 있습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "주담대 금리는 어떻게 결정되나요?",
    answer: "주담대 금리는 기준금리(COFIX 등) + 가산금리로 결정됩니다. 신용등급, 대출 기간, 상환방식, 우대 조건 등에 따라 가산금리가 달라집니다.",
    hasCalculatorLink: true,
  },
  {
    question: "거치기간을 두면 유리한가요?",
    answer: "거치기간 동안은 이자만 내므로 초기 부담이 줄지만, 거치 후 원금 상환이 시작되면 월 부담이 크게 늘어납니다. 총 이자도 더 많아지므로 신중히 결정하세요.",
    hasCalculatorLink: false,
  },
];

const mortgageConfig = {
  id: "mortgage",
  name: "주담대 계산기",
  introPath: "/mortgage",
  calculatorPath: "/mortgage/calculator",

  intro: {
    seoTitle: "주택담보대출 계산기 | 대출 가능 금액 확인 - LoanClock",
    seoDescription: "주택 가격과 소득을 입력하면 LTV·DSR 기준으로 대출 가능 금액과 월 상환금을 바로 확인할 수 있습니다.",
    badge: "주택담보대출 계산기",
    title: "주택담보대출 계산기",
    subtitle: "주택 가격과 소득을 입력하면, LTV·DSR 기준으로 실제 대출 가능 금액을 알려드립니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "LTV란?", desc: "주택 가격 대비 대출 가능 비율입니다. 지역과 규제에 따라 40~70%입니다." },
      { icon: ShieldCheck, title: "DSR 적용", desc: "소득 대비 상환 능력도 심사합니다. 은행권 DSR 한도는 40%입니다." },
      { icon: Building, title: "자기자본", desc: "대출 한도를 뺀 나머지 금액은 직접 준비해야 합니다." },
    ],
    sections: [
      {
        title: "주택담보대출이란?",
        content: "주택담보대출(주담대)은 구입하려는 주택을 담보로 잡고 받는 대출입니다. 신용대출보다 금리가 낮고 대출 한도가 높은 것이 특징입니다.\n\n대출 한도는 LTV와 DSR 두 기준 중 더 낮은 금액이 실제 한도가 됩니다.",
        visual: {
          type: "formula",
          items: [
            { label: "실제 대출 한도" },
            { type: "op", label: "=" },
            { label: "min( LTV 한도, DSR 한도 )" },
          ],
          caption: "두 기준 중 더 낮은 금액이 최종 한도",
        },
      },
      {
        title: "LTV 규제 이해하기",
        content: "LTV(담보인정비율)는 지역과 주택 유형에 따라 다릅니다. 예를 들어 5억원 주택에 LTV 70%가 적용되면 최대 3.5억까지 대출할 수 있습니다.",
        visual: {
          type: "stats",
          items: [
            { value: "70%", label: "비규제지역" },
            { value: "50%", label: "조정대상지역" },
            { value: "40%", label: "투기과열지구" },
          ],
        },
      },
      {
        title: "DSR이 주담대에 미치는 영향",
        content: "DSR 40% 한도는 주담대뿐 아니라 기존의 모든 대출(신용대출, 자동차 할부 등)의 연간 상환액을 합산합니다.\n\n기존 대출이 많으면 LTV 한도까지 대출 가능하더라도 DSR 때문에 실제 대출 금액이 줄어듭니다.",
        highlight: "팁: 기존 대출을 정리하면 주담대 한도가 크게 늘어날 수 있습니다.",
      },
      {
        title: "대출 가능 금액 계산 원리",
        content: "이 계산기는 LTV 기준과 DSR 기준 두 가지 한도를 각각 계산한 뒤, 더 낮은 금액을 최종 한도로 보여줍니다.",
        visual: {
          type: "steps",
          items: [
            { title: "LTV 한도 계산", desc: "주택 가격 × LTV 비율 = LTV 기준 최대 대출액" },
            { title: "DSR 한도 계산", desc: "연 소득 × DSR 한도에서 기존 상환액을 뺀 여력으로 역산" },
            { title: "최종 한도 결정", desc: "두 금액 중 더 낮은 쪽이 실제 대출 가능 금액" },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 소득과 주택 가격으로 대출 가능 금액을 확인해보세요",
      subtitle: "주택 가격, 소득, 금리만 입력하면 됩니다",
    },
  },

  seo: {
    title: "주택담보대출 계산기 | 대출 가능 금액 확인 - LoanClock",
    description: "주택 가격과 소득을 입력하면 LTV·DSR 기준 대출 가능 금액과 월 상환금을 바로 확인할 수 있습니다.",
  },

  hero: {
    title: "내 집 마련,\n얼마나 빌릴 수 있을까?",
    subtitle: "주택 가격과 소득만 입력하면, 대출 가능 금액과 월 상환금을 바로 알려드려요.",
    badge: "주택담보대출 계산기",
  },

  infoParagraph: "주택담보대출은 LTV(담보인정비율)와 DSR(소득 대비 상환비율) 두 가지 기준으로 한도가 결정됩니다. 주택 가격과 소득을 입력하면 실제 대출 가능 금액과 월 상환금을 확인할 수 있습니다.",

  formTitle: "주택 & 소득 정보",
  formSubtitle: "주택 가격과 소득 정보를 입력해주세요.",
  submitLabel: "내 집 대출 가능 금액 보기",

  emptyStateMessage: "위에 주택 정보와 소득을 입력해주세요",
  emptyStateHint: "주택 가격과 소득만 넣으면 됩니다.",

  fields: [
    { key: "propertyPrice", type: "currency", label: "주택 가격", placeholder: "예: 500,000,000", group: "basic", suffix: "원" },
    { key: "ltv", type: "number", label: "LTV (%)", placeholder: "예: 70", group: "basic", suffix: "%", hint: "비규제 70%, 조정지역 50%, 투기과열 40%", step: 5, gridCol: 1 },
    { key: "annualRate", type: "rate", label: "대출 금리 (연 %)", placeholder: "예: 3.5", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "대출기간 (개월)", placeholder: "예: 360", group: "basic", hint: "주담대는 보통 20~30년(240~360개월)" },
    { key: "annualIncome", type: "currency", label: "연 소득 (세전)", placeholder: "예: 60,000,000", group: "basic", suffix: "원" },
    {
      key: "repaymentType", type: "select", label: "상환방식", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
    {
      key: "existingMonthlyPayment", type: "currency", label: "기존 대출 월 상환액",
      placeholder: "예: 500,000", group: "advanced", suffix: "원",
      hint: "주담대 외 다른 대출의 월 상환액 합계",
    },
    {
      key: "dsrLimit", type: "number", label: "DSR 한도 (%)", placeholder: "40",
      group: "advanced", suffix: "%", hint: "은행권 40%, 2금융권 50%", step: 5,
    },
    {
      key: "graceMonths", type: "months", label: "거치기간 (개월)", placeholder: "예: 12",
      group: "advanced", hint: "거치기간 동안은 이자만 납부합니다.",
    },
  ],

  defaults: {
    propertyPrice: "",
    ltv: "70",
    annualRate: "",
    months: "",
    annualIncome: "",
    repaymentType: "equal_payment",
    existingMonthlyPayment: "",
    dsrLimit: "40",
    graceMonths: "",
  },

  sideEffects: [],

  parseValues: (values) => ({
    propertyPrice: Number(String(values.propertyPrice).replace(/,/g, "")),
    ltv: Number(values.ltv) || 70,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    annualIncome: Number(String(values.annualIncome).replace(/,/g, "")),
    repaymentType: values.repaymentType ?? "equal_payment",
    existingMonthlyPayment: Number(String(values.existingMonthlyPayment || "0").replace(/,/g, "")),
    dsrLimit: Number(values.dsrLimit) || 40,
    graceMonths: Number(values.graceMonths) || 0,
  }),

  validate: (parsed) => {
    if (!parsed.propertyPrice || parsed.propertyPrice <= 0) return "주택 가격을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "대출기간을 입력해주세요.";
    if (!parsed.annualIncome || parsed.annualIncome <= 0) return "연 소득을 입력해주세요.";
    if (parsed.graceMonths > parsed.months) return "거치기간은 전체 대출기간보다 클 수 없습니다.";
    return null;
  },

  restoreValues: (input) => ({
    propertyPrice: formatInputNumber(String(input.propertyPrice)),
    ltv: String(input.ltv),
    annualRate: String(input.annualRate),
    months: String(input.months),
    annualIncome: formatInputNumber(String(input.annualIncome)),
    repaymentType: input.repaymentType,
    existingMonthlyPayment: input.existingMonthlyPayment ? formatInputNumber(String(input.existingMonthlyPayment)) : "",
    dsrLimit: String(input.dsrLimit),
    graceMonths: input.graceMonths ? String(input.graceMonths) : "",
  }),

  engine: mortgageEngine,
  interpreter: mortgageInterpreter,
  ResultComponent: MortgageResults,

  getCtaUrl: (input, result) => {
    if (!input || !result || !result.maxLoanAmount) return "/compare";
    return buildCompareUrl(
      { principal: result.maxLoanAmount, annualRate: input.annualRate, months: input.months },
      result.loan,
      null,
    );
  },
  getCtaLabel: (result) => result?.maxLoanAmount > 0 ? "내 집 대출 가능 조건 보기" : "대출 상품 확인하기",
  getCtaSubtext: (input, result) => {
    if (!result || !result.maxLoanAmount) return null;
    return `지금 조건으로 최대 약 ${formatCurrency(result.maxLoanAmount)} 가능해요`;
  },

  trackCalculate: trackMortgageCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcMortgageV1",
  scenarioStorageKey: null,

  faqItems: MORTGAGE_FAQ,
  faqTitle: "이런 점이 궁금하지 않으세요?",
  faqSubtitle: "주담대 전에 꼭 확인해야 할 핵심 질문들",
};

export default mortgageConfig;
