import { formatCurrency } from "./utils";

export default function LoanSavingsCard({ result, submittedInput, savingsAtLowerRate }) {
  if (savingsAtLowerRate === null || savingsAtLowerRate <= 0) return null;

  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#F6F1EB] p-5">
          <p className="text-[13px] font-medium text-[#7A868B]">현재 총 이자</p>
          <p className="mt-1.5 text-xl font-bold text-[#0E2A3A]">{formatCurrency(result.totalInterest)}</p>
          <p className="mt-1 text-[13px] text-[#7A868B]">{submittedInput.annualRate.toFixed(1)}% 기준</p>
        </div>
        <div className="rounded-2xl bg-[#10353F]/5 p-5">
          <p className="text-[13px] font-semibold text-[#10353F]">금리 1%p 낮추면</p>
          <p className="mt-1.5 text-xl font-bold text-[#10353F]">약 {formatCurrency(savingsAtLowerRate)}</p>
          <p className="mt-1 text-[13px] font-medium text-[#10353F]/70">절약 가능</p>
        </div>
      </div>
    </section>
  );
}
