import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useSeo } from "../../useSeo";

export default function RefinanceGuide() {
  useSeo(
    "대출 갈아타기 타이밍 | LoanClock",
    "대출 대환이 유리한 시점, 중도상환수수료 계산법, 기간 연장 시 주의사항을 정리했습니다."
  );

  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      <div className="mx-auto max-w-3xl px-6 py-16">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E6E73] hover:text-[#0E2A3A]"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          메인으로 돌아가기
        </Link>

        <h1 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem] leading-tight">
          대출 갈아타기 타이밍, 이럴 때 유리합니다
        </h1>

        <p className="mt-6 text-[15px] leading-relaxed text-[#5E6E73]">
          이미 대출을 받았더라도 더 낮은 금리의 상품으로 갈아탈 수 있습니다.
          하지만 무조건 금리가 낮다고 유리한 건 아닙니다.
          중도상환수수료, 남은 기간, 대출 잔액에 따라 실제 절약 금액이 달라집니다.
        </p>

        {/* 금리 차이 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">금리 차이가 얼마나 나야 할까</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
          <p>
            일반적으로 현재 금리보다 0.5%p 이상 낮은 상품이 있다면 대환을 검토할 가치가 있습니다.
            다만 대출 잔액이 적거나 남은 기간이 짧으면 절약 효과가 크지 않을 수 있습니다.
          </p>
          <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6">
            <p className="font-semibold text-[#0E2A3A]">예시</p>
            <p className="mt-2 text-sm text-[#5E6E73]">
              대출 잔액 3,000만 원, 남은 기간 3년일 때 금리를 5.0% → 4.0%로 낮추면
              약 47만 원의 이자를 절약할 수 있습니다.
              하지만 중도상환수수료가 1.5%(약 45만 원)라면 실질 절약은 거의 없습니다.
            </p>
          </div>
        </div>

        {/* 중도상환수수료 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">중도상환수수료, 반드시 확인하세요</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
          <p>
            대부분의 대출 상품에는 3년 이내 조기 상환 시 수수료가 부과됩니다.
            보통 잔여 원금의 1.0~1.5% 수준이며, 대출 실행 후 시간이 지날수록 수수료율이 낮아지는 경우가 많습니다.
          </p>
          <p>
            수수료 면제 시점이 가까운 경우, 조금만 기다렸다가 갈아타는 것이 유리할 수 있습니다.
            대환 전에 현재 대출의 수수료 조건을 반드시 확인하세요.
          </p>
        </div>

        {/* 기간 연장 위험 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">기간을 늘리면 오히려 손해</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
          <p>
            대환할 때 상환 기간을 다시 늘리면 월 상환금은 줄어들지만, 총 이자는 오히려 늘어날 수 있습니다.
            금리를 낮추면서 기간도 줄이는 것이 가장 이상적이지만,
            최소한 기존 남은 기간 이하로 설정하는 것을 권장합니다.
          </p>
          <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6">
            <ul className="space-y-2 text-sm text-[#5E6E73]">
              <li><strong className="text-[#0E2A3A]">좋은 대환:</strong> 금리 인하 + 기간 유지 또는 단축</li>
              <li><strong className="text-[#0E2A3A]">주의할 대환:</strong> 금리 인하 + 기간 연장 (총 이자 증가 가능)</li>
              <li><strong className="text-[#0E2A3A]">나쁜 대환:</strong> 금리 차이 적음 + 기간 연장 + 수수료 부담</li>
            </ul>
          </div>
        </div>

        {/* 언제 갈아타야 하는지 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">갈아타기 적기 체크리스트</h2>
        <div className="mt-4 space-y-3">
          {[
            "현재 금리보다 0.5%p 이상 낮은 상품이 있다",
            "중도상환수수료 면제 시점이 지났거나 가깝다",
            "대출 잔액이 2,000만 원 이상이다",
            "남은 상환 기간이 2년 이상이다",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-[#E5E1DA] bg-white p-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10353F]/8 text-xs font-bold text-[#10353F]">
                {i + 1}
              </span>
              <p className="text-[15px] text-[#5E6E73]">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#5E6E73]">
          위 조건 중 3개 이상 해당된다면, 대환을 적극적으로 검토해볼 만합니다.
        </p>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] active:scale-[0.98]"
          >
            내 금리 계산하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 면책 */}
        <div className="mt-12 rounded-2xl bg-[#F6F1EB] border border-[#E5E1DA] px-4 py-4 text-sm leading-6 text-[#5E6E73]">
          본 콘텐츠는 일반적인 금융 정보 제공 목적이며, 특정 금융 상품을 추천하거나 투자를 권유하지 않습니다.
          실제 대출 조건은 금융기관에 직접 확인하시기 바랍니다.
        </div>
      </div>
    </div>
  );
}
