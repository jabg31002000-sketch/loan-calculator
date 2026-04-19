import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, Wallet, ShieldCheck, Banknote } from "lucide-react";
import policyJeonseEngine from "../engines/policyJeonseEngine";
import policyJeonseInterpreter from "../interpreters/policyJeonseInterpreter";
import PolicyJeonseResults from "../results/PolicyJeonseResults";

function trackBeotimmokCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "beotimmok_calculator",
    event_label: parsed.productType,
    deposit: parsed.deposit,
  });
}

const BEOTIMMOK_FAQ = [
  {
    question: "버팀목 전세대출이란 무엇인가요?",
    answer: "버팀목 전세대출은 주택도시보증공사(HUG)의 보증을 기반으로 한 정부 지원 전세자금대출입니다. 일반 전세대출보다 금리가 낮고, 소득·자산 기준을 충족하면 이용할 수 있습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "버팀목 전세대출 금리는 얼마인가요?",
    answer: "2024년 기준 일반형은 연 1.8~2.4%, 청년형은 연 1.5~2.1%, 신혼부부형은 연 1.2~2.1% 수준입니다. 소득 구간에 따라 차등 적용됩니다.",
    hasCalculatorLink: true,
  },
  {
    question: "대출 비율은 최대 얼마인가요?",
    answer: "수도권 기준 최대 80%, 비수도권 최대 80%까지 가능합니다. 다만 보증금 한도(수도권 3억, 비수도권 2억)와 소득 기준에 따라 실제 대출 가능액은 달라집니다.",
    hasCalculatorLink: false,
  },
  {
    question: "청년 버팀목과 일반 버팀목의 차이는?",
    answer: "청년 버팀목은 만 19~34세, 연소득 5천만원 이하가 대상이며 일반형보다 금리가 약 0.3~0.5%p 낮습니다. 신혼부부형은 결혼 7년 이내로 별도 우대 금리가 적용됩니다.",
    hasCalculatorLink: false,
  },
];

