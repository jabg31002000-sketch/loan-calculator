import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, ShieldCheck, Building, Lock } from "lucide-react";
import policyHomePurchaseEngine from "../engines/policyHomePurchaseEngine";
import policyHomePurchaseInterpreter from "../interpreters/policyHomePurchaseInterpreter";
import PolicyHomePurchaseResults from "../results/PolicyHomePurchaseResults";

function trackBogeumjariCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "bogeumjari_calculator",
    event_label: parsed.productType,
    property_price: parsed.propertyPrice,
  });
}

const BOGEUMJARI_FAQ = [
  {
    question: "보금자리론이란 무엇인가요?",
    answer: "보금자리론은 한국주택금융공사(HF)에서 제공하는 장기 고정금리 주택담보대출입니다. 최대 30년까지 고정금리가 적용되어 금리 변동 위험 없이 안정적으로 상환할 수 있습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "보금자리론 금리는 얼마인가요?",
    answer: "2024년 기준 연 3.25~4.0% 수준이며, 10년·15년·20년·30년 등 대출 기간과 상품 유형에 따라 다릅니다. 생애최초 유형은 0.2~0.5%p 우대 적용됩니다.",
    hasCalculatorLink: true,
  },
  {
    question: "보금자리론과 디딤돌대출의 차이는?",
    answer: "디딤돌대출은 주택도시기금 지원 변동금리 대출이고, 보금자리론은 주택금융공사의 장기 고정금리 대출입니다. 디딤돌이 금리는 더 낮지만 소득·주택가격 기준이 더 엄격합니다.",
    hasCalculatorLink: false,
  },
  {
    question: "대상 주택 조건은?",
    answer: "시가 6억원 이하(수도권), 담보가치 6억원 이하 주택이 대상입니다. 부부합산 연소득 7천만원 이하가 기본이며, 생애최초는 소득 기준이 완화됩니다.",
    hasCalculatorLink: false,
  },
];

