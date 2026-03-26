# AGENTS.md

This file defines how agents should work inside the `frontend-app/everstrat-docs` workspace.

It is specific to the Everstrat Docs application.

## Mission

This workspace is the documentation delivery app for the Everstrat / Everything Strategy project.

Agents working here should optimize for:

- accurate documentation of shipped behavior
- clean Fumadocs and Next.js integration
- consistent visual alignment with the landing page brand
- safe updates to content, search, AI chat, and metadata

This is not a generic starter Fumadocs app anymore. Treat it as a product-facing docs surface.

## What This Workspace Owns

This app owns:

- the public docs UI
- MDX content rendering from `content/docs`
- root-routed docs pages
- search API
- AI-assisted docs chat
- docs metadata, icons, manifest, and LLM export routes

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
- `app/api/chat/route.ts`: AI chat endpoint
- `content/docs`: primary documentation source
- `lib/source.ts`: Fumadocs loader and page access
- `lib/layout.shared.tsx`: shared layout options
- `app/global.css`: docs theme
- `components/ai/search.tsx`: AI search/chat UI

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
- keep `lib/source.ts` as the content access layer
- use `source.config.ts` for MDX collection behavior
- do not hand-edit generated output under `.source`

If routing or layout changes are needed, preserve:

- root-routed docs behavior
- working page tree generation
- valid search indexing
- valid `llms.txt` and `llms-full.txt` routes

## AI Search Rules

`app/api/chat/route.ts` is a grounded docs assistant, not a generic chatbot.

Agents should preserve these principles:

- answers should be grounded in docs search results
- the model should not invent unsupported claims
- if search results are insufficient, the assistant should say so
- AI behavior should remain documentation-oriented

If modifying the AI system:

- keep the `search` tool available unless explicitly replacing it
- preserve content grounding
- avoid changes that silently degrade answer reliability

## Environment Variables

Common variables used by this workspace:

- `NEXT_PUBLIC_SITE_URL`: absolute URL base for metadata
- `OPENROUTER_API_KEY`: required for AI chat
- `OPENROUTER_MODEL`: optional model override

Do not hardcode production URLs or secrets into source files.

## Validation

Run validation from this workspace:

```bash
cd frontend-app/everstrat-docs
bun run lint
bun run types:check
bun run build
```

Important:

- `bun run lint` runs Biome in write mode and may modify files
- `bun run types:check` regenerates types before TypeScript checking

At minimum, agents touching this workspace should run `bun run lint` unless blocked.

## Safe Editing Rules

- do not edit `.next/`
- do not edit `node_modules/`
- do not edit generated `.source/` files manually
- do not replace MDX content with hardcoded JSX unless the page truly requires a custom implementation
- do not break root routing or legacy `/docs/*` redirects

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
- any unverified runtime assumptions, especially around AI chat or environment variables
