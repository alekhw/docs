import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries();
}
