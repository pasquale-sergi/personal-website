<script setup>
// Pre-rendered illustrations from `npm run mockups` (source: WebsiteMockup.vue).
import manifest from "../content/mockups.json";

const props = defineProps({
  layout: { type: String, default: "overlap" },
  // "huber" shows the real client project, "generic" a neutral placeholder business.
  example: { type: String, default: "generic" },
});

const alts = {
  generic: {
    before: "Illustration einer veralteten Website mit Seitenmenü",
    after: "Illustration derselben Website mit modernem, klarem Design",
  },
};
if (__CASE_STUDY__) {
  alts.huber = {
    before: "Illustration der alten Website von Sportpreise Huber",
    after: "Illustration der neuen Website von Sportpreise Huber",
  };
}
// Rendered widths, so the browser can pick the 640 or 1280 version.
const sizes = {
  overlap: {
    before: "(min-width: 1200px) 400px, (min-width: 960px) 34vw, 74vw",
    after: "(min-width: 1200px) 500px, (min-width: 960px) 42vw, 90vw",
  },
  "side-by-side": {
    before: "(min-width: 1200px) 480px, (min-width: 768px) 40vw, 90vw",
    after: "(min-width: 1200px) 560px, (min-width: 768px) 48vw, 95vw",
  },
};

function image(variant) {
  const name = `${props.example}-${variant}`;
  const base = `/images/mockups/${name}`;
  return {
    ...manifest[name],
    alt: alts[props.example][variant],
    sizes: sizes[props.layout][variant],
    sources: manifest.formats.map((format) => ({
      type: `image/${format}`,
      srcset: `${base}-640.${format} 640w, ${base}-1280.${format} 1280w`,
    })),
    fallback: `${base}-640.webp`,
  };
}
const before = image("before");
const after = image("after");
</script>

<template>
  <figure class="before-after" :class="`before-after-${layout}`">
    <div v-for="[variant, img] in [['before', before], ['after', after]]" :key="variant" :class="`mockup-${variant}`">
      <span v-if="variant === 'before'" class="mockup-label label-before"
        ><span></span> Vorher</span
      >
      <span v-else class="mockup-label label-after"
        ><span></span> Nachher <span class="label-check" aria-hidden="true">✓</span></span
      >
      <picture>
        <source
          v-for="source in img.sources"
          :key="source.type"
          :type="source.type"
          :srcset="source.srcset"
          :sizes="img.sizes"
        />
        <img
          class="mockup-img"
          :src="img.fallback"
          :width="img.width"
          :height="img.height"
          :alt="img.alt"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
    <div class="transformation-arrow" aria-hidden="true">
      <svg viewBox="0 0 76 56" fill="none">
        <path
          d="M7 9c4 28 30 35 57 21M51 24l16 4-7 15"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <figcaption v-if="layout === 'overlap'" class="mockup-caption">
      <span class="caption-line"></span> Illustration: gleicher Betrieb, neuer
      Auftritt.
    </figcaption>
  </figure>
</template>
