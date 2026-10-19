<script setup>
import { ref } from "vue";
import AppIcon from "./AppIcon.vue";
const menuOpen = ref(false);
const links = [
  { href: "#home", label: "Home" },
  { href: "#ablauf", label: "So geht’s" },
  { href: "#work", label: "Projekte" },
  { href: "#preise", label: "Preise" },
  { href: "#faq", label: "FAQ" },
];
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a
        class="brand"
        href="#home"
        aria-label="Pasquale Sergi – zur Startseite"
        @click="menuOpen = false"
        ><span>Pasquale Sergi<span class="brand-dot">.</span></span
        ><small>Websites für Schweizer Kleinunternehmen.</small></a
      >
      <nav class="desktop-nav" aria-label="Hauptnavigation">
        <a v-for="link in links" :key="link.href" :href="link.href">{{
          link.label
        }}</a>
      </nav>
      <a class="button button-small header-cta" href="#proposal"
        >Get a proposal <AppIcon :size="16"
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
        :href="link.href"
        @click="menuOpen = false"
        >{{ link.label }}</a
      ><a href="#proposal" @click="menuOpen = false"
        >Angebot erhalten <AppIcon :size="16"
      /></a>
    </nav>
  </header>
</template>
