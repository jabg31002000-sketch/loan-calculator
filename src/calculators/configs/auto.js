import { REPAYMENT_OPTIONS } from "../../components/loan-calculator/constants";
import { formatInputNumber, buildCompareUrl, formatCurrency } from "../../components/loan-calculator/utils";
import { trackCtaClick } from "../../components/loan-calculator/ga";
import { HelpCircle, Banknote, Receipt, Car, Building2 } from "lucide-react";
import autoEngine from "../engines/autoEngine";
import autoInterpreter from "../interpreters/autoInterpreter";
import AutoResults from "../results/AutoResults";

function trackAutoCalculate(parsed) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", {
    event_category: "auto_calculator",
    event_label: parsed.repaymentType,
    vehicle_price: parsed.vehiclePrice,
  });
}

const AUTO_FAQ = [
  {
    question: "자동차 할부와 오토론은 다른 건가요?",
    answer: "할부는 캐피탈사를 통해 차량 대금을 나눠 내는 것이고, 오토론은 은행에서 차량 구입 자금을 대출받는 것입니다. 할부가 절차가 간편하지만, 오토론은 금리가 더 낮은 경우가 많습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "선수금(계약금)은 얼마가 적당한가요?",
    answer: "보통 차량 가격의 20~30%를 선수금으로 넣으면 월 상환 부담이 줄어들고, 금리 우대를 받을 수도 있습니다. 선수금이 많을수록 총 이자 부담이 줄어듭니다.",
    hasCalculatorLink: false,
  },
  {
    question: "자동차 취득세는 얼마인가요?",
    answer: "승용차 취득세는 차량 가격의 7%입니다. 경차는 면제되거나 감면되며, 하이브리드·전기차도 감면 혜택이 있을 수 있습니다.",
    hasCalculatorLink: false,
  },
  {
    question: "할부 기간은 몇 개월이 좋나요?",
    answer: "36~60개월이 일반적입니다. 기간이 길수록 월 부담은 줄지만 총 이자가 늘어납니다. 차량 가치 하락 속도를 고려하면 48개월 이내를 권장합니다.",
    hasCalculatorLink: true,
  },
];

