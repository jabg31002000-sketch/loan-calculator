import { Plus, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { formatInputNumber, calculateLoan, formatNumber } from "../loan-calculator/utils";

const LOAN_TYPES = [
  { value: "credit", label: "신용대출", defaultMode: "detailed" },
  { value: "mortgage", label: "주택담보대출", defaultMode: "detailed" },
  { value: "jeonse", label: "전세대출", defaultMode: "detailed", defaultRepayment: "bullet" },
  { value: "auto", label: "자동차 할부", defaultMode: "simple" },
  { value: "cardloan", label: "카드론/현금서비스", defaultMode: "simple" },
  { value: "revolving", label: "마이너스통장", defaultMode: "revolving" },
  { value: "other", label: "기타 대출", defaultMode: "simple" },
];

const REPAYMENT_OPTIONS = [
  { value: "equal_payment", label: "원리금균등" },
  { value: "equal_principal", label: "원금균등" },
  { value: "bullet", label: "만기일시" },
];

function getDefaultDebt() {
  return {
    loanType: "credit",
    inputMode: "detailed",
    // simple fields
    monthlyPayment: "",
    remainingMonths: "",
    // detailed fields
    balance: "",
    rate: "",
    months: "",
    repaymentType: "equal_payment",
    // revolving fields
    usedAmount: "",
    revolvingRate: "",
  };
}

function computeAnnualPayment(debt) {
  const mode = debt.inputMode;

  if (mode === "simple") {
    const mp = Number(String(debt.monthlyPayment).replace(/,/g, ""));
    if (!mp || mp <= 0) return 0;
    return mp * 12;
  }

  if (mode === "revolving") {
    const used = Number(String(debt.usedAmount).replace(/,/g, ""));
    const rate = Number(debt.revolvingRate);
    if (!used || used <= 0 || !rate || rate <= 0) return 0;
    return used * (rate / 100);
  }

  // detailed
  const bal = Number(String(debt.balance).replace(/,/g, ""));
  const rate = Number(debt.rate);
  const months = Number(debt.months);
  if (!bal || bal <= 0 || !months || months <= 0) return 0;

  const result = calculateLoan({
    principal: bal,
    annualRate: rate || 0,
    months,
    graceMonths: 0,
    repaymentType: debt.repaymentType || "equal_payment",
  });
  if (!result) return 0;
  return result.monthlyPayment * 12;
}

function CurrencyField({ value, onChange, placeholder, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const raw = e.target.value.replace(/,/g, "");
          if (!/^\d*$/.test(raw)) return;
          onChange(raw === "" ? "" : formatInputNumber(raw));
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2.5 pr-8 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
      />
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5E6E73]">원</span>
    </div>
  );
}

function ModeToggle({ mode, onModeChange, loanType }) {
  if (loanType === "revolving") return null;
  return (
    <div className="flex gap-1 rounded-lg bg-[#E5E1DA]/50 p-0.5">
      <button
        type="button"
        onClick={() => onModeChange("simple")}
        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
          mode === "simple"
            ? "bg-white text-[#0E2A3A] shadow-sm"
            : "text-[#5E6E73] hover:text-[#0E2A3A]"
        }`}
      >
        간편 입력
      </button>
      <button
        type="button"
        onClick={() => onModeChange("detailed")}
        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
          mode === "detailed"
            ? "bg-white text-[#0E2A3A] shadow-sm"
            : "text-[#5E6E73] hover:text-[#0E2A3A]"
        }`}
      >
        상세 입력
      </button>
    </div>
  );
}

function SimpleFields({ debt, onUpdate }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">월 상환액</label>
        <CurrencyField
          value={debt.monthlyPayment}
          onChange={(v) => onUpdate("monthlyPayment", v)}
          placeholder="예: 500,000"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">남은 개월 수</label>
        <div className="relative">
          <input
            type="number"
            min="1"
            value={debt.remainingMonths}
            onChange={(e) => onUpdate("remainingMonths", e.target.value)}
            placeholder="예: 36"
            className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2.5 pr-10 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5E6E73]">개월</span>
        </div>
      </div>
    </div>
  );
}

function DetailedFields({ debt, onUpdate }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">남은 대출원금(잔액)</label>
        <CurrencyField
          value={debt.balance}
          onChange={(v) => onUpdate("balance", v)}
          placeholder="예: 50,000,000"
        />
        <p className="mt-1 text-[11px] text-[#5E6E73]">처음 빌린 금액이 아니라, 현재 아직 갚지 않고 남아 있는 대출 원금을 입력하세요.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-[#5E6E73]">금리 (연 %)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={debt.rate}
            onChange={(e) => onUpdate("rate", e.target.value)}
            placeholder="예: 4.5"
            className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2.5 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#5E6E73]">남은 기간</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={debt.months}
              onChange={(e) => onUpdate("months", e.target.value)}
              placeholder="예: 360"
              className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2.5 pr-10 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5E6E73]">개월</span>
          </div>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">상환방식</label>
        <div className="relative">
          <select
            value={debt.repaymentType}
            onChange={(e) => onUpdate("repaymentType", e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#E5E1DA] bg-white px-3 py-2.5 pr-8 text-sm text-[#0E2A3A] outline-none focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
          >
            {REPAYMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5E6E73]" />
        </div>
      </div>
    </div>
  );
}

function RevolvingFields({ debt, onUpdate }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">현재 사용 중인 금액</label>
        <CurrencyField
          value={debt.usedAmount}
          onChange={(v) => onUpdate("usedAmount", v)}
          placeholder="예: 10,000,000"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">금리 (연 %)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={debt.revolvingRate}
          onChange={(e) => onUpdate("revolvingRate", e.target.value)}
          placeholder="예: 5.0"
          className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2.5 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
        />
      </div>
      <p className="text-[11px] leading-relaxed text-[#5E6E73]">마이너스통장과 일부 대출의 DSR 반영 방식은 금융사 심사 기준에 따라 달라질 수 있습니다. 본 계산은 참고용입니다.</p>
    </div>
  );
}

