export default function MonthsInput({ label, value, onChange, placeholder, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-base font-medium text-[#0E2A3A] outline-none transition placeholder:text-[#5E6E73] focus:border-[#10353F] focus:ring-2 focus:ring-[#10353F]/10"
      />
      {hint && <p className="mt-1.5 text-xs text-[#5E6E73]">{hint}</p>}
    </div>
  );
}
