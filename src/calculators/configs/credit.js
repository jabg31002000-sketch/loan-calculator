import { REPAYMENT_OPTIONS, PRIORITY_OPTIONS, FAQ_ITEMS } from "../../components/loan-calculator/constants";
import { formatInputNumber, getCtaUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCalculateEvent, trackSaveScenarioEvent, trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, ArrowDownUp, TrendingDown, Equal, ArrowDown, Clock } from "lucide-react";
import creditEngine from "../engines/creditEngine";
import creditInterpreter from "../interpreters/creditInterpreter";
import CreditLoanResults from "../results/CreditLoanResults";

const creditConfig = {
  id: "credit",
  name: "신용대출 계산기",
  introPath: "/credit-loan",
  calculatorPath: "/credit-loan/calculator",

  intro: {
    seoTitle: "신용대출 이자 계산기 | 월 상환금 확인 - LoanClock",
    seoDescription: "신용대출 이자 계산기로 월 상환금과 총 이자를 비교하세요. 상환방식별 차이, 거치기간 효과까지 쉽게 설명합니다.",
    badge: "신용대출 계산기",
    title: "신용대출 이자 계산기",
    subtitle: "대출 금액과 금리만 입력하면 월 상환금, 총 이자, 상환방식별 차이를 바로 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "신용대출이란?", desc: "담보 없이 개인 신용만으로 받는 대출입니다. 금리가 담보대출보다 높은 편입니다." },
      { icon: ArrowDownUp, title: "상환방식 차이", desc: "원리금균등, 원금균등, 만기일시 중 어떤 방식을 선택하느냐에 따라 월 부담이 달라집니다." },
      { icon: TrendingDown, title: "금리의 영향", desc: "0.5%p 차이로도 총 이자가 수십~수백만원 달라질 수 있습니다." },
    ],
    sections: [
      {
        title: "신용대출이란?",
        content: "신용대출은 부동산이나 자동차 같은 담보 없이, 개인의 신용등급과 소득을 기반으로 받는 대출입니다.\n\n은행, 저축은행, 캐피탈사 등 다양한 금융기관에서 취급하며, 금리는 보통 연 3%~15% 수준입니다. 신용등급이 높고 소득이 안정적일수록 낮은 금리를 받을 수 있습니다.",
        highlight: "핵심: 같은 금액을 빌려도 금리와 상환방식에 따라 매달 내는 돈이 크게 달라집니다.",
      },
      {
        title: "상환방식별 차이점",
        content: "원리금균등, 원금균등, 만기일시 — 세 가지 상환방식에 따라 월 부담과 총 이자가 크게 달라집니다.",
        visual: {
          type: "comparison",
          items: [
            { icon: Equal, title: "원리금균등", desc: "매달 같은 금액 납부. 계획 세우기 쉽고 월 부담이 일정합니다.", accent: true },
            { icon: ArrowDown, title: "원금균등", desc: "초반에 많이, 점점 줄어듦. 총 이자가 가장 적습니다." },
            { icon: Clock, title: "만기일시", desc: "이자만 내다가 만기에 원금 일시 상환. 총 이자가 가장 많습니다." },
          ],
        },
      },
      {
        title: "거치기간이란?",
        content: "거치기간은 원금 상환 없이 이자만 납부하는 기간입니다. 초기 부담을 줄일 수 있지만, 거치기간이 끝나면 남은 기간에 원금을 집중 상환해야 하므로 월 부담이 급격히 늘어납니다.\n\n거치기간을 설정하면 총 이자도 늘어나므로 신중히 결정해야 합니다.",
        highlight: "팁: 거치기간 12개월 설정 시 총 이자가 10~20% 이상 늘어날 수 있습니다.",
      },
      {
        title: "계산 전 꼭 확인하세요",
        content: "대출 금리는 고정금리와 변동금리가 있습니다. 변동금리는 기준금리 변동에 따라 이자가 바뀔 수 있으므로, 금리 상승 가능성도 고려해야 합니다.",
        visual: {
          type: "steps",
          items: [
            { title: "금리 비교", desc: "은행별 금리를 비교하면 0.5~1%p 이상 차이가 납니다" },
            { title: "상환방식 선택", desc: "월 부담 우선이면 원리금균등, 이자 절약 우선이면 원금균등" },
            { title: "거치기간 검토", desc: "초기 부담은 줄지만 총 이자는 늘어나는 점 유의" },
          ],
        },
      },
    ],
    bottomCta: {
      title: "내 조건으로 월 상환금을 확인해보세요",
      subtitle: "금액, 금리, 기간만 입력하면 1분 안에 결과를 볼 수 있어요",
    },
  },

  seo: {
    title: "신용대출 이자 계산기 | 월 상환금 바로 확인 - LoanClock",
    description: "대출 금액과 금리를 입력하면 월 상환금과 총 이자를 바로 계산해드립니다. 상환방식 비교, 절약 가능성까지 1분 안에 확인하세요.",
  },

  hero: {
    title: "매달 얼마나\n내야 할까요?",
    subtitle: "대출 조건만 입력하면, 월 상환금부터 절약 가능성까지 바로 확인해드려요.",
    badge: "신용대출 계산기",
  },

  infoParagraph: "신용대출 금리와 상환방식에 따라 월 납입금이 크게 달라집니다. 원리금균등·원금균등·만기일시 상환의 차이를 비교하고, 거치기간 설정에 따른 이자 변화까지 확인해보세요.",

  formTitle: "대출 조건 입력",
  formSubtitle: "3가지만 입력하면 바로 결과를 볼 수 있어요.",
  submitLabel: "내 상환금 확인하기",

  emptyStateMessage: "위에 조건을 입력하면 결과가 바로 나와요",
  emptyStateHint: "대출금액, 금리, 기간만 넣으면 됩니다.",

  fields: [
    { key: "principal", type: "currency", label: "대출금액", placeholder: "5,000만원이면 50,000,000", group: "basic" },
    { key: "annualRate", type: "rate", label: "금리 (연 %)", placeholder: "예: 4.5", group: "basic", bankPreset: true, gridCol: 1 },
    { key: "months", type: "months", label: "대출기간", placeholder: "예: 36개월", group: "basic", hint: "보통 12~360개월", gridCol: 1 },
    {
      key: "priority", type: "radio", label: "우선 목표", group: "basic",
      options: PRIORITY_OPTIONS.map((o) => ({ value: o.value, label: o.label, description: o.description })),
    },
    {
      key: "repaymentType", type: "select", label: "상환방식 직접 선택", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
    { key: "hasGracePeriod", type: "toggle", label: "거치기간", group: "advanced" },
    {
      key: "graceMonths", type: "months", label: "거치기간 (개월)", placeholder: "거치기간(개월)",
      group: "advanced", hint: "거치기간 동안은 이자만 납부합니다.",
      showWhen: { key: "hasGracePeriod", value: "yes" },
    },
  ],

  defaults: {
    principal: "",
    annualRate: "",
    months: "",
    priority: null,
    repaymentType: "equal_payment",
    hasGracePeriod: "no",
    graceMonths: "",
  },

  sideEffects: [
    {
      watch: "priority",
      apply: (val) => {
        if (!val) return null;
        const map = { low_monthly: "equal_payment", low_interest: "equal_principal", unsure: "equal_payment" };
        return { repaymentType: map[val] ?? "equal_payment" };
      },
    },
  ],

  // 폼 값 → 엔진 입력 변환
  parseValues: (values) => ({
    principal: Number(String(values.principal).replace(/,/g, "")),
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    graceMonths: values.hasGracePeriod === "yes" ? Number(values.graceMonths) : 0,
    repaymentType: values.repaymentType ?? "equal_payment",
    priority: values.priority,
  }),

  validate: (parsed) => {
    if (!parsed.principal || parsed.principal <= 0) return "대출금액을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "대출기간(개월)을 입력해주세요.";
    if (parsed.graceMonths > 0 && (!Number.isFinite(parsed.graceMonths) || parsed.graceMonths < 0)) return "거치기간을 올바르게 입력해주세요.";
    if (parsed.graceMonths > parsed.months) return "거치기간은 전체 대출기간보다 클 수 없습니다.";
    return null;
  },

  // 엔진 입력 → 폼 값 복원 (시나리오 불러오기)
  restoreValues: (input) => ({
    principal: formatInputNumber(String(input.principal)),
    annualRate: String(input.annualRate),
    months: String(input.months),
    graceMonths: input.graceMonths > 0 ? String(input.graceMonths) : "",
    hasGracePeriod: input.graceMonths > 0 ? "yes" : "no",
    repaymentType: input.repaymentType,
    priority: input.priority ?? null,
  }),

  engine: creditEngine,
  interpreter: creditInterpreter,
  ResultComponent: CreditLoanResults,

  getCtaUrl: (input, result) => {
    if (!input || !result) return "/compare";
    return getCtaUrl(input, result, result.savingsAtLowerRate);
  },
  getCtaLabel: (result) => result ? "내 조건에 맞는 금리 보기" : "내 상황에 맞는 조건 확인하기",
  getCtaSubtext: (input, result) => {
    if (!result) return null;
    return result.savingsAtLowerRate > 0
      ? `비교는 1분이면 끝나요 — 약 ${formatCurrency(result.savingsAtLowerRate)} 절약 가능`
      : "비교는 1분이면 끝나요";
  },

  trackCalculate: (parsed) => trackCalculateEvent({
    repaymentType: parsed.repaymentType,
    months: parsed.months,
    graceMonths: parsed.graceMonths,
  }),
  trackSaveScenario: trackSaveScenarioEvent,
  trackCtaClick,

  // localStorage 키 (기존 호환)
  storageKey: "loanCalcCreditV1",
  scenarioStorageKey: "loanCalcCreditScenariosV1",

  // FAQ
  faqItems: FAQ_ITEMS,
  faqTitle: "이런 것도 궁금하지 않으세요?",
  faqSubtitle: "대출 초보자가 가장 많이 검색하는 질문들",
};

export default creditConfig;
