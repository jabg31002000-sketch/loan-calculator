export default function LoanInterestContent() {
  return (
    <>
      <p className="mt-8 text-[15px] leading-relaxed text-[#5E6E73]">같은 1억 대출인데도 상환 방식만 바꾸면 총이자가 800만원 이상 차이 날 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">월 납입액이 비슷해 보여서 골랐는데, 막상 끝까지 갚고 나서 보니 "왜 나는 더 많이 냈지?" 싶어지는 이유가 바로 여기 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대출은 금리만 보면 반만 보는 겁니다. 실제 부담은 대출 이자 계산 결과에서 갈립니다. 월 부담이 더 중요한지, 총이자를 줄이는 게 더 중요한지부터 분명히 봐야 손해를 줄일 수 있습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">왜 대출 이자 계산을 꼭 직접 해봐야 할까</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대출 상담이나 비교 화면에서는 보통 "매달 얼마"가 먼저 눈에 들어옵니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">문제는 그 숫자 하나만 보고 결정하면 실제 부담을 놓치기 쉽다는 점입니다. 같은 금액을 빌려도 원금을 빨리 줄이는 구조인지, 이자를 오래 내는 구조인지에 따라 결과가 완전히 달라지기 때문입니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">예를 들어 월 66만 원이면 얼핏 부담이 크지 않아 보일 수 있습니다. 그런데 기간이 20년으로 길어지면, 같은 월 납입액처럼 보여도 실제 총이자는 수천만 원 차이로 벌어질 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 대출 이자 계산은 단순 참고가 아니라, 내 조건에서 진짜 유리한 구조를 가려내는 과정에 가깝습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">대출 이자 계산에서 가장 많이 헷갈리는 부분</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">많이들 이렇게 계산합니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">1억 × 연 5% = 연 이자 500만 원<br />그러면 한 달 이자는 약 41만 6천 원</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">아예 틀린 계산은 아닙니다. 다만 이건 원금을 1년 내내 그대로 들고 있을 때에 가까운 단순 계산입니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">실제 대출은 보통 매달 원금을 조금씩 갚거나, 일정 기간 이자만 내다가 나중에 원금을 갚는 구조입니다. 그래서 실제 대출 이자 계산은 단순 곱셈으로 끝나지 않습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">결국 봐야 할 핵심은 세 가지입니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li>대출금액</li>
          <li>금리</li>
          <li>상환 방식과 기간</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">여기서 가장 많이 놓치는 게 상환 방식입니다. 금리가 같아도 원리금균등상환, 원금균등상환, 만기일시상환 중 무엇을 택하느냐에 따라 총이자 차이가 꽤 커질 수 있습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">실제 대출 이자 계산 예시로 보면 차이가 더 분명합니다</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이해를 돕기 위한 예시로 아래 조건을 기준으로 보겠습니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li>대출금액: 1억 원</li>
          <li>금리: 연 5%</li>
          <li>기간: 20년</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">실제 상품 조건은 금융사, 신용도, 상환 조건에 따라 달라질 수 있지만, 상환 구조 차이를 이해하기에는 이 예시가 가장 직관적입니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">원리금균등상환: 매달 비슷하게 내는 방식</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">원리금균등상환은 매달 내는 금액이 거의 같습니다. 예산을 짜기 편해서 많이 선택하는 방식입니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li><strong className="text-[#0E2A3A]">월 상환액:</strong> 약 66만 원</li>
          <li><strong className="text-[#0E2A3A]">총 상환액:</strong> 약 1억 5,839만 원</li>
          <li><strong className="text-[#0E2A3A]">총이자:</strong> 약 5,839만 원</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">장점은 분명합니다. 매달 비슷한 금액이 빠져나가니 관리가 쉽습니다. 다만 초반에는 원금보다 이자 비중이 높아서 생각보다 원금이 천천히 줄어듭니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">겉으로는 안정적이지만, 길게 보면 총이자가 더 커질 수 있는 구조입니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">원금균등상환: 초반 부담은 크지만 총이자가 줄어드는 방식</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">원금균등상환은 매달 갚는 원금이 같습니다. 남아 있는 원금이 줄어드는 만큼 이자도 점점 줄어듭니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li><strong className="text-[#0E2A3A]">첫 달 상환액:</strong> 약 83만 3천 원</li>
          <li><strong className="text-[#0E2A3A]">마지막 달 상환액:</strong> 약 41만 8천 원</li>
          <li><strong className="text-[#0E2A3A]">총이자:</strong> 약 5,020만 원</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">처음 몇 년은 월 납입액이 더 높게 느껴질 수 있습니다. 대신 원금이 더 빨리 줄어들기 때문에 총이자가 줄어듭니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 조건이라면 원리금균등상환보다 총이자가 약 800만 원 이상 적을 수 있습니다. 이 차이는 "매달 조금 편한 선택"이 전체 비용에서는 더 비쌀 수 있다는 뜻이기도 합니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">만기일시상환: 월 부담은 낮아 보여도 총비용은 별개입니다</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">만기일시상환은 매달 이자만 내다가 만기에 원금을 한 번에 갚는 방식입니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li><strong className="text-[#0E2A3A]">매달 이자:</strong> 약 41만 6천 원</li>
          <li><strong className="text-[#0E2A3A]">만기 원금 상환:</strong> 1억 원</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">처음 보면 가장 부담이 적어 보일 수 있습니다. 하지만 원금이 줄지 않기 때문에 이자를 줄일 여지가 거의 없습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">단기 자금 운용이나 별도의 상환 계획이 분명한 경우가 아니라면, 월 부담만 보고 선택하기에는 조심해야 할 방식입니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">한눈에 보면 뭐가 다른가</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">핵심은 아주 단순합니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">원리금균등상환은 매달 내는 돈이 비슷해서 관리하기 쉽습니다.<br />원금균등상환은 초반 부담이 크지만 총이자를 줄이기 좋습니다.<br />만기일시상환은 월 납입액이 낮아 보여도 원금이 줄지 않아 총비용 관점에서는 불리할 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그래서 "월 얼마 내느냐"와 "결국 얼마 더 내느냐"는 완전히 다른 질문입니다. 대출 이자 계산을 할 때는 이 둘을 꼭 따로 봐야 합니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">어떤 상환 방식이 더 유리할까</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">무조건 하나가 정답인 건 아닙니다. 중요한 건 내 현금흐름과 우선순위입니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">원리금균등상환이 맞는 경우</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">매달 고정 지출을 예측하고 싶다면 이 방식이 편합니다. 월 납입액이 거의 비슷하니 생활비 관리가 쉬워집니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">초반 현금흐름이 빠듯하거나, 매달 상환액이 크게 흔들리면 부담이 큰 사람에게도 현실적인 선택이 될 수 있습니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">원금균등상환이 맞는 경우</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">초반에 조금 더 낼 여력이 있다면 총이자를 줄이는 데 유리합니다. 장기 대출일수록 차이가 더 분명해질 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 "월 부담이 조금 늘어나더라도 전체 비용을 줄이고 싶다"는 사람에게는 이쪽이 더 잘 맞습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">많이 놓치는 부분이 하나 있습니다. 월 납입액이 편한 선택과 총이자를 아끼는 선택은 같지 않을 수 있습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">대출 이자 계산에서 자주 틀리는 포인트</h2>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">월 납입액만 보고 결정하는 실수</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">이게 가장 흔합니다. 매달 몇 만 원 차이만 보고 고르지만, 전체로 보면 총이자가 수백만 원 이상 차이 날 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대출은 한 달짜리 비용이 아니라 긴 기간 동안 이어지는 비용입니다. 그래서 한 달 숫자보다 전체 합계를 같이 봐야 합니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">금리만 비교하고 상환 구조는 안 보는 실수</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">금리가 낮아 보이면 유리하다고 생각하기 쉽습니다. 하지만 같은 금리라도 원금이 얼마나 빨리 줄어드는지에 따라 실제 이자 부담은 달라집니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 상환 기간이 길수록 이 차이는 더 커질 수 있습니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">고정금리와 변동금리를 같은 감각으로 보는 실수</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">변동금리는 현재 기준으로는 저렴해 보여도, 이후 금리 변동에 따라 월 납입액이나 총이자 부담이 달라질 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">지금 당장 보이는 숫자만으로 비교하면 판단이 흔들릴 수 있습니다. 금리 변동 가능성까지 염두에 두고 봐야 합니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">부대비용을 빼먹는 실수</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">실제 총비용은 이자만으로 끝나지 않을 수 있습니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li>중도상환수수료</li>
          <li>인지세</li>
          <li>보증료</li>
          <li>각종 취급 비용</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">상품마다 적용 여부와 금액은 다를 수 있지만, 이런 비용까지 같이 봐야 "진짜 얼마 드는지"에 가까워집니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">거치기간을 가볍게 보는 실수</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">거치기간이 있으면 초반 부담은 줄어듭니다. 대신 그 기간 동안 원금이 충분히 줄지 않아서 총이자가 더 늘어날 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">당장 편하다는 이유만으로 선택하면, 나중에 전체 비용이 생각보다 커질 수 있습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">그래서 나는 뭘 기준으로 보면 될까</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">판단 기준은 생각보다 단순합니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">첫째, 매달 감당 가능한 상환액이 어디까지인지 먼저 보세요.<br />둘째, 그 범위 안에서 총이자가 얼마나 차이 나는지 확인하세요.<br />셋째, 중도상환 가능성, 거치기간, 수수료 같은 조건까지 같이 보세요.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">만약 현금흐름이 빠듯하다면 월 납입액 안정성이 더 중요할 수 있습니다. 반대로 여유가 있다면 총이자를 줄이는 방향이 더 유리할 수 있습니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">결국 좋은 대출은 "가장 낮은 금리"가 아니라, 내 상황에서 실제 부담이 가장 덜한 구조인 경우가 많습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">계산은 직접 해보는 게 가장 빠릅니다</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">공식으로 하나씩 따져보면 머리가 아플 수밖에 없습니다. 특히 상환 방식별로 월 납입액과 총이자 차이를 한 번에 비교하려면 직접 계산해보는 쪽이 훨씬 빠릅니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">내 조건으로 숫자를 넣어보면 바로 감이 옵니다. 대출금액, 금리, 기간만 바꿔봐도 어떤 선택이 내게 유리한지 훨씬 선명해집니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 조건이라도 기간과 상환 방식에 따라 결과가 크게 달라질 수 있습니다. 애매하게 감으로 고르기 전에 직접 숫자로 확인해보는 게 가장 확실합니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">직접 계산해보세요.<br /><a href="https://loanclock.com/calculator" className="font-semibold text-[#D97852] underline underline-offset-2 hover:text-[#C96543]">https://loanclock.com/calculator</a></p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">이런 사람일수록 꼭 비교해봐야 합니다</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">주택담보대출처럼 금액이 크고 기간이 긴 대출은 작은 차이도 누적되면 커집니다. 전세대출이나 신용대출도 마찬가지입니다. 월 납입액이 비슷해 보인다고 그냥 넘길 일이 아닙니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">특히 아래에 해당하면 한 번은 꼭 계산해보는 게 좋습니다.</p>
      <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-white p-6">
        <ul className="space-y-2 text-sm text-[#5E6E73]">
          <li>원리금균등상환과 원금균등상환 중 고민 중인 경우</li>
          <li>월 부담은 낮추고 싶지만 총이자도 걱정되는 경우</li>
          <li>변동금리 조건이 정말 유리한지 헷갈리는 경우</li>
          <li>거치기간 포함 조건을 제안받은 경우</li>
        </ul>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">내 조건으로 대출 이자 계산을 해보면 애매함이 많이 사라집니다.<br /><a href="https://loanclock.com/calculator" className="font-semibold text-[#D97852] underline underline-offset-2 hover:text-[#C96543]">https://loanclock.com/calculator</a></p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">자주 묻는 질문</h2>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">대출 이자는 1억에 연 5%면 무조건 1년에 500만 원인가요?</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">아닙니다. 원금을 계속 1억 그대로 유지할 때의 단순 계산에 가깝습니다. 실제 대출은 원금을 나눠 갚는 경우가 많아서, 상환 방식에 따라 실제 이자 부담이 달라집니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">원리금균등상환이 무조건 불리한가요?</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">그렇지는 않습니다. 총이자만 보면 원금균등상환이 유리할 수 있지만, 매달 같은 금액을 내는 안정감이 필요하다면 원리금균등상환이 더 맞을 수 있습니다. 중요한 건 내 현금흐름입니다.</p>

      <h3 className="mt-10 text-lg font-bold text-[#0E2A3A]">월 납입액이 낮으면 좋은 대출 아닌가요?</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">반드시 그렇지는 않습니다. 월 부담이 낮아도 원금이 늦게 줄면 총이자가 더 커질 수 있습니다. 월 납입액과 총이자를 같이 봐야 제대로 비교할 수 있습니다.</p>

      <h2 className="mt-12 text-xl font-bold text-[#0E2A3A]">정리하면</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">대출 이자 계산은 금리만 보는 일이 아닙니다. 상환 방식, 기간, 월 납입액, 총이자, 부대비용까지 함께 봐야 실제 부담이 보입니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">같은 1억 대출이어도 결과는 꽤 다를 수 있습니다. 월 부담이 편한 선택이 전체 비용에서는 더 비쌀 수도 있습니다. 그 차이를 확인하는 가장 확실한 방법은 내 조건으로 직접 계산해보는 겁니다.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#5E6E73]">애매하면 감으로 고르지 말고 숫자로 보세요. 그게 가장 덜 후회하는 방법입니다.</p>
    </>
  );
}
