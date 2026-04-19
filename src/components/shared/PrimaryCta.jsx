import { ArrowRight } from "lucide-react";

export default function PrimaryCta({ ctaUrl, ctaLabel, subtext, disclaimer, onCtaClick }) {
  return (
    <section className="space-y-3">
      {/* 보조 문구 — CTA 위에 가볍게 */}
      {subtext && (
        <p className="text-center text-sm font-medium text-slate-500">{subtext}</p>
      )}

      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 py-4 text-[0.95rem] font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-150 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-[0.98]"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>

      {disclaimer && (
        <p className="text-center text-[11px] leading-relaxed text-slate-400">{disclaimer}</p>
      )}
    </section>
  );
}
