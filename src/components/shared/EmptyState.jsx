import { ArrowUp } from "lucide-react";

export default function EmptyState({
  message = "조건을 입력하면 결과가 바로 표시됩니다",
  hint = "필요한 정보를 입력하고 계산하기를 눌러주세요.",
}) {
  return (
    <section className="mb-8 flex flex-col items-center rounded-3xl border border-dashed border-[#E5E1DA] bg-white px-8 py-14 text-center shadow-sm">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10353F]/8">
        <ArrowUp className="h-6 w-6 text-[#10353F]" />
      </div>
      <p className="text-lg font-semibold text-[#0E2A3A]">{message}</p>
      <p className="mt-2 text-[15px] text-[#5E6E73]">{hint}</p>
    </section>
  );
}
