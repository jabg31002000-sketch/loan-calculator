import { ArrowRight } from "lucide-react";

export default function PrimaryCta({ ctaUrl, ctaLabel, subtext, disclaimer, onCtaClick }) {
  return (
    <section className="space-y-3">
      {subtext && (
        <p className="text-center text-[15px] font-medium text-[#5E6E73]">{subtext}</p>
      )}

      <a
        href={ctaUrl}
        onClick={(e) => {
          e.preventDefault();
          onCtaClick();
        }}
        className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#D97852] px-8 py-[18px] text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>

      {disclaimer && (
        <p className="text-center text-[12px] leading-relaxed text-[#7A868B]">{disclaimer}</p>
      )}
    </section>
  );
}
