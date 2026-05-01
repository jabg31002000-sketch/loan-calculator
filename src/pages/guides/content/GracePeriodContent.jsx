import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

function FaqJsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld-grace-period";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "거치기간이 있으면 무조건 유리한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "아닙니다. 거치기간은 초반 월 납입액을 낮춰줄 수 있지만, 이후 월 상환액과 총이자를 늘릴 수 있습니다. 유리한지는 현재 현금흐름과 거치 종료 후 부담을 함께 봐야 판단할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "20년 대출에 2년 거치면 총 22년 동안 갚는 건가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "상품마다 다릅니다. 다만 많은 경우 전체 대출기간 안에 거치기간이 포함됩니다. 이 경우 20년 대출에 2년 거치라면 실제 원금 상환 기간은 18년이 될 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "거치기간에는 원금을 전혀 못 갚나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "상품 조건에 따라 다릅니다. 일반적으로는 이자만 납부하는 구조가 많지만, 일부 상품은 중도상환이나 일부 원금 상환이 가능할 수 있습니다. 실제 약정 조건을 확인해야 합니다.",
          },
        },
        {
          "@type": "Question",
          name: "대출 거치기간 계산에서 가장 먼저 봐야 할 것은 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "거치기간 중 월 이자, 거치 종료 후 월 납입액, 총이자입니다. 이 세 가지를 같이 봐야 지금은 편하지만 나중에 부담이 커지는 구조인지 확인할 수 있습니다.",
          },
        },
      ],
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-jsonld-grace-period");
      if (el) el.remove();
    };
  }, []);
  return null;
}

