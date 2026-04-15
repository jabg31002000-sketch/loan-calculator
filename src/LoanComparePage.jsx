import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Clock,
} from "lucide-react";

// ─── GA 추적 ───────────────────────────────────────────────────────────────
function trackCtaClick({ id, label }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", {
    event_category: "loan",
    event_label: label,
    event_id: id,
  });
}

function trackBridgeView() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "bridge_view_compare", { event_category: "bridge" });
}

// ─── 데이터 ────────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  { icon: <AlertCircle className="h-4 w-4 text-red-400" />, text: "처음 받은 금리를 그대로 유지 중" },
  { icon: <AlertCircle className="h-4 w-4 text-red-400" />, text: "다른 금융사와 비교해본 적 없음" },
  { icon: <AlertCircle className="h-4 w-4 text-red-400" />, text: "더 나은 조건이 있는지 확인 안 함" },
];

const COMPARE_CARDS = [
  {
    icon: <TrendingDown className="h-5 w-5 text-sky-600" />,
    title: "월 부담 차이",
    desc: "같은 금액이어도 금리·상환방식에 따라 월 납입금이 수만 원씩 달라질 수 있습니다.",
    emphasis: "매달 내는 돈이 달라집니다",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-amber-600" />,
    title: "총 이자 차이",
    desc: "금리 1%p 차이만으로 수십~수백만 원의 총 이자 차이가 발생할 수 있습니다.",
    emphasis: "전체 부담이 크게 달라집니다",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
    title: "실제 조건 비교",
    desc: "계산 결과를 들고 실제 금융사 조건과 비교해야 진짜 유리한 선택을 할 수 있습니다.",
    emphasis: "비교 없이는 알 수 없습니다",
  },
];

const TRUST_ITEMS = [
  "회원가입 없이 바로 확인",
  "조건 입력만으로 비교 가능",
  "여러 금융사 조건 한 번에 확인",
];

