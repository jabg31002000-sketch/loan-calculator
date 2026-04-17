import { PURPOSE_OPTIONS } from "./constants";

export default function LoanPurposeSelector({ loanPurpose, onPurposeChange }) {
  return (
    <section className="mb-8">
      <p className="mb-3 text-sm font-semibold text-slate-700">어떤 용도의 대출인가요?</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {PURPOSE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = loanPurpose === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onPurposeChange(option.value)}
              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition ${
                active
                  ? "border-emerald-500 bg-emerald-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-emerald-600" : "text-slate-400"}`} />
              <span className={`text-xs font-semibold leading-tight ${active ? "text-emerald-700" : "text-slate-700"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
