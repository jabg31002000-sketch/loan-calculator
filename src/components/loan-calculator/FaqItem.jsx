import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer, onAnchorClick, hasCalculatorLink }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{question}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm leading-7 text-slate-600">{answer}</p>
          {hasCalculatorLink && onAnchorClick && (
            <button
              type="button"
              onClick={onAnchorClick}
              className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              직접 계산해보기 →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
