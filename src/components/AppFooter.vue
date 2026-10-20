<script setup>
import { proposalEmail } from "../lib/proposal.js";
defineProps({ homePage: { type: Boolean, default: true } });
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <a class="brand" :href="homePage ? '#home' : '/#home'"
        ><span>pasquale<span class="brand-dot">.</span>dev</span
        ><small>Website-Relaunch für Schweizer KMU.</small></a
      >
      <a class="footer-email" :href="`mailto:${proposalEmail}`">{{
        proposalEmail
      }}</a>
      <a class="footer-top" :href="homePage ? '#home' : '/#home'"
        >{{ homePage ? "Zurück nach oben" : "Zur Startseite" }}
        <span>↑</span></a
      >
    </div>
    <div class="container footer-bottom">
      <span>© {{ year }} pasquale.dev</span>
      <span>Pasquale Sergi</span>
      <nav class="footer-legal" aria-label="Rechtliche Informationen">
        <a href="/impressum">Impressum</a><span aria-hidden="true">·</span
        ><a href="/datenschutz">Datenschutz</a>
      </nav>
    </div>
  </footer>
</template>
