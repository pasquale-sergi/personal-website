import { ref } from "vue";

export const website = ref("");
export const selectedPackage = ref("");
export const proposalEmail = (
  import.meta.env?.VITE_PROPOSAL_EMAIL || "sergi.pasquale@outlook.com"
).trim();

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

export function focusProposal(packageName = "") {
  selectedPackage.value = packageName;
  document
    .getElementById("proposal")
    ?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  document.getElementById("proposal-website")?.focus({ preventScroll: true });
}

export function createProposalText(url, packageName) {
  return `Hallo Pasquale\n\nIch möchte meine bestehende Website modernisieren lassen:\n${url}\n${packageName ? `\nMein gewünschtes Paket: ${packageName}\n` : ""}\nBitte sende mir ein unverbindliches Angebot.\n\nMeine Wünsche:\n\nFreundliche Grüsse\n`;
}

export function createMailto(url, packageName) {
  return `mailto:${encodeURIComponent(proposalEmail)}?subject=${encodeURIComponent("Anfrage: Website-Relaunch")}&body=${encodeURIComponent(createProposalText(url, packageName))}`;
}
