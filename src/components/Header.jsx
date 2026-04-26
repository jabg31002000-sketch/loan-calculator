import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, BookOpen, ArrowRight, MessageSquare } from "lucide-react";
import { CALCULATOR_NAV } from "../calculators/registry";

const GUIDE_ITEMS = [
  { title: "대출 이자 계산 방법", desc: "상환 방식별 이자 차이와 비교 기준", path: "/guides/loan-interest-calculation" },
  { title: "대출 갈아타기", desc: "갈아타기 타이밍과 절약 조건 정리", path: "/guides/refinance-timing" },
  { title: "신용점수 가이드", desc: "신용점수가 금리와 한도에 미치는 영향", path: "/guides/credit-score-guide" },
  { title: "DSR이란?", desc: "대출 한도를 결정하는 핵심 기준", path: "/dsr" },
  { title: "상환방식 비교", desc: "원리금균등 vs 원금균등 vs 만기일시", path: "/credit-loan" },
  { title: "전세와 월세 차이", desc: "기회비용까지 반영한 비교 기준", path: "/jeonse-vs-rent" },
];

/* ── 계산기 드롭다운 ── */
function CalcDropdown({ onNavigate }) {
  return (
    <div className="absolute left-0 top-full z-50 pt-2">
      <div className="w-[560px] rounded-2xl border border-[#E5E1DA] bg-white p-3 shadow-xl shadow-[#10353F]/5">
        <div className="grid grid-cols-2 gap-1">
          {CALCULATOR_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#F6F1EB]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8">
                  <Icon className="h-4 w-4 text-[#10353F]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-[#0E2A3A] group-hover:text-[#10353F]">
                    {item.name}
                  </span>
                  <span className="block text-[11px] leading-snug text-[#5E6E73]">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 가이드 드롭다운 ── */
function GuideDropdown({ onNavigate }) {
  return (
    <div className="absolute left-0 top-full z-50 pt-2">
      <div className="w-[300px] rounded-2xl border border-[#E5E1DA] bg-white py-2 shadow-xl shadow-[#10353F]/5">
        {GUIDE_ITEMS.map((item, i) => (
          <button
            key={item.title}
            onClick={() => onNavigate(item.path)}
            className={`group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F6F1EB] ${
              i < GUIDE_ITEMS.length - 1 ? "border-b border-[#E5E1DA]/40" : ""
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8">
              <BookOpen className="h-4 w-4 text-[#10353F]" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-[#0E2A3A] group-hover:text-[#10353F]">
                {item.title}
              </span>
              <span className="block text-xs leading-snug text-[#5E6E73]">
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
        <div className="flex items-center justify-between border-b border-[#E5E1DA] px-5 py-4">
          <span className="text-base font-bold text-[#0E2A3A]">메뉴</span>
          <button onClick={onClose} className="text-[#5E6E73] hover:text-[#0E2A3A]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-xs font-medium tracking-wide text-[#5E6E73]">계산기</p>
          <div className="flex flex-col gap-1">
            {CALCULATOR_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.path); onClose(); }}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F6F1EB]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8">
                    <Icon className="h-4 w-4 text-[#10353F]" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#0E2A3A]">{item.name}</span>
                    <span className="block text-xs text-[#5E6E73]">{item.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="mb-3 text-xs font-medium tracking-wide text-[#5E6E73]">가이드</p>
          <div className="flex flex-col gap-1">
            {GUIDE_ITEMS.map((item) => (
              <button
                key={item.title}
                onClick={() => { onNavigate(item.path); onClose(); }}
                className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F6F1EB]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8">
                  <BookOpen className="h-4 w-4 text-[#10353F]" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#0E2A3A]">{item.title}</span>
                  <span className="block text-xs text-[#5E6E73]">{item.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E5E1DA] px-5 pb-8 pt-4 space-y-3">
          <button
            onClick={() => { onNavigate("/feedback"); onClose(); }}
            className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F6F1EB]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8">
              <MessageSquare className="h-4 w-4 text-[#10353F]" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#0E2A3A]">문의/기능요청</span>
              <span className="block text-xs text-[#5E6E73]">오류 신고, 기능 제안, 제휴 문의</span>
            </span>
          </button>
          <button
            onClick={() => { onNavigate("/compare"); onClose(); }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97852] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#C96543]"
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
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null);

  const isHome = location.pathname === "/";

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

  /* scroll detection for HomePage transparent → solid transition */
  useEffect(() => {
    if (!isHome) { setScrolled(false); return; }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleNavigate = (path) => {
    setOpen(null);
    navigate(path);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full h-[52px] md:h-[60px] transition-colors duration-300 ${
        isHome
          ? scrolled
            ? "bg-[#10353F]/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
          : "border-b border-[#E5E1DA]/60 bg-[#F6F1EB]/80 backdrop-blur-lg"
      }`}>
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-6">

          {/* 로고 */}
          <Link to="/" className="select-none">
            <span className={`text-[20px] md:text-[23px] font-extrabold tracking-[-0.04em] ${
              isHome ? "text-white" : "text-[#0E2A3A]"
            }`} style={{ fontStretch: "105%" }}>
              LoanClock
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden items-center gap-1 md:flex">
            <div
              className="relative"
              onMouseEnter={() => handleOpen("calc")}
              onMouseLeave={handleClose}
            >
              <button className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                isHome
                  ? open === "calc" ? "bg-white/15 text-white" : "text-[#E6D3BE]/80 hover:bg-white/10 hover:text-white"
                  : open === "calc" ? "bg-[#10353F]/8 text-[#0E2A3A]" : "text-[#5E6E73] hover:bg-[#10353F]/5 hover:text-[#0E2A3A]"
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
                isHome
                  ? open === "guide" ? "bg-white/15 text-white" : "text-[#E6D3BE]/80 hover:bg-white/10 hover:text-white"
                  : open === "guide" ? "bg-[#10353F]/8 text-[#0E2A3A]" : "text-[#5E6E73] hover:bg-[#10353F]/5 hover:text-[#0E2A3A]"
              }`}>
                가이드
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === "guide" ? "rotate-180" : ""}`} />
              </button>
              {open === "guide" && <GuideDropdown onNavigate={handleNavigate} />}
            </div>

            <button
              onClick={() => handleNavigate("/feedback")}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                isHome
                  ? "text-[#E6D3BE]/80 hover:bg-white/10 hover:text-white"
                  : "text-[#5E6E73] hover:bg-[#10353F]/5 hover:text-[#0E2A3A]"
              }`}
            >
              문의/기능요청
            </button>
          </nav>

          {/* 우측: CTA + 모바일 햄버거 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/compare")}
              className="hidden rounded-lg bg-[#D97852] px-3 py-1.5 text-[13px] font-medium text-white transition-all duration-200 hover:bg-[#C96543] active:translate-y-0 sm:block"
            >
              금리 확인
            </button>

            {/* 모바일 햄버거 */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition md:hidden ${
                isHome ? "text-[#E6D3BE]/80 hover:bg-white/10" : "text-[#5E6E73] hover:bg-[#10353F]/8"
              }`}
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
