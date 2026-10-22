<script setup>
import AppIcon from "./AppIcon.vue";
import { focusProposal } from "../lib/proposal.js";
import {
  offer,
  prices,
  extras,
  vatNote,
  show,
  terms,
  chf,
} from "../site.config.js";
const packages = [
  {
    name: "Website-Relaunch",
    price: chf(prices.relaunch),
    description: "Deine bestehende Website, rundum erneuert.",
    button: "Angebot anfragen",
    features: [
      "Bis zu 5 Seiten",
      "Modernes Design, gut lesbar auf dem Handy",
      "Bestehende Texte und Bilder übernommen",
      "Kontaktformular oder E-Mail-Anbindung",
      "SEO-Grundlagen und Weiterleitung alter Adressen",
      "Domain verbinden",
      offer.revisions,
      "Begleitung bis zum Launch",
    ],
  },
  {
    name: "Relaunch mit CMS",
    price: chf(prices.cms),
    description: "Ein neuer Auftritt, den du selbst pflegen kannst.",
    button: "Angebot anfragen",
    popular: true,
    features: [
      "Alles aus dem Website-Relaunch",
      "Texte, Bilder und Produkte selbst ändern",
      "Einfaches Content-Management-System (CMS)",
      "Kein Technikwissen nötig",
      "Persönliche Einführung",
      offer.revisions,
    ],
  },
  {
    name: "Individuelles Projekt",
    price: null,
    description: "Du brauchst mehr? Wir finden die passende Lösung.",
    examples:
      "z.B. Onlineshop, Buchungssystem, mehrsprachige Website, Automationen",
    button: "Projekt anfragen",
    features: [
      "Grössere Websites",
      "Schnittstellen zu anderen Systemen",
      "Individuelle Anforderungen",
      "Fixpreis nach kurzem Gespräch",
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
        <p>Ein fixer Preis für den Relaunch. Du weisst vorher, was du bekommst.</p>
      </div>
      <div class="pricing-grid">
        <article
          v-for="pkg in packages"
          :key="pkg.name"
          class="pricing-card"
          :class="{ 'pricing-popular': pkg.popular }"
        >
          <div v-if="pkg.popular" class="popular-label">
            <span aria-hidden="true">✦</span> Beliebteste Wahl
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
              pkg.price ? "Einmaliger Fixpreis." : "Individuelles Angebot."
            }}</span>
            <p v-if="pkg.examples" class="pricing-examples">
              {{ pkg.examples }}
            </p>
          </div>
          <ul class="check-list">
            <li v-for="feature in pkg.features" :key="feature">
              <AppIcon name="check" :size="15" />{{ feature }}
            </li>
          </ul>
          <button
            class="button"
            :class="pkg.popular ? '' : 'button-secondary'"
            type="button"
            :aria-label="`${pkg.button}: ${pkg.name}`"
            @click="focusProposal(pkg.name)"
          >
            {{ pkg.button }} <AppIcon :size="17" />
          </button>
        </article>
      </div>

      <p class="pricing-care">
        <AppIcon name="server" :size="17" />
        <span
          >Betreuung und Hosting optional: {{ terms.careYearly }},
          <a href="#betreuung">siehe unten</a>.</span
        >
      </p>

      <div class="pricing-details">
        <div>
          <h3>Im Fixpreis enthalten</h3>
          <ul class="check-list">
            <li>
              <AppIcon name="check" :size="15" />Bestehende Texte und Bilder
              übernehmen
            </li>
            <li><AppIcon name="check" :size="15" />{{ offer.revisions }}</li>
            <li>
              <AppIcon name="check" :size="15" />Weiterleitung alter
              Seiten-Adressen
            </li>
          </ul>
        </div>
        <div>
          <h3>Nicht enthalten, auf Wunsch extra</h3>
          <ul class="check-list">
            <li><AppIcon name="plus" :size="15" />Neue Texte schreiben</li>
            <li><AppIcon name="plus" :size="15" />Fotografie</li>
            <li><AppIcon name="plus" :size="15" />Übersetzungen</li>
          </ul>
        </div>
        <div>
          <h3>Praktische Extras</h3>
          <ul class="extras-list">
            <li v-for="extra in extras" :key="extra.name">
              <span>{{ extra.name }}</span
              ><span class="extra-price">CHF {{ chf(extra.price) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <p class="pricing-footnote">
        <AppIcon name="shield" :size="15" /> Du erhältst immer ein schriftliches
        Angebot, bevor es losgeht. Zahlung: {{ offer.paymentTerms }}.
        <template v-if="show.vatNote">{{ vatNote }}</template>
      </p>
    </div>
  </section>
</template>
