export default function SelectInput({ label, value, onChange, options, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 3)}, 1fr)` }}>
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                active
                  ? "border-[#10353F] bg-[#10353F] text-white"
                  : "border-[#E5E1DA] bg-white text-[#0E2A3A] hover:border-[#10353F]/30"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-xs text-[#D97852]">{hint}</p>}
    </div>
  );
}
