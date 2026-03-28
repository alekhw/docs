import { getAbsoluteUrl, getGitHubRepoUrl, siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

function serialiseJsonLd(data: JsonLdValue): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: JsonLdValue }) {
  return <script type="application/ld+json">{serialiseJsonLd(data)}</script>;
}

export function getSiteJsonLd(): JsonLdValue {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      alternateName: siteConfig.seo.siteTitle,
      url: getAbsoluteUrl(),
      description: siteConfig.description,
      inLanguage: siteConfig.locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.creator,
      url: getAbsoluteUrl(),
      sameAs: [getGitHubRepoUrl()],
      logo: getAbsoluteUrl(siteConfig.assets.icon512),
    },
  ];
}

export function getHomePageJsonLd(
  description: string = siteConfig.description,
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: siteConfig.name,
    url: getAbsoluteUrl(),
    description,
    inLanguage: siteConfig.locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: getAbsoluteUrl(),
    },
    about: {
      "@type": "Thing",
      name: siteConfig.projectName,
    },
  };
}

function getBreadcrumbItems(pageUrl: string, pageTitle: string) {
  const items: Array<{ name: string; item: string }> = [
    {
      name: siteConfig.name,
      item: getAbsoluteUrl(),
    },
  ];

  const slug = pageUrl === "/" ? [] : pageUrl.split("/").filter(Boolean);
  const accumulated: string[] = [];

  for (const part of slug) {
    accumulated.push(part);
    const candidate = source.getPage(accumulated);
    if (!candidate) continue;

    items.push({
      name: candidate.data.title,
      item: getAbsoluteUrl(candidate.url),
    });
  }

  if (items.at(-1)?.item !== getAbsoluteUrl(pageUrl)) {
    items.push({
      name: pageTitle,
      item: getAbsoluteUrl(pageUrl),
    });
  }

  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  }));
}

export function getDocsPageJsonLd({
  title,
  description,
  pageUrl,
  imageUrl,
  lastModified,
}: {
  title: string;
  description: string;
  pageUrl: string;
  imageUrl: string;
  lastModified?: Date;
}): JsonLdValue {
  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      name: title,
      description,
      url: getAbsoluteUrl(pageUrl),
      image: [getAbsoluteUrl(imageUrl)],
      inLanguage: siteConfig.locale,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: getAbsoluteUrl(),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.creator,
        logo: {
          "@type": "ImageObject",
          url: getAbsoluteUrl(siteConfig.assets.icon512),
        },
      },
      author: {
        "@type": "Organization",
        name: siteConfig.creator,
      },
      mainEntityOfPage: getAbsoluteUrl(pageUrl),
      dateModified: lastModified?.toISOString(),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: getBreadcrumbItems(pageUrl, title),
    },
  ];
}
