# AGENTS.md

This file defines how agents should work inside the `frontend-app/everstrat-docs` workspace.

It is specific to the Everstrat Docs application.

## Mission

This workspace is the documentation delivery app for the Everstrat / Everything Strategy project.

Agents working here should optimize for:

- accurate documentation of shipped behavior
- clean Fumadocs and Next.js integration
- consistent visual alignment with the landing page brand
- safe updates to content, search, metadata, and LLM export routes

This is not a generic starter Fumadocs app anymore. Treat it as a product-facing docs surface.

## What This Workspace Owns

This app owns:

- the public docs UI
- MDX content rendering from `content/docs`
- root-routed docs pages
- search API
- docs metadata, structured data, icons, OG/Twitter assets, sitemap, robots, manifest, and LLM export routes

This app does not own:

- protocol implementation
- web3 client business logic
- landing page product copy

But it must stay aligned with all of them.

## Key Paths

- `app/(docs)/[[...slug]]/page.tsx`: main docs page route
- `app/(docs)/layout.tsx`: shared docs shell
- `app/docs/[[...slug]]/page.tsx`: legacy `/docs/*` redirect
- `app/api/search/route.ts`: Fumadocs search endpoint
- `app/robots.ts`: crawl directives
- `app/sitemap.ts`: sitemap generation
- `app/opengraph-image.tsx`: default social preview image
- `app/twitter-image.tsx`: Twitter/X social preview image
- `content/docs`: primary documentation source
- `lib/config.ts`: typed site, route, repo, and SEO config
- `lib/source.ts`: Fumadocs loader and page access
- `lib/metadata.ts`: shared Next metadata helpers
- `lib/structured-data.tsx`: JSON-LD helpers for home and docs pages
- `lib/layout.shared.tsx`: shared layout options
- `app/global.css`: docs theme

## Routing Rules

The docs app is root-routed.

- `/` is the docs home page
- `/<slug>` is a docs page
- `/docs/*` exists only as a compatibility redirect

Do not reintroduce a separate landing route inside this app unless explicitly requested.

## Content Rules

Documentation content lives in `content/docs`.

Agents should:

- write in technical English
- document current behavior, not speculative future behavior
- keep terminology consistent with `smart-contracts`, `frontend-app/web3-app`, and `mermaid`
- prefer explicit constraints, edge cases, and operational details over marketing phrasing

When protocol behavior changes, check whether docs content must be updated.

## Design Rules

This workspace should visually align with `frontend-app/landing`.

Current expectations:

- treat the landing page as the brand reference
- preserve the `SuisseIntl`-style typography stack used here
- preserve the warm neutral background and glassmorphism controls unless the task explicitly changes branding
- avoid introducing unrelated design systems or off-brand palettes

Use Fumadocs primitives, but theme them to match the product brand.

## Fumadocs Rules

Agents should work with the existing Fumadocs setup rather than fighting it.

- prefer updating `content/docs` over hardcoding page content in React
- keep cross-app constants in `lib/config.ts` when they are reused by multiple routes or layers
- keep `lib/source.ts` as the content access layer
- keep `lib/metadata.ts` as the metadata composition layer
- keep `lib/structured-data.tsx` as the JSON-LD composition layer
- use `source.config.ts` for MDX collection behavior, including the Fumadocs `lastModified` plugin
- do not hand-edit generated output under `.source`

If routing or layout changes are needed, preserve:

- root-routed docs behavior
- working page tree generation
- valid search indexing
- valid canonical metadata, sitemap output, robots output, and JSON-LD output
- valid `llms.txt` and `llms-full.txt` routes

## Environment Variables

Common variables used by this workspace:

- `NEXT_PUBLIC_SITE_URL`: absolute URL base for metadata
- `GOOGLE_SITE_VERIFICATION`: optional Google Search Console verification
- `BING_SITE_VERIFICATION`: optional Bing Webmaster verification
- `YANDEX_VERIFICATION`: optional Yandex verification
- `YAHOO_SITE_VERIFICATION`: optional Yahoo verification
- `VERCEL_DEEP_CLONE`: set to `true` on Vercel when Git-based last-modified timestamps must reflect full history

Do not hardcode production URLs or secrets into source files.

## Validation

Run validation from this workspace:

```bash
cd frontend-app/everstrat-docs
bun run docs:gen
bun run lint
bun run types:check
bun run build
```

Important:

- `bun run lint` runs Biome in write mode and may modify files
- `bun run docs:gen` refreshes generated `.source` files when docs collections change
- `bun run types:check` regenerates Next route types before TypeScript checking

At minimum, agents touching this workspace should run `bun run lint` unless blocked.

## Safe Editing Rules

- do not edit `.next/`
- do not edit `node_modules/`
- do not edit generated `.source/` files manually
- do not replace MDX content with hardcoded JSX unless the page truly requires a custom implementation
- do not break root routing or legacy `/docs/*` redirects
- do not scatter site-level strings or SEO defaults across routes when they belong in `lib/config.ts`

## Cross-Workspace Awareness

Changes in these locations often require docs updates:

- `smart-contracts/src`
- `smart-contracts/script`
- `frontend-app/web3-app/src/config`
- `frontend-app/web3-app/src/features`
- `mermaid/*.md`

If a task touches protocol behavior or frontend behavior outside this workspace, agents should check whether docs now drift from reality.

## Preferred Change Style

- make focused edits
- keep the docs app understandable
- avoid unnecessary refactors
- preserve the current architecture unless the task requires structural changes
- prefer extending existing patterns over introducing parallel systems

## Handoff Expectations

Final handoff for this workspace should include:

- what changed
- whether docs content, docs UI, or docs infrastructure changed
- which validation commands were run
- any unverified runtime assumptions, especially around search, metadata, LLM exports, or environment variables
