import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionSection({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-[#E5E1DA] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-[#F6F1EB]/50"
      >
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-[#5E6E73]">{icon}</span>}
          <span className="text-sm font-bold text-[#0E2A3A]">{title}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-[#5E6E73] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-[#E5E1DA]/60 px-5 py-5">{children}</div>}
    </div>
  );
}
