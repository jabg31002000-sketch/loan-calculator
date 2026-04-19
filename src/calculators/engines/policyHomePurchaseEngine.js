import { calculateLoan } from "../../components/loan-calculator/utils";

/**
 * 정책 주택구입 대출 공통 엔진
 * mode: "didimdol" | "bogeumjari" | "firstHome"
 *
 * productType에 따라 LTV, 대출한도 캡, DSR 기준이 실제로 달라짐
 */

// ── Rule Tables ──

export const DIDIMDOL_RULES = {
  general: {
    label: "일반",
    defaultLtv: 70,
    loanCap: 250_000_000,      // 일반형 최대 2.5억
    dsrLimit: 40,
    guidanceText: "일반 디딤돌은 소득 6천만원 이하 무주택 세대주가 대상입니다.",
    ctaLabel: "디딤돌 대출 조건 비교하기",
    ctaLabelWeak: "다른 주택대출 보기",
  },
  firstTime: {
    label: "생애최초",
    defaultLtv: 80,
    loanCap: 300_000_000,      // 생애최초 최대 3억
    dsrLimit: 40,
    guidanceText: "생애최초 디딤돌은 LTV 80%, 한도 최대 3억으로 일반형보다 유리합니다.",
    ctaLabel: "생애최초 디딤돌 조건 보기",
    ctaLabelWeak: "다른 대출 상품 비교하기",
  },
  newlywed: {
    label: "신혼",
    defaultLtv: 80,
    loanCap: 400_000_000,      // 신혼부부 최대 4억
    dsrLimit: 40,
    guidanceText: "신혼 디딤돌은 LTV 80%, 한도 최대 4억으로 가장 넉넉합니다.",
    ctaLabel: "신혼 디딤돌 조건 보기",
    ctaLabelWeak: "다른 대출 상품 비교하기",
  },
  multiChild: {
    label: "다자녀",
    defaultLtv: 80,
    loanCap: 400_000_000,      // 다자녀 최대 4억
    dsrLimit: 40,
    guidanceText: "다자녀 디딤돌은 LTV 80%, 한도 최대 4억이며 금리 우대가 큽니다.",
    ctaLabel: "다자녀 디딤돌 조건 보기",
    ctaLabelWeak: "다른 대출 상품 비교하기",
  },
};

export const BOGEUMJARI_RULES = {
  general: {
    label: "기본",
    defaultLtv: 70,
    loanCap: 360_000_000,      // 기본형 최대 3.6억
    dsrLimit: 40,
    guidanceText: "보금자리론 기본형은 부부합산 연소득 7천만원 이하 대상입니다.",
    ctaLabel: "보금자리론 조건 비교하기",
    ctaLabelWeak: "다른 고정금리 상품 보기",
  },
  firstTime: {
    label: "생애최초",
    defaultLtv: 80,
    loanCap: 400_000_000,      // 생애최초 최대 4억
    dsrLimit: 40,
    guidanceText: "생애최초 보금자리론은 LTV 80%, 한도 최대 4억으로 기본형보다 유리합니다.",
    ctaLabel: "생애최초 보금자리론 조건 보기",
    ctaLabelWeak: "다른 대출 상품 비교하기",
  },
};

