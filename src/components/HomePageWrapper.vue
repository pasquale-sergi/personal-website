<template>
  <MobileHomePage v-if="isMobile" />
  <HomePage v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomePage from '../pages/HomePage.vue'
import MobileHomePage from '../pages/MobileHomePage.vue'

const isMobile = ref(window.innerWidth < 768)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  console.log('Mobile:', isMobile.value, 'Width:', window.innerWidth)
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>