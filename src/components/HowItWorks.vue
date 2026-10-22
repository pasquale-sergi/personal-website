<script setup>
import AppIcon from "./AppIcon.vue";
import { offer } from "../site.config.js";
const steps = [
  {
    title: "Link senden",
    text: "Schick mir den Link zu deiner Website. Ein Satz dazu, was dich stört, hilft mir schon.",
  },
  {
    title: "Einschätzung und Fixpreis",
    text: `Ich schaue mir deine Website an und melde mich ${offer.responseTime}: mit einer klaren Empfehlung und einem Angebot zum Fixpreis.${offer.freePreview ? " Bei passenden Websites auch mit einer Vorschau deiner Startseite." : ""}`,
  },
  {
    title: "Ich baue sie neu",
    text: `Du siehst den Entwurf und gibst Feedback, ${offer.revisions} sind inbegriffen. Nach deiner Freigabe schalte ich die neue Website auf.`,
  },
];
</script>

<template>
  <section
    id="ablauf"
    class="how-section section container"
    aria-labelledby="how-title"
  >
    <div class="section-heading">
      <span class="eyebrow">DEIN LINK. MEIN HANDWERK.</span>
      <h2 id="how-title">
        So einfach funktioniert es<span class="blue-period">.</span>
      </h2>
      <p>Kein langes Briefing. Keine komplizierten Prozesse.</p>
    </div>
    <ol class="steps">
      <li v-for="(step, i) in steps" :key="step.title" class="step">
        <div class="step-top">
          <span class="step-number" aria-hidden="true">0{{ i + 1 }}</span>
        </div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </li>
    </ol>
    <p class="process-note">
      <AppIcon name="check" :size="15" /> Ein Ansprechpartner. Vom ersten Link
      bis nach dem Launch.
    </p>
    <p class="section-cta">
      <a class="text-link" href="#anfrage"
        >Link senden, kostenlose Einschätzung erhalten <AppIcon :size="16"
      /></a>
    </p>
  </section>
</template>
