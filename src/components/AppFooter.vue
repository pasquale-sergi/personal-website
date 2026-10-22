<script setup>
import { site } from "../site.config.js";
const year = new Date().getFullYear();
const legal = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
];
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <a class="brand" href="/#start"
        ><span>Pasquale Sergi<span class="brand-dot">.</span></span
        ><small>Deine Website. Wieder auf der Höhe.</small></a
      >
      <p>
        <span class="swiss-cross" aria-hidden="true">+</span> Persönlich.
        Direkt. Aus der Schweiz.
      </p>
      <a class="footer-contact" :href="`mailto:${site.email}`">{{
        site.email
      }}</a>
    </div>
    <div class="container footer-bottom">
      <span>© {{ year }} Pasquale Sergi</span>
      <nav aria-label="Rechtliches">
        <a v-for="link in legal" :key="link.href" :href="link.href">{{
          link.label
        }}</a>
      </nav>
      <a href="/#anfrage">Angebot anfragen</a>
    </div>
  </footer>
</template>
