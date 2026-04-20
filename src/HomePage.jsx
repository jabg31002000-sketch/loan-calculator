import { Link } from "react-router-dom";
import { useSeo } from "./useSeo";
import {
  Calculator, RefreshCw, Home, PieChart, Building2, Car,
  Shield, Zap, Eye, ArrowRight, CheckCircle2, ChevronRight,
  Landmark, Percent, Building, Lock, DollarSign, Heart,
  TrendingDown, Clock, UserCheck, Search, BarChart3, FileCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import HeroFinanceIllustration from "./components/HeroFinanceIllustration";

/* ─────────────────── Data ─────────────────── */

const CALCULATORS = [
  {
    title: "신용대출 이자 계산",
    desc: "월 상환금과 총 이자를 바로 확인하세요",
    path: "/credit-loan",
    icon: Calculator,
    tag: "인기",
  },
  {
    title: "대환 절약 금액 확인",
    desc: "금리를 낮추면 얼마나 아끼는지 계산",
    path: "/refinance-loan",
    icon: RefreshCw,
    tag: "절약",
  },
  {
    title: "전세 vs 월세 비교",
    desc: "어떤 선택이 더 유리한지 비교 분석",
    path: "/jeonse-vs-rent",
    icon: Home,
  },
  {
    title: "DSR / 대출한도 확인",
    desc: "내 소득으로 얼마까지 빌릴 수 있는지",
    path: "/dsr",
    icon: PieChart,
  },
  {
    title: "주담대 가능 금액",
    desc: "내 집 마련 가능 범위를 확인하세요",
    path: "/mortgage",
    icon: Building2,
  },
  {
    title: "자동차 할부 계산",
    desc: "월 할부금과 총 비용을 한눈에",
    path: "/auto-loan",
    icon: Car,
  },
  {
    title: "버팀목 전세대출",
    desc: "정부 지원 전세대출 예상 금액 확인",
    path: "/beotimmok-jeonse",
    icon: Landmark,
  },
  {
    title: "전세대출 이자 계산",
    desc: "보증금과 금리만 넣으면 월 이자 확인",
    path: "/jeonse-loan-interest",
    icon: Percent,
  },
  {
    title: "디딤돌대출 한도",
    desc: "저금리 주택구입 대출 가능 금액 확인",
    path: "/didimdol",
    icon: Building,
  },
  {
    title: "보금자리론 시뮬레이션",
    desc: "장기 고정금리 주담대 상환 분석",
    path: "/bogeumjari",
    icon: Lock,
  },
  {
    title: "월세대출 총 주거비",
    desc: "보증금 대출 + 월세 합산 주거비 확인",
    path: "/monthly-rent-loan",
    icon: DollarSign,
  },
  {
    title: "생애최초 대출 진단",
    desc: "첫 집 구매자 맞춤 예산 구간 분석",
    path: "/first-home",
    icon: Heart,
  },
];

const STATS = [
  { value: "50,000+", label: "누적 계산 수", icon: BarChart3 },
  { value: "47초", label: "평균 확인 시간", icon: Clock },
  { value: "0원", label: "완전 무료", icon: Shield },
  { value: "12종", label: "계산기 보유", icon: Calculator },
];

const STEPS = [
  { num: "01", title: "상황 선택", desc: "신용대출, 주담대, 전세 등 내 상황에 맞는 계산기를 선택하세요.", icon: Search },
  { num: "02", title: "간단 입력", desc: "금액, 금리, 기간 등 기본 정보만 입력하면 됩니다.", icon: FileCheck },
  { num: "03", title: "즉시 분석", desc: "실제 금융 구조 기반으로 대출 한도, 이자, 상환금을 분석합니다.", icon: BarChart3 },
  { num: "04", title: "결과 확인", desc: "월 상환금, 총 이자, 절약 가능 금액 등 핵심 결과를 확인하세요.", icon: CheckCircle2 },
];

const WHY_ITEMS = [
  { title: "회원가입 없이 바로 이용", desc: "개인정보 입력 없이, 접속하는 즉시 모든 계산기를 사용할 수 있습니다.", icon: UserCheck },
  { title: "실제 금융 구조 기반 계산", desc: "원리금균등, 원금균등, 만기일시 등 실제 은행이 사용하는 계산 로직을 적용합니다.", icon: Shield },
  { title: "1분 안에 결과 확인", desc: "복잡한 과정 없이, 핵심 정보만 입력하면 즉시 결과를 보여드립니다.", icon: Zap },
  { title: "대출 비교까지 한 번에", desc: "여러 조건을 바꿔가며 시뮬레이션하고, 어떤 선택이 유리한지 비교할 수 있습니다.", icon: TrendingDown },
];

/* ─────────────────── Animated counter ─────────────────── */

function AnimatedStat({ value, label, icon: Icon }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-3 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <Icon className="h-5 w-5 text-[#E6D3BE]" />
      </div>
      <p className="text-[1.75rem] font-bold tracking-[-0.02em] text-white sm:text-[2rem]">{value}</p>
      <p className="text-xs font-medium tracking-wide text-[#E6D3BE]/50">{label}</p>
    </div>
  );
}

