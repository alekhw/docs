const PLACEHOLDER_MEASUREMENT_ID = "G-PLACEHOLDER";

/**
 * Must be the SAME value as `GA_MEASUREMENT_ID` in the landing app's
 * `src/shared/consts/analytics.ts` and web3-app's `src/lib/telemetry/config.ts`.
 *
 * GA4 stitches a session across domains only when every site carries the same
 * tag. Giving this app its own ID would turn each hop between the landing page,
 * the app and these docs into a self-referral, splitting one visit into three
 * sessions and destroying the funnel the setup exists to measure.
 */
export const GA_MEASUREMENT_ID: string = "G-SXCVE6E099";

/**
 * Compared by value as well as by shape. "G-PLACEHOLDER" satisfies any sensible
 * format check for a Measurement ID, so a shape test alone reads as configured
 * and ships a tag that contacts Google and records nothing.
 */
export function isMeasurementIdConfigured() {
  return (
    GA_MEASUREMENT_ID !== PLACEHOLDER_MEASUREMENT_ID &&
    /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID)
  );
}

/** Only this host reports. Keeps localhost and Vercel previews out of the property. */
export const ANALYTICS_HOSTNAMES = ["docs.everstrat.xyz"];

export const CONSENT_STORAGE_KEY = "eve_analytics_consent";

/** Same-origin here, unlike the other two apps, since the notice lives in this workspace. */
export const PRIVACY_URL = "/legal/privacy";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Both directions are guarded because Safari's private mode throws on
 * localStorage rather than returning null. Someone whose choice cannot be
 * stored counts as undecided, so they are asked again and never measured
 * without an answer.
 */
export function readConsent(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Honouring the choice for this page view matters more than remembering it.
  }
}

export function isReportingHost() {
  return ANALYTICS_HOSTNAMES.includes(window.location.hostname);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", name, params);
}
