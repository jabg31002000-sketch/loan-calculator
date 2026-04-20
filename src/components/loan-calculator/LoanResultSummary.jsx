import { formatCurrency, getRepaymentLabel } from "./utils";

export default function LoanResultSummary({ result, submittedInput }) {
  return (
    <>
      <section className="rounded-3xl bg-[#10353F] p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E6D3BE]/60">월 납입금 (첫 회차 기준)</p>
        <p className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {formatCurrency(result.monthlyPayment)}
        </p>
        <p className="mt-3 text-[13px] text-[#E6D3BE]/60">
          {getRepaymentLabel(submittedInput.repaymentType)} · {submittedInput.months}개월
          {submittedInput.graceMonths > 0 ? ` · 거치 ${submittedInput.graceMonths}개월` : ""}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md">
          <p className="text-[13px] font-medium text-[#7A868B]">총 이자</p>
          <p className="mt-2 text-xl font-bold tracking-tight text-[#0E2A3A] sm:text-2xl">{formatCurrency(result.totalInterest)}</p>
        </div>
        <div className="rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md">
          <p className="text-[13px] font-medium text-[#7A868B]">총 상환액</p>
          <p className="mt-2 text-xl font-bold tracking-tight text-[#0E2A3A] sm:text-2xl">{formatCurrency(result.totalPayment)}</p>
        </div>
      </div>
    </>
  );
}
