import { Link } from "react-router-dom";
import {
  TrendingDown,
  ShieldCheck,
  Calculator,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

// ─── GA 추적 ───────────────────────────────────────────────
function trackCtaClick(label) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", { event_category: "engagement", event_label: label });
}

// ─── 계산 ──────────────────────────────────────────────────
function calcTotalInterest(principal, annualRate, months) {
  const r = annualRate / 100 / 12;
  if (r === 0) return 0;
  const pmt = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.max(0, Math.round(pmt * months - principal));
}

function fmt(value) {
  if (value >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}억원`;
  if (value >= 10_000) return `${Math.round(value / 10_000)}만원`;
  return `${value.toLocaleString("ko-KR")}원`;
}

// ─── 데이터 ────────────────────────────────────────────────
const CASES = [
  { principal: 30_000_000, fromRate: 5.2, toRate: 4.2, months: 36, label: "3,000만원 · 36개월" },
  { principal: 50_000_000, fromRate: 4.8, toRate: 3.9, months: 60, label: "5,000만원 · 60개월" },
  { principal: 100_000_000, fromRate: 5.0, toRate: 4.0, months: 120, label: "1억원 · 120개월" },
];

const PAIN_POINTS = [
  "처음 받은 금리 그대로 쓰는 중",
  "다른 은행과 비교해본 적 없음",
  "대환 가능한지조차 모름",
];

const TRUST_ITEMS = [
  { icon: <ShieldCheck className="h-5 w-5 text-sky-600" />, text: "여러 금융사 조건 비교" },
  { icon: <Calculator className="h-5 w-5 text-slate-600" />, text: "내 조건 기준 맞춤 확인" },
  { icon: <TrendingDown className="h-5 w-5 text-emerald-600" />, text: "예상 절약 금액 확인" },
];

const STEPS = [
  { step: "01", title: "조건 입력", desc: "대출금액·금리·기간" },
  { step: "02", title: "금리 비교", desc: "여러 금융사 실시간 비교" },
  { step: "03", title: "절약 확인", desc: "월 납입금·총 이자 차이" },
];

// ─── 공통 컴포넌트 ─────────────────────────────────────────
function CtaButton({ label, eventLabel, variant = "primary", className = "" }) {
  const base =
    "flex w-full items-center justify-center rounded-2xl py-4 text-base font-bold transition duration-150 hover:scale-[1.02] active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-sky-600 text-white shadow-lg shadow-sky-200 hover:bg-sky-500 hover:shadow-xl"
      : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md";

  return (
    <a
      href={`/out/loan?from=${eventLabel}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCtaClick(eventLabel)}
      className={`${base} ${styles} ${className}`}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        <span>🔥</span>
        <span>{label}</span>
        <span>🔥</span>
      </span>
    </a>
  );
}

