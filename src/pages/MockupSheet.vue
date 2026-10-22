<script setup>
// Dev-only page (/_mockups/). `npm run mockups` screenshots every
// [data-mockup] element into public/images/mockups/. Not part of the build.
import WebsiteMockup from "../components/WebsiteMockup.vue";
const examples = (
  new URLSearchParams(globalThis.location?.search).get("examples") || "generic"
).split(",");
</script>

<template>
  <div class="mockup-sheet">
    <template v-for="example in examples" :key="example">
      <div
        v-for="variant in ['before', 'after']"
        :key="variant"
        :data-mockup="`${example}-${variant}`"
      >
        <WebsiteMockup :variant="variant" :example="example" />
      </div>
    </template>
  </div>
</template>

<style src="../styles/mockup-illustration.css"></style>
<style>
.mockup-sheet {
  display: grid;
  gap: 40px;
  padding: 40px;
  width: 720px;
}
.mockup-sheet .browser-window {
  border: 0;
  border-radius: 0;
  box-shadow: none;
}
</style>
