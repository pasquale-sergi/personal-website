<script setup>
import { ref } from "vue";
import AppIcon from "./AppIcon.vue";
const menuOpen = ref(false);
defineProps({ homePage: { type: Boolean, default: true } });
const links = [
  { href: "#home", label: "Start" },
  { href: "#ablauf", label: "So geht’s" },
  { href: "#preise", label: "Preise" },
  { href: "#faq", label: "FAQ" },
];
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a
        class="brand"
        :href="homePage ? '#home' : '/#home'"
        aria-label="pasquale.dev – zur Startseite"
        @click="menuOpen = false"
        ><span>pasquale<span class="brand-dot">.</span>dev</span
        ><small>Website-Relaunch für Schweizer KMU.</small></a
      >
      <nav class="desktop-nav" aria-label="Hauptnavigation">
        <a
          v-for="link in links"
          :key="link.href"
          :href="`${homePage ? '' : '/'}${link.href}`"
          >{{ link.label }}</a
        >
      </nav>
      <a
        class="button button-small header-cta"
        :href="homePage ? '#proposal' : '/#proposal'"
        >Angebot anfragen <AppIcon :size="16"
      /></a>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        :aria-label="menuOpen ? 'Menü schliessen' : 'Menü öffnen'"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" />
      </button>
    </div>
    <nav
      v-if="menuOpen"
      id="mobile-nav"
      class="mobile-nav"
      aria-label="Mobile Navigation"
      @keydown.esc="menuOpen = false"
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="`${homePage ? '' : '/'}${link.href}`"
        @click="menuOpen = false"
        >{{ link.label }}</a
      ><a
        :href="homePage ? '#proposal' : '/#proposal'"
        @click="menuOpen = false"
        >Angebot anfragen <AppIcon :size="16"
      /></a>
    </nav>
  </header>
</template>
