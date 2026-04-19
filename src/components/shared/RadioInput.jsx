export default function RadioInput({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                active
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span className={`block text-sm font-semibold ${active ? "text-emerald-700" : "text-slate-800"}`}>
                {option.label}
              </span>
              {option.description && (
                <span className="block text-xs text-slate-500 mt-0.5">{option.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
