export default function LoanRevisitHint({ onScrollToInput, savedScenarios }) {
  return (
    <section className="rounded-2xl bg-slate-50 px-5 py-4">
      <p className="text-sm font-semibold text-slate-700 mb-2">다음에 확인해볼 포인트</p>
      <ul className="space-y-1 text-sm text-slate-600">
        <li>- 다른 은행 금리와 비교해보기</li>
        <li>- 거치기간 유무에 따른 차이 확인</li>
        <li>- 상환방식 변경 시 총 이자 비교</li>
      </ul>
      {savedScenarios.length > 0 && (
        <p className="mt-2 text-xs text-slate-500">저장한 비교안: {savedScenarios.length}개</p>
      )}
      <button type="button" onClick={onScrollToInput} className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        조건 변경해서 다시 계산하기
      </button>
    </section>
  );
}
