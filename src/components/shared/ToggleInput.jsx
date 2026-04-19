export default function ToggleInput({ label, value, onChange, options }) {
  const toggleOptions = options ?? [
    { value: "no", label: "없음" },
    { value: "yes", label: "있음" },
  ];

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-1">
        {toggleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              value === option.value
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
