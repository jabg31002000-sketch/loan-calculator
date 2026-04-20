import { formatChartMoney } from "./utils";

export default function CustomChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const balance = payload.find((item) => item.dataKey === "balance")?.value ?? 0;
  const interest = payload.find((item) => item.dataKey === "interest")?.value ?? 0;
  const paymentAmount = payload.find((item) => item.dataKey === "paymentAmount")?.value ?? 0;
  return (
    <div className="rounded-2xl border border-[#E5E1DA] bg-white p-3 text-sm shadow-xl">
      <div className="mb-1 font-bold text-[#0E2A3A]">{label}개월차</div>
      <div className="text-[#5E6E73]">남은 원금: {formatChartMoney(balance)}</div>
      <div className="text-[#5E6E73]">이자: {formatChartMoney(interest)}</div>
      <div className="text-[#5E6E73]">납입금: {formatChartMoney(paymentAmount)}</div>
    </div>
  );
}
