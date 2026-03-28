import { docs } from "collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { siteConfig } from "./config";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: siteConfig.routes.docs,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.webp"];

  return {
    segments,
    url: `${siteConfig.routes.docsImage}/${segments.join("/")}`,
  };
}

export function getPageContentPath(page: InferPageType<typeof source>) {
  if (page.path) return page.path;
  return page.slugs.length > 0 ? `${page.slugs.join("/")}.mdx` : "index.mdx";
}

export function getPageLastModified(page: InferPageType<typeof source>) {
  const value = page.data.lastModified;
  if (!value) return undefined;

  return value instanceof Date ? value : new Date(value);
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${siteConfig.routes.docsContent}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
