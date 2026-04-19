import FaqItem from "../loan-calculator/FaqItem";
import { HelpCircle } from "lucide-react";

export default function FaqSection({ items, onScrollToInput, title = "자주 묻는 질문", subtitle = "가장 많이 궁금해하는 것들" }) {
  if (!items?.length) return null;

  return (
    <section className="mt-10 mb-8">
      <div className="mb-4 flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-slate-400" />
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-[13px] text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white px-5">
        {items.map((item) => (
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
