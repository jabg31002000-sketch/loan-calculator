import { useEffect } from "react";

// ✅ 실제 제휴 링크로 교체하세요
const AFFILIATE_RATE_BASE = "https://affiliate-link.com/rate";
const AFFILIATE_REFINANCE_BASE = "https://affiliate-link.com/refinance";

function buildAffiliateUrl(from) {
  const base = from.includes("refinance") ? AFFILIATE_REFINANCE_BASE : AFFILIATE_RATE_BASE;
  const params = new URLSearchParams({
    utm_source: "loanclock",
    utm_medium: "cta",
    utm_campaign: "loan_compare",
    ...(from ? { utm_content: from } : {}),
  });
  return `${base}?${params.toString()}`;
}

function trackOutbound(from) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "outbound_click", { event_category: "affiliate", event_label: from });
}

export default function OutLoanPage() {
  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from") ?? "";
    trackOutbound(from);
    const timer = setTimeout(() => {
      window.location.href = buildAffiliateUrl(from);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-semibold text-slate-700">최적 금리 비교 페이지로 이동 중입니다...</p>
        <p className="mt-1 text-xs text-slate-400">잠시 후 자동으로 이동합니다</p>
      </div>
    </div>
  );
}
