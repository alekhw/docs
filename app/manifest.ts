import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: siteConfig.routes.docs,
    display: "standalone",
    background_color: siteConfig.seo.backgroundColor,
    theme_color: siteConfig.seo.themeColor,
    icons: [
      {
        src: siteConfig.assets.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.assets.icon512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
