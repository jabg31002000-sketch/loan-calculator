import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, ShieldCheck, Building, Banknote } from "lucide-react";
import policyHomePurchaseEngine from "../engines/policyHomePurchaseEngine";
import policyHomePurchaseInterpreter from "../interpreters/policyHomePurchaseInterpreter";
import PolicyHomePurchaseResults from "../results/PolicyHomePurchaseResults";

function trackDidimdolCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "didimdol_calculator",
    event_label: parsed.productType,
    property_price: parsed.propertyPrice,
  });
}

const DIDIMDOL_FAQ = [
  {
    question: "디딤돌대출이란 무엇인가요?",
    answer: "디딤돌대출은 주택도시기금에서 지원하는 저금리 주택구입자금대출입니다. 무주택 세대주가 일정 소득·자산 기준 이하일 때 이용할 수 있으며, 시중 주담대보다 금리가 낮습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "디딤돌대출 금리는 얼마인가요?",
    answer: "2024년 기준 연 2.15~3.0% 수준입니다. 소득 구간, 상품 유형(일반/생애최초/신혼/다자녀)에 따라 차등 적용됩니다.",
    hasCalculatorLink: true,
  },
  {
    question: "디딤돌대출 한도는 얼마인가요?",
    answer: "일반형 최대 2.5억, 생애최초 최대 3억, 신혼부부 최대 4억까지 가능합니다. 실제 한도는 LTV와 DSR 기준에 따라 달라집니다.",
    hasCalculatorLink: false,
  },
  {
    question: "디딤돌대출 대상 주택 조건은?",
    answer: "주택 가격 5억원 이하(수도권), 3억원 이하(비수도권)의 주택이 대상입니다. 전용면적 85㎡ 이하(수도권 외 읍면 100㎡ 이하)여야 합니다.",
    hasCalculatorLink: false,
  },
];