export default function GracePeriodContent() {
  return (
    <>
      <FaqJsonLd />

      {/* 도입부 */}
      <p className="mt-8 text-[15px] leading-[1.8] text-[#5E6E73]">
        "처음 1~2년은 이자만 내면 됩니다."
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출 상담에서 자주 듣는 말입니다. 월 부담이 확 줄어든다고 하면 솔깃할 수밖에 없습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        하지만 거치기간은 <strong className="text-[#0E2A3A]">이자를 깎아주는 장치가 아닙니다.</strong>{" "}
        원금 상환을 나중으로 미루는 구조입니다. 거치기간이 끝나면 남은 원금을 더 짧은 기간에 갚아야 하고, 그 결과 월 상환액이 올라갈 수 있습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        이 글에서는 대출금 3,000만원, 연 5%, 20년 상환 조건을 기준으로 거치기간 유무에 따라 월 납입액과 총이자가 어떻게 달라지는지 직접 계산해봅니다.
      </p>

      {/* 요약 박스 */}
      <div className="mt-8 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-5">
        <p className="text-[13px] font-bold text-[#0E2A3A] tracking-wide mb-3">이 글의 핵심 포인트</p>
        <ul className="space-y-2 text-[14px] leading-relaxed text-[#5E6E73]">
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>거치기간은 원금 상환을 뒤로 미루는 기간입니다</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>거치 중에는 월 이자만 내므로 부담이 낮아 보일 수 있습니다</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>거치 종료 후에는 남은 원금을 더 짧은 기간에 갚아야 할 수 있습니다</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>월 상환액뿐 아니라 총이자 변화까지 함께 확인해야 합니다</li>
        </ul>
      </div>


      {/* 1. 거치기간이란 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">대출 거치기간이란?</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치기간은 대출을 받은 후 원금은 갚지 않고 이자만 납부하는 기간입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        예를 들어 20년 만기 대출에서 2년 거치를 설정하면, 처음 2년 동안은 매달 이자만 냅니다. 원금 상환은 3년 차부터 시작되고, 남은 18년 동안 원금 전액을 나눠 갚게 됩니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        "할인"이 아니라 "유예"입니다. 대출 총액은 줄지 않고, 상환 시점만 뒤로 밀리는 것입니다.
      </p>


      {/* 2. 계산 조건 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">3,000만원 대출 기준 계산 조건</h2>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">대출금액</td>
              <td className="px-5 py-3 text-right">3,000만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">연이율</td>
              <td className="px-5 py-3 text-right">5%</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">전체 대출기간</td>
              <td className="px-5 py-3 text-right">20년 (240개월)</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">상환방식</td>
              <td className="px-5 py-3 text-right">원리금균등상환</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-[#7A868B]">
        아래 계산은 이 조건을 기준으로 합니다. 실제 대출 결과는 금융사 상품, 개인 신용도, 실행 시점에 따라 달라질 수 있습니다.
      </p>


      {/* 3. 거치 없는 경우 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">거치기간이 없는 경우</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출 시작부터 원금과 이자를 함께 갚습니다. 20년(240개월) 동안 매달 동일한 금액을 납부합니다.
      </p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[14px] text-[#5E6E73]">월 납입액</span>
          <span className="text-[1.25rem] font-bold text-[#0E2A3A]">약 19.8만원</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-[14px] text-[#5E6E73]">총이자</span>
          <span className="text-[1.1rem] font-semibold text-[#5E6E73]">약 1,752만원</span>
        </div>
      </div>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        첫 달부터 원금이 줄어들기 시작하므로, 시간이 지날수록 이자 비중은 감소합니다.
      </p>


      {/* 4. 2년 거치 후 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">2년 거치 후 상환하는 경우</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        처음 24개월 동안은 원금을 갚지 않습니다. 이 기간에는 매달 이자만 납부합니다.
      </p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4 space-y-3">
        <div>
          <p className="text-[13px] font-semibold text-[#7A868B] mb-1">거치기간 중 (1~24개월)</p>
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] text-[#5E6E73]">월 이자</span>
            <span className="text-[1.25rem] font-bold text-[#0E2A3A]">약 12.5만원</span>
          </div>
        </div>
        <div className="border-t border-[#E5E1DA]/60 pt-3">
          <p className="text-[13px] font-semibold text-[#7A868B] mb-1">거치 종료 후 (25~240개월)</p>
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] text-[#5E6E73]">월 납입액</span>
            <span className="text-[1.25rem] font-bold text-[#D97852]">약 21.1만원</span>
          </div>
        </div>
        <div className="border-t border-[#E5E1DA]/60 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] text-[#5E6E73]">총이자</span>
            <span className="text-[1.1rem] font-semibold text-[#5E6E73]">약 1,850만원대</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치 중에는 월 부담이 12.5만원으로 낮아지지만, 거치가 끝나면 21.1만원으로 올라갑니다. 거치 없이 시작할 때의 19.8만원보다 <strong className="text-[#0E2A3A]">매달 약 1.3만원을 더 내야</strong> 하는 구조입니다.
      </p>


      {/* 5. 비교표 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">한눈에 비교표</h2>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-5 py-3 text-left font-semibold text-[#0E2A3A]">조건</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">초반 월 부담</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">거치 후 월 부담</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">총이자</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">거치 없음</td>
              <td className="px-5 py-3 text-right">약 19.8만원</td>
              <td className="px-5 py-3 text-right">약 19.8만원</td>
              <td className="px-5 py-3 text-right">약 1,752만원</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">2년 거치</td>
              <td className="px-5 py-3 text-right">약 12.5만원</td>
              <td className="px-5 py-3 text-right text-[#D97852] font-semibold">약 21.1만원</td>
              <td className="px-5 py-3 text-right">약 1,850만원대</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#0E2A3A] font-semibold">
        당장 덜 내는 것과 전체적으로 덜 내는 것은 다릅니다.
      </p>


      {/* 비교 카드 */}
      <div
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        role="group"
        aria-label="3,000만원 연 5% 20년 기준 거치기간 없음과 2년 거치 월 상환액 비교"
      >
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-5">
          <p className="text-[13px] font-bold text-[#10353F] tracking-wide">거치 없음</p>
          <p className="mt-3 text-[2rem] font-extrabold text-[#0E2A3A] leading-none">19.8<span className="text-[1rem] font-semibold text-[#5E6E73]">만원/월</span></p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#5E6E73]">
            <p>총이자 약 1,752만원</p>
            <p>처음부터 원금 상환 시작</p>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-[#D97852]/30 bg-white px-5 py-5">
          <p className="text-[13px] font-bold text-[#D97852] tracking-wide">2년 거치</p>
          <p className="mt-3 text-[1.1rem] font-semibold text-[#5E6E73] leading-none">초반 12.5만원 →</p>
          <p className="mt-1 text-[2rem] font-extrabold text-[#D97852] leading-none">21.1<span className="text-[1rem] font-semibold text-[#5E6E73]">만원/월</span></p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#5E6E73]">
            <p>총이자 약 1,850만원대</p>
            <p>초반 부담은 낮지만 이후 상환액 증가</p>
          </div>
        </div>
      </div>


      {/* 6. 왜 오를까 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">왜 거치기간이 끝나면 월 상환액이 오를까?</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        구조 자체가 그렇습니다. 거치기간 동안 원금은 전혀 줄지 않습니다. 거치가 끝나면 3,000만원 전액이 고스란히 남아 있습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        그런데 전체 대출기간 20년 중 2년은 이미 지나갔습니다. 남은 18년 안에 3,000만원 전부를 갚아야 합니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        같은 원금을 더 짧은 기간에 나누니, 한 달에 갚아야 할 금액이 커집니다. 거기에 이자도 원금 3,000만원 기준으로 계속 붙기 때문에 이자 부담도 거치 없을 때보다 큽니다.
      </p>


      {/* 중간 CTA */}
      <div className="mt-10 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-6 text-center">
        <p className="text-[14px] leading-relaxed text-[#5E6E73]">
          위 예시는 3,000만원 기준입니다.<br />
          내 대출금, 금리, 기간을 넣으면 월 납입액과 총이자는 달라질 수 있습니다.
        </p>
        <Link
          to="/credit-loan/calculator"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-5 py-3 text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] active:scale-[0.98]"
        >
          내 조건으로 월 납입액 계산하기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>


      {/* 7. 금리 높아지면 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">금리가 높아지면 차이가 더 커지는 이유</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치기간의 부담은 금리가 올라갈수록 커집니다. 거치 중에 내는 이자 자체가 높아지고, 거치 후 상환액도 더 크게 뛰기 때문입니다.
      </p>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        같은 3,000만원에 연 6%, 20년 조건으로 2년 거치를 설정하면 이렇게 됩니다.
      </p>

      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[14px] text-[#5E6E73]">거치 중 월 이자</span>
          <span className="text-[1.1rem] font-bold text-[#0E2A3A]">약 15만원</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[14px] text-[#5E6E73]">거치 후 월 납입액</span>
          <span className="text-[1.1rem] font-bold text-[#D97852]">약 22.8만원</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[14px] text-[#5E6E73]">총이자</span>
          <span className="text-[1.1rem] font-semibold text-[#5E6E73]">약 2,270만원대</span>
        </div>
      </div>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        금리가 1%p 올라갔을 뿐인데, 거치 후 월 상환액은 약 1.7만원 더 높아지고 총이자 차이는 수백만원 단위로 벌어집니다. 변동금리 대출이라면 이 차이가 더 커질 수 있습니다.
      </p>


      {/* 8. 원리금 vs 원금 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">원리금균등상환과 원금균등상환 차이</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치 후 어떤 상환방식을 적용하느냐에 따라서도 결과가 달라집니다.
      </p>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        <strong className="text-[#0E2A3A]">원리금균등상환</strong>은 매달 같은 금액을 냅니다. 납입 계획을 세우기 쉽지만, 초반에는 이자 비중이 높아 원금이 천천히 줄어듭니다.
      </p>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        <strong className="text-[#0E2A3A]">원금균등상환</strong>은 원금을 매달 동일하게 갚고, 여기에 남은 원금에 대한 이자가 붙습니다. 초반 부담이 크지만 원금이 빠르게 줄면서 총이자가 적어집니다.
      </p>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        같은 조건(3,000만원, 연 5%, 2년 거치 후 18년 상환)에서 원금균등상환을 적용하면 거치 후 첫 달 납입액은 약 26.4만원으로 높지만, 총이자는 약 1,656만원으로 원리금균등보다 적습니다.
      </p>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치기간과 상환방식은 별개의 선택이지만, 결과에는 함께 영향을 줍니다. 비교 시 한쪽만 보면 판단이 어렵습니다.
        {" "}<Link to="/credit-loan" className="text-[#D97852] font-semibold hover:underline">상환방식별 차이</Link>가 궁금하다면 별도 안내를 참고해보세요.
      </p>


      {/* 9. 체크 3가지 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">거치기간 선택 전 꼭 확인해야 할 3가지</h2>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">1. 거치 종료 후 월 납입액은 얼마인가?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">지금 편한 것보다, 거치 끝난 뒤의 부담을 먼저 확인해야 합니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">2. 총이자는 얼마나 늘어나는가?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">거치기간 동안 원금이 줄지 않으므로, 그만큼 이자가 더 붙습니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">3. 거치기간이 전체 기간에 포함되는가?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">20년 대출에 2년 거치가 포함이면 실제 상환기간은 18년입니다. 별도라면 22년이 됩니다. 상품에 따라 다릅니다.</p>
        </div>
      </div>


      {/* 10. 이런 경우 신중하게 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">이런 경우라면 거치기간을 더 신중하게 봐야 합니다</h2>

      <ul className="mt-4 space-y-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>거치 종료 후 소득이 불확실한 경우 — 현재 소득 기준으로만 판단하면 이후 월 상환이 부담될 수 있습니다.</li>
        <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>변동금리 대출인 경우 — 금리가 오르면 거치 후 상환액이 예상보다 크게 뛸 수 있습니다.</li>
        <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>대출 갈아타기를 고려 중인 경우 — 거치기간 중 잔액이 줄지 않으므로 <Link to="/guides/refinance-timing" className="text-[#D97852] font-semibold hover:underline">대환 효과</Link>도 달라질 수 있습니다.</li>
        <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>DSR 한도가 빠듯한 경우 — 거치 종료 후 상환액이 오르면 추가 대출이 어려워질 수 있습니다.</li>
      </ul>


      {/* 11. FAQ */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">자주 묻는 질문</h2>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 거치기간이 있으면 무조건 유리한가요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">아닙니다. 거치기간은 초반 월 납입액을 낮춰줄 수 있지만, 이후 월 상환액과 총이자를 늘릴 수 있습니다. 유리한지는 현재 현금흐름과 거치 종료 후 부담을 함께 봐야 판단할 수 있습니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 20년 대출에 2년 거치면 총 22년 동안 갚는 건가요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">상품마다 다릅니다. 다만 많은 경우 전체 대출기간 안에 거치기간이 포함됩니다. 이 경우 20년 대출에 2년 거치라면 실제 원금 상환 기간은 18년이 될 수 있습니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 거치기간에는 원금을 전혀 못 갚나요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">상품 조건에 따라 다릅니다. 일반적으로는 이자만 납부하는 구조가 많지만, 일부 상품은 중도상환이나 일부 원금 상환이 가능할 수 있습니다. 실제 약정 조건을 확인해야 합니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 대출 거치기간 계산에서 가장 먼저 봐야 할 것은 무엇인가요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">거치기간 중 월 이자, 거치 종료 후 월 납입액, 총이자입니다. 이 세 가지를 같이 봐야 지금은 편하지만 나중에 부담이 커지는 구조인지 확인할 수 있습니다.</p>
        </div>
      </div>


      {/* 12. 결론 + CTA */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">결론</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치기간은 초반의 월 부담을 줄여주는 장치이지, 이자를 줄여주는 장치가 아닙니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        거치가 끝난 뒤 오르는 월 상환액, 그리고 거치 동안 줄지 않은 원금에 쌓이는 이자 — 이 두 가지를 확인하지 않으면, "당장 편하니까 괜찮겠지"라는 판단이 나중에 부담으로 돌아올 수 있습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        <Link to="/guides/loan-interest-calculation" className="text-[#D97852] font-semibold hover:underline">대출 이자 계산 가이드</Link>에서 상환방식별 이자 차이도 함께 확인해보세요.
      </p>

      {/* 마지막 CTA */}
      <div className="mt-10 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-6 text-center">
        <p className="text-[14px] leading-relaxed text-[#5E6E73]">
          거치기간은 초반 부담을 줄여줄 수 있지만, 나중의 월 납입액과 총이자를 키울 수 있습니다.<br />
          대출금, 금리, 기간을 직접 넣어서 내 조건에서는 얼마나 차이 나는지 확인해보세요.
        </p>
        <Link
          to="/credit-loan/calculator"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-5 py-3 text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] active:scale-[0.98]"
        >
          내 조건으로 대출 거치기간 계산하기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
