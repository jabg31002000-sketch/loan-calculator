import { Shield, Zap, Eye } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Zap, text: "1분이면 충분해요" },
  { icon: Shield, text: "개인정보 수집 없음" },
  { icon: Eye, text: "숨겨진 비용까지 한눈에" },
];

export default function HeroSection({ title, subtitle, badge }) {
  return (
    <section className="mb-8 text-center">
      {badge && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/60">
          {badge}
        </div>
      )}

      <h1 className="text-[1.6rem] font-extrabold leading-[1.35] tracking-tight text-slate-900 sm:text-3xl lg:text-[2.1rem]  whitespace-pre-line">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-slate-500">
          {subtitle}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {TRUST_ITEMS.map(({ icon: Icon, text }) => (
          <span key={text} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Icon className="h-3.5 w-3.5 text-emerald-500" />
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
