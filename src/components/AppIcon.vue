<script setup>
defineProps({
  name: { type: String, default: "arrow" },
  size: { type: [Number, String], default: 20 },
});
const paths = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  check: "m5 12 4 4L19 6",
  link: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2m3 6a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2",
  bolt: "m13 2-9 12h7l-1 8L21 9h-8z",
  shield: "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zM8 12l3 3 5-6",
  mobile:
    "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm3 16h2",
  smile:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM8 14s1 3 4 3 4-3 4-3M8 8h.01M16 8h.01",
  plus: "M12 5v14M5 12h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "m6 6 12 12M6 18 18 6",
  lock: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7v5l3 2",
  copy: "M9 9h12v12H9zM15 5V3H3v12h2",
  up: "M7 17 17 7M7 7h10v10",
};
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.arrow" />
  </svg>
</template>
