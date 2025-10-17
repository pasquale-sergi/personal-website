<template>
  <div class="zen-quote-widget-wrapper"> <!-- The container for the entire interactive widget -->
    <!-- The fixed "thinking" icon -->
    <div class="zen-quote-thinker-icon">
      <!-- You can replace this emoji with an SVG if you want a custom black/white icon -->
                      <img 
                  src="/yoga.png" 
                  alt="Blog"
                  class="contact-icon"
                />
    </div>

    <!-- The thinking cloud container, which animates in/out -->
    <Transition name="cloud-pop" mode="out-in">
      <div v-if="quote" :key="quote.text" class="zen-quote-cloud">
        <div class="zen-quote-cloud__content">
          <p class="zen-quote-cloud__text">
            "{{ quote.text }}"
          </p>
          <p class="zen-quote-cloud__author">
            — {{ quote.author }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const quotes = [
  { text: 'Empty your mind, be formless, shapeless – like water.', author: 'Bruce Lee' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'The greatest knowledge is to know that you know nothing.', author: 'Socrates' },
  { text: 'The quieter you become, the more you can hear.', author: 'Ram Dass' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', author: 'Bill Gates' },
  { text: 'Code is like humor. When you have to explain it, it’s bad.', author: 'Cory House' },
];

const quote = ref(null);
let intervalId;

const displayRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quote.value = quotes[randomIndex];
};

onMounted(() => {
  displayRandomQuote(); // Display a quote immediately
  intervalId = setInterval(displayRandomQuote, 8000); // Change every 8 seconds (can adjust to 30000 for 30s)
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>


<style scoped>
/* Main wrapper for the entire widget: positions the icon and the cloud */
.zen-quote-widget-wrapper {
  @apply fixed left-8 bottom-8 z-40;
  min-height: 80px;
  min-width: 80px;
}
@media (max-width: 1023px) {
  .zen-quote-widget-wrapper {
    @apply hidden;
  }
}
/* The '🧘' icon - styled to look monochromatic */
.zen-quote-thinker-icon {
  @apply absolute bottom-0 left-0;
  @apply text-5xl;
  @apply bg-zen-50 dark:bg-zen-800;
  @apply text-zen-900 dark:text-zen-50;
  @apply rounded-full p-2;
  @apply border-2 border-zen-200 dark:border-zen-700;
  @apply shadow-lg;
  @apply leading-none;
  z-index: 2; /* Ensures icon is always on top of the cloud */
}

.zen-quote-cloud {
  @apply absolute w-48 p-3 rounded-2xl;
  @apply bg-white/50 dark:bg-zen-800/50;
  @apply backdrop-blur-md;
  @apply border border-zen-200/30 dark:border-zen-700/30;
  @apply shadow-md;
  @apply text-zen-900 dark:text-zen-50;
  @apply relative;
  z-index: 1;

  bottom: 40px;
  left: 40px;
}

.zen-quote-cloud__content {
  /* Add if it doesn't exist */
}

.zen-quote-cloud__text {
  @apply text-sm;
}

.zen-quote-cloud__author {
  @apply text-xs;
}
.dark .zen-quote-cloud {
  --zen-bg-color: rgba(61, 50, 33, 0.7);
  --zen-border-color: rgba(90, 73, 45, 0.5);
}

/* ... rest of your existing .zen-quote-cloud, ::before, ::after, and animation styles ... */
</style>