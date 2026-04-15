import { Link } from "react-router-dom";
import { ChevronRight, Mail, Clock, MessageSquare } from "lucide-react";
import { useSeo } from "./useSeo";

export default function ContactPage() {
  useSeo(
    "문의하기 | 대출 이자 계산기",
    "대출 이자 계산기 서비스에 대한 문의, 오류 신고, 개선 제안을 보내주세요."
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-14">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-700"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          메인으로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            문의하기
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            서비스 이용 중 불편하신 점이나 개선 제안이 있으시면 언제든지 연락해 주세요.
          </p>
        </div>

        <div className="space-y-4">

          {/* 이메일 문의 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50">
                <Mail className="h-5 w-5 text-sky-600" />
              </div>
              <h2 className="text-base font-bold text-slate-900">이메일 문의</h2>
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-600">
              아래 이메일로 문의 내용을 보내주시면 확인 후 답변 드리겠습니다.
            </p>
            <a
              href="mailto:contact@loanclock.com"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
            >
              <Mail className="h-4 w-4" />
              contact@loanclock.com
            </a>
          </div>

          {/* 응답 시간 안내 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
                <Clock className="h-5 w-5 text-slate-600" />
              </div>
              <h2 className="text-base font-bold text-slate-900">응답 안내</h2>
            </div>
            <ul className="space-y-2 text-sm leading-7 text-slate-600">
              <li>• 평일 기준 <strong>1~3 영업일 이내</strong> 답변 드립니다.</li>
              <li>• 주말 및 공휴일에는 답변이 늦어질 수 있습니다.</li>
              <li>• 스팸으로 분류된 경우 답변이 누락될 수 있으니 재문의 부탁드립니다.</li>
            </ul>
          </div>

          {/* 문의 유형 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-base font-bold text-slate-900">문의 유형</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: "계산 오류 신고", desc: "계산 결과가 이상할 때" },
                { label: "기능 개선 제안", desc: "추가 기능 아이디어" },
                { label: "광고 관련 문의", desc: "광고 노출 문제 등" },
                { label: "기타 문의", desc: "그 외 궁금한 점" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 면책 안내 */}
          <div className="rounded-2xl bg-slate-100 px-4 py-4 text-sm leading-6 text-slate-500">
            본 서비스는 참고용 계산 도구이며, 실제 대출 상품에 대한 금융 상담은 제공하지 않습니다.
            구체적인 대출 상담은 해당 금융기관에 직접 문의해 주세요.
          </div>

        </div>
      </div>
    </div>
  );
}
