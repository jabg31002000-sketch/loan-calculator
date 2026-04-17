export function trackCalculateEvent({ repaymentType, months, graceMonths }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_calculate", { event_category: "calculator", event_label: repaymentType, months, grace_months: graceMonths });
}

export function trackSaveScenarioEvent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "loan_save_scenario", { event_category: "calculator" });
}

export function trackCtaClick({ id, label }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", { event_category: "loan", event_label: label, event_id: id });
}
