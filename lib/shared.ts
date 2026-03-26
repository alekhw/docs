export const appName = "Everstrat Docs";
export const docsRoute = "/";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";
export const defaultSiteUrl = "http://localhost:3000";

export function getSiteUrl(): URL {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

  try {
    return new URL(configuredSiteUrl);
  } catch {
    return new URL(defaultSiteUrl);
  }
}

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "Guide-DAO-Organization",
  repo: "hackerhouse",
  branch: "feat/fumadocs-init",
};
