import { Calculator, CheckCircle2 } from "lucide-react";
import { TRUST_POINTS } from "./constants";

export default function LoanHeroSection() {
  return (
    <section className="mb-12 py-8 text-center sm:py-12">
      <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#10353F]/8 px-4 py-2 text-xs font-semibold text-[#10353F] ring-1 ring-[#10353F]/15">
        <Calculator className="h-3.5 w-3.5" />
        LoanClock 대출 계산기
      </div>

      <h1 className="text-[1.75rem] font-bold tracking-[-0.03em] text-[#0E2A3A] sm:text-[2.25rem] lg:text-[2.5rem] leading-[1.25]">
        내 상황에 맞는 대출 부담을<br />
        <span className="text-[#D97852]">1분 안에 확인하세요</span>
      </h1>

      <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-[#5E6E73]">
        어떤 대출이 맞는지 헷갈려도 괜찮아요.<br className="sm:hidden" />
        필요한 정보만 차례대로 묻고 쉽게 보여드릴게요.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {TRUST_POINTS.map((point) => (
          <span key={point} className="inline-flex items-center gap-2 rounded-full border border-[#E5E1DA] bg-white px-4 py-2 text-sm font-medium text-[#5E6E73] shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#10353F] flex-shrink-0" />
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}
