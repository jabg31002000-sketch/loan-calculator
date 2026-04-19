import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, TrendingDown, AlertTriangle } from "lucide-react";
import refinanceEngine from "../engines/refinanceEngine";
import refinanceInterpreter from "../interpreters/refinanceInterpreter";
import RefinanceResults from "../results/RefinanceResults";

function trackRefinanceCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "refinance_calculator",
    event_label: parsed.currentRepayment,
    current_rate: parsed.currentRate,
    new_rate: parsed.newRate,
  });
}

const REFINANCE_FAQ = [
  {
    question: "대환이 유리한 경우는 언제인가요?",
    answer: "현재 금리가 시장 평균보다 1%p 이상 높거나, 금리가 크게 하락했을 때 대환을 검토하면 좋습니다. 중도상환수수료가 없거나 3년이 지난 경우 특히 유리합니다.",
    hasCalculatorLink: true,
  },
  {
    question: "중도상환수수료는 얼마나 되나요?",
    answer: "대부분 은행은 대출 후 3년 이내 상환 시 잔액의 0.5~1.5% 정도를 수수료로 부과합니다. 3년이 지나면 보통 면제되므로 타이밍이 중요합니다.",
    hasCalculatorLink: false,
  },
  {
    question: "대환 시 필요한 서류가 있나요?",
    answer: "기본적으로 신분증, 소득증빙(원천징수영수증, 급여통장), 기존 대출 상환 증명서 등이 필요합니다. 금융기관마다 요구 서류가 다를 수 있어 미리 확인하세요.",
    hasCalculatorLink: false,
  },
  {
    question: "대환과 추가대출은 다른 건가요?",
    answer: "대환은 기존 대출을 새 대출로 갈아타는 것이고, 추가대출은 기존 대출을 유지한 채 새로 빌리는 것입니다. 대환은 금리를 낮추는 데 초점이 있고, 추가대출은 자금 확보에 초점이 있습니다.",
    hasCalculatorLink: false,
  },
];

