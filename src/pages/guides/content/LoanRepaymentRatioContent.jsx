import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

function FaqJsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld-loan-repayment-ratio";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "월급 대비 대출 상환액은 몇 %면 안전한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "절대적인 기준은 없습니다. 다만 실수령 월급 기준으로 20%대는 조정 여력이 남는 경우가 많고, 30%대 중반부터는 예상 밖 지출에 취약해질 수 있습니다. 주거비와 기존 부채를 함께 봐야 합니다.",
          },
        },
        {
          "@type": "Question",
          name: "대출 상환액은 세전 월급과 실수령 월급 중 무엇으로 계산해야 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "실수령 월급 기준으로 계산하는 편이 현실적입니다. 실제로 대출을 갚고 생활비를 쓰는 돈은 통장에 들어오는 금액이기 때문입니다.",
          },
        },
        {
          "@type": "Question",
          name: "대출 한도가 충분히 나오면 그만큼 빌려도 괜찮나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "대출 한도와 감당 가능한 금액은 다릅니다. 금융사 심사 기준으로 한도가 나와도 내 생활비와 기존 부채를 고려하면 더 적은 금액이 적정할 수 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "월 납입액이 낮으면 좋은 대출인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "항상 그렇지는 않습니다. 대출 기간이 길어져 월 납입액이 낮아진 것이라면 총이자가 늘어날 수 있습니다. 월 납입액과 총이자를 함께 봐야 합니다.",
          },
        },
        {
          "@type": "Question",
          name: "금리가 낮으면 상환 비율은 크게 신경 쓰지 않아도 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "그렇지 않습니다. 금리가 낮아도 대출금액이 크거나 기존 지출이 많으면 월 현금흐름은 빠듯해질 수 있습니다.",
          },
        },
      ],
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-jsonld-loan-repayment-ratio");
      if (el) el.remove();
    };
  }, []);
  return null;
}

