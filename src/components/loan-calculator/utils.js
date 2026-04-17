import { REPAYMENT_OPTIONS } from "./constants";

// ═══════════════════════════════════════════════════════════════════════════
// 포맷
// ═══════════════════════════════════════════════════════════════════════════

export function formatInputNumber(value) {
  const number = value.replace(/,/g, "");
  if (number === "") return "";
  return Number(number).toLocaleString("ko-KR");
}

export function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("ko-KR");
}

export function formatCurrency(value) {
  return `${formatNumber(value)}원`;
}

export function formatRate(value) {
  if (!Number.isFinite(value)) return "-";
  return `${value.toFixed(1)}%`;
}

export function getRepaymentLabel(value) {
  return REPAYMENT_OPTIONS.find((o) => o.value === value)?.label ?? "-";
}

export function formatChartMoney(value) {
  if (!Number.isFinite(value)) return "0원";
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}억`;
  if (value >= 10000) return `${Math.round(value / 10000)}만`;
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export function buildScenarioSummary(input, result) {
  return [
    `대출금액 ${formatCurrency(input.principal)}`,
    `금리 ${formatRate(input.annualRate)}`,
    `대출기간 ${input.months}개월`,
    input.graceMonths > 0 ? `거치기간 ${input.graceMonths}개월` : "거치기간 없음",
    getRepaymentLabel(input.repaymentType),
    `총 이자 ${formatCurrency(result.totalInterest)}`,
    `총 상환액 ${formatCurrency(result.totalPayment)}`,
  ].join(" / ");
}

// ═══════════════════════════════════════════════════════════════════════════
// 계산 로직
// ═══════════════════════════════════════════════════════════════════════════

export function calcEqualPayment(principal, annualRate, months, graceMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const rows = [];
  let balance = principal;
  let totalInterest = 0;
  const safeGraceMonths = Math.min(graceMonths, months);
  const repaymentMonths = months - safeGraceMonths;

  for (let i = 1; i <= safeGraceMonths; i += 1) {
    const interest = balance * monthlyRate;
    rows.push({ round: i, paymentAmount: interest, interest, principalPayment: 0, balance });
    totalInterest += interest;
  }

  if (repaymentMonths <= 0) {
    return { monthlyPayment: safeGraceMonths > 0 ? rows[0]?.paymentAmount ?? 0 : 0, totalInterest, totalPayment: principal + totalInterest, rows };
  }

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = balance / repaymentMonths;
  } else {
    monthlyPayment = (balance * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) / (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
  }

  for (let i = 1; i <= repaymentMonths; i += 1) {
    const interest = balance * monthlyRate;
    let principalPayment = monthlyPayment - interest;
    if (i === repaymentMonths) principalPayment = balance;
    const paymentAmount = principalPayment + interest;
    balance = Math.max(0, balance - principalPayment);
    rows.push({ round: safeGraceMonths + i, paymentAmount, interest, principalPayment, balance });
    totalInterest += interest;
  }

  return { monthlyPayment, totalInterest, totalPayment: principal + totalInterest, rows };
}

export function calcEqualPrincipal(principal, annualRate, months, graceMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const rows = [];
  let balance = principal;
  let totalInterest = 0;
  const safeGraceMonths = Math.min(graceMonths, months);
  const repaymentMonths = months - safeGraceMonths;

  for (let i = 1; i <= safeGraceMonths; i += 1) {
    const interest = balance * monthlyRate;
    rows.push({ round: i, paymentAmount: interest, interest, principalPayment: 0, balance });
    totalInterest += interest;
  }

  if (repaymentMonths <= 0) {
    return { monthlyPayment: safeGraceMonths > 0 ? rows[0]?.paymentAmount ?? 0 : 0, totalInterest, totalPayment: principal + totalInterest, rows };
  }

  const monthlyPrincipal = principal / repaymentMonths;

  for (let i = 1; i <= repaymentMonths; i += 1) {
    const interest = balance * monthlyRate;
    let principalPayment = monthlyPrincipal;
    if (i === repaymentMonths) principalPayment = balance;
    const paymentAmount = principalPayment + interest;
    balance = Math.max(0, balance - principalPayment);
    rows.push({ round: safeGraceMonths + i, paymentAmount, interest, principalPayment, balance });
    totalInterest += interest;
  }

  return { monthlyPayment: rows[safeGraceMonths]?.paymentAmount ?? 0, totalInterest, totalPayment: principal + totalInterest, rows };
}

export function calcBullet(principal, annualRate, months) {
  const monthlyRate = annualRate / 100 / 12;
  const rows = [];
  let balance = principal;
  let totalInterest = 0;

  for (let i = 1; i <= months; i += 1) {
    const interest = balance * monthlyRate;
    const isLast = i === months;
    const principalPayment = isLast ? balance : 0;
    const paymentAmount = interest + principalPayment;
    if (isLast) balance = 0;
    rows.push({ round: i, paymentAmount, interest, principalPayment, balance });
    totalInterest += interest;
  }

  return { monthlyPayment: rows[0]?.paymentAmount ?? 0, totalInterest, totalPayment: principal + totalInterest, rows };
}

export function calculateLoan({ principal, annualRate, months, graceMonths, repaymentType }) {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(months) || !Number.isFinite(graceMonths) || principal <= 0 || annualRate < 0 || months <= 0 || graceMonths < 0 || graceMonths > months) {
    return null;
  }
  if (repaymentType === "equal_principal") return calcEqualPrincipal(principal, annualRate, months, graceMonths);
  if (repaymentType === "bullet") return calcBullet(principal, annualRate, months);
  return calcEqualPayment(principal, annualRate, months, graceMonths);
}

// ═══════════════════════════════════════════════════════════════════════════
// 분석 유틸
// ═══════════════════════════════════════════════════════════════════════════

export const generateChartData = (rows) => {
  if (!rows) return [];
  return rows.map((item, index) => ({ month: index + 1, balance: Math.max(0, item.balance), interest: item.interest, paymentAmount: item.paymentAmount }));
};

export const getHalfPaidMonth = (rows, principal) => {
  if (!rows?.length || !principal) return null;
  return rows.find((row) => row.balance <= principal / 2)?.round ?? null;
};

export const getPeakInterestMonth = (rows) => {
  if (!rows?.length) return null;
  return rows.reduce((max, row) => (row.interest > max.interest ? row : max), rows[0]);
};

export const getBestRepaymentOption = (comparisonResults) => {
  if (!comparisonResults?.length) return null;
  return comparisonResults.reduce((best, current) => {
    const bestInterest = best?.data?.totalInterest ?? Infinity;
    const currentInterest = current?.data?.totalInterest ?? Infinity;
    return currentInterest < bestInterest ? current : best;
  }, comparisonResults[0]);
};

export const getWorstRepaymentOption = (comparisonResults) => {
  if (!comparisonResults?.length) return null;
  return comparisonResults.reduce((worst, current) => {
    const worstInterest = worst?.data?.totalInterest ?? -Infinity;
    const currentInterest = current?.data?.totalInterest ?? -Infinity;
    return currentInterest > worstInterest ? current : worst;
  }, comparisonResults[0]);
};

export const getMaxInterestValue = (comparisonResults) => {
  if (!comparisonResults?.length) return 0;
  return Math.max(...comparisonResults.map((item) => item.data?.totalInterest ?? 0));
};

// ═══════════════════════════════════════════════════════════════════════════
// URL 빌더
// ═══════════════════════════════════════════════════════════════════════════

export function buildCompareUrl(input, result, savings) {
  if (!input || !result) return "/compare";
  const params = new URLSearchParams();
  params.set("rate", input.annualRate.toFixed(1));
  params.set("interest", Math.round(result.totalInterest));
  params.set("principal", input.principal);
  params.set("months", input.months);
  if (savings != null) params.set("savings", Math.round(savings));
  return `/compare?${params.toString()}`;
}

export function getCtaUrl(input, result, savings) {
  if (!input || !result) return "/compare";
  if (input.annualRate >= 5) {
    return `/refinance?rate=${input.annualRate}&interest=${Math.round(result.totalInterest)}&principal=${input.principal}&months=${input.months}`;
  }
  return buildCompareUrl(input, result, savings);
}

// ═══════════════════════════════════════════════════════════════════════════
// 추천 로직
// ═══════════════════════════════════════════════════════════════════════════

export function getRecommendationReason(priority) {
  if (priority === "low_monthly") return "월 납입금이 일정해서 예산 관리가 쉽습니다.";
  if (priority === "low_interest") return "총 이자가 가장 적은 방식입니다. 초반 부담은 크지만 장기적으로 유리합니다.";
  return "가장 많이 선택하는 무난한 방식입니다. 월 납입금이 일정해서 부담 예측이 쉬워요.";
}
