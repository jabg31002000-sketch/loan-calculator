import { ArrowRight } from "lucide-react";

export default function MobileStickyCta({ ctaUrl, ctaLabel, subtext, onCtaClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E5E1DA] bg-white/95 px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#D97852] text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] active:scale-[0.98]"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      {subtext && (
        <p className="mt-1.5 pb-1 text-center text-[12px] text-[#7A868B]">{subtext}</p>
      )}
    </div>
  );
}
