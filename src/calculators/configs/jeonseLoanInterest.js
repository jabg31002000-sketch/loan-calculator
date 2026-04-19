import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, Wallet, Calculator } from "lucide-react";
import policyJeonseEngine from "../engines/policyJeonseEngine";
import policyJeonseInterpreter from "../interpreters/policyJeonseInterpreter";
import PolicyJeonseResults from "../results/PolicyJeonseResults";

function trackJeonseLoanInterestCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "jeonse_loan_interest_calculator",
    deposit: parsed.deposit,
  });
}

const JEONSE_INTEREST_FAQ = [
  {
    question: "전세대출 이자는 어떻게 계산되나요?",
    answer: "전세보증금 × 대출비율 = 대출원금이고, 대출원금 × 연 금리 ÷ 12 = 월 이자입니다. 만기일시상환 기준으로 매달 이자만 내고, 만기 때 원금을 한꺼번에 상환합니다.",
    hasCalculatorLink: false,
  },
  {
    question: "대출비율은 보통 얼마인가요?",
    answer: "일반적으로 전세보증금의 70~80%까지 대출이 가능합니다. 정부 지원 상품(버팀목 등)은 최대 80%, 시중 은행은 신용에 따라 다릅니다.",
    hasCalculatorLink: false,
  },
  {
    question: "금리가 0.5% 차이나면 얼마나 다른가요?",
    answer: "예를 들어 대출금 2억 기준, 금리가 0.5% 차이나면 월 이자가 약 8.3만원 차이 납니다. 24개월이면 약 200만원 차이입니다.",
    hasCalculatorLink: true,
  },
];

const jeonseLoanInterestConfig = {
  id: "jeonseLoanInterest",
  name: "전세대출 이자 계산기",
  introPath: "/jeonse-loan-interest",
  calculatorPath: "/jeonse-loan-interest/calculator",

  intro: {
    seoTitle: "전세대출 이자 계산기 | 월 이자 바로 확인 - LoanClock",
    seoDescription: "전세보증금과 금리만 입력하면 월 이자, 총 이자, 필요 자기자금을 바로 확인할 수 있습니다.",
    badge: "전세대출 이자 계산기",
    title: "전세대출 이자 계산기",
    subtitle: "보증금과 금리만 넣으면 매달 얼마나 내야 하는지 바로 확인할 수 있어요.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: Calculator, title: "초간단 계산", desc: "보증금, 대출비율, 금리, 기간 4가지만 입력하면 됩니다." },
      { icon: Wallet, title: "월 이자 확인", desc: "매달 내야 하는 이자 금액을 바로 알 수 있습니다." },
      { icon: HelpCircle, title: "자기자금 확인", desc: "대출 후 직접 준비해야 하는 보증금도 함께 보여줍니다." },
    ],
    sections: [
      {
        title: "전세대출 이자, 왜 미리 확인해야 할까?",
        content: "전세 계약 전에 매달 나가는 이자를 미리 계산해보면, 내 생활비에 얼마나 영향을 주는지 파악할 수 있습니다.\n\n특히 대출 비율이 높을수록 이자 부담이 커지므로, 대출 비율과 금리에 따른 이자 차이를 확인하는 것이 중요합니다.",
      },
      {
        title: "이자 계산 원리",
        content: "전세대출 이자는 만기일시상환 기준으로 계산됩니다.",
        visual: {
          type: "formula",
          items: [
            { label: "보증금" },
            { type: "op", label: "×" },
            { label: "대출비율" },
            { type: "op", label: "×" },
            { label: "금리/12" },
            { type: "op", label: "=" },
            { label: "월 이자" },
          ],
          caption: "예: 2억 × 80% × 3.5%/12 = 약 46.7만원",
        },
      },
      {
        title: "금리 차이가 만드는 이자 차이",
        content: "금리가 1%만 낮아져도 대출금이 크면 수백만원의 이자를 아낄 수 있습니다. 여러 금리를 넣어보고 비교해보세요.",
        highlight: "같은 보증금이라도 금리에 따라 연간 수십~수백만원의 차이가 생깁니다.",
      },
    ],
    bottomCta: {
      title: "내 전세대출 이자를 바로 확인해보세요",
      subtitle: "보증금과 금리만 넣으면 됩니다",
    },
  },

  seo: {
    title: "전세대출 이자 계산기 | 월 이자 바로 확인 - LoanClock",
    description: "전세보증금과 금리만 입력하면 월 이자, 총 이자, 필요 자기자금을 바로 확인할 수 있습니다.",
  },

  hero: {
    title: "전세대출 이자,\n매달 얼마나 낼까?",
    subtitle: "보증금과 금리만 넣으면 월 이자를 바로 확인할 수 있어요.",
    badge: "전세대출 이자 계산기",
  },

  infoParagraph: "전세대출 이자를 미리 계산해보면 월 생활비 계획을 세우는 데 도움이 됩니다. 보증금, 대출비율, 금리, 기간만 넣으면 됩니다.",

  formTitle: "전세대출 조건",
  formSubtitle: "아래 4가지만 입력하면 됩니다.",
  submitLabel: "이자 계산하기",

  emptyStateMessage: "위에 전세보증금과 금리를 입력해주세요",
  emptyStateHint: "4가지만 넣으면 바로 결과가 나와요.",

  fields: [
    { key: "deposit", type: "currency", label: "전세보증금", placeholder: "예: 200,000,000", group: "basic", suffix: "원" },
    { key: "loanRatio", type: "number", label: "대출비율 (%)", placeholder: "예: 80", group: "basic", suffix: "%", gridCol: 1 },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 3.5", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "기간 (개월)", placeholder: "예: 24", group: "basic" },
  ],

  defaults: {
    deposit: "",
    loanRatio: "80",
    annualRate: "",
    months: "24",
  },

  sideEffects: [],

  parseValues: (values) => ({
    mode: "jeonseInterest",
    deposit: Number(String(values.deposit).replace(/,/g, "")),
    loanRatio: Number(values.loanRatio) || 80,
    annualRate: Number(values.annualRate),
    months: Number(values.months),
  }),

  validate: (parsed) => {
    if (!parsed.deposit || parsed.deposit <= 0) return "전세보증금을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "기간을 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    deposit: formatInputNumber(String(input.deposit)),
    loanRatio: String(input.loanRatio),
    annualRate: String(input.annualRate),
    months: String(input.months),
  }),

  engine: policyJeonseEngine,
  interpreter: policyJeonseInterpreter,
  ResultComponent: PolicyJeonseResults,

  getCtaUrl: () => "/beotimmok-jeonse/calculator",
  getCtaLabel: () => "버팀목 전세대출도 확인하기",
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    return `월 이자 약 ${formatCurrency(result.monthlyInterest)} · 정책형 전세대출 비교`;
  },

  trackCalculate: trackJeonseLoanInterestCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcJeonseLoanInterestV1",
  scenarioStorageKey: null,

  faqItems: JEONSE_INTEREST_FAQ,
  faqTitle: "전세대출 이자 Q&A",
  faqSubtitle: "자주 묻는 질문들",
};

export default jeonseLoanInterestConfig;
