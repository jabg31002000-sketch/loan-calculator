import { Calculator, CheckCircle2 } from "lucide-react";
import { TRUST_POINTS } from "./constants";

export default function LoanEmptyState() {
  return (
    <section className="mb-8 rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
        <Calculator className="h-6 w-6 text-slate-400" />
      </div>
      <p className="text-base font-bold text-slate-800">조건을 입력하면 결과가 바로 표시됩니다</p>
      <p className="mt-2 text-sm text-slate-400">대출금액, 금리, 기간을 입력하고 계산하기를 눌러주세요.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {TRUST_POINTS.map((point) => (
          <span key={point} className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
            <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}
