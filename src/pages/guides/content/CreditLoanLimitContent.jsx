export default function CreditLoanLimitContent() {
  return (
    <>
      <p className="mt-8 text-[15px] leading-relaxed text-[#5E6E73]">연봉이 5,000만원이면 신용대출도 비슷하게 나올 것 같지만, 실제 한도는 사람마다 꽤 다릅니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">어떤 사람은 생각보다 넉넉하게 나오고, 어떤 사람은 "이 정도밖에 안 돼?" 싶을 만큼 줄어듭니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">차이는 보통 연봉 자체보다 <strong className="text-[#0E2A3A]">이미 나가고 있는 돈</strong>에서 갈립니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">자동차 할부, 카드론, 마이너스통장, 기존 신용대출이 있으면 같은 연봉이어도 새로 받을 수 있는 신용대출 한도는 크게 달라질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 신용대출 한도 계산은 단순히 "연봉이 얼마인가"를 보는 게 아니라, <strong className="text-[#0E2A3A]">내가 앞으로 더 갚을 수 있는 여력이 얼마나 남았는지</strong>를 확인하는 과정에 가깝습니다.</p>

      {/* 빠르게 정리하면 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">빠르게 정리하면</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">연봉 5,000만원이라고 해서 신용대출 한도가 똑같이 나오는 것은 아닙니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">한도에 영향을 주는 핵심은 보통 아래 요소들입니다.</p>

      <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#5E6E73]">
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />연소득</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />기존대출 상환액</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />신용점수</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />재직기간</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />소득 증빙 방식</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />대출 금리</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />상환기간</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />금융사 내부 심사 기준</li>
      </ul>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 기존대출이 많으면 연봉이 같아도 새 대출 한도는 줄어들 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">반대로 기존대출이 적고 신용상태가 안정적이면 같은 연봉에서도 더 높은 한도가 나올 가능성이 있습니다.</p>

      {/* 연봉만으로 정해지지 않는 이유 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">신용대출 한도는 왜 연봉만으로 정해지지 않을까?</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출 한도를 볼 때 자주 나오는 개념이 DSR입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">쉽게 말하면, 1년 동안 갚아야 하는 원금과 이자가 연소득에서 얼마나 차지하는지를 보는 방식입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">정확한 심사 기준은 금융사와 상품에 따라 달라질 수 있지만, 대략적인 구조는 이렇게 이해하면 쉽습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]"><strong className="text-[#0E2A3A]">연소득에서 감당 가능한 연간 상환액을 보고, 기존대출 상환액을 뺀 뒤, 남은 상환 여력으로 새 대출 가능 금액을 추정하는 방식입니다.</strong></p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">예를 들어 연봉이 5,000만원이고, 이해를 돕기 위해 연간 상환 가능 비율을 40%로 가정해보겠습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이 경우 1년에 감당 가능한 총 상환액은 약 2,000만원입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그런데 이미 자동차 할부와 기존대출로 1년에 600만원을 갚고 있다면, 새 대출에 쓸 수 있는 상환 여력은 약 1,400만원으로 줄어듭니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">연봉은 그대로인데 한도가 달라지는 이유가 바로 여기 있습니다.</p>

      {/* 기존대출별 한도 차이 예시 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">연봉 5,000만원 기준, 기존대출별 한도 차이 예시</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">아래 계산은 이해를 돕기 위한 단순 예시입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">실제 신용대출 한도는 DSR, 신용점수, 재직기간, 소득 인정 방식, 금융사 내부 기준, 보유 대출 종류에 따라 달라질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">가정 조건은 다음과 같습니다.</p>

      <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#5E6E73]">
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />연소득: 5,000만원</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />연간 상환 가능액 가정: 2,000만원</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />새 대출 조건: 5년 상환, 연 5%</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />상환 방식: 원리금균등상환 기준 단순 환산</li>
      </ul>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A]">기존대출 연 상환액</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A]">새 대출에 쓸 수 있는 연 상환 여력</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A]">월 상환 여력</th>
              <th className="px-4 py-3 text-right font-semibold text-[#0E2A3A]">예상 가능 금액 예시</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 text-right">0원</td>
              <td className="px-4 py-3 text-right">약 2,000만원</td>
              <td className="px-4 py-3 text-right">약 166만원</td>
              <td className="px-4 py-3 text-right font-medium text-[#0E2A3A]">약 8,800만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 text-right">300만원</td>
              <td className="px-4 py-3 text-right">약 1,700만원</td>
              <td className="px-4 py-3 text-right">약 141만원</td>
              <td className="px-4 py-3 text-right font-medium text-[#0E2A3A]">약 7,500만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 text-right">600만원</td>
              <td className="px-4 py-3 text-right">약 1,400만원</td>
              <td className="px-4 py-3 text-right">약 116만원</td>
              <td className="px-4 py-3 text-right font-medium text-[#0E2A3A]">약 6,100만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-4 py-3 text-right">900만원</td>
              <td className="px-4 py-3 text-right">약 1,100만원</td>
              <td className="px-4 py-3 text-right">약 91만원</td>
              <td className="px-4 py-3 text-right font-medium text-[#0E2A3A]">약 4,800만원</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-right">1,200만원</td>
              <td className="px-4 py-3 text-right">약 800만원</td>
              <td className="px-4 py-3 text-right">약 66만원</td>
              <td className="px-4 py-3 text-right font-medium text-[#0E2A3A]">약 3,500만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-[#5E6E73]">이 표에서 중요한 건 숫자 자체보다 방향입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 연봉 5,000만원이어도 기존대출 상환액이 많아질수록 새 대출에 쓸 수 있는 상환 여력이 줄어듭니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">예를 들어 기존대출 연 상환액이 300만원인 사람과 900만원인 사람은 연봉이 같아도 상환 여력이 600만원 차이납니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이를 5년 상환 기준으로 보면 예상 가능 금액이 수천만원까지 차이 날 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 신용대출 한도 계산을 할 때는 "연봉 몇 배까지 가능할까?"보다 <strong className="text-[#0E2A3A]">기존대출 때문에 이미 얼마를 갚고 있는지</strong>를 먼저 봐야 합니다.</p>

      {/* 같은 연봉이어도 한도가 달라지는 이유 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">같은 연봉이어도 한도가 달라지는 대표적인 이유</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출 한도는 여러 요소가 함께 반영됩니다.</p>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">1. 기존대출이 많을 때</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">자동차 할부, 카드론, 현금서비스, 마이너스통장, 기존 신용대출이 있으면 한도에 영향을 줄 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 매달 나가는 상환액이 크면 새 대출을 갚을 여력이 줄어든 것으로 볼 수 있습니다.</p>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">2. 신용점수가 낮거나 연체 이력이 있을 때</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">연봉이 높아도 신용점수가 낮거나 최근 연체 이력이 있으면 한도와 금리에 불리하게 작용할 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">반대로 신용점수가 안정적이고 연체 이력이 없다면 같은 소득에서도 조건이 더 좋아질 수 있습니다.</p>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">3. 재직기간이 짧을 때</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">연봉이 같아도 재직기간이 짧으면 소득 안정성이 낮게 평가될 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 이직 직후이거나 소득 증빙 기간이 짧은 경우에는 실제 한도에 차이가 생길 수 있습니다.</p>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">4. 소득 인정 방식이 다를 때</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">세전 연봉, 실수령액, 성과급, 상여금, 프리랜서 소득 등은 금융사마다 인정 방식이 다를 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 5,000만원이라고 해도 어떤 소득이 얼마나 안정적으로 인정되는지에 따라 결과가 달라질 수 있습니다.</p>

      {/* 5,000만원 빌리면 월 납입액 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">5,000만원을 빌리면 월 납입액은 어느 정도일까?</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출 한도를 볼 때는 가능 금액만 보면 안 됩니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">실제로 매달 갚을 수 있는지도 함께 확인해야 합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이번에는 5,000만원을 5년 동안 원리금균등상환으로 갚는다고 가정해보겠습니다.</p>

      <p className="mt-4 text-[13px] leading-relaxed text-[#7A868B]">아래 계산은 이해를 돕기 위한 예시입니다.</p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">금리</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">월 납입액</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">총이자</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 text-right font-medium text-[#0E2A3A]">연 4%</td>
              <td className="px-5 py-3 text-right">약 92만원</td>
              <td className="px-5 py-3 text-right">약 525만원</td>
            </tr>
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 text-right font-medium text-[#0E2A3A]">연 5%</td>
              <td className="px-5 py-3 text-right">약 94만원</td>
              <td className="px-5 py-3 text-right">약 661만원</td>
            </tr>
            <tr>
              <td className="px-5 py-3 text-right font-medium text-[#0E2A3A]">연 6%</td>
              <td className="px-5 py-3 text-right">약 97만원</td>
              <td className="px-5 py-3 text-right">약 800만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-[#5E6E73]">표만 보면 월 납입액 차이는 생각보다 작아 보일 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">하지만 총이자로 보면 이야기가 달라집니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">연 4%와 연 6%는 월 납입액 차이가 몇만원 수준처럼 보이지만, 5년 전체로 보면 총이자가 약 270만원 이상 차이날 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">즉, 한도만 보고 대출을 받으면 안 됩니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]"><strong className="text-[#0E2A3A]">대출 가능 금액, 월 납입액, 총이자</strong>를 함께 봐야 실제 부담을 알 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">내 조건으로 월 납입액과 총이자를 먼저 확인하고 싶다면 계산기로 직접 비교해보는 게 가장 빠릅니다.</p>

      <div className="mt-4 rounded-2xl border border-[#D97852]/30 bg-[#D97852]/5 p-5">
        <a href="https://www.loanclock.com/calculator" className="inline-block text-[15px] font-semibold text-[#D97852] underline underline-offset-2 hover:text-[#C96543]">대출 이자 직접 계산해보기 &rarr;</a>
      </div>

      {/* 상환기간이 길어지면 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">상환기간이 길어지면 한도가 커져 보이는 이유</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출 한도 계산에서 또 하나 중요한 것이 상환기간입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 5,000만원을 연 5%로 빌려도 기간에 따라 월 부담이 달라집니다.</p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E5E1DA] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1DA] bg-[#F6F1EB]/50">
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">상환기간</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">월 납입액</th>
              <th className="px-5 py-3 text-right font-semibold text-[#0E2A3A]">총이자</th>
            </tr>
          </thead>
          <tbody className="text-[#5E6E73]">
            <tr className="border-b border-[#E5E1DA]/60">
              <td className="px-5 py-3 text-right font-medium text-[#0E2A3A]">3년</td>
              <td className="px-5 py-3 text-right">약 150만원</td>
              <td className="px-5 py-3 text-right">약 395만원</td>
            </tr>
            <tr>
              <td className="px-5 py-3 text-right font-medium text-[#0E2A3A]">5년</td>
              <td className="px-5 py-3 text-right">약 94만원</td>
              <td className="px-5 py-3 text-right">약 661만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-[#5E6E73]">3년 상환은 월 납입액이 큽니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대신 총이자는 상대적으로 적습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">5년 상환은 월 납입액이 낮아집니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대신 총이자는 더 늘어납니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">여기서 착시가 생깁니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">상환기간을 길게 잡으면 월 납입액이 줄어들기 때문에 계산상 가능한 한도가 커져 보일 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">하지만 실제로는 오래 갚는 만큼 총이자가 늘어날 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 신용대출 한도를 볼 때는 "얼마까지 가능하냐"보다 <strong className="text-[#0E2A3A]">그 금액을 몇 년 동안 갚아야 하느냐</strong>를 같이 봐야 합니다.</p>

      {/* 한도보다 중요한 건 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">한도보다 중요한 건 월 납입 가능성입니다</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출을 알아볼 때 많은 분들이 한도부터 봅니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">물론 한도는 중요합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">하지만 실제로 더 중요한 건 <strong className="text-[#0E2A3A]">매달 무리 없이 갚을 수 있는지</strong>입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">예를 들어 7,000만원까지 가능하다고 해도 월 납입액이 생활비를 압박한다면 좋은 조건이라고 보기 어렵습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">반대로 한도는 조금 낮아도 월 납입액이 안정적으로 감당 가능하다면 더 안전한 선택일 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출은 집을 담보로 잡는 대출이 아니라, 개인의 신용과 상환능력을 바탕으로 받는 대출입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 대출을 받은 뒤 현금흐름이 무너지면 신용점수와 다음 대출 조건에도 영향을 줄 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">한도는 최대치가 아니라 참고값으로 보는 것이 좋습니다.</p>

      {/* 체크리스트 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">신용대출 한도 계산 전 체크리스트</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출을 신청하기 전에는 아래 항목을 먼저 확인해보세요.</p>

      <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#5E6E73]">
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />내 연소득은 얼마인가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />기존대출의 월 상환액은 얼마인가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />기존대출의 연 상환액은 얼마인가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />카드론이나 마이너스통장이 있는가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />신용점수는 최근 좋아졌는가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />재직기간은 충분한가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />성과급이나 상여금이 소득으로 인정될 수 있는가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />새 대출을 받으면 월 납입액은 얼마인가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />총이자는 얼마인가?</li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97852]" />생활비와 비상금을 남기고도 감당 가능한가?</li>
      </ul>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이 질문에 답해보면 단순히 "대출이 얼마나 나올까?"에서 끝나지 않고, <strong className="text-[#0E2A3A]">얼마까지 빌려야 안전한지</strong>까지 판단할 수 있습니다.</p>

      {/* 자주 틀리는 부분 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">사람들이 자주 틀리는 부분</h2>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">연봉만 높으면 한도도 높을 거라고 생각하는 경우</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">가장 흔한 오해입니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">연봉이 높아도 기존대출 상환액이 크면 새 대출 여력은 줄어들 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 자동차 할부나 카드론은 "대출 같지 않다"고 생각하고 빼놓는 경우가 있는데, 실제 상환 부담을 볼 때 영향을 줄 수 있습니다.</p>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">월 납입액만 보고 안심하는 경우</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">월 납입액이 낮아 보여도 상환기간이 길면 총이자가 커질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출은 월 부담과 총이자를 같이 봐야 합니다.</p>

      <h3 className="mt-8 text-lg font-bold text-[#0E2A3A]">조회 결과를 최종 한도처럼 생각하는 경우</h3>

      <p className="mt-3 text-[15px] leading-relaxed text-[#5E6E73]">사전 조회 결과와 실제 승인 결과는 다를 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">실제 심사에서는 소득 증빙, 재직기간, 신용점수, 기존대출, 금융사 내부 기준 등이 함께 반영됩니다.</p>

      {/* FAQ */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">자주 묻는 질문</h2>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-[#0E2A3A]">Q1. 연봉 5,000만원이면 신용대출 한도가 얼마까지 나오나요?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">정확한 한도는 개인마다 다릅니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">기존대출이 적고 신용점수와 재직 상태가 안정적이면 더 높게 나올 수 있고, 기존 상환액이 많으면 한도가 크게 줄어들 수 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">단순 예시로는 기존대출 연 상환액에 따라 수천만원 차이가 날 수 있습니다.</p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#0E2A3A]">Q2. 기존대출을 일부 갚으면 한도가 늘어날 수 있나요?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">가능성은 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">기존대출 상환액이 줄면 새 대출에 쓸 수 있는 상환 여력이 늘어날 수 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">다만 반영 시점과 실제 심사 기준은 금융사마다 다를 수 있습니다.</p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#0E2A3A]">Q3. 마이너스통장이 있으면 신용대출 한도에 영향이 있나요?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">영향이 있을 수 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">실제 사용금액, 한도, 상품 구조, 금융사 심사 방식에 따라 반영 방법은 달라질 수 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">마이너스통장이 있다면 신용대출 한도 계산 시 함께 확인하는 것이 좋습니다.</p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#0E2A3A]">Q4. 신용대출 한도보다 적게 받는 게 나을 수도 있나요?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">그럴 수 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">한도는 받을 수 있는 최대 금액에 가깝고, 실제로 안전하게 갚을 수 있는 금액은 다를 수 있습니다.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">월 납입액과 총이자를 확인한 뒤 생활비에 무리가 없는 수준으로 결정하는 것이 좋습니다.</p>
        </div>
      </div>

      {/* 마지막 정리 */}
      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">마지막으로 정리하면</h2>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출 한도 계산은 연봉만으로 끝나지 않습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">연봉 5,000만원이어도 기존대출, 신용점수, 재직기간, 소득 인정 방식에 따라 실제 한도는 달라질 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 기존대출 상환액이 많으면 같은 연봉에서도 새 대출 가능 금액이 크게 줄어들 수 있습니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 신용대출을 알아볼 때는 한도만 보면 안 됩니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]"><strong className="text-[#0E2A3A]">기존대출 상환액, 월 납입액, 총이자, 생활비 부담</strong>까지 같이 봐야 합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">신용대출은 "얼마까지 빌릴 수 있나"보다 "얼마까지 빌려야 안전한가"가 더 중요합니다.</p>

      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">내 조건으로 월 납입액과 총이자를 먼저 계산해보면 불필요한 시행착오를 줄일 수 있습니다.</p>

      {/* 하단 CTA */}
      <div className="mt-8 rounded-2xl border border-[#D97852]/30 bg-[#D97852]/5 p-5">
        <a href="https://www.loanclock.com/calculator" className="inline-block text-[15px] font-semibold text-[#D97852] underline underline-offset-2 hover:text-[#C96543]">내 조건으로 대출 이자 계산해보기 &rarr;</a>
      </div>
    </>
  );
}
