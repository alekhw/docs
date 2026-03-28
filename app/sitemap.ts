import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
