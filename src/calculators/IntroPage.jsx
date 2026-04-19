import { useNavigate } from "react-router-dom";
import { useSeo } from "../useSeo";
import { ArrowRight, Shield, Zap, Eye } from "lucide-react";
import CalculatorNav from "./CalculatorNav";
import HeroVisual from "./HeroVisuals";

const TRUST_ITEMS = [
  { icon: Zap, text: "1분이면 충분해요" },
  { icon: Shield, text: "개인정보 수집 없음" },
  { icon: Eye, text: "실제 금융 구조 기반" },
];

/* ── 시각 블록 렌더러 ── */

function VisualFormula({ items, caption }) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        {items.map((item, i) => (
          <span key={i} className={
            item.type === "op"
              ? "text-lg font-bold text-slate-400"
              : "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm"
          }>
            {item.label}
          </span>
        ))}
      </div>
      {caption && (
        <p className="mt-3 text-center text-xs text-slate-400">{caption}</p>
      )}
    </div>
  );
}

function VisualComparison({ items }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className={`rounded-2xl border p-5 ${item.accent ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
            {Icon && (
              <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${item.accent ? "bg-emerald-100" : "bg-slate-100"}`}>
                <Icon className={`h-4 w-4 ${item.accent ? "text-emerald-600" : "text-slate-500"}`} />
              </div>
            )}
            <p className="text-sm font-bold text-slate-800">{item.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function VisualSteps({ items }) {
  return (
    <div className="my-6 space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-700">
            {i + 1}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">{item.title}</p>
            {item.desc && <p className="mt-0.5 text-[13px] text-slate-500">{item.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualStats({ items }) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-xl font-extrabold text-emerald-600">{item.value}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function SectionVisual({ visual }) {
  if (!visual) return null;
  switch (visual.type) {
    case "formula": return <VisualFormula items={visual.items} caption={visual.caption} />;
    case "comparison": return <VisualComparison items={visual.items} />;
    case "steps": return <VisualSteps items={visual.items} />;
    case "stats": return <VisualStats items={visual.items} />;
    default: return null;
  }
}

/* ── 메인 컴포넌트 ── */

export default function IntroPage({ config }) {
  const navigate = useNavigate();
  const { intro } = config;

  useSeo(intro.seoTitle, intro.seoDescription);

  const goToCalculator = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "intro_cta_click", {
        event_category: config.id + "_intro",
        event_label: "바로 계산하기",
      });
    }
    navigate(config.calculatorPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 pb-32">
      <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:py-10">
        <CalculatorNav />

        {/* ━━ Hero ━━ */}
        <section className="mb-14 mt-2 text-center sm:mb-16">
          {intro.badge && (
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/60">
              {intro.badge}
            </div>
          )}
          <h1 className="text-3xl font-extrabold leading-[1.35] tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.3] lg:text-[2.75rem] lg:leading-[1.3] whitespace-pre-line">
            {intro.title}
          </h1>
          {intro.subtitle && (
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
              {intro.subtitle}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Icon className="h-3.5 w-3.5 text-emerald-500" />
                {text}
              </span>
            ))}
          </div>

          {/* 대표 비주얼 */}
          <HeroVisual calculatorId={config.id} />
        </section>

        {/* ━━ Summary Cards ━━ */}
        {intro.summaryCards && (
          <section className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:mb-16">
            {intro.summaryCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 sm:text-lg">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                </div>
              );
            })}
          </section>
        )}

        {/* ━━ Content Sections ━━ */}
        <div className="space-y-10">
          {intro.sections.map((section, i) => (
            <section key={i} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-5 text-xl font-extrabold text-slate-900 sm:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-4 text-[0.95rem] leading-7 text-slate-600">
                {section.content.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>

              {/* 시각 블록 */}
              <SectionVisual visual={section.visual} />

              {/* 하이라이트 */}
              {section.highlight && (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 px-5 py-4 text-sm font-semibold leading-relaxed text-emerald-800">
                  {section.highlight}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ━━ Bottom CTA Section — 마무리 유도 텍스트 ━━ */}
        <section className="mt-14 rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white px-6 py-10 text-center shadow-sm sm:mt-16 sm:px-8">
          <p className="text-xl font-extrabold text-slate-800 sm:text-2xl">
            {intro.bottomCta?.title || "지금 내 조건으로 바로 확인해보세요"}
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
            {intro.bottomCta?.subtitle || "입력은 1분이면 충분합니다"}
          </p>
        </section>

        {/* ━━ Trust Note ━━ */}
        <section className="mt-10 rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4">
          <p className="text-[11px] font-medium text-slate-400">안내</p>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-slate-400">
            <li>본 내용은 일반적인 금융 정보로, 실제 대출 조건은 금융기관별로 다를 수 있습니다.</li>
            <li>LoanClock은 특정 금융 상품을 판매하거나 중개하지 않습니다.</li>
          </ul>
        </section>
      </div>

      {/* ━━ Fixed Bottom CTA — 안개처럼 녹아드는 배경 + 강한 버튼 ━━ */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 animate-[slideUp_0.4s_ease-out]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* 넓게 퍼지는 fade 배경 — 경계 없이 자연스럽게 */}
        <div className="absolute inset-x-0 -top-12 bottom-0 bg-gradient-to-t from-white/90 via-white/70 via-60% to-transparent backdrop-blur-2xl [mask-image:linear-gradient(to_top,black_60%,transparent)]" />

        {/* 버튼 컨테이너 */}
        <div className="pointer-events-auto relative mx-auto flex max-w-md justify-center px-5 pb-5 pt-8">
          <button
            onClick={goToCalculator}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-extrabold text-white shadow-[0_8px_30px_-4px_rgba(16,185,129,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_12px_40px_-4px_rgba(16,185,129,0.55)] active:translate-y-0 active:scale-[0.98] sm:text-xl sm:py-[1.15rem]"
          >
            바로 계산하기
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      {/* slideUp 키프레임 */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
