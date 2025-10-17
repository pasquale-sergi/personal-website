<template>
  <Transition name="fade">
    <div v-if="isOpen" class="command-palette" @click="closeOnBackdrop">
      <div class="command-palette__dialog" @click.stop>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Search projects, skills... (ESC to close)"
          class="command-palette__input"
          @keydown.escape="close"
          @keydown.arrow-down="highlightNext"
          @keydown.arrow-up="highlightPrev"
          @keydown.enter="selectCurrent"
        />
        
        <div v-if="filteredItems.length" class="command-palette__results">
          <button
            v-for="(item, index) in filteredItems"
            :key="item.id"
            :class="[
              'command-palette__item',
              { 'command-palette__item--active': index === highlighted },
            ]"
            @click="selectItem(item)"
            @mouseover="highlighted = index"
          >
            <div class="font-mono text-sm">{{ item.title }}</div>
            <div v-if="item.description" class="text-xs text-zen-600 dark:text-zen-400">
              {{ item.description }}
            </div>
          </button>
        </div>

        <div v-else class="p-6 text-center text-zen-600 dark:text-zen-400">
          No results found
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select', 'close'])

const isOpen = ref(false)
const query = ref('')
const highlighted = ref(0)
const inputRef = ref(null)

const filteredItems = computed(() => {
  if (!query.value) return props.items
  
  const q = query.value.toLowerCase()
  return props.items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
  )
})

const open = () => {
  isOpen.value = true
  highlighted.value = 0
  query.value = ''
  nextTick(() => inputRef.value?.focus())
}

const close = () => {
  isOpen.value = false
  emit('close')
}

const closeOnBackdrop = (e) => {
  if (e.target === e.currentTarget) {
    close()
  }
}

const selectCurrent = () => {
  if (filteredItems.value[highlighted.value]) {
    selectItem(filteredItems.value[highlighted.value])
  }
}

const selectItem = (item) => {
  emit('select', item)
  close()
}

const highlightNext = () => {
  highlighted.value = (highlighted.value + 1) % filteredItems.value.length
}

const highlightPrev = () => {
  highlighted.value =
    (highlighted.value - 1 + filteredItems.value.length) %
    filteredItems.value.length
}

const handleKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value ? close() : open()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

defineExpose({
  open,
  close,
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply motion-safe:transition-opacity motion-safe:duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>