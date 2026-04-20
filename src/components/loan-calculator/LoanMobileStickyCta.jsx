import { formatCurrency } from "./utils";

export default function LoanMobileStickyCta({ ctaUrl, ctaLabel, savingsAtLowerRate, onCtaClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5E1DA] bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="flex h-[54px] w-full items-center justify-center rounded-xl bg-[#D97852] text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] active:scale-[0.98]"
      >
        {ctaLabel}
      </a>
      <p className="mt-1.5 text-center text-[12px] text-[#7A868B]">
        {savingsAtLowerRate && savingsAtLowerRate > 0
          ? `약 ${formatCurrency(savingsAtLowerRate)} 절약 가능`
          : "더 유리한 조건이 있을 수 있습니다"}
      </p>
    </div>
  );
}
