<script setup>
import AppIcon from "./AppIcon.vue";
import { show, offer } from "../site.config.js";
const points = [
  {
    icon: "link",
    title: "Gleiche Inhalte, gleiche Adresse",
    text: "Nur Aussehen und Technik werden erneuert.",
  },
  {
    icon: "eye",
    title: "Die alte Website bleibt online",
    text: "bis du die neue freigegeben hast.",
  },
  {
    icon: "mail",
    title: "Deine E-Mail funktioniert weiter",
    text: "Ich übernehme die nötigen Einstellungen, damit nichts unterbrochen wird.",
  },
  {
    icon: "redirect",
    title: "Alte Adressen werden weitergeleitet",
    text: "So finden Besucher und Google deine Seiten weiterhin.",
  },
];
</script>

<template>
  <section
    id="ohne-risiko"
    class="risk-section section container"
    aria-labelledby="risk-title"
  >
    <div class="section-heading">
      <span class="eyebrow">WAS FUNKTIONIERT, BLEIBT.</span>
      <h2 id="risk-title">
        Ohne Risiko umsteigen<span class="blue-period">.</span>
      </h2>
    </div>
    <ul class="risk-grid">
      <li v-for="point in points" :key="point.title">
        <AppIcon :name="point.icon" :size="20" />
        <h3>{{ point.title }}</h3>
        <p>{{ point.text }}</p>
      </li>
    </ul>
    <p v-if="show.guarantee" class="process-note">
      <AppIcon name="shield" :size="15" />{{ offer.guaranteeText }}
    </p>
    <p class="section-cta">
      <a class="text-link" href="#anfrage"
        >Link senden, kostenlose Einschätzung erhalten <AppIcon :size="16"
      /></a>
    </p>
  </section>
</template>
