# Everstrat Docs ToDo

This file is the working documentation backlog for the `frontend-app/everstrat-docs` workspace.

It is based on the current state of the monorepo, especially:

- `smart-contracts`
- `frontend-app/web3-app`
- `frontend-app/web3-app/subgraph`
- `frontend-app/landing`
- `mermaid`

The goal is to turn the current docs app from a starter setup into a real product and protocol documentation site.

## Primary Goal

Build a documentation project that explains:

- what Everstrat / Everything Strategy is
- how the protocol works
- what contracts exist and how they interact
- how the web3 app behaves
- how queued redemption and keeper-driven flows work
- how the subgraph and activity model work
- how the system is deployed, governed, and operated

## Source Of Truth Map

Before writing any page, use these sources:

### Product and brand context

- `frontend-app/landing/messages/en.json`
- `frontend-app/landing/src/widgets/HomePage`
- `frontend-app/landing/src/widgets/Header`

Use these for:

- product positioning
- user-facing messaging
- visual tone and terminology

### Protocol and contract behavior

- `smart-contracts/README.md`
- `smart-contracts/src/contracts/*.sol`
- `smart-contracts/src/interfaces/*.sol`
- `smart-contracts/test`
- `smart-contracts/script`

Use these for:

- protocol mechanics
- role model
- lifecycle and redemption flow
- deployment and upgrade assumptions

### Frontend behavior

- `frontend-app/web3-app/README.md`
- `frontend-app/web3-app/src/config/index.ts`
- `frontend-app/web3-app/src/features`
- `frontend-app/web3-app/src/features/account-details/README.md`

Use these for:

- supported chain and contract addresses
- wallet UX
- mint / burn UX
- account and activity behavior
- transaction flow behavior
- current frontend deployment snapshot

### Indexing and activity model

- `frontend-app/web3-app/subgraph/README.md`
- `frontend-app/web3-app/subgraph/docs/subgraph-technical-spec.md`
- `frontend-app/web3-app/subgraph/docs/query-examples.md`

Use these for:

- user activity feed semantics
- queue lifecycle indexing
- entity model
- GoldSky / subgraph integration
- deployed subgraph endpoint and deployment versions

### System diagrams

- `mermaid/mermaid-smart-contracts.md`
- `mermaid/access-control-diagram.md`
- `mermaid/deployment-architecture.md`

Use these for:

- architecture pages
- access control docs
- deployment docs

## Proposed Information Architecture

The docs site should be restructured around the following top-level sections.

### 1. Introduction

Pages to create:

- [ ] `Introduction / What is Everstrat?`
- [ ] `Introduction / How the system is organized`
- [ ] `Introduction / Monorepo map`
- [ ] `Introduction / Core concepts glossary`

Notes:

- This section should connect the landing-page promise with the actual protocol and product surfaces.
- Explain the relationship between Everstrat, Everything Strategy, the web3 app, smart contracts, and docs.

### 2. Protocol Overview

Pages to create:

- [ ] `Protocol / High-level architecture`
- [ ] `Protocol / User lifecycle`
- [ ] `Protocol / Mint flow`
- [ ] `Protocol / Burn and redemption flow`
- [ ] `Protocol / Queued redemption lifecycle`
- [ ] `Protocol / Strategy and NAV model`

Notes:

- Must clearly distinguish immediate redemption vs queued redemption.
- Must explain what happens on user action vs keeper action.

### 3. Smart Contracts

Pages to create:

- [ ] `Contracts / Overview`
- [ ] `Contracts / EVE`
- [ ] `Contracts / AMM`
- [ ] `Contracts / Controller`
- [ ] `Contracts / ExitQueue`
- [ ] `Contracts / StrategyManager`
- [ ] `Contracts / Oracle`
- [ ] `Contracts / Interfaces and libraries`

Notes:

- Each page should include purpose, upgradeability model, key responsibilities, important functions, important events, and access-control dependencies.
- This section should stay close to `smart-contracts/README.md`, but be more structured and easier to navigate.

### 4. Access Control and Security Model

Pages to create:

- [ ] `Security / Roles and permissions`
- [ ] `Security / Immutable vs upgradeable components`
- [ ] `Security / Trust assumptions`
- [ ] `Security / Failure and recovery scenarios`

Notes:

- Base this on `mermaid/access-control-diagram.md` and the contract README.
- Include `DEFAULT_ADMIN_ROLE`, `ADMIN_ROLE`, `KEEPER_ROLE`, `CONTROLLER_ROLE`, `AMM_ROLE`, `ORACLE_MANAGER_ROLE`, and `MINTER_ROLE`.

### 5. Web App

Pages to create:

- [ ] `App / Overview`
- [ ] `App / Wallet connection and supported chain`
- [ ] `App / Mint UI`
- [ ] `App / Burn UI`
- [ ] `App / Slippage model`
- [ ] `App / Account details and activity feed`
- [ ] `App / Transaction modal and status UX`

Notes:

- Base this on `frontend-app/web3-app/README.md` and feature-level source.
- This section should describe current shipped behavior, not generic future app ideas.

