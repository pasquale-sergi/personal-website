<template>
  <section class="section">
    <div class="space-y-4 mb-12">
      <h3 class="text-center font-serif font-bold text-zen-900 dark:text-zen-50 text-xl">
        Skills
      </h3>
      <p class="text-center text-sm text-zen-600 dark:text-zen-400">
        Technologies and tools I work with
      </p>
    </div>

    <!-- Software Carousel -->
    <div class="carousel-section">
      <div class="carousel-label">Software</div>
      
      <div class="skills-carousel-wrapper">
        <div class="skills-carousel">
          <!-- First set -->
          <div 
            v-for="skill in softwareSkills" 
            :key="`software-1-${skill.name}`"
            class="skill-item"
            :title="skill.name"
          >
            <img :src="skill.logo" :alt="skill.name" class="skill-logo" />
            <span class="skill-label">{{ skill.name }}</span>
          </div>

          <!-- Duplicate for seamless loop -->
          <div 
            v-for="skill in softwareSkills" 
            :key="`software-2-${skill.name}`"
            class="skill-item"
            :title="skill.name"
          >
            <img :src="skill.logo" :alt="skill.name" class="skill-logo" />
            <span class="skill-label">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hardware Carousel -->
    <div class="carousel-section">
      <div class="carousel-label">Hardware & Embedded</div>
      
      <div class="skills-carousel-wrapper">
        <div class="skills-carousel skills-carousel--reverse">
          <!-- First set -->
          <div 
            v-for="skill in hardwareSkills" 
            :key="`hardware-1-${skill.name}`"
            class="skill-item"
            :title="skill.name"
          >
            <img :src="skill.logo" :alt="skill.name" class="skill-logo" />
            <span class="skill-label">{{ skill.name }}</span>
          </div>

          <!-- Duplicate for seamless loop -->
          <div 
            v-for="skill in hardwareSkills" 
            :key="`hardware-2-${skill.name}`"
            class="skill-item"
            :title="skill.name"
          >
            <img :src="skill.logo" :alt="skill.name" class="skill-logo" />
            <span class="skill-label">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  softwareSkills: {
    type: Array,
    required: true,
  },
  hardwareSkills: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.carousel-section {
  @apply mb-8;
}

.carousel-label {
  @apply text-center text-sm font-serif font-bold text-zen-900 dark:text-zen-50;
  @apply mb-4;
}

.skills-carousel-wrapper {
  @apply overflow-hidden;
  @apply rounded-xl;
  @apply bg-gradient-to-r from-zen-50/0 via-zen-50/50 to-zen-50/0;
  @apply dark:from-zen-900/0 dark:via-zen-900/50 dark:to-zen-900/0;
  @apply py-6;
}

.skills-carousel {
  @apply flex gap-8;
  @apply w-fit;
  animation: scrollLeft 40s linear infinite;
}

.skills-carousel--reverse {
  animation: scrollRight 40s linear infinite;
}

.skills-carousel:hover,
.skills-carousel--reverse:hover {
  animation-play-state: paused;
}

.skill-item {
  @apply flex flex-col items-center gap-3;
  @apply flex-shrink-0;
  @apply p-4 rounded-lg;
  @apply bg-white/60 dark:bg-zen-800/60;
  @apply border border-zen-200/50 dark:border-zen-700/50;
  @apply hover:bg-white dark:hover:bg-zen-800;
  @apply hover:border-accent-green;
  @apply hover:shadow-lg;
  @apply motion-safe:transition-all motion-safe:duration-300;
  @apply cursor-pointer;
}

.skill-item:hover {
  @apply -translate-y-1;
}

.skill-logo {
  @apply h-10 w-10 object-contain;
  @apply filter dark:invert;
  @apply motion-safe:transition-transform motion-safe:duration-300;
}

.skill-item:hover .skill-logo {
  @apply scale-110;
}

.skill-label {
  @apply text-xs font-mono font-medium;
  @apply text-zen-700 dark:text-zen-300;
  @apply text-center whitespace-nowrap;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>