import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { siteConfig } from "@/lib/config";
import { rootMetadata } from "@/lib/metadata";
import { getSiteJsonLd, JsonLd } from "@/lib/structured-data";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...rootMetadata,
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <JsonLd data={getSiteJsonLd()} />
        <RootProvider>{children}</RootProvider>
        <AnalyticsConsent />
      </body>
    </html>
  );
}