### 6. Subgraph and Data Model

Pages to create:

- [ ] `Data / Subgraph overview`
- [ ] `Data / Indexed contracts and events`
- [ ] `Data / Entities`
- [ ] `Data / Activity feed mapping`
- [ ] `Data / Query examples`

Notes:

- Use the subgraph README and technical spec directly.
- This section is important because the app depends on subgraph state for account activity and queued burn history.

### 7. Deployment and Operations

Pages to create:

- [ ] `Operations / Deployment architecture`
- [ ] `Operations / Contract deployment sequence`
- [ ] `Operations / Current deployments`
- [ ] `Operations / Smart contract addresses`
- [ ] `Operations / Subgraph deployments`
- [ ] `Operations / Environment variables`
- [ ] `Operations / Docs app runtime configuration`
- [ ] `Operations / Subgraph deployment`

Notes:

- Use `mermaid/deployment-architecture.md`, deployment scripts, and workspace READMEs.
- Keep the scope practical and operator-friendly.
- This section must include the actual currently configured deployment snapshot from `frontend-app/web3-app/src/config/index.ts`.
- This section must also include the current GoldSky subgraph deployment URL and version history strategy.

### 8. Architecture and Engineering

Pages to create:

- [ ] `Engineering / Monorepo structure`
- [ ] `Engineering / Workspace responsibilities`
- [ ] `Engineering / Cross-workspace sync rules`
- [ ] `Engineering / How docs should be maintained`

Notes:

- This section should help contributors and future agents understand where truth lives.
- It should align with `README.md` and `AGENTS.md`.

### 9. FAQ and Reference

Pages to create:

- [ ] `Reference / FAQ`
- [ ] `Reference / Glossary`
- [ ] `Reference / Network and links`

Notes:

- Reference should link back to the deployments section rather than duplicating deployment truth.
- This section should be compact and maintained over time.

### 10. Modern Web3 Standard Sections

Pages to create:

- [ ] `Get Started / Overview`
- [ ] `Get Started / Connect wallet and supported network`
- [ ] `Get Started / First mint`
- [ ] `Get Started / Burn and redeem`
- [ ] `Risk / Key risks and assumptions`
- [ ] `Risk / Smart contract and operational trust model`
- [ ] `Security / Audits, reviews, and known limitations`
- [ ] `Governance / Roles, permissions, and admin powers`
- [ ] `Developers / Contract addresses and deployments`
- [ ] `Developers / Events, entities, and integrations`
- [ ] `Developers / Subgraph and data access`
- [ ] `Reference / Troubleshooting`
- [ ] `Reference / Changelog or release notes strategy`

Notes:

- These are the sections users expect from serious Web3 docs, even when the protocol is still early.
- If an item does not yet have a final answer, the docs should say that explicitly instead of omitting the topic.

## Suggested Initial Content Tree

Proposed MDX structure to create under `content/docs`:

```text
content/docs/
├── index.mdx
├── introduction/
├── protocol/
├── contracts/
├── security/
├── app/
├── data/
├── operations/
├── engineering/
└── reference/
```

Suggested deployment subtree:

```text
content/docs/operations/
├── deployment-architecture.mdx
├── contract-deployment-sequence.mdx
├── current-deployments.mdx
├── smart-contract-addresses.mdx
├── subgraph-deployments.mdx
└── environment-variables.mdx
```

## Priority Plan

### P0: Replace placeholders and establish skeleton

- [ ] Remove starter placeholder docs content
- [ ] Create real homepage for the docs
- [ ] Create the section skeleton and navigation structure
- [ ] Create an initial glossary page
- [ ] Add a monorepo overview page

### P1: Publish the essential protocol story

- [ ] Write `What is Everstrat?`
- [ ] Write `Get Started / Overview`
- [ ] Write `Get Started / Connect wallet and supported network`
- [ ] Write `Get Started / First mint`
- [ ] Write `Get Started / Burn and redeem`
- [ ] Write protocol overview
- [ ] Write mint flow
- [ ] Write burn flow
- [ ] Write queued redemption lifecycle
- [ ] Write contract overview

### P2: Document system internals

- [ ] Add individual contract pages
- [ ] Add access control documentation
- [ ] Add governance and admin-power documentation
- [ ] Add risk and trust-assumption documentation
- [ ] Add security review / known limitation documentation
- [ ] Add deployment documentation
- [ ] Add current contract address documentation from frontend config
- [ ] Add current GoldSky deployment documentation from subgraph README
- [ ] Add subgraph and activity model documentation
- [ ] Add web app behavior documentation

### P3: Operational and contributor completeness

- [ ] Add environment and runtime configuration page
- [ ] Add developer integration pages
- [ ] Add troubleshooting page
- [ ] Add contract addresses and network reference page
- [ ] Add release notes / changelog strategy
- [ ] Add engineering / monorepo maintenance page
- [ ] Add FAQ
- [ ] Add reference pages for addresses, links, and queries

## Page-Level Writing Requirements

For each page:

