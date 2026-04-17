import { formatCurrency, getRepaymentLabel } from "./utils";

export default function LoanResultSummary({ result, submittedInput }) {
  return (
    <>
      <section className="rounded-3xl bg-slate-900 p-6 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">월 납입금 (첫 회차 기준)</p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {formatCurrency(result.monthlyPayment)}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {getRepaymentLabel(submittedInput.repaymentType)} · {submittedInput.months}개월
          {submittedInput.graceMonths > 0 ? ` · 거치 ${submittedInput.graceMonths}개월` : ""}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">총 이자</p>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{formatCurrency(result.totalInterest)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">총 상환액</p>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{formatCurrency(result.totalPayment)}</p>
        </div>
      </div>
    </>
  );
}