export default function LoanRepaymentRatioContent() {
  return (
    <>
      <FaqJsonLd />

      {/* 도입부 */}
      <p className="mt-8 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출을 알아볼 때 많은 사람들이 먼저 보는 건 한도입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        "얼마까지 빌릴 수 있지?" "내 신용으로 몇 천만원까지 가능하지?"
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        그런데 실제로 더 중요한 질문은 따로 있습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        <strong className="text-[#0E2A3A]">"내 월급 안에서 매달 무리 없이 갚을 수 있을까?"</strong>
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출 한도는 금융사가 정하는 숫자에 가깝지만, 상환 부담은 내 통장에서 매달 직접 빠져나가는 현실입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        예를 들어 실수령 월급이 350만원이라면 월급의 20%는 70만원, 35%는 122만5천원입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        비율 차이는 15%포인트지만, 실제 금액으로는 매달 52만5천원이 더 빠져나갑니다. 1년이면 630만원 차이입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        이 정도면 단순한 숫자 차이가 아니라 <strong className="text-[#0E2A3A]">생활 여유의 차이</strong>입니다.
      </p>

      {/* 요약 박스 */}
      <div className="mt-8 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-5">
        <p className="text-[13px] font-bold text-[#0E2A3A] tracking-wide mb-3">이 글에서 알 수 있는 것</p>
        <ul className="space-y-2 text-[14px] leading-relaxed text-[#5E6E73]">
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>월급 대비 대출 상환액 적정 비율을 계산하는 방법</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>실수령 월급 250만~400만원 기준 20%와 35% 차이</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>대출 상환액이 생활비와 저축에 미치는 영향</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>대출 한도보다 월 현금흐름이 중요한 이유</li>
          <li className="flex gap-2"><span className="shrink-0 text-[#D97852] font-bold">·</span>대출 상환 비율을 계산할 때 자주 하는 실수</li>
        </ul>
      </div>


      {/* 계산 방법 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">월급 대비 대출 상환액은 어떻게 계산할까?</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        계산식은 단순합니다.
      </p>

      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
        <p className="text-[14px] font-semibold text-[#0E2A3A] text-center">
          월급 대비 대출 상환 비율 = 매달 갚는 원금과 이자 ÷ 실수령 월급 × 100
        </p>
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        여기서 기준은 세전 월급보다 <strong className="text-[#0E2A3A]">실수령 월급</strong>으로 잡는 편이 현실적입니다.
        대출 상환은 세전 연봉으로 하는 게 아니라 실제 통장에 들어온 돈으로 하기 때문입니다.
      </p>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        예를 들어 실수령 월급이 350만원이고 매달 대출 원리금으로 70만원을 갚는다면,
      </p>
      <div className="mt-3 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
        <p className="text-[14px] text-[#5E6E73]">70만원 ÷ 350만원 × 100 = <strong className="text-[#0E2A3A]">20%</strong></p>
        <p className="mt-2 text-[14px] text-[#5E6E73]">즉, 월급의 20%를 대출 상환에 쓰는 상태입니다.</p>
      </div>

      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        반대로 매달 122만5천원을 갚는다면,
      </p>
      <div className="mt-3 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
        <p className="text-[14px] text-[#5E6E73]">122만5천원 ÷ 350만원 × 100 = <strong className="text-[#D97852]">35%</strong></p>
        <p className="mt-2 text-[14px] text-[#5E6E73]">같은 월급이라도 체감 부담은 꽤 달라집니다.</p>
      </div>


      {/* 비교표 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">실수령 월급별 20%와 35% 상환액 비교</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        아래 표를 보면 차이가 더 분명합니다.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-4 py-3 text-left font-semibold text-[#0E2A3A] whitespace-nowrap">실수령 월급</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A] whitespace-nowrap">20% 상환액</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A] whitespace-nowrap">35% 상환액</th>
              <th className="px-4 py-3 text-right font-semibold text-[#D97852] whitespace-nowrap">월 차이</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">250만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">50만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">87만5천원</td>
              <td className="px-4 py-3 text-right text-[#D97852] font-semibold whitespace-nowrap">37만5천원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">300만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">60만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">105만원</td>
              <td className="px-4 py-3 text-right text-[#D97852] font-semibold whitespace-nowrap">45만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">350만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">70만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">122만5천원</td>
              <td className="px-4 py-3 text-right text-[#D97852] font-semibold whitespace-nowrap">52만5천원</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">400만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">80만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">140만원</td>
              <td className="px-4 py-3 text-right text-[#D97852] font-semibold whitespace-nowrap">60만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        20%와 35%는 단순한 비율 차이가 아닙니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        월 40만~60만원 차이는 식비, 교통비, 보험료, 통신비, 저축액 중 하나가 통째로 달라질 수 있는 금액입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출 상환액은 한두 달 내고 끝나는 돈이 아닙니다.
        보통 몇 년 동안 매달 반복해서 빠져나가는 고정지출입니다.
        그래서 대출을 볼 때는 <strong className="text-[#0E2A3A]">"이번 달 낼 수 있나"보다 "몇 년 동안 버틸 수 있나"</strong>를 봐야 합니다.
      </p>


      {/* 체감 차이 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">20%와 35%는 왜 체감이 다를까?</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        20% 수준의 대출 상환액은 생활비와 저축을 조정해볼 여지가 남는 경우가 많습니다.
        물론 주거비가 높거나 기존 부채가 있다면 20%도 부담스러울 수 있습니다.
        하지만 일반적으로는 월급 안에서 관리 가능한 범위로 느껴지는 경우가 많습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        반면 <strong className="text-[#0E2A3A]">30%를 넘기기 시작하면 예상 밖 지출에 취약해질 수 있습니다.</strong>
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        예를 들어 실수령 월급이 350만원인 사람이 있다고 가정해보겠습니다.
        주거비 80만원, 보험료와 통신비 등 고정지출 40만원이 있다면 이미 매달 120만원이 나갑니다.
      </p>

      <div
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        role="group"
        aria-label="실수령 350만원 기준 20%와 35% 상환 시 남는 돈 비교"
      >
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-5">
          <p className="text-[13px] font-bold text-[#10353F] tracking-wide">상환 비율 20%</p>
          <p className="mt-3 text-[2rem] font-extrabold text-[#0E2A3A] leading-none">160<span className="text-[1rem] font-semibold text-[#5E6E73]">만원 남음</span></p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#5E6E73]">
            <p>월급 350만원 − 고정지출 120만원 − 상환 70만원</p>
            <p>식비·교통비·저축 조정 여지가 남는 편</p>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-[#D97852]/30 bg-white px-5 py-5">
          <p className="text-[13px] font-bold text-[#D97852] tracking-wide">상환 비율 35%</p>
          <p className="mt-3 text-[2rem] font-extrabold text-[#D97852] leading-none">107.5<span className="text-[1rem] font-semibold text-[#5E6E73]">만원 남음</span></p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#5E6E73]">
            <p>월급 350만원 − 고정지출 120만원 − 상환 122.5만원</p>
            <p>병원비·경조사비 등 변수에 취약해질 수 있음</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        계산상으로는 둘 다 가능해 보일 수 있습니다.
        하지만 실제 생활에서는 병원비, 경조사비, 차량 수리비, 이사비, 카드값 같은 변수가 생깁니다.
        이때 남는 돈이 적으면 대출은 단순한 고정지출이 아니라 <strong className="text-[#0E2A3A]">압박으로 느껴질 수 있습니다.</strong>
      </p>


      {/* 적정 비율 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">대출 상환액은 월급의 몇 %까지 괜찮을까?</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        정답처럼 딱 잘라 말할 수 있는 비율은 없습니다.
        같은 월급이라도 사람마다 상황이 다릅니다.
        주거비가 낮은 사람과 높은 사람, 기존 대출이 없는 사람과 있는 사람, 혼자 사는 사람과 가족을 부양하는 사람의 적정 비율은 다를 수밖에 없습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        다만 현실적으로는 아래처럼 생각해볼 수 있습니다.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-4 py-3 text-left font-semibold text-[#0E2A3A] whitespace-nowrap">월급 대비 상환 비율</th>
              <th className="px-4 py-3 text-left font-semibold text-[#0E2A3A]">체감 부담</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">10%대</td>
              <td className="px-4 py-3">비교적 여유가 남는 편</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">20%대</td>
              <td className="px-4 py-3">관리 가능한 구간일 수 있음</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">30%대</td>
              <td className="px-4 py-3">고정지출이 크면 부담이 커질 수 있음</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-[#D97852] whitespace-nowrap">35% 이상</td>
              <td className="px-4 py-3">예상 밖 지출에 취약해질 수 있음</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        중요한 건 이 표를 절대 기준으로 보는 게 아닙니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        내 월급에서 고정지출을 빼고, 기존 부채를 더한 뒤, 새 대출 상환액을 넣어도 버틸 수 있는지가 핵심입니다.
        <strong className="text-[#0E2A3A]">대출 한도보다 중요한 숫자는 결국 매달 남는 돈</strong>입니다.
      </p>


      {/* 확인 항목 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">대출 상환액 계산 전에 꼭 봐야 할 것</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출 상환 비율을 볼 때는 새로 받을 대출만 보면 안 됩니다.
        이미 나가고 있는 돈을 같이 봐야 합니다.
      </p>

      <div className="mt-4 space-y-3">
        {[
          "실수령 월급",
          "월세 또는 주거비",
          "보험료, 통신비, 교통비",
          "식비와 생활비",
          "기존 대출 상환액",
          "자동차 할부나 카드 할부",
          "비상금으로 남겨둘 금액",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10353F]/8 text-[12px] font-bold text-[#10353F]">{i + 1}</span>
            <span className="text-[14px] text-[#5E6E73]">{item}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        이걸 빼고 보면 대출 상환액이 작아 보일 수 있습니다.
        하지만 실제 통장에서는 모든 돈이 한꺼번에 빠져나갑니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        그래서 대출을 받을 때는 "이자율이 몇 %인가"만 보지 말고 <strong className="text-[#0E2A3A]">"월급에서 얼마가 남는가"</strong>를 같이 봐야 합니다.
      </p>

      {/* 중간 CTA */}
      <div className="mt-10 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-6 text-center">
        <p className="text-[14px] leading-relaxed text-[#5E6E73]">
          월급 안에서 실제로 감당 가능한 상환액인지 확인해보세요.<br />
          대출금, 금리, 기간을 넣으면 월 납입액을 바로 계산할 수 있습니다.
        </p>
        <Link
          to="/credit-loan/calculator"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-5 py-3 text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] active:scale-[0.98]"
        >
          내 조건으로 월 납입액 계산하기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>


      {/* 금액별 비교 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">3,000만원과 5,000만원은 월급 대비 부담이 다릅니다</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        실수령 월급 350만원 기준으로 단순 예시를 보겠습니다.
        5년 원리금균등상환 기준이며, 실제 결과는 금리, 신용도, 금융사, 상환 방식에 따라 달라질 수 있습니다.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-4 py-3 text-left font-semibold text-[#0E2A3A] whitespace-nowrap">대출금액</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A] whitespace-nowrap">금리</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A] whitespace-nowrap">기간</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A] whitespace-nowrap">월 상환액</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A] whitespace-nowrap">월급 대비</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">3,000만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">연 5%</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">5년</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">약 57만원</td>
              <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">약 16%</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-[#0E2A3A] whitespace-nowrap">5,000만원</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">연 5%</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">5년</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">약 94만원</td>
              <td className="px-4 py-3 text-right font-semibold text-[#D97852] whitespace-nowrap">약 27%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        3,000만원 대출은 월급 대비 약 16% 수준입니다. 이 정도만 보면 관리 가능한 범위로 느껴질 수 있습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        하지만 5,000만원으로 올라가면 약 27% 수준까지 올라갑니다.
        월급의 4분의 1 이상이 대출 상환으로 빠져나가는 구조입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        여기에 주거비, 보험료, 통신비, 식비, 교통비가 더해지면 체감 부담은 더 커질 수 있습니다.
        대출금액이 늘어날수록 중요한 건 금리만이 아닙니다.
        <strong className="text-[#0E2A3A]">월급에서 실제로 남는 돈이 얼마나 되는지</strong>를 봐야 합니다.
      </p>


      {/* 실수 5가지 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">많이 하는 실수 5가지</h2>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">1. 세전 월급으로 계산한다</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">대출 상환 비율은 실수령 월급 기준으로 보는 편이 현실적입니다. 세전 월급으로 계산하면 감당 가능해 보일 수 있지만, 실제 통장 잔고는 다를 수 있습니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">2. 기존 부채를 빼놓고 본다</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">새 대출만 따로 보면 숫자가 작아 보입니다. 하지만 자동차 할부, 카드론, 학자금대출, 마이너스통장 이자도 결국 같은 월급에서 나갑니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">3. 보너스와 성과급을 고정수입처럼 본다</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">보너스는 들어오면 도움이 됩니다. 하지만 매달 반드시 들어오는 돈이 아니라면 고정 상환액 계산에서는 제외하는 편이 안전합니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">4. 월 납입액만 보고 총이자를 보지 않는다</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">월 납입액이 낮아 보이면 마음이 편해집니다. 하지만 기간이 길어져서 총이자가 늘어날 수 있습니다. 월 부담과 총이자를 같이 봐야 합니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">5. 대출 한도를 내 적정 한도로 착각한다</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">대출 가능 금액과 감당 가능한 금액은 다릅니다. 한도가 나온다고 해서 생활이 편하다는 뜻은 아닙니다. 금융사가 보는 기준과 내 생활비 구조는 다를 수 있습니다.</p>
        </div>
      </div>


      {/* 빠른 판단 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">빠르게 판단하는 방법</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출을 고민 중이라면 아래 순서로 확인해보세요.
      </p>

      <div className="mt-4 space-y-3">
        {[
          "실수령 월급을 적는다.",
          "매달 고정지출을 뺀다.",
          "기존 대출과 할부 상환액을 더한다.",
          "새 대출 월 납입액을 넣어본다.",
          "비상지출이 생겨도 버틸 수 있는지 본다.",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D97852]/10 text-[12px] font-bold text-[#D97852]">{i + 1}</span>
            <span className="text-[14px] text-[#5E6E73]">{item}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        이렇게 계산했을 때 매달 남는 돈이 너무 적다면 대출금액이나 기간을 다시 조정하는 게 좋습니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        <strong className="text-[#0E2A3A]">대출은 승인보다 유지가 더 중요합니다.</strong>{" "}
        처음 실행할 때는 괜찮아 보여도, 몇 달 뒤 생활비가 부족해지면 부담이 커질 수 있습니다.
      </p>


      {/* 정리 */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">정리하면</h2>

      <p className="mt-4 text-[15px] leading-[1.8] text-[#5E6E73]">
        월급 대비 대출 상환액은 세전이 아니라 <strong className="text-[#0E2A3A]">실수령 기준</strong>으로 보는 편이 현실적입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        20%와 35%의 차이는 단순한 비율 차이가 아닙니다.
        실수령 350만원 기준으로 20%는 70만원, 35%는 122만5천원입니다.
        두 금액의 차이는 매달 52만5천원, 1년이면 630만원입니다.
      </p>
      <p className="mt-3 text-[15px] leading-[1.8] text-[#5E6E73]">
        대출 한도보다 중요한 건 <strong className="text-[#0E2A3A]">매달 버틸 수 있는 상환액</strong>입니다.
        같은 금액을 빌려도 기존 지출, 부채, 주거비, 상환 기간에 따라 체감 부담은 완전히 달라질 수 있습니다.
      </p>

      {/* 마지막 CTA */}
      <div className="mt-10 rounded-2xl border border-[#E5E1DA] bg-white px-5 py-6 text-center">
        <p className="text-[14px] leading-relaxed text-[#5E6E73]">
          대출금, 금리, 기간을 넣으면 월 납입액과 총이자를 바로 확인할 수 있습니다.<br />
          내 조건에서 실제 부담이 어느 정도인지 직접 계산해보세요.
        </p>
        <Link
          to="/credit-loan/calculator"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-5 py-3 text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] active:scale-[0.98]"
        >
          월 납입액과 총이자 확인하기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>


      {/* FAQ */}
      <h2 className="mt-14 text-[1.25rem] font-bold text-[#0E2A3A] sm:text-[1.4rem]">자주 묻는 질문</h2>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 월급 대비 대출 상환액은 몇 %면 안전한가요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">절대적인 기준은 없습니다. 다만 실수령 월급 기준으로 20%대는 조정 여력이 남는 경우가 많고, 30%대 중반부터는 예상 밖 지출에 취약해질 수 있습니다. 주거비와 기존 부채를 함께 봐야 합니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 대출 상환액은 세전 월급과 실수령 월급 중 무엇으로 계산해야 하나요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">실수령 월급 기준으로 계산하는 편이 현실적입니다. 실제로 대출을 갚고 생활비를 쓰는 돈은 통장에 들어오는 금액이기 때문입니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 대출 한도가 충분히 나오면 그만큼 빌려도 괜찮나요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">대출 한도와 감당 가능한 금액은 다릅니다. 금융사 심사 기준으로 한도가 나와도 내 생활비와 기존 부채를 고려하면 더 적은 금액이 적정할 수 있습니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 월 납입액이 낮으면 좋은 대출인가요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">항상 그렇지는 않습니다. 대출 기간이 길어져 월 납입액이 낮아진 것이라면 총이자가 늘어날 수 있습니다. 월 납입액과 총이자를 함께 봐야 합니다.</p>
        </div>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4">
          <p className="text-[14px] font-bold text-[#0E2A3A]">Q. 금리가 낮으면 상환 비율은 크게 신경 쓰지 않아도 되나요?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5E6E73]">그렇지 않습니다. 금리가 낮아도 대출금액이 크거나 기존 지출이 많으면 월 현금흐름은 빠듯해질 수 있습니다.</p>
        </div>
      </div>


      {/* 관련 글 */}
      <div className="mt-14">
        <h3 className="text-base font-bold text-[#0E2A3A]">관련 글</h3>
        <div className="mt-4 space-y-3">
          <Link
            to="/guides/loan-interest-calculation"
            className="block rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4 text-[14px] text-[#5E6E73] hover:border-[#D5D0C8] hover:shadow-md transition-all"
          >
            <span className="font-semibold text-[#0E2A3A]">대출 이자 계산, 1억 빌리면 실제로 얼마나 차이 날까?</span>
            <span className="mt-1 block text-[13px]">같은 1억 대출인데도 상환 방식만 바꾸면 총이자가 800만원 이상 차이 날 수 있습니다.</span>
          </Link>
          <Link
            to="/guides/credit-loan-limit-50000000-income"
            className="block rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4 text-[14px] text-[#5E6E73] hover:border-[#D5D0C8] hover:shadow-md transition-all"
          >
            <span className="font-semibold text-[#0E2A3A]">신용대출 한도 계산, 연봉 5,000만원이면 얼마까지 가능할까?</span>
            <span className="mt-1 block text-[13px]">연봉 5,000만원 기준 신용대출 한도가 왜 사람마다 달라지는지 쉽게 계산해봅니다.</span>
          </Link>
          <Link
            to="/guides/early-repayment-good-or-bad"
            className="block rounded-2xl border border-[#E5E1DA] bg-white px-5 py-4 text-[14px] text-[#5E6E73] hover:border-[#D5D0C8] hover:shadow-md transition-all"
          >
            <span className="font-semibold text-[#0E2A3A]">조기상환이 유리한 경우와 아닌 경우, 이자 차이 계산해보니</span>
            <span className="mt-1 block text-[13px]">조기상환이 항상 유리한 것은 아닙니다. 남은 기간, 금리, 수수료에 따라 실제 이자 절감액이 달라집니다.</span>
          </Link>
          {/* TODO: 아래 관련글은 발행 후 경로 추가 필요
            - 대출 여러 개 갚는 순서, 카드론·마이너스통장·신용대출 뭐부터?
            - 신용대출 vs 마이너스통장 차이, 직장인 3천만원 기준 비교
            - 대출 이자 말고 또 나가는 돈? 실행 전 확인할 비용 6가지
          */}
        </div>
      </div>


      {/* 면책 */}
      <p className="mt-10 text-[13px] leading-relaxed text-[#7A868B]">
        ※ 이 글은 일반적인 금융 정보 정리이며, 특정 대출 상품을 권유하는 내용이 아닙니다.
        실제 대출 가능 여부와 금리, 상환 조건은 개인 신용도, 금융사 심사 기준, 상품 조건에 따라 달라질 수 있습니다.
      </p>
    </>
  );
}
