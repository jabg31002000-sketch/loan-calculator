import { formatInputNumber } from "../loan-calculator/utils";

export default function CurrencyInput({ label, value, onChange, placeholder, suffix = "원", hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
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
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
          {suffix}
        </span>
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
