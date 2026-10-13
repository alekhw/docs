import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { after, before, test } from "node:test";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
let server;
let baseUrl;
let logs = "";

before(async () => {
  assert.ok(
    existsSync(join(root, ".next/BUILD_ID")),
    "Run bun run build first.",
  );
  const listener = createServer();
  listener.listen(0, "127.0.0.1");
  await once(listener, "listening");
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    [
      require.resolve("next/dist/bin/next"),
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (chunk) => {
    logs += chunk;
  });
  server.stderr.on("data", (chunk) => {
    logs += chunk;
  });
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline && server.exitCode === null) {
    try {
      const response = await fetch(baseUrl, {
        signal: AbortSignal.timeout(1000),
      });
      await response.arrayBuffer();
      if (response.ok) return;
    } catch {
      // Wait until the production server accepts requests.
    }
    await setTimeout(50);
  }
  throw new Error(`Production server did not start:\n${logs}`);
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  const exited = once(server, "exit");
  server.kill("SIGTERM");
  await exited;
});

const page = "/introduction/what-is-everstrat";
const nestedPage = "/how-everstrat-works/redemption-queue";
for (const [name, path, canonical, accept] of [
  ["page suffix", `${page}.mdx`, page, "text/html"],
  ["nested page suffix", `${nestedPage}.mdx`, nestedPage, "text/html"],
  ["Markdown Accept header", page, page, "text/markdown"],
  ["plain-text Accept header", page, page, "text/plain"],
  ["home Accept header", "/", "", "text/markdown"],
  ["home suffix", "/.mdx", "", "text/html"],
  ["legacy page suffix", `/docs${page}.mdx`, page, "text/html"],
  ["legacy page Accept header", `/docs${page}`, page, "text/markdown"],
  ["legacy home Accept header", "/docs", "", "text/markdown"],
]) {
  test(`${name} returns the canonical Markdown content`, async () => {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { Accept: accept },
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /^text\/markdown\b/);
    const expected = await fetch(
      `${baseUrl}/llms.mdx/docs${canonical}/content.md`,
    );
    assert.equal(expected.status, 200);
    assert.equal(await response.text(), await expected.text());
  });
}

test("normal and HTML-preferred page requests still return HTML", async () => {
  for (const accept of ["text/html", "text/html;q=1, text/markdown;q=0.5"]) {
    const response = await fetch(`${baseUrl}${page}`, {
      headers: { Accept: accept },
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /^text\/html\b/);
    assert.match(await response.text(), /What is Everstrat/);
  }
});

test("legacy HTML requests retain their canonical redirect", async () => {
  const response = await fetch(`${baseUrl}/docs${page}`, {
    headers: { Accept: "text/html" },
    redirect: "manual",
  });
  assert.equal(response.status, 307);
  assert.equal(
    new URL(response.headers.get("location"), baseUrl).pathname,
    page,
  );
});

test("missing Markdown pages remain 404", async () => {
  const response = await fetch(`${baseUrl}/not-a-docs-page.mdx`);
  assert.equal(response.status, 404);
});

test("search and document discovery endpoints remain excluded from negotiation", async () => {
  for (const [path, type] of [
    ["/api/search?query=redemption", /^application\/json\b/],
    ["/llms.txt", /^text\/plain\b/],
    ["/llms-full.txt", /^text\/plain\b/],
    ["/sitemap.xml", /^application\/xml\b/],
    ["/robots.txt", /^text\/plain\b/],
  ]) {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { Accept: "text/markdown" },
    });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type"), type, path);
    await response.arrayBuffer();
  }
});
