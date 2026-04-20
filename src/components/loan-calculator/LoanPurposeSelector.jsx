import { PURPOSE_OPTIONS } from "./constants";

export default function LoanPurposeSelector({ loanPurpose, onPurposeChange }) {
  return (
    <section className="mb-8">
      <p className="mb-3 text-sm font-semibold text-[#0E2A3A]">어떤 용도의 대출인가요?</p>
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
                  ? "border-[#10353F] bg-[#10353F]/5 shadow-sm"
                  : "border-[#E5E1DA] bg-white hover:border-[#E5E1DA]/80 hover:bg-[#F6F1EB]/50"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-[#10353F]" : "text-[#5E6E73]"}`} />
              <span className={`text-xs font-semibold leading-tight ${active ? "text-[#10353F]" : "text-[#0E2A3A]"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
