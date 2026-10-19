<script setup>
import { ref, watch } from "vue";
import AppIcon from "./AppIcon.vue";
import {
  website,
  selectedPackage,
  normalizeWebsite,
  focusProposal,
  createMailto,
} from "../lib/proposal.js";
const props = defineProps({ location: { type: String, default: "hero" } });
const error = ref("");
const emailPrepared = ref(false);
watch(
  [website, selectedPackage],
  () => {
    error.value = "";
    emailPrepared.value = false;
  },
  { flush: "sync" },
);
function submit() {
  error.value = "";
  const url = normalizeWebsite(website.value);
  if (!url) {
    error.value = "Bitte gib eine gültige Website ein, z. B. deine-firma.ch.";
    document.getElementById(`${props.location}-website`)?.focus();
    return;
  }
  website.value = url;
  if (props.location === "hero") {
    focusProposal(selectedPackage.value);
    return;
  }
  emailPrepared.value = true;
  window.location.href = createMailto(url, selectedPackage.value);
}
</script>

<template>
  <form
    class="proposal-form"
    :class="`proposal-form-${location}`"
    novalidate
    @submit.prevent="submit"
  >
    <label class="sr-only" :for="`${location}-website`"
      >Deine aktuelle Website</label
    >
    <div class="url-input-group">
      <AppIcon name="link" :size="18" /><input
        :id="`${location}-website`"
        v-model="website"
        name="website"
        type="text"
        inputmode="url"
        autocomplete="url"
        autocapitalize="none"
        spellcheck="false"
        placeholder="https://your-website.ch"
        required
        :aria-invalid="!!error"
        :aria-describedby="error ? `${location}-error` : undefined"
      /><button class="button" type="submit">
        Get a proposal <AppIcon :size="17" />
      </button>
    </div>
    <p v-if="error" :id="`${location}-error`" class="form-error" role="alert">
      {{ error }}
    </p>
    <div
      v-if="location === 'proposal' && selectedPackage"
      class="selected-package"
    >
      Gewähltes Paket: {{ selectedPackage }}
      <button
        type="button"
        aria-label="Paketauswahl entfernen"
        @click="selectedPackage = ''"
      >
        <AppIcon name="close" :size="14" />
      </button>
    </div>
    <p v-if="emailPrepared" class="email-prepared" role="status">
      Deine Anfrage ist als E-Mail vorbereitet. Prüfe sie in deinem
      E-Mail-Programm und sende sie ab.
    </p>
  </form>
</template>
