<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import AppIcon from "./AppIcon.vue";
const menuOpen = ref(false);
const toggle = ref(null);

// Escape closes the menu from anywhere and returns focus to the toggle.
function onKeydown(event) {
  if (event.key !== "Escape") return;
  menuOpen.value = false;
  toggle.value?.focus();
}
watch(menuOpen, (open) =>
  document[open ? "addEventListener" : "removeEventListener"]("keydown", onKeydown),
);
onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));
// Absolute anchors so the navigation also works from the legal pages.
const links = [
  { href: "/#start", label: "Start" },
  { href: "/#ablauf", label: "So geht’s" },
  { href: "/#preise", label: "Preise" },
  { href: "/#betreuung", label: "Betreuung" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#faq", label: "FAQ" },
];
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a
        class="brand"
        href="/#start"
        aria-label="Pasquale Sergi, zur Startseite"
        @click="menuOpen = false"
        ><span>Pasquale Sergi<span class="brand-dot">.</span></span
        ><small>Websites für Schweizer Kleinunternehmen.</small></a
      >
      <nav class="desktop-nav" aria-label="Hauptnavigation">
        <a v-for="link in links" :key="link.href" :href="link.href">{{
          link.label
        }}</a>
      </nav>
      <a class="button button-small header-cta" href="/#anfrage"
        ><span class="cta-long">Angebot anfragen</span
        ><span class="cta-short">Anfragen</span> <AppIcon :size="16"
      /></a>
      <button
        ref="toggle"
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
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        @click="menuOpen = false"
        >{{ link.label }}</a
      ><a href="/#anfrage" @click="menuOpen = false"
        >Angebot anfragen <AppIcon :size="16"
      /></a>
    </nav>
  </header>
</template>
