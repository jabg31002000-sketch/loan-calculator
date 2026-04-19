import { Link } from "react-router-dom";
import { useSeo } from "./useSeo";
import { Calculator, RefreshCw, Home, PieChart, Building2, Car, Shield, Zap, Eye, Landmark, Percent, Building, Lock, DollarSign, Heart } from "lucide-react";

const CALCULATORS = [
  {
    title: "신용대출 이자 계산하기",
    desc: "내가 매달 얼마 내야 하는지 바로 확인",
    path: "/credit-loan",
    icon: Calculator,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "대환 시 절약 금액 확인",
    desc: "금리 낮추면 얼마나 아끼는지 계산",
    path: "/refinance-loan",
    icon: RefreshCw,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    title: "전세 vs 월세 비교하기",
    desc: "어떤 선택이 더 유리한지 확인",
    path: "/jeonse-vs-rent",
    icon: Home,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "DSR / 대출한도 확인",
    desc: "내 소득으로 얼마나 더 가능한지 보기",
    path: "/dsr",
    icon: PieChart,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "주담대 가능 금액 보기",
    desc: "내 집 마련 가능 범위 확인",
    path: "/mortgage",
    icon: Building2,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    title: "자동차 할부 계산하기",
    desc: "월 부담과 총 비용 확인",
    path: "/auto-loan",
    icon: Car,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    title: "버팀목 전세대출 계산하기",
    desc: "정부 지원 전세대출 예상 금액 확인",
    path: "/beotimmok-jeonse",
    icon: Landmark,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "전세대출 이자 계산하기",
    desc: "보증금·금리만 넣으면 월 이자 확인",
    path: "/jeonse-loan-interest",
    icon: Percent,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    title: "디딤돌대출 가능 금액 보기",
    desc: "저금리 주택구입 대출 한도 확인",
    path: "/didimdol",
    icon: Building,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "보금자리론 계산하기",
    desc: "장기 고정금리 주담대 시뮬레이션",
    path: "/bogeumjari",
    icon: Lock,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "월세대출 계산하기",
    desc: "보증금 대출 + 월세 총 주거비 확인",
    path: "/monthly-rent-loan",
    icon: DollarSign,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "생애최초 대출 가능 금액 보기",
    desc: "첫 집 구매자 맞춤 대출 시뮬레이션",
    path: "/first-home",
    icon: Heart,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
];

const TRUST = [
  { icon: Shield, text: "회원가입 없이 이용" },
  { icon: Zap, text: "1분 내 계산" },
  { icon: Eye, text: "실제 금융 구조 기반" },
];

export default function HomePage() {
  useSeo(
    "대출 계산기 | 이자·한도·대환 비교 - LoanClock",
    "신용대출, 주담대, 전세대출, 자동차 할부까지. 내 상황에 맞는 대출 부담을 1분 안에 확인하세요."
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">

        {/* Hero */}
        <section className="text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/60">
            LoanClock
          </div>
          <h1 className="text-[1.65rem] font-extrabold leading-[1.35] tracking-tight text-slate-900 sm:text-3xl lg:text-[2.15rem]">
            내 상황에 맞는 대출 부담을<br />1분 안에 확인하세요
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-slate-500">
            얼마를 빌릴 수 있는지, 갈아타면 얼마나 줄어드는지,<br className="hidden sm:inline" />
            전세가 나은지 월세가 나은지 바로 확인해보세요.
          </p>

          {/* Trust */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {TRUST.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Icon className="h-3.5 w-3.5 text-emerald-500" />
                {text}
              </span>
            ))}
          </div>
        </section>

        {/* Calculator Cards */}
        <section className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CALCULATORS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md active:scale-[0.99]"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.95rem] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-slate-400">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Bottom note */}
        <section className="mt-12 rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4">
          <p className="text-[11px] font-medium text-slate-400">안내</p>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-slate-400">
            <li>본 계산 결과는 참고용이며, 실제 대출 조건은 금융기관별 심사 기준에 따라 달라질 수 있습니다.</li>
            <li>LoanClock은 특정 금융 상품을 판매하거나 중개하지 않습니다.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
