import { FAQ_ITEMS } from "./constants";
import FaqItem from "./FaqItem";

export default function LoanFaqSection({ onScrollToInput }) {
  return (
    <section className="mt-12 mb-8">
      <h2 className="mb-1 text-lg font-bold text-slate-900">자주 묻는 질문</h2>
      <p className="mb-5 text-sm text-slate-500">대출 초보자가 가장 많이 궁금해하는 것들</p>
      <div className="rounded-2xl border border-slate-200 bg-white px-5">
        {FAQ_ITEMS.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            hasCalculatorLink={item.hasCalculatorLink}
            onAnchorClick={onScrollToInput}
          />
        ))}
      </div>
    </section>
  );
}
