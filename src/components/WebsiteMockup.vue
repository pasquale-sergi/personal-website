<script setup>
import AppIcon from "./AppIcon.vue";
import TrophyArt from "./TrophyArt.vue";
defineProps({ variant: { type: String, default: "after" }, compact: Boolean });
</script>

<template>
  <div
    class="browser-window"
    :class="[`browser-${variant}`, { 'browser-compact': compact }]"
    aria-hidden="true"
  >
    <div class="browser-chrome">
      <div class="browser-dots"><i></i><i></i><i></i></div>
      <span class="browser-address"
        ><AppIcon name="lock" :size="8" /> sportpreise-huber.ch</span
      ><span class="browser-chrome-more">···</span>
    </div>
    <div v-if="variant === 'before'" class="old-site">
      <div class="old-site-header">
        <span class="old-logo">Sportpreise <b>HUBER</b></span
        ><span>Pokale · Medaillen · Gravuren</span>
      </div>
      <div class="old-site-nav">
        Home &nbsp; | &nbsp; Pokale &nbsp; | &nbsp; Medaillen &nbsp; | &nbsp;
        Kontakt
      </div>
      <div class="old-site-body">
        <aside>
          <b>Navigation</b><span>Herzlich willkommen</span
          ><span>Unser Sortiment</span><span>Pokale & Trophäen</span
          ><span>Medaillen</span><span>Gravuren</span><span>Über uns</span
          ><span>Kontakt</span>
        </aside>
        <div class="old-site-main">
          <h4>Herzlich willkommen</h4>
          <p>Ihr Partner für Sportpreise,<br />Pokale und Auszeichnungen.</p>
          <TrophyArt />
          <div class="old-copy-line"></div>
          <div class="old-copy-line short"></div>
        </div>
      </div>
      <div class="old-site-footer">
        Sportpreise Huber &nbsp; · &nbsp; Qualität und Tradition
      </div>
    </div>
    <div v-else class="new-site">
      <div class="new-site-header">
        <span class="new-logo"
          ><span class="new-logo-emblem">h.</span> sportpreise<span
            >huber</span
          ></span
        ><span class="new-site-nav"
          >Sortiment &nbsp; Über uns &nbsp; Kontakt</span
        ><span class="new-site-contact">Anfragen <span>↗</span></span>
      </div>
      <div class="new-site-hero">
        <div class="new-site-copy">
          <span class="new-site-eyebrow">FÜR DIE BESONDEREN MOMENTE.</span>
          <h4>
            Grosse Leistung.<br /><em>Bleibende</em><br /><em>Erinnerung.</em>
          </h4>
          <p>
            Pokale, Medaillen und Auszeichnungen,<br />die Erfolge für immer
            festhalten.
          </p>
          <span class="new-site-button"
            >Sortiment entdecken <span>↗</span></span
          >
        </div>
        <div class="new-site-art">
          <span class="new-site-orbit"></span><TrophyArt /><span
            class="new-art-caption"
            >MIT LIEBE ZUM DETAIL.</span
          >
        </div>
      </div>
      <div class="new-site-bottom">
        <span>Persönlich für dich da.</span
        ><span
          >Pokale & Trophäen &nbsp; / &nbsp; Medaillen &nbsp; / &nbsp; Gravuren
          <span>↗</span></span
        >
      </div>
    </div>
  </div>
</template>