const beotimmokJeonseConfig = {
  id: "beotimmokJeonse",
  name: "버팀목 전세대출 계산기",
  introPath: "/beotimmok-jeonse",
  calculatorPath: "/beotimmok-jeonse/calculator",

  intro: {
    seoTitle: "버팀목 전세대출 계산기 | 예상 대출금·이자 확인 - LoanClock",
    seoDescription: "버팀목 전세대출로 얼마를 빌릴 수 있는지, 월 이자와 자기자금은 얼마인지 바로 확인하세요.",
    badge: "버팀목 전세대출",
    title: "버팀목 전세대출 계산기",
    subtitle: "보증금, 금리, 소득을 입력하면 예상 대출금과 월 부담금을 바로 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "버팀목이란?", desc: "정부가 보증하는 저금리 전세대출 상품입니다. 일반·청년·신혼 유형이 있습니다." },
      { icon: Wallet, title: "낮은 금리", desc: "시중 전세대출보다 금리가 낮아 이자 부담을 줄일 수 있습니다." },
      { icon: ShieldCheck, title: "소득 기준", desc: "소득과 자산 기준을 충족해야 하며, 유형별로 조건이 다릅니다." },
    ],
    sections: [
      {
        title: "버팀목 전세대출은 어떤 상품인가요?",
        content: "버팀목 전세대출은 주택도시보증공사(HUG)의 전세보증을 기반으로 정부가 지원하는 전세자금대출입니다.\n\n시중 은행 전세대출보다 금리가 낮고, 일반형·청년형·신혼부부형으로 나뉩니다. 소득과 자산 기준을 충족하면 누구나 신청할 수 있습니다.",
        visual: {
          type: "stats",
          items: [
            { value: "1.2~2.4%", label: "금리 범위" },
            { value: "최대 80%", label: "대출 비율" },
            { value: "최대 3억", label: "보증금 한도 (수도권)" },
          ],
        },
      },
      {
        title: "어떤 기준으로 계산하나요?",
        content: "이 계산기는 보증금, 대출 비율, 금리, 기간을 바탕으로 예상 대출금, 월 부담금, 총 이자, 필요 자기자금을 보여줍니다.\n\n소득을 입력하면 소득 대비 상환 부담률도 함께 확인할 수 있어, 현재 조건이 무리 없는 수준인지 판단할 수 있습니다.",
        highlight: "소득 대비 상환 부담률 25% 이하가 이상적이며, 40%를 넘으면 부담이 큽니다.",
      },
      {
        title: "유형별 차이 한눈에 보기",
        content: "상품 유형에 따라 금리와 대상 조건이 달라집니다.",
        visual: {
          type: "comparison",
          items: [
            { icon: Banknote, title: "일반형", desc: "소득 5천만원 이하 무주택 세대주. 금리 연 1.8~2.4%.", accent: false },
            { icon: Banknote, title: "청년형", desc: "만 19~34세, 소득 5천만원 이하. 금리 연 1.5~2.1%.", accent: true },
            { icon: Banknote, title: "신혼부부형", desc: "결혼 7년 이내, 합산 소득 6천만원 이하. 금리 연 1.2~2.1%.", accent: true },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 조건에서 얼마나 대출받을 수 있는지 확인해보세요",
      subtitle: "보증금과 소득만 입력하면 바로 결과를 볼 수 있어요",
    },
  },

  seo: {
    title: "버팀목 전세대출 계산기 | 예상 대출금 확인 - LoanClock",
    description: "버팀목 전세대출로 얼마를 빌릴 수 있는지, 월 이자와 필요 자기자금을 바로 확인하세요.",
  },

  hero: {
    title: "버팀목 전세대출,\n자기자금은 얼마나 필요할까?",
    subtitle: "유형별 대출 한도·비율이 달라서, 자기자금 준비가 핵심입니다.",
    badge: "버팀목 전세대출 계산기",
  },

  infoParagraph: "버팀목 전세대출은 유형(일반·청년·신혼)에 따라 대출 비율과 한도가 달라집니다. 보증금과 소득을 입력하면 필요 자기자금과 월 부담금을 확인할 수 있습니다.",

  formTitle: "전세 진입 조건",
  formSubtitle: "보증금과 소득을 입력하면 자기자금과 월 부담금을 보여드려요.",
  submitLabel: "전세 진입 가능성 확인하기",

  emptyStateMessage: "위에 전세보증금과 조건을 입력해주세요",
  emptyStateHint: "보증금과 금리만 넣으면 바로 결과를 볼 수 있어요.",

  fields: [
    { key: "deposit", type: "currency", label: "전세보증금", placeholder: "예: 200,000,000", group: "basic", suffix: "원" },
    { key: "loanRatio", type: "number", label: "대출 비율 (%)", placeholder: "예: 80", group: "basic", suffix: "%", gridCol: 1 },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 1.8", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "대출기간 (개월)", placeholder: "예: 24", group: "basic" },
    { key: "annualIncome", type: "currency", label: "연소득 (세전)", placeholder: "예: 40,000,000", group: "basic", suffix: "원" },
    {
      key: "productType", type: "select", label: "상품 유형", group: "basic",
      options: [
        { value: "general", label: "일반" },
        { value: "youth", label: "청년" },
        { value: "newlywed", label: "신혼부부" },
      ],
    },
    {
      key: "graceMonths", type: "months", label: "거치기간 (개월)", placeholder: "예: 6",
      group: "advanced", hint: "거치기간 동안은 이자만 납부합니다.",
    },
  ],

  defaults: {
    deposit: "",
    loanRatio: "80",
    annualRate: "",
    months: "24",
    annualIncome: "",
    productType: "general",
    graceMonths: "",
  },

  sideEffects: [
    {
      watch: "productType",
      apply: (productType) => {
        const ratioMap = { general: "70", youth: "80", newlywed: "80" };
        return { loanRatio: ratioMap[productType] || "70" };
      },
    },
  ],

  parseValues: (values) => ({
    mode: "beotimmok",
    deposit: Number(String(values.deposit).replace(/,/g, "")),
    loanRatio: Number(values.loanRatio) || 80,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    annualIncome: Number(String(values.annualIncome || "0").replace(/,/g, "")),
    productType: values.productType ?? "general",
    graceMonths: Number(values.graceMonths) || 0,
  }),

  validate: (parsed) => {
    if (!parsed.deposit || parsed.deposit <= 0) return "전세보증금을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "대출기간을 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    deposit: formatInputNumber(String(input.deposit)),
    loanRatio: String(input.loanRatio),
    annualRate: String(input.annualRate),
    months: String(input.months),
    annualIncome: input.annualIncome ? formatInputNumber(String(input.annualIncome)) : "",
    productType: input.productType,
    graceMonths: input.graceMonths ? String(input.graceMonths) : "",
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
  getCtaLabel: (result) => result?.rule?.ctaLabel || "전세대출 조건 비교하기",
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    return `자기자금 ${formatCurrency(result.selfFund)} · 대출 ${formatCurrency(result.loanAmount)}`;
  },

  trackCalculate: trackBeotimmokCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcBeotimmokV1",
  scenarioStorageKey: null,

  faqItems: BEOTIMMOK_FAQ,
  faqTitle: "버팀목 전세대출 Q&A",
  faqSubtitle: "자주 묻는 질문들을 확인하세요",
};

export default beotimmokJeonseConfig;
