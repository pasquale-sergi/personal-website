<script setup>
import AppIcon from "./AppIcon.vue";
import ProposalForm from "./ProposalForm.vue";
import BeforeAfterMockup from "./BeforeAfterMockup.vue";
import { offer, prices, show, chf } from "../site.config.js";
// Folded at build time, so no client name ships while the case study is off.
const mockupExample = __CASE_STUDY__ ? "huber" : "generic";
const values = [
  { icon: "bolt", text: "Rasch online" },
  { icon: "shield", text: "Fixer Preis, klarer Umfang" },
  { icon: "mobile", text: "Schnell und mobilfreundlich" },
  { icon: "smile", text: "Kein Vorwissen nötig" },
];
</script>

<template>
  <section id="start" class="hero container" aria-labelledby="hero-title">
    <div class="hero-main">
      <div class="hero-copy">
        <div class="offer-badge">
          <span class="status-dot"></span> Für Schweizer Kleinunternehmen
        </div>
        <h1 id="hero-title">
          Deine alte Website.<br /><span>Neu gemacht.</span>
        </h1>
        <p class="hero-description">
          Fixer Preis ab <strong>CHF {{ chf(prices.relaunch) }}</strong> · online
          in ca. {{ offer.deliveryDays }} Werktagen · bestehende Inhalte werden
          übernommen.
        </p>
        <p v-if="offer.niche" class="hero-niche">Für {{ offer.niche }}.</p>
        <ProposalForm />
        <p class="hero-note">
          Kostenlos und unverbindlich. Antwort in der Regel
          {{ offer.responseTime }}.
          <template v-if="offer.freePreview">
            Bei passenden Websites zeige ich dir vorab eine Vorschau deiner
            Startseite.
          </template>
        </p>
        <a
          class="hero-text-link"
          :href="show.caseStudy ? '#referenz' : '#ablauf'"
          >{{
            show.caseStudy ? "Ein Beispiel ansehen" : "So läuft ein Relaunch ab"
          }}
          <AppIcon :size="15"
        /></a>
      </div>
      <div class="hero-art">
        <BeforeAfterMockup :example="mockupExample" />
      </div>
    </div>
    <ul class="hero-values" aria-label="Das bekommst du">
      <li v-for="value in values" :key="value.text">
        <AppIcon :name="value.icon" :size="19" /><span>{{ value.text }}</span>
      </li>
    </ul>
  </section>
</template>