const bogeumjariConfig = {
  id: "bogeumjari",
  name: "보금자리론 계산기",
  introPath: "/bogeumjari",
  calculatorPath: "/bogeumjari/calculator",

  intro: {
    seoTitle: "보금자리론 계산기 | 장기 고정금리 대출 시뮬레이션 - LoanClock",
    seoDescription: "보금자리론으로 얼마를 빌릴 수 있는지, 월 상환금과 총 이자를 바로 확인하세요.",
    badge: "보금자리론 계산기",
    title: "보금자리론 계산기",
    subtitle: "장기 고정금리 주담대인 보금자리론의 대출 가능 금액과 월 상환금을 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: Lock, title: "고정금리", desc: "최대 30년간 금리가 고정되어 상환 계획을 세우기 좋습니다." },
      { icon: ShieldCheck, title: "LTV·DSR 적용", desc: "두 기준 중 낮은 쪽이 실제 대출 한도가 됩니다." },
      { icon: Building, title: "자기자본 확인", desc: "대출 한도를 뺀 나머지 금액을 확인합니다." },
    ],
    sections: [
      {
        title: "보금자리론은 어떤 상품인가요?",
        content: "보금자리론은 한국주택금융공사(HF)가 제공하는 장기 고정금리 주택담보대출입니다.\n\n시중 변동금리 주담대와 달리 최대 30년간 금리가 고정되어, 금리 인상기에도 월 상환금이 변하지 않는 것이 가장 큰 장점입니다.",
        visual: {
          type: "stats",
          items: [
            { value: "3.25~4.0%", label: "고정 금리" },
            { value: "최대 3.6억", label: "대출 한도" },
            { value: "최대 30년", label: "상환 기간" },
          ],
        },
      },
      {
        title: "이 계산기에서 확인할 수 있는 것",
        content: "주택 가격, LTV, 금리, 소득을 입력하면 아래 결과를 보여줍니다.",
        visual: {
          type: "steps",
          items: [
            { title: "LTV 기준 한도", desc: "주택 가격 × LTV 비율 (최대 70%)" },
            { title: "소득(DSR) 기준 한도", desc: "소득에서 기존 상환액을 제외한 여력으로 역산" },
            { title: "최종 한도 + 월 상환금", desc: "더 낮은 기준이 적용되고 월 상환금, 총 이자를 함께 표시" },
          ],
        },
      },
      {
        title: "보금자리론이 유리한 경우",
        content: "금리 인상이 예상되거나, 오랜 기간 안정적으로 상환하고 싶을 때 보금자리론이 유리합니다. 반면 금리 인하기에는 변동금리 대출이 유리할 수 있습니다.",
        highlight: "고정금리의 핵심 장점: 30년 동안 월 상환금이 변하지 않아 생활비 계획이 쉽습니다.",
      },
    ],
    bottomCta: {
      title: "내 조건으로 보금자리론 시뮬레이션을 해보세요",
      subtitle: "주택 가격, 소득, 금리만 입력하면 됩니다",
    },
  },

  seo: {
    title: "보금자리론 계산기 | 장기 고정금리 대출 시뮬레이션 - LoanClock",
    description: "보금자리론으로 얼마를 빌릴 수 있는지, 월 상환금과 총 이자를 바로 확인하세요.",
  },

  hero: {
    title: "보금자리론,\n장기 상환이 안정적일까?",
    subtitle: "고정금리로 10~30년 상환 시 월 부담금과 총 이자를 확인하세요.",
    badge: "보금자리론 계산기",
  },

  infoParagraph: "보금자리론은 최대 30년 고정금리 주담대입니다. 금리 변동 없이 안정적으로 상환할 수 있지만, 장기간 총 이자 부담도 함께 확인해야 합니다.",

  formTitle: "주택 & 소득 정보",
  formSubtitle: "주택 가격과 소득을 입력하면 장기 상환 안정성을 분석합니다.",
  submitLabel: "상환 안정성 분석하기",

  emptyStateMessage: "위에 주택 가격과 소득을 입력해주세요",
  emptyStateHint: "주택 가격과 소득만 넣으면 됩니다.",

  fields: [
    { key: "propertyPrice", type: "currency", label: "주택 가격", placeholder: "예: 500,000,000", group: "basic", suffix: "원" },
    { key: "ltv", type: "number", label: "LTV (%)", placeholder: "예: 70", group: "basic", suffix: "%", hint: "일반 70%, 생애최초 80%", step: 5, gridCol: 1 },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 3.5", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "대출기간 (개월)", placeholder: "예: 360", group: "basic", hint: "최대 30년(360개월)" },
    { key: "annualIncome", type: "currency", label: "연소득 (세전)", placeholder: "예: 60,000,000", group: "basic", suffix: "원" },
    {
      key: "productType", type: "select", label: "상품 유형", group: "basic",
      options: [
        { value: "general", label: "기본" },
        { value: "firstTime", label: "생애최초" },
      ],
    },
    {
      key: "existingMonthlyPayment", type: "currency", label: "기존 대출 월 상환액",
      placeholder: "예: 300,000", group: "advanced", suffix: "원",
      hint: "보금자리론 외 다른 대출의 월 상환액 합계",
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
    repaymentType: "equal_payment",
  },

  sideEffects: [
    {
      watch: "productType",
      apply: (productType) => {
        const ltvMap = { general: "70", firstTime: "80" };
        return { ltv: ltvMap[productType] || "70" };
      },
    },
  ],

  parseValues: (values) => ({
    mode: "bogeumjari",
    propertyPrice: Number(String(values.propertyPrice).replace(/,/g, "")),
    ltv: Number(values.ltv) || 70,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    annualIncome: Number(String(values.annualIncome).replace(/,/g, "")),
    productType: values.productType ?? "general",
    existingMonthlyPayment: Number(String(values.existingMonthlyPayment || "0").replace(/,/g, "")),
    dsrLimit: 40,
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
    return result?.rule?.ctaLabel || "보금자리론 조건 비교하기";
  },
  getCtaSubtext: (input, result) => {
    if (!result || !result.maxLoanAmount) return null;
    if (result.stabilityInfo) {
      const level = result.stabilityInfo.stabilityLevel;
      const tag = level === "stable" ? "안정적" : level === "caution" ? "주의" : "부담";
      return `${Math.round(input.months / 12)}년 고정금리 · ${tag} · 월 ${formatCurrency(result.loan.monthlyPayment)}`;
    }
    return `최대 약 ${formatCurrency(result.maxLoanAmount)} 대출 가능`;
  },

  trackCalculate: trackBogeumjariCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcBogeumjariV1",
  scenarioStorageKey: null,

  faqItems: BOGEUMJARI_FAQ,
  faqTitle: "보금자리론 Q&A",
  faqSubtitle: "자주 묻는 질문들을 확인하세요",
};

export default bogeumjariConfig;
