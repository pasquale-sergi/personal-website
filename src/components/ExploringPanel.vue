<template>
  <div class="exploring-panel-wrapper">
    <!-- Lens Icon Toggle (Fixed) -->
    <button 
      @click="$emit('toggle')"
      class="exploring-toggle"
      :title="isOpen ? 'Close exploring' : 'Open exploring'"
    >
      <span class="text-xl">{{ isOpen ? '×' : '🔍' }}</span>
    </button>

    <!-- Side Panel -->
    <Transition name="slide-left">
      <div v-if="isOpen" class="exploring-panel">
        <div class="exploring-panel__header">
          <h3 class="font-serif font-bold">Currently Exploring</h3>
          <p class="text-xs text-zen-500 dark:text-zen-400">What I'm learning</p>
        </div>

        <div class="exploring-panel__content">
          <div 
            v-for="topic in exploringTopics" 
            :key="topic.id"
            class="exploring-item"
          >
            <div class="exploring-item__emoji">{{ topic.emoji }}</div>
            
            <div class="exploring-item__info">
              <h4 class="exploring-item__title">{{ topic.title }}</h4>
              <p class="exploring-item__desc">{{ topic.description }}</p>
              
              <div class="exploring-item__progress">
                <div class="exploring-item__bar">
                  <div 
                    class="exploring-item__fill"
                    :style="{ width: topic.progress + '%' }"
                  ></div>
                </div>
                <span class="exploring-item__percent">{{ topic.progress }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="exploring-panel__footer">
          <p class="text-xs text-zen-600 dark:text-zen-400 text-center">
            Updated weekly
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['toggle'])

const exploringTopics = [
  {
    id: 1,

    title: 'Edge AI',
    description: 'AI on microcontrollers',
    progress: 75,
  },
  {
    id: 2,

    title: 'Cloud',
    description: 'Exploring Azure to compare with AWS',
    progress: 45,
  },
  {
    id: 3,

    title: 'C',
    description: 'Embedded system programming',
    progress: 30,
  },
]
</script>

<style scoped>
.exploring-panel-wrapper {
  @apply fixed right-0 top-24 z-40 hidden lg:block;
}

/* Lens Icon Button */
.exploring-toggle {
  @apply absolute -left-12 top-0 w-10 h-10;
  @apply bg-accent-green hover:bg-accent-orange;
  @apply text-white rounded-lg;
  @apply flex items-center justify-center;
  @apply shadow-lg;
  @apply motion-safe:transition-all motion-safe:duration-300;
  @apply cursor-pointer border-none;
}

.exploring-toggle:hover {
  @apply scale-110;
}

.exploring-toggle:active {
  @apply scale-95;
}

/* Side Panel */
.exploring-panel {
  @apply w-80 h-auto max-h-[calc(100vh-200px)];
  @apply bg-white/80 dark:bg-zen-800/80;
  @apply backdrop-blur-md;
  @apply border border-white/20 dark:border-zen-700/20;
  @apply rounded-2xl shadow-2xl;
  @apply mr-4 mt-0;
  @apply overflow-hidden;
  @apply flex flex-col;
}

.exploring-panel__header {
  @apply px-6 py-4;
  @apply border-b border-zen-200/50 dark:border-zen-700/50;
}

.exploring-panel__header h3 {
  @apply text-lg font-serif text-zen-900 dark:text-zen-50;
  @apply mb-1;
}

.exploring-panel__content {
  @apply px-6 py-4 space-y-4;
  @apply overflow-y-auto;
  @apply flex-1;
}

.exploring-item {
  @apply flex gap-3 p-3;
  @apply bg-zen-50/50 dark:bg-zen-900/50;
  @apply rounded-lg;
  @apply backdrop-blur-sm;
  @apply border border-zen-200/30 dark:border-zen-700/30;
  @apply hover:bg-zen-100/50 dark:hover:bg-zen-800/50;
  @apply motion-safe:transition-all motion-safe:duration-300;
}

.exploring-item__emoji {
  @apply text-2xl flex-shrink-0;
}

.exploring-item__info {
  @apply flex-1 min-w-0;
}

.exploring-item__title {
  @apply font-serif font-bold text-sm;
  @apply text-zen-900 dark:text-zen-50;
}

.exploring-item__desc {
  @apply text-xs text-zen-600 dark:text-zen-400;
  @apply mt-1;
}

.exploring-item__progress {
  @apply flex items-center gap-2 mt-2;
}

.exploring-item__bar {
  @apply flex-1 h-1.5 rounded-full;
  @apply bg-zen-200 dark:bg-zen-700;
  @apply overflow-hidden;
}

.exploring-item__fill {
  @apply h-full rounded-full;
  @apply bg-gradient-to-r from-accent-green to-accent-orange;
  @apply motion-safe:transition-all motion-safe:duration-500;
}

.exploring-item__percent {
  @apply text-xs font-mono text-zen-600 dark:text-zen-400;
  @apply flex-shrink-0;
}

.exploring-panel__footer {
  @apply px-6 py-3;
  @apply border-t border-zen-200/50 dark:border-zen-700/50;
  @apply text-center;
}

/* Scrollbar */
.exploring-panel__content::-webkit-scrollbar {
  @apply w-1.5;
}

.exploring-panel__content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.exploring-panel__content::-webkit-scrollbar-thumb {
  @apply bg-accent-green/30 rounded-full;
}

.exploring-panel__content::-webkit-scrollbar-thumb:hover {
  @apply bg-accent-green/60;
}

/* Animations */
.slide-left-enter-active,
.slide-left-leave-active {
  @apply motion-safe:transition-all motion-safe:duration-300;
}

.slide-left-enter-from {
  @apply opacity-0 translate-x-full;
}

.slide-left-leave-to {
  @apply opacity-0 translate-x-full;
}
</style>