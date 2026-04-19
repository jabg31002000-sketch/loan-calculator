import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calculator, RefreshCw, Home, PieChart, Building2, Car, ChevronDown, BookOpen, ArrowRight } from "lucide-react";

const CALC_ITEMS = [
  { title: "신용대출 계산기", desc: "월 상환금과 총 이자를 바로 확인", path: "/credit-loan", icon: Calculator, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "대환/갈아타기 계산기", desc: "금리 낮추면 얼마나 절약되는지 확인", path: "/refinance-loan", icon: RefreshCw, color: "text-sky-600", bg: "bg-sky-50" },
  { title: "전세 vs 월세 비교", desc: "어떤 선택이 더 유리한지 비교", path: "/jeonse-vs-rent", icon: Home, color: "text-violet-600", bg: "bg-violet-50" },
  { title: "DSR / 대출한도 계산기", desc: "내 소득 기준 대출 가능 금액 확인", path: "/dsr", icon: PieChart, color: "text-amber-600", bg: "bg-amber-50" },
  { title: "주택담보대출 계산기", desc: "내 집 마련 가능 범위 확인", path: "/mortgage", icon: Building2, color: "text-rose-600", bg: "bg-rose-50" },
  { title: "자동차 할부 계산기", desc: "월 할부금과 총 비용 확인", path: "/auto-loan", icon: Car, color: "text-indigo-600", bg: "bg-indigo-50" },
];

const GUIDE_ITEMS = [
  { title: "DSR이란?", desc: "대출 한도를 결정하는 핵심 기준", path: "/dsr" },
  { title: "상환방식 비교", desc: "원리금균등 vs 원금균등 vs 만기일시", path: "/credit-loan" },
  { title: "전세와 월세 차이", desc: "기회비용까지 반영한 비교 기준", path: "/jeonse-vs-rent" },
  { title: "대환이 유리한 경우", desc: "갈아타기 타이밍과 절약 조건 정리", path: "/refinance-loan" },
  { title: "대출 초보 가이드", desc: "처음 대출받을 때 꼭 알아야 할 것들", path: "/credit-loan" },
];

/* ── 계산기 드롭다운 ── */
function CalcDropdown({ onNavigate }) {
  return (
    <div className="absolute left-0 top-full z-50 pt-2">
      <div className="w-[340px] rounded-2xl border border-slate-200/80 bg-white py-2 shadow-xl shadow-slate-200/50">
        {CALC_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={() => onNavigate(item.path)}
              className={`group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
                i < CALC_ITEMS.length - 1 ? "border-b border-slate-100/60" : ""
              }`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                  {item.title}
                </span>
                <span className="block text-xs leading-snug text-slate-400 group-hover:text-slate-500">
                  {item.desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── 가이드 드롭다운 ── */
function GuideDropdown({ onNavigate }) {
  return (
    <div className="absolute left-0 top-full z-50 pt-2">
      <div className="w-[300px] rounded-2xl border border-slate-200/80 bg-white py-2 shadow-xl shadow-slate-200/50">
        {GUIDE_ITEMS.map((item, i) => (
          <button
            key={item.title}
            onClick={() => onNavigate(item.path)}
            className={`group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
              i < GUIDE_ITEMS.length - 1 ? "border-b border-slate-100/60" : ""
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-slate-200/70">
              <BookOpen className="h-4 w-4 text-slate-500" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                {item.title}
              </span>
              <span className="block text-xs leading-snug text-slate-400 group-hover:text-slate-500">
                {item.desc}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 모바일 메뉴 ── */
function MobileMenu({ onNavigate, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-[85%] max-w-sm animate-[slideInRight_0.25s_ease-out] overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <span className="text-base font-bold text-slate-800">메뉴</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-xs font-medium tracking-wide text-slate-400">계산기</p>
          <div className="flex flex-col gap-1">
            {CALC_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => { onNavigate(item.path); onClose(); }}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-700">{item.title}</span>
                    <span className="block text-xs text-slate-400">{item.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-xs font-medium tracking-wide text-slate-400">가이드</p>
          <div className="flex flex-col gap-1">
            {GUIDE_ITEMS.map((item) => (
              <button
                key={item.title}
                onClick={() => { onNavigate(item.path); onClose(); }}
                className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <BookOpen className="h-4 w-4 text-slate-500" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-700">{item.title}</span>
                  <span className="block text-xs text-slate-400">{item.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 px-5 pb-8 pt-4">
          <button
            onClick={() => { onNavigate("/compare"); onClose(); }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
          >
            지금 금리 확인하기
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 헤더 메인 ── */
export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleOpen = (menu) => {
    clearTimeout(timeoutRef.current);
    setOpen(menu);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setOpen(null), 150);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleNavigate = (path) => {
    setOpen(null);
    navigate(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-lg h-[48px] md:h-[56px]">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">

          {/* 로고 */}
          <Link to="/" className="select-none">
            <h1 className="text-[18px] md:text-[22px] font-semibold tracking-[-0.02em] text-slate-900">
              LoanClock
            </h1>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden items-center gap-1 md:flex">
            <div
              className="relative"
              onMouseEnter={() => handleOpen("calc")}
              onMouseLeave={handleClose}
            >
              <button className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                open === "calc" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}>
                계산기
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === "calc" ? "rotate-180" : ""}`} />
              </button>
              {open === "calc" && <CalcDropdown onNavigate={handleNavigate} />}
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleOpen("guide")}
              onMouseLeave={handleClose}
            >
              <button className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                open === "guide" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}>
                가이드
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === "guide" ? "rotate-180" : ""}`} />
              </button>
              {open === "guide" && <GuideDropdown onNavigate={handleNavigate} />}
            </div>
          </nav>

          {/* 우측: CTA + 모바일 햄버거 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/compare")}
              className="hidden rounded-lg bg-emerald-600 px-3 py-1.5 text-[13px] font-medium text-white transition hover:bg-emerald-500 active:translate-y-0 sm:block"
            >
              금리 확인
            </button>

            {/* 모바일 햄버거 */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 md:hidden"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 슬라이드 메뉴 */}
      {mobileOpen && (
        <MobileMenu
          onNavigate={handleNavigate}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
