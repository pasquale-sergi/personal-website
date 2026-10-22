<script setup>
import { site } from "../site.config.js";
</script>

<template>
  <article class="legal container prose" aria-labelledby="page-title">
    <h1 id="page-title">Impressum</h1>

    <h2>Anbieter und verantwortlich für den Inhalt</h2>
    <p>
      {{ site.name }}<br />
      {{ site.address.postalCode }} {{ site.address.locality }}<br />
      {{ site.address.country }}
    </p>

    <h2>Kontakt</h2>
    <p>
      E-Mail: <a :href="`mailto:${site.email}`">{{ site.email }}</a>
    </p>
  </article>
</template>
