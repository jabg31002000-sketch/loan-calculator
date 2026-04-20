export default function RadioInput({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">{label}</label>
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
                  ? "border-[#10353F] bg-[#10353F]/5"
                  : "border-[#E5E1DA] bg-white hover:border-[#10353F]/30"
              }`}
            >
              <span className={`block text-sm font-semibold ${active ? "text-[#10353F]" : "text-[#0E2A3A]"}`}>
                {option.label}
              </span>
              {option.description && (
                <span className="block text-xs text-[#5E6E73] mt-0.5">{option.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
