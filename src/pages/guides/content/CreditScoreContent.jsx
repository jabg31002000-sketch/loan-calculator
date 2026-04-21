export default function CreditScoreContent() {
  return (
    <>
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">신용점수란?</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
        <p>신용점수는 개인의 금융 거래 이력을 바탕으로 산출되는 점수입니다. 한국에서는 NICE(나이스)와 KCB(올크레딧) 두 곳에서 각각 산정하며, 1~1,000점 범위로 표시됩니다.</p>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6">
          <ul className="space-y-2 text-sm text-[#5E6E73]">
            <li><strong className="text-[#0E2A3A]">900점 이상:</strong> 최우수 등급 — 최저 금리 적용 가능</li>
            <li><strong className="text-[#0E2A3A]">800~899점:</strong> 우수 등급 — 대부분의 대출 상품 이용 가능</li>
            <li><strong className="text-[#0E2A3A]">700~799점:</strong> 양호 등급 — 일부 우대금리 제한</li>
            <li><strong className="text-[#0E2A3A]">600~699점:</strong> 보통 등급 — 금리 상승, 한도 제한 가능</li>
            <li><strong className="text-[#0E2A3A]">600점 미만:</strong> 저신용 등급 — 대출 승인 자체가 어려울 수 있음</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">금리와 한도에 미치는 영향</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
        <p>금융기관은 신용점수를 기반으로 대출 금리를 차등 적용합니다. 신용점수가 높을수록 낮은 금리를 받을 수 있고, 대출 한도도 더 넉넉하게 산정됩니다.</p>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6">
          <p className="font-semibold text-[#0E2A3A]">실제 차이 예시</p>
          <p className="mt-2 text-sm text-[#5E6E73]">신용대출 3,000만 원 기준, 신용점수 900점대는 연 4.5%, 700점대는 연 7.0%가 적용될 수 있습니다. 5년 상환 시 총 이자 차이는 약 200만 원 이상입니다.</p>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">신용점수 관리 방법</h2>
      <div className="mt-4 space-y-3">
        {[
          { title: "카드 대금은 반드시 결제일에 납부", desc: "연체 이력은 신용점수에 가장 큰 악영향을 줍니다." },
          { title: "신용카드 사용액은 한도의 30% 이하로 유지", desc: "카드 한도 대비 사용 비율이 높으면 점수가 떨어질 수 있습니다." },
          { title: "통신비, 건강보험료 등 정기 납부 실적 쌓기", desc: "비금융 거래 실적도 점수에 반영됩니다." },
          { title: "불필요한 대출 조회 자제", desc: "단기간에 여러 곳에 대출 조회를 하면 점수에 부정적 영향이 있을 수 있습니다." },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 rounded-2xl border border-[#E5E1DA] bg-white p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8 text-sm font-bold text-[#10353F]">{i + 1}</span>
            <div>
              <p className="font-semibold text-[#0E2A3A]">{item.title}</p>
              <p className="mt-1 text-sm text-[#5E6E73]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">자주 하는 실수</h2>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-3 text-[15px] leading-relaxed text-[#5E6E73]">
          <li><strong className="text-[#0E2A3A]">신용카드를 아예 안 쓰는 것</strong> — 거래 이력이 없으면 오히려 점수 산정에 불리합니다.</li>
          <li><strong className="text-[#0E2A3A]">현금서비스/리볼빙 이용</strong> — 신용점수를 크게 낮추는 요인입니다.</li>
          <li><strong className="text-[#0E2A3A]">연체 후 바로 갚으면 괜찮다는 착각</strong> — 연체 이력은 갚더라도 일정 기간 기록에 남습니다.</li>
          <li><strong className="text-[#0E2A3A]">여러 곳에 동시 대출 신청</strong> — 단기간 다수의 대출 조회는 점수에 부정적입니다.</li>
        </ul>
      </div>
    </>
  );
}
