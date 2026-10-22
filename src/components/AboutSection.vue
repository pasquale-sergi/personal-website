<script setup>
import AppIcon from "./AppIcon.vue";
import { site } from "../site.config.js";
</script>

<template>
  <section
    id="ueber-mich"
    class="about-section section container"
    :class="{ 'about-no-photo': !site.photo }"
    aria-labelledby="about-title"
  >
    <img
      v-if="site.photo"
      class="about-photo"
      :src="site.photo.src"
      :width="site.photo.width"
      :height="site.photo.height"
      :alt="site.photo.alt"
      loading="lazy"
      decoding="async"
    />
    <div class="about-copy">
      <span class="eyebrow">ÜBER MICH</span>
      <h2 id="about-title">
        Hallo, ich bin Pasquale<span class="blue-period">.</span>
      </h2>
      <p>
        Hauptberuflich arbeite ich als Software-Ingenieur in der Schweiz.
        Nebenbei baue ich Websites für Kleinunternehmen, weil ich es gerne mache
        und weil ein guter Webauftritt nicht teuer sein sollte.
      </p>
      <p>
        Mit modernen Werkzeugen kann ich dir einen sauberen, schnellen Relaunch
        zu einem fairen Fixpreis anbieten, ohne Agentur-Aufwand. Du sprichst
        direkt mit mir, ich kümmere mich um die Technik, und du entscheidest
        selbst, wie viel Betreuung du danach möchtest. Auch nach dem Launch
        erreichst du mich direkt per E-Mail.
      </p>
      <ul class="about-contact">
        <li>
          <a class="inline-link" :href="`mailto:${site.email}`"
            ><AppIcon name="mail" :size="16" />{{ site.email }}</a
          >
        </li>
      </ul>
      <a class="text-link" href="#anfrage"
        >Link senden, kostenlose Einschätzung erhalten <AppIcon :size="16"
      /></a>
    </div>
  </section>
</template>
