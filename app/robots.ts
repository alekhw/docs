import type { MetadataRoute } from "next";
import { getAbsoluteUrl, getSiteUrl, siteConfig } from "@/lib/config";
import { getDisallowedRobotsPaths } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: getDisallowedRobotsPaths(),
    },
    sitemap: getAbsoluteUrl(siteConfig.routes.sitemap),
    host: getSiteUrl().origin,
  };
}
