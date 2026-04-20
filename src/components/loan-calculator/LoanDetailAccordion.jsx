import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";
import {
  Sparkles,
  LineChart as LineChartIcon,
  BarChart3,
  Bookmark,
  CalendarDays,
  Trash2,
  ChevronRight,
} from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  formatRate,
  formatChartMoney,
  getRepaymentLabel,
  generateChartData,
  getHalfPaidMonth,
  getPeakInterestMonth,
  getBestRepaymentOption,
  getMaxInterestValue,
} from "./utils";
import { REPAYMENT_COLORS, SCENARIO_CARD_THEMES } from "./constants";
import AccordionSection from "./AccordionSection";
import CustomChartTooltip from "./CustomChartTooltip";
import ComparisonTooltip from "./ComparisonTooltip";
import ScenarioCompareTooltip from "./ScenarioCompareTooltip";

export default function LoanDetailAccordion({
  result,
  submittedInput,
  comparisonResults,
  ratePreviewResults,
  savedScenarios,
  displaySavedScenarios,
  savedScenarioChartData,
  comparisonChartData,
  onDeleteScenario,
  onLoadScenario,
}) {
  return (
    <div className="space-y-3 pt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#5E6E73]">상세 분석</p>

      {/* 금리 민감도 */}
      <AccordionSection title="금리 민감도 비교" icon={<Sparkles className="h-4 w-4" />}>
        <div className="space-y-3">
          {ratePreviewResults.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl bg-[#F6F1EB] p-4">
              <div>
                <p className="text-sm font-bold text-[#0E2A3A]">금리 {item.label}</p>
                <p className="mt-0.5 text-xs text-[#5E6E73]">월 {formatCurrency(item.preview?.monthlyPayment ?? 0)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#0E2A3A]">총 이자 {formatCurrency(item.preview?.totalInterest ?? 0)}</p>
                <p className="mt-0.5 text-xs text-[#5E6E73]">
                  {item.diff === 0 ? "현재 금리" : item.diff > 0 ? "+1.0%p" : "-1.0%p"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* 월별 상환 흐름 */}
      <AccordionSection title="월별 상환 흐름 그래프" icon={<LineChartIcon className="h-4 w-4" />}>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={generateChartData(result.rows)}>
              <defs>
                <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={formatChartMoney} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} width={55} />
              <Tooltip content={<CustomChartTooltip />} />
              {getHalfPaidMonth(result.rows, submittedInput.principal) && (
                <ReferenceLine x={getHalfPaidMonth(result.rows, submittedInput.principal)} stroke="#94a3b8" strokeDasharray="4 4" />
              )}
              <Area type="monotone" dataKey="balance" name="남은 원금" stroke="#0ea5e9" fill="url(#balanceFill)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="interest" name="월 이자" stroke="#1e293b" fillOpacity={0} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-[#5E6E73]">
          {submittedInput.repaymentType === "equal_principal"
            ? "원금균등상환은 초반 부담이 크지만 시간이 지날수록 부담이 줄어듭니다."
            : submittedInput.repaymentType === "bullet"
            ? "만기일시상환은 원금이 줄지 않다가 마지막에 한 번에 상환됩니다."
            : "원리금균등상환은 월 납입액이 일정하지만 초반에는 이자 비중이 큽니다."}
        </p>
      </AccordionSection>

      {/* 상환 비중 */}
      <AccordionSection title="원금 vs 이자 비중" icon={<BarChart3 className="h-4 w-4" />}>
        <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-[#F6F1EB]">
          <div className="flex h-full w-full">
            <div className="h-full bg-[#10353F]" style={{ width: `${((submittedInput.principal || 0) / Math.max(result.totalPayment || 1, 1)) * 100}%` }} />
            <div className="h-full bg-[#E5E1DA]" style={{ width: `${(result.totalInterest / Math.max(result.totalPayment || 1, 1)) * 100}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#10353F]/5 p-3">
            <p className="text-xs font-medium text-[#10353F]">원금</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(submittedInput.principal)}</p>
          </div>
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs font-medium text-[#5E6E73]">이자</p>
            <p className="mt-1 text-base font-bold text-[#0E2A3A]">{formatCurrency(result.totalInterest)}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#10353F]/5 p-3">
            <p className="text-xs font-medium text-[#10353F]">이자 최고 시점</p>
            <p className="mt-1 text-lg font-bold text-[#0E2A3A]">{getPeakInterestMonth(result.rows)?.round ?? "-"}개월차</p>
          </div>
          <div className="rounded-xl bg-[#F6F1EB] p-3">
            <p className="text-xs font-medium text-[#5E6E73]">원금 절반 이하</p>
            <p className="mt-1 text-lg font-bold text-[#0E2A3A]">{getHalfPaidMonth(result.rows, submittedInput.principal) ?? "-"}개월차</p>
          </div>
        </div>
      </AccordionSection>

      {/* 상환방식 전체 비교 */}
      <AccordionSection title="상환방식 3가지 비교" icon={<BarChart3 className="h-4 w-4" />}>
        {comparisonResults && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#10353F]/5 p-3">
              <p className="text-sm font-semibold text-[#10353F]">
                총 이자 기준 {getBestRepaymentOption(comparisonResults)?.title ?? "-"}이 가장 유리합니다.
              </p>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatChartMoney} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} width={55} />
                  <Tooltip content={<ComparisonTooltip />} />
                  <Bar dataKey="totalInterest" barSize={24} radius={[8, 8, 0, 0]} animationDuration={700} animationEasing="ease-out">
                    {comparisonChartData.map((_, index) => (
                      <Cell key={index} fill={REPAYMENT_COLORS[index % REPAYMENT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {comparisonResults.map((item, index) => {
                const maxInterest = getMaxInterestValue(comparisonResults);
                const interest = item.data?.totalInterest ?? 0;
                const widthPercent = maxInterest > 0 ? (interest / maxInterest) * 100 : 0;
                return (
                  <div key={item.title} className="rounded-xl border border-[#E5E1DA]/60 bg-[#F6F1EB] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#0E2A3A]">{item.title}</span>
                      <span className="text-sm font-bold text-[#0E2A3A]">{formatCurrency(interest)}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#E5E1DA]">
                      <div className="h-full rounded-full" style={{ width: `${widthPercent}%`, backgroundColor: REPAYMENT_COLORS[index % REPAYMENT_COLORS.length] }} />
                    </div>
                    <div className="mt-2 flex gap-3 text-xs text-[#5E6E73]">
                      <span>월 {formatCurrency(item.data?.monthlyPayment ?? 0)}</span>
                      <span>총 {formatCurrency(item.data?.totalPayment ?? 0)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </AccordionSection>

      {/* 저장한 비교안 */}
      <AccordionSection title={`저장한 비교안 (${savedScenarios.length}/6)`} icon={<Bookmark className="h-4 w-4" />}>
        {savedScenarios.length > 0 ? (
          <div className="space-y-4">
            <div className="h-[240px] w-full rounded-xl border border-[#E5E1DA]/60 bg-[#F6F1EB] p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savedScenarioChartData} barCategoryGap="22%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatChartMoney} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} width={55} />
                  <Tooltip content={<ScenarioCompareTooltip />} />
                  <Bar dataKey="monthlyPayment" barSize={26} radius={[8, 8, 0, 0]} animationDuration={700} animationEasing="ease-out">
                    {savedScenarioChartData.map((_, index) => (
                      <Cell key={index} fill={SCENARIO_CARD_THEMES[index % SCENARIO_CARD_THEMES.length].accent} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {displaySavedScenarios.map((item, index) => {
              const theme = SCENARIO_CARD_THEMES[index % SCENARIO_CARD_THEMES.length];
              return (
                <div key={item.id} className={`relative overflow-hidden rounded-2xl border bg-white p-4 ${theme.ring}`}>
                  <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: theme.accent }} />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${theme.badgeBg} ${theme.badgeText}`}>
                        {item.displayName}
                      </div>
                      <p className="mt-1.5 text-sm text-[#5E6E73]">{getRepaymentLabel(item.input.repaymentType)} / 금리 {formatRate(item.input.annualRate)}</p>
                    </div>
                    <button type="button" onClick={() => onDeleteScenario(item.id)} className="rounded-lg border border-[#E5E1DA] bg-white p-1.5 text-[#5E6E73] transition hover:bg-[#F6F1EB]" aria-label="삭제">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#F6F1EB] p-3">
                      <p className="text-xs text-[#5E6E73]">월 상환금</p>
                      <p className="mt-0.5 text-sm font-bold text-[#0E2A3A]">{formatCurrency(item.result.monthlyPayment)}</p>
                    </div>
                    <div className="rounded-lg bg-[#F6F1EB] p-3">
                      <p className="text-xs text-[#5E6E73]">총 이자</p>
                      <p className="mt-0.5 text-sm font-bold text-[#0E2A3A]">{formatCurrency(item.result.totalInterest)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => onLoadScenario(item)} className={`mt-3 inline-flex items-center gap-1 text-xs font-bold ${theme.link}`}>
                    이 조건 다시 불러오기 <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#E5E1DA] bg-[#F6F1EB] p-6 text-center">
            <Bookmark className="mx-auto h-6 w-6 text-[#5E6E73]/50" />
            <p className="mt-2 text-sm font-semibold text-[#0E2A3A]">아직 저장한 비교안이 없어요</p>
            <p className="mt-1 text-xs text-[#5E6E73]">위에서 <strong>비교안 저장</strong>을 누르면 조건별 비교가 쉬워집니다.</p>
          </div>
        )}
      </AccordionSection>

      {/* 상환 스케줄표 */}
      <AccordionSection title="상환 스케줄표 (전체 회차)" icon={<CalendarDays className="h-4 w-4" />}>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#10353F]/5 px-2.5 py-1 text-xs font-semibold text-[#10353F]">{getRepaymentLabel(submittedInput.repaymentType)}</span>
          <span className="rounded-full bg-[#F6F1EB] px-2.5 py-1 text-xs font-semibold text-[#5E6E73]">{submittedInput.months}개월</span>
          {submittedInput.graceMonths > 0 && (
            <span className="rounded-full bg-[#F6F1EB] px-2.5 py-1 text-xs font-semibold text-[#5E6E73]">{submittedInput.graceMonths}개월</span>
          )}
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#E5E1DA]">
          <table className="min-w-[680px] w-full border-collapse text-sm">
            <thead className="bg-[#F6F1EB]">
              <tr>
                <th className="px-3 py-2.5 text-center text-xs font-bold text-[#5E6E73]">회차</th>
                <th className="px-3 py-2.5 text-center text-xs font-bold text-[#5E6E73]">납입금(원)</th>
                <th className="px-3 py-2.5 text-center text-xs font-bold text-[#5E6E73]">이자(원)</th>
                <th className="px-3 py-2.5 text-center text-xs font-bold text-[#5E6E73]">원금(원)</th>
                <th className="px-3 py-2.5 text-center text-xs font-bold text-[#5E6E73]">잔금(원)</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, index) => (
                <tr key={row.round} className={index % 2 === 0 ? "bg-white" : "bg-[#F6F1EB]/60"}>
                  <td className="px-3 py-2.5 text-center font-semibold text-[#0E2A3A]">{row.round}</td>
                  <td className="px-3 py-2.5 text-center text-[#0E2A3A]">{formatNumber(row.paymentAmount)}</td>
                  <td className="px-3 py-2.5 text-center text-[#0E2A3A]">{formatNumber(row.interest)}</td>
                  <td className="px-3 py-2.5 text-center text-[#0E2A3A]">{formatNumber(row.principalPayment)}</td>
                  <td className="px-3 py-2.5 text-center text-[#0E2A3A]">{formatNumber(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionSection>
    </div>
  );
}
