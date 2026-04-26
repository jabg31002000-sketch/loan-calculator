/**
 * 가이드 레지스트리 — 새 글 추가 시 여기에 항목만 추가하면 됩니다.
 * slug는 URL 경로, component는 lazy import로 연결됩니다.
 */
import { lazy } from "react";

const guides = [
  {
    slug: "loan-interest-calculation",
    title: "대출 이자 계산, 1억 빌리면 실제로 얼마나 차이 날까? (최대 800만원 차이)",
    summary: "같은 1억 대출인데도 상환 방식만 바꾸면 총이자가 800만원 이상 차이 날 수 있습니다.",
    seoTitle: "대출 이자 계산, 1억 빌리면 실제로 얼마나 차이 날까? | LoanClock",
    seoDesc: "같은 1억 대출인데도 상환 방식만 바꾸면 총이자가 800만원 이상 차이 납니다. 원리금균등, 원금균등, 만기일시 비교와 실제 계산 예시를 확인하세요.",
    relatedCalc: { label: "신용대출 이자 계산기", path: "/credit-loan/calculator" },
    relatedSlugs: ["refinance-timing", "credit-score-guide"],
    component: lazy(() => import("./content/LoanInterestContent")),
  },
  {
    slug: "refinance-timing",
    title: "대출 갈아타기 타이밍, 이럴 때 유리합니다",
    summary: "대환이 유리한 시점, 중도상환수수료, 기간 연장 시 주의사항을 정리했습니다.",
    seoTitle: "대출 갈아타기 타이밍 | LoanClock",
    seoDesc: "대출 대환이 유리한 시점, 중도상환수수료 계산법, 기간 연장 시 주의사항을 정리했습니다.",
    relatedCalc: { label: "대환 절약 계산기", path: "/refinance-loan/calculator" },
    relatedSlugs: ["loan-interest-calculation", "credit-score-guide"],
    component: lazy(() => import("./content/RefinanceContent")),
  },
  {
    slug: "credit-score-guide",
    title: "신용점수가 대출 조건을 바꾸는 이유",
    summary: "신용점수가 금리와 한도에 미치는 영향, 관리 방법, 흔한 실수 패턴을 알아보세요.",
    seoTitle: "신용점수가 대출 조건을 바꾸는 이유 | LoanClock",
    seoDesc: "신용점수가 대출 금리와 한도에 미치는 영향, 관리 방법, 흔한 실수 패턴을 알아보세요.",
    relatedCalc: { label: "DSR / 대출한도 확인", path: "/dsr/calculator" },
    relatedSlugs: ["loan-interest-calculation", "refinance-timing"],
    component: lazy(() => import("./content/CreditScoreContent")),
  },
  {
    slug: "early-repayment-good-or-bad",
    title: "조기상환이 유리한 경우와 아닌 경우, 이자 차이 계산해보니",
    summary: "조기상환이 항상 유리한 것은 아닙니다. 남은 기간, 금리, 수수료에 따라 실제 이자 절감액이 달라집니다.",
    seoTitle: "조기상환이 유리한 경우와 아닌 경우 | 이자 차이 계산",
    seoDesc: "조기상환이 항상 유리한 것은 아닙니다. 남은 기간, 금리, 중도상환수수료, 상환 방식에 따라 실제 이자 절감액이 어떻게 달라지는지 계산 예시로 정리했습니다.",
    relatedCalc: { label: "대출 이자 계산기", path: "/credit-loan/calculator" },
    relatedSlugs: ["loan-interest-calculation", "refinance-timing"],
    component: lazy(() => import("./content/EarlyRepaymentContent")),
  },
];

export default guides;

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug) || null;
}

export function getRelatedGuides(slugs) {
  return slugs.map((s) => guides.find((g) => g.slug === s)).filter(Boolean);
}
