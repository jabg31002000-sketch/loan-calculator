import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, Wallet, BarChart3, Home as HomeIcon, Banknote } from "lucide-react";
import jeonseEngine from "../engines/jeonseEngine";
import jeonseInterpreter from "../interpreters/jeonseInterpreter";
import JeonseResults from "../results/JeonseResults";

function trackJeonseCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "jeonse_calculator",
    event_label: "jeonse_vs_rent",
    jeonse_deposit: parsed.jeonseDeposit,
    monthly_rent: parsed.monthlyRent,
  });
}

const JEONSE_FAQ = [
  {
    question: "전세대출 금리는 보통 얼마인가요?",
    answer: "2024년 기준 전세자금대출 금리는 연 3~5% 수준입니다. 버팀목 전세대출(정부 지원)은 연 1.5~2.9%로 더 낮지만 소득·자산 기준이 있습니다.",
    hasCalculatorLink: true,
  },
  {
    question: "전세대출 비율은 얼마까지 가능한가요?",
    answer: "일반적으로 전세보증금의 70~80%까지 대출이 가능합니다. 신용등급, 소득, 금융기관에 따라 다르며, 일부 정부 지원 대출은 최대 80%까지 가능합니다.",
    hasCalculatorLink: false,
  },
  {
    question: "기회비용은 왜 계산에 포함되나요?",
    answer: "전세는 큰 보증금을 묶어야 하고, 그 돈을 투자했으면 수익을 낼 수 있었습니다. 월세는 보증금이 적어 나머지를 투자할 수 있죠. 이 차이를 기회비용으로 반영해야 정확한 비교가 됩니다.",
    hasCalculatorLink: false,
  },
  {
    question: "관리비 차이는 어떻게 반영하나요?",
    answer: "같은 단지라도 전세와 월세의 관리비가 다를 수 있습니다. 고급 설정에서 월 관리비 차이를 입력하면 총비용에 반영됩니다.",
    hasCalculatorLink: true,
  },
];

