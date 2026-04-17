import { formatCurrency } from "./utils";
import { PURPOSE_DEFAULTS } from "./purposeConfig";

export function getDiagnosis({ result, submittedInput, savingsAtLowerRate, loanPurpose, priority, recommendation }) {
  if (!result || !submittedInput) return null;

  const interestRatio = result.totalInterest / submittedInput.principal;
  const rate = submittedInput.annualRate;
  const purposeLabel = PURPOSE_DEFAULTS[loanPurpose]?.diagnosisContext ?? "대출";

  if (rate >= 7) {
    return { text: `현재 ${purposeLabel} 금리 ${rate}%는 매우 높은 편입니다. 대환을 적극 검토해보세요.`, tone: "warning" };
  }
  if (rate >= 6) {
    return { text: `현재 ${purposeLabel} 금리가 높은 편입니다. 더 나은 조건이 있는지 반드시 비교해보세요.`, tone: "warning" };
  }

  if (interestRatio > 0.3 && submittedInput.graceMonths > 0) {
    return { text: "거치기간 포함 시 총 이자 부담이 큰 편입니다. 거치기간을 줄이거나 상환방식을 조정하면 부담을 줄일 수 있어요.", tone: "caution" };
  }
  if (interestRatio > 0.3) {
    return { text: "총 이자 부담이 큰 편입니다. 상환방식이나 금리를 조정하면 부담을 줄일 수 있어요.", tone: "caution" };
  }

  if (recommendation?.shouldChange && recommendation?.currentVsBest > 500000) {
    return { text: `현재 상환방식 대신 ${recommendation.best?.title}을 선택하면 약 ${formatCurrency(recommendation.currentVsBest)}을 절약할 수 있습니다.`, tone: "info" };
  }

  if (savingsAtLowerRate && savingsAtLowerRate > 1000000) {
    return { text: `현재 ${purposeLabel} 조건은 무난하지만, 금리를 조금만 낮춰도 약 ${formatCurrency(savingsAtLowerRate)} 절약 효과가 있습니다.`, tone: "info" };
  }

  return { text: `현재 ${purposeLabel} 조건은 비교적 안정적입니다. 더 나은 조건이 있는지 확인해보는 것도 좋습니다.`, tone: "good" };
}

export function getDiagnosisStyle(tone) {
  switch (tone) {
    case "warning": return "border-amber-200 bg-amber-50 text-amber-800";
    case "caution": return "border-slate-200 bg-slate-50 text-slate-700";
    case "info": return "border-sky-200 bg-sky-50 text-sky-800";
    case "good": return "border-emerald-200 bg-emerald-50 text-emerald-800";
    default: return "border-slate-200 bg-slate-50 text-slate-700";
  }
}
