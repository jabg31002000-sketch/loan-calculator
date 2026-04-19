import { ArrowRight } from "lucide-react";

export default function MobileStickyCta({ ctaUrl, ctaLabel, subtext, onCtaClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/80 bg-white/95 px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden">
      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-[0.9rem] font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-[0.98]"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      {subtext && (
        <p className="mt-1.5 pb-1 text-center text-[11px] text-slate-400">{subtext}</p>
      )}
    </div>
  );
}
