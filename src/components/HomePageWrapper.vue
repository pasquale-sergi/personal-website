<template>
  <MobileHomePage v-if="isMobile" />
  <HomePage v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomePage from '../pages/HomePage.vue'
import MobileHomePage from '../pages/MobileHomePage.vue'

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>