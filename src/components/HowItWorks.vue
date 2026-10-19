<script setup>
import AppIcon from "./AppIcon.vue";
const steps = [
  {
    title: "Website senden",
    text: "Schick mir den Link zu deiner Website und sag mir kurz, was du verbessern möchtest.",
  },
  {
    title: "Fixes Angebot erhalten",
    text: "Ich schaue mir deine Website an. Du erhältst eine klare Empfehlung und ein verbindliches Angebot.",
  },
  {
    title: "Ich baue sie neu",
    text: "Du siehst den ersten Entwurf, gibst Feedback – ich kümmere mich um den Rest. Bis zum Launch.",
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
    <div class="steps">
      <article v-for="(step, i) in steps" :key="step.title" class="step">
        <div class="step-top">
          <span class="step-number">0{{ i + 1 }}</span
          ><span v-if="i < 2" class="step-connector"
            ><span></span><AppIcon :size="17"
          /></span>
        </div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </article>
    </div>
    <p class="process-note">
      <AppIcon name="check" :size="15" /> Ein Ansprechpartner. Vom ersten Link
      bis zur fertigen Website.
    </p>
  </section>
</template>
