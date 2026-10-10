"use client";

import Script from "next/script";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  type ConsentChoice,
  GA_MEASUREMENT_ID,
  isMeasurementIdConfigured,
  isReportingHost,
  PRIVACY_URL,
  readConsent,
  writeConsent,
} from "@/lib/telemetry";

/**
 * Google Analytics, and the banner that decides whether it loads at all.
 *
 * Consent Mode with denied defaults would still send cookieless pings for
 * people who declined. This gates the tag itself: nothing is requested from any
 * Google host until someone presses Accept.
 *
 * Uses the shared Fumadocs theme tokens so the banner follows the Everstrat
 * palette in both light and dark mode.
 */
export function AnalyticsConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [reporting, setReporting] = useState(false);
  // Nothing renders until after mount: localStorage is unreadable on the
  // server, and without this the banner flashes for people who already answered.
  const [mounted, setMounted] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const [reserve, setReserve] = useState(0);

  useEffect(() => {
    setChoice(readConsent());
    setReporting(isReportingHost());
    setMounted(true);
  }, []);

  // Reserve space for the page and sticky navigation. The bar also has to stay
  // clear of the sidebar's theme switch and the mobile drawer. Measure it
  // because the copy wraps on narrow viewports.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!mounted || choice !== null || !bar) return;
    const root = document.documentElement;
    const measure = () => {
      const height = Math.ceil(bar.getBoundingClientRect().height);
      setReserve(height);
      root.style.setProperty("--docs-consent-height", `${height}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--docs-consent-height");
    };
  }, [choice, mounted]);

  function answer(next: ConsentChoice) {
    writeConsent(next);
    setChoice(next);
  }

  if (!mounted) return null;

  const tagEnabled =
    choice === "granted" && reporting && isMeasurementIdConfigured();

  return (
    <>
      {tagEnabled && (
        <>
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());
gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        </>
      )}

      {choice === null && (
        <>
          <div aria-hidden style={{ height: reserve }} />
          <aside
            ref={barRef}
            aria-label="Analytics consent"
            className="fixed inset-x-0 bottom-0 z-50 border-t border-fd-border bg-fd-card px-5 py-4"
          >
            <div className="mx-auto flex max-w-[1100px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm leading-relaxed text-fd-foreground">
                We would like to measure which pages people read and where they
                arrived from. Nothing is sent to Google unless you agree.{" "}
                <a
                  href={PRIVACY_URL}
                  className="underline underline-offset-2 hover:text-fd-muted-foreground"
                >
                  What we collect
                </a>
              </p>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => answer("denied")}
                  className={cn(buttonVariants({ variant: "ghost" }), "px-4")}
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => answer("granted")}
                  className={cn(buttonVariants({ variant: "primary" }), "px-4")}
                >
                  Accept
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
