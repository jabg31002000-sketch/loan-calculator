import { Link } from "react-router-dom";
import {
  Calculator, RefreshCw, Home, PieChart, Building2, Car,
  Landmark, Percent, Building, Lock, DollarSign, Heart,
  ChevronRight,
} from "lucide-react";
import { useSeo } from "../useSeo";

const CALCULATORS = [
  { title: "신용대출 이자 계산", desc: "월 상환금과 총 이자를 바로 확인하세요", path: "/credit-loan/calculator", icon: Calculator, tag: "인기" },
  { title: "대환 절약 금액 확인", desc: "금리를 낮추면 얼마나 아끼는지 계산", path: "/refinance-loan/calculator", icon: RefreshCw, tag: "절약" },
  { title: "전세 vs 월세 비교", desc: "어떤 선택이 더 유리한지 비교 분석", path: "/jeonse-vs-rent/calculator", icon: Home },
  { title: "DSR / 대출한도 확인", desc: "내 소득으로 얼마까지 빌릴 수 있는지", path: "/dsr/calculator", icon: PieChart },
  { title: "주담대 가능 금액", desc: "내 집 마련 가능 범위를 확인하세요", path: "/mortgage/calculator", icon: Building2 },
  { title: "자동차 할부 계산", desc: "월 할부금과 총 비용을 한눈에", path: "/auto-loan/calculator", icon: Car },
  { title: "버팀목 전세대출", desc: "정부 지원 전세대출 예상 금액 확인", path: "/beotimmok-jeonse/calculator", icon: Landmark },
  { title: "전세대출 이자 계산", desc: "보증금과 금리만 넣으면 월 이자 확인", path: "/jeonse-loan-interest/calculator", icon: Percent },
  { title: "디딤돌대출 한도", desc: "저금리 주택구입 대출 가능 금액 확인", path: "/didimdol/calculator", icon: Building },
  { title: "보금자리론 시뮬레이션", desc: "장기 고정금리 주담대 상환 분석", path: "/bogeumjari/calculator", icon: Lock },
  { title: "월세대출 총 주거비", desc: "보증금 대출 + 월세 합산 주거비 확인", path: "/monthly-rent-loan/calculator", icon: DollarSign },
  { title: "생애최초 대출 진단", desc: "첫 집 구매자 맞춤 예산 구간 분석", path: "/first-home/calculator", icon: Heart },
];

export default function CalculatorHub() {
  useSeo(
    "대출 계산기 모음 | LoanClock",
    "신용대출, 주담대, 전세대출, DSR, 자동차 할부까지. 12종 대출 계산기를 한 곳에서 이용하세요."
  );

  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">

        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E2A3A]/40">Calculators</span>
          <h1 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem]">
            대출 계산기 모음
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#5E6E73]">
            내 상황에 맞는 계산기를 선택하세요. 12종 계산기를 무료로 이용할 수 있습니다.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E5E1DA] bg-white p-7 shadow-md transition-all duration-300 hover:border-[#D5D0C8] hover:shadow-xl hover:-translate-y-2 active:scale-[0.98] sm:p-8"
              >
                {item.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#D97852] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
                    {item.tag}
                  </span>
                )}
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10353F]/8 transition-colors duration-300 group-hover:bg-[#10353F] group-hover:shadow-md">
                    <Icon className="h-5 w-5 text-[#10353F] transition-colors group-hover:text-white" />
                  </div>
                  <h2 className="text-base font-semibold text-[#0E2A3A] transition-colors group-hover:text-[#10353F] sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-[#C4BFB6] transition-colors group-hover:text-[#D97852]">
                  계산하기
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
