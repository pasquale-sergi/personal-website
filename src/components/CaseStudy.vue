<script setup>
import AppIcon from "./AppIcon.vue";
import BeforeAfterMockup from "./BeforeAfterMockup.vue";
const scope = [
  "Design & Entwicklung",
  "Produkte migriert",
  "Content-Management-System",
  "Modern & responsive",
  "Bestehende Inhalte übernommen",
  "Launch & Support",
];
</script>

<template>
  <section
    id="work"
    class="case-section section container"
    aria-labelledby="work-title"
  >
    <div class="case-heading">
      <div>
        <span class="eyebrow">AUS ALT WIRD ZEITGEMÄSS.</span>
        <h2 id="work-title">
          Gleicher Betrieb. Neuer Auftritt<span class="blue-period">.</span>
        </h2>
      </div>
      <span class="project-tag"
        >Beispielprojekt <AppIcon name="up" :size="14"
      /></span>
    </div>
    <div class="case-panel">
      <div class="case-intro">
        <div>
          <h3>Sportpreise Huber</h3>
          <p>Von TYPO3 zu einer modernen Website mit CMS.</p>
        </div>
        <span class="case-category">Website-Relaunch + CMS</span>
      </div>
      <BeforeAfterMockup layout="side-by-side" />
      <div class="case-scope">
        <div>
          <span class="eyebrow">DER PROJEKTUMFANG</span>
          <p>Alles da. Nur besser aufgebaut.</p>
        </div>
        <ul>
          <li v-for="item in scope" :key="item">
            <AppIcon name="check" :size="14" />{{ item }}
          </li>
        </ul>
      </div>
    </div>
    <p class="illustration-note">
      Illustrative Vorher-Nachher-Darstellung des beschriebenen
      Beispielprojekts.
    </p>
  </section>
</template>