function DebtCard({ debt, index, total, onUpdate, onRemove }) {
  const typeInfo = LOAN_TYPES.find((t) => t.value === debt.loanType) || LOAN_TYPES[0];
  const annual = computeAnnualPayment(debt);
  const monthly = annual / 12;

  function handleTypeChange(newType) {
    const info = LOAN_TYPES.find((t) => t.value === newType) || LOAN_TYPES[0];
    const mode = info.defaultMode;
    const repayment = info.defaultRepayment || "equal_payment";
    onUpdate(index, {
      ...getDefaultDebt(),
      loanType: newType,
      inputMode: mode,
      repaymentType: repayment,
    });
  }

  function handleModeChange(newMode) {
    onUpdate(index, { ...debt, inputMode: newMode });
  }

  function handleFieldUpdate(key, val) {
    onUpdate(index, { ...debt, [key]: val });
  }

  return (
    <div className="rounded-2xl border border-[#E5E1DA] bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold text-[#10353F]">기존 대출 {index + 1}</span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="rounded-lg p-1.5 text-[#5E6E73] transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Loan type select */}
      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-[#5E6E73]">대출 종류</label>
        <div className="relative">
          <select
            value={debt.loanType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#E5E1DA] bg-[#F6F1EB]/50 px-3 py-2.5 pr-8 text-sm font-medium text-[#0E2A3A] outline-none focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
          >
            {LOAN_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5E6E73]" />
        </div>
      </div>

      {/* Mode toggle */}
      {typeInfo.defaultMode !== "revolving" && (
        <div className="mb-3">
          <ModeToggle mode={debt.inputMode} onModeChange={handleModeChange} loanType={debt.loanType} />
        </div>
      )}

      {/* Fields */}
      {debt.inputMode === "simple" && <SimpleFields debt={debt} onUpdate={handleFieldUpdate} />}
      {debt.inputMode === "detailed" && <DetailedFields debt={debt} onUpdate={handleFieldUpdate} />}
      {debt.inputMode === "revolving" && <RevolvingFields debt={debt} onUpdate={handleFieldUpdate} />}

      {/* Annual payment preview */}
      {annual > 0 && (
        <div className="mt-3 rounded-lg bg-[#10353F]/5 px-3 py-2">
          <p className="text-xs text-[#5E6E73]">
            DSR 반영 연간 상환액: <span className="font-bold text-[#10353F]">약 {formatNumber(Math.round(annual))}원</span>
            <span className="ml-1.5 text-[#5E6E73]">(월 약 {formatNumber(Math.round(monthly))}원)</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function DsrDebtListInput({ label, value, onChange, hint }) {
  const debts = Array.isArray(value) ? value : [];

  function handleUpdate(index, newDebt) {
    const next = debts.map((d, i) => (i === index ? newDebt : d));
    onChange(next);
  }

  function handleRemove(index) {
    const next = debts.filter((_, i) => i !== index);
    onChange(next);
  }

  function handleAdd() {
    if (debts.length >= 10) return;
    onChange([...debts, getDefaultDebt()]);
  }

  // Total annual
  const totalAnnual = debts.reduce((sum, d) => sum + computeAnnualPayment(d), 0);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#0E2A3A]">{label}</label>

      {hint && <p className="mb-3 text-xs text-[#5E6E73]">{hint}</p>}

      {debts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E5E1DA] bg-[#F6F1EB]/30 px-4 py-6 text-center">
          <p className="mb-3 text-sm text-[#5E6E73]">등록된 기존 대출이 없습니다.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#D97852] shadow-sm border border-[#E5E1DA] hover:bg-[#F6F1EB] transition"
          >
            <Plus className="h-3.5 w-3.5" />
            기존 대출 추가
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {debts.map((debt, index) => (
              <DebtCard
                key={index}
                debt={debt}
                index={index}
                total={debts.length}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            {debts.length < 10 && (
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#D97852] hover:text-[#C96543]"
              >
                <Plus className="h-3.5 w-3.5" />
                대출 추가
              </button>
            )}
            {totalAnnual > 0 && (
              <p className="text-xs font-medium text-[#5E6E73]">
                총 연간 상환액: <span className="font-bold text-[#0E2A3A]">약 {formatNumber(Math.round(totalAnnual))}원</span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export { computeAnnualPayment, getDefaultDebt };
