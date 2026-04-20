import { Link, useLocation } from "react-router-dom";
import { CALCULATOR_NAV } from "./registry";

export default function CalculatorNav() {
  const location = useLocation();

  return (
    <nav className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CALCULATOR_NAV.map((calc) => {
          const active = location.pathname === calc.path || location.pathname.startsWith(calc.path + "/");
          const Icon = calc.icon;
          return (
            <Link
              key={calc.id}
              to={calc.path}
              className={`group flex shrink-0 flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 transition-all duration-200 sm:items-center sm:text-center ${
                active
                  ? "border-[#10353F]/20 bg-[#10353F]/5 shadow-sm"
                  : "border-[#E5E1DA] bg-white shadow-sm hover:border-[#10353F]/15 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${active ? "text-[#10353F]" : "text-[#5E6E73] group-hover:text-[#10353F]"}`} />
                <span className={`text-[13px] font-bold ${active ? "text-[#10353F]" : "text-[#0E2A3A]"}`}>
                  {calc.name}
                </span>
              </span>
              <span className={`text-[11px] leading-tight ${active ? "text-[#10353F]/70" : "text-[#7A868B]"}`}>
                {calc.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