const didimdolConfig = {
  id: "didimdol",
  name: "디딤돌대출 계산기",
  introPath: "/didimdol",
  calculatorPath: "/didimdol/calculator",

  intro: {
    seoTitle: "디딤돌대출 계산기 | 대출 가능 금액 확인 - LoanClock",
    seoDescription: "디딤돌대출로 얼마를 빌릴 수 있는지, LTV·DSR 기준 대출 한도와 월 상환금을 바로 확인하세요.",
    badge: "디딤돌대출 계산기",
    title: "디딤돌대출 계산기",
    subtitle: "주택 가격과 소득을 입력하면 디딤돌대출 가능 금액과 월 상환금을 바로 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "디딤돌이란?", desc: "정부가 지원하는 저금리 주택구입자금대출입니다." },
      { icon: ShieldCheck, title: "LTV·DSR 적용", desc: "두 기준 중 낮은 쪽이 실제 대출 한도가 됩니다." },
      { icon: Building, title: "자기자본 확인", desc: "대출 한도를 뺀 나머지 금액을 확인합니다." },
    ],
    sections: [
      {
        title: "디딤돌대출은 어떤 상황에서 쓰나요?",
        content: "디딤돌대출은 무주택 세대주가 5억원 이하(수도권) 주택을 구입할 때 이용하는 정부 지원 대출입니다.\n\n시중 주담대보다 금리가 1~2%p 낮아 이자 부담을 크게 줄일 수 있으며, 소득과 자산 기준을 충족하면 신청 가능합니다.",
        visual: {
          type: "stats",
          items: [
            { value: "2.15~3.0%", label: "금리 범위" },
            { value: "최대 4억", label: "대출 한도 (신혼)" },
            { value: "5억 이하", label: "대상 주택 (수도권)" },
          ],
        },
      },
      {
        title: "이 계산기에서 확인할 수 있는 것",
        content: "주택 가격, LTV, 금리, 소득 등을 입력하면 아래 결과를 보여줍니다.",
        visual: {
          type: "steps",
          items: [
            { title: "LTV 기준 한도", desc: "주택 가격 × LTV 비율" },
            { title: "소득(DSR) 기준 한도", desc: "연소득 × DSR 한도에서 기존 대출을 뺀 여력으로 역산" },
            { title: "최종 한도 + 월 상환금", desc: "두 기준 중 낮은 쪽이 실제 대출액. 월 상환금과 총 이자도 함께 표시" },
          ],
        },
      },
      {
        title: "유형별 차이",
        content: "디딤돌대출은 일반형, 생애최초, 신혼, 다자녀 유형으로 나뉘며 한도와 금리가 다릅니다.",
        visual: {
          type: "comparison",
          items: [
            { icon: Banknote, title: "일반형", desc: "한도 최대 2.5억. 소득 6천만원 이하 무주택 세대주." },
            { icon: Banknote, title: "생애최초/신혼/다자녀", desc: "한도 최대 3~4억. 소득 기준 우대, 금리 우대 적용.", accent: true },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 소득과 주택 가격으로 디딤돌대출 가능 금액을 확인해보세요",
      subtitle: "주택 가격, 소득, 금리만 입력하면 됩니다",
    },
  },

  seo: {
    title: "디딤돌대출 계산기 | 대출 가능 금액 확인 - LoanClock",
    description: "디딤돌대출로 얼마를 빌릴 수 있는지, LTV·DSR 기준 대출 한도와 월 상환금을 바로 확인하세요.",
  },

  hero: {
    title: "디딤돌대출,\n내 유형에선 얼마까지?",
    subtitle: "유형(일반·생애최초·신혼·다자녀)에 따라 한도와 LTV가 달라집니다.",
    badge: "디딤돌대출 계산기",
  },

  infoParagraph: "디딤돌대출은 정부 지원 주택구입자금대출로 시중 주담대보다 금리가 낮습니다. LTV와 DSR 기준을 모두 적용해 실제 대출 가능 금액을 확인할 수 있습니다.",

  formTitle: "주택 & 소득 정보",
  formSubtitle: "주택 가격과 소득 정보를 입력해주세요.",
  submitLabel: "대출 가능 금액 보기",

  emptyStateMessage: "위에 주택 가격과 소득을 입력해주세요",
  emptyStateHint: "주택 가격과 소득만 넣으면 됩니다.",

  fields: [
    { key: "propertyPrice", type: "currency", label: "주택 가격", placeholder: "예: 400,000,000", group: "basic", suffix: "원" },
    { key: "ltv", type: "number", label: "LTV (%)", placeholder: "예: 70", group: "basic", suffix: "%", hint: "일반 70%, 생애최초 80%", step: 5, gridCol: 1 },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 2.5", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "대출기간 (개월)", placeholder: "예: 360", group: "basic", hint: "최대 30년(360개월)" },
    { key: "annualIncome", type: "currency", label: "연소득 (세전)", placeholder: "예: 50,000,000", group: "basic", suffix: "원" },
    {
      key: "productType", type: "select", label: "상품 유형", group: "basic",
      options: [
        { value: "general", label: "일반" },
        { value: "firstTime", label: "생애최초" },
        { value: "newlywed", label: "신혼" },
        { value: "multiChild", label: "다자녀" },
      ],
    },
    {
      key: "existingMonthlyPayment", type: "currency", label: "기존 대출 월 상환액",
      placeholder: "예: 300,000", group: "advanced", suffix: "원",
      hint: "디딤돌 외 다른 대출의 월 상환액 합계",
    },
    {
      key: "dsrLimit", type: "number", label: "DSR 한도 (%)", placeholder: "40",
      group: "advanced", suffix: "%", hint: "은행권 40%, 2금융권 50%", step: 5,
    },
    {
      key: "repaymentType", type: "select", label: "상환방식", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
  ],

  defaults: {
    propertyPrice: "",
    ltv: "70",
    annualRate: "",
    months: "",
    annualIncome: "",
    productType: "general",
    existingMonthlyPayment: "",
    dsrLimit: "40",
    repaymentType: "equal_payment",
  },

  sideEffects: [
    {
      watch: "productType",
      apply: (productType) => {
        const ltvMap = { general: "70", firstTime: "80", newlywed: "80", multiChild: "80" };
        return { ltv: ltvMap[productType] || "70" };
      },
    },
  ],

  parseValues: (values) => ({
    mode: "didimdol",
    propertyPrice: Number(String(values.propertyPrice).replace(/,/g, "")),
    ltv: Number(values.ltv) || 70,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    annualIncome: Number(String(values.annualIncome).replace(/,/g, "")),
    productType: values.productType ?? "general",
    existingMonthlyPayment: Number(String(values.existingMonthlyPayment || "0").replace(/,/g, "")),
    dsrLimit: Number(values.dsrLimit) || 40,
    repaymentType: values.repaymentType ?? "equal_payment",
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
    ltv: String(input.ltv),
    annualRate: String(input.annualRate),
    months: String(input.months),
    annualIncome: formatInputNumber(String(input.annualIncome)),
    productType: input.productType,
    existingMonthlyPayment: input.existingMonthlyPayment ? formatInputNumber(String(input.existingMonthlyPayment)) : "",
    dsrLimit: String(input.dsrLimit),
    repaymentType: input.repaymentType,
  }),

  engine: policyHomePurchaseEngine,
  interpreter: policyHomePurchaseInterpreter,
  ResultComponent: PolicyHomePurchaseResults,

  getCtaUrl: (input, result) => {
    if (!input || !result || !result.maxLoanAmount) return "/compare";
    return buildCompareUrl(
      { principal: result.maxLoanAmount, annualRate: input.annualRate, months: input.months },
      result.loan,
      null,
    );
  },
  getCtaLabel: (result) => {
    if (!result?.maxLoanAmount) return result?.rule?.ctaLabelWeak || "대출 상품 확인하기";
    return result?.rule?.ctaLabel || "디딤돌 대출 조건 비교하기";
  },
  getCtaSubtext: (input, result) => {
    if (!result || !result.maxLoanAmount) return null;
    const label = result.rule?.label ? `${result.rule.label}형 ` : "";
    return `${label}최대 약 ${formatCurrency(result.maxLoanAmount)} 대출 가능`;
  },

  trackCalculate: trackDidimdolCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcDidimdolV1",
  scenarioStorageKey: null,

  faqItems: DIDIMDOL_FAQ,
  faqTitle: "디딤돌대출 Q&A",
  faqSubtitle: "자주 묻는 질문들을 확인하세요",
};

export default didimdolConfig;