// ─── 메인 ──────────────────────────────────────────────────────────────────
export default function LoanComparePage() {
  useEffect(() => { trackBridgeView(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">

        {/* 뒤로가기 */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-700"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          계산기로 돌아가기
        </Link>

        {/* ── 1. HERO ── */}
        <section className="mb-6 rounded-[28px] border border-slate-800 bg-slate-900 px-6 py-8 shadow-xl lg:px-8 lg:py-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-400/10 px-3 py-1 text-xs font-bold text-red-300 ring-1 ring-red-400/20">
            <AlertCircle className="h-3.5 w-3.5" />
            지금 조건이 최선이 아닐 수 있습니다
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
            같은 대출이어도<br />
            <span className="text-sky-400">실제 부담은 다를 수 있습니다</span>
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            현재 금리와 상환 구조를 기준으로 더 나은 조건 가능성을 확인해보세요.
            비교만으로도 월 부담과 총 이자 차이를 빠르게 파악할 수 있습니다.
          </p>

          {/* 신뢰 포인트 */}
          <div className="mt-5 flex flex-wrap gap-2">
            {TRUST_ITEMS.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-white/10">
                <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-emerald-400" />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/out/loan?from=compare_hero_primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "compare_hero_primary", label: "실제 금리 비교하러 가기" })}
              className="flex h-14 items-center justify-center rounded-2xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-900/40 transition hover:scale-[1.03] hover:bg-sky-400 active:scale-[0.97]"
            >
              실제 금리 비교하러 가기
            </a>
            <a
              href="/out/loan?from=compare_hero_secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "compare_hero_secondary", label: "지금 가능한 조건 확인하기" })}
              className="flex h-12 items-center justify-center rounded-2xl border border-slate-600 bg-white/5 text-sm font-semibold text-slate-300 transition hover:scale-[1.02] hover:border-slate-400 hover:bg-white/10 hover:text-white active:scale-[0.97]"
            >
              지금 가능한 조건 확인하기
            </a>
            <p className="text-center text-xs text-slate-600">지금 바로 확인 가능 · 1분 소요</p>
          </div>
        </section>

        {/* ── 2. 공감 포인트 ── */}
        <section className="mb-6 rounded-[28px] border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-4 text-base font-bold text-slate-900">혹시 이런 상황 아니신가요?</h2>
          <ul className="space-y-3">
            {PAIN_POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                {p.icon}
                <span className="text-sm font-medium text-slate-700">{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm font-bold text-slate-900">
              대부분은 <span className="text-sky-600">비교만 해도</span> 더 나은 조건을 찾을 수 있습니다
            </p>
          </div>
        </section>

        {/* ── 3. 비교 카드 ── */}
        <section className="mb-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">실제 비교로 알 수 있는 것</h2>
          {COMPARE_CARDS.map((card) => (
            <div key={card.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
              </div>
              <p className="text-sm leading-6 text-slate-500">{card.desc}</p>
              <p className="mt-2 text-xs font-bold text-slate-700">→ {card.emphasis}</p>
            </div>
          ))}
        </section>

        {/* ── 4. 행동 유도 압박 박스 ── */}
        <section className="mb-6 rounded-[28px] border border-red-100 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-bold text-red-700">계산만 하고 끝내면 손해일 수 있습니다</p>
              <p className="mt-1 text-sm leading-6 text-red-600">
                실제 조건 비교까지 해야 의미 있는 판단이 됩니다.
                지금 확인하지 않으면 더 내고 있을 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. 프로세스 ── */}
        <section className="mb-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">1분이면 확인 가능합니다</h2>
          </div>
          <div className="space-y-3">
            {[
              { n: "01", t: "조건 입력", d: "현재 대출금액 · 금리 · 기간" },
              { n: "02", t: "금리 비교", d: "여러 금융사 조건 실시간 비교" },
              { n: "03", t: "절약 확인", d: "월 납입금 · 총 이자 차이 파악" },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-center gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{s.n}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{s.t}</p>
                  <p className="text-xs text-slate-500">{s.d}</p>
                </div>
                {i < arr.length - 1 && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. 최종 CTA ── */}
        <section className="mb-8 rounded-[28px] border border-slate-800 bg-slate-900 px-6 py-8 shadow-xl lg:px-8 lg:py-10">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-bold text-amber-400">지금 확인하지 않으면</p>
          </div>
          <h2 className="mb-2 text-xl font-bold leading-snug text-white">
            계속 더 내고 있을 수 있습니다
          </h2>
          <p className="mb-6 text-sm leading-6 text-slate-400">
            지금 가능한 선택지를 먼저 확인해보세요.
            비교만 해도 절약 가능성을 알 수 있습니다.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/out/loan?from=compare_final_primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "compare_final_primary", label: "실제 금리 비교하러 가기" })}
              className="flex h-14 items-center justify-center rounded-2xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-900/40 transition hover:scale-[1.03] hover:bg-sky-400 active:scale-[0.97]"
            >
              실제 금리 비교하러 가기
            </a>
            <a
              href="/out/loan?from=compare_final_secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "compare_final_secondary", label: "지금 가능한 조건 확인하기" })}
              className="flex h-12 items-center justify-center rounded-2xl border border-slate-600 bg-white/5 text-sm font-semibold text-slate-300 transition hover:scale-[1.02] hover:border-slate-400 hover:bg-white/10 hover:text-white active:scale-[0.97]"
            >
              지금 가능한 조건 확인하기
            </a>
            <p className="text-center text-xs text-slate-600">조건 입력만으로 확인 · 무료</p>
          </div>
        </section>

        {/* 면책 */}
        <p className="mb-12 text-center text-xs leading-6 text-slate-400">
          본 페이지는 참고용 안내이며, 실제 금리 및 조건은 금융기관 심사 기준에 따라 달라질 수 있습니다.
        </p>

      </div>
    </div>
  );
}