export default function policyHomePurchaseEngine(input) {
  const {
    mode,
    propertyPrice,
    ltv,
    annualRate,
    months,
    annualIncome,
    existingMonthlyPayment,
    repaymentType,
    dsrLimit,
    productType,
    availableCash,  // 생애최초 전용: 사용자 보유 자기자본
  } = input;

  // ── Rule 선택 ──
  let rules;
  if (mode === "didimdol") rules = DIDIMDOL_RULES;
  else if (mode === "bogeumjari") rules = BOGEUMJARI_RULES;
  else rules = DIDIMDOL_RULES; // firstHome도 디딤돌 기반

  const rule = rules[productType] || rules.general || Object.values(rules)[0];

  // ── LTV 기준 최대 대출액 (rule의 defaultLtv를 사용자 입력이 override) ──
  const effectiveLtv = ltv ?? rule.defaultLtv ?? 70;
  const ltvRatio = effectiveLtv / 100;
  const rawMaxByLtv = Math.floor(propertyPrice * ltvRatio);

  // 상품별 캡 적용
  const maxByLtv = Math.min(rawMaxByLtv, rule.loanCap);
  const ltvWasCapped = rawMaxByLtv > rule.loanCap;

  // ── DSR 기준 최대 대출액 (역산) ──
  let maxByDsr = Infinity;
  const effectiveDsrLimit = (dsrLimit ?? rule.dsrLimit ?? 40) / 100;

  if (annualIncome > 0) {
    const maxAnnualRepayment = annualIncome * effectiveDsrLimit;
    const existingAnnual = (existingMonthlyPayment || 0) * 12;
    const remainingAnnual = Math.max(0, maxAnnualRepayment - existingAnnual);
    const remainingMonthly = remainingAnnual / 12;

    if (remainingMonthly > 0 && months > 0) {
      const monthlyRate = annualRate / 100 / 12;

      if (repaymentType === "equal_principal") {
        const denom = (1 / months) + monthlyRate;
        maxByDsr = denom > 0 ? remainingMonthly / denom : 0;
      } else if (repaymentType === "bullet") {
        maxByDsr = monthlyRate > 0 ? remainingMonthly / monthlyRate : 0;
      } else {
        if (monthlyRate === 0) {
          maxByDsr = remainingMonthly * months;
        } else {
          const factor = Math.pow(1 + monthlyRate, months);
          maxByDsr = remainingMonthly * (factor - 1) / (monthlyRate * factor);
        }
      }
      // DSR 기준 한도도 상품별 캡으로 제한
      maxByDsr = Math.min(Math.max(0, Math.floor(maxByDsr)), rule.loanCap);
    } else {
      maxByDsr = 0;
    }
  }

  // ── 실제 대출 가능액 ──
  const maxLoanAmount = Math.min(maxByLtv, maxByDsr);
  let limitingFactor = "LTV";
  if (maxByLtv <= maxByDsr) {
    limitingFactor = ltvWasCapped ? "상품한도" : "LTV";
  } else {
    limitingFactor = "DSR";
  }

  // ── 자기자본 ──
  const selfFund = Math.max(0, propertyPrice - maxLoanAmount);

  // ── 대출 상환 시뮬레이션 ──
  let loan = null;
  if (maxLoanAmount > 0) {
    loan = calculateLoan({
      principal: maxLoanAmount,
      annualRate,
      months,
      graceMonths: 0,
      repaymentType: repaymentType || "equal_payment",
    });
  }

  // ── DSR 계산 ──
  const existingAnnual = (existingMonthlyPayment || 0) * 12;
  const newMonthlyPayment = loan?.monthlyPayment ?? 0;
  const newAnnualPayment = newMonthlyPayment * 12;
  const totalAnnualPayment = existingAnnual + newAnnualPayment;
  const estimatedDsr = annualIncome > 0 ? totalAnnualPayment / annualIncome : 0;

  // ── 부담 수준 ──
  let affordabilityLevel = "unknown";
  if (estimatedDsr <= 0.25) affordabilityLevel = "comfortable";
  else if (estimatedDsr <= 0.35) affordabilityLevel = "moderate";
  else if (estimatedDsr <= effectiveDsrLimit) affordabilityLevel = "stretched";
  else affordabilityLevel = "heavy";

  // ── 생애최초 전용: 예산 구간 계산 ──
  let priceRange = null;
  if (mode === "firstHome") {
    const cash = availableCash || 0;

    // "여유 있는 구간": 자기자본만으로 커버 가능한 최대 집값 (DSR 여유 있는 수준)
    // comfortableMax: DSR 25% 이하 유지하면서 자기자본 충족되는 최대 집값
    // standardMax: DSR limit 이하 + 자기자본 충족
    const monthlyRate = annualRate / 100 / 12;
    let dsrBasedMax = 0;
    if (annualIncome > 0 && months > 0) {
      const comfortMonthly = (annualIncome * 0.25 / 12) - ((existingMonthlyPayment || 0));
      const stretchMonthly = (annualIncome * effectiveDsrLimit / 12) - ((existingMonthlyPayment || 0));

      const calcMaxLoan = (maxMonthly) => {
        if (maxMonthly <= 0) return 0;
        if (monthlyRate === 0) return maxMonthly * months;
        const factor = Math.pow(1 + monthlyRate, months);
        return maxMonthly * (factor - 1) / (monthlyRate * factor);
      };

      const comfortLoan = Math.min(Math.floor(calcMaxLoan(comfortMonthly)), rule.loanCap);
      const stretchLoan = Math.min(Math.floor(calcMaxLoan(stretchMonthly)), rule.loanCap);

      // 집값 = 대출 + 자기자본
      const comfortableMax = Math.max(0, comfortLoan + cash);
      const standardMax = Math.max(0, stretchLoan + cash);

      // 현재 집값 대비 판단
      let priceVerdict = "possible";
      if (propertyPrice > standardMax) priceVerdict = "over_budget";
      else if (propertyPrice > comfortableMax) priceVerdict = "stretched";
      else priceVerdict = "comfortable";

      // 자기자본 부족 여부
      const cashShortfall = Math.max(0, selfFund - cash);

      priceRange = {
        comfortableMax,
        standardMax,
        priceVerdict,
        availableCash: cash,
        cashShortfall,
        comfortableLoan: comfortLoan,
      };
    }
  }

  // ── 보금자리론 전용: 장기 상환 안정성 지표 ──
  let stabilityInfo = null;
  if (mode === "bogeumjari" && loan) {
    const interestToLoanRatio = loan.totalInterest / maxLoanAmount;
    const monthlyToIncomeRatio = annualIncome > 0 ? newMonthlyPayment / (annualIncome / 12) : 0;
    let stabilityLevel = "stable";
    if (monthlyToIncomeRatio > 0.35) stabilityLevel = "caution";
    if (monthlyToIncomeRatio > 0.45) stabilityLevel = "risky";

    stabilityInfo = {
      interestToLoanRatio,
      monthlyToIncomeRatio,
      stabilityLevel,
      totalYears: Math.round(months / 12),
    };
  }

  return {
    mode,
    productType,
    rule,
    propertyPrice,
    maxByLtv,
    maxByDsr: maxByDsr === Infinity ? null : maxByDsr,
    maxLoanAmount,
    limitingFactor,
    ltvWasCapped,
    selfFund,
    loan,
    ltvRatio,
    effectiveLtv,
    dsrLimit: effectiveDsrLimit,
    estimatedDsr,
    annualIncome,
    existingMonthlyPayment: existingMonthlyPayment || 0,
    affordabilityLevel,
    priceRange,       // 생애최초 전용
    stabilityInfo,    // 보금자리론 전용
    // CalculatorPage 표준
    monthlyPayment: loan?.monthlyPayment ?? 0,
    totalInterest: loan?.totalInterest ?? 0,
    totalPayment: loan?.totalPayment ?? 0,
  };
}
