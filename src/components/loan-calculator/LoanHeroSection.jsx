import { Calculator, CheckCircle2 } from "lucide-react";
import { TRUST_POINTS } from "./constants";

export default function LoanHeroSection() {
  return (
    <section className="mb-10 text-center">
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
        <Calculator className="h-3.5 w-3.5" />
        LoanClock 대출 계산기
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-snug">
        내 상황에 맞는 대출 부담을<br />
        <span className="text-emerald-600">1분 안에 확인하세요</span>
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
        어떤 대출이 맞는지 헷갈려도 괜찮아요.<br className="sm:hidden" />
        필요한 정보만 차례대로 묻고 쉽게 보여드릴게요.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {TRUST_POINTS.map((point) => (
          <span key={point} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}
