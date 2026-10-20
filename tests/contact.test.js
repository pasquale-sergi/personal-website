import { test } from "node:test";
import assert from "node:assert/strict";
import { createContactHandler, createRateLimiter } from "../server/contact.js";

// All credentials and responses below are fixtures. No external email calls are made.
const env = {
  RESEND_API_KEY: "test-provider-key",
  CONTACT_RECIPIENT_EMAIL: "owner@example.ch",
  CONTACT_FROM_EMAIL: "Pasquale <anfragen@example.ch>",
};
const valid = {
  website: "example.ch",
  email: "person@example.ch",
  message: "Die Website wirkt alt.\nBitte modernisieren.",
  packageName: "Relaunch mit CMS",
  requestId: "f02342f3-a057-4ac7-8ad5-ec4cff8472ee",
  companyFax: "",
};
function request(body = valid, headers = {}) {
  return new Request("https://www.pasquale.dev/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://www.pasquale.dev",
      "x-vercel-forwarded-for": "192.0.2.1",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
function handler(options = {}) {
  return createContactHandler({
    env,
    fetchImpl: async () => Response.json({ id: "mock-message-id" }),
    ...options,
  });
}

test("sends useful plain text to configured recipient with reply-to and idempotency", async () => {
  const h = handler({
    fetchImpl: async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails");
      assert.equal(options.headers.Authorization, "Bearer test-provider-key");
      assert.equal(
        options.headers["Idempotency-Key"],
        `website-enquiry/${valid.requestId}`,
      );
      const mail = JSON.parse(options.body);
      assert.equal(mail.from, env.CONTACT_FROM_EMAIL);
      assert.deepEqual(mail.to, ["owner@example.ch"]);
      assert.equal(mail.reply_to, valid.email);
      assert.equal(mail.subject, "Neue Website-Anfrage: example.ch");
      assert.ok(mail.text.includes("https://example.ch/"));
      assert.ok(mail.text.includes(valid.message));
      assert.ok(mail.text.includes(valid.packageName));
      assert.equal(mail.html, undefined);
      return Response.json({ id: "mock-message-id" });
    },
  });
  const response = await h(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
});
test("server accepts absent optional message", async () => {
  const h = handler({
    fetchImpl: async (_, options) => {
      assert.ok(
        JSON.parse(options.body).text.includes("Keine Nachricht angegeben."),
      );
      return Response.json({ id: "mock-id" });
    },
  });
  const body = { ...valid };
  delete body.message;
  assert.equal((await h(request(body))).status, 200);
});
test("invalid input and honeypot never call provider or report success", async () => {
  for (const patch of [
    { website: "javascript:alert(1)" },
    { website: "" },
    { email: "invalid" },
    { email: "x@example.ch\r\nBcc:someone@example.ch" },
    { message: "x".repeat(3001) },
    { message: {} },
    { packageName: "Untrusted package" },
    { requestId: "invalid" },
    { companyFax: "bot-filled" },
  ]) {
    let calls = 0;
    const h = handler({
      fetchImpl: () => {
        calls++;
        throw new Error("Provider must not be called");
      },
    });
    assert.equal(
      (await h(request({ ...valid, ...patch }))).status,
      400,
      JSON.stringify(patch),
    );
    assert.equal(calls, 0);
  }
});
test("missing delivery configuration fails closed without exposing credentials", async () => {
  let calls = 0;
  const response = await handler({
    env: {},
    fetchImpl: () => {
      calls++;
    },
  })(request());
  assert.equal(response.status, 503);
  assert.equal(calls, 0);
  assert.doesNotMatch(
    await response.text(),
    /RESEND_API_KEY|test-provider-key/,
  );
});
test("provider failures, invalid acknowledgements and network errors never report success", async () => {
  for (const fetchImpl of [
    async () => Response.json({ message: "Denied" }, { status: 403 }),
    async () => Response.json({}),
    async () => {
      throw new Error("network error");
    },
    async () => new Response("invalid JSON"),
  ])
    assert.equal((await handler({ fetchImpl })(request())).status, 502);
});
test("method, origin, content-type, malformed JSON and payload sizes are checked", async () => {
  const h = handler();
  const get = await h(new Request("https://www.pasquale.dev/api/contact"));
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("allow"), "POST");
  assert.equal(
    (await h(request(valid, { Origin: "https://other.ch" }))).status,
    403,
  );
  assert.equal(
    (await h(request(valid, { "sec-fetch-site": "cross-site" }))).status,
    403,
  );
  assert.equal(
    (await h(request(valid, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (
      await h(
        new Request("https://www.pasquale.dev/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{",
        }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await h(request({ ...valid, message: "x".repeat(13000) }))).status,
    413,
  );
});
test("endpoint throttles a sixth attempt without sending email", async () => {
  let calls = 0;
  const h = handler({
    fetchImpl: async () => {
      calls++;
      return Response.json({ id: "mock-id" });
    },
  });
  for (let i = 0; i < 5; i++) assert.equal((await h(request())).status, 200);
  const limited = await h(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "600");
  assert.equal(calls, 5);
});
test("limiter has bounded memory, isolates clients and expires windows", () => {
  const allow = createRateLimiter({ limit: 1, windowMs: 100, maxEntries: 2 });
  assert.equal(allow("one", 0), true);
  assert.equal(allow("one", 1), false);
  assert.equal(allow("two", 1), true);
  assert.equal(allow("three", 1), false);
  assert.equal(allow("three", 101), true);
});

test("invalid sender or recipient configuration never calls the provider", async () => {
  for (const patch of [
    { RESEND_API_KEY: "" },
    { CONTACT_RECIPIENT_EMAIL: "invalid" },
    { CONTACT_FROM_EMAIL: "invalid" },
    { CONTACT_FROM_EMAIL: "a@example.ch\r\nBcc:someone@example.ch" },
  ]) {
    let calls = 0;
    const response = await handler({
      env: { ...env, ...patch },
      fetchImpl: () => {
        calls++;
      },
    })(request());
    assert.equal(response.status, 503);
    assert.equal(calls, 0);
  }
});
