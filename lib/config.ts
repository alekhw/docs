export const siteConfig = {
  name: "Everstrat Docs",
  shortName: "Everstrat Docs",
  brandName: "Everstrat",
  projectName: "Everstrat",
  description:
    "Product, protocol, app, data, security, and operations documentation for the Everstrat monorepo.",
  locale: "en",
  openGraphLocale: "en_US",
  category: "technology",
  creator: "Guide DAO Organization",
  publisher: "Guide DAO Organization",
  keywords: [
    "Everstrat",
    "Everything Strategy",
    "crypto documentation",
    "protocol documentation",
    "smart contracts",
    "Arbitrum Sepolia",
    "GoldSky subgraph",
    "web3 app",
  ],
  routes: {
    docs: "/",
    legacyDocs: "/docs",
    docsImage: "/og/docs",
    docsContent: "/llms.mdx/docs",
    llmsIndex: "/llms.txt",
    llmsFull: "/llms-full.txt",
    search: "/api/search",
    manifest: "/manifest.webmanifest",
    sitemap: "/sitemap.xml",
  },
  assets: {
    logo: "/eve-logo-only.svg",
    favicon: "/favicon.ico",
    icon16: "/favicon-16x16.png",
    icon32: "/favicon-32x32.png",
    icon192: "/icon-192.png",
    icon512: "/icon-512.png",
    appleTouchIcon: "/apple-touch-icon.png",
    appleTouchIconPrecomposed: "/apple-touch-icon-precomposed.png",
  },
  repository: {
    owner: "everstrat-xyz",
    name: "contracts",
    branch: "main",
  },
  seo: {
    siteTitle: "Everstrat.xyz | Docs",
    titleTemplate: "%s | Everstrat Docs",
    defaultSocialImageAlt: "Everstrat Docs social preview image",
    themeColor: "#111111",
    backgroundColor: "#ffffff",
  },
  search: {
    language: "english" as const,
  },
} as const;

const defaultSiteUrl = "http://localhost:3000";

function normalisePath(pathname: string): string {
  if (pathname.length === 0) return siteConfig.routes.docs;
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getSiteUrl(): URL {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

  try {
    return new URL(configuredSiteUrl);
  } catch {
    return new URL(defaultSiteUrl);
  }
}

export function getAbsoluteUrl(
  pathname: string = siteConfig.routes.docs,
): string {
  return new URL(normalisePath(pathname), getSiteUrl()).toString();
}

export function getGitHubRepoUrl(): string {
  const { owner, name } = siteConfig.repository;
  return `https://github.com/${owner}/${name}`;
}

export function getGitHubContentUrl(pathname: string): string {
  const { owner, name, branch } = siteConfig.repository;
  return `https://github.com/${owner}/${name}/blob/${branch}/${pathname}`;
}
