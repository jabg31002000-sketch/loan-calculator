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
    <div className="my-8 rounded-2xl border border-[#E5E1DA] bg-[#F6F1EB]/50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        {items.map((item, i) => (
          <span key={i} className={
            item.type === "op"
              ? "text-lg font-bold text-[#5E6E73]"
              : "rounded-xl border border-[#E5E1DA] bg-white px-5 py-3 text-sm font-bold text-[#0E2A3A] shadow-sm"
          }>
            {item.label}
          </span>
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-center text-[13px] text-[#7A868B]">{caption}</p>
      )}
    </div>
  );
}

function VisualComparison({ items }) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className={`rounded-2xl border p-6 ${item.accent ? "border-[#10353F]/20 bg-[#10353F]/5" : "border-[#E5E1DA] bg-white shadow-sm"}`}>
            {Icon && (
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.accent ? "bg-[#10353F]/10" : "bg-[#F6F1EB]"}`}>
                <Icon className={`h-5 w-5 ${item.accent ? "text-[#10353F]" : "text-[#5E6E73]"}`} />
              </div>
            )}
            <p className="text-[15px] font-semibold text-[#0E2A3A]">{item.title}</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-[#5E6E73]">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function VisualSteps({ items }) {
  return (
    <div className="my-8 space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4 rounded-2xl border border-[#E5E1DA] bg-white p-5 shadow-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10353F] text-sm font-extrabold text-white">
            {i + 1}
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-[#0E2A3A]">{item.title}</p>
            {item.desc && <p className="mt-1 text-[14px] leading-relaxed text-[#5E6E73]">{item.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualStats({ items }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-[#E5E1DA] bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-extrabold text-[#10353F]">{item.value}</p>
          <p className="mt-1.5 text-[13px] font-medium text-[#7A868B]">{item.label}</p>
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
    <div className="min-h-screen bg-[#F6F1EB] text-[#0E2A3A] pb-32">
      <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:py-10">
        <CalculatorNav />

        {/* ━━ Hero ━━ */}
        <section className="mb-16 mt-4 text-center sm:mb-20 py-10 sm:py-14">
          {intro.badge && (
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#10353F]/8 px-4 py-2 text-xs font-semibold text-[#10353F] ring-1 ring-inset ring-[#10353F]/15">
              {intro.badge}
            </div>
          )}
          <h1 className="text-[2rem] font-bold leading-[1.25] tracking-[-0.03em] text-[#0E2A3A] sm:text-[2.5rem] sm:leading-[1.2] lg:text-[3rem] lg:leading-[1.15] whitespace-pre-line">
            {intro.title}
          </h1>
          {intro.subtitle && (
            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#5E6E73]">
              {intro.subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 text-sm font-medium text-[#5E6E73]">
                <Icon className="h-4 w-4 text-[#10353F]" />
                {text}
              </span>
            ))}
          </div>

          {/* 대표 비주얼 */}
          <HeroVisual calculatorId={config.id} />
        </section>

        {/* ━━ Summary Cards ━━ */}
        {intro.summaryCards && (
          <section className="mb-16 sm:mb-20">
            <div className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-md sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {intro.summaryCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} className="rounded-2xl bg-[#F6F1EB]/60 p-6 transition-all duration-200 hover:bg-[#F6F1EB]">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#10353F]/8">
                        <Icon className="h-5 w-5 text-[#10353F]" />
                      </div>
                      <h3 className="text-base font-semibold text-[#0E2A3A]">{card.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ━━ Content Sections ━━ */}
        <div className="space-y-8">
          {intro.sections.map((section, i) => (
            <section key={i} className="rounded-3xl border border-[#E5E1DA] bg-white p-8 shadow-md sm:p-10">
              <h2 className="mb-6 text-xl font-bold tracking-[-0.01em] text-[#0E2A3A] sm:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-4 text-[15px] leading-[1.85] text-[#5E6E73]">
                {section.content.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>

              {/* 시각 블록 */}
              <SectionVisual visual={section.visual} />

              {/* 하이라이트 */}
              {section.highlight && (
                <div className="mt-8 rounded-2xl border border-[#10353F]/15 bg-[#10353F]/5 px-6 py-5 text-[15px] font-semibold leading-relaxed text-[#10353F]">
                  {section.highlight}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ━━ Bottom CTA Section ━━ */}
        <section className="mt-16 rounded-3xl bg-[#10353F] px-8 py-16 text-center shadow-lg sm:mt-20 sm:px-10">
          <p className="text-[1.5rem] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem] lg:text-[2rem]">
            {intro.bottomCta?.title || "지금 내 조건으로 바로 확인해보세요"}
          </p>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#E6D3BE]/70">
            {intro.bottomCta?.subtitle || "입력은 1분이면 충분합니다"}
          </p>
          <button
            onClick={goToCalculator}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          >
            바로 계산하기
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        {/* ━━ Trust Note ━━ */}
        <section className="mt-12 rounded-2xl border border-[#E5E1DA] bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-semibold text-[#7A868B]">안내</p>
          <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[#7A868B]">
            <li>본 내용은 일반적인 금융 정보로, 실제 대출 조건은 금융기관별로 다를 수 있습니다.</li>
            <li>LoanClock은 특정 금융 상품을 판매하거나 중개하지 않습니다.</li>
          </ul>
        </section>
      </div>

      {/* ━━ Fixed Bottom CTA ━━ */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 animate-[slideUp_0.4s_ease-out]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="absolute inset-x-0 -top-16 bottom-0 bg-gradient-to-t from-[#F6F1EB]/95 via-[#F6F1EB]/75 via-60% to-transparent backdrop-blur-2xl [mask-image:linear-gradient(to_top,black_60%,transparent)]" />

        <div className="pointer-events-auto relative mx-auto flex max-w-md justify-center px-5 pb-5 pt-8">
          <button
            onClick={goToCalculator}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#D97852] px-8 py-[18px] text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] sm:text-xl"
          >
            바로 계산하기
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
