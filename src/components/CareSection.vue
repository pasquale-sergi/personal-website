<script setup>
import AppIcon from "./AppIcon.vue";
import { offer, care, terms } from "../site.config.js";
const managed = [
  "Hosting und Domain-Verwaltung",
  "Updates, Backups und Überwachung",
  `${terms.includedChanges} (nicht übertragbar)`,
  `Antwort ${offer.responseTime}`,
];
const ownSetup = [
  "Ich lade die fertige Website dort hoch, wo sie heute liegt",
  `Änderungen nach Aufwand: ${terms.hourly}, in 15-Minuten-Schritten`,
  "Mit eigenem Hosting prüfe ich vorab, ob das CMS dort sauber läuft.",
];
</script>

<template>
  <section
    id="betreuung"
    class="care-section section container"
    aria-labelledby="care-title"
  >
    <div class="section-heading">
      <span class="eyebrow">NACH DEM LAUNCH</span>
      <h2 id="care-title">
        Betreuung ist freiwillig<span class="blue-period">.</span>
      </h2>
      <p>
        Kein Interesse an Hosting oder Betreuung? Kein Problem. In den meisten
        Fällen kannst du dein bisheriges Setup behalten. Ich liefere dir die
        fertige Website und lade sie dort hoch, wo sie heute liegt. Änderungen
        später verrechne ich nur, wenn du sie brauchst.
      </p>
    </div>

    <div class="care-options">
      <article class="care-option care-option-recommended">
        <span class="care-badge">Empfohlen</span>
        <h3>Ich kümmere mich um alles</h3>
        <p class="care-price">
          {{ terms.careYearly }}
          <span class="care-price-note"
            >Per QR-Rechnung. Auf Wunsch monatlich:
            {{ terms.careMonthly }}.</span
          >
        </p>
        <ul class="check-list">
          <li v-for="item in managed" :key="item">
            <AppIcon name="check" :size="15" />{{ item }}
          </li>
        </ul>
      </article>
      <article class="care-option">
        <h3>Du behältst dein Setup</h3>
        <p class="care-price">Kein Vertrag, keine Fixkosten</p>
        <ul class="check-list">
          <li v-for="item in ownSetup" :key="item">
            <AppIcon name="check" :size="15" />{{ item }}
          </li>
        </ul>
      </article>
    </div>

    <p class="care-ownership">
      <AppIcon name="shield" :size="16" />
      Domain und Website gehören immer dir. Die Domain bleibt auf deinen Namen
      registriert.
    </p>
    <p class="care-summary">
      Mehr Aufwand brauchst du nicht. Du hast eine Website, die läuft, und eine
      Person, die du direkt erreichst.
    </p>
    <p class="care-note">
      Änderungen über die inbegriffenen {{ care.includedMinutes }} Minuten hinaus
      verrechne ich mit {{ terms.hourly }}, in 15-Minuten-Schritten.
      Domain-Gebühren sind nicht Teil der Betreuung, du bezahlst sie direkt beim
      Anbieter.
    </p>
    <p class="section-cta">
      <a class="text-link" href="#anfrage"
        >Link senden, kostenlose Einschätzung erhalten <AppIcon :size="16"
      /></a>
    </p>
  </section>
</template>
