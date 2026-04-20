import { Calculator, CheckCircle2 } from "lucide-react";
import { TRUST_POINTS } from "./constants";

export default function LoanEmptyState() {
  return (
    <section className="mb-8 rounded-3xl border border-dashed border-[#E5E1DA] bg-white px-8 py-14 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10353F]/8">
        <Calculator className="h-6 w-6 text-[#10353F]" />
      </div>
      <p className="text-lg font-semibold text-[#0E2A3A]">조건을 입력하면 결과가 바로 표시됩니다</p>
      <p className="mt-2 text-[15px] text-[#5E6E73]">대출금액, 금리, 기간을 입력하고 계산하기를 눌러주세요.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {TRUST_POINTS.map((point) => (
          <span key={point} className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E1DA] bg-white px-3 py-1.5 text-[13px] text-[#5E6E73] shadow-sm">
            <CheckCircle2 className="h-3 w-3 text-[#10353F] flex-shrink-0" />
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}
