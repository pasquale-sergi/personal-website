import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createProposalController } from "../src/lib/proposal.js";
import {
  normalizeWebsite,
  normalizeEmail,
  validateContact,
  MAX_MESSAGE_LENGTH,
  SUBMISSION_ERROR,
} from "../shared/contact.js";

const requestId = "f02342f3-a057-4ac7-8ad5-ec4cff8472ee";
const setup = (options = {}) =>
  createProposalController({ newId: () => requestId, ...options });
function fill(controller, location = "hero") {
  controller.state.website = "example.ch";
  controller.openDetails(location);
  controller.state.email = "person@example.ch";
  controller.state.message = "Die mobile Darstellung verbessern.";
}

test("normalizes common URLs, paths, ports and international domains", () => {
  for (const [input, expected] of [
    ["  example.ch  ", "https://example.ch/"],
    [
      "www.example.ch/kontakt?lang=de",
      "https://www.example.ch/kontakt?lang=de",
    ],
    ["http://example.ch", "http://example.ch/"],
    ["example.ch:8080/kontakt", "https://example.ch:8080/kontakt"],
    ["https://müller.ch", "https://xn--mller-kva.ch/"],
  ])
    assert.equal(normalizeWebsite(input), expected);
});
test("rejects malformed, local and unsafe URLs", () => {
  for (const input of [
    null,
    {},
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
    "https://example.ch/" + "a".repeat(2048),
  ])
    assert.equal(normalizeWebsite(input), null);
});
test("email validation rejects invalid addresses and header injection", () => {
  assert.equal(
    normalizeEmail(" person+web@EXAMPLE.CH "),
    "person+web@example.ch",
  );
  assert.equal(normalizeEmail("person@müller.ch"), "person@xn--mller-kva.ch");
  for (const input of [
    undefined,
    {},
    "",
    "person",
    "person@localhost",
    "person@example",
    "person@@example.ch",
    "person@exam_ple.ch",
    ".person@example.ch",
    "person..test@example.ch",
    "person@example.ch\r\nBcc:other@example.ch",
    "person@example.ch/path",
    "person@example.ch:443",
  ])
    assert.equal(normalizeEmail(input), null, String(input));
});
test("message is optional, bounded and validated on both sides", () => {
  assert.deepEqual(
    validateContact({ website: "example.ch", email: "a@example.ch" }).errors,
    {},
  );
  assert.equal(
    validateContact({ website: "example.ch", email: "a@example.ch" }).value
      .message,
    "",
  );
  for (const message of ["x".repeat(MAX_MESSAGE_LENGTH + 1), 42, "a\0b"])
    assert.ok(
      validateContact({ website: "example.ch", email: "a@example.ch", message })
        .errors.message,
    );
});
for (const location of ["hero", "proposal"]) {
  test(`${location}: URL step reveals details without sending or redirecting`, () => {
    let calls = 0;
    const events = [];
    const c = setup({
      fetchImpl: () => {
        calls++;
      },
      onEvent: (name, detail) => events.push([name, detail]),
    });
    assert.equal(c.state.step, "url");
    c.state.website = "invalid";
    assert.equal(c.openDetails(location), false);
    assert.equal(c.state.step, "url");
    c.state.website = "example.ch";
    assert.equal(c.openDetails(location), true);
    assert.equal(c.state.website, "https://example.ch/");
    assert.equal(c.state.step, "details");
    assert.equal(c.state.activeForm, location);
    assert.equal(calls, 0);
    assert.deepEqual(
      events.map((e) => e[0]),
      ["url-submitted", "second-step-opened"],
    );
    assert.deepEqual(events[0][1], { location });
  });
}
test("only active details step may submit; email is required", async () => {
  let calls = 0;
  const c = setup({
    fetchImpl: () => {
      calls++;
    },
  });
  assert.equal(await c.submit("hero"), false);
  c.state.website = "example.ch";
  c.openDetails("hero");
  assert.equal(await c.submit("hero"), false);
  assert.ok(c.state.errors.email);
  c.state.email = "a@example.ch";
  assert.equal(await c.submit("proposal"), false);
  assert.equal(calls, 0);
});
test("successful submission waits for API acknowledgement and blocks double clicks", async () => {
  let resolve;
  let calls = 0;
  const events = [];
  const c = setup({
    fetchImpl: (url, options) => {
      calls++;
      assert.equal(url, "/api/contact");
      assert.equal(options.method, "POST");
      assert.equal(JSON.parse(options.body).email, "person@example.ch");
      return new Promise((r) => {
        resolve = r;
      });
    },
    onEvent: (name) => events.push(name),
  });
  fill(c);
  const pending = c.submit("hero");
  assert.equal(c.state.submitting, true);
  assert.equal(c.state.step, "details");
  assert.equal(await c.submit("hero"), false);
  assert.equal(calls, 1);
  resolve(Response.json({ ok: true }));
  assert.equal(await pending, true);
  assert.equal(c.state.step, "success");
  assert.equal(c.state.submitting, false);
  assert.ok(events.includes("enquiry-submitted"));
  c.reset();
  assert.equal(c.state.step, "url");
  assert.equal(c.state.email, "");
});
test("optional message submits successfully and selected package is retained", async () => {
  const c = setup({
    fetchImpl: async (_, options) => {
      const body = JSON.parse(options.body);
      assert.equal(body.message, "");
      assert.equal(body.packageName, "Relaunch mit CMS");
      return Response.json({ ok: true });
    },
  });
  fill(c, "proposal");
  c.state.message = "";
  c.state.packageName = "Relaunch mit CMS";
  assert.equal(await c.submit("proposal"), true);
});
test("HTTP, network and malformed-success errors preserve entered fields", async () => {
  for (const fetchImpl of [
    async () => Response.json({ error: "Unavailable" }, { status: 503 }),
    async () => {
      throw new Error("offline");
    },
    async () => Response.json({}),
    async () => new Response("not JSON"),
  ]) {
    const c = setup({ fetchImpl });
    fill(c);
    assert.equal(await c.submit("hero"), false);
    assert.equal(c.state.step, "details");
    assert.equal(c.state.email, "person@example.ch");
    assert.equal(c.state.message, "Die mobile Darstellung verbessern.");
    assert.equal(c.state.submitError, SUBMISSION_ERROR);
    assert.equal(c.state.submitting, false);
  }
});
test("retries reuse the same idempotency key and editing the URL preserves the draft", async () => {
  const ids = [];
  const c = setup({
    fetchImpl: async (_, options) => {
      ids.push(JSON.parse(options.body).requestId);
      return Response.json({}, { status: 502 });
    },
  });
  fill(c);
  await c.submit("hero");
  await c.submit("hero");
  assert.deepEqual(ids, [requestId, requestId]);
  c.editUrl("proposal");
  assert.equal(c.state.email, "person@example.ch");
  assert.equal(c.openDetails("proposal"), true);
  assert.equal(c.state.activeForm, "proposal");
});
test("submission has no mailto or email-client dependency", () => {
  const code = readFileSync(
    new URL("../src/lib/proposal.js", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    code,
    /mailto:|window\.location|createMailto|emailPrepared/,
  );
});

test("changing a retry payload generates a new idempotency key", async () => {
  let generated = 0;
  const ids = [];
  const c = setup({
    newId: () => `request-${++generated}`,
    fetchImpl: async (_, options) => {
      ids.push(JSON.parse(options.body).requestId);
      return Response.json({}, { status: 502 });
    },
  });
  fill(c);
  await c.submit("hero");
  c.state.message = "Ein anderer Wunsch.";
  await c.submit("hero");
  assert.deepEqual(ids, ["request-1", "request-2"]);
});

test("an invalid URL edited in the other placement returns to the URL step without losing the draft", async () => {
  const c = setup();
  fill(c);
  c.state.website = "invalid";
  assert.equal(await c.submit("hero"), false);
  assert.equal(c.state.step, "url");
  assert.ok(c.state.errors.website);
  assert.equal(c.state.email, "person@example.ch");
});
