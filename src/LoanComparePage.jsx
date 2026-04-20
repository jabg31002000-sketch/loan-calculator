import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Clock,
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
  window.gtag("event", "bridge_view_compare", { event_category: "bridge" });
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
const PAIN_POINTS = [
  { icon: <AlertCircle className="h-4 w-4 text-red-400" />, text: "처음 받은 금리를 그대로 유지 중" },
  { icon: <AlertCircle className="h-4 w-4 text-red-400" />, text: "다른 금융사와 비교해본 적 없음" },
  { icon: <AlertCircle className="h-4 w-4 text-red-400" />, text: "더 나은 조건이 있는지 확인 안 함" },
];

const COMPARE_CARDS = [
  {
    icon: <TrendingDown className="h-5 w-5 text-[#10353F]" />,
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
    icon: <ShieldCheck className="h-5 w-5 text-[#10353F]" />,
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
        <section className="mb-8 rounded-3xl border border-[#10353F] bg-[#10353F] px-6 py-10 shadow-xl lg:px-8 lg:py-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-400/10 px-3 py-1 text-xs font-bold text-red-300 ring-1 ring-red-400/20">
            <AlertCircle className="h-3.5 w-3.5" />
            지금 조건이 최선이 아닐 수 있습니다
          </div>

          {/* [개인화 헤드라인] URL 파라미터 있으면 실제 금액으로 표시 */}
          {hasUserData && interestFormatted ? (
            <>
              <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                지금 조건이면<br />
                <span className="text-red-400">총 이자 {interestFormatted}</span>을 부담합니다
              </h1>
              {savingsFormatted && (
                <p className="mt-3 text-sm leading-7 text-[#5E6E73]">
                  금리를 1%p만 낮춰도{" "}
                  <strong className="text-[#E6D3BE]">약 {savingsFormatted} 절약</strong> 가능합니다.
                  지금 더 나은 조건이 있는지 확인해보세요.
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
                같은 대출이어도<br />
                <span className="text-[#E6D3BE]">실제 부담은 다를 수 있습니다</span>
              </h1>
              <p className="mt-3 text-sm leading-7 text-[#5E6E73]">
                현재 금리와 상환 구조를 기준으로 더 나은 조건 가능성을 확인해보세요.
                비교만으로도 월 부담과 총 이자 차이를 빠르게 파악할 수 있습니다.
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
              href="/out/loan?from=compare_hero_primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleFinalCta("compare_hero_primary")}
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
              <h2 className="text-base font-bold text-[#0E2A3A]">현재 조건 vs 낮은 금리 조건</h2>
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
                <p className="text-xs font-semibold text-emerald-600">낮은 금리 적용 시</p>
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
                금리는 언제든 변동될 수 있습니다. 지금이 비교하기 가장 좋은 시점입니다.
              </p>
            </div>
          </section>
        )}

        {/* ── 3. 공감 포인트 ── */}
        <section className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="mb-4 text-base font-bold text-[#0E2A3A]">혹시 이런 상황 아니신가요?</h2>
          <ul className="space-y-3">
            {PAIN_POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                {p.icon}
                <span className="text-sm font-medium text-[#0E2A3A]">{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm font-bold text-[#0E2A3A]">
              대부분은 <span className="text-[#10353F]">비교만 해도</span> 더 나은 조건을 찾을 수 있습니다
            </p>
          </div>
        </section>

        {/* ── 4. 비교 카드 ── */}
        <section className="mb-8 space-y-5">
          <h2 className="text-lg font-bold text-[#0E2A3A]">실제 비교로 알 수 있는 것</h2>
          {COMPARE_CARDS.map((card) => (
            <div key={card.title} className="rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F1EB]">
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#0E2A3A]">{card.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#5E6E73]">{card.desc}</p>
              <p className="mt-3 text-[13px] font-bold text-[#10353F]">{card.emphasis}</p>
            </div>
          ))}
        </section>

        {/* ── 5. 행동 유도 압박 박스 ── */}
        <section className="mb-8 rounded-3xl border border-red-100 bg-red-50 p-6 sm:p-8">
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

        {/* ── 6. 프로세스 ── */}
        <section className="mb-8 rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#10353F]" />
            <h2 className="text-base font-bold text-[#0E2A3A]">1분이면 확인 가능합니다</h2>
          </div>
          <div className="space-y-3">
            {[
              { n: "01", t: "조건 입력", d: "현재 대출금액 · 금리 · 기간" },
              { n: "02", t: "금리 비교", d: "여러 금융사 조건 실시간 비교" },
              { n: "03", t: "절약 확인", d: "월 납입금 · 총 이자 차이 파악" },
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
              계속 더 내고 있을 수 있습니다
            </h2>
          )}

          <p className="mb-6 text-sm leading-6 text-[#5E6E73]">
            지금 가능한 선택지를 먼저 확인해보세요.
            비교만 해도 절약 가능성을 알 수 있습니다.
            <br />
            <span className="font-semibold text-amber-300">금리는 언제든 변동될 수 있습니다.</span>
          </p>

          {/* [통합 CTA] 단일 최종 CTA */}
          <a
            href="/out/loan?from=compare_final_primary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleFinalCta("compare_final_primary")}
            className="flex h-14 items-center justify-center rounded-xl bg-[#D97852] text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-[#C96543] hover:shadow-xl active:scale-[0.98]"
          >
            지금 최저 금리 상품 확인하기
          </a>
          <p className="mt-2.5 text-center text-xs text-[#E6D3BE]/50">조건 입력만으로 확인 · 무료</p>
        </section>

        {/* 면책 */}
        <p className="mb-12 text-center text-xs leading-6 text-[#7A868B]">
          본 페이지는 참고용 안내이며, 실제 금리 및 조건은 금융기관 심사 기준에 따라 달라질 수 있습니다.
        </p>

      </div>
    </div>
  );
}
