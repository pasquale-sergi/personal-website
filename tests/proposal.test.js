import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeWebsite, createMailto } from "../src/lib/proposal.js";

test("normalizes websites with or without a protocol and preserves paths", () => {
  assert.equal(normalizeWebsite("  example.ch  "), "https://example.ch/");
  assert.equal(
    normalizeWebsite("www.example.ch/kontakt?lang=de"),
    "https://www.example.ch/kontakt?lang=de",
  );
  assert.equal(normalizeWebsite("http://example.ch"), "http://example.ch/");
  assert.equal(
    normalizeWebsite("https://müller.ch"),
    "https://xn--mller-kva.ch/",
  );
});

test("rejects malformed, local and non-website URLs", () => {
  for (const value of [
    "",
    "hello",
    "not a website.ch",
    "localhost",
    "https://",
    "https://-firma.ch",
    "firma..ch",
    "https://firma.ch@evil.ch",
    "ftp://firma.ch",
    "javascript:alert(1)",
    "data:text/html,hello",
  ]) {
    assert.equal(normalizeWebsite(value), null, value);
  }
});

test("email request contains the recipient, normalized URL and selected package", () => {
  const mailto = createMailto("https://example.ch/?a=1&b=2", "Relaunch + CMS");
  const decoded = decodeURIComponent(mailto);
  assert.ok(decoded.startsWith("mailto:sergi.pasquale@outlook.com?"));
  const params = new URLSearchParams(mailto.split("?")[1]);
  assert.equal(params.get("subject"), "Anfrage: Website-Relaunch");
  assert.ok(params.get("body").includes("https://example.ch/?a=1&b=2"));
  assert.ok(params.get("body").includes("Relaunch + CMS"));
});