- [ ] Use clear technical English
- [ ] Include links to related pages
- [ ] Prefer diagrams where architecture is hard to explain with plain text
- [ ] Separate user actions from keeper / system actions
- [ ] Call out assumptions and edge cases
- [ ] Avoid marketing language unless the page is intentionally product-facing

## Visual / UX Tasks For Docs App

- [ ] Replace the current placeholder docs homepage with a product-aligned overview page
- [ ] Keep docs theme aligned with `frontend-app/landing`
- [ ] Add meaningful navigation labels and section grouping
- [ ] Decide whether to expose AI chat on all docs pages or only on selected layouts
- [ ] Ensure search works well once the real content tree is added

## Content Extraction Tasks

### From `smart-contracts`

- [ ] Extract a concise protocol summary
- [ ] Extract contract responsibilities
- [ ] Extract role and permission model
- [ ] Extract queue lifecycle and slippage semantics
- [ ] Extract deployment and upgrade notes

### From `web3-app`

- [ ] Extract product behavior of mint / burn flows
- [ ] Extract supported network and address info
- [ ] Extract transaction UX model
- [ ] Extract account details and activity feed behavior
- [ ] Extract subgraph dependencies used by the frontend
- [ ] Extract the canonical current contract addresses from `src/config/index.ts`
- [ ] Extract the supported chain snapshot from `src/config/index.ts`

### From `web3-app/subgraph`

- [ ] Extract indexed user flows
- [ ] Extract entity model
- [ ] Extract query examples
- [ ] Extract performance / indexing assumptions
- [ ] Extract the live GoldSky deployment URL
- [ ] Extract the deployment naming / versioning strategy

### From `landing`

- [ ] Extract product promise and positioning
- [ ] Extract user-facing terminology
- [ ] Extract information architecture hints from top-level nav labels
- [ ] Keep docs tone compatible with the landing page

### From `mermaid`

- [ ] Reuse architecture diagram ideas for docs pages
- [ ] Reuse access control structure
- [ ] Reuse deployment sequence visuals

## Open Questions

- [ ] Should the docs be strictly public-facing, or include operator-only detail?
- [ ] Do we want contract API reference pages with signatures, or only conceptual documentation?
- [ ] Should subgraph docs live inside the main docs IA or as a dedicated engineering subsection?
- [ ] Do we want a `How it works` section optimized for non-technical readers, separate from protocol internals?
- [ ] Do we want to surface current Arbitrum Sepolia addresses as “current deployment” with explicit environment caveats?
- [ ] Do we want a dedicated `Risks` page linked from every core protocol page?
- [ ] Do we want a dedicated `Developers` section for integrators, or keep developer content inside `Reference` and `Data`?
- [ ] Should audit status be documented even if the answer is currently “not audited yet”?
- [ ] Should deployment pages include only current active addresses, or historical deployments too?
- [ ] Should GoldSky deployment versions be documented as a table or only as the current active endpoint?

## Current Known Deployment Snapshot To Document

These are current facts already present in the repo and should be surfaced in docs.

### Network

- [ ] Arbitrum Sepolia

### Smart contract addresses

- [ ] `EVE_TOKEN`: `0x5557d2579AB5cA2Ee689ad74f5C14688dFBcF24c`
- [ ] `EXIT_QUEUE`: `0xf441aA569970Ee134f79772CC85b419CAc1AD5F2`
- [ ] `CONTROLLER`: `0x5Fc0491f0ac2b3eA1f3FCD93CE23F41399DE44dA`
- [ ] `ORACLE`: `0x9725d4a2790c8610e82899C060Ef98de98cFa6fA`
- [ ] `STRATEGY_MANAGER`: `0x9021Ee2b5e9FB92648720438A7E085Ff2a39E720`
- [ ] `AMM`: `0x9551D8b1639a0981a9D88A6A834b43D8B913Aa28`
- [ ] `MOCK_STRATEGY`: `0xd5be61ac673DB992F1872Eb604FaEb1B34A6880f`

Source:

- `frontend-app/web3-app/src/config/index.ts`

### Subgraph deployment

- [ ] GoldSky current public endpoint:
  `https://api.goldsky.com/api/public/project_cm7aaq2gvh5ak01wf890nferb/subgraphs/everything-strategy/v0.1.4/gn`

Sources:

- `frontend-app/web3-app/src/config/index.ts`
- `frontend-app/web3-app/subgraph/README.md`

## Definition Of Done For The First Real Docs Release

- [ ] The homepage is no longer placeholder content
- [ ] The docs tree reflects the real system structure
- [ ] The docs include a real `Get Started` path for end users
- [ ] Core protocol concepts are documented
- [ ] Every core contract has at least one page
- [ ] The queued redemption lifecycle is explained clearly
- [ ] The web app behavior matches what is currently shipped
- [ ] The subgraph and activity model are documented
- [ ] Current network and contract addresses are documented
- [ ] Risks, trust assumptions, and role powers are documented
- [ ] Troubleshooting and FAQ exist
- [ ] The docs visually align with the landing page
- [ ] Search returns useful results on the new content
- [ ] AI chat can ground answers in the written docs
