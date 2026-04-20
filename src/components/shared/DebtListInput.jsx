import { Plus, Trash2 } from "lucide-react";
import { formatInputNumber } from "../loan-calculator/utils";

const EMPTY_DEBT = { name: "", balance: "", rate: "", monthlyPayment: "" };

export default function DebtListInput({ label, value, onChange, hint }) {
  const debts = Array.isArray(value) && value.length > 0 ? value : [{ ...EMPTY_DEBT }];

  const updateDebt = (index, key, val) => {
    const next = debts.map((d, i) => (i === index ? { ...d, [key]: val } : d));
    onChange(next);
  };

  const addDebt = () => {
    if (debts.length >= 5) return;
    onChange([...debts, { ...EMPTY_DEBT }]);
  };

  const removeDebt = (index) => {
    if (debts.length <= 1) return;
    onChange(debts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
      <div className="space-y-3">
        {debts.map((debt, index) => (
          <div key={index} className="rounded-xl border border-[#E5E1DA] bg-[#F6F1EB]/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5E6E73]">대출 {index + 1}</span>
              {debts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDebt(index)}
                  className="rounded-lg p-1 text-[#5E6E73] transition hover:bg-[#E5E1DA] hover:text-[#0E2A3A]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(index, "name", e.target.value)}
                placeholder="대출명 (예: 신용대출)"
                className="col-span-2 rounded-lg border border-[#E5E1DA] bg-white px-3 py-2 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
              />
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={debt.balance}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    if (!/^\d*$/.test(raw)) return;
                    updateDebt(index, "balance", raw === "" ? "" : formatInputNumber(raw));
                  }}
                  placeholder="잔액"
                  className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2 pr-8 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#5E6E73]">원</span>
              </div>
              <input
                type="number"
                step="0.1"
                value={debt.rate}
                onChange={(e) => updateDebt(index, "rate", e.target.value)}
                placeholder="금리 (%)"
                className="rounded-lg border border-[#E5E1DA] bg-white px-3 py-2 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
              />
              <div className="relative col-span-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={debt.monthlyPayment}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    if (!/^\d*$/.test(raw)) return;
                    updateDebt(index, "monthlyPayment", raw === "" ? "" : formatInputNumber(raw));
                  }}
                  placeholder="월 상환액"
                  className="w-full rounded-lg border border-[#E5E1DA] bg-white px-3 py-2 pr-8 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#5E6E73]">원</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {debts.length < 5 && (
        <button
          type="button"
          onClick={addDebt}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#D97852] hover:text-[#C96543]"
        >
          <Plus className="h-3.5 w-3.5" />
          대출 추가
        </button>
      )}
      {hint && <p className="mt-1.5 text-xs text-[#5E6E73]">{hint}</p>}
    </div>
  );
}
