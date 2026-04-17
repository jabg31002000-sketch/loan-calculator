import { formatCurrency } from "./utils";

export default function LoanMobileStickyCta({ ctaUrl, ctaLabel, savingsAtLowerRate, onCtaClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-sm lg:hidden">
      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500 active:scale-[0.98]"
      >
        {ctaLabel}
      </a>
      <p className="mt-1 text-center text-[11px] text-slate-400">
        {savingsAtLowerRate && savingsAtLowerRate > 0
          ? `약 ${formatCurrency(savingsAtLowerRate)} 절약 가능`
          : "더 유리한 조건이 있을 수 있습니다"}
      </p>
    </div>
  );
}
