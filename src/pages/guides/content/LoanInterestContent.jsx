export default function LoanInterestContent() {
  return (
    <>
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">상환 방식 차이</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#5E6E73]">
        <p>대출 상환 방식은 크게 세 가지로 나뉩니다.</p>
        <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6">
          <ul className="space-y-3">
            <li><strong className="text-[#0E2A3A]">원리금균등 상환</strong> — 매월 같은 금액을 갚습니다. 초반에는 이자 비중이 크고, 후반으로 갈수록 원금 비중이 커집니다.</li>
            <li><strong className="text-[#0E2A3A]">원금균등 상환</strong> — 매월 갚는 원금은 같고, 이자는 줄어듭니다. 초반 부담이 크지만 총 이자가 적습니다.</li>
            <li><strong className="text-[#0E2A3A]">만기일시 상환</strong> — 매월 이자만 내고 만기에 원금을 한 번에 갚습니다. 월 부담은 가장 적지만 총 이자가 가장 많습니다.</li>
          </ul>
        </div>
        <p>
          예를 들어, 5,000만 원을 연 5%로 5년간 빌릴 경우,
          원리금균등은 약 660만 원, 원금균등은 약 637만 원, 만기일시는 약 1,250만 원의 이자가 발생합니다.
          같은 조건인데도 상환 방식 하나로 600만 원 넘게 차이가 납니다.
        </p>
      </div>

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
    </>
  );
}
