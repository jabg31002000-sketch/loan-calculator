import { formatCurrency } from "./utils";

export default function ScenarioCompareTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const monthlyPayment = payload.find((item) => item.dataKey === "monthlyPayment")?.value ?? 0;
  const totalInterest = payload.find((item) => item.dataKey === "totalInterest")?.value ?? 0;
  return (
    <div className="rounded-2xl border border-[#10353F] bg-[#10353F]/95 p-3 text-sm shadow-2xl backdrop-blur">
      <div className="mb-1 font-bold text-white">{label}</div>
      <div className="text-[#E6D3BE]">월 상환금: {formatCurrency(monthlyPayment)}</div>
      <div className="text-[#E6D3BE]">총 이자: {formatCurrency(totalInterest)}</div>
    </div>
  );
}
