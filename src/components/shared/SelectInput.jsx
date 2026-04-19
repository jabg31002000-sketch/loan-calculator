export default function SelectInput({ label, value, onChange, options, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
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
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-xs text-emerald-600">{hint}</p>}
    </div>
  );
}
