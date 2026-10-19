<script setup>
import { useId } from "vue";
defineProps({ single: Boolean });
const id = useId().replace(/:/g, "");
</script>

<template>
  <svg viewBox="0 0 400 310" fill="none" aria-hidden="true" class="trophy-art">
    <defs>
      <linearGradient :id="`${id}-gold`" x1="0" y1="0" x2="1" y2="0">
        <stop stop-color="#865620" />
        <stop offset=".23" stop-color="#d0a253" />
        <stop offset=".43" stop-color="#ffedb0" />
        <stop offset=".57" stop-color="#c39745" />
        <stop offset=".76" stop-color="#f5d98d" />
        <stop offset="1" stop-color="#987035" />
      </linearGradient>
      <linearGradient :id="`${id}-silver`" x1="0" x2="1">
        <stop stop-color="#758086" />
        <stop offset=".35" stop-color="#edf0ef" />
        <stop offset=".55" stop-color="#a0a7a7" />
        <stop offset=".8" stop-color="#e6e9e8" />
        <stop offset="1" stop-color="#7d878b" />
      </linearGradient>
      <linearGradient :id="`${id}-base`" x1="0" x2="1" y2="1">
        <stop stop-color="#444642" />
        <stop offset=".5" stop-color="#252a26" />
        <stop offset="1" stop-color="#101713" />
      </linearGradient>
      <radialGradient :id="`${id}-shadow`">
        <stop stop-color="#16271e" stop-opacity=".22" />
        <stop offset="1" stop-color="#16271e" stop-opacity="0" />
      </radialGradient>
      <g :id="`${id}-cup`">
        <path
          d="M-39 15h-24c-2 37 10 63 40 66M39 15h24c2 37-10 63-40 66"
          :stroke="`url(#${id}-gold)`"
          stroke-width="8"
        />
        <path
          d="M-43 7h86c-1 42-7 69-32 83H-11C-36 76-42 49-43 7Z"
          :fill="`url(#${id}-gold)`"
        />
        <path
          d="M-33 13c1 30 5 53 18 66M-23 13c0 29 1 49 10 65M0 13v67M22 13c0 29-1 49-10 65M33 13c-1 30-5 53-18 66"
          stroke="#805e2b"
          stroke-opacity=".26"
          stroke-width="2"
        />
        <ellipse cy="7" rx="43" ry="7" fill="#e8cb82" />
        <ellipse cy="6" rx="38" ry="4" fill="#86602c" />
        <path
          d="M-12 88h24l-4 10v25l15 15H-23l15-15V98z"
          :fill="`url(#${id}-gold)`"
        />
        <path d="M-22 138h44v10h-44z" :fill="`url(#${id}-gold)`" />
        <path d="M-32 148h64l5 38h-74z" :fill="`url(#${id}-base)`" />
        <path d="M-22 155h44v18h-44z" fill="#b39960" />
        <path d="M-13 161h26m-20 6H7" stroke="#665432" stroke-width="2" />
      </g>
    </defs>
    <ellipse cx="210" cy="277" rx="181" ry="25" :fill="`url(#${id}-shadow)`" />
    <g v-if="!single" transform="translate(90 102) scale(.76)">
      <use :href="`#${id}-cup`" />
    </g>
    <g transform="translate(221 41) scale(1.2)"><use :href="`#${id}-cup`" /></g>
    <g v-if="!single" transform="translate(325 137) scale(.65)">
      <use :href="`#${id}-cup`" />
    </g>
    <path
      d="m183 15 3 9 9 3-9 3-3 9-3-9-9-3 9-3z"
      fill="#d0b572"
      opacity=".6"
    />
  </svg>
</template>
