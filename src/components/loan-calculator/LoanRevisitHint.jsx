export default function LoanRevisitHint({ onScrollToInput, savedScenarios }) {
  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white px-6 py-6 shadow-md">
      <p className="text-[15px] font-semibold text-[#0E2A3A] mb-3">다음에 확인해볼 포인트</p>
      <ul className="space-y-1.5 text-[14px] text-[#5E6E73]">
        <li>- 다른 은행 금리와 비교해보기</li>
        <li>- 거치기간 유무에 따른 차이 확인</li>
        <li>- 상환방식 변경 시 총 이자 비교</li>
      </ul>
      {savedScenarios.length > 0 && (
        <p className="mt-3 text-[13px] text-[#7A868B]">저장한 비교안: {savedScenarios.length}개</p>
      )}
      <button type="button" onClick={onScrollToInput} className="mt-3 text-[15px] font-semibold text-[#D97852] hover:text-[#C96543] transition-colors">
        조건 변경해서 다시 계산하기
      </button>
    </section>
  );
}
