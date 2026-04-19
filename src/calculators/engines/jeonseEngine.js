/**
 * 전세 vs 월세 비교 계산 엔진
 * 주어진 기간 동안의 총 비용을 비교
 */
export default function jeonseEngine(input) {
  const {
    jeonseDeposit,
    jeonseRate,
    jeonseLoanRatio,
    monthlyRent,
    rentDeposit,
    periodMonths,
    investmentReturn,
    maintenanceFee,
  } = input;

  // ── 전세 비용 계산 ──
  const loanRatio = (jeonseLoanRatio ?? 80) / 100;
  const jeonseLoanAmount = jeonseDeposit * loanRatio;
  const jeonseOwnFunds = jeonseDeposit - jeonseLoanAmount;
  const monthlyLoanRate = (jeonseRate ?? 0) / 100 / 12;

  // 전세대출 이자 (매월 이자만 납부 — 만기일시상환 가정)
  const monthlyLoanInterest = jeonseLoanAmount * monthlyLoanRate;
  const totalLoanInterest = monthlyLoanInterest * periodMonths;

  // 전세 자기자금 기회비용 (투자했으면 벌었을 수익)
  const annualReturnRate = (investmentReturn ?? 0) / 100;
  const monthlyReturnRate = annualReturnRate / 12;
  const jeonseOpportunityCost = jeonseOwnFunds * monthlyReturnRate * periodMonths;

  const totalJeonseCost = totalLoanInterest + jeonseOpportunityCost;

  // ── 월세 비용 계산 ──
  const totalRent = monthlyRent * periodMonths;

  // 월세 보증금 기회비용
  const rentOpportunityCost = rentDeposit * monthlyReturnRate * periodMonths;

  // 관리비 차이 (전세 기준으로 월세가 더 비싼 경우 양수)
  const totalMaintenanceDiff = (maintenanceFee ?? 0) * periodMonths;

  const totalRentCost = totalRent + rentOpportunityCost + totalMaintenanceDiff;

  // ── 비교 ──
  const costDiff = totalRentCost - totalJeonseCost; // 양수면 전세가 유리
  const isJeonseBetter = costDiff > 0;
  const monthlyCostDiff = costDiff / periodMonths;

  // 전세 월 비용 (대출이자 + 기회비용)
  const jeonseMonthly = monthlyLoanInterest + (jeonseOpportunityCost / periodMonths);
  // 월세 월 비용 (월세 + 기회비용 + 관리비차이)
  const rentMonthly = monthlyRent + (rentOpportunityCost / periodMonths) + (maintenanceFee ?? 0);

  // 전세가 유리해지는 투자수익률 역산 (break-even return rate)
  // totalJeonseCost(r) = totalRentCost(r) 풀기
  // loanInterest + ownFunds*r/12*months = rent + rentDeposit*r/12*months + maintenance
  // r/12*months * (ownFunds - rentDeposit) = rent + maintenance - loanInterest
  let breakEvenReturnRate = null;
  const fundsDiff = jeonseOwnFunds - rentDeposit;
  if (fundsDiff !== 0) {
    const rhs = totalRent + totalMaintenanceDiff - totalLoanInterest;
    const breakEvenMonthlyRate = rhs / (fundsDiff * periodMonths);
    breakEvenReturnRate = breakEvenMonthlyRate * 12 * 100; // 연이율 %
    if (breakEvenReturnRate < 0) breakEvenReturnRate = null;
  }

  return {
    // 전세 상세
    jeonse: {
      loanAmount: jeonseLoanAmount,
      ownFunds: jeonseOwnFunds,
      monthlyInterest: monthlyLoanInterest,
      totalInterest: totalLoanInterest,
      opportunityCost: jeonseOpportunityCost,
      totalCost: totalJeonseCost,
      monthly: jeonseMonthly,
    },
    // 월세 상세
    rent: {
      totalRent,
      deposit: rentDeposit,
      opportunityCost: rentOpportunityCost,
      maintenanceDiff: totalMaintenanceDiff,
      totalCost: totalRentCost,
      monthly: rentMonthly,
    },
    // 비교
    costDiff: Math.abs(costDiff),
    isJeonseBetter,
    monthlyCostDiff: Math.abs(monthlyCostDiff),
    breakEvenReturnRate,
    periodMonths,
    // CalculatorPage 표준
    monthlyPayment: jeonseMonthly,
    totalInterest: totalLoanInterest,
    totalPayment: totalJeonseCost,
  };
}
