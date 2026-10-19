<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <a class="brand" href="#home"
        ><span>Pasquale Sergi<span class="brand-dot">.</span></span
        ><small>Deine Website. Wieder auf der Höhe.</small></a
      >
      <p>
        <span class="swiss-cross" aria-hidden="true">+</span> Persönlich.
        Direkt. Aus der Schweiz.
      </p>
      <a class="footer-top" href="#home">Zurück nach oben <span>↑</span></a>
    </div>
    <div class="container footer-bottom">
      <span>© {{ year }} Pasquale Sergi</span
      ><span>Websites für Schweizer Kleinunternehmen.</span
      ><a href="#proposal">Kontakt aufnehmen ↗</a>
    </div>
  </footer>
</template>
