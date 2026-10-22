import { ref } from "vue";
import { site, form } from "../site.config.js";

// Shared between the hero field and the full request form.
export const website = ref("");
export const selectedPackage = ref("");
export const proposalEmail = site.email;

export function normalizeWebsite(value) {
  const input = value.trim();
  if (!input || /\s/.test(input)) return null;
  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`,
    );
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return null;
    const labels = url.hostname.split(".");
    if (labels.length < 2 || !/^[a-z]{2,63}$/i.test(labels.at(-1))) return null;
    if (
      !labels.every((label) =>
        /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i.test(label),
      )
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());
}

// Returns field errors; an empty object means the request can be sent.
export function validateProposal({ url, email }) {
  const errors = {};
  if (!normalizeWebsite(url || ""))
    errors.website = "Bitte gib eine gültige Website ein, z.B. deine-firma.ch.";
  if (!isValidEmail(email || ""))
    errors.email = "Bitte gib deine E-Mail-Adresse ein, damit ich antworten kann.";
  return errors;
}

export function focusProposal(packageName = "", field = "proposal-website") {
  selectedPackage.value = packageName;
  document.getElementById("anfrage")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
    block: "center",
  });
  document.getElementById(field)?.focus({ preventScroll: true });
}

export function createProposalText({ url, email, message, packageName }) {
  return [
    "Hallo Pasquale",
    "",
    "Ich möchte eine kostenlose Einschätzung für meine Website:",
    url,
    packageName ? `\nGewünschtes Paket: ${packageName}` : "",
    message ? `\nWas mich an der aktuellen Website stört:\n${message.trim()}` : "",
    "",
    `Antwort bitte an: ${email}`,
    "",
    "Freundliche Grüsse",
    "",
  ]
    .filter((line, i, lines) => line !== "" || lines[i - 1] !== "")
    .join("\n");
}

export function createMailto(data) {
  return `mailto:${encodeURIComponent(proposalEmail)}?subject=${encodeURIComponent("Anfrage: Website-Relaunch")}&body=${encodeURIComponent(createProposalText(data))}`;
}

// Resolves to "sent" (endpoint), "mailto" (email app) or "ignored" (spam trap).
export async function submitProposal(
  data,
  {
    endpoint = form.endpoint,
    encoding = form.encoding,
    extraFields = form.extraFields,
    fetchImpl = globalThis.fetch,
  } = {},
) {
  if (data.honeypot) return { mode: "ignored" };
  if (!endpoint) return { mode: "mailto", href: createMailto(data) };
  const fields = {
    ...extraFields,
    website: data.url,
    email: data.email,
    message: data.message || "",
    package: data.packageName || "",
    subject: "Anfrage: Website-Relaunch",
  };
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      "Content-Type":
        encoding === "form" ? "application/x-www-form-urlencoded" : "application/json",
      Accept: "application/json",
    },
    body:
      encoding === "form" ? new URLSearchParams(fields).toString() : JSON.stringify(fields),
  });
  if (!response.ok) throw new Error(`Form endpoint answered ${response.status}`);
  return { mode: "sent" };
}
