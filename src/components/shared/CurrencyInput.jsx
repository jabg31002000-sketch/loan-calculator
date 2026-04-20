import { formatInputNumber } from "../loan-calculator/utils";

export default function CurrencyInput({ label, value, onChange, placeholder, suffix = "원", hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
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
          className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 pr-12 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#5E6E73]">
          {suffix}
        </span>
      </div>
      {hint && <p className="mt-1.5 text-xs text-[#5E6E73]">{hint}</p>}
    </div>
  );
}
