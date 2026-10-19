<script setup>
import AppIcon from "./AppIcon.vue";
import ProposalForm from "./ProposalForm.vue";
import BeforeAfterMockup from "./BeforeAfterMockup.vue";
const values = [
  { icon: "bolt", text: "Schnell umgesetzt" },
  { icon: "shield", text: "Fixpreis. Klarer Umfang." },
  { icon: "mobile", text: "Modern & mobilfreundlich" },
  { icon: "smile", text: "Ohne technisches Vorwissen" },
];
</script>

<template>
  <section id="home" class="hero container" aria-labelledby="hero-title">
    <div class="hero-main">
      <div class="hero-copy">
        <div class="offer-badge">
          <span class="status-dot"></span> Website-Relaunch ab
          <strong>CHF 990</strong>
        </div>
        <h1 id="hero-title">
          Your old website,<br /><span>rebuilt.</span
          ><span class="heading-period" aria-hidden="true"></span>
        </h1>
        <p class="hero-description">
          Moderne, schnelle und mobilfreundliche Websites für Schweizer
          Kleinunternehmen. Ohne Agenturpreise.
        </p>
        <ProposalForm />
        <p class="hero-note">
          Du hast schon eine Website? Perfekt. Ich übernehme deine bestehenden
          Inhalte – du musst nicht alles neu vorbereiten.
        </p>
        <a class="hero-text-link" href="#work"
          >So kann dein neuer Auftritt aussehen <AppIcon :size="15"
        /></a>
      </div>
      <BeforeAfterMockup />
    </div>
    <div class="hero-values">
      <div v-for="value in values" :key="value.text">
        <AppIcon :name="value.icon" :size="19" /><span>{{ value.text }}</span>
      </div>
    </div>
  </section>
</template>
