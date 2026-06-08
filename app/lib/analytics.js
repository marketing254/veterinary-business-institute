// Lightweight, safe event tracking. No-ops until an analytics tool (GA4 gtag or
// GTM dataLayer) is actually loaded — which only happens after the user grants
// cookie consent and a real tracking ID is configured. Safe to call anywhere.

export const CONSENT_KEY = "vbi-cookie-consent";
export const CONSENT_EVENT = "vbi-consent-change";

export function hasConsent() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Fire a conversion / interaction event to whichever analytics tool is present.
 * @param {string} name  GA4-style event name, e.g. "book_consultation".
 * @param {object} params  Optional event parameters.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  // Google Analytics 4 (gtag)
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
  // Google Tag Manager (dataLayer) — also works if only GTM is configured
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}
