export default function EarlyRepaymentContent() {
  return (
    <>
      <p className="mt-8 text-[15px] leading-relaxed text-[#5E6E73]">빨리 갚으면 무조건 이득일 것 같지만, 실제로는 그렇지 않을 수 있습니다.<br />만기가 얼마 남지 않은 대출이거나 중도상환수수료가 있는 경우에는 목돈을 넣고도 절감되는 금액이 생각보다 작을 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환은 "빨리 갚느냐"보다 <strong className="text-[#0E2A3A]">실제로 얼마를 아끼느냐</strong>를 먼저 봐야 합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 이미 대출을 이용 중이라면 더 신중하게 계산해야 합니다.<br />같은 1,000만원을 미리 갚아도 어떤 대출은 이자 절감 효과가 크고, 어떤 대출은 거의 차이가 없을 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">결과를 가르는 기준은 대체로 네 가지입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">남은 기간, 금리, 상환 방식, 그리고 중도상환수수료입니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">조기상환, 무엇이 줄어드는 걸까?</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환은 대출 만기 전에 원금의 일부 또는 전부를 미리 갚는 것입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">보통 기대하는 효과는 두 가지입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">첫째, 월 납입액이 줄어드는 것.<br />둘째, 앞으로 낼 총이자가 줄어드는 것입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">하지만 여기서 많이 헷갈리는 부분이 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환을 했다고 해서 항상 월 납입액과 총이자가 같은 방식으로 줄어드는 것은 아닙니다.<br />상품 조건에 따라 월 부담만 낮아질 수도 있고, 월 납입액은 비슷한데 상환 기간이 짧아질 수도 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">결국 중요한 것은 단순히 "미리 갚았다"가 아닙니다.<br />조기상환 이후 대출 구조가 어떻게 바뀌는지를 확인해야 합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이 부분은 금융사 약정이나 상품 설명에서 꼭 확인하는 것이 좋습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">실제로 얼마나 차이 날까?</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">예시로 계산해보겠습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">남은 원금이 3,000만원이고, 남은 기간이 3년인 대출이 있다고 가정해보겠습니다.<br />금리는 연 6%, 상환 방식은 원리금균등상환입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이 경우 조기상환 없이 그대로 유지하면 월 납입액은 약 91만3천원, 남은 총이자는 약 286만8천원 수준입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">여기서 지금 1,000만원을 미리 갚는다고 가정해보겠습니다.<br />남은 원금은 2,000만원으로 줄어듭니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 조건으로 보면 월 납입액은 약 60만9천원 수준으로 내려가고, 남은 총이자는 약 192만4천원 수준으로 줄어듭니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">정리하면 이렇습니다.</p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-5 py-3 text-left font-semibold text-[#0E2A3A]">구분</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">조기상환 전</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">1,000만원 조기상환 후</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">남은 원금</td>
              <td className="px-5 py-3 text-right">3,000만원</td>
              <td className="px-5 py-3 text-right">2,000만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">월 납입액</td>
              <td className="px-5 py-3 text-right">약 91만3천원</td>
              <td className="px-5 py-3 text-right">약 60만9천원</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">남은 총이자</td>
              <td className="px-5 py-3 text-right">약 286만8천원</td>
              <td className="px-5 py-3 text-right">약 192만4천원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이 예시에서는 절감되는 이자가 약 94만원입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">만약 중도상환수수료가 약 10만원 발생한다면, 실제 체감 절감액은 약 84만원 정도로 볼 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">여기서 핵심은 이겁니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">1,000만원을 넣었다고 해서 1,000만원만큼 이득이 생기는 것이 아닙니다.<br />조기상환은 앞으로 낼 이자 중 일부를 줄이는 구조입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 남은 기간이 짧거나 수수료가 크면 효과가 확 줄어들 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환은 남은 원금, 금리, 기간, 수수료에 따라 결과가 달라집니다.<br />내 조건 기준으로 월 납입액과 총이자가 얼마나 달라지는지 먼저 확인해보세요.</p>

      <p className="mt-5 text-[15px] leading-relaxed text-[#5E6E73]">
        {"👉 대출 이자 직접 계산해보기"}
        <br />
        <a href="https://loanclock.com/calculator" className="font-semibold text-[#D97852] underline underline-offset-2 hover:text-[#C96543]">https://loanclock.com/calculator</a>
      </p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">왜 같은 조기상환인데 결과가 달라질까?</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환 효과는 단순히 상환 금액만으로 결정되지 않습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 금액을 미리 갚아도 금리, 남은 기간, 상환 방식에 따라 결과가 달라집니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">금리가 높을수록 절감 효과가 커집니다</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 금액을 미리 갚아도 금리가 높을수록 앞으로 붙을 이자가 많습니다.<br />그래서 절감 효과도 커질 가능성이 높습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">예를 들어 남은 원금 5,000만원, 남은 기간 5년 기준으로 보면 원리금균등상환 대출의 총이자는 금리에 따라 크게 달라질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">연 4%일 때는 총이자가 약 525만원 수준이고, 연 6%일 때는 약 800만원 안팎까지 커질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 원금과 기간이라도 금리 차이만으로 부담이 꽤 달라지는 것입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 금리가 높은 대출일수록 조기상환을 먼저 검토해볼 만합니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">남은 기간이 길수록 미리 갚는 의미가 커집니다</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환이 특히 유리하게 느껴지는 시점은 대출 초반인 경우가 많습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">아직 남은 기간이 길기 때문에 앞으로 낼 이자도 많이 남아 있기 때문입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">반대로 만기 직전이라면 이미 상당 부분을 납부한 상태일 수 있습니다.<br />이 경우 조기상환으로 줄일 수 있는 이자가 크지 않을 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">심리적으로는 "빨리 끝냈다"는 만족감이 있을 수 있습니다.<br />하지만 숫자로 보면 기대보다 절감액이 작을 수 있습니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">상환 방식에 따라 체감이 다릅니다</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">상환 방식도 중요합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">원리금균등상환은 매달 비슷한 금액을 내는 방식입니다.<br />초반에는 이자 비중이 상대적으로 큰 편이라, 대출 초기에 일부 상환했을 때 효과를 체감하는 경우가 많습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">원금균등상환은 매달 갚는 원금이 일정한 방식입니다.<br />초기 월 납입액은 크지만 시간이 갈수록 이자 부담이 줄어드는 구조입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">만기일시상환은 매달 이자만 내다가 만기에 원금을 갚는 방식입니다.<br />원금이 오랫동안 그대로 남아 있기 때문에 중간에 원금을 줄이면 이자 부담이 크게 낮아질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 금액을 조기상환해도 결과가 다른 이유가 바로 여기에 있습니다.<br />금리만 보고 판단하면 놓치기 쉬운 부분입니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">조기상환할 때 많이 틀리는 포인트</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환을 고민할 때 자주 생기는 오해가 있습니다.</p>

      <div className="mt-4 space-y-3">
        {[
          { title: "조기상환은 무조건 이득이라고 생각하는 경우", desc: "남은 기간이 6개월에서 1년 정도로 짧고 금리도 낮다면, 수수료를 제외한 실제 절감액이 크지 않을 수 있습니다." },
          { title: "이미 낸 이자까지 줄어든다고 생각하는 경우", desc: "조기상환은 앞으로 낼 이자를 줄이는 개념입니다. 이미 납부한 이자가 돌아오는 것은 아닙니다." },
          { title: "월 납입액이 줄면 무조건 좋은 선택이라고 보는 경우", desc: "월 부담이 줄어드는 것은 장점일 수 있습니다. 하지만 총이자가 얼마나 줄었는지도 함께 봐야 합니다. 월 납입액만 보고 판단하면 착시가 생기기 쉽습니다." },
          { title: "가진 현금을 전부 상환에 넣는 경우", desc: "수치상 이자를 줄이는 것은 맞더라도, 비상자금이 부족해지면 예상치 못한 지출 때 더 비싼 대출을 다시 써야 할 수 있습니다. 이 경우 절감한 이자보다 더 큰 비용이 생길 수도 있습니다." },
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

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">조기상환이 유리한 경우</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환이 비교적 유리하게 검토되는 경우는 다음과 같습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">금리가 높고, 남은 기간이 길고, 중도상환수수료가 크지 않은 경우입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 대출 초반이거나 만기일시상환처럼 원금이 오래 남아 있는 구조라면 조기상환 효과가 더 크게 나타날 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">또한 조기상환 후에도 생활비와 비상자금이 충분히 남는다면, 일부 상환을 통해 이자 부담을 줄이는 선택을 검토해볼 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">정리하면 다음과 같습니다.</p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-5 py-3 text-left font-semibold text-[#0E2A3A]">조기상환이 유리할 가능성이 큰 경우</th>
              <th className="px-5 py-3 text-left font-semibold text-[#0E2A3A]">이유</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">금리가 높은 대출</td>
              <td className="px-5 py-3">앞으로 붙을 이자가 많기 때문</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">남은 기간이 긴 대출</td>
              <td className="px-5 py-3">줄일 수 있는 이자 기간이 길기 때문</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">수수료가 낮거나 없는 경우</td>
              <td className="px-5 py-3">절감액이 수수료에 덜 깎이기 때문</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-medium text-[#0E2A3A]">비상자금이 충분한 경우</td>
              <td className="px-5 py-3">상환 후 현금 부족 위험이 낮기 때문</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">조기상환이 애매하거나 불리할 수 있는 경우</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">반대로 조기상환이 생각보다 유리하지 않을 수 있는 경우도 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">남은 기간이 짧고, 금리가 낮고, 중도상환수수료가 있는 경우입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이 경우 앞으로 낼 이자 자체가 크지 않기 때문에 수수료를 빼면 실제 절감액이 작을 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">또한 목돈을 조기상환에 모두 넣어버리면 현금 유동성이 떨어집니다.<br />갑자기 병원비, 이사비, 차량 수리비 같은 지출이 생기면 다시 대출을 이용해야 할 수도 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이런 경우에는 조기상환보다 비상자금을 유지하는 것이 더 안전할 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">또 대환대출이나 금리 인하 가능성이 있다면, 단순히 먼저 갚는 것보다 다른 선택지가 더 나을 수도 있습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">결국 무엇을 기준으로 판단하면 될까?</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">판단 기준은 복잡해 보이지만, 실제로는 네 가지를 같이 보면 됩니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">남은 원금이 얼마인지,<br />남은 기간이 얼마나 남았는지,<br />금리가 어느 수준인지,<br />조기상환 과정에서 비용이 드는지입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">여기에 하나를 더 붙이면 더 정확해집니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환 후에도 생활비와 비상자금이 충분히 남는지입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">한 줄로 정리하면 이렇습니다.</p>

      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <p className="font-semibold text-[#0E2A3A]">예상 절감 효과 = 앞으로 줄어드는 이자 - 조기상환 관련 비용</p>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">여기서 앞으로 줄어드는 이자는 금리와 남은 기간에 따라 달라집니다.<br />조기상환 관련 비용은 중도상환수수료나 상품 조건에 따라 달라질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 똑같이 1,000만원을 갚아도 누구는 체감 차이가 크고, 누구는 별 차이가 없다고 느끼는 것입니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">FAQ</h2>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">Q1. 조기상환은 무조건 유리한가요?</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">아닙니다.<br />금리가 높고 남은 기간이 길면 유리할 가능성이 크지만, 중도상환수수료와 현금 여유까지 함께 봐야 합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 만기 가까운 대출은 절감 폭이 기대보다 작을 수 있습니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">Q2. 일부만 미리 갚아도 효과가 있나요?</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">있을 수 있습니다.<br />전액 상환이 아니어도 원금이 줄면 앞으로 붙는 이자가 감소할 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">다만 월 납입액이 줄어드는지, 상환 기간이 짧아지는지는 계약 조건에 따라 다를 수 있습니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">Q3. 어떤 대출부터 먼저 갚는 게 좋나요?</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대체로 금리가 높고 남은 기간이 긴 대출부터 비교해보는 편이 합리적입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">다만 실제 판단은 중도상환수수료, 상환 방식, 비상자금 여유까지 함께 봐야 합니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">조기상환 전, 먼저 숫자로 확인해보세요</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">조기상환이 유리한 경우와 아닌 경우는 생각보다 단순하지 않습니다.<br />하지만 계산 기준은 분명합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">남은 기간, 금리, 수수료, 상환 방식, 그리고 내 현금 여유를 숫자로 놓고 비교하면 됩니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">지금 대출을 유지하는 게 나은지, 일부 상환이 나은지 헷갈린다면 먼저 계산해보세요.<br />직접 숫자로 보면 판단이 훨씬 쉬워집니다.</p>

      <p className="mt-5 text-[15px] leading-relaxed text-[#5E6E73]">
        {"👉 대출 이자 직접 계산해보기"}
        <br />
        <a href="https://loanclock.com/calculator" className="font-semibold text-[#D97852] underline underline-offset-2 hover:text-[#C96543]">https://loanclock.com/calculator</a>
      </p>
    </>
  );
}
