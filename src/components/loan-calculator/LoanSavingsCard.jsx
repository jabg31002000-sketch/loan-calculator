import { formatCurrency } from "./utils";

export default function LoanSavingsCard({ result, submittedInput, savingsAtLowerRate }) {
  if (savingsAtLowerRate === null || savingsAtLowerRate <= 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">현재 총 이자</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{formatCurrency(result.totalInterest)}</p>
          <p className="mt-0.5 text-xs text-slate-400">{submittedInput.annualRate.toFixed(1)}% 기준</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="text-xs font-semibold text-emerald-600">금리 1%p 낮추면</p>
          <p className="mt-1 text-lg font-bold text-emerald-600">약 {formatCurrency(savingsAtLowerRate)}</p>
          <p className="mt-0.5 text-xs font-medium text-emerald-500">절약 가능</p>
        </div>
      </div>
    </section>
  );
}
