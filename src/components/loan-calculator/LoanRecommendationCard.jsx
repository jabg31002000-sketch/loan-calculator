import { CheckCircle2 } from "lucide-react";
import { formatCurrency, getRecommendationReason } from "./utils";
import { PURPOSE_DEFAULTS } from "./purposeConfig";

export default function LoanRecommendationCard({ recommendation, priority, loanPurpose }) {
  if (!recommendation) return null;
  const hint = PURPOSE_DEFAULTS[loanPurpose]?.recommendationHint;

  return (
    <section className="rounded-2xl border border-[#10353F]/15 bg-[#10353F]/5 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#10353F]/10">
          <CheckCircle2 className="h-4 w-4 text-[#10353F]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#0E2A3A]">
            추천 상환방식: {recommendation.best?.title ?? "-"}
          </p>
          <p className="mt-1 text-sm text-[#5E6E73]">
            {getRecommendationReason(priority)}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-[#10353F]/60">{hint}</p>
          )}
          {recommendation.shouldChange && recommendation.currentVsBest > 0 && (
            <p className="mt-2 text-sm font-semibold text-[#10353F]">
              현재 방식 대비 총 이자 {formatCurrency(recommendation.currentVsBest)} 절약 가능
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
