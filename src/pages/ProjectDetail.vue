<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { projects } from '../data/projects.js'
import CommandPalette from '../components/CommandPalette.vue'
import AmbientSound from '../components/AmbientSound.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const allProjects = projects

const currentIndex = computed(() => 
  allProjects.findIndex((p) => p.id === props.project.id)
)

const prevProject = computed(() => 
  currentIndex.value > 0 ? allProjects[currentIndex.value - 1] : null
)

const nextProject = computed(() => 
  currentIndex.value < allProjects.length - 1 
    ? allProjects[currentIndex.value + 1] 
    : null
)

// Parse markdown to HTML
const parsedContent = computed(() => {
  return marked(props.project.content)
})

const commandItems = computed(() => [
  {
    id: 'back',
    title: 'Back to Home',
    description: 'Go back to the main page',
    action: () => router.push('/'),
  },
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-zen-50 to-zen-100 
              dark:from-zen-900 dark:to-zen-800">
    <!-- Header with Back Button -->
    <header class="container-zen py-8">
      <router-link to="/" class="inline-flex items-center gap-2 text-accent-green hover:text-accent-orange">
        ← Back to home
      </router-link>
    </header>

    <!-- Project Content -->
    <main class="container-zen pb-20">
      <article class="max-w-3xl mx-auto">
        <h1 class="text-5xl font-serif mb-4">{{ project.title }}</h1>
        
        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in project.tags" :key="tag" class="project-tag">
            {{ tag }}
          </span>
        </div>

        <p class="text-xl text-zen-700 dark:text-zen-300 mb-8">
          {{ project.description }}
        </p>

<div class="flex gap-4 mb-12 flex-wrap">
  <a :href="project.link[0]" target="_blank" class="btn btn--orange">
    View Project Website →
  </a>
  <a :href="project.link[1]" target="_blank" class="btn btn--secondary">
    View Github Repo →
  </a>
</div>
        <hr />

        <!-- Parsed Markdown Content -->

	<div v-html="parsedContent" class="markdown-content max-w-3xl mx-auto my-12"></div>

        <hr />

        <!-- Navigation to other projects -->
        <div class="flex justify-between items-center mt-12">
          <router-link 
            v-if="prevProject" 
            :to="`/project/${prevProject.id}`"
            class="btn btn--secondary"
          >
            ← {{ prevProject.title }}
          </router-link>
          <div v-else></div>

          <router-link 
            v-if="nextProject" 
            :to="`/project/${nextProject.id}`"
            class="btn btn--secondary"
          >
            {{ nextProject.title }} →
          </router-link>
        </div>
      </article>
    </main>

    <CommandPalette ref="commandPaletteRef" :items="commandItems" />
    <AmbientSound ref="ambientSoundRef" />
  </div>
</template>