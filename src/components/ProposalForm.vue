<script setup>
import { reactive, ref, watch } from "vue";
import AppIcon from "./AppIcon.vue";
import {
  website,
  selectedPackage,
  normalizeWebsite,
  validateProposal,
  focusProposal,
  submitProposal,
  proposalEmail,
} from "../lib/proposal.js";
import { offer } from "../site.config.js";

// "hero": URL field only, hands over to the full form at #anfrage.
// "proposal": full request form.
const props = defineProps({ location: { type: String, default: "hero" } });
const full = props.location === "proposal";
const id = (name) => `${props.location}-${name}`;

const email = ref("");
const message = ref("");
const honeypot = ref("");
const errors = reactive({});
const status = ref("idle"); // idle | loading | mailto | sent | error

watch([website, email], () => {
  delete errors.website;
  delete errors.email;
  // Keep the thank-you message when the fields were cleared after sending.
  const clearedAfterSend = status.value === "sent" && !website.value && !email.value;
  if (status.value !== "loading" && !clearedAfterSend) status.value = "idle";
});

function focusFirstError() {
  const field = errors.website ? "website" : "email";
  document.getElementById(id(field))?.focus();
}

async function submit() {
  if (!full) {
    const url = normalizeWebsite(website.value);
    if (!url) {
      errors.website = "Bitte gib eine gültige Website ein, z.B. deine-firma.ch.";
      focusFirstError();
      return;
    }
    website.value = url;
    focusProposal(selectedPackage.value, "proposal-email");
    return;
  }

  Object.assign(errors, validateProposal({ url: website.value, email: email.value }));
  if (errors.website || errors.email) return focusFirstError();

  const url = normalizeWebsite(website.value);
  website.value = url;
  status.value = "loading";
  try {
    const result = await submitProposal({
      url,
      email: email.value.trim(),
      message: message.value,
      packageName: selectedPackage.value,
      honeypot: honeypot.value,
    });
    if (result.mode === "mailto") {
      window.location.href = result.href;
      status.value = "mailto";
    } else {
      status.value = "sent";
      website.value = "";
      email.value = "";
      message.value = "";
      selectedPackage.value = "";
    }
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <form
    class="proposal-form"
    :class="`proposal-form-${location}`"
    novalidate
    @submit.prevent="submit"
  >
    <template v-if="!full">
      <label class="form-label" :for="id('website')"
        >Link senden, kostenlose Einschätzung erhalten</label
      >
      <div class="url-input-group">
        <AppIcon name="link" :size="18" /><input
          :id="id('website')"
          v-model="website"
          name="website"
          type="text"
          inputmode="url"
          autocomplete="url"
          autocapitalize="none"
          spellcheck="false"
          placeholder="deine-firma.ch"
          required
          :aria-invalid="!!errors.website"
          :aria-describedby="errors.website ? id('website-error') : undefined"
        /><button class="button" type="submit">
          Einschätzung erhalten <AppIcon :size="17" />
        </button>
      </div>
      <p
        v-if="errors.website"
        :id="id('website-error')"
        class="form-error"
        role="alert"
      >
        {{ errors.website }}
      </p>
    </template>

    <template v-else>
      <div class="form-field">
        <label :for="id('website')">Deine aktuelle Website</label>
        <input
          :id="id('website')"
          v-model="website"
          name="website"
          type="text"
          inputmode="url"
          autocomplete="url"
          autocapitalize="none"
          spellcheck="false"
          placeholder="deine-firma.ch"
          required
          :aria-invalid="!!errors.website"
          :aria-describedby="errors.website ? id('website-error') : undefined"
        />
        <p
          v-if="errors.website"
          :id="id('website-error')"
          class="form-error"
          role="alert"
        >
          {{ errors.website }}
        </p>
      </div>
      <div class="form-field">
        <label :for="id('email')">Deine E-Mail-Adresse</label>
        <input
          :id="id('email')"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          autocapitalize="none"
          spellcheck="false"
          placeholder="name@deine-firma.ch"
          required
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? id('email-error') : undefined"
        />
        <p
          v-if="errors.email"
          :id="id('email-error')"
          class="form-error"
          role="alert"
        >
          {{ errors.email }}
        </p>
      </div>
      <div class="form-field">
        <label :for="id('message')"
          >Was stört dich an deiner aktuellen Website?
          <span class="optional">(optional)</span></label
        >
        <textarea
          :id="id('message')"
          v-model="message"
          name="message"
          rows="3"
          maxlength="2000"
        ></textarea>
      </div>
      <!-- Spam trap: hidden from people, often filled in by bots. -->
      <div class="form-trap" aria-hidden="true">
        <label :for="id('company')">Firma (bitte leer lassen)</label>
        <input
          :id="id('company')"
          v-model="honeypot"
          name="company"
          type="text"
          tabindex="-1"
          autocomplete="off"
        />
      </div>
      <div v-if="selectedPackage" class="selected-package">
        Gewähltes Paket: {{ selectedPackage }}
        <button
          type="button"
          aria-label="Paketauswahl entfernen"
          @click="selectedPackage = ''"
        >
          <AppIcon name="close" :size="14" />
        </button>
      </div>
      <button
        class="button form-submit"
        type="submit"
        :disabled="status === 'loading'"
        :aria-busy="status === 'loading'"
      >
        {{
          status === "loading"
            ? "Wird gesendet …"
            : "Kostenlose Einschätzung anfordern"
        }}
        <AppIcon :size="17" />
      </button>
      <div class="form-status" role="status" aria-live="polite">
        <p v-if="status === 'sent'" class="form-success">
          Danke, ich melde mich {{ offer.responseTime }}.
        </p>
        <p v-else-if="status === 'mailto'" class="form-success">
          Danke! Dein E-Mail-Programm öffnet sich mit der vorbereiteten
          Anfrage. Sobald du sie abschickst, melde ich mich
          {{ offer.responseTime }}. Öffnet sich nichts? Schreib direkt an
          <a :href="`mailto:${proposalEmail}`">{{ proposalEmail }}</a
          >.
        </p>
        <p v-else-if="status === 'error'" class="form-error">
          Das hat leider nicht geklappt. Bitte versuch es nochmals oder schreib
          direkt an
          <a :href="`mailto:${proposalEmail}`">{{ proposalEmail }}</a
          >.
        </p>
      </div>
    </template>
  </form>
</template>
