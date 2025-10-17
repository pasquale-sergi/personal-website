<template>
  <router-link :to="`/project/${project.id}`" class="block">
    <div class="project-card">
      <div class="project-card__content">
        <h3 class="project-card__title">{{ project.title }}</h3>
        <p class="project-card__description">{{ project.description }}</p>
        
        <div class="project-card__tags">
          <span 
            v-for="tag in project.tags" 
            :key="tag" 
            class="project-tag"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-between gap-4">
          <span v-if="project.year" class="text-sm text-zen-600 dark:text-zen-400">
            {{ project.year }}
          </span>
          
          <span class="text-accent-green group-hover:text-accent-orange">
            View Project →
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.id &&
        value.title &&
        value.description &&
        Array.isArray(value.tags)
      )
    },
  },
})
</script>

<style scoped>
/* Remove default link styling */
a {
  text-decoration: none;
}
</style>