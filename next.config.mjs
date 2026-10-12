import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "@takumi-rs/core",
    "takumi-js",
  ],
  reactStrictMode: true,
  redirects() {
    // Remove consolidated copies from the content collection, while preserving
    // published page, legacy /docs, Markdown export, and social image URLs.
    const aliases = [
      ["/using-everstrat/what-is-everstrat", "/introduction/what-is-everstrat"],
      [
        "/introduction/how-the-system-is-organized",
        "/contributing/system-and-responsibilities",
      ],
      ["/introduction/monorepo-map", "/contributing/repository-map"],
      ["/engineering/monorepo-structure", "/contributing/repository-map"],
      [
        "/engineering/workspace-responsibilities",
        "/contributing/system-and-responsibilities",
      ],
      [
        "/engineering/cross-workspace-sync-rules",
        "/contributing/cross-workspace-sync-rules",
      ],
      [
        "/engineering/how-docs-should-be-maintained",
        "/contributing/how-docs-should-be-maintained",
      ],
    ];

    return aliases.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `/docs${source}`, destination, permanent: true },
      {
        source: `${source}.mdx`,
        destination: `/llms.mdx/docs${destination}/content.md`,
        permanent: true,
      },
      {
        source: `/docs${source}.mdx`,
        destination: `/llms.mdx/docs${destination}/content.md`,
        permanent: true,
      },
      {
        source: `/llms.mdx/docs${source}/content.md`,
        destination: `/llms.mdx/docs${destination}/content.md`,
        permanent: true,
      },
      {
        source: `/og/docs${source}/image.webp`,
        destination: `/og/docs${destination}/image.webp`,
        permanent: true,
      },
    ]);
  },
};

export default withMDX(config);