const autoConfig = {
  id: "auto",
  name: "자동차 할부 계산기",
  introPath: "/auto-loan",
  calculatorPath: "/auto-loan/calculator",

  intro: {
    seoTitle: "자동차 할부 계산기 | 월 납입금 확인 - LoanClock",
    seoDescription: "차량 가격과 할부 조건을 입력하면 월 납입금, 총 이자, 취득세까지 한눈에 확인할 수 있습니다.",
    badge: "자동차 할부 계산기",
    title: "자동차 할부 계산기",
    subtitle: "차량 가격과 할부 조건을 입력하면, 월 납입금과 총 비용을 취득세까지 포함해서 확인할 수 있습니다.",
    ctaText: "바로 계산하기",
    summaryCards: [
      { icon: HelpCircle, title: "할부 원금", desc: "차량 가격에서 선수금(계약금)을 뺀 금액이 실제 할부 대출 원금입니다." },
      { icon: Receipt, title: "취득세", desc: "승용차 취득세는 7%입니다. 경차는 면제, 하이브리드는 감면될 수 있습니다." },
      { icon: Banknote, title: "할부 vs 오토론", desc: "캐피탈 할부는 간편하지만, 은행 오토론은 금리가 더 낮을 수 있습니다." },
    ],
    sections: [
      {
        title: "자동차 할부란?",
        content: "자동차 할부는 차량 대금을 캐피탈사나 은행을 통해 나눠 내는 금융 서비스입니다. 차량 가격에서 선수금(계약금)을 뺀 나머지가 할부 원금이 됩니다.",
        visual: {
          type: "formula",
          items: [
            { label: "차량 가격" },
            { type: "op", label: "−" },
            { label: "선수금" },
            { type: "op", label: "=" },
            { label: "할부 원금" },
          ],
          caption: "보통 36~60개월 기간으로 설정합니다",
        },
      },
      {
        title: "할부와 오토론의 차이",
        content: "절차와 금리, 소유권 구조가 다릅니다. 상황에 맞는 방식을 선택하세요.",
        visual: {
          type: "comparison",
          items: [
            { icon: Car, title: "캐피탈 할부", desc: "절차 간편, 금리 다소 높음. 완납 전까지 소유권이 캐피탈사에 있음." },
            { icon: Building2, title: "은행 오토론", desc: "절차 복잡하지만 금리가 낮을 수 있음. 대출자 명의로 바로 등록.", accent: true },
          ],
        },
        highlight: "팁: 금리 차이가 1%p만 나도 48개월 기준 수십만원의 이자 차이가 발생합니다.",
      },
      {
        title: "선수금(계약금) 전략",
        content: "선수금을 20~30% 이상 넣으면 할부 원금이 줄어 월 부담과 총 이자가 크게 감소합니다. 일부 캐피탈사는 선수금 비율에 따라 금리 우대를 제공하기도 합니다.\n\n다만, 선수금을 너무 많이 넣으면 현금 유동성이 부족해질 수 있으므로 적정 비율을 찾는 것이 중요합니다.",
      },
      {
        title: "취득세와 부대비용",
        content: "차량 구입 시 취득세와 부대비용이 추가로 발생합니다. 총 비용을 미리 계산해두는 것이 좋습니다.",
        visual: {
          type: "stats",
          items: [
            { value: "7%", label: "승용차 취득세" },
            { value: "면제", label: "경차 취득세" },
            { value: "감면", label: "전기차/하이브리드" },
          ],
        },
      },
    ],
    bottomCta: {
      title: "차량 가격과 조건을 입력해서 할부금을 확인해보세요",
      subtitle: "취득세까지 포함한 총 비용을 1분 안에 확인할 수 있어요",
    },
  },

  seo: {
    title: "자동차 할부 계산기 | 월 납입금 확인 - LoanClock",
    description: "차량 가격과 할부 조건을 입력하면 월 납입금, 총 이자, 취득세까지 한눈에 확인할 수 있습니다.",
  },

  hero: {
    title: "자동차 할부,\n매달 얼마나 낼까?",
    subtitle: "차량 가격과 조건만 입력하면, 월 납입금과 총 이자를 바로 확인해드려요.",
    badge: "자동차 할부 계산기",
  },

  infoParagraph: "차량 가격에서 선수금을 뺀 금액이 할부 원금이 됩니다. 취득세(승용차 7%)까지 포함한 실제 부담 금액과 월 납입금을 확인해보세요.",

  formTitle: "차량 & 할부 조건",
  formSubtitle: "차량 가격과 할부 조건을 입력해주세요.",
  submitLabel: "내 할부금 확인하기",

  emptyStateMessage: "위에 차량 정보를 입력해주세요",
  emptyStateHint: "차량 가격과 금리만 넣으면 됩니다.",

  fields: [
    { key: "vehiclePrice", type: "currency", label: "차량 가격", placeholder: "예: 40,000,000", group: "basic", suffix: "원" },
    { key: "downPayment", type: "currency", label: "선수금 (계약금)", placeholder: "예: 10,000,000", group: "basic", suffix: "원" },
    { key: "annualRate", type: "rate", label: "할부 금리 (연 %)", placeholder: "예: 5.9", group: "basic", gridCol: 1 },
    { key: "months", type: "months", label: "할부기간 (개월)", placeholder: "예: 48", group: "basic", hint: "보통 36~60개월", gridCol: 1 },
    {
      key: "repaymentType", type: "select", label: "상환방식", group: "advanced",
      options: REPAYMENT_OPTIONS,
    },
    {
      key: "includeAcquisitionTax", type: "toggle", label: "취득세 포함", group: "advanced",
    },
    {
      key: "acquisitionTaxRate", type: "number", label: "취득세율 (%)", placeholder: "7",
      group: "advanced", suffix: "%", hint: "승용차 7%, 경차 면제", step: 1,
      showWhen: { key: "includeAcquisitionTax", value: "yes" },
    },
  ],

  defaults: {
    vehiclePrice: "",
    downPayment: "",
    annualRate: "",
    months: "",
    repaymentType: "equal_payment",
    includeAcquisitionTax: "no",
    acquisitionTaxRate: "7",
  },

  sideEffects: [],

  parseValues: (values) => ({
    vehiclePrice: Number(String(values.vehiclePrice).replace(/,/g, "")),
    downPayment: Number(String(values.downPayment || "0").replace(/,/g, "")),
    annualRate: Number(values.annualRate),
    months: Number(values.months),
    repaymentType: values.repaymentType ?? "equal_payment",
    includeAcquisitionTax: values.includeAcquisitionTax === "yes",
    acquisitionTaxRate: Number(values.acquisitionTaxRate) || 7,
  }),

  validate: (parsed) => {
    if (!parsed.vehiclePrice || parsed.vehiclePrice <= 0) return "차량 가격을 입력해주세요.";
    if (!Number.isFinite(parsed.annualRate) || parsed.annualRate < 0) return "금리를 올바르게 입력해주세요.";
    if (!parsed.months || parsed.months <= 0) return "할부기간을 입력해주세요.";
    return null;
  },

  restoreValues: (input) => ({
    vehiclePrice: formatInputNumber(String(input.vehiclePrice)),
    downPayment: input.downPayment ? formatInputNumber(String(input.downPayment)) : "",
    annualRate: String(input.annualRate),
    months: String(input.months),
    repaymentType: input.repaymentType,
    includeAcquisitionTax: input.includeAcquisitionTax ? "yes" : "no",
    acquisitionTaxRate: String(input.acquisitionTaxRate ?? 7),
  }),

  engine: autoEngine,
  interpreter: autoInterpreter,
  ResultComponent: AutoResults,

  getCtaUrl: (input, result) => {
    if (!input || !result || !result.principal) return "/compare";
    return buildCompareUrl(
      { principal: result.principal, annualRate: input.annualRate, months: input.months },
      result.loan,
      null,
    );
  },
  getCtaLabel: () => "내 예산에 맞는 금융 조건 보기",
  getCtaSubtext: (input, result) => {
    if (!result || !result.principal) return null;
    return `비교는 1분이면 끝나요 — 월 ${formatCurrency(result.monthlyPayment)} 상환`;
  },

  trackCalculate: trackAutoCalculate,
  trackSaveScenario: () => {},
  trackCtaClick,

  storageKey: "loanCalcAutoV1",
  scenarioStorageKey: null,

  faqItems: AUTO_FAQ,
  faqTitle: "이런 점이 궁금하지 않으세요?",
  faqSubtitle: "자동차 구매 전에 꼭 확인해야 할 핵심 질문들",
};

export default autoConfig;
