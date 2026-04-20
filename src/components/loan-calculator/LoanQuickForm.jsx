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
    <section ref={inputRef} className="mb-8 rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
      <h2 className="mb-1 text-lg font-semibold text-[#0E2A3A]">기본 정보 입력</h2>
      <p className="mb-6 text-[14px] text-[#5E6E73]">3가지만 입력하면 바로 계산됩니다.</p>

      <div className="space-y-4">
        {/* 대출금액 */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">대출금액</label>
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
              className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 pr-12 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73]/50 focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#5E6E73]">원</span>
          </div>
        </div>

        {/* 금리 + 대출기간 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">금리 (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="예: 4.5"
              className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73]/50 focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">대출기간 (개월)</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="예: 360"
              className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73]/50 focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
            />
          </div>
        </div>

        {/* 우선 목표 */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">우선 목표</label>
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
                      ? "border-[#10353F] bg-[#10353F]/5"
                      : "border-[#E5E1DA] bg-white hover:border-[#E5E1DA]/80"
                  }`}
                >
                  <span className={`block text-sm font-semibold ${active ? "text-[#10353F]" : "text-[#0E2A3A]"}`}>
                    {option.label}
                  </span>
                  <span className="block text-xs text-[#5E6E73] mt-0.5">{option.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 고급 설정 토글 */}
        <button
          type="button"
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#5E6E73] hover:text-[#0E2A3A]"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
          {showAdvanced ? "고급 설정 닫기" : "고급 설정 (은행, 거치기간, 상환방식)"}
        </button>

        {/* ADVANCED OPTIONS */}
        {showAdvanced && (
          <div className="space-y-4 rounded-2xl border border-[#E5E1DA]/60 bg-[#F6F1EB]/50 p-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">은행 선택</label>
              <select
                value={bank}
                onChange={onBankChange}
                className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-sm font-medium text-[#0E2A3A] outline-none transition focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
              >
                {Object.keys(BANK_RATES).map((bankName) => (
                  <option key={bankName} value={bankName}>{bankName}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-[#5E6E73]">
                본 금리는 참고용이며, 실제 금리는 금융기관 심사에 따라 달라집니다.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">거치기간</label>
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#E5E1DA] bg-white p-1">
                <button
                  type="button"
                  onClick={() => { setHasGracePeriod("no"); setGraceMonths(""); }}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${hasGracePeriod === "no" ? "bg-[#10353F] text-white shadow-sm" : "text-[#5E6E73]"}`}
                >
                  없음
                </button>
                <button
                  type="button"
                  onClick={() => setHasGracePeriod("yes")}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${hasGracePeriod === "yes" ? "bg-[#10353F] text-white shadow-sm" : "text-[#5E6E73]"}`}
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
                    className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-sm font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73]/50 focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
                  />
                  <p className="mt-1.5 text-xs text-[#5E6E73]">거치기간 동안은 이자만 납부합니다.</p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">상환방식 직접 선택</label>
              <div className="grid grid-cols-3 gap-2">
                {REPAYMENT_OPTIONS.map((option) => {
                  const active = repaymentType === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRepaymentType(option.value)}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                        active ? "border-[#10353F] bg-[#10353F] text-white" : "border-[#E5E1DA] bg-white text-[#0E2A3A] hover:border-[#E5E1DA]/80"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {priority && (
                <p className="mt-1.5 text-xs text-[#D97852]">
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
            className="w-full rounded-xl bg-[#D97852] px-8 py-[18px] text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-[#C96543] hover:shadow-xl active:scale-[0.98]"
          >
            계산하기
          </button>
          {hasResult && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E5E1DA] bg-white px-4 py-2.5 text-sm font-semibold text-[#5E6E73] transition hover:bg-[#F6F1EB]/50"
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
