<script setup>
// Only rendered when show.caseStudy is true in site.config.js, i.e. after
// Sportpreise Huber has approved publication.
import AppIcon from "./AppIcon.vue";
import BeforeAfterMockup from "./BeforeAfterMockup.vue";
const done = [
  "Neues Design, gut lesbar auf dem Handy",
  "Produktkatalog mit Pokalen, Medaillen und Gravuren",
  "Texte, Bilder und Produkte selbst bearbeitbar (CMS)",
  "Bestehende Inhalte übernommen",
];
// TODO: Zitat von Michi (nur mit schriftlicher Freigabe). Leer = Platzhalter.
const quote = "";
</script>

<template>
  <section
    id="referenz"
    class="case-section section container"
    aria-labelledby="work-title"
  >
    <div class="case-heading">
      <div>
        <span class="eyebrow">BEISPIEL AUS DER PRAXIS</span>
        <h2 id="work-title">
          Gleicher Betrieb. Neuer Auftritt<span class="blue-period">.</span>
        </h2>
      </div>
      <a
        class="project-tag"
        href="https://sportpreise-huber.ch"
        target="_blank"
        rel="noopener"
        >sportpreise-huber.ch ansehen <AppIcon name="up" :size="14"
      /></a>
    </div>
    <div class="case-panel">
      <div class="case-intro">
        <div>
          <h3>Sportpreise Huber, Kriens</h3>
          <p>Von einer älteren TYPO3-Website zu einer modernen Website mit CMS.</p>
        </div>
        <span class="case-category">Relaunch mit CMS</span>
      </div>
      <!-- TODO: Screenshot vorher/nachher einsetzen und die Illustration ersetzen. -->
      <BeforeAfterMockup layout="side-by-side" example="huber" />
      <div class="case-details">
        <div>
          <h4>Vorher</h4>
          <p>
            Eine ältere TYPO3-Website.
            [TODO: ein Satz, was den Kunden gestört hat]
          </p>
        </div>
        <div>
          <h4>Was ich gemacht habe</h4>
          <ul class="check-list">
            <li v-for="item in done" :key="item">
              <AppIcon name="check" :size="14" />{{ item }}
            </li>
          </ul>
        </div>
        <div>
          <h4>Ergebnis</h4>
          <p>[TODO: Ergebnis in 1–2 Sätzen, vom Kunden bestätigt]</p>
        </div>
      </div>
      <blockquote class="case-quote">
        <p>{{ quote || "[TODO: Zitat von Michi, nur mit Freigabe]" }}</p>
        <footer>Michi, Sportpreise Huber</footer>
      </blockquote>
    </div>
    <p class="illustration-note">
      Illustration. [TODO: Screenshot vorher/nachher]
    </p>
    <p class="section-cta">
      <a class="text-link" href="#anfrage"
        >Deine Website als Nächstes? Link senden <AppIcon :size="16"
      /></a>
    </p>
  </section>
</template>
