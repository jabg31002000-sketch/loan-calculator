import { useEffect } from "react";

// 실제 제휴 링크로 교체해주세요
const AFFILIATE_URL = "https://affiliate-link.com";

function trackCtaClick(label) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", { event_category: "engagement", event_label: label });
}

export default function OutLoanPage() {
  useEffect(() => {
    trackCtaClick("loan_redirect");
    window.location.href = AFFILIATE_URL;
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">잠시 후 이동합니다...</p>
      </div>
    </div>
  );
}
