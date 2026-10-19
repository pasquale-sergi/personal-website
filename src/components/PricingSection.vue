<script setup>
import AppIcon from "./AppIcon.vue";
import { focusProposal } from "../lib/proposal.js";
const packages = [
  {
    name: "Website Relaunch",
    price: "990",
    description: "Deine bestehende Website. Rundum erneuert.",
    button: "Jetzt starten",
    features: [
      "Bis zu 5 Seiten",
      "Modernes, responsives Design",
      "Bestehende Inhalte übernommen",
      "Kontaktformular / E-Mail-Anbindung",
      "SEO-Grundlagen eingerichtet",
      "Domain verbinden",
      "2 Korrekturrunden",
      "Begleitung bis zur Veröffentlichung",
    ],
  },
  {
    name: "Relaunch + CMS",
    price: "1’290",
    description: "Ein neuer Auftritt, den du selbst pflegen kannst.",
    button: "Jetzt starten",
    popular: true,
    features: [
      "Alles aus dem Website Relaunch",
      "Texte, Produkte & Bilder selbst ändern",
      "Einfaches Content-Management-System",
      "Kein Designwissen erforderlich",
      "Persönliche Kurzeinführung",
      "Optionale Betreuung nach der Veröffentlichung",
    ],
  },
  {
    name: "Individuelles Projekt",
    price: null,
    description: "Du brauchst mehr? Wir finden die passende Lösung.",
    button: "Projekt anfragen",
    features: [
      "Grössere Websites",
      "Buchungssysteme",
      "Onlineshop",
      "Schnittstellen & Integrationen",
      "Mehrsprachige Websites",
      "Individuelle Anforderungen",
    ],
  },
];
</script>

<template>
  <section
    id="preise"
    class="pricing-section section"
    aria-labelledby="pricing-title"
  >
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">ÜBERSCHAUBAR. VON ANFANG AN.</span>
        <h2 id="pricing-title">
          Guter Auftritt. Klare Preise<span class="blue-period">.</span>
        </h2>
        <p>Klare Pakete, keine versteckten Kosten.</p>
      </div>
      <div class="pricing-grid">
        <article
          v-for="pkg in packages"
          :key="pkg.name"
          class="pricing-card"
          :class="{ 'pricing-popular': pkg.popular }"
        >
          <div v-if="pkg.popular" class="popular-label">
            <span>✦</span> Beliebteste Wahl
          </div>
          <div class="pricing-card-top">
            <h3>{{ pkg.name }}</h3>
            <p>{{ pkg.description }}</p>
            <div class="price">
              <template v-if="pkg.price"
                ><span class="currency">CHF</span> {{ pkg.price }}</template
              ><template v-else
                ><span class="custom-price">Auf Anfrage</span></template
              >
            </div>
            <span class="price-note">{{
              pkg.price
                ? "Einmalig. Klar vereinbart."
                : "Individuelles Angebot. Klar definiert."
            }}</span>
          </div>
          <ul>
            <li v-for="feature in pkg.features" :key="feature">
              <AppIcon name="check" :size="15" />{{ feature }}
            </li>
          </ul>
          <button
            class="button"
            :class="pkg.popular ? '' : 'button-secondary'"
            type="button"
            @click="focusProposal(pkg.name)"
          >
            {{ pkg.button }} <AppIcon :size="17" />
          </button>
        </article>
      </div>
      <p class="pricing-footnote">
        <AppIcon name="shield" :size="15" /> Du erhältst immer ein verbindliches
        Angebot, bevor es losgeht. Hosting und externe Dienste werden separat
        vereinbart.
      </p>
    </div>
  </section>
</template>
