<script setup>
import AppIcon from "./AppIcon.vue";
import ProposalForm from "./ProposalForm.vue";
import { proposalEmail } from "../lib/proposal.js";
import { offer } from "../site.config.js";
</script>

<template>
  <section id="anfrage" class="proposal-section" aria-labelledby="proposal-title">
    <div class="container proposal-inner">
      <span class="eyebrow">Der erste Schritt ist nur ein Link</span>
      <h2 id="proposal-title">
        Deine Website kann mehr.<br /><span>Fangen wir mit dem Link an.</span>
      </h2>
      <p>
        Link senden, kostenlose Einschätzung erhalten.
        <template v-if="offer.freePreview"
          ><br class="desktop-break" />Bei passenden Websites zeige ich dir
          vorab eine Vorschau deiner Startseite.</template
        >
      </p>
      <ProposalForm location="proposal" />
      <div class="proposal-reassurance">
        <span
          ><AppIcon name="clock" :size="15" /> Antwort in der Regel
          {{ offer.responseTime }}</span
        ><span
          ><AppIcon name="check" :size="15" /> Kostenlos und unverbindlich</span
        >
      </div>
      <a class="direct-email" :href="`mailto:${proposalEmail}`"
        >Oder direkt: {{ proposalEmail }} <AppIcon name="up" :size="11"
      /></a>
    </div>
    <span class="cta-decoration" aria-hidden="true">↗</span>
  </section>
</template>
