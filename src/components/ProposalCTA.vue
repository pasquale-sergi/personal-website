<script setup>
import AppIcon from "./AppIcon.vue";
import ProposalForm from "./ProposalForm.vue";
import { proposalEmail } from "../lib/proposal.js";
</script>

<template>
  <section
    id="proposal"
    class="proposal-section"
    aria-labelledby="proposal-title"
  >
    <div class="container proposal-inner">
      <span class="eyebrow"
        ><span class="status-dot"></span> DER ERSTE SCHRITT IST NUR EIN
        LINK.</span
      >
      <h2 id="proposal-title">
        Deine Website kann mehr.<br /><span>Fangen wir mit dem Link an.</span>
      </h2>
      <p>
        Sende mir deine aktuelle Website und erhalte<br class="desktop-break" />
        ein unverbindliches Angebot.
      </p>
      <ProposalForm location="proposal" />
      <div class="proposal-reassurance">
        <span
          ><AppIcon name="clock" :size="15" /> Antwort in der Regel in 1–2
          Werktagen</span
        ><span
          ><AppIcon name="check" :size="15" /> Kostenlos & unverbindlich</span
        >
      </div>
      <a class="direct-email" :href="`mailto:${proposalEmail}`"
        >Oder direkt: {{ proposalEmail }} <AppIcon name="up" :size="11"
      /></a>
      <p class="personal-trust">
        Direkter Kontakt mit mir – von der ersten Version bis zur
        Veröffentlichung. Keine Agentur, keine Weitergabe des Projekts.<strong
          >Pasquale</strong
        >
      </p>
    </div>
    <span class="cta-decoration" aria-hidden="true">↗</span>
  </section>
</template>
