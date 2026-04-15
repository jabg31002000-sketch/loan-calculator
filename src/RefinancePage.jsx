import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  ShieldCheck,
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
  window.gtag("event", "bridge_view_refinance", { event_category: "bridge" });
}

// ─── 데이터 ────────────────────────────────────────────────────────────────
const SAVING_CARDS = [
  {
    icon: <TrendingDown className="h-5 w-5 text-emerald-600" />,
    bg: "bg-emerald-50 border-emerald-200",
    title: "월 납입금 절감 가능성",
    desc: "금리가 낮아지면 매달 내는 금액이 줄어듭니다. 금리 차이 1%p로 월 수만 원 차이가 날 수 있습니다.",
    tag: "매달 부담이 달라집니다",
    tagColor: "text-emerald-600",
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-sky-600" />,
    bg: "bg-sky-50 border-sky-200",
    title: "총 이자 절감 가능성",
    desc: "대출 기간 전체로 보면 총 이자 차이가 수십~수백만 원에 달할 수 있습니다.",
    tag: "전체 부담 차이가 큽니다",
    tagColor: "text-sky-600",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-amber-600" />,
    bg: "bg-amber-50 border-amber-200",
    title: "대환 판단 포인트",
    desc: "중도상환수수료, 잔여 대출 기간, 현재 금리 수준을 종합적으로 고려해야 합니다.",
    tag: "먼저 비교 후 결정하세요",
    tagColor: "text-amber-600",
  },
];

const SCENARIOS = [
  {
    label: "현재 유지",
    color: "border-red-200 bg-red-50",
    labelColor: "text-red-700 bg-red-100",
    items: [
      "현재 금리 그대로 부담",
      "총 이자 절감 기회 미활용",
      "월 납입금 변화 없음",
    ],
    icon: "⚠",
  },
  {
    label: "대환 후",
    color: "border-emerald-200 bg-emerald-50",
    labelColor: "text-emerald-700 bg-emerald-100",
    items: [
      "더 낮은 금리 적용 가능성",
      "총 이자 절감 가능성",
      "월 부담 감소 가능성",
    ],
    icon: "✓",
  },
];

const TRUST_ITEMS = [
  "회원가입 없이 바로 확인",
  "조건 입력만으로 비교 가능",
  "대환 가능성 먼저 무료 확인",
];

// ─── 메인 ──────────────────────────────────────────────────────────────────
export default function RefinancePage() {
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
            현재 조건 유지가 손해일 수 있습니다
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
            지금 대환하면<br />
            <span className="text-emerald-400">얼마나 아낄 수 있는지</span> 확인해보세요
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            금리 차이와 상환 구조에 따라 절약 가능성이 크게 달라질 수 있습니다.
            먼저 실제 조건 비교로 <strong className="text-slate-300">대환 가능성을 확인</strong>해보세요.
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
              href="/out/loan?from=refinance_hero_primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "refinance_hero_primary", label: "대환 조건 비교하러 가기" })}
              className="flex h-14 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-900/40 transition hover:scale-[1.03] hover:bg-emerald-400 active:scale-[0.97]"
            >
              대환 조건 비교하러 가기
            </a>
            <a
              href="/out/loan?from=refinance_hero_secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "refinance_hero_secondary", label: "절약 가능성 확인하기" })}
              className="flex h-12 items-center justify-center rounded-2xl border border-slate-600 bg-white/5 text-sm font-semibold text-slate-300 transition hover:scale-[1.02] hover:border-slate-400 hover:bg-white/10 hover:text-white active:scale-[0.97]"
            >
              절약 가능성 확인하기
            </a>
            <p className="text-center text-xs text-slate-600">지금 바로 확인 가능 · 1분 소요</p>
          </div>
        </section>

        {/* ── 2. 손해 압박 박스 ── */}
        <section className="mb-6 rounded-[28px] border border-red-100 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-bold text-red-700">이 상태 유지 시 손해 가능성이 있습니다</p>
              <p className="mt-1 text-sm leading-6 text-red-600">
                지금 금리를 그대로 두면 더 낮출 수 있는 기회를 놓치는 것일 수 있습니다.
                더 나은 조건이 있다면 부담을 줄일 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. 절약 가능성 카드 ── */}
        <section className="mb-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">대환으로 달라질 수 있는 것</h2>
          {SAVING_CARDS.map((card) => (
            <div key={card.title} className={`rounded-[24px] border p-5 shadow-sm ${card.bg}`}>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
              </div>
              <p className="text-sm leading-6 text-slate-600">{card.desc}</p>
              <p className={`mt-2 text-xs font-bold ${card.tagColor}`}>→ {card.tag}</p>
            </div>
          ))}
        </section>

        {/* ── 4. 현재 유지 vs 대환 비교 ── */}
        <section className="mb-6">
          <h2 className="mb-4 text-base font-bold text-slate-900">현재 유지 vs 대환 후</h2>
          <div className="grid grid-cols-2 gap-3">
            {SCENARIOS.map((s) => (
              <div key={s.label} className={`rounded-[24px] border p-5 shadow-sm ${s.color}`}>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${s.labelColor}`}>
                  {s.icon} {s.label}
                </span>
                <ul className="mt-3 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-xs leading-5 text-slate-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-sm">
            <p className="text-sm font-bold text-emerald-700">
              비교만 해도 절약 가능성을 바로 알 수 있습니다
            </p>
          </div>
        </section>

        {/* ── 5. 프로세스 ── */}
        <section className="mb-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">대환 가능성 확인 3단계</h2>
          </div>
          <div className="space-y-3">
            {[
              { n: "01", t: "현재 조건 입력", d: "대출금액 · 금리 · 잔여 기간" },
              { n: "02", t: "대환 조건 비교", d: "여러 금융사 대환 가능 조건 확인" },
              { n: "03", t: "절약 금액 확인", d: "월 납입금 · 총 이자 절감 차이 파악" },
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
            손해를 계속 보고 있을 수 있습니다
          </h2>
          <p className="mb-6 text-sm leading-6 text-slate-400">
            대환 조건을 비교해보는 것만으로도 절약 여부를 확인할 수 있습니다.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/out/loan?from=refinance_final_primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "refinance_final_primary", label: "대환 조건 비교하러 가기" })}
              className="flex h-14 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-900/40 transition hover:scale-[1.03] hover:bg-emerald-400 active:scale-[0.97]"
            >
              대환 조건 비교하러 가기
            </a>
            <a
              href="/out/loan?from=refinance_final_secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick({ id: "refinance_final_secondary", label: "절약 가능성 확인하기" })}
              className="flex h-12 items-center justify-center rounded-2xl border border-slate-600 bg-white/5 text-sm font-semibold text-slate-300 transition hover:scale-[1.02] hover:border-slate-400 hover:bg-white/10 hover:text-white active:scale-[0.97]"
            >
              절약 가능성 확인하기
            </a>
            <p className="text-center text-xs text-slate-600">조건 입력만으로 확인 · 무료</p>
          </div>
        </section>

        {/* 면책 */}
        <p className="mb-12 text-center text-xs leading-6 text-slate-400">
          본 페이지는 참고용 안내이며, 실제 금리 및 대환 조건은 금융기관 심사 기준에 따라 달라질 수 있습니다.
          중도상환수수료 등 비용을 반드시 확인 후 결정하세요.
        </p>

      </div>
    </div>
  );
}
