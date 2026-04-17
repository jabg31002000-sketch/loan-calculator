import { formatChartMoney } from "./utils";

export default function CustomChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const balance = payload.find((item) => item.dataKey === "balance")?.value ?? 0;
  const interest = payload.find((item) => item.dataKey === "interest")?.value ?? 0;
  const paymentAmount = payload.find((item) => item.dataKey === "paymentAmount")?.value ?? 0;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-xl">
      <div className="mb-1 font-bold text-slate-900">{label}개월차</div>
      <div className="text-slate-600">남은 원금: {formatChartMoney(balance)}</div>
      <div className="text-slate-600">이자: {formatChartMoney(interest)}</div>
      <div className="text-slate-600">납입금: {formatChartMoney(paymentAmount)}</div>
    </div>
  );
}
