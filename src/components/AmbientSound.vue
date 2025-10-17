<template>
  <button
    class="ambient-toggle"
    :title="isPlaying ? 'Mute ambient sounds' : 'Play ambient sounds'"
    @click="toggleAudio"
    :aria-label="isPlaying ? 'Mute' : 'Play ambient sounds'"
  >
    <span class="ambient-toggle__icon">
      {{ isPlaying ? '🔊' : '🔇' }}
    </span>
  </button>

  <!-- Hidden audio element -->
  <audio
    ref="audioRef"
    loop
    :volume="volume"
  >
    <!-- You can add audio sources here -->
  </audio>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audioRef = ref(null)
const volume = ref(0.3)

const toggleAudio = () => {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play().catch(() => {
      console.log('Audio playback failed - check browser autoplay policy')
    })
  }

  isPlaying.value = !isPlaying.value
}

const setSoundUrl = (url) => {
  if (audioRef.value) {
    audioRef.value.src = url
  }
}

onMounted(() => {
  // Save preference to localStorage
  const saved = localStorage.getItem('ambient-sounds-enabled')
  if (saved === 'true' && audioRef.value) {
    audioRef.value.play().catch(() => {
      console.log('Auto-play prevented by browser')
    })
    isPlaying.value = true
  }
})

// Watch for changes and save preference
const updatePreference = () => {
  localStorage.setItem('ambient-sounds-enabled', isPlaying.value)
}

defineExpose({
  toggleAudio,
  setSoundUrl,
  isPlaying,
})
</script>