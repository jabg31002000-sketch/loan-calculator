import { Shield, Zap, Eye } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Zap, text: "1분이면 충분해요" },
  { icon: Shield, text: "개인정보 수집 없음" },
  { icon: Eye, text: "숨겨진 비용까지 한눈에" },
];

export default function HeroSection({ title, subtitle, badge }) {
  return (
    <section className="mb-10 py-8 text-center sm:py-12">
      {badge && (
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#10353F]/8 px-4 py-2 text-xs font-semibold text-[#10353F] ring-1 ring-inset ring-[#10353F]/15">
          {badge}
        </div>
      )}

      <h1 className="text-[1.75rem] font-bold leading-[1.25] tracking-[-0.03em] text-[#0E2A3A] sm:text-[2.25rem] lg:text-[2.5rem] whitespace-pre-line">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-[#5E6E73]">
          {subtitle}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {TRUST_ITEMS.map(({ icon: Icon, text }) => (
          <span key={text} className="inline-flex items-center gap-2 text-sm font-medium text-[#5E6E73]">
            <Icon className="h-4 w-4 text-[#10353F]" />
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
