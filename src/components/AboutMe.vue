<template>
  <div class="about-me-bot-wrapper">

    <Transition name="cloud-pop" mode="out-in">
      <div v-if="showHint" class="bot-hint-cloud">
        <p>Curious to learn more about me?</p>
      </div>
    </Transition>
    <!-- Toggle Button -->
<button 
  @click="isOpen = !isOpen"
  class="bot-toggle"
  :title="isOpen ? 'Close' : 'Learn more about me'"
>
  <img v-if="!isOpen" src="/message.png" alt="Chat" class="w-6 h-6" />
  <span v-else class="text-xl">×</span>
</button>

    <!-- Chat Window -->
    <Transition name="slide-up">
      <div v-if="isOpen" class="bot-chat-window">
        <div class="bot-header">
          <h3>Get to know me</h3>
          <p class="text-xs text-zen-500">Ask me anything</p>
        </div>

        <div ref="messagesContainer" class="bot-messages">
          <div class="bot-message">
            Hey! What would you like to know?
          </div>

          <div 
            v-for="(qa, idx) in selectedQAs"
            :key="idx"
            class="qa-pair"
          >
            <div class="user-message">{{ qa.question }}</div>
            <div class="bot-message">{{ qa.answer }}</div>
          </div>
        </div>

        <div class="bot-buttons">
          <button 
            v-for="q in questions"
            :key="q.id"
            @click="toggleQuestion(q.id)"
            :class="['qa-button', { active: selectedQAs.some(qa => qa.id === q.id) }]"
          >
            {{ q.short }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const selectedQAs = ref([])
const messagesContainer = ref(null)
const showHint = ref(false)
let hintTimer
let hintInterval

const questions = [
  {
    id: 1,
    short: '🌍 Where?',
    question: 'Where are you from?',
    answer: 'I\'m from Lecce, Italy. Beautiful place with a lot of history!'
  },
  {
    id: 2,
    short: '🗣️ Languages',
    question: 'What languages do you speak?',
    answer: 'Italian (native), English (fluent), and I\'m learning German!'
  },
  {
    id: 3,
    short: '💼 Jobs',
    question: 'What kind of role are you looking for?',
    answer: 
	"I'm seeking roles in full-stack development and embedded systems, particularly projects that blend hardware and software. I'm actively looking to relocate to Switzerland, though I'm open to compelling opportunities globally."
  },
  {
    id: 4,
    short: '🎯 Dream role',
    question: 'What\'s your ideal company culture?',
    answer: 'Teams that value learning, clean code, and solving real problems. Places where ideas matter and execution is thoughtful.'
  },
  {
    id: 5,
    short: '⏰ Availability',
    question: 'When are you available?',
    answer: 'I\'m wrapping up my final semester and available for internships starting immediately or from next year.'
  },
]

const startHintAnimation = () => {
  hintTimer = setTimeout(() => {
    showHint.value = true
    setTimeout(() => {
      showHint.value = false
    }, 4000)
  }, 4000)
  
  hintInterval = setInterval(() => {
    showHint.value = true
    setTimeout(() => {
      showHint.value = false
    }, 4000)
  }, 25000)
}

const toggleQuestion = (id) => {
  const qa = questions.find(q => q.id === id)
  const exists = selectedQAs.value.find(q => q.id === id)
  
  if (exists) {
    selectedQAs.value = selectedQAs.value.filter(q => q.id !== id)
  } else {
    selectedQAs.value = [...selectedQAs.value, qa]
  }
  
  // Auto-scroll to bottom
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  startHintAnimation()
})

onUnmounted(() => {
  clearTimeout(hintTimer)
  clearInterval(hintInterval)
})
</script>

<style scoped>
.about-me-bot-wrapper {
  @apply fixed right-8 bottom-8 z-40;
  @apply hidden lg:block;
}

.bot-hint-cloud {
  @apply absolute -left-48 bottom-16;
  @apply w-48 p-4 rounded-2xl;
  @apply bg-white/40 dark:bg-zen-800/40;
  @apply backdrop-blur-md;
  @apply border-2 border-accent-orange;
  @apply shadow-md;
  @apply text-zen-900 dark:text-zen-50;
  @apply text-sm text-center;
  @apply font-medium;
}

/* Arrow/Pointer */
.bot-hint-cloud::after {
  content: '';
  @apply absolute;
  bottom: -8px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 0px solid transparent;
  border-top: 8px solid var(--accent-orange, #d97706);
}

.bot-toggle {
  @apply w-12 h-12 rounded-full;
  @apply bg-accent-orange hover:bg-accent-green;
  @apply text-white text-xl;
  @apply flex items-center justify-center;
  @apply shadow-lg;
  @apply motion-safe:transition-all motion-safe:duration-300;
  @apply cursor-pointer border-none;
}

.bot-toggle:hover {
  @apply scale-110;
}
.dark .bot-hint-cloud::after {
  border-top-color: rgba(61, 50, 33, 0.4);
}
.bot-chat-window {
  @apply absolute bottom-16 right-0;
  @apply w-80 h-96;
  @apply bg-white/90 dark:bg-zen-800/90;
  @apply backdrop-blur-md;
  @apply border border-zen-200/50 dark:border-zen-700/50;
  @apply rounded-2xl shadow-2xl;
  @apply flex flex-col;
  @apply overflow-hidden;
}

.bot-header {
  @apply px-4 py-3;
  @apply border-b border-zen-200 dark:border-zen-700;
  @apply bg-gradient-to-r from-accent-green/10 to-accent-orange/10;
}

.bot-header h3 {
  @apply text-lg font-serif text-zen-900 dark:text-zen-50;
  @apply mb-0;
}

.bot-messages {
  @apply flex-1 overflow-y-auto p-4 space-y-3;
}

.bot-message {
  @apply bg-zen-100 dark:bg-zen-700;
  @apply text-zen-900 dark:text-zen-50;
  @apply px-4 py-2 rounded-lg text-sm;
  @apply max-w-xs;
}

.user-message {
  @apply bg-accent-green text-white;
  @apply px-4 py-2 rounded-lg text-sm;
  @apply max-w-xs ml-auto;
}

.qa-pair {
  @apply space-y-2;
}

.bot-buttons {
  @apply p-3 border-t border-zen-200 dark:border-zen-700;
  @apply flex flex-wrap gap-2;
  @apply bg-zen-50/50 dark:bg-zen-900/50;
  @apply max-h-24 overflow-y-auto;
}

.qa-button {
  @apply px-3 py-1 text-xs;
  @apply bg-zen-200 dark:bg-zen-700;
  @apply text-zen-900 dark:text-zen-50;
  @apply border border-zen-300 dark:border-zen-600;
  @apply rounded-full;
  @apply hover:bg-accent-green hover:text-white;
  @apply dark:hover:bg-accent-orange;
  @apply motion-safe:transition-all motion-safe:duration-200;
  @apply cursor-pointer;
  border: none;
  font-weight: 500;
}

.qa-button.active {
  @apply bg-accent-green text-white dark:bg-accent-orange;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  @apply motion-safe:transition-all motion-safe:duration-300;
}

.slide-up-enter-from,
.slide-up-leave-to {
  @apply opacity-0 translate-y-full;
}

.pop-enter-active,
.pop-leave-active {
  @apply motion-safe:transition-all motion-safe:duration-300;
}

.pop-enter-from,
.pop-leave-to {
  @apply opacity-0 scale-90;
}
</style>