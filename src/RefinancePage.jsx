import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  ShieldCheck,
  Zap,
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

// [신규] 최종 CTA 클릭 전용 이벤트
function trackFinalCtaClick({ id, label }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "final_cta_click", {
    event_category: "bridge",
    event_label: label,
    event_id: id,
  });
}

// ─── 유틸 ────────────────────────────────────────────────────────────────
function formatCurrency(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return null;
  return `${Math.round(num).toLocaleString("ko-KR")}원`;
}

// ─── 데이터 ────────────────────────────────────────────────────────────────
const SAVING_CARDS = [
  {
    icon: <TrendingDown className="h-5 w-5 text-[#10353F]" />,
    bg: "bg-emerald-50 border-emerald-200",
    title: "월 납입금 절감 가능성",
    desc: "금리가 낮아지면 매달 내는 금액이 줄어듭니다. 금리 차이 1%p로 월 수만 원 차이가 날 수 있습니다.",
    tag: "매달 부담이 달라집니다",
    tagColor: "text-emerald-600",
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-[#10353F]" />,
    bg: "bg-sky-50 border-sky-200",
    title: "총 이자 절감 가능성",
    desc: "대출 기간 전체로 보면 총 이자 차이가 수십~수백만 원에 달할 수 있습니다.",
    tag: "전체 부담 차이가 큽니다",
    tagColor: "text-[#10353F]",
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
  // [URL 파라미터] 계산기에서 전달받은 사용자 조건 데이터
  const [searchParams] = useSearchParams();
  const passedRate = searchParams.get("rate");
  const passedInterest = searchParams.get("interest");
  const passedSavings = searchParams.get("savings");

  const hasUserData = !!passedInterest;
  const interestFormatted = formatCurrency(passedInterest);
  const savingsFormatted = formatCurrency(passedSavings);
  const lowerRate = passedRate ? (Number(passedRate) - 1).toFixed(1) : null;

  useEffect(() => { trackBridgeView(); }, []);

  // [최종 CTA 클릭] cta_click + final_cta_click 동시 추적
  const handleFinalCta = (id) => {
    trackCtaClick({ id, label: "지금 최저 금리 상품 확인하기" });
    trackFinalCtaClick({ id, label: "지금 최저 금리 상품 확인하기" });
  };

  return (
    <div className="min-h-screen bg-[#F6F1EB] text-[#0E2A3A]">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">

        {/* 뒤로가기 */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E6E73] transition hover:text-[#0E2A3A]"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          계산기로 돌아가기
        </Link>

        {/* ── 1. HERO ── */}
        <section className="mb-8 rounded-3xl border border-[#10353F] bg-[#10353F] px-6 py-10 shadow-xl sm:px-8 sm:py-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-400/10 px-3 py-1 text-xs font-bold text-red-300 ring-1 ring-red-400/20">
            <AlertCircle className="h-3.5 w-3.5" />
            현재 조건 유지가 손해일 수 있습니다
          </div>

          {/* [개인화 헤드라인] URL 파라미터 있으면 실제 금액으로 표시 */}
          {hasUserData && interestFormatted ? (
            <>
              <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                지금 조건이면 최대<br />
                <span className="text-red-400">{interestFormatted} 이자</span>를 더 낼 수 있습니다
              </h1>
              {savingsFormatted && (
                <p className="mt-3 text-sm leading-7 text-[#5E6E73]">
                  대환으로{" "}
                  <strong className="text-[#E6D3BE]">약 {savingsFormatted} 절약</strong>이 가능할 수 있습니다.
                  지금 대환 조건을 확인해보세요.
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                지금 대환하면<br />
                <span className="text-[#E6D3BE]">얼마나 아낄 수 있는지</span> 확인해보세요
              </h1>
              <p className="mt-3 text-sm leading-7 text-[#5E6E73]">
                금리 차이와 상환 구조에 따라 절약 가능성이 크게 달라질 수 있습니다.
                먼저 실제 조건 비교로 <strong className="text-[#E6D3BE]">대환 가능성을 확인</strong>해보세요.
              </p>
            </>
          )}

          {/* 신뢰 포인트 */}
          <div className="mt-5 flex flex-wrap gap-2">
            {TRUST_ITEMS.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-medium text-[#E6D3BE] ring-1 ring-white/10">
                <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-[#E6D3BE]" />
                {t}
              </span>
            ))}
          </div>

          {/* [통합 CTA] 단일 핵심 버튼 */}
          <div className="mt-8">
            <a
              href="/out/loan?from=refinance_hero_primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleFinalCta("refinance_hero_primary")}
              className="flex h-14 items-center justify-center rounded-xl bg-[#D97852] text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-[#C96543] hover:shadow-xl active:scale-[0.98]"
            >
              지금 최저 금리 상품 확인하기
            </a>
            <p className="mt-2.5 text-center text-xs text-[#E6D3BE]/50">금리 1%만 낮춰도 수백만 원 절약 가능합니다</p>
          </div>
        </section>

        {/* ── 2. Before/After 비교 박스 (URL 파라미터 있을 때 개인화 표시) ── */}
        {hasUserData && (
          <section className="mb-8 rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <h2 className="text-base font-bold text-[#0E2A3A]">현재 조건 vs 대환 후 조건</h2>
            </div>

            {/* Before / After 비교 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                <p className="text-xs font-semibold text-red-600">현재 조건</p>
                {passedRate && (
                  <p className="mt-1 text-lg font-bold text-[#0E2A3A]">금리 {passedRate}%</p>
                )}
                {interestFormatted && (
                  <>
                    <p className="mt-1 text-base font-bold text-red-700">{interestFormatted}</p>
                    <p className="mt-0.5 text-xs text-red-500">총 이자 부담</p>
                  </>
                )}
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold text-emerald-600">대환 후 (예상)</p>
                {lowerRate && Number(lowerRate) > 0 && (
                  <p className="mt-1 text-lg font-bold text-[#0E2A3A]">금리 {lowerRate}%</p>
                )}
                {savingsFormatted ? (
                  <>
                    <p className="mt-1 text-base font-bold text-emerald-600">약 {savingsFormatted}</p>
                    <p className="mt-0.5 text-xs text-emerald-500">절약 가능</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-emerald-600">절약 가능성 있음</p>
                )}
              </div>
            </div>

            {/* 긴급성 문구 */}
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
              <p className="text-sm font-semibold text-amber-700">
                금리는 언제든 변동될 수 있습니다. 지금이 대환 조건을 확인하기 가장 좋은 시점입니다.
              </p>
            </div>
          </section>
        )}

        {/* ── 3. 손해 압박 박스 ── */}
        <section className="mb-8 rounded-3xl border border-red-100 bg-red-50 p-6 sm:p-8">
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

        {/* ── 4. 절약 가능성 카드 ── */}
        <section className="mb-8 space-y-5">
          <h2 className="text-lg font-bold text-[#0E2A3A]">대환으로 달라질 수 있는 것</h2>
          {SAVING_CARDS.map((card) => (
            <div key={card.title} className={`rounded-3xl border p-6 shadow-md sm:p-7 ${card.bg}`}>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-[#0E2A3A]">{card.title}</h3>
              </div>
              <p className="text-sm leading-6 text-[#5E6E73]">{card.desc}</p>
              <p className={`mt-2 text-xs font-bold ${card.tagColor}`}>→ {card.tag}</p>
            </div>
          ))}
        </section>

        {/* ── 5. 현재 유지 vs 대환 후 비교 ── */}
        <section className="mb-8">
          <h2 className="mb-5 text-lg font-bold text-[#0E2A3A]">현재 유지 vs 대환 후</h2>
          <div className="grid grid-cols-2 gap-4">
            {SCENARIOS.map((s) => (
              <div key={s.label} className={`rounded-3xl border p-6 shadow-md ${s.color}`}>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${s.labelColor}`}>
                  {s.icon} {s.label}
                </span>
                <ul className="mt-3 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-xs leading-5 text-[#5E6E73]">{item}</li>
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

        {/* ── 6. 프로세스 ── */}
        <section className="mb-8 rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#10353F]" />
            <h2 className="text-base font-bold text-[#0E2A3A]">대환 가능성 확인 3단계</h2>
          </div>
          <div className="space-y-3">
            {[
              { n: "01", t: "현재 조건 입력", d: "대출금액 · 금리 · 잔여 기간" },
              { n: "02", t: "대환 조건 비교", d: "여러 금융사 대환 가능 조건 확인" },
              { n: "03", t: "절약 금액 확인", d: "월 납입금 · 총 이자 절감 차이 파악" },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-center gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#10353F] text-xs font-bold text-white">{s.n}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0E2A3A]">{s.t}</p>
                  <p className="text-xs text-[#5E6E73]">{s.d}</p>
                </div>
                {i < arr.length - 1 && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#10353F]" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. 최종 CTA 섹션 ── */}
        <section className="mb-8 rounded-3xl border border-[#10353F] bg-[#10353F] px-6 py-10 shadow-xl sm:px-8 sm:py-12">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-bold text-amber-400">지금 확인하지 않으면</p>
          </div>

          {/* [개인화] 실제 금액 기반 헤드라인 */}
          {hasUserData && interestFormatted ? (
            <h2 className="mb-2 text-xl font-bold leading-snug text-white">
              지금 조건이면{" "}
              <span className="text-red-400">{interestFormatted}</span>{" "}
              이자를<br />그대로 부담하게 됩니다
            </h2>
          ) : (
            <h2 className="mb-2 text-xl font-bold leading-snug text-white">
              손해를 계속 보고 있을 수 있습니다
            </h2>
          )}

          <p className="mb-6 text-sm leading-6 text-[#5E6E73]">
            대환 조건을 비교해보는 것만으로도 절약 여부를 확인할 수 있습니다.
            <br />
            <span className="font-semibold text-amber-300">금리는 언제든 변동될 수 있습니다.</span>
          </p>

          {/* [통합 CTA] 단일 최종 CTA */}
          <a
            href="/out/loan?from=refinance_final_primary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleFinalCta("refinance_final_primary")}
            className="flex h-14 items-center justify-center rounded-xl bg-[#D97852] text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-[#C96543] hover:shadow-xl active:scale-[0.98]"
          >
            지금 최저 금리 상품 확인하기
          </a>
          <p className="mt-2.5 text-center text-xs text-[#E6D3BE]/50">조건 입력만으로 확인 · 무료</p>
        </section>

        {/* 면책 */}
        <p className="mb-12 text-center text-xs leading-6 text-[#7A868B]">
          본 페이지는 참고용 안내이며, 실제 금리 및 대환 조건은 금융기관 심사 기준에 따라 달라질 수 있습니다.
          중도상환수수료 등 비용을 반드시 확인 후 결정하세요.
        </p>

      </div>
    </div>
  );
}
