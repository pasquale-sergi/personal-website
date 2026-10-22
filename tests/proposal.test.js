import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeWebsite,
  isValidEmail,
  validateProposal,
  createMailto,
  submitProposal,
} from "../src/lib/proposal.js";

const request = {
  url: "https://example.ch/?a=1&b=2",
  email: "anna@example.ch",
  message: "Die Seite ist auf dem Handy kaum lesbar.",
  packageName: "Relaunch mit CMS",
};

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

test("validates email addresses and reports field errors", () => {
  assert.ok(isValidEmail(" anna@example.ch "));
  for (const value of ["", "anna", "anna@", "anna@example", "a b@example.ch"])
    assert.equal(isValidEmail(value), false, value);
  assert.deepEqual(validateProposal({ url: "example.ch", email: "a@b.ch" }), {});
  assert.deepEqual(Object.keys(validateProposal({ url: "x", email: "" })), [
    "website",
    "email",
  ]);
});

test("email request contains recipient, URL, reply address, message and package", () => {
  const mailto = createMailto(request);
  assert.ok(decodeURIComponent(mailto).startsWith("mailto:sergi.pasquale@outlook.com?"));
  const params = new URLSearchParams(mailto.split("?")[1]);
  assert.equal(params.get("subject"), "Anfrage: Website-Relaunch");
  const body = params.get("body");
  for (const part of [request.url, request.email, request.message, request.packageName])
    assert.ok(body.includes(part), part);
  assert.ok(!body.includes("ß"));
});

test("submit falls back to email, posts to an endpoint, and drops spam", async () => {
  assert.equal((await submitProposal(request, { endpoint: "" })).mode, "mailto");
  assert.equal(
    (await submitProposal({ ...request, honeypot: "x" }, { endpoint: "https://f" })).mode,
    "ignored",
  );
  let sent;
  const ok = async (url, init) => ((sent = { url, init }), { ok: true });
  assert.equal((await submitProposal(request, { endpoint: "https://f", fetchImpl: ok })).mode, "sent");
  assert.equal(sent.url, "https://f");
  assert.deepEqual(JSON.parse(sent.init.body), {
    website: request.url,
    email: request.email,
    message: request.message,
    package: request.packageName,
    subject: "Anfrage: Website-Relaunch",
  });
  await submitProposal(request, {
    endpoint: "https://f",
    encoding: "form",
    extraFields: { "form-name": "anfrage" },
    fetchImpl: ok,
  });
  assert.equal(sent.init.headers["Content-Type"], "application/x-www-form-urlencoded");
  const params = new URLSearchParams(sent.init.body);
  assert.equal(params.get("form-name"), "anfrage");
  assert.equal(params.get("email"), request.email);
  await assert.rejects(
    submitProposal(request, { endpoint: "https://f", fetchImpl: async () => ({ ok: false, status: 500 }) }),
  );
});
