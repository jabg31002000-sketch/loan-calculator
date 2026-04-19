import { ArrowUp } from "lucide-react";

export default function EmptyState({
  message = "조건을 입력하면 결과가 바로 표시됩니다",
  hint = "필요한 정보를 입력하고 계산하기를 눌러주세요.",
}) {
  return (
    <section className="mb-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-gradient-to-b from-white to-slate-50/50 px-6 py-10 text-center">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
        <ArrowUp className="h-5 w-5 text-emerald-500" />
      </div>
      <p className="text-base font-bold text-slate-800">{message}</p>
      <p className="mt-1.5 text-sm text-slate-400">{hint}</p>
    </section>
  );
}
