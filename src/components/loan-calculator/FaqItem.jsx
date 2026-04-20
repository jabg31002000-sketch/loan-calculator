import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer, onAnchorClick, hasCalculatorLink }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E5E1DA]/60 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#0E2A3A]">{question}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-[#5E6E73] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm leading-7 text-[#5E6E73]">{answer}</p>
          {hasCalculatorLink && onAnchorClick && (
            <button
              type="button"
              onClick={onAnchorClick}
              className="mt-2 text-sm font-semibold text-[#D97852] hover:text-[#C96543]"
            >
              직접 계산해보기 →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
