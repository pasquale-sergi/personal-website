<script setup>
import AppIcon from "./AppIcon.vue";
import { referral, chf } from "../site.config.js";
</script>

<template>
  <section
    id="empfehlen"
    class="referral-section container"
    aria-labelledby="referral-title"
  >
    <div class="referral-card">
      <AppIcon name="gift" :size="26" />
      <div>
        <h2 id="referral-title">
          Empfehlen und profitieren<span class="blue-period">.</span>
        </h2>
        <p>
          Du kennst jemanden, dessen Website ein Update braucht? Wird daraus ein
          Auftrag, erhältst du einen Gutschein über CHF {{ chf(referral.credit) }} für
          Betreuung oder Änderungen, sobald der neue Auftrag bezahlt ist. Die
          empfohlene Person bekommt {{ referral.newClientBonus }} dazu.
        </p>
        <p class="referral-limit">
          Gilt für max. {{ referral.maxPerYear }} Empfehlungen pro Jahr.
        </p>
      </div>
      <a class="button button-secondary" href="#anfrage"
        >Empfehlung melden <AppIcon :size="16"
      /></a>
    </div>
  </section>
</template>
