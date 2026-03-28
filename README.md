# Everstrat Docs

This workspace contains the public documentation site for the Everstrat / Everything Strategy monorepo.

It is built with Fumadocs on top of Next.js App Router and is intended to document the real state of the project across protocol contracts, the web3 client, operational flows, and supporting architecture artifacts.

## What This App Does

The docs application is responsible for:

- serving the documentation site from the root route `/`
- rendering MDX content from `content/docs`
- exposing full-text search through `app/api/search/route.ts`
- generating `llms.txt` and `llms-full.txt`
- generating documentation-specific metadata, JSON-LD, OG/Twitter assets, sitemap, robots, and manifest data

## Tech Stack

- Next.js 16
- React 19
- Fumadocs Core
- Fumadocs UI
- Fumadocs MDX collections
- Tailwind CSS 4
- Biome
- TypeScript 6

## Project Structure

```text
frontend-app/everstrat-docs/
├── app/
│   ├── (docs)/[[...slug]]/page.tsx   # Root-routed documentation pages
│   ├── (docs)/layout.tsx             # Docs layout and shared UI shell
│   ├── api/search/route.ts           # Search endpoint
│   ├── docs/[[...slug]]/page.tsx     # Legacy redirect from /docs/* to /*
│   ├── llms.txt/route.ts             # LLM-friendly text index
│   ├── llms-full.txt/route.ts        # Full LLM export
│   ├── layout.tsx                    # Root HTML shell and metadata
│   ├── global.css                    # Docs theme styling
│   ├── manifest.ts                   # App metadata manifest
│   ├── opengraph-image.tsx           # Default social preview image
│   ├── twitter-image.tsx             # Twitter/X social preview image
│   ├── robots.ts                     # Crawl directives
│   └── sitemap.ts                    # XML sitemap
├── components/
│   ├── markdown.tsx                  # MDX rendering helpers
│   └── ui/                           # Shared UI helpers
├── content/docs/                     # MDX source content
├── lib/
│   ├── config.ts                     # Typed site, route, repo, and SEO config
│   ├── layout.shared.tsx             # Shared layout options
│   ├── metadata.ts                   # Metadata and sitemap helpers
│   ├── structured-data.tsx           # JSON-LD helpers
│   ├── social-image.tsx              # Shared OG/Twitter image component
│   └── source.ts                     # Fumadocs content loader and page access helpers
├── public/                           # Favicons and app icons
├── source.config.ts                  # Fumadocs MDX collection config
├── package.json
└── README.md
```

## Routing Model

The docs site is root-routed.

- `/` renders the docs home page
- `/<slug>` renders additional docs pages
- `/docs/*` is kept only as a legacy redirect path

This is intentional because the app is expected to run behind a dedicated docs subdomain.

## Content Model

Documentation content lives in `content/docs`.

The Fumadocs loader in `lib/source.ts` builds:

- page trees
- page metadata
- search source material
- LLM export material

When writing or restructuring docs, the `content/docs` tree is the primary source of truth.

`source.config.ts` enables the Fumadocs `lastModified` plugin, so page-level "last updated"
timestamps come from Git history instead of filesystem mtimes.

## Search API

### Full-text Search

`app/api/search/route.ts` creates a Fumadocs search endpoint from the current content source.

## Structured Data

The app emits JSON-LD for:

- `WebSite` and `Organization` at the app shell level
- `TechArticle` and `BreadcrumbList` for documentation pages

These are generated from shared helpers rather than hardcoded in individual pages.

## Metadata And Public URL

The app uses `NEXT_PUBLIC_SITE_URL` to compute absolute metadata URLs.
Optional verification tags can be supplied with:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`
- `YANDEX_VERIFICATION`
- `YAHOO_SITE_VERIFICATION`

If you deploy on Vercel and want accurate Git-based last-modified timestamps during build, set:

- `VERCEL_DEEP_CLONE=true`

Recommended local and production setup:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set it to the final docs domain:

```bash
NEXT_PUBLIC_SITE_URL=https://docs.example.com
```

## Local Development

### Prerequisites

- Bun 1.3+ recommended
- Node.js 20+ recommended

### Install

```bash
bun install
```

### Run

```bash
bun run dev
```

If you changed `content/docs` structure or `source.config.ts` and need to refresh generated
Fumadocs source files manually:

```bash
bun run docs:gen
```

Default local URL:

- [http://localhost:3000](http://localhost:3000)

## Quality Checks

```bash
bun run docs:gen
bun run lint
bun run types:check
bun run build
```

Notes:

- `bun run lint` runs `biome check --write`, `biome format --write`, and `tsc --noEmit`
- `bun run lint` may modify files
- `bun run docs:gen` refreshes generated Fumadocs source files under `.source`
- `bun run types:check` regenerates Next route types before running TypeScript

## Writing Documentation

When documenting the project:

- prefer concrete, current behavior over aspirational descriptions
- keep terminology aligned with `smart-contracts`, `web3-app`, and Mermaid architecture diagrams
- update docs when protocol flows, permissions, deployment assumptions, or frontend behavior change
- document user-facing and operator-facing constraints, not just ideal happy paths

## Related Workspaces

This workspace should stay aligned with:

- `../../smart-contracts`
- `../web3-app`
- `../landing`
- `../../mermaid`

In practice, if those workspaces change, docs often need changes too.
