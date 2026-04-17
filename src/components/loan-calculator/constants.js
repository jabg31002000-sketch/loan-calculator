import { Home, Car, Banknote, Briefcase, HelpCircle } from "lucide-react";

export const BANK_RATES = {
  직접입력: "",
  국민은행: 4.5,
  신한은행: 4.3,
  우리은행: 4.4,
  하나은행: 4.4,
  카카오뱅크: 3.9,
  토스뱅크: 3.8,
};

export const REPAYMENT_OPTIONS = [
  { value: "equal_payment", label: "원리금균등상환" },
  { value: "equal_principal", label: "원금균등상환" },
  { value: "bullet", label: "만기일시상환" },
];

export const PURPOSE_OPTIONS = [
  { value: "housing", label: "전세/주거 자금", icon: Home, description: "전세보증금, 주택구입" },
  { value: "car", label: "자동차 구매", icon: Car, description: "신차, 중고차 구매" },
  { value: "living", label: "생활비/급전", icon: Banknote, description: "생활자금, 긴급자금" },
  { value: "business", label: "사업자 자금", icon: Briefcase, description: "사업운영, 시설자금" },
  { value: "unknown", label: "아직 잘 모르겠어요", icon: HelpCircle, description: "어디서부터 알아봐야 할지" },
];

export const PRIORITY_OPTIONS = [
  { value: "low_monthly", label: "월 부담 낮추기", description: "매달 부담을 줄이고 싶어요", repayment: "equal_payment" },
  { value: "low_interest", label: "총 이자 줄이기", description: "전체 이자를 최소화하고 싶어요", repayment: "equal_principal" },
  { value: "unsure", label: "아직 잘 모르겠어요", description: "가장 무난한 방식으로 시작할게요", repayment: "equal_payment" },
];

export const TRUST_POINTS = [
  "회원가입 없이 바로 계산",
  "3가지 상환방식 자동 비교",
  "절약 가능성까지 한눈에",
];

export const FAQ_ITEMS = [
  {
    question: "원리금균등과 원금균등은 어떻게 다른가요?",
    answer: "원리금균등상환은 매달 같은 금액을 납부해서 예산 계획이 쉽습니다. 대신 초반에는 이자 비중이 높아 총 이자가 더 클 수 있어요. 원금균등상환은 매달 같은 원금을 갚아서 시간이 갈수록 부담이 줄고, 총 이자도 적습니다. 대신 초반 납입금이 더 큽니다.",
    hasCalculatorLink: true,
  },
  {
    question: "금리 1% 차이는 실제로 얼마나 큰가요?",
    answer: "대출금 1억 원, 30년 기준으로 금리가 1%p 차이나면 총 이자가 약 2,000만 원 이상 달라질 수 있습니다. 금액과 기간이 클수록 차이는 더 커집니다. 위 계산기에서 직접 비교해보세요.",
    hasCalculatorLink: true,
  },
  {
    question: "대환이 유리한 경우는 언제인가요?",
    answer: "현재 금리가 시장 평균보다 높거나, 처음 대출을 받은 이후 금리가 많이 내려갔다면 대환을 검토할 가치가 있습니다. 다만 중도상환수수료, 대환 비용 등을 함께 따져봐야 실제 절약 금액을 알 수 있어요.",
    hasCalculatorLink: false,
  },
  {
    question: "거치기간은 언제 필요한가요?",
    answer: "거치기간은 대출 초기에 원금 상환 없이 이자만 내는 기간입니다. 당장 소득이 적거나 초기 자금이 부족한 경우 유용하지만, 거치기간이 길수록 총 이자는 늘어납니다.",
    hasCalculatorLink: true,
  },
  {
    question: "초보자는 어떤 대출부터 알아보는 게 맞나요?",
    answer: "목적에 따라 달라집니다. 전세라면 전세자금대출, 주택 구매라면 주택담보대출, 급전이라면 신용대출이 기본입니다. 위에서 상황을 선택하면 적합한 방향을 안내해드립니다.",
    hasCalculatorLink: false,
  },
  {
    question: "계산 결과를 어떻게 해석해야 하나요?",
    answer: "가장 중요한 건 월 납입금이 내 월 소득 대비 부담 가능한 수준인지입니다. 일반적으로 월 소득의 30~40% 이내가 안전합니다. 그 다음으로 총 이자를 보고, 더 나은 조건이 있는지 비교해보세요.",
    hasCalculatorLink: true,
  },
  {
    question: "만기일시상환은 어떤 경우에 쓰나요?",
    answer: "단기 자금 필요(예: 전세 2년)나, 목돈이 예정되어 있어서 중간에 원금을 갚을 계획이 있을 때 유용합니다. 장기로 쓰면 이자 부담이 가장 큽니다.",
    hasCalculatorLink: true,
  },
];

export const REPAYMENT_COLORS = ["#0f172a", "#334155", "#64748b"];

export const SCENARIO_CARD_THEMES = [
  { accent: "#334155", ring: "border-slate-300", badgeBg: "bg-slate-700/10", badgeText: "text-slate-700", link: "text-slate-700 hover:text-slate-900" },
  { accent: "#7c3aed", ring: "border-violet-200", badgeBg: "bg-violet-500/10", badgeText: "text-violet-700", link: "text-violet-700 hover:text-violet-800" },
  { accent: "#d97706", ring: "border-amber-200", badgeBg: "bg-amber-500/10", badgeText: "text-amber-700", link: "text-amber-700 hover:text-amber-800" },
  { accent: "#0f766e", ring: "border-teal-200", badgeBg: "bg-teal-500/10", badgeText: "text-teal-700", link: "text-teal-700 hover:text-teal-800" },
  { accent: "#475569", ring: "border-slate-300", badgeBg: "bg-slate-500/10", badgeText: "text-slate-700", link: "text-slate-700 hover:text-slate-900" },
  { accent: "#1e293b", ring: "border-slate-300", badgeBg: "bg-slate-800/10", badgeText: "text-slate-800", link: "text-slate-800 hover:text-slate-950" },
];
