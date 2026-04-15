import { useEffect } from "react";

// ✅ 실제 제휴 링크로 교체하세요
const AFFILIATE_BASE = "https://affiliate-link.com";

function buildAffiliateUrl(from) {
  const params = new URLSearchParams({
    utm_source: "loanclock",
    utm_medium: "cta",
    utm_campaign: "loan_compare",
    ...(from ? { utm_content: from } : {}),
  });
  return `${AFFILIATE_BASE}?${params.toString()}`;
}

function trackCtaClick(label) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", { event_category: "engagement", event_label: label });
}

export default function OutLoanPage() {
  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from") ?? "";
    trackCtaClick("loan_redirect");
    window.location.href = buildAffiliateUrl(from);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-semibold text-slate-700">최저 금리 확인 중...</p>
        <p className="mt-1 text-xs text-slate-400">잠시 후 자동으로 이동합니다</p>
      </div>
    </div>
  );
}
