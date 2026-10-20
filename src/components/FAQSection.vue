<script setup>
import { ref } from "vue";
import AppIcon from "./AppIcon.vue";
const active = ref(null);
const questions = [
  {
    q: "Wie lange dauert ein Projekt?",
    a: "Ein einfacher Relaunch dauert in der Regel 1–3 Wochen ab Projektstart. Der genaue Zeitplan hängt vom Umfang und deiner Rückmeldung ab und steht im Angebot.",
  },
  {
    q: "Was brauche ich dafür?",
    a: "Für den Anfang reicht der Link zu deiner aktuellen Website. Nach der Beauftragung brauche ich die nötigen Zugänge sowie deine Freigabe für die bestehenden Texte und Bilder. Ich sage dir genau, was benötigt wird.",
  },
  {
    q: "Bleibt meine Domain und E-Mail?",
    a: "Ja, deine Domain kann bleiben. Die Umstellung wird so geplant, dass bestehende E-Mail-Dienste erhalten bleiben. Dafür prüfe ich zuerst dein Hosting und die DNS-Einstellungen.",
  },
  {
    q: "Kann ich die Inhalte später selbst bearbeiten?",
    a: "Mit dem Paket Relaunch mit CMS kannst du Texte, Produkte und Bilder selbst pflegen. Du erhältst eine kurze Einführung. Beim einfachen Relaunch sind spätere Änderungen nach Absprache möglich.",
  },
  {
    q: "Gibt es laufende Kosten?",
    a: "Der Relaunch ist eine einmalige Leistung. Domain, Hosting und gegebenenfalls externe Dienste kosten separat. Ich zeige dir diese Kosten vorab. Laufende Betreuung ist optional.",
  },
  {
    q: "Was ist, wenn ich mehr Funktionen brauche?",
    a: "Für Shops, Buchungssysteme, mehrere Sprachen oder andere Erweiterungen erstelle ich ein individuelles Angebot. Schick mir deine Website und beschreibe kurz, was du brauchst.",
  },
];
</script>

<template>
  <section
    id="faq"
    class="faq-section section container"
    aria-labelledby="faq-title"
  >
    <div class="faq-intro">
      <span class="eyebrow">GUT ZU WISSEN.</span>
      <h2 id="faq-title">Noch Fragen<span class="blue-period">?</span></h2>
      <p>Die wichtigsten Antworten.<br />Kurz und ohne Fachchinesisch.</p>
      <a class="text-link" href="#proposal"
        >Sprechen wir über deine Website <AppIcon :size="16"
      /></a>
    </div>
    <div class="faq-list">
      <article
        v-for="(question, i) in questions"
        :key="question.q"
        class="faq-item"
        :class="{ 'faq-open': active === i }"
      >
        <h3>
          <button
            :id="`faq-button-${i}`"
            type="button"
            :aria-expanded="active === i"
            :aria-controls="`faq-answer-${i}`"
            @click="active = active === i ? null : i"
          >
            {{ question.q }}<AppIcon name="plus" :size="18" />
          </button>
        </h3>
        <div
          :id="`faq-answer-${i}`"
          class="faq-answer"
          :inert="active !== i"
          :aria-hidden="active !== i"
          role="region"
          :aria-labelledby="`faq-button-${i}`"
        >
          <div>
            <p>{{ question.a }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
