function gtag(...args) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function trackCalculateEvent({ calculatorType, loanAmount, annualRate, months, graceMonths }) {
  gtag("event", "loan_calculate", {
    calculator_type: calculatorType,
    loan_amount: loanAmount,
    annual_rate: annualRate,
    months,
    grace_months: graceMonths ?? 0,
  });
}

export function trackSaveScenarioEvent() {
  gtag("event", "loan_save_scenario", { event_category: "calculator" });
}

export function trackCtaClick({ ctaLabel, ctaLocation, destinationUrl }) {
  gtag("event", "cta_click", {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    destination_url: destinationUrl,
  });
}

export function trackRefinanceCtaClick({ ctaLabel, ctaLocation, destinationUrl }) {
  gtag("event", "refinance_cta_click", {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    destination_url: destinationUrl,
  });
}
