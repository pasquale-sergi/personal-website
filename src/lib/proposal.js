import { reactive, toRef } from "vue";
import {
  normalizeWebsite,
  validateContact,
  SUBMISSION_ERROR,
} from "../../shared/contact.js";
export { normalizeWebsite } from "../../shared/contact.js";
export const proposalEmail = (
  import.meta.env?.VITE_PROPOSAL_EMAIL || "sergi.pasquale@outlook.com"
).trim();

export function createProposalController({
  fetchImpl = (...args) => fetch(...args),
  onEvent = () => {},
  newId = () => crypto.randomUUID(),
} = {}) {
  const initial = () => ({
    website: "",
    email: "",
    message: "",
    packageName: "",
    companyFax: "",
    step: "url",
    activeForm: null,
    submitting: false,
    errors: {},
    submitError: "",
  });
  const state = reactive(initial());
  let lastPayload = "";
  let requestId = "";
  function openDetails(location) {
    if (state.submitting) return false;
    state.activeForm = location;
    const website = normalizeWebsite(state.website);
    state.errors = {};
    if (!website) {
      state.errors.website =
        "Bitte gib eine gültige Website ein, z. B. deine-firma.ch.";
      return false;
    }
    state.website = website;
    state.activeForm = location;
    state.step = "details";
    state.submitError = "";
    onEvent("url-submitted", { location });
    onEvent("second-step-opened", { location });
    return true;
  }
  async function submit(location) {
    if (
      state.submitting ||
      state.step !== "details" ||
      state.activeForm !== location
    )
      return false;
    const { errors, value } = validateContact(state);
    state.errors = errors;
    state.submitError = "";
    if (Object.keys(errors).length) {
      if (errors.website) state.step = "url";
      return false;
    }
    const payload = JSON.stringify({ ...value, companyFax: state.companyFax });
    if (lastPayload !== payload || !requestId) {
      lastPayload = payload;
      requestId = newId();
    }
    state.submitting = true;
    try {
      const response = await fetchImpl("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...JSON.parse(payload), requestId }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error("Request not accepted");
      state.step = "success";
      onEvent("enquiry-submitted", { location });
      return true;
    } catch {
      state.submitError = SUBMISSION_ERROR;
      return false;
    } finally {
      state.submitting = false;
    }
  }
  function editUrl(location) {
    if (state.submitting) return;
    state.activeForm = location;
    state.step = "url";
    state.errors = {};
    state.submitError = "";
  }
  function reset() {
    if (state.submitting) return;
    Object.assign(state, initial());
    requestId = "";
    lastPayload = "";
  }
  return { state, openDetails, submit, editUrl, reset };
}
// Events intentionally contain no website, email or message data.
export const proposal = createProposalController({
  onEvent(name, detail) {
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent(`proposal:${name}`, { detail }));
  },
});
export const website = toRef(proposal.state, "website");
export const selectedPackage = toRef(proposal.state, "packageName");
export function focusProposal(packageName = "") {
  if (proposal.state.submitting) return;
  if (proposal.state.step === "success") proposal.reset();
  selectedPackage.value = packageName;
  proposal.state.activeForm = "proposal";
  const detailsOpen = proposal.state.step === "details";
  document
    .getElementById("proposal")
    ?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  if (!detailsOpen)
    document.getElementById("proposal-website")?.focus({ preventScroll: true });
}