/* ─────────────────── Section fade-in ─────────────────── */

function FadeInSection({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────── Calculator Card ─────────────────── */

function CalcCard({ item }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E5E1DA] bg-white p-7 shadow-md transition-all duration-300 hover:border-[#D5D0C8] hover:shadow-xl hover:-translate-y-2 active:scale-[0.98] sm:p-8"
    >
      {item.tag && (
        <span className="absolute right-4 top-4 rounded-full bg-[#D97852] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
          {item.tag}
        </span>
      )}

      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10353F]/8 transition-colors duration-300 group-hover:bg-[#10353F] group-hover:shadow-md">
          <Icon className="h-5 w-5 text-[#10353F] transition-colors group-hover:text-white" />
        </div>
        <h3 className="text-base font-semibold text-[#0E2A3A] transition-colors group-hover:text-[#10353F] sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">
          {item.desc}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-[#C4BFB6] transition-colors group-hover:text-[#D97852]">
        자세히 보기
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

/* ─────────────────── Main Page ─────────────────── */

export default function HomePage() {
  useSeo(
    "대출 계산기 | 이자·한도·대환 비교 - LoanClock",
    "신용대출, 주담대, 전세대출, 자동차 할부까지. 내 상황에 맞는 대출 부담을 1분 안에 확인하세요."
  );

  return (
    <div className="relative min-h-screen -mt-[52px] md:-mt-[60px]">

      {/* ══════ 1️⃣ BASE ══════ */}
      <div className="fixed inset-0 -z-10 bg-[#071a1f]">

        {/* ══════ 2️⃣ BACKGROUND IMAGE — opacity 0.50, blur 6px ══════ */}
        <div className="absolute inset-0">
          <div className="h-full w-full scale-[1.1]"
            style={{ backgroundImage: 'url("/bg-ambient.svg")', backgroundSize: 'cover', backgroundPosition: 'center 42%', opacity: 0.50, filter: 'blur(6px)' }} />
        </div>

        {/* ══════ 3️⃣ NAVY OVERLAY — /30 only ══════ */}
        <div className="absolute inset-0 bg-[#10353F]/30" />

        {/* ══════ 4️⃣ DEPTH GRADIENT ══════ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/35" />

        {/* ══════ 5️⃣ MULTI LIGHT — 6개 ══════ */}
        <div className="pointer-events-none absolute inset-0">

          {/* ① 메인 상단 중앙 — 가장 큰 핵심 빛 */}
          <div className="absolute left-[25%] top-[6%] h-[560px] w-[560px] rounded-full blur-[120px]"
            style={{ background: 'rgba(255,255,255,0.14)' }} />

          {/* ② 우상단 — cyan 계열 보조 빛 */}
          <div className="absolute right-[10%] top-[12%] h-[420px] w-[420px] rounded-full blur-[100px]"
            style={{ background: 'rgba(150,220,225,0.09)' }} />

          {/* ③ 좌상단 — 은은한 흰빛 */}
          <div className="absolute -left-[2%] top-[5%] h-[380px] w-[380px] rounded-full blur-[110px]"
            style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* ④ 중앙 — 보조 확산 빛 */}
          <div className="absolute left-1/2 top-[35%] h-[350px] w-[450px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* ⑤ 좌하단 — bounce light (바닥 반사) */}
          <div className="absolute bottom-[5%] left-[8%] h-[320px] w-[400px] rounded-full blur-[120px]"
            style={{ background: 'rgba(200,230,235,0.05)' }} />

          {/* ⑥ 우하단 — 따뜻한 amber bounce */}
          <div className="absolute bottom-[12%] right-[18%] h-[300px] w-[350px] rounded-full blur-[100px]"
            style={{ background: 'rgba(210,150,90,0.045)' }} />

        </div>

        {/* ══════ 6️⃣ EDGE VIGNETTE ══════ */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 75% at 50% 45%, transparent 50%, rgba(0,0,0,0.55) 100%)' }} />
      </div>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTAINER
          ════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto w-full max-w-[1800px] px-2 pt-[52px] pb-2 md:pt-[60px] md:px-3 md:pb-3 lg:px-5 lg:pb-4">
        {/* Outer glow halo — box가 떠 보이게 */}
        <div className="pointer-events-none absolute inset-x-[3%] top-[30px] bottom-[10px] md:top-[40px]">
          <div className="absolute left-[10%] top-0 h-[500px] w-[80%] rounded-full blur-[90px]"
            style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>
        <div className="relative overflow-hidden rounded-[32px] lg:rounded-[40px]" style={{ border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 0 0 1px rgba(230,211,190,0.03), 0 10px 40px rgba(0,0,0,0.4), 0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)' }}>

          {/* ═══════════ HERO (navy zone) ═══════════ */}
          <div className="relative bg-[#10353F]">
            <div className="mx-auto max-w-5xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
              <div className="flex flex-col items-center text-center">

                {/* Text */}
                <div className="max-w-[720px] mx-auto">
                  {/* Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D97852] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D97852]" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-[#E6D3BE]">
                      12종 계산기 무료 제공 중
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-white text-center sm:text-[2.75rem] md:text-[3.25rem]">
                    대출은 부담이 아니라,
                    <br />
                    <span className="text-[#D97852]">전략입니다</span>
                  </h1>

                  {/* Subheadline */}
                  <p className="mt-5 text-[17px] font-medium tracking-[-0.01em] text-[#E6D3BE]/80 sm:text-[19px]">
                    숫자로 확인하면 더 쉬워집니다
                  </p>

                  {/* Description */}
                  <p className="mt-4 mx-auto max-w-md text-[15px] leading-relaxed text-[#E6D3BE]/55">
                    얼마를 빌릴 수 있는지, 갈아타면 얼마나 줄어드는지,
                    전세가 나은지 월세가 나은지 — 1분이면 답이 나옵니다.
                  </p>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <Link
                      to="/compare"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97852] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] sm:w-auto"
                    >
                      내 금리 확인하기
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                      href="#calculators"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
                    >
                      계산기 먼저 보기
                    </a>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    {[
                      { icon: UserCheck, text: "회원가입 없이 이용" },
                      { icon: Zap, text: "1분 내 결과 확인" },
                      { icon: Eye, text: "실제 금융 구조 기반" },
                    ].map(({ icon: TrustIcon, text }) => (
                      <span key={text} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#E6D3BE]/60">
                        <TrustIcon className="h-3.5 w-3.5 text-white/30" />
                        {text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Illustration — below text */}
                <div className="mt-16 flex justify-center overflow-visible">
                  <HeroFinanceIllustration className="w-[320px] sm:w-[400px] md:w-[480px] lg:w-[580px] xl:w-[660px] 2xl:w-[720px] max-w-none" />
                </div>
              </div>
            </div>

            {/* ── Stats bar ── */}
            <div className="border-t border-white/5">
              <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
                <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-8">
                  {STATS.map((stat) => (
                    <AnimatedStat key={stat.label} {...stat} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ CALCULATOR GRID (beige zone) ═══════════ */}
          <div id="calculators" className="bg-[#F6F1EB]">
            <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
              <FadeInSection>
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0E2A3A]/40">Calculators</span>
                  <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem]">
                    내 상황에 맞는 계산기를 선택하세요
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#5E6E73]">
                    신용대출부터 주담대, 전세, 정책대출까지 — 12가지 계산기가 준비되어 있습니다.
                  </p>
                </div>
              </FadeInSection>

              <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {CALCULATORS.map((item, i) => (
                  <FadeInSection key={item.path} delay={i * 50}>
                    <CalcCard item={item} />
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════ HOW IT WORKS (white zone) ═══════════ */}
          <div className="border-t border-[#E5E1DA]/60 bg-white">
            <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
              <FadeInSection>
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0E2A3A]/40">How it works</span>
                  <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem]">
                    4단계면 충분합니다
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#5E6E73]">
                    복잡한 대출 계산을 가장 쉽고 빠르게 확인하는 방법
                  </p>
                </div>
              </FadeInSection>

              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <FadeInSection key={step.num} delay={i * 100}>
                      <div className="relative rounded-3xl border border-[#E5E1DA] bg-[#F6F1EB]/40 p-8 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                        {i < STEPS.length - 1 && (
                          <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-[#E5E1DA] lg:block" />
                        )}
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10353F]/8">
                            <Icon className="h-5 w-5 text-[#10353F]" />
                          </div>
                          <span className="text-3xl font-bold text-[#E5E1DA]/80">{step.num}</span>
                        </div>
                        <h3 className="text-base font-semibold text-[#0E2A3A]">{step.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">{step.desc}</p>
                      </div>
                    </FadeInSection>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══════════ WHY LOANCLOCK (beige zone) ═══════════ */}
          <div className="border-t border-[#E5E1DA]/60 bg-[#F6F1EB]">
            <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Left: Text block */}
                <FadeInSection>
                  <div className="lg:sticky lg:top-24">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0E2A3A]/40">Why LoanClock</span>
                    <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem]">
                      대출이 어렵게 느껴지는
                      <br />
                      이유가 있습니다
                    </h2>
                    <p className="mt-5 text-[15px] leading-relaxed text-[#5E6E73]">
                      금리, 상환방식, DSR, LTV — 용어부터 복잡하고, 은행마다 조건이 다릅니다.
                      LoanClock은 이 과정을 단순하게 만들어, 누구나 자기 상황에 맞는 답을 빠르게 찾을 수 있도록 도와줍니다.
                    </p>
                    <Link
                      to="/compare"
                      className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
                    >
                      지금 바로 확인하기
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </FadeInSection>

                {/* Right: Checklist */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {WHY_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <FadeInSection key={item.title} delay={i * 80}>
                        <div className="flex gap-4 rounded-2xl border border-[#E5E1DA] bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10353F]/8">
                            <Icon className="h-5 w-5 text-[#10353F]" />
                          </div>
                          <div>
                            <h4 className="text-[15px] font-semibold text-[#0E2A3A]">{item.title}</h4>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-[#5E6E73]">{item.desc}</p>
                          </div>
                        </div>
                      </FadeInSection>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ FINAL CTA (navy zone) ═══════════ */}
          <div className="relative overflow-hidden bg-[#10353F]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(230,211,190,0.06)_0%,transparent_60%)]" />
            <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
              <FadeInSection>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E6D3BE]/20 bg-[#E6D3BE]/10 px-4 py-1.5 text-xs font-semibold text-[#E6D3BE]">
                  <Zap className="h-3.5 w-3.5" />
                  1분이면 충분합니다
                </span>
                <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-white sm:text-[2.25rem] md:text-[2.75rem]">
                  지금 바로 내 상황에 맞는
                  <br />
                  대출을 확인해보세요
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#E6D3BE]/70">
                  회원가입 없이, 내 조건만 넣으면 됩니다.
                  <br />
                  어떤 대출이 유리한지 숫자로 확인하세요.
                </p>
                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  <Link
                    to="/compare"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97852] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] sm:w-auto"
                  >
                    내 금리 확인하기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/credit-loan"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
                  >
                    신용대출 계산하기
                  </Link>
                </div>
              </FadeInSection>
            </div>
          </div>

          {/* ═══════════ DISCLAIMER ═══════════ */}
          <div className="border-t border-[#E5E1DA]/60 bg-[#F6F1EB]">
            <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
              <div className="rounded-2xl border border-[#E5E1DA] bg-white px-6 py-5 shadow-sm">
                <p className="text-xs font-semibold text-[#7A868B]">안내</p>
                <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[#7A868B]">
                  <li>본 계산 결과는 참고용이며, 실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다.</li>
                  <li>LoanClock은 특정 금융 상품을 판매하거나 중개하지 않습니다.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>{/* end main container panel */}
      </div>{/* end container wrapper */}
    </div>
  );
}
