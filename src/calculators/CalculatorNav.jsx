import { Link, useLocation } from "react-router-dom";
import { CALCULATOR_NAV } from "./registry";

export default function CalculatorNav() {
  const location = useLocation();

  return (
    <nav className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CALCULATOR_NAV.map((calc) => {
          // intro 페이지와 calculator 하위 페이지 모두 active 처리
          const active = location.pathname === calc.path || location.pathname.startsWith(calc.path + "/");
          const Icon = calc.icon;
          return (
            <Link
              key={calc.id}
              to={calc.path}
              className={`group flex shrink-0 flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 transition sm:items-center sm:text-center ${
                active
                  ? "border-emerald-500/40 bg-emerald-50 shadow-sm shadow-emerald-100"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${active ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-500"}`} />
                <span className={`text-[13px] font-bold ${active ? "text-emerald-700" : "text-slate-700"}`}>
                  {calc.name}
                </span>
              </span>
              <span className={`text-[11px] leading-tight ${active ? "text-emerald-600/70" : "text-slate-400"}`}>
                {calc.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
