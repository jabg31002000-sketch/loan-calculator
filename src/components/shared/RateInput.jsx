import { BANK_RATES } from "../loan-calculator/constants";

export default function RateInput({ label, value, onChange, placeholder, bankPreset, bank, onBankChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type="number"
        step="0.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
      {bankPreset && (
        <div className="mt-2">
          <select
            value={bank ?? "직접입력"}
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
      )}
    </div>
  );
}
