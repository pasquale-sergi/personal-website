<template>
  <div 
    class="app-container"
    :class="{ 
      'desktop-container': !isMobileView,
      'mobile-container': isMobileView  // Now with strengthened styles
    }"
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
import { ref, onMounted, onUnmounted , nextTick} from 'vue'

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
/* Ultra-minimal base: Full viewport, no child interference */

.app-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: auto; /* Allows full scroll (x hidden comes from globals) */
  position: relative; /* Only for particles */
  background: transparent; /* No bg to inherit */
  box-sizing: border-box;
}


/* Mobile-only: Enforce full viewport */
@media (max-width: 767px) {
  .app-container {
    width: 100vw !important;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  .particle-container {
    width: 100vw;
    height: 100vh;
  }
}
</style>