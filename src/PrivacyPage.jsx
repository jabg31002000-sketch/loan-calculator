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

export default function PrivacyPage() {
  useSeo(
    "개인정보처리방침 | 대출 이자 계산기",
    "대출 이자 계산기 서비스의 개인정보처리방침입니다. 수집하는 정보, 이용 목적, 제3자 제공 내용을 확인하세요."
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
            개인정보처리방침
          </h1>
          <p className="mt-2 text-sm text-slate-500">최종 업데이트: 2025년 1월 1일</p>
        </div>

        <div className="space-y-4">

          <Section title="1. 서비스 소개">
            <p>
              대출 이자 계산기(이하 "서비스")는 사용자가 대출 금액, 금리, 기간을 입력하여
              월 상환금과 총 이자를 계산할 수 있는 무료 온라인 계산 도구입니다.
            </p>
            <p>
              본 방침은 서비스 이용 과정에서 수집되는 정보와 그 처리 방식에 대해 설명합니다.
            </p>
          </Section>

          <Section title="2. 수집하는 정보">
            <p>본 서비스는 아래와 같은 정보를 자동으로 수집할 수 있습니다.</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>방문 페이지, 체류 시간, 클릭 이벤트 등 이용 행태 정보</li>
              <li>브라우저 종류, 운영체제, 화면 해상도 등 기기 정보</li>
              <li>IP 주소 (지역 정보 파악용, 직접 식별 불가)</li>
              <li>쿠키 및 로컬 스토리지에 저장되는 계산기 입력값 (사용자 기기 내 저장)</li>
            </ul>
            <p>
              본 서비스는 회원가입이 없으며, 이름·연락처·금융 정보 등 민감한 개인정보를
              직접 수집하지 않습니다.
            </p>
          </Section>

          <Section title="3. 정보 수집 목적">
            <ul className="ml-4 list-disc space-y-1.5">
              <li>서비스 품질 개선 및 오류 분석</li>
              <li>사용자 이용 패턴 파악을 통한 기능 개선</li>
              <li>광고 서비스 운영 (Google AdSense)</li>
            </ul>
          </Section>

          <Section title="4. 제3자 서비스 (Google Analytics / Google AdSense)">
            <p>
              본 서비스는 이용 현황 분석을 위해 <strong>Google Analytics</strong>를 사용합니다.
              Google Analytics는 쿠키를 통해 익명의 트래픽 데이터를 수집합니다.
            </p>
            <p>
              본 서비스는 광고 제공을 위해 <strong>Google AdSense</strong>를 사용합니다.
              Google AdSense는 사용자의 이전 방문 기록을 기반으로 맞춤형 광고를 표시할 수 있으며,
              이를 위해 쿠키를 사용합니다.
            </p>
            <p>
              Google의 광고 쿠키 사용 방식 및 개인정보 처리 정책은{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Google 광고 정책
              </a>
              에서 확인하실 수 있습니다.
            </p>
            <p>
              맞춤형 광고를 원하지 않으시면{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Google 광고 설정
              </a>
              에서 거부하실 수 있습니다.
            </p>
          </Section>

          <Section title="5. 쿠키 사용">
            <p>
              본 서비스는 쿠키와 브라우저 로컬 스토리지를 사용합니다.
              쿠키는 사용자의 브라우저에 저장되는 소규모 데이터 파일로,
              마지막 입력값을 기억하거나 서비스 이용 편의를 제공하기 위해 사용됩니다.
            </p>
            <p>
              브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.
            </p>
          </Section>

          <Section title="6. 정보 보관 및 파기">
            <p>
              본 서비스가 직접 수집하는 정보는 없으며, 서비스 운영 과정에서 Google Analytics 등
              제3자 서비스를 통해 수집된 데이터는 각 서비스의 정책에 따라 관리됩니다.
            </p>
            <p>
              브라우저 로컬 스토리지에 저장된 계산기 입력값은 사용자가 직접 삭제할 수 있습니다.
            </p>
          </Section>

          <Section title="7. 이용자 권리">
            <ul className="ml-4 list-disc space-y-1.5">
              <li>개인정보 처리에 관한 정보 제공 요청</li>
              <li>맞춤형 광고 수신 거부 (Google 광고 설정에서 가능)</li>
              <li>쿠키 삭제 및 거부 (브라우저 설정)</li>
            </ul>
          </Section>

          <Section title="8. 방침 변경">
            <p>
              본 개인정보처리방침은 관련 법령 변경 또는 서비스 개선에 따라 변경될 수 있습니다.
              변경 시 본 페이지에 공지하며, 변경 사항은 게시 즉시 효력이 발생합니다.
            </p>
          </Section>

          <Section title="9. 문의">
            <p>
              개인정보 처리에 관한 문의는{" "}
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
