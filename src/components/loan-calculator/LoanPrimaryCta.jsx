import { ChevronRight } from "lucide-react";
import { formatCurrency } from "./utils";

export default function LoanPrimaryCta({ ctaUrl, ctaLabel, savingsAtLowerRate, onCtaClick }) {
  return (
    <section>
      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition duration-150 hover:scale-[1.02] hover:bg-emerald-500 hover:shadow-xl active:scale-[0.98]"
      >
        {ctaLabel}
        <ChevronRight className="h-4 w-4" />
      </a>
      <p className="mt-2 text-center text-xs text-slate-400">
        {savingsAtLowerRate && savingsAtLowerRate > 0
          ? `현재 조건 기준 약 ${formatCurrency(savingsAtLowerRate)} 절약 가능`
          : "금리 1%만 낮춰도 수백만 원 절약 가능"}
      </p>
      <p className="mt-1 text-center text-[11px] text-slate-400">
        실제 금리는 개인 신용 및 조건에 따라 달라질 수 있습니다
      </p>
    </section>
  );
}
