import { createFromSource } from "fumadocs-core/search/server";
import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: siteConfig.search.language,
});
