<script setup>
import { defineAsyncComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import HomePage from "./pages/HomePage.vue";
import ImpressumPage from "./pages/ImpressumPage.vue";
import DatenschutzPage from "./pages/DatenschutzPage.vue";

defineProps({ page: { type: String, default: "home" } });
const views = {
  home: HomePage,
  impressum: ImpressumPage,
  datenschutz: DatenschutzPage,
  // Removed from production builds entirely.
  mockups: import.meta.env.DEV
    ? defineAsyncComponent(() => import("./pages/MockupSheet.vue"))
    : null,
};
</script>

<template>
  <a href="#main" class="skip-link">Zum Inhalt springen</a>
  <AppHeader />
  <main id="main">
    <component :is="views[page] || HomePage" />
  </main>
  <AppFooter />
</template>
