import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useSeo } from "./useSeo";

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-slate-600">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  useSeo(
    "이용약관 | 대출 이자 계산기",
    "대출 이자 계산기 서비스 이용약관입니다. 서비스 이용 조건, 면책 사항, 저작권 등을 확인하세요."
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-700"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          메인으로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            이용약관
          </h1>
          <p className="mt-2 text-sm text-slate-500">최종 업데이트: 2025년 1월 1일</p>
        </div>

        <div className="space-y-4">

          <Section title="제1조 (목적)">
            <p>
              본 약관은 대출 이자 계산기(이하 "서비스")가 제공하는 온라인 대출 계산 서비스의
              이용 조건 및 절차, 서비스 제공자와 이용자 간의 권리·의무 및 책임 사항을
              규정함을 목적으로 합니다.
            </p>
          </Section>

          <Section title="제2조 (서비스 내용)">
            <p>본 서비스는 다음과 같은 기능을 무료로 제공합니다.</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>대출 금액, 금리, 기간 입력을 통한 월 상환금 계산</li>
              <li>원리금균등상환, 원금균등상환, 만기일시상환 방식 비교</li>
              <li>거치기간 설정 및 총 이자 계산</li>
              <li>상환 방식별 비교 및 시나리오 저장</li>
              <li>금리 민감도 분석 (±1%p 가정 시뮬레이션)</li>
            </ul>
          </Section>

          <Section title="제3조 (이용 조건)">
            <p>
              본 서비스는 별도의 회원가입 없이 누구나 이용할 수 있습니다.
              단, 아래의 경우 서비스 이용이 제한될 수 있습니다.
            </p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>서비스를 통해 타인에게 피해를 주는 행위</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>서비스 내 정보를 무단으로 크롤링·수집하는 행위</li>
              <li>관련 법령에 위반되는 행위</li>
            </ul>
          </Section>

          <Section title="제4조 (계산 결과의 정확성 및 면책)">
            <p>
              본 서비스의 계산 결과는 <strong>참고용 정보</strong>로만 제공되며,
              실제 대출 조건과 다를 수 있습니다.
            </p>
            <p>
              실제 대출 금리, 수수료, 상환 스케줄은 금융기관의 심사 기준, 우대금리 적용 여부,
              상품 조건에 따라 달라집니다. 본 서비스의 계산 결과를 근거로 한 금융 결정에 대해
              서비스 운영자는 어떠한 법적 책임도 지지 않습니다.
            </p>
            <p>
              대출 관련 정확한 정보는 반드시 해당 금융기관 또는 공인 금융 전문가에게
              확인하시기 바랍니다.
            </p>
          </Section>

          <Section title="제5조 (광고)">
            <p>
              본 서비스는 Google AdSense 등 제3자 광고 서비스를 통해 광고를 표시할 수 있습니다.
              광고 내용은 광고 서비스 제공자가 관리하며, 서비스 운영자는 광고 내용에 대한
              책임을 지지 않습니다.
            </p>
          </Section>

          <Section title="제6조 (서비스 변경 및 중단)">
            <p>
              서비스 운영자는 운영상 또는 기술상의 사유로 사전 고지 없이 서비스 내용을 변경하거나
              일시적으로 중단할 수 있습니다. 이로 인한 이용자의 손해에 대해 서비스 운영자는
              책임을 지지 않습니다.
            </p>
          </Section>

          <Section title="제7조 (저작권)">
            <p>
              본 서비스에서 제공하는 텍스트, 이미지, 코드, UI 구성 등 모든 콘텐츠의 저작권은
              서비스 운영자에게 있습니다.
            </p>
            <p>
              이용자는 서비스 운영자의 사전 동의 없이 서비스 내 콘텐츠를 복제, 배포, 수정하거나
              상업적으로 이용할 수 없습니다.
            </p>
          </Section>

          <Section title="제8조 (준거법 및 분쟁 해결)">
            <p>
              본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은
              관련 법령에 따라 해결합니다.
            </p>
          </Section>

          <Section title="제9조 (약관 변경)">
            <p>
              본 약관은 서비스 개선 또는 관련 법령 변경에 따라 변경될 수 있으며,
              변경 시 본 페이지에 공지합니다. 변경된 약관은 공지 후 즉시 효력이 발생합니다.
              변경 후 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주합니다.
            </p>
          </Section>

          <Section title="제10조 (문의)">
            <p>
              약관에 관한 문의는{" "}
              <Link to="/contact" className="text-sky-600 underline hover:text-sky-700">
                문의하기 페이지
              </Link>
              를 통해 연락해 주세요.
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
}
