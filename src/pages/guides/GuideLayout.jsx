import { Suspense } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react";
import { useSeo } from "../../useSeo";
import guides, { getGuide, getRelatedGuides } from "./registry";

export default function GuideLayout() {
  const { slug } = useParams();
  const guide = getGuide(slug);

  if (!guide) return <Navigate to="/guides" replace />;

  const related = getRelatedGuides(guide.relatedSlugs);
  const Content = guide.component;

  return <GuideInner guide={guide} related={related} Content={Content} />;
}

function GuideInner({ guide, related, Content }) {
  useSeo(guide.seoTitle, guide.seoDesc);

  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      <div className="mx-auto max-w-3xl px-6 py-16">

        <Link
          to="/guides"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E6E73] hover:text-[#0E2A3A]"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          가이드 목록으로
        </Link>

        <h1 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem] lg:text-[2.25rem] leading-tight">
          {guide.title}
        </h1>

        <p className="mt-6 text-[15px] leading-relaxed text-[#5E6E73]">
          {guide.summary}
        </p>

        {/* 본문 콘텐츠 */}
        <Suspense fallback={<div className="mt-12 text-center text-sm text-[#5E6E73]">로딩 중...</div>}>
          <Content />
        </Suspense>

        {/* 계산기 CTA */}
        <div className="mt-12 text-center">
          <Link
            to={guide.relatedCalc.path}
            className="inline-flex items-center gap-2 rounded-xl bg-[#D97852] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] active:scale-[0.98]"
          >
            {guide.relatedCalc.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 관련 가이드 */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="text-base font-bold text-[#0E2A3A]">관련 가이드</h3>
            <div className="mt-4 space-y-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/guides/${r.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-[#E5E1DA] bg-white p-5 transition-all hover:border-[#D5D0C8] hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10353F]/8">
                    <BookOpen className="h-4 w-4 text-[#10353F]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#0E2A3A] group-hover:text-[#10353F]">{r.title}</span>
                    <span className="block text-xs text-[#5E6E73] leading-snug">{r.summary}</span>
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-[#C4BFB6] group-hover:text-[#D97852]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 면책 */}
        <div className="mt-12 rounded-2xl bg-[#F6F1EB] border border-[#E5E1DA] px-4 py-4 text-sm leading-6 text-[#5E6E73]">
          본 콘텐츠는 일반적인 금융 정보 제공 목적이며, 특정 금융 상품을 추천하거나 투자를 권유하지 않습니다.
          실제 대출 조건은 금융기관에 직접 확인하시기 바랍니다.
        </div>
      </div>
    </div>
  );
}
