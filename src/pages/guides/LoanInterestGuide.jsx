import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useSeo } from "../../useSeo";

export default function LoanInterestGuide() {
  useSeo(
    "대출 이자 계산 방법 | LoanClock",
    "대출 이자를 직접 계산해야 손해를 줄일 수 있습니다. 상환 방식 차이, 비교 기준 4가지를 알아보세요."
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
          대출 이자 계산 방법, 직접 해봐야 손해를 줄일 수 있습니다
        </h1>

        <p className="mt-6 text-[15px] leading-relaxed text-[#5E6E73]">
          대출을 받을 때 가장 많이 간과하는 것이 이자 구조입니다. 같은 금액, 같은 금리라도
          상환 방식에 따라 총 이자가 수백만 원까지 차이 날 수 있습니다.
          이 글에서는 대출 이자를 직접 계산해야 하는 이유와 비교할 때 꼭 봐야 할 기준을 정리합니다.
        </p>

        {/* 상환 방식 차이 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">상환 방식 차이</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
          <p>
            대출 상환 방식은 크게 세 가지로 나뉩니다.
          </p>
          <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6">
            <ul className="space-y-3">
              <li>
                <strong className="text-[#0E2A3A]">원리금균등 상환</strong> — 매월 같은 금액을 갚습니다.
                초반에는 이자 비중이 크고, 후반으로 갈수록 원금 비중이 커집니다. 가장 일반적인 방식입니다.
              </li>
              <li>
                <strong className="text-[#0E2A3A]">원금균등 상환</strong> — 매월 갚는 원금은 같고, 이자는 줄어듭니다.
                초반 부담이 크지만 총 이자가 적습니다.
              </li>
              <li>
                <strong className="text-[#0E2A3A]">만기일시 상환</strong> — 매월 이자만 내고 만기에 원금을 한 번에 갚습니다.
                월 부담은 가장 적지만 총 이자가 가장 많습니다.
              </li>
            </ul>
          </div>
          <p>
            예를 들어, 5,000만 원을 연 5%로 5년간 빌릴 경우,
            원리금균등은 약 660만 원, 원금균등은 약 637만 원, 만기일시는 약 1,250만 원의 이자가 발생합니다.
            같은 조건인데도 상환 방식 하나로 600만 원 넘게 차이가 납니다.
          </p>
        </div>

        {/* 왜 직접 계산해야 하는가 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">왜 직접 계산해야 하는가</h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
          <p>
            은행에서 안내하는 금리와 월 상환금만 보면, 실제로 얼마를 더 내는지 체감하기 어렵습니다.
            대출 조건을 직접 입력해서 총 이자, 월별 상환금 변화, 상환 방식 간 차이를 눈으로 확인해야
            불필요한 비용을 줄일 수 있습니다.
          </p>
          <p>
            특히 대출 기간이 길수록 이자 차이는 기하급수적으로 커집니다.
            30년 주택담보대출의 경우, 금리 0.5%p 차이만으로도 총 이자가 1,000만 원 이상 달라질 수 있습니다.
          </p>
        </div>

        {/* 대출 비교할 때 봐야 할 4가지 */}
        <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">대출 비교할 때 봐야 할 4가지</h2>
        <div className="mt-4 space-y-3">
          {[
            { num: "1", title: "적용 금리", desc: "표면 금리가 아니라 우대금리 적용 후 실제 금리를 확인하세요." },
            { num: "2", title: "상환 방식", desc: "원리금균등과 원금균등의 총 이자 차이를 반드시 비교하세요." },
            { num: "3", title: "중도상환수수료", desc: "조기 상환 시 수수료가 얼마인지, 면제 기간이 있는지 확인하세요." },
            { num: "4", title: "부대비용", desc: "인지세, 보증료, 감정비 등 대출 실행 시 발생하는 추가 비용도 고려하세요." },
          ].map((item) => (
            <div key={item.num} className="flex gap-4 rounded-2xl border border-[#E5E1DA] bg-white p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8 text-sm font-bold text-[#10353F]">
                {item.num}
              </span>
              <div>
                <p className="font-semibold text-[#0E2A3A]">{item.title}</p>
                <p className="mt-1 text-sm text-[#5E6E73]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

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
