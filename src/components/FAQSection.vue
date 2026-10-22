<script setup>
import { ref } from "vue";
import AppIcon from "./AppIcon.vue";
import { faq as questions } from "../content/faq.js";
const active = ref(null);
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
      <a class="text-link" href="#anfrage"
        >Deine Frage ist nicht dabei? Schreib mir <AppIcon :size="16"
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
