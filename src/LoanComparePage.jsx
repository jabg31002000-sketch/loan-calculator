import { Link } from "react-router-dom";
import { CheckCircle2, TrendingDown, ShieldCheck, Calculator, ChevronRight } from "lucide-react";

// PMT 기반 총 이자 계산
function calcTotalInterest(principal, annualRate, months) {
  const r = annualRate / 100 / 12;
  if (r === 0) return 0;
  const pmt = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(pmt * months - principal);
}

function formatCurrency(value) {
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}억원`;
  if (value >= 10000) return `${Math.round(value / 10000)}만원`;
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

const EXAMPLES = [
  { principal: 30_000_000, fromRate: 5.2, toRate: 4.2, months: 36, label: "3,000만원 · 36개월" },
  { principal: 50_000_000, fromRate: 4.8, toRate: 3.9, months: 60, label: "5,000만원 · 60개월" },
  { principal: 100_000_000, fromRate: 5.0, toRate: 4.0, months: 120, label: "1억원 · 120개월" },
];

const TRUST_BADGES = [
  { icon: <ShieldCheck className="h-5 w-5 text-sky-600" />, text: "여러 금융사 조건 비교" },
  { icon: <TrendingDown className="h-5 w-5 text-emerald-600" />, text: "예상 절약 금액 확인" },
  { icon: <Calculator className="h-5 w-5 text-slate-600" />, text: "내 조건 기준 맞춤 계산" },
];

export default function LoanComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:py-14">

        {/* 뒤로가기 */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          계산기로 돌아가기
        </Link>

        {/* 헤드라인 */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-700">
            <TrendingDown className="h-3.5 w-3.5" />
            금리 비교 · 대환 절약 계산
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            내 조건 기준<br />
            <span className="text-sky-600">최저 금리 비교</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-500">
            금리 1%p만 낮아져도 수백만 원 절약됩니다.<br />
            대환 시 절약 가능 금액을 지금 확인해보세요.
          </p>
        </div>

        {/* 신뢰 배지 */}
        <div className="mb-10 grid grid-cols-3 gap-3">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.text}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              {badge.icon}
              <p className="text-xs font-semibold leading-5 text-slate-700">{badge.text}</p>
            </div>
          ))}
        </div>

        {/* CTA — 상단 (스크롤 전 즉시 노출) */}
        <div className="mb-10 flex flex-col gap-3">
          <a
            href="#"
            className="flex items-center justify-center rounded-2xl bg-sky-600 py-4 text-base font-bold text-white shadow-lg shadow-sky-200 transition duration-150 hover:scale-[1.02] hover:bg-sky-500 hover:shadow-xl active:scale-[0.98]"
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span>🔥</span>
              <span>지금 최저 금리 비교하기</span>
              <span>🔥</span>
            </span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-4 text-sm font-semibold text-slate-700 shadow-sm transition duration-150 hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span>📉</span>
              <span>대환 시 절약 금액 확인하기</span>
              <span>📉</span>
            </span>
          </a>
        </div>

        {/* 절약 예시 카드 */}
        <div className="mb-10">
          <h2 className="mb-4 text-center text-lg font-bold text-slate-900">
            실제로 얼마나 절약될까요?
          </h2>
          <p className="mb-6 text-center text-sm text-slate-500">
            원리금균등상환 기준 예시입니다.
          </p>
          <div className="space-y-4">
            {EXAMPLES.map((ex) => {
              const interestBefore = calcTotalInterest(ex.principal, ex.fromRate, ex.months);
              const interestAfter = calcTotalInterest(ex.principal, ex.toRate, ex.months);
              const saving = interestBefore - interestAfter;

              return (
                <div
                  key={ex.label}
                  className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {ex.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      원리금균등상환
                    </span>
                  </div>

                  {/* 금리 비교 */}
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-400">현재 금리</p>
                      <p className="mt-1 text-2xl font-bold text-slate-900">{ex.fromRate}%</p>
                      <p className="text-xs text-slate-400">총 이자 {formatCurrency(interestBefore)}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <TrendingDown className="h-5 w-5 text-emerald-500" />
                      <span className="text-[10px] font-semibold text-emerald-600">
                        -{(ex.fromRate - ex.toRate).toFixed(1)}%p
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-400">비교 금리</p>
                      <p className="mt-1 text-2xl font-bold text-sky-600">{ex.toRate}%</p>
                      <p className="text-xs text-slate-400">총 이자 {formatCurrency(interestAfter)}</p>
                    </div>
                  </div>

                  {/* 절약액 강조 */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="text-xs font-semibold text-emerald-700">절약 가능 금액</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-600">
                      약 {formatCurrency(saving)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA — 하단 (예시 카드 직후) */}
        <div className="mb-8 rounded-[28px] border border-slate-800 bg-slate-900 p-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            내 조건으로 직접 확인해보세요
          </p>
          <h3 className="mb-5 text-xl font-bold text-white">
            지금 내 금리보다 낮은 조건이 있을 수 있어요
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center justify-center rounded-2xl bg-sky-500 py-4 text-sm font-bold text-white shadow-lg shadow-sky-900/40 transition duration-150 hover:scale-[1.02] hover:bg-sky-400 hover:shadow-xl active:scale-[0.98]"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span>🔥</span>
                <span>지금 최저 금리 비교하기</span>
                <span>🔥</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center rounded-2xl border border-slate-600 bg-white/5 py-4 text-sm font-semibold text-slate-200 transition duration-150 hover:border-slate-400 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span>📉</span>
                <span>대환 시 절약 금액 확인하기</span>
                <span>📉</span>
              </span>
            </a>
          </div>
        </div>

        {/* 면책 고지 */}
        <p className="text-center text-xs leading-6 text-slate-400">
          본 페이지는 참고용 예시이며, 실제 대출 금리 및 조건은 금융기관 심사 기준에
          따라 달라질 수 있습니다.
        </p>

      </div>
    </div>
  );
}