const jeonseConfig = {
  id: "jeonse",
  name: "전세 vs 월세 계산기",
  introPath: "/jeonse-vs-rent",
  calculatorPath: "/jeonse-vs-rent/calculator",

  intro: {
    seoTitle: "전세 vs 월세 비교 계산기 | 어느 쪽이 유리? - LoanClock",
    seoDescription: "전세와 월세 중 어느 쪽이 유리한지 비교해보세요. 대출이자, 기회비용까지 포함한 정확한 총비용 비교가 가능합니다.",
    badge: "전세 vs 월세 비교",
    title: "전세 vs 월세 비교 계산기",
    subtitle: "보증금, 대출이자, 기회비용까지 모두 반영해서 진짜 유리한 쪽을 알려드립니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "전세란?", desc: "큰 보증금을 맡기고 월세 없이 거주하는 한국 특유의 주거 형태입니다." },
      { icon: Wallet, title: "월세의 특징", desc: "적은 보증금에 매달 임대료를 납부합니다. 목돈 부담이 적습니다." },
      { icon: BarChart3, title: "기회비용", desc: "전세 보증금을 투자했다면 얻을 수 있었을 수익도 비용에 포함됩니다." },
    ],
    sections: [
      {
        title: "전세와 월세, 무엇이 다를까?",
        content: "단순히 '월세 = 돈 낭비'라고 생각하기 쉽지만, 전세 보증금을 마련하기 위한 대출 이자와 기회비용을 고려하면 결과가 달라질 수 있습니다.",
        visual: {
          type: "comparison",
          items: [
            { icon: HomeIcon, title: "전세", desc: "큰 보증금을 맡기고 월세 없이 거주. 계약 종료 시 보증금 반환.", accent: true },
            { icon: Banknote, title: "월세", desc: "적은 보증금 + 매달 임대료 납부. 남는 자금을 다른 곳에 활용 가능." },
          ],
        },
      },
      {
        title: "기회비용이란?",
        content: "전세 보증금 3억을 넣는 대신 월세를 살고 남는 돈(3억 - 월세보증금)을 투자했다면 수익이 생겼을 것입니다. 이것이 기회비용입니다.",
        visual: {
          type: "formula",
          items: [
            { label: "전세보증금" },
            { type: "op", label: "−" },
            { label: "월세보증금" },
            { type: "op", label: "×" },
            { label: "투자수익률" },
            { type: "op", label: "=" },
            { label: "기회비용" },
          ],
          caption: "예: (3억 − 5천만원) × 4% = 연 1,000만원 기회비용",
        },
        highlight: "핵심: 전세 vs 월세 비교 시 '보증금 기회비용'을 빼면 결과가 뒤집히는 경우가 많습니다.",
      },
      {
        title: "전세대출 이자도 비용입니다",
        content: "전세 보증금을 직접 마련하지 못해 전세자금대출을 받으면, 그 이자도 전세의 실질 비용에 포함됩니다.\n\n전세보증금 3억, 대출 비율 80%, 금리 연 3.8%라면 매달 약 76만원의 이자를 내게 됩니다. 이 금액이 월세보다 비싸다면 전세가 오히려 불리할 수 있습니다.",
      },
      {
        title: "언제 전세가 유리하고, 언제 월세가 유리할까?",
        content: "정확한 비교는 계산기로 확인하세요.",
        visual: {
          type: "comparison",
          items: [
            { icon: HomeIcon, title: "전세가 유리한 경우", desc: "자기 자금이 충분하고, 투자 수익률이 낮은 시기. 전세대출 없이 넣을 수 있을 때.", accent: true },
            { icon: Banknote, title: "월세가 유리한 경우", desc: "전세대출 금리가 높고, 투자 수익률이 높은 시기. 목돈을 묶고 싶지 않을 때." },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 조건에서 어느 쪽이 유리한지 확인해보세요",
      subtitle: "보증금과 월세만 입력하면 바로 비교할 수 있어요",
    },
  },

  seo: {
    title: "전세 vs 월세 비교 계산기 | 어느 쪽이 유리? - LoanClock",
    description: "전세와 월세 중 어느 쪽이 유리한지 비교해보세요. 대출이자, 기회비용까지 포함한 정확한 비교가 가능합니다.",
  },

  hero: {
    title: "전세가 나을까,\n월세가 나을까?",
    subtitle: "보증금, 이자, 기회비용까지 계산해서 진짜 유리한 쪽을 알려드려요.",
    badge: "전세 vs 월세 비교",
  },

  infoParagraph: "전세는 목돈이 묶이고, 월세는 매달 나가는 돈이 다릅니다. 대출이자, 보증금 기회비용, 관리비 차이까지 반영한 총비용으로 어느 쪽이 진짜 유리한지 비교해보세요.",

  formTitle: "전세 · 월세 조건",
  formSubtitle: "두 가지 조건을 입력하면 어느 쪽이 유리한지 바로 비교해요.",
  submitLabel: "어느 쪽이 유리한지 보기",

  emptyStateMessage: "위에 전세/월세 조건을 입력해주세요",
  emptyStateHint: "보증금과 월세만 넣으면 바로 비교할 수 있어요.",

  fields: [
    { key: "jeonseDeposit", type: "currency", label: "전세보증금", placeholder: "예: 300,000,000", group: "basic" },
    { key: "jeonseRate", type: "rate", label: "전세대출 금리 (연 %)", placeholder: "예: 3.8", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "jeonseLoanRatio", type: "number", label: "전세대출 비율 (%)", placeholder: "예: 80", group: "basic", suffix: "%", gridCol: 1 },
    { key: "monthlyRent", type: "currency", label: "월세 금액", placeholder: "예: 800,000", group: "basic" },
    { key: "rentDeposit", type: "currency", label: "월세 보증금", placeholder: "예: 10,000,000", group: "basic", gridCol: 1 },
    { key: "periodMonths", type: "months", label: "비교 기간 (개월)", placeholder: "예: 24", group: "basic", gridCol: 1 },
    {
      key: "investmentReturn", type: "number", label: "보증금 투자 수익률 (연 %)",
      placeholder: "예: 3.0", group: "advanced", suffix: "%",
      hint: "보증금을 투자했을 때 기대하는 연 수익률입니다. 기회비용 계산에 사용됩니다.",
    },
    {
      key: "maintenanceFee", type: "currency", label: "월 관리비 차이",
      placeholder: "예: 50,000", group: "advanced",
      hint: "월세가 전세보다 관리비가 비싼 경우 양수로 입력하세요.",
    },
  ],

  defaults: {
    jeonseDeposit: "",
    jeonseRate: "",
    jeonseLoanRatio: "80",
    monthlyRent: "",
    rentDeposit: "",
    periodMonths: "24",
    investmentReturn: "3.0",
    maintenanceFee: "",
  },

  sideEffects: [],

  parseValues: (values) => ({
    jeonseDeposit: Number(String(values.jeonseDeposit).replace(/,/g, "")),
    jeonseRate: Number(values.jeonseRate),
    jeonseLoanRatio: Number(values.jeonseLoanRatio),
    monthlyRent: Number(String(values.monthlyRent).replace(/,/g, "")),
    rentDeposit: Number(String(values.rentDeposit).replace(/,/g, "")),
    periodMonths: Number(values.periodMonths),
    investmentReturn: Number(values.investmentReturn || "0"),
    maintenanceFee: Number(String(values.maintenanceFee || "0").replace(/,/g, "")),
  }),

  validate: (parsed) => {
    if (!parsed.jeonseDeposit || parsed.jeonseDeposit <= 0) return "전세보증금을 입력해주세요.";
    if (!Number.isFinite(parsed.jeonseRate) || parsed.jeonseRate < 0) return "전세대출 금리를 올바르게 입력해주세요.";
    if (!parsed.monthlyRent || parsed.monthlyRent <= 0) return "월세 금액을 입력해주세요.";
    if (!parsed.periodMonths || parsed.periodMonths <= 0) return "비교 기간을 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    jeonseDeposit: formatInputNumber(String(input.jeonseDeposit)),
    jeonseRate: String(input.jeonseRate),
    jeonseLoanRatio: String(input.jeonseLoanRatio),
    monthlyRent: formatInputNumber(String(input.monthlyRent)),
    rentDeposit: formatInputNumber(String(input.rentDeposit)),
    periodMonths: String(input.periodMonths),
    investmentReturn: String(input.investmentReturn),
    maintenanceFee: input.maintenanceFee ? formatInputNumber(String(input.maintenanceFee)) : "",
  }),

  engine: jeonseEngine,
  interpreter: jeonseInterpreter,
  ResultComponent: JeonseResults,

  getCtaUrl: (input, result) => {
    if (!input || !result) return "/compare";
    // 전세대출 기준으로 비교 페이지로 연결
    return buildCompareUrl(
      { principal: result.jeonse.loanAmount, annualRate: input.jeonseRate, months: input.periodMonths },
      { totalInterest: result.jeonse.totalInterest },
      null,
    );
  },
  getCtaLabel: (result) => result ? "전세자금대출 조건 확인하기" : "대출 금리 비교하기",
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    return result.isJeonseBetter
      ? "전세대출 금리를 낮추면 더 절약할 수 있어요"
      : "대출 전 확인하면 실수할 확률이 줄어들어요";
  },

  trackCalculate: trackJeonseCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcJeonseV1",
  scenarioStorageKey: null,

  faqItems: JEONSE_FAQ,
  faqTitle: "집 구하기 전에 이건 꼭 확인하세요",
  faqSubtitle: "전세/월세 선택 시 자주 묻는 질문들",
};

export default jeonseConfig;