// ─── 메인 페이지 ───────────────────────────────────────────
export default function LoanComparePage() {
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

        {/* ─── 1. HERO ─────────────────────────────────── */}
        <section className="mb-6 rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-xl lg:p-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
            <AlertCircle className="h-3.5 w-3.5 text-sky-400" />
            금리 비교 · 대환 절약 분석
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
            지금 대출 금리,<br />
            <span className="text-sky-400">그대로 두면 손해입니다</span>
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            같은 조건에서도 금리는 달라집니다.<br />
            비교만 해도 월 납입금과 총 이자를 줄일 수 있습니다.
          </p>

          {/* 강조 칩 */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-sky-800 bg-sky-900/50 px-4 py-3">
            <TrendingDown className="h-5 w-5 flex-shrink-0 text-sky-400" />
            <p className="text-sm font-bold text-sky-200">
              금리 1%p 차이 → <span className="text-white">수백만 원 차이</span>
            </p>
          </div>

          <div className="mt-6">
            <CtaButton label="내 조건 최저 금리 확인하기" eventLabel="loan_compare_top" />
          </div>
        </section>

        {/* ─── 2. 절약 시뮬레이션 ──────────────────────── */}
        <section className="mb-6">
          <div className="mb-4 text-center">
            <h2 className="text-lg font-bold text-slate-900">
              실제로 얼마나 차이 날까요?
            </h2>
            <p className="mt-1 text-sm text-slate-500">원리금균등상환 기준 예시</p>
          </div>

          <div className="space-y-4">
            {CASES.map((c) => {
              const before = calcTotalInterest(c.principal, c.fromRate, c.months);
              const after = calcTotalInterest(c.principal, c.toRate, c.months);
              const saving = before - after;

              return (
                <div
                  key={c.label}
                  className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {c.label}
                    </span>
                    <span className="text-xs text-slate-400">원리금균등상환</span>
                  </div>

                  {/* 금리 비교 */}
                  <div className="mb-4 flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-400">현재</p>
                      <p className="mt-1 text-2xl font-bold text-slate-700">{c.fromRate}%</p>
                      <p className="text-xs text-slate-400">{fmt(before)}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full bg-emerald-100 p-1.5">
                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600">
                        -{(c.fromRate - c.toRate).toFixed(1)}%p
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-400">비교</p>
                      <p className="mt-1 text-2xl font-bold text-sky-600">{c.toRate}%</p>
                      <p className="text-xs text-slate-400">{fmt(after)}</p>
                    </div>
                  </div>

                  {/* 절약액 강조 */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 py-4 text-center">
                    <p className="text-xs font-semibold text-emerald-700">절약 가능 금액</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-600">
                      약 {fmt(saving)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-700">
            금리 1%만 낮아져도 차이가 큽니다
          </p>
        </section>

        {/* ─── 3. 사용자 공감 ──────────────────────────── */}
        <section className="mb-6 rounded-[28px] border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-4 text-base font-bold text-slate-900">
            혹시 이런 상황 아니신가요?
          </h2>
          <ul className="space-y-3">
            {PAIN_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">
                  !
                </span>
                <span className="text-sm font-medium text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl bg-white p-4 text-center shadow-sm">
            <p className="text-sm font-bold text-slate-900">
              대부분은{" "}
              <span className="text-sky-600">비교만 해도</span>{" "}
              더 낮출 수 있습니다
            </p>
          </div>
        </section>

        {/* ─── 4. 신뢰 요소 ────────────────────────────── */}
        <section className="mb-6 grid grid-cols-3 gap-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.text}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              {item.icon}
              <p className="text-xs font-semibold leading-5 text-slate-700">{item.text}</p>
            </div>
          ))}
        </section>

        {/* ─── 5. CTA 중간 ─────────────────────────────── */}
        <section className="mb-6">
          <CtaButton label="지금 바로 금리 비교하기" eventLabel="loan_compare_mid" />
        </section>

        {/* ─── 6. 프로세스 ─────────────────────────────── */}
        <section className="mb-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">1분이면 확인 가능합니다</h2>
          </div>
          <p className="mb-5 text-sm text-slate-500">간단한 3단계로 끝납니다</p>

          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <div key={s.step} className="flex items-center gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {s.step}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── 7. 최종 CTA ─────────────────────────────── */}
        <section className="mb-8 rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-xl lg:p-8">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-semibold text-amber-400">지금 확인하지 않으면</p>
          </div>
          <h2 className="mb-2 text-xl font-bold leading-snug text-white lg:text-2xl">
            계속 더 내고 있을 수 있습니다
          </h2>
          <p className="mb-6 text-sm leading-6 text-slate-400">
            비교해보는 것만으로도 절약 여부를 확인할 수 있습니다.
          </p>
          <CtaButton
            label="내 조건으로 얼마나 줄일 수 있는지 보기"
            eventLabel="loan_compare_bottom"
            className="text-sm lg:text-base"
          />
        </section>

        {/* 면책 */}
        <p className="mb-12 text-center text-xs leading-6 text-slate-400">
          본 페이지는 참고용 예시이며, 실제 금리 및 조건은 금융기관 심사 기준에 따라 달라질 수 있습니다.
        </p>

      </div>
    </div>
  );
}
