<script setup>
import WebsiteMockup from "./WebsiteMockup.vue";
defineProps({ layout: { type: String, default: "overlap" } });
</script>

<template>
  <figure
    class="before-after"
    :class="`before-after-${layout}`"
    aria-label="Illustrativer Vorher-Nachher-Vergleich für den frei erfundenen Musterbetrieb"
  >
    <div class="mockup-before">
      <span class="mockup-label label-before"><span></span> Vorher</span
      ><WebsiteMockup variant="before" :compact="layout === 'overlap'" />
    </div>
    <div class="transformation-arrow" aria-hidden="true">
      <svg viewBox="0 0 76 56" fill="none">
        <path
          d="M7 9c4 28 30 35 57 21M51 24l16 4-7 15"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="mockup-after">
      <span class="mockup-label label-after"
        ><span></span> Nachher <span class="label-check">✓</span></span
      ><WebsiteMockup variant="after" />
    </div>
    <figcaption v-if="layout === 'overlap'" class="mockup-caption">
      <span class="caption-line"></span> Fiktives Beispiel. Ein ganz neuer
      Auftritt.
    </figcaption>
  </figure>
</template>
