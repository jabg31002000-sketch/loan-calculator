import { Link } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { useSeo } from "../../useSeo";
import guides from "./registry";

export default function GuideList() {
  useSeo(
    "대출 가이드 모음 | LoanClock",
    "대출 이자 계산, 갈아타기, 신용점수 관리까지. 대출 전 꼭 알아야 할 핵심 가이드를 모았습니다."
  );

  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">

        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E2A3A]/40">Guides</span>
          <h1 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem]">
            대출 가이드
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#5E6E73]">
            대출 전 꼭 알아야 할 핵심 정보를 쉽게 정리했습니다.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="group flex h-full flex-col justify-between rounded-3xl border border-[#E5E1DA] bg-white p-7 shadow-md transition-all duration-300 hover:border-[#D5D0C8] hover:shadow-xl hover:-translate-y-2 active:scale-[0.98] sm:p-8"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10353F]/8 transition-colors duration-300 group-hover:bg-[#10353F] group-hover:shadow-md">
                  <BookOpen className="h-5 w-5 text-[#10353F] transition-colors group-hover:text-white" />
                </div>
                <h2 className="text-base font-semibold text-[#0E2A3A] transition-colors group-hover:text-[#10353F] sm:text-lg leading-snug">
                  {guide.title}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">
                  {guide.summary}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-[#C4BFB6] transition-colors group-hover:text-[#D97852]">
                읽어보기
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
