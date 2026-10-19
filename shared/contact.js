export const MAX_MESSAGE_LENGTH = 3000;
export const PACKAGES = [
  "Website Relaunch",
  "Relaunch + CMS",
  "Individuelles Projekt",
];
export const SUBMISSION_ERROR =
  "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuche es nochmals oder schreibe mir direkt per E-Mail.";

export function normalizeWebsite(value) {
  if (typeof value !== "string") return null;
  const input = value.trim();
  if (!input || input.length > 2048 || /\s/.test(input)) return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(input) ? input : `https://${input}`,
    );
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return null;
    const labels = url.hostname.split(".");
    if (
      labels.length < 2 ||
      !/^(?:[a-z]{2,63}|xn--[a-z\d-]{2,59})$/i.test(labels.at(-1))
    )
      return null;
    if (
      !labels.every((label) =>
        /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i.test(label),
      )
    )
      return null;
    return url.href.length <= 2048 ? url.href : null;
  } catch {
    return null;
  }
}

export function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (email.length > 254 || /[\s\r\n]/.test(email)) return null;
  const parts = email.split("@");
  if (
    parts.length !== 2 ||
    !/^[a-z\d.!#$%&'*+\-/=?^_`{|}~]+$/i.test(parts[0]) ||
    parts[0].length > 64 ||
    parts[0].startsWith(".") ||
    parts[0].endsWith(".") ||
    parts[0].includes("..")
  )
    return null;
  const domain = normalizeWebsite(parts[1]);
  if (!domain || /[/:?#]/.test(parts[1])) return null;
  return `${parts[0]}@${new URL(domain).hostname}`;
}

export function validateContact(data) {
  if (!data || typeof data !== "object" || Array.isArray(data))
    return { errors: { form: "Ungültige Anfrage." } };
  const errors = {};
  const website = normalizeWebsite(data.website);
  const email = normalizeEmail(data.email);
  if (!website)
    errors.website =
      "Bitte gib eine gültige Website ein, z. B. deine-firma.ch.";
  if (!email) errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  const message = data.message === undefined ? "" : data.message;
  if (
    typeof message !== "string" ||
    message.length > MAX_MESSAGE_LENGTH ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(message)
  )
    errors.message = `Bitte verwende höchstens ${MAX_MESSAGE_LENGTH} Zeichen.`;
  if (data.packageName && !PACKAGES.includes(data.packageName))
    errors.packageName = "Bitte wähle ein gültiges Paket.";
  return {
    errors,
    value: {
      website,
      email,
      message: typeof message === "string" ? message.trim() : "",
      packageName: data.packageName || "",
    },
  };
}
