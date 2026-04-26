import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, ShieldAlert, Calculator } from "lucide-react";
import { parsePresetValue } from "../../components/shared/DsrPresetInput";
import { computeAnnualPayment } from "../../components/shared/DsrDebtListInput";
import dsrEngine from "../engines/dsrEngine";
import dsrInterpreter from "../interpreters/dsrInterpreter";
import DsrResults from "../results/DsrResults";

function trackDsrCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "dsr_calculator",
    event_label: parsed.repaymentType,
    annual_income: parsed.annualIncome,
    debt_count: parsed.existingDebts?.length ?? 0,
  });
}

const DSR_FAQ = [
  {
    question: "DSR이란 무엇인가요?",
    answer: "DSR(총부채원리금상환비율)은 연 소득 대비 모든 대출의 연간 원리금 상환액 비율입니다. 예를 들어 연 소득 5,000만원에 연간 상환액이 2,000만원이면 DSR은 40%입니다.",
    hasCalculatorLink: false,
  },
  {
    question: "DSR 한도는 얼마인가요?",
    answer: "2024년 기준, 은행권 DSR 한도는 40%, 2금융권은 50%입니다. 주택담보대출, 신용대출 등 모든 대출의 원리금 상환액이 합산되어 계산됩니다.",
    hasCalculatorLink: false,
  },
  {
    question: "DSR을 낮추려면 어떻게 해야 하나요?",
    answer: "기존 대출을 일부 상환하거나, 대출 기간을 늘려 월 상환액을 줄이면 DSR이 낮아집니다. 소득이 늘어도 DSR이 낮아지지만, 소득 증빙이 가능해야 반영됩니다.",
    hasCalculatorLink: true,
  },
  {
    question: "DSR과 DTI는 어떻게 다른가요?",
    answer: "DTI는 주담대 원리금 + 기타 대출 이자만 반영하지만, DSR은 모든 대출의 원리금(원금+이자)을 반영합니다. DSR이 더 엄격한 기준입니다.",
    hasCalculatorLink: false,
  },
];