const refinanceConfig = {
  id: "refinance",
  name: "대환/갈아타기 계산기",
  introPath: "/refinance-loan",
  calculatorPath: "/refinance-loan/calculator",

  intro: {
    seoTitle: "대환 계산기 | 갈아타면 얼마나 절약? - LoanClock",
    seoDescription: "현재 대출 금리가 너무 높다면? 대환 시 월 절약액, 총 절약액, 손익분기점까지 한눈에 비교해보세요.",
    badge: "대환/갈아타기 계산기",
    title: "대환 계산기\n갈아타면 얼마나 절약될까?",
    subtitle: "현재 대출과 새 대출 조건을 비교해서, 진짜 이득인지 손익분기점까지 바로 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "대환이란?", desc: "기존 대출을 더 낮은 금리의 새 대출로 갈아타는 것입니다." },
      { icon: TrendingDown, title: "절약 포인트", desc: "금리 차이만큼 매달 이자가 줄어들어 총 상환액이 감소합니다." },
      { icon: AlertTriangle, title: "비용 주의", desc: "중도상환수수료가 있을 수 있으므로 순 절약액을 반드시 확인하세요." },
    ],
    sections: [
      {
        title: "대환이란?",
        content: "대환(갈아타기)은 현재 높은 금리로 상환 중인 대출을 해지하고, 더 낮은 금리의 새 대출로 전환하는 것입니다.\n\n금리가 하락한 시기이거나, 처음 대출 당시보다 신용등급이 올랐다면 더 좋은 조건을 받을 수 있습니다.",
        visual: {
          type: "formula",
          items: [
            { label: "현재 총 이자" },
            { type: "op", label: "−" },
            { label: "새 대출 총 이자" },
            { type: "op", label: "−" },
            { label: "대환 비용" },
            { type: "op", label: "=" },
            { label: "순 절약액" },
          ],
          caption: "순 절약액이 양수면 대환이 유리합니다",
        },
      },
      {
        title: "대환이 유리한 경우",
        content: "현재 금리가 시장 평균보다 1%p 이상 높을 때, 기준금리가 크게 하락했을 때, 신용등급이 올라 더 좋은 조건을 받을 수 있을 때 대환을 검토하면 좋습니다.\n\n특히 대출 후 3년이 지나 중도상환수수료가 면제된 경우 대환의 실질 이점이 더 큽니다.",
      },
      {
        title: "중도상환수수료란?",
        content: "대부분의 은행은 대출 후 3년 이내에 상환하면 잔액의 0.5~1.5%를 수수료로 부과합니다. 대환 시 이 비용을 반드시 계산에 포함해야 합니다.",
        visual: {
          type: "stats",
          items: [
            { value: "0.5~1.5%", label: "3년 이내 수수료" },
            { value: "0%", label: "3년 이후 (면제)" },
          ],
        },
        highlight: "팁: 중도상환수수료보다 이자 절약액이 큰지 확인하세요. 이것이 '손익분기점'입니다.",
      },
      {
        title: "대환 전 체크리스트",
        content: "아래 순서대로 확인하면 대환 여부를 판단할 수 있습니다.",
        visual: {
          type: "steps",
          items: [
            { title: "현재 대출 확인", desc: "남은 기간, 잔액, 금리를 확인합니다" },
            { title: "새 대출 조건 비교", desc: "갈아탈 금리와 조건을 비교합니다" },
            { title: "중도상환수수료 확인", desc: "3년 이내인지, 수수료가 얼마인지 확인합니다" },
            { title: "순 절약액 계산", desc: "이자 절약액 − 대환 비용 = 순 이익" },
          ],
        },
      },
    ],
    bottomCta: {
      title: "갈아타면 얼마나 줄어드는지 확인해보세요",
      subtitle: "현재 대출 정보만 입력하면 바로 비교할 수 있어요",
    },
  },

  seo: {
    title: "대환 계산기 | 갈아타면 얼마나 절약? - LoanClock",
    description: "현재 대출과 새 대출을 비교해보세요. 월 절약액, 총 절약액, 손익분기점까지 한눈에 확인할 수 있습니다.",
  },

  hero: {
    title: "갈아타면 얼마나\n줄어들까요?",
    subtitle: "지금 대출과 새 조건을 비교해서, 진짜 이득인지 바로 확인해드려요.",
    badge: "대환/갈아타기 계산기",
  },

  infoParagraph: "현재 대출을 더 낮은 금리로 갈아타면 월 상환금과 총 이자를 줄일 수 있습니다. 중도상환수수료를 감안한 순 절약액과 손익분기점까지 한눈에 비교해보세요.",

  formTitle: "현재 대출 vs 새 대출",
  formSubtitle: "지금 대출 정보와 갈아탈 조건을 입력해주세요.",
  submitLabel: "절약액 확인하기",

  emptyStateMessage: "위에 현재 대출 정보를 입력해주세요",
  emptyStateHint: "현재 잔액과 금리, 갈아탈 금리만 넣으면 됩니다.",

  fields: [
    { key: "currentBalance", type: "currency", label: "현재 대출 잔액", placeholder: "예: 100,000,000", group: "basic" },
    { key: "currentRate", type: "rate", label: "현재 금리 (연 %)", placeholder: "예: 5.5", group: "basic", gridCol: 1 },
    { key: "remainingMonths", type: "months", label: "남은 상환기간 (개월)", placeholder: "예: 240", group: "basic", gridCol: 1 },
    {
      key: "currentRepayment", type: "select", label: "현재 상환방식", group: "basic",
      options: REPAYMENT_OPTIONS,
    },
    { key: "newRate", type: "rate", label: "갈아탈 금리 (연 %)", placeholder: "예: 3.8", group: "basic", bankPreset: true },
    {
      key: "newMonths", type: "months", label: "새 대출기간 (개월)", placeholder: "남은 기간과 동일",
      group: "advanced", hint: "비워두면 남은 기간과 동일하게 적용됩니다.",
    },
    {
      key: "newRepayment", type: "select", label: "새 상환방식", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
    {
      key: "switchingCost", type: "currency", label: "대환 비용 (중도상환수수료 등)", placeholder: "예: 500,000",
      group: "advanced", suffix: "원",
    },
  ],

  defaults: {
    currentBalance: "",
    currentRate: "",
    remainingMonths: "",
    currentRepayment: "equal_payment",
    newRate: "",
    newMonths: "",
    newRepayment: "equal_payment",
    switchingCost: "",
  },

  sideEffects: [],

  parseValues: (values) => ({
    currentBalance: Number(String(values.currentBalance).replace(/,/g, "")),
    currentRate: Number(values.currentRate),
    remainingMonths: Number(values.remainingMonths),
    currentRepayment: values.currentRepayment ?? "equal_payment",
    newRate: Number(values.newRate),
    newMonths: values.newMonths ? Number(values.newMonths) : 0,
    newRepayment: values.newRepayment ?? values.currentRepayment ?? "equal_payment",
    switchingCost: Number(String(values.switchingCost || "0").replace(/,/g, "")),
  }),

  validate: (parsed) => {
    if (!parsed.currentBalance || parsed.currentBalance <= 0) return "현재 대출 잔액을 입력해주세요.";
    if (!Number.isFinite(parsed.currentRate) || parsed.currentRate < 0) return "현재 금리를 올바르게 입력해주세요.";
    if (!parsed.remainingMonths || parsed.remainingMonths <= 0) return "남은 상환기간을 입력해주세요.";
    if (!Number.isFinite(parsed.newRate) || parsed.newRate < 0) return "갈아탈 금리를 올바르게 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    currentBalance: formatInputNumber(String(input.currentBalance)),
    currentRate: String(input.currentRate),
    remainingMonths: String(input.remainingMonths),
    currentRepayment: input.currentRepayment,
    newRate: String(input.newRate),
    newMonths: input.newMonths ? String(input.newMonths) : "",
    newRepayment: input.newRepayment,
    switchingCost: input.switchingCost ? formatInputNumber(String(input.switchingCost)) : "",
  }),

  engine: refinanceEngine,
  interpreter: refinanceInterpreter,
  ResultComponent: RefinanceResults,

  getCtaUrl: (input, result) => {
    if (!input || !result) return "/compare";
    return buildCompareUrl(
      { principal: input.currentBalance, annualRate: input.newRate, months: input.newMonths || input.remainingMonths },
      result.newLoan,
      result.totalSaving > 0 ? result.totalSaving : null,
    );
  },
  getCtaLabel: (result) => result ? "갈아타면 얼마나 줄어드는지 보기" : "대출 금리 비교하기",
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    return result.isWorthSwitch
      ? `지금 조건으로 약 ${formatCurrency(result.totalSaving)} 절약 가능해요`
      : "더 유리한 조건이 있을 수 있어요";
  },

  trackCalculate: trackRefinanceCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcRefinanceV1",
  scenarioStorageKey: null,

  faqItems: REFINANCE_FAQ,
  faqTitle: "대환 전에 이건 꼭 확인하세요",
  faqSubtitle: "갈아타기 전 자주 묻는 질문들",
};

export default refinanceConfig;
