import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Send, CheckCircle, ChevronDown, ShieldAlert, AlertCircle } from "lucide-react";
import { useSeo } from "../useSeo";

/* ── 문의 유형 ── */
const INQUIRY_TYPES = [
  { value: "bug", label: "계산기 오류" },
  { value: "feature", label: "기능 요청" },
  { value: "calculator", label: "필요한 계산기 제안" },
  { value: "usage", label: "사용법 질문" },
  { value: "partnership", label: "제휴/광고 문의" },
  { value: "other", label: "기타" },
];

/* ── 세부 유형 (문의 유형별) ── */
const DETAIL_TYPES = {
  bug: [
    "계산 결과가 이상해요",
    "입력값이 저장/반영되지 않아요",
    "버튼이 작���하지 않아요",
    "화면이 깨져 보여요",
    "모바일에서 사용하기 불편해요",
    "기타 오류",
  ],
  feature: [
    "결과 설명을 더 자세히 보고 싶어요",
    "상환표/월별표 기능이 필요해요",
    "저장/공유/PDF 기능이 필요해요",
    "비교 기능이 필요해요",
    "입력 항목을 추가하고 싶어요",
    "기타 기능 요청",
  ],
  calculator: [
    "대출 관련 계산기",
    "전세/월세 관련 계산기",
    "주택담보대출 관련 계산기",
    "자동차 할부 관련 계산기",
    "DSR/한도 관련 계산기",
    "기타 계산기",
  ],
  usage: [
    "입력값이 헷갈려요",
    "결과 해석이 어려워요",
    "어떤 계산기를 써야 할지 모르겠어요",
    "기타 사용법 질문",
  ],
  partnership: [
    "제휴 문의",
    "광고 문의",
    "API/연동 문의",
    "기타 비즈니스 문의",
  ],
  other: [
    "기타",
  ],
};

/* ── 관련 계산기 ── */
const CALCULATOR_OPTIONS = [
  { value: "", label: "선택 안 함" },
  { value: "대출 이자 계산기", label: "대출 이자 계산기" },
  { value: "DSR 계산기", label: "DSR 계산기" },
  { value: "전세대출 계산기", label: "전세대출 계산기" },
  { value: "대환대출 계산기", label: "대환대출 계산기" },
  { value: "주택담보대출 계산기", label: "주택담보대출 계산기" },
  { value: "자동차 할부 계산기", label: "자동차 할부 계산기" },
  { value: "전세 vs 월세 계산기", label: "전세 vs 월세 계산기" },
  { value: "기타", label: "기타" },
];

/* ── from 파라미터 → 관련 계산기 매핑 ── */
const FROM_TO_CALCULATOR = {
  dsr: "DSR 계산기",
  "loan-interest": "대출 이자 계산기",
  "credit-loan": "대출 이자 계산기",
  jeonse: "전세대출 계산기",
  refinance: "대환대출 계산기",
  mortgage: "주택담보대출 계산기",
  auto: "자동차 할부 계산기",
  "auto-loan": "자동차 할부 계산기",
  "jeonse-vs-rent": "전세 vs 월세 계산기",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Google Sheets 전송 ── */
async function submitFeedback(data) {
  const webhookUrl = import.meta.env.VITE_FEEDBACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[Feedback] VITE_FEEDBACK_WEBHOOK_URL 환경변수가 설정되지 않았습니다. 전송을 건너뜁니다.", data);
    return { ok: false, reason: "no_webhook" };
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  });

  if (!res.ok) return { ok: false, reason: "http_error" };
  return { ok: true };
}

