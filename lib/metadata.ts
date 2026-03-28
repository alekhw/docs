import type { InferPageType } from "fumadocs-core/source";
import type { Metadata, MetadataRoute } from "next";
import {
  getAbsoluteUrl,
  getGitHubRepoUrl,
  getSiteUrl,
  siteConfig,
} from "@/lib/config";
import { source } from "@/lib/source";

type DocsPage = InferPageType<typeof source>;

const defaultSocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteConfig.seo.defaultSocialImageAlt,
} as const;

function getVerificationMetadata(): Metadata["verification"] | undefined {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const yandex = process.env.YANDEX_VERIFICATION;
  const yahoo = process.env.YAHOO_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;

  if (!google && !yandex && !yahoo && !bing) {
    return undefined;
  }

  return {
    google,
    yandex,
    yahoo,
    other: bing
      ? {
          "msvalidate.01": bing,
        }
      : undefined,
  };
}

export const rootMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: siteConfig.creator,
      url: getGitHubRepoUrl(),
    },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  category: siteConfig.category,
  alternates: {
    canonical: siteConfig.routes.docs,
  },
  manifest: siteConfig.routes.manifest,
  icons: {
    icon: [
      { url: siteConfig.assets.favicon, sizes: "any" },
      {
        url: siteConfig.assets.icon16,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: siteConfig.assets.icon32,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: siteConfig.assets.appleTouchIcon,
        sizes: "180x180",
      },
      {
        url: siteConfig.assets.appleTouchIconPrecomposed,
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.openGraphLocale,
    url: siteConfig.routes.docs,
    siteName: siteConfig.seo.siteTitle,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultSocialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  verification: getVerificationMetadata(),
};

export function createDocsPageMetadata(
  page: DocsPage,
  pageImageUrl: string,
): Metadata {
  const imageAlt = `${page.data.title} | ${siteConfig.name}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      url: page.url,
      siteName: siteConfig.seo.siteTitle,
      title: page.data.title,
      description: page.data.description,
      locale: siteConfig.openGraphLocale,
      images: [
        {
          url: pageImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [pageImageUrl],
    },
  };
}

export function getDisallowedRobotsPaths(): string[] {
  return [
    siteConfig.routes.search,
    `${siteConfig.routes.docsContent}/`,
    siteConfig.routes.llmsIndex,
    siteConfig.routes.llmsFull,
  ];
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: getAbsoluteUrl(page.url),
    changeFrequency: page.url === siteConfig.routes.docs ? "weekly" : "monthly",
    priority: page.url === siteConfig.routes.docs ? 1 : 0.7,
  }));
}
