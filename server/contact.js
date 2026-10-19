import { createHash } from "node:crypto";
import {
  normalizeEmail,
  validateContact,
  SUBMISSION_ERROR,
} from "../shared/contact.js";

const MAX_BODY_BYTES = 12000;
const WINDOW_MS = 10 * 60 * 1000;

// Best effort per warm function instance; no IP addresses or lead data are stored.
export function createRateLimiter({
  limit = 5,
  windowMs = WINDOW_MS,
  maxEntries = 1000,
} = {}) {
  const requests = new Map();
  return (key, now) => {
    for (const [id, item] of requests)
      if (item.until <= now) requests.delete(id);
    let item = requests.get(key);
    if (!item) {
      if (requests.size >= maxEntries) return false;
      item = { count: 0, until: now + windowMs };
      requests.set(key, item);
    }
    item.count += 1;
    return item.count <= limit;
  };
}

export function createContactHandler({
  env = process.env,
  fetchImpl = (...args) => fetch(...args),
  now = Date.now,
  allowRequest = createRateLimiter(),
} = {}) {
  const json = (status, body, headers = {}) =>
    Response.json(body, {
      status,
      headers: { "Cache-Control": "no-store", ...headers },
    });
  return async function handleContact(request) {
    if (request.method !== "POST")
      return json(
        405,
        { error: "Nur POST-Anfragen sind erlaubt." },
        { Allow: "POST" },
      );
    const origin = request.headers.get("origin");
    if (
      (origin && origin !== new URL(request.url).origin) ||
      request.headers.get("sec-fetch-site") === "cross-site"
    )
      return json(403, { error: SUBMISSION_ERROR });
    if (
      request.headers.get("content-type")?.split(";")[0].trim() !==
      "application/json"
    )
      return json(415, { error: "Bitte sende JSON." });
    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES)
      return json(413, { error: "Die Anfrage ist zu gross." });
    const ip =
      request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";
    const ipKey = createHash("sha256").update(ip).digest("hex");
    if (!allowRequest(ipKey, now()))
      return json(
        429,
        { error: "Bitte warte kurz und versuche es nochmals." },
        { "Retry-After": "600" },
      );
    let data;
    try {
      let size = 0;
      const chunks = [];
      for await (const chunk of request.body || []) {
        size += chunk.byteLength;
        if (size > MAX_BODY_BYTES)
          return json(413, { error: "Die Anfrage ist zu gross." });
        chunks.push(Buffer.from(chunk));
      }
      data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return json(400, { error: "Ungültige Anfrage." });
    }
    if (data?.companyFax) return json(400, { error: "Ungültige Anfrage." });
    const { errors, value } = validateContact(data);
    if (
      Object.keys(errors).length ||
      !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(
        data?.requestId || "",
      )
    )
      return json(400, { error: "Bitte prüfe deine Angaben." });
    const from = env.CONTACT_FROM_EMAIL?.trim();
    const fromAddress = from?.match(/<([^<>]+)>$/)?.[1] || from;
    const recipient = normalizeEmail(env.CONTACT_RECIPIENT_EMAIL);
    if (
      !env.RESEND_API_KEY?.trim() ||
      !recipient ||
      !normalizeEmail(fromAddress) ||
      /[\r\n]/.test(from)
    )
      return json(503, { error: SUBMISSION_ERROR });
    const email = {
      from,
      to: [recipient],
      reply_to: value.email,
      subject: `Neue Website-Anfrage: ${new URL(value.website).hostname}`,
      text: `Neue Website-Anfrage\n\nWebsite:\n${value.website}\n\nKontakt:\n${value.email}\n\nNachricht:\n${value.message || "Keine Nachricht angegeben."}${value.packageName ? `\n\nGewünschtes Paket:\n${value.packageName}` : ""}`,
    };
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `website-enquiry/${data.requestId}`,
        },
        body: JSON.stringify(email),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== "string" || !result.id)
        return json(502, { error: SUBMISSION_ERROR });
      return json(200, { ok: true });
    } catch {
      return json(502, { error: SUBMISSION_ERROR });
    }
  };
}
