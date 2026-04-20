export default function NumberInput({ label, value, onChange, placeholder, suffix, hint, step }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
      <div className="relative">
        <input
          type="number"
          step={step ?? "any"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10 ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#5E6E73]">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-[#5E6E73]">{hint}</p>}
    </div>
  );
}