const dsrConfig = {
  id: "dsr",
  name: "DSR / 대출한도 계산기",
  introPath: "/dsr",
  calculatorPath: "/dsr/calculator",

  intro: {
    seoTitle: "DSR 계산기 | 대출 가능 금액 확인 - LoanClock",
    seoDescription: "DSR이란 무엇인지 쉽게 설명하고, 내 소득 기준으로 추가 대출 가능 금액을 바로 계산해보세요.",
    badge: "DSR / 대출한도 계산기",
    title: "DSR 계산기\n지금 대출 가능 금액 확인",
    subtitle: "내 소득과 기존 대출을 기준으로, 추가로 얼마나 더 빌릴 수 있는지 바로 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "DSR이란?", desc: "연 소득 대비 모든 대출의 연간 원리금 상환액 비율입니다." },
      { icon: ShieldAlert, title: "왜 중요한가?", desc: "은행 대출 승인 여부를 결정하는 핵심 지표입니다." },
      { icon: Calculator, title: "어떻게 계산?", desc: "연간 원리금 상환액 ÷ 연 소득 × 100으로 계산합니다." },
    ],
    sections: [
      {
        title: "DSR이란?",
        content: "DSR(총부채원리금상환비율)은 연 소득 대비 모든 대출의 연간 원리금(원금 + 이자) 상환액 비율입니다.",
        visual: {
          type: "formula",
          items: [
            { label: "연간 원리금 상환액 합계" },
            { type: "op", label: "÷" },
            { label: "연 소득" },
            { type: "op", label: "×" },
            { label: "100" },
            { type: "op", label: "=" },
            { label: "DSR (%)" },
          ],
          caption: "예: 연 소득 5,000만원, 연간 상환액 2,000만원 → DSR 40%",
        },
      },
      {
        title: "DSR 한도는 얼마인가요?",
        content: "이 한도를 초과하면 새로운 대출을 받기 어렵습니다. 기존 대출이 많을수록 추가 대출 가능 금액이 줄어듭니다.",
        visual: {
          type: "stats",
          items: [
            { value: "40%", label: "은행권 (1금융)" },
            { value: "50%", label: "2금융권" },
            { value: "60%", label: "3금융권" },
          ],
        },
      },
      {
        title: "스트레스 DSR이란?",
        content: "2024년부터 도입된 스트레스 DSR은 향후 금리 상승 가능성을 반영하여 실제 금리보다 높은 금리(가산금리 추가)로 DSR을 계산하는 제도입니다.\n\n이로 인해 같은 소득과 부채 조건에서도 대출 가능 금액이 줄어들었습니다. 변동금리 대출일수록 영향이 큽니다.",
        highlight: "주의: 스트레스 DSR 적용으로 실제 대출 한도는 이 계산기 결과보다 낮을 수 있습니다.",
      },
      {
        title: "DSR을 낮추려면?",
        content: "소득 증가도 DSR을 낮추지만, 반드시 소득 증빙(원천징수영수증 등)이 가능해야 금융기관에서 인정합니다.",
        visual: {
          type: "steps",
          items: [
            { title: "기존 대출 상환", desc: "일부라도 상환하면 월 상환액이 줄어 DSR이 낮아집니다" },
            { title: "대출 기간 연장", desc: "월 상환액이 줄어 DSR이 낮아지지만 총 이자는 늘어납니다" },
            { title: "소득 증빙 강화", desc: "추가 소득이 있다면 증빙 서류를 준비하세요" },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 소득 기준으로 얼마나 더 빌릴 수 있는지 확인해보세요",
      subtitle: "소득과 기존 대출만 입력하면 1분 안에 결과를 볼 수 있어요",
    },
  },

  seo: {
    title: "DSR 계산기 | 대출한도 역산 - LoanClock",
    description: "연 소득과 기존 대출을 입력하면 DSR을 계산하고, 추가로 얼마나 더 빌릴 수 있는지 바로 확인할 수 있습니다.",
  },

  hero: {
    title: "나는 얼마나\n더 빌릴 수 있을까?",
    subtitle: "소득과 기존 대출만 입력하면, 추가로 빌릴 수 있는 금액을 바로 알려드려요.",
    badge: "DSR / 대출한도 계산기",
  },

  infoParagraph: "DSR(총부채원리금상환비율)은 대출 심사의 핵심 기준입니다. 연 소득과 기존 대출을 입력하면 현재 DSR과 추가 대출 가능 금액을 바로 확인할 수 있습니다.",

  formTitle: "소득 & 부채 정보",
  formSubtitle: "연 소득과 기존 대출 정보를 입력해주세요.",
  submitLabel: "내 한도 확인하기",

  emptyStateMessage: "위에 소득과 대출 정보를 입력해주세요",
  emptyStateHint: "연 소득과 기존 대출만 넣으면 됩니다.",

  advancedSubtitle: "새로 받으려는 대출 조건을 입력하면 DSR 기준상 예상 상환 여력을 계산할 수 있습니다.",

  fields: [
    { key: "annualIncome", type: "currency", label: "연 소득 (세전)", placeholder: "예: 50,000,000", group: "basic", suffix: "원" },
    { key: "desiredRate", type: "rate", label: "희망 대출 금리 (연 %)", placeholder: "예: 4.5", group: "advanced", bankPreset: true, gridCol: 1 },
    { key: "desiredMonths", type: "months", label: "희망 대출기간 (개월)", placeholder: "예: 360", group: "advanced", gridCol: 1 },
    {
      key: "repaymentType", type: "select", label: "상환방식", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
    {
      key: "dsrLimit", type: "dsrPreset", label: "DSR 적용 기준",
      group: "advanced",
      hint: "일반적으로 차주 단위 DSR은 은행권 40%, 제2금융권 50% 기준을 참고합니다. 다만 실제 대출 가능 여부와 한도는 대출 종류, 총대출액, 기존 부채, 소득, 금융사 심사 기준, 스트레스 DSR 적용 여부에 따라 달라질 수 있습니다.",
    },
    { key: "existingDebts", type: "dsrDebtList", label: "기존 대출 목록", group: "debt", hint: "현재 상환 중인 대출이 있다면 추가해주세요. 기존 대출이 없다면 추가하지 않아도 됩니다." },
  ],

  defaults: {
    annualIncome: "",
    existingDebts: [],
    desiredRate: "",
    desiredMonths: "",
    repaymentType: "equal_payment",
    dsrLimit: "bank",
  },

  sideEffects: [],

  parseValues: (values) => ({
    annualIncome: Number(String(values.annualIncome).replace(/,/g, "")),
    existingDebts: Array.isArray(values.existingDebts) ? values.existingDebts : [],
    desiredRate: Number(values.desiredRate),
    desiredMonths: Number(values.desiredMonths),
    repaymentType: values.repaymentType ?? "equal_payment",
    dsrLimit: parsePresetValue(values.dsrLimit).dsrValue || 40,
  }),

  validate: (parsed) => {
    if (!parsed.annualIncome || parsed.annualIncome <= 0) return "연 소득을 입력해주세요.";
    if (!Number.isFinite(parsed.desiredRate) || parsed.desiredRate < 0) return "희망 금리를 올바르게 입력해주세요.";
    if (!parsed.desiredMonths || parsed.desiredMonths <= 0) return "희망 대출기간을 입력해주세요.";
    if (!parsed.dsrLimit || parsed.dsrLimit < 1 || parsed.dsrLimit > 100) return "DSR 기준은 1~100 사이의 숫자로 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    annualIncome: formatInputNumber(String(input.annualIncome)),
    existingDebts: input.existingDebts,
    desiredRate: String(input.desiredRate),
    desiredMonths: String(input.desiredMonths),
    repaymentType: input.repaymentType,
    dsrLimit: input.dsrLimit === 40 ? "bank" : input.dsrLimit === 50 ? "secondary" : `custom:${input.dsrLimit}`,
  }),

  engine: dsrEngine,
  interpreter: dsrInterpreter,
  ResultComponent: DsrResults,

  getCtaUrl: (input, result) => {
    if (!input || !result || !result.maxLoanAmount) return "/compare";
    return buildCompareUrl(
      { principal: result.maxLoanAmount, annualRate: input.desiredRate, months: input.desiredMonths },
      result.newLoan,
      null,
    );
  },
  getCtaLabel: (result) => result?.maxLoanAmount > 0 ? "내 조건에 맞는 상품 보기" : "대출 상품 확인하기",
  getCtaSubtext: (input, result) => {
    if (!result || !result.maxLoanAmount) return null;
    return `참고용 예상 한도 최대 약 ${formatCurrency(result.maxLoanAmount)}`;
  },

  trackCalculate: trackDsrCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcDsrV1",
  scenarioStorageKey: null,

  faqItems: DSR_FAQ,
  faqTitle: "이런 점이 궁금하지 않으세요?",
  faqSubtitle: "DSR과 대출한도, 대출 전에 꼭 확인해야 할 핵심 질문들",
};

export default dsrConfig;