export default function FeedbackPage() {
  useSeo(
    "문의/기능요청 | LoanClock",
    "LoanClock 계산기 오류 신고, 기능 요청, 계산기 제안, 사용법 질문, 제휴 문의를 보내주세요.",
  );

  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get("from") || "";
  const initialCalculator = FROM_TO_CALCULATOR[fromParam] || "";

  const [form, setForm] = useState({
    type: "",
    detailType: "",
    calculator: initialCalculator,
    title: "",
    content: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const detailOptions = useMemo(() => DETAIL_TYPES[form.type] || [], [form.type]);

  function handleChange(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "type") next.detailType = "";
      return next;
    });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
    if (submitError) setSubmitError(false);
  }

  function validate() {
    const next = {};
    if (!form.type) next.type = "문의 유형을 선택해주세요.";
    if (!form.detailType) next.detailType = "세부 유형을 선택해주세요.";
    if (!form.title.trim()) next.title = "제목을 입력해주세요.";
    if (!form.content.trim()) next.content = "내용을 입력해주세요.";
    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) {
      next.email = "올바른 이메일 형식을 입력해주세요.";
    }
    return next;
  }

  async function handleSubmit() {
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    setSubmitError(false);

    const typeLabel = INQUIRY_TYPES.find((t) => t.value === form.type)?.label || form.type;

    const payload = {
      inquiryType: typeLabel,
      detailType: form.detailType,
      relatedCalculator: form.calculator || "",
      title: form.title.trim(),
      content: form.content.trim(),
      email: form.email.trim(),
      pageUrl: window.location.href,
      referrerUrl: document.referrer || "",
      fromParam,
    };

    try {
      const result = await submitFeedback(payload);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setForm({ type: "", detailType: "", calculator: initialCalculator, title: "", content: "", email: "" });
    setErrors({});
    setSubmitted(false);
    setSubmitError(false);
  }

  /* ── 접수 완료 화면 ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F6F1EB]">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-3xl border border-[#E5E1DA] bg-white p-8 text-center shadow-md sm:p-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle className="h-7 w-7 text-emerald-500" />
            </div>
            <h1 className="mb-2 text-xl font-bold text-[#0E2A3A]">문의가 접수되었습니다</h1>
            <p className="mb-6 text-sm leading-relaxed text-[#5E6E73]">
              검토 후 개선에 반영하겠습니다.<br />
              이메일을 남겨주셨다면 필요 시 답변드리겠습니다.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-xl border border-[#E5E1DA] px-5 py-2.5 text-sm font-semibold text-[#5E6E73] transition hover:bg-[#F6F1EB] hover:text-[#0E2A3A]"
              >
                추가 문의하기
              </button>
              <Link
                to="/"
                className="rounded-xl bg-[#D97852] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C96543]"
              >
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── 폼 ── */
  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E6E73] hover:text-[#0E2A3A]"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          메인으로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-[1.75rem] font-bold tracking-[-0.02em] text-[#0E2A3A] sm:text-[2rem]">
            문의 / 기능요청
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[#5E6E73]">
            계산기 오류, 기능 개선, 필요한 계산기 제안 등 무엇이든 보내주세요.
          </p>
        </div>

        {/* 안내 문구 */}
        <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-amber-200/80 bg-amber-50/60 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div className="text-[13px] leading-relaxed text-amber-800">
            <p>개인 신용정보, 주민등록번호, 계좌번호 등 민감한 정보는 입력하지 마세요.</p>
            <p className="mt-1 text-amber-700/80">LoanClock의 계산 결과는 참고용이며, 실제 대출 가능 여부와 조건은 금융사 심사 기준에 따라 달라질 수 있습니다.</p>
          </div>
        </div>

        {/* 폼 카드 */}
        <div className="rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-md sm:p-8">
          <div className="space-y-5">

            {/* 문의 유형 */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">
                문의 유형 <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {INQUIRY_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => handleChange("type", t.value)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      form.type === t.value
                        ? "border-[#10353F] bg-[#10353F]/5 text-[#0E2A3A]"
                        : "border-[#E5E1DA] text-[#5E6E73] hover:border-[#10353F]/30 hover:text-[#0E2A3A]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {errors.type && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.type}</p>}
            </div>

            {/* 세부 유형 */}
            {detailOptions.length > 0 && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">
                  세부 유형 <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.detailType}
                    onChange={(e) => handleChange("detailType", e.target.value)}
                    className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-1 focus:ring-[#10353F]/10 ${
                      form.detailType ? "text-[#0E2A3A]" : "text-[#5E6E73]"
                    } ${errors.detailType ? "border-rose-300 focus:border-rose-400" : "border-[#E5E1DA] focus:border-[#10353F]"}`}
                  >
                    <option value="">세부 유형을 선택해주세요</option>
                    {detailOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E6E73]" />
                </div>
                {errors.detailType && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.detailType}</p>}
              </div>
            )}

            {/* 관련 계산기 */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">관련 계산기</label>
              <div className="relative">
                <select
                  value={form.calculator}
                  onChange={(e) => handleChange("calculator", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 pr-10 text-sm text-[#0E2A3A] outline-none focus:border-[#10353F] focus:ring-1 focus:ring-[#10353F]/10"
                >
                  {CALCULATOR_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E6E73]" />
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">
                제목 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="문의 제목을 입력해주세요"
                maxLength={100}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:ring-1 focus:ring-[#10353F]/10 ${
                  errors.title ? "border-rose-300 focus:border-rose-400" : "border-[#E5E1DA] focus:border-[#10353F]"
                }`}
              />
              {errors.title && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.title}</p>}
            </div>

            {/* 내용 */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">
                내용 <span className="text-rose-400">*</span>
              </label>
              <textarea
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="문의 내용을 자세히 적어주세요"
                rows={5}
                maxLength={2000}
                className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-relaxed text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:ring-1 focus:ring-[#10353F]/10 ${
                  errors.content ? "border-rose-300 focus:border-rose-400" : "border-[#E5E1DA] focus:border-[#10353F]"
                }`}
              />
              {errors.content && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.content}</p>}
            </div>

            {/* 이메일 */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0E2A3A]">
                이메일 <span className="text-xs font-normal text-[#5E6E73]">(선택)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="답변을 받으시려면 이메일을 입력해주세요"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0E2A3A] outline-none placeholder:text-[#5E6E73] focus:ring-1 focus:ring-[#10353F]/10 ${
                  errors.email ? "border-rose-300 focus:border-rose-400" : "border-[#E5E1DA] focus:border-[#10353F]"
                }`}
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.email}</p>}
            </div>

            {/* 전송 실패 메시지 */}
            {submitError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <p className="text-sm font-medium text-rose-700">
                  문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.
                </p>
              </div>
            )}

            {/* 제출 */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97852] px-8 py-[18px] text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#C96543] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
              {submitting ? "전송 중..." : "문의 보내기"}
            </button>
          </div>
        </div>

        {/* 면책 */}
        <div className="mt-6 rounded-2xl bg-[#F6F1EB] px-4 py-4 text-[13px] leading-relaxed text-[#5E6E73]">
          본 서비스는 참고용 계산 도구이며, 특정 금융 상품을 판매하거나 중개하지 않습니다.
          구체적인 대출 상담은 해당 금융기관에 직접 문의해 주세요.
        </div>
      </div>
    </div>
  );
}
