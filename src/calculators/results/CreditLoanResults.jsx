import { useState } from "react";
import { Bookmark, Copy } from "lucide-react";
import {
  formatInputNumber,
  buildScenarioSummary,
} from "../../components/loan-calculator/utils";
import LoanResultSummary from "../../components/loan-calculator/LoanResultSummary";
import LoanRecommendationCard from "../../components/loan-calculator/LoanRecommendationCard";
import LoanSavingsCard from "../../components/loan-calculator/LoanSavingsCard";
import LoanDetailAccordion from "../../components/loan-calculator/LoanDetailAccordion";
import LoanRevisitHint from "../../components/loan-calculator/LoanRevisitHint";
import PrimaryCta from "../../components/shared/PrimaryCta";
import { formatCurrency } from "../../components/loan-calculator/utils";

export default function CreditLoanResults({
  input,
  result,
  savedScenarios,
  onSaveScenario,
  onDeleteScenario,
  onLoadScenario,
  ctaUrl,
  ctaLabel,
  onCtaClick,
  onScrollToInput,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    if (!input || !result) return;
    try {
      await navigator.clipboard.writeText(buildScenarioSummary(input, result));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("복사 실패", err);
    }
  };

  const { comparisonResults, recommendation, savingsAtLowerRate, ratePreviewResults } = result;

  const comparisonChartData = comparisonResults?.map((item) => ({
    name: item.title.replace("상환", ""),
    totalInterest: item.data?.totalInterest ?? 0,
  })) ?? [];

  const displaySavedScenarios = [...savedScenarios].reverse().map((item, index) => ({
    ...item,
    displayName: `비교안 ${index + 1}`,
  }));

  const savedScenarioChartData = displaySavedScenarios.map((item) => ({
    name: item.displayName,
    monthlyPayment: item.result.monthlyPayment,
    totalInterest: item.result.totalInterest,
  }));

  const ctaSubtext = savingsAtLowerRate && savingsAtLowerRate > 0
    ? `현재 조건 기준 약 ${formatCurrency(savingsAtLowerRate)} 절약 가능`
    : "금리 1%만 낮춰도 수백만 원 절약 가능";

  return (
    <>
      <LoanResultSummary result={result} submittedInput={input} />

      <LoanRecommendationCard
        recommendation={recommendation}
        priority={input.priority}
        loanPurpose={null}
      />

      <LoanSavingsCard
        result={result}
        submittedInput={input}
        savingsAtLowerRate={savingsAtLowerRate}
      />

      <PrimaryCta
        ctaUrl={ctaUrl}
        ctaLabel={ctaLabel}
        subtext={ctaSubtext}
        disclaimer="실제 금리는 개인 신용 및 조건에 따라 달라질 수 있습니다"
        onCtaClick={onCtaClick}
      />

      {/* 보조 액션 */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={onSaveScenario}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E1DA] bg-white px-4 py-2.5 text-xs font-semibold text-[#5E6E73] transition hover:bg-[#F6F1EB]"
        >
          <Bookmark className="h-3.5 w-3.5" />
          비교안 저장
        </button>
        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E1DA] bg-white px-4 py-2.5 text-xs font-semibold text-[#5E6E73] transition hover:bg-[#F6F1EB]"
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? "복사 완료" : "요약 복사"}
        </button>
      </div>

      <LoanDetailAccordion
        result={result}
        submittedInput={input}
        comparisonResults={comparisonResults}
        ratePreviewResults={ratePreviewResults}
        savedScenarios={savedScenarios}
        displaySavedScenarios={displaySavedScenarios}
        savedScenarioChartData={savedScenarioChartData}
        comparisonChartData={comparisonChartData}
        onDeleteScenario={onDeleteScenario}
        onLoadScenario={onLoadScenario}
      />

      <LoanRevisitHint onScrollToInput={onScrollToInput} savedScenarios={savedScenarios} />
    </>
  );
}
