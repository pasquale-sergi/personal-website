<script setup>
import { computed, nextTick, watch } from "vue";
import AppIcon from "./AppIcon.vue";
import { proposal, proposalEmail } from "../lib/proposal.js";
import { MAX_MESSAGE_LENGTH } from "../../shared/contact.js";
const props = defineProps({ location: { type: String, default: "hero" } });
const { state } = proposal;
const detailsOpen = computed(
  () => state.step === "details" && state.activeForm === props.location,
);
const success = computed(() => state.step === "success");
const websiteError = computed(() =>
  state.activeForm === props.location ? state.errors.website : "",
);
const id = (name) => `${props.location}-${name}`;
async function focusField(name) {
  await nextTick();
  document.getElementById(id(name))?.focus({ preventScroll: false });
}
watch(detailsOpen, (open) => {
  if (open) focusField("email");
});
watch(success, (complete) => {
  if (complete && state.activeForm === props.location) focusField("success");
});
async function submit() {
  if (!detailsOpen.value) {
    if (!proposal.openDetails(props.location)) await focusField("website");
    return;
  }
  await proposal.submit(props.location);
  if (Object.keys(state.errors).length)
    await focusField(Object.keys(state.errors)[0]);
}
async function edit() {
  proposal.editUrl(props.location);
  await focusField("website");
}
async function reset() {
  proposal.reset();
  await focusField("website");
}
</script>

<template>
  <div class="proposal-form" :class="`proposal-form-${location}`">
    <div
      v-if="success"
      class="proposal-success"
      :role="state.activeForm === location ? 'status' : undefined"
      :aria-live="state.activeForm === location ? 'polite' : 'off'"
    >
      <span class="success-check"
        ><AppIcon name="check" :size="20" /> Anfrage erhalten</span
      >
      <h3 :id="id('success')" tabindex="-1">Danke – Anfrage erhalten.</h3>
      <p>
        Ich schaue mir deine Website an und melde mich normalerweise innerhalb
        von 1–2 Werktagen mit einer ersten Einschätzung.
      </p>
      <button type="button" class="form-text-button" @click="reset">
        Neue Anfrage senden <AppIcon :size="15" />
      </button>
    </div>
    <form
      v-else
      novalidate
      :aria-busy="state.submitting && state.activeForm === location"
      @submit.prevent="submit"
    >
      <template v-if="!detailsOpen">
        <label class="sr-only" :for="id('website')"
          >Deine aktuelle Website</label
        >
        <div class="url-input-group">
          <AppIcon name="link" :size="18" />
          <input
            :id="id('website')"
            v-model="state.website"
            name="website"
            type="text"
            inputmode="url"
            autocomplete="url"
            autocapitalize="none"
            spellcheck="false"
            placeholder="https://deine-website.ch"
            required
            :disabled="state.submitting"
            :aria-invalid="!!websiteError"
            :aria-describedby="websiteError ? id('website-error') : undefined"
            @input="
              state.errors = {};
              state.submitError = '';
            "
          />
          <button class="button" type="submit" :disabled="state.submitting">
            Angebot anfragen <AppIcon :size="17" />
          </button>
        </div>
        <p
          v-if="websiteError"
          :id="id('website-error')"
          class="form-error"
          role="alert"
        >
          {{ websiteError }}
        </p>
      </template>
      <Transition name="proposal-expand">
        <div v-if="detailsOpen" class="proposal-details">
          <h3>Fast geschafft.</h3>
          <div class="submitted-website">
            <AppIcon name="link" :size="16" /><span>{{ state.website }}</span
            ><button
              type="button"
              class="form-text-button"
              :disabled="state.submitting"
              @click="edit"
            >
              Ändern
            </button>
          </div>
          <div class="proposal-field">
            <label :for="id('email')"
              >E-Mail <span aria-hidden="true">*</span></label
            >
            <input
              :id="id('email')"
              v-model="state.email"
              type="email"
              name="email"
              inputmode="email"
              autocomplete="email"
              autocapitalize="none"
              spellcheck="false"
              placeholder="name@firma.ch"
              required
              maxlength="254"
              :disabled="state.submitting"
              :aria-invalid="!!state.errors.email"
              :aria-describedby="
                state.errors.email ? id('email-error') : undefined
              "
              @input="
                delete state.errors.email;
                state.submitError = '';
              "
            />
            <p
              v-if="state.errors.email"
              :id="id('email-error')"
              class="form-error"
              role="alert"
            >
              {{ state.errors.email }}
            </p>
          </div>
          <div class="proposal-field">
            <label :for="id('message')"
              >Was möchtest du verbessern?
              <span class="optional-label">Optional</span></label
            >
            <textarea
              :id="id('message')"
              v-model="state.message"
              name="message"
              rows="4"
              :maxlength="MAX_MESSAGE_LENGTH"
              :disabled="state.submitting"
              placeholder="Zum Beispiel: Die Website wirkt veraltet, funktioniert auf dem Handy nicht gut oder ich möchte Inhalte einfacher bearbeiten können."
              :aria-invalid="!!state.errors.message"
              :aria-describedby="
                state.errors.message ? id('message-error') : undefined
              "
              @input="
                delete state.errors.message;
                state.submitError = '';
              "
            ></textarea>
            <p
              v-if="state.errors.message"
              :id="id('message-error')"
              class="form-error"
              role="alert"
            >
              {{ state.errors.message }}
            </p>
          </div>
          <div class="proposal-honeypot" aria-hidden="true">
            <label :for="id('fax')">Bitte leer lassen</label
            ><input
              :id="id('fax')"
              v-model="state.companyFax"
              type="text"
              name="companyFax"
              tabindex="-1"
              autocomplete="off"
            />
          </div>
          <div v-if="state.submitError" class="submission-error" role="alert">
            <p>{{ state.submitError }}</p>
            <a :href="`mailto:${proposalEmail}`">{{ proposalEmail }}</a>
          </div>
          <button
            class="button proposal-send"
            type="submit"
            :disabled="state.submitting"
          >
            <span aria-live="polite">{{
              state.submitting ? "Wird gesendet…" : "Anfrage senden"
            }}</span
            ><AppIcon v-if="!state.submitting" :size="17" />
          </button>
          <p class="proposal-privacy">
            Deine Angaben verwende ich, um deine Anfrage zu beantworten.
          </p>
        </div>
      </Transition>
      <div v-if="state.packageName" class="selected-package">
        Gewähltes Paket: {{ state.packageName }}
        <button
          type="button"
          aria-label="Paketauswahl entfernen"
          :disabled="state.submitting"
          @click="state.packageName = ''"
        >
          <AppIcon name="close" :size="14" />
        </button>
      </div>
    </form>
  </div>
</template>
