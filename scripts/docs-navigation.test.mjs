import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import config from "../next.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = join(root, "content/docs");
const read = (path) => readFileSync(join(contentRoot, path), "utf8");
const meta = (path) => JSON.parse(read(path));
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
const pages = walk(contentRoot).filter((path) => path.endsWith(".mdx"));
const routes = new Set(
  pages.map((path) => {
    const slug = relative(contentRoot, path).replace(/\.mdx$/, "");
    return slug === "index" ? "/" : `/${slug.replace(/\/index$/, "")}`;
  }),
);
const aliases = [
  ["/using-everstrat/what-is-everstrat", "/introduction/what-is-everstrat"],
  ["/introduction/monorepo-map", "/contributing/repository-map"],
  ["/engineering/monorepo-structure", "/contributing/repository-map"],
  [
    "/introduction/how-the-system-is-organized",
    "/contributing/system-and-responsibilities",
  ],
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

test("shared page tree and home cards put Introduction before Get Started", () => {
  assert.deepEqual(meta("meta.json").pages.slice(0, 3), [
    "index",
    "introduction",
    "get-started",
  ]);
  assert.deepEqual(meta("introduction/meta.json").pages, [
    "what-is-everstrat",
    "core-concepts-glossary",
  ]);
  const cards = [...read("index.mdx").matchAll(/<Card title="([^"]+)"/g)];
  assert.deepEqual(
    cards.slice(0, 3).map((match) => match[1]),
    ["Introduction", "Get Started", "Using Everstrat"],
  );
});

test("onboarding keeps existing URLs and names the four first-use steps", () => {
  const slugs = meta("get-started/meta.json").pages;
  assert.deepEqual(slugs, [
    "overview",
    "connect-wallet-and-supported-network",
    "first-mint",
    "burn-and-redeem",
  ]);
  assert.deepEqual(
    slugs.map(
      (slug) => read(`get-started/${slug}.mdx`).match(/^title: (.+)$/m)[1],
    ),
    [
      "Before you start",
      "Connect your wallet",
      "Your first deposit",
      "Your first exit",
    ],
  );
  const prerequisites = read("get-started/overview.mdx");
  for (const required of [
    "chain id **1**",
    "invite",
    "gas",
    "/reference/contract-addresses",
    "/using-everstrat/fees-and-costs",
    "/legal/risk-disclosure",
  ]) {
    assert.ok(prerequisites.includes(required), required);
  }
  assert.ok(
    read("get-started/first-mint.mdx").includes("I accept — continue to mint"),
  );
  const exit = read("get-started/burn-and-redeem.mdx");
  assert.ok(
    exit.indexOf("**Approve EVE if requested") < exit.indexOf("**Click Burn"),
  );
  assert.ok(exit.includes("confirm the separate transaction"));
});

test("consolidated pages leave only one product introduction in the collection", () => {
  const introductions = pages.filter((path) =>
    /^title: What is Everstrat\?$/m.test(readFileSync(path, "utf8")),
  );
  assert.equal(introductions.length, 1);
  for (const [source, destination] of aliases) {
    assert.ok(!routes.has(source), `Duplicate source remains: ${source}`);
    assert.ok(
      routes.has(destination),
      `Missing canonical page: ${destination}`,
    );
  }
  assert.ok(!existsSync(join(contentRoot, "engineering/meta.json")));
  assert.equal(meta("contributing/meta.json").title, "Contributing");
});

test("every navigation entry and internal content link resolves canonically", () => {
  for (const path of walk(contentRoot).filter((path) =>
    path.endsWith("meta.json"),
  )) {
    const dir = dirname(path);
    for (const entry of JSON.parse(readFileSync(path, "utf8")).pages ?? []) {
      assert.ok(
        existsSync(join(dir, `${entry}.mdx`)) ||
          existsSync(join(dir, entry, "meta.json")),
        `Missing navigation entry: ${path} -> ${entry}`,
      );
    }
  }
  for (const path of pages) {
    const text = readFileSync(path, "utf8");
    const links = [
      ...text.matchAll(/\]\((\/[^)\s]+)\)/g),
      ...text.matchAll(/href="(\/[^"\s]+)"/g),
    ];
    for (const [, href] of links) {
      const route = href.split(/[?#]/)[0];
      assert.ok(
        routes.has(route),
        `Missing or noncanonical link: ${path} -> ${href}`,
      );
    }
  }
});

test("old page, legacy, Markdown, and image URLs redirect directly to canonical paths", async () => {
  const redirects = await config.redirects();
  assert.equal(redirects.length, aliases.length * 6);
  assert.equal(
    new Set(redirects.map((rule) => rule.source)).size,
    redirects.length,
  );
  for (const [source, destination] of aliases) {
    for (const [oldPath, newPath] of [
      [source, destination],
      [`/docs${source}`, destination],
      [`${source}.mdx`, `/llms.mdx/docs${destination}/content.md`],
      [`/docs${source}.mdx`, `/llms.mdx/docs${destination}/content.md`],
      [
        `/llms.mdx/docs${source}/content.md`,
        `/llms.mdx/docs${destination}/content.md`,
      ],
      [`/og/docs${source}/image.webp`, `/og/docs${destination}/image.webp`],
    ]) {
      assert.deepEqual(
        redirects.find((rule) => rule.source === oldPath),
        {
          source: oldPath,
          destination: newPath,
          permanent: true,
        },
      );
    }
  }
});

test("all seven diagram embeds and direct figure links survive consolidation", () => {
  const text = pages.map((path) => readFileSync(path, "utf8")).join("\n");
  const names = [...text.matchAll(/<DocsDiagram name="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(names.sort(), [
    "architecture",
    "data",
    "exit",
    "mint",
    "nav",
    "queue",
    "strategies",
  ]);
  for (const name of names)
    assert.ok(text.includes(`#everstrat-${name}-diagram`));
});
