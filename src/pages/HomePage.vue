<template>
    
 <div class="min-h-screen bg-gradient-to-br from-zen-50 to-zen-100
              dark:from-zen-900 dark:to-zen-800">
    <div ref="heroRef" class="relative hero-animated-bg">
<div class="relative h-64 md:h-80 lg:h-76 overflow-hidden ">
  <img
    src="/img4.jpg"
    alt="Zen garden"
    class="w-full h-full object-cover opacity-100 relative z-10"
    style="object-position: center 60%"
  />
  <div class="absolute inset-0 bg-gradient-to-b from-zen-50/10 to-zen-50 dark:from-zen-900/10 dark:to-zen-900 relative z-10"></div>
</div>

    </div>


    <!-- Header -->
<header 
  :class="{ 'scrolled-header': isScrolled }" 
  class="container-zen py-8 md:py-12 sticky top-0 z-30 
         bg-gradient-to-b from-zen-50 to-transparent 
         dark:from-zen-900 dark:to-transparent"
>
      <nav class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl md:text-3xl font-serif">Pasquale</h1>
          <p class="text-sm text-zen-600 dark:text-zen-400 mt-1">
            Computer & Electronics Engineering Student
          </p>          
          <p class="text-sm text-zen-600 dark:text-zen-400 mt-1">
            Università del Salento
          </p>
        </div>
        
        <button 
          class="keyboard-hint"
          @click="openCommandPalette"
        >
          ⌘K
        </button>
      </nav>
    </header>
        <!-- Space between name and about paragraph -->

      <div class="pt-4 md:pt-6"></div>
 


    <!-- Main Content -->
    <main class="container-zen pb-20">

            <div class="content-frame">

      <!-- About Section -->
      <section class="section">
   
        <div class="space-y-6 max-w-3xl mx-auto text-center">
          <p class="text-lg text-zen-700 dark:text-zen-300 leading-relaxed">
            Hey there! I'm <span class="font-serif font-bold text-zen-900 dark:text-zen-50">Pasquale</span>, 
            a passionate builder from Italy who loves creating things that matter. 
            Whether it's crafting elegant software, designing embedded systems, or 
            exploring the intersections with AI, I'm drawn to the challenge of 
            bringing ideas to life.
          </p>

          <p class="text-lg text-zen-700 dark:text-zen-300 leading-relaxed">
            I'm completing my final semester and actively seeking an internship role. 
            I believe real-world experience is where learning truly happens. While personal 
            projects build skills, nothing compares to collaborating with talented people 
            on products that impact thousands.
          </p>

          <p class="text-lg text-zen-700 dark:text-zen-300 leading-relaxed">
            My focus is on writing clean, maintainable code and understanding the bigger 
            picture, from hardware constraints to user experience. I'm always eager to learn, 
            adapt, and contribute to something meaningful.
          </p>
        
          <button 
            @click="showExploring = !showExploring"
            class="inline-block mt-4 text-accent-green hover:text-accent-orange
                   underline font-serif italic cursor-pointer border-none bg-none"
          >
            {{ showExploring ? `Hide what I'm exploring` : `See what I'm currently exploring` }} →
          </button>
        </div>
      </section>

    </div>

      <hr/>

          <TechCarousel
          :softwareSkills="softwareSkills"
          :hardwareSkills="hardwareSkills" />

  

      <hr />

      <!-- Projects Section -->
      <section class="section">
        <h2 class="section__title">Projects</h2>
        <div class="max-w-2xl mx-auto text-center mb-8">
    <p class="text-base md:text-lg text-zen-700 dark:text-zen-300 leading-relaxed">
      A collection of my work, from full-stack applications to embedded systems. 
      Each project represents an attempt to solve real-world problems through thoughtful design 
      and clean implementation.
    </p>
    </div>
        
        <!-- Filter Tags -->
        <div class="flex flex-wrap gap-2 mb-12 justify-center">
          <button
            v-for="tag in allTags"
            :key="tag"
            :class="[
              'project-tag',
              selectedTag === tag && 'bg-accent-green text-white border-accent-green',
            ]"
            @click="selectedTag = selectedTag === tag ? null : tag"
          >
            {{ tag }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            class="animate-slideUp"
          />
        </div>

        <div 
          v-if="filteredProjects.length === 0" 
          class="text-center py-12 text-zen-600 dark:text-zen-400"
        >
          No projects found with that tag
        </div>
      </section>

      <hr />

      <!-- Blog Section -->
      <section class="section">
        <h2 class="section__title">Blog</h2>
        <div class="space-y-6">
              <div class="flex items-center gap-3 text-zen-600 dark:text-zen-400 justify-center">
                <img 
                  src="/write.png" 
                  alt="Blog"
                  class="contact-icon"
                />
                <span>Working on it...</span>
    </div>
            
          <article
            v-for="post in blogPosts"
            :key="post.id"
            class="pb-6 border-b border-zen-200 dark:border-zen-700 
                   last:border-0 hover:translate-x-1 
                   motion-safe:transition-transform motion-safe:duration-300"
          >
            <h3 class="text-xl font-serif text-zen-900 dark:text-zen-50 mb-2">
              {{ post.title }}
            </h3>
            <p class="text-sm text-zen-600 dark:text-zen-400 mb-3">
              {{ formatDate(post.date) }}
            </p>
            <p class="text-zen-700 dark:text-zen-300 mb-3">
              {{ post.excerpt }}
            </p>
            <a href="#" class="text-accent-green hover:text-accent-orange">
              Read more →
            </a>
          </article>
        </div>
      </section>

      <hr />

      <!-- Contact Section -->
<section class="section">
  <h2 class="section__title">Get In Touch</h2>
  <div class="max-w-2xl mx-auto text-center">
    <p class="text-zen-700 dark:text-zen-300 mb-12">
      I'm always interested in hearing about new projects, opportunities, and 
      interesting problems to solve. Feel free to reach out through any of the 
      channels below.
    </p>

    <div class="flex flex-col md:flex-row gap-4 justify-center mb-8">
      <!-- Email -->
      <a 
        href="mailto:pasquale.s3rgi@gmail.com" 
        class="contact-link"
        title="Email"
      >
        <img 
          src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg" 
          alt="Email"
          class="contact-icon"
        />
        <span>Email</span>
      </a>

      <!-- LinkedIn -->
<a 
  href="https://www.linkedin.com/in/pasquale-sergi/" 
  target="_blank"
  rel="noopener noreferrer"
  class="contact-link"
  title="LinkedIn"
>
  <img 
    src="/linkedin.png" 
    alt="LinkedIn"
    class="contact-icon"
  />
  <span>LinkedIn</span>
</a>

      <!-- GitHub -->
      <a 
        href="https://github.com/pasquale-sergi" 
        target="_blank"
        rel="noopener noreferrer"
        class="contact-link"
        title="GitHub"
      >
        <img 
          src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg" 
          alt="GitHub"
          class="contact-icon"
        />
        <span>GitHub</span>
      </a>
    </div>

 
  </div>
</section>
    </main>
    <ZenQuoteWidget />

    <AboutMe />

        <ExploringPanel 
      :isOpen="showExploring"
      @toggle="showExploring = !showExploring"
    />

    <!-- Command Palette -->
    <CommandPalette
      ref="commandPaletteRef"
      :items="commandItems"
      @select="handleCommandSelect"
    />


  </div>
  
</template>

<script setup>
import { ref,computed,  onMounted, onUnmounted } from 'vue'
import { projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.vue'
import CommandPalette from '../components/CommandPalette.vue'
import ExploringPanel from '../components/ExploringPanel.vue'
import TechCarousel from '../components/TechCarousel.vue'
import ZenQuoteWidget from '../components/ZenQuoteWidget.vue'
import AboutMe from '../components/AboutMe.vue'

const commandPaletteRef = ref(null)
const selectedTag = ref(null)
const showExploring = ref(false)
const isScrolled=ref(false)
const heroRef = ref(null)
const scrollTriggerPoint = ref(0)

const softwareSkills = [
  { name: 'Vue.js', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vuedotjs.svg' },
  { name: 'Python', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/python.svg' },
  { name: 'JavaScript', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/javascript.svg' },
  { name: 'Java', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openjdk.svg' },
  { name: 'PostgreSQL', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/postgresql.svg' },
  { name: 'TensorFlow', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tensorflow.svg' },
  { name: 'Docker', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/docker.svg' },
  { name: 'Git', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg' },
{ name: 'PyTorch', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pytorch.svg' },

	{ name: 'Spring Boot', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/springboot.svg' },
{ name: 'SQL', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mysql.svg' },


]

const hardwareSkills = [
  { name: 'ESP32', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/espressif.svg' },

	{ name: 'Arduino', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/arduino.svg' },
      { name: 'Raspberry Pi', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/raspberrypi.svg' },
  { name: 'C/C++', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cplusplus.svg' },
  { name: 'MQTT', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mqtt.svg' },
  { name: 'PCB Design', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/kicad.svg' },
  { name: 'Fusion 360', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/autodesk.svg' },
]

const blogPosts = [

]

const allTags = computed(() => {
  const tags = new Set()
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projects
  return projects.filter((project) => project.tags.includes(selectedTag.value))
})

const commandItems = computed(() => [
  ...projects.map((project) => ({
    id: `project-${project.id}`,
    title: project.title,
    description: `${project.tags.join(', ')}`,
    action: () => {
      selectedTag.value = null
      const element = document.querySelector('.section:nth-of-type(2)')
      element?.scrollIntoView({ behavior: 'smooth' })
    },
  })),
  ...blogPosts.map((post) => ({
    id: `post-${post.id}`,
    title: post.title,
    description: post.excerpt,
    action: () => {
      // Navigate to blog post
    },
  })),
  // Software Skills
  ...softwareSkills.map((skill) => ({
    id: `skill-software-${skill.name}`,
    title: skill.name,
    description: 'Software',
    action: () => {
      const element = document.querySelector('.carousel-section')
      element?.scrollIntoView({ behavior: 'smooth' })
    },
  })),
  // Hardware Skills
  ...hardwareSkills.map((skill) => ({
    id: `skill-hardware-${skill.name}`,
    title: skill.name,
    description: 'Hardware & Embedded',
    action: () => {
      const element = document.querySelector('.carousel-section')
      element?.scrollIntoView({ behavior: 'smooth' })
    },
  })),
])

const openCommandPalette = () => {
  commandPaletteRef.value?.open()
}

const handleCommandSelect = (item) => {
  if (item.action) {
    item.action()
  }
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const handleScroll = () => {
    if (scrollTriggerPoint.value > 0) {
      isScrolled.value = window.scrollY > scrollTriggerPoint.value
    }
  }

const calculateTriggerPoint = () => {
  if (heroRef.value) {
    // The header sticks when we've scrolled past the hero section.
    // We subtract a small amount (e.g., 20px) for a smoother visual transition
    // so the change completes just as it settles at the top.
    scrollTriggerPoint.value = heroRef.value.offsetHeight - 20
  }
}

onMounted(() => {
    // Calculate the initial value
  calculateTriggerPoint()
  
  // Add listeners
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', calculateTriggerPoint)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', calculateTriggerPoint)
})
</script>

<style scoped>
.scrolled-header {
  /* 1. Make it smaller: Reduce vertical padding */
  @apply py-4;

  /* 2. Make it less "boxy": Use a gradient that fades to transparent */
  @apply bg-gradient-to-b from-zen-50/75 to-transparent;
  @apply dark:from-zen-900/75 dark:to-transparent;

  /* 3. Make it softer: Remove the hard shadow and bottom border */
  @apply shadow-none border-transparent;

  /* 4. Ensure a smooth transition for all property changes */
  @apply transition-all duration-300 ease-in-out;

  /* The backdrop blur remains the key to the effect */
  @apply backdrop-blur-md;
}
</style>

