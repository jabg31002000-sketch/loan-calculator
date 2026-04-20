import FaqItem from "../loan-calculator/FaqItem";
import { HelpCircle } from "lucide-react";

export default function FaqSection({ items, onScrollToInput, title = "자주 묻는 질문", subtitle = "가장 많이 궁금해하는 것들" }) {
  if (!items?.length) return null;

  return (
    <section className="mt-14 mb-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10353F]/8">
          <HelpCircle className="h-5 w-5 text-[#10353F]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#0E2A3A]">{title}</h2>
          <p className="text-[13px] text-[#7A868B]">{subtitle}</p>
        </div>
      </div>
      <div className="rounded-3xl border border-[#E5E1DA] bg-white px-6 shadow-md">
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
