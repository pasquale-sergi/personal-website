<template>
  <div 
    class="app-container"
    :class="{ 'desktop-container': !isMobileView }"
  >
    <div class="particle-container">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div> <!-- NEW -->
    <div class="particle"></div> <!-- NEW -->
    <div class="particle"></div> <!-- NEW -->
    <div class="particle"></div> <!-- NEW -->
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileView = ref(window.innerWidth < 768)

const handleResize = () => {
  isMobileView.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Apply frame styling only on desktop */
@media (min-width: 768px) {
  .app-container {
    margin: 1rem 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to bottom right, #f5f1e8, #ede5d9);
  }
  
  .dark .app-container {
    background: linear-gradient(to bottom right, #2c2418, #3d3221);
  }
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
}
</style>