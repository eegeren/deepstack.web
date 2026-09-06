import assert from "node:assert/strict";
import test from "node:test";

import fs from "node:fs/promises";

async function render() {
  const nextHtmlPath = new URL("../.next/server/app/index.html", import.meta.url);
  try {
    const html = await fs.readFile(nextHtmlPath, "utf-8");
    return {
      status: 200,
      headers: new Headers({ "content-type": "text/html; charset=utf-8" }),
      text: async () => html,
    };
  } catch {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    const { default: worker } = await import(workerUrl.href);

    return worker.fetch(
      new Request("http://localhost/", { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
  }
}

test("server-renders the DeepStack product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DeepStack — Your AI Infrastructure Engineer<\/title>/i);
  assert.match(html, /Understand your infrastructure/);
  assert.match(html, /AI Infrastructure Engineer/);
  assert.doesNotMatch(html, /codex-preview|Building your site|vinext-starter/i);
});

test("documents the product-facing command surface", async () => {
  const html = await (await render()).text();

  for (const command of [
    "deepstack setup",
    "deepstack connect server production",
    "deepstack connect windows windows-prod",
    "deepstack connect aws production",
    "deepstack targets",
    "deepstack status production",
    "deepstack audit production",
    "deepstack ask production",
    "deepstack investigate production",
    "deepstack plan inv_",
    "deepstack demo",
  ]) {
    assert.ok(html.includes(command), `missing command: ${command}`);
  }

  assert.doesNotMatch(html, /deepstack audit exposure --target production/);
});

test("states current capability and safety boundaries honestly", async () => {
  const html = await (await render()).text();

  assert.match(html, /Current capability status/);
  assert.match(html, /Remediation planning/);
  assert.match(html, /Experimental/);
  assert.match(html, /Plan only/);
  assert.match(html, /Planning never changes infrastructure/);
  assert.match(html, /Predefined provider operations replace arbitrary shell access/);
  assert.match(html, /Telegram, WhatsApp, and web dashboard/);
  assert.match(html, /Not yet available/);
  assert.doesNotMatch(html, /executes safe remediation/i);
  assert.doesNotMatch(html, /rolls back on failure/i);
});

test("documents Linux, Windows Server, and AWS evidence sources", async () => {
  const html = await (await render()).text();

  assert.match(html, /What DeepStack can analyze/);
  assert.match(html, /SSH effective configuration/);
  assert.match(html, /Package update count where reliable/);
  assert.match(html, /STS identity and account context/);
  assert.match(html, /Security Groups and public ingress rules/);
  assert.match(html, /Windows Firewall profiles and RDP\/NLA state/);
  assert.match(html, /Installed roles including IIS, DNS, DHCP, Hyper-V and AD DS/);
});

test("states conservative exposure semantics", async () => {
  const html = await (await render()).text();

  assert.match(html, /A wildcard listener is not proof of internet exposure/);
  assert.match(html, /CONFIGURATION RISK/);
  assert.match(html, /EFFECTIVELY EXPOSED/);
  assert.match(html, /Windows RDP wildcard bindings remain configuration risks/);
});
