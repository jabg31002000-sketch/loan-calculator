import { Calculator, RefreshCw, Home, PieChart, Building2, Car, Landmark, Percent, Building, Lock, DollarSign, Heart } from "lucide-react";

// 계산기 config들을 lazy import하지 않고 직접 등록
const configs = {};

export function registerConfig(config) {
  configs[config.id] = config;
}

export function getConfig(id) {
  return configs[id] ?? null;
}

export function getAllConfigs() {
  return Object.values(configs);
}

// 네비게이션용 메타 정보 — introPath로 이동
export const CALCULATOR_NAV = [
  { id: "credit", name: "신용대출", path: "/credit-loan", icon: Calculator, description: "매달 얼마나 낼까?" },
  { id: "refinance", name: "대환/갈아타기", path: "/refinance-loan", icon: RefreshCw, description: "갈아타면 얼마나 줄까?" },
  { id: "jeonse", name: "전세 vs 월세", path: "/jeonse-vs-rent", icon: Home, description: "어느 쪽이 유리할까?" },
  { id: "dsr", name: "DSR/대출한도", path: "/dsr", icon: PieChart, description: "얼마나 더 빌릴 수 있을까?" },
  { id: "mortgage", name: "주담대", path: "/mortgage", icon: Building2, description: "내 집 대출 가능 금액은?" },
  { id: "auto", name: "자동차 할부", path: "/auto-loan", icon: Car, description: "월 할부금은 얼마?" },
  { id: "beotimmokJeonse", name: "버팀목 전세대출", path: "/beotimmok-jeonse", icon: Landmark, description: "정부 지원 전세대출" },
  { id: "jeonseLoanInterest", name: "전세대출 이자", path: "/jeonse-loan-interest", icon: Percent, description: "월 이자 바로 확인" },
  { id: "didimdol", name: "디딤돌대출", path: "/didimdol", icon: Building, description: "저금리 주택구입 대출" },
  { id: "bogeumjari", name: "보금자리론", path: "/bogeumjari", icon: Lock, description: "장기 고정금리 주담대" },
  { id: "monthlyRentLoan", name: "월세대출", path: "/monthly-rent-loan", icon: DollarSign, description: "총 주거비 확인" },
  { id: "firstHome", name: "생애최초 주택구입", path: "/first-home", icon: Heart, description: "첫 집 대출 가능 금액" },
];
