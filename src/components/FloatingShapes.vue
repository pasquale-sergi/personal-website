<template>
  <vue-particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :options="particleOptions"
  />
</template>

<script setup>
import { ref } from 'vue';
import { loadSlim } from 'tsparticles-slim';

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const particleOptions = ref({
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: false,
      },
      resize: true,
    },
  },
  particles: {
    color: {
      value: '#b8945f', // Your zen-500 color
    },
    links: {
      color: '#b8945f',
      distance: 150,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 0.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1200,
      },
      value: 30,
    },
    opacity: {
      value: 0.1,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
});
</script>

<style>
#tsparticles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>