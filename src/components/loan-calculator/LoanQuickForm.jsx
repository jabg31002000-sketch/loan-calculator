import { ChevronDown, RotateCcw } from "lucide-react";
import {
  BANK_RATES,
  REPAYMENT_OPTIONS,
  PRIORITY_OPTIONS,
} from "./constants";
import { formatInputNumber, getRepaymentLabel } from "./utils";

export default function LoanQuickForm({
  principal, setPrincipal,
  rate, setRate,
  months, setMonths,
  priority, setPriority,
  showAdvanced, setShowAdvanced,
  bank, onBankChange,
  hasGracePeriod, setHasGracePeriod,
  graceMonths, setGraceMonths,
  repaymentType, setRepaymentType,
  onCalculate, onReset,
  error, hasResult, inputRef,
}) {
  return (
    <section ref={inputRef} className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-1 text-base font-bold text-slate-900">기본 정보 입력</h2>
      <p className="mb-5 text-sm text-slate-500">3가지만 입력하면 바로 계산됩니다.</p>

      <div className="space-y-4">
        {/* 대출금액 */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">대출금액</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={principal}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                if (!/^\d*$/.test(raw)) return;
                setPrincipal(raw === "" ? "" : formatInputNumber(raw));
              }}
              placeholder="예: 100,000,000"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">원</span>
          </div>
        </div>

        {/* 금리 + 대출기간 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">금리 (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="예: 4.5"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">대출기간 (개월)</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="예: 360"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* 우선 목표 */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">우선 목표</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PRIORITY_OPTIONS.map((option) => {
              const active = priority === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    active
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className={`block text-sm font-semibold ${active ? "text-emerald-700" : "text-slate-800"}`}>
                    {option.label}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">{option.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 고급 설정 토글 */}
        <button
          type="button"
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
          {showAdvanced ? "고급 설정 닫기" : "고급 설정 (은행, 거치기간, 상환방식)"}
        </button>

        {/* ADVANCED OPTIONS */}
        {showAdvanced && (
          <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">은행 선택</label>
              <select
                value={bank}
                onChange={onBankChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                {Object.keys(BANK_RATES).map((bankName) => (
                  <option key={bankName} value={bankName}>{bankName}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-400">
                본 금리는 참고용이며, 실제 금리는 금융기관 심사에 따라 달라집니다.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">거치기간</label>
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => { setHasGracePeriod("no"); setGraceMonths(""); }}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${hasGracePeriod === "no" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"}`}
                >
                  없음
                </button>
                <button
                  type="button"
                  onClick={() => setHasGracePeriod("yes")}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${hasGracePeriod === "yes" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"}`}
                >
                  있음
                </button>
              </div>
              {hasGracePeriod === "yes" && (
                <div className="mt-2">
                  <input
                    type="number"
                    value={graceMonths}
                    onChange={(e) => setGraceMonths(e.target.value)}
                    placeholder="거치기간(개월)"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">거치기간 동안은 이자만 납부합니다.</p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">상환방식 직접 선택</label>
              <div className="grid grid-cols-3 gap-2">
                {REPAYMENT_OPTIONS.map((option) => {
                  const active = repaymentType === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRepaymentType(option.value)}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                        active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {priority && (
                <p className="mt-1.5 text-xs text-emerald-600">
                  &ldquo;{PRIORITY_OPTIONS.find((o) => o.value === priority)?.label}&rdquo; 목표 기준 {getRepaymentLabel(PRIORITY_OPTIONS.find((o) => o.value === priority)?.repayment ?? "equal_payment")}을 추천합니다.
                </p>
              )}
            </div>
          </div>
        )}

        {/* 계산하기 + 초기화 */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={onCalculate}
            className="w-full rounded-xl bg-emerald-600 px-4 py-4 text-base font-bold text-white shadow-md transition duration-150 hover:bg-emerald-500 hover:shadow-lg active:scale-[0.98]"
          >
            계산하기
          </button>
          {hasResult && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              초기화
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
