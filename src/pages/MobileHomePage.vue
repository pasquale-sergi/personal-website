<template>
  <div class="mobile-home">

    <div class="mobile-hero-container">
     <img src="/img5.jpg" alt="Zen landscape" class="mobile-hero-image" />
    </div>

    <!-- 2. NEW: The header text comes AFTER, clean and centered -->
    <header class="mobile-header-block">
      <h1 class="mobile-header-name">Pasquale</h1>
      <p class="mobile-header-title">
        Computer & Electronics Engineering Student
      </p>
      <p class="mobile-header-subtitle">Università del Salento</p>
    </header>

    <!-- About section -->
    <section class="mobile-section">
      <p class="mobile-text">
        Hey there! I'm <strong>Pasquale</strong>, a passionate builder from Italy who loves creating things that matter. 
        Whether it's crafting elegant software, designing embedded systems, or exploring the intersections with AI, I'm drawn to the challenge of bringing ideas to life.
      </p>

      <p class="mobile-text">
        I'm completing my final semester and actively seeking an internship role. I believe real-world experience is where learning truly happens. While personal projects build skills, nothing compares to collaborating with talented people on products that impact thousands.
      </p>

      <p class="mobile-text">
        My focus is on writing clean, maintainable code and understanding the bigger picture, from hardware constraints to user experience. I'm always eager to learn, adapt, and contribute to something meaningful.
      </p>

      <button 
        @click="showExploring = !showExploring"
        class="mobile-link-btn"
      >
        {{ showExploring ? 'Hide' : 'See' }} what I'm exploring →
      </button>
    </section>

    <!-- Exploring Panel Content -->
    <section v-if="showExploring" class="mobile-section mobile-exploring">
      <h2>Currently Exploring</h2>
      <div v-for="topic in exploringTopics" :key="topic.id" class="mobile-explore-item">
        <div>
          <strong>{{ topic.title }}</strong>
          <p>{{ topic.description }}</p>
        </div>
        <div class="mobile-progress">
          <div class="mobile-progress-bar">
            <div class="mobile-progress-fill" :style="{ width: topic.progress + '%' }"></div>
          </div>
          <span>{{ topic.progress }}%</span>
        </div>
      </div>
    </section>

<!-- Skills section -->
    <section class="mobile-section">
      <h2>Skills</h2>
      
      <h3 class="mobile-subsection-title">Software</h3>
      <div class="mobile-carousel-wrapper">
        <div class="mobile-carousel">
          <!-- First set -->
          <div 
            v-for="skill in softwareSkills" 
            :key="`software-1-${skill.name}`"
            class="mobile-carousel-item"
          >
            <img :src="skill.logo" :alt="skill.name" />
            <span>{{ skill.name }}</span>
          </div>
          <!-- Duplicate for seamless loop -->
          <div 
            v-for="skill in softwareSkills" 
            :key="`software-2-${skill.name}`"
            class="mobile-carousel-item"
          >
            <img :src="skill.logo" :alt="skill.name" />
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <h3 class="mobile-subsection-title">Hardware & Embedded</h3>
      <div class="mobile-carousel-wrapper">
        <div class="mobile-carousel mobile-carousel-reverse">
          <!-- First set -->
          <div 
            v-for="skill in hardwareSkills" 
            :key="`hardware-1-${skill.name}`"
            class="mobile-carousel-item"
          >
            <img :src="skill.logo" :alt="skill.name" />
            <span>{{ skill.name }}</span>
          </div>
          <!-- Duplicate for seamless loop -->
          <div 
            v-for="skill in hardwareSkills" 
            :key="`hardware-2-${skill.name}`"
            class="mobile-carousel-item"
          >
            <img :src="skill.logo" :alt="skill.name" />
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects section -->
    <section class="mobile-section">
      <h2>Projects</h2>



      <!-- Project cards -->
      <div class="mobile-projects">
        <router-link 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :to="`/project/${project.id}`" 
          class="mobile-project-card"
        >
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="mobile-project-tags">
            <span v-for="tag in project.tags" :key="tag" class="mobile-mini-tag">{{ tag }}</span>
          </div>
          <div class="mobile-project-footer">
            <span v-if="project.year">{{ project.year }}</span>
            <span class="mobile-arrow">View →</span>
          </div>
        </router-link>
      </div>

      <div v-if="filteredProjects.length === 0" class="mobile-no-projects">
        No projects with that tag
      </div>
    </section>

    <!-- Blog section -->
    <section class="mobile-section">
      <h2>Blog</h2>
      <div class="flex items-center gap-3 text-zen-600 dark:text-zen-400 justify-center">
                      
                <img 
                  src="/write.png" 
                  alt="Blog"
                  class="contact-icon"
                />
                <span>Working on it...</span>
      </div>
    </section>

    <!-- Contact section -->
    <section class="mobile-section">
      <h2>Get In Touch</h2>
      <p class="mobile-contact-text">
        Interested in collaborating or have a question? Feel free to reach out.
      </p>
      <div class="mobile-buttons">
        <a href="mailto:pasquale.s3rgi@gmail.com" class="mobile-btn">
          <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg" alt="Email" />
          Email
        </a>
        <a href="https://linkedin.com/in/pasquale-sergi/" target="_blank" rel="noopener noreferrer" class="mobile-btn">
          <img src="/linkedin.png" alt="LinkedIn" />
          LinkedIn
        </a>
        <a href="https://github.com/pasquale-sergi" target="_blank" rel="noopener noreferrer" class="mobile-btn">
          <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg" alt="GitHub" />
          GitHub
        </a>
      </div>
    </section>

    <!-- Widgets -->
    <AboutMe />
    <ZenQuoteWidget />
  </div>
</template>

<script setup>
import { ref, computed , onMounted, nextTick} from 'vue'
import { projects } from '../data/projects.js'
import AboutMe from '../components/AboutMe.vue'
import ZenQuoteWidget from '../components/ZenQuoteWidget.vue'

const showExploring = ref(false)
const selectedTag = ref(null)

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


onMounted(async () => {
  if (window.innerWidth >= 768) return; // Skip on desktop to avoid errors

  await nextTick(); // Wait for DOM render
  const mobileHome = document.querySelector('.mobile-home');
  const appContainer = document.querySelector('.app-container');
  
  console.group('MobileHome Debug (remove after testing)');
  console.log('Is Mobile (Client Check):', window.innerWidth < 768);
  console.log('Viewport Size:', { width: window.innerWidth, height: window.innerHeight });
  
  if (appContainer) {
    console.log('App Container:', {
      classes: appContainer.className,
      width: appContainer.offsetWidth,
      height: appContainer.offsetHeight,
      computedWidth: window.getComputedStyle(appContainer).width,
      computedBoxSizing: window.getComputedStyle(appContainer).boxSizing
    });
  } else {
    console.log('App Container: Not found!');
  }
  
  if (mobileHome) {
    console.log('Mobile Home:', {
      classes: mobileHome.className,
      width: mobileHome.offsetWidth,
      height: mobileHome.offsetHeight,
      computedWidth: window.getComputedStyle(mobileHome).width,
      computedBoxSizing: window.getComputedStyle(mobileHome).boxSizing
    });
  } else {
    console.log('Mobile Home: Not found! (Check if component mounted)');
  }
  
  console.groupEnd();
});
</script>

<style scoped>
/* Strengthen root for mobile: Force full expansion (scoped, so safe) */
.mobile-home {
  width: 100%;
  height: 100vh; /* Full height */
  min-height: 100vh;
  max-width: 100vw; /* Prevent any Tailwind max-w limits */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  position: absolute; /* Break out of any parent relative positioning if needed */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Your existing background */
  background: linear-gradient(to br, #f5f1e8, #ede5d9);
}

/* Ensure all sections expand to full width */
.mobile-header,
.mobile-hero,
.mobile-section,
.mobile-projects,
.mobile-buttons,
.mobile-carousel-wrapper {
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding-left: 1rem; /* Your existing */
  padding-right: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

/* Mobile-only: Prevent carousel/tags from overflowing or shrinking */
@media (max-width: 767px) {
  .mobile-home {
    position: fixed; /* Pin to viewport if parent constraints persist */
    width: 100vw !important;
    height: 100vh !important;
    /* Only use !important here if absolutely needed—test without first */
  }
  
  .mobile-carousel,
  .mobile-tags,
  .mobile-project-card {
    width: 100%;
    overflow: visible;
  }
}
.mobile-header {
  padding: 1rem 1rem; /* Reduced from 1.5rem */
  text-align: center;
  background: linear-gradient(to bottom, #f5f1e8, transparent);
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.mobile-header h1 {
  font-size: 2.5rem;
  font-family: serif;
  font-weight: bold;
  margin: 0.25rem 0 0; /* Reduced from 0.5rem */
}

.mobile-header p {
  font-size: 0.875rem;
  color: #b8945f;
  margin: 0.1rem 0; /* Reduced from 0.25rem */
}

.mobile-university {
  font-size: 0.75rem;
  color: #999;
}

.mobile-hero {
  width: 100%;
  height: 150px; /* Much bigger */
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;
  border-radius: 9%;
}

.mobile-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-section {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin: 0;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
}



.mobile-section h2 {
  font-size: 1.75rem;
  font-family: serif;
  font-weight: bold;
  margin: 0 0 1rem 0;
  text-align: center;
  color: #2c2c2c;
}

.mobile-section h3 {
  font-size: 1.125rem;
  font-weight: bold;
  margin: 1rem 0 0.75rem 0;
  text-align: center;
  color: #b8945f;
}

.mobile-subsection-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem 0;
  text-align: center;
  color: #666;
}

.mobile-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #666;
  text-align: center;
  margin: 0 0 1rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  box-sizing: border-box;
}

.mobile-link-btn {
  display: block;
  margin: 1rem auto 0;
  background: none;
  border: none;
  color: #6b9e66;
  font-style: italic;
  font-family: serif;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
}

.mobile-link-btn:active {
  color: #d97706;
}

/* Exploring section */
.mobile-exploring {
  background: #f9f7f3;
}

.mobile-explore-item {
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.mobile-explore-item strong {
  font-size: 1rem;
  display: block;
  margin-bottom: 0.25rem;
}

.mobile-explore-item p {
  font-size: 0.875rem;
  color: #666;
  margin: 0.5rem 0 0.75rem 0;
}

.mobile-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-progress-bar {
  flex: 1;
  height: 6px;
  background: #e5e5e5;
  border-radius: 3px;
  overflow: hidden;
}

.mobile-progress-fill {
  height: 100%;
  background: linear-gradient(to right, #6b9e66, #d97706);
  transition: width 0.5s ease;
}

.mobile-progress span {
  font-size: 0.75rem;
  font-family: monospace;
  color: #999;
  min-width: 35px;
}

/* Carousel */
.mobile-carousel-wrapper {
  overflow: hidden;
  border-radius: 0.75rem;
  background: rgba(245, 241, 232, 0.5);
  padding: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
}
.mobile-carousel {
  display: flex;
  gap: 1rem;
  width: fit-content;
  animation: mobileScrollLeft 30s linear infinite;
  padding: 0;
  margin: 0;
  overflow: visible;
}

.mobile-carousel-reverse {
  animation: mobileScrollRight 30s linear infinite;
}

.mobile-carousel:hover,
.mobile-carousel-reverse:hover {
  animation-play-state: paused;
}

.mobile-carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  width: 5.5rem;
  padding: 0.75rem 0.5rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s;
  margin: 0;
  box-sizing: border-box;
}

.mobile-carousel-item:active {
  background: #f9f9f9;
  transform: scale(0.95);
}

.mobile-carousel-item img {
  width: 1.75rem;
  height: 1.75rem;
  object-fit: contain;
  filter: brightness(0.8);
}

.mobile-carousel-item span {
  font-size: 0.65rem;
  font-weight: 500;
  color: #666;
  line-height: 1.2;
  word-break: break-word;
}

@keyframes mobileScrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes mobileScrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Skills Grid */
.mobile-skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.mobile-skill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s;
}

.mobile-skill:active {
  background: #f9f9f9;
  transform: scale(0.95);
}

.mobile-skill img {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  filter: brightness(0.8);
}

.mobile-skill span {
  font-size: 0.75rem;
  font-weight: 500;
  color: #666;
}

/* Projects */
.mobile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.mobile-tag {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.mobile-tag:active {
  background: #6b9e66;
  color: white;
}

.mobile-tag.active {
  background: #6b9e66;
  color: white;
}

.mobile-projects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.mobile-project-card {
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.mobile-project-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-project-card h3 {
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #2c2c2c;
}

.mobile-project-card p {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.mobile-project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.mobile-mini-tag {
  font-size: 0.75rem;
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.mobile-project-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #b8945f;
}

.mobile-arrow {
  font-weight: 500;
}

.mobile-no-projects {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.875rem;
}

/* Blog */
.mobile-blog-placeholder {
  text-align: center;
  padding: 2rem 0;
  color: #b8945f;
  font-size: 1.125rem;
}

/* Contact */
.mobile-contact-text {
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin-bottom: 1rem;
}

.mobile-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.mobile-btn {
  padding: 1rem;
  background: #6b9e66;
  color: white;
  border-radius: 0.75rem;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
}

.mobile-btn img {
  width: 1.25rem;
  height: 1.25rem;
  filter: brightness(0) invert(1);
}

.mobile-btn:active {
  background: #d97706;
  transform: scale(0.98);
}

.mobile-hero-container {
  width: 100%;
  height: 220px; /* Give it a substantial, fixed height */
  overflow: hidden;
  background-color: #f5f1e8; /* Fallback color */
}

.mobile-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This is key: ensures the image covers the area without distortion */
  object-position: center 30%; /* Adjust to frame the best part of the image */
}

/* 2. The Header Text Block */
.mobile-header-block {
  text-align: center;
  padding: 1.5rem 1rem;
  background: linear-gradient(
    to bottom,
    rgba(245, 241, 232, 1),
    rgba(245, 241, 232, 0)
  ); /* Fades into the background */
}

.mobile-header-name {
  font-family: serif;
  font-size: 2.75rem; /* Larger and more impactful */
  font-weight: 600;
  margin: 0;
  color: #2c2c2c;
}

.mobile-header-title {
  font-size: 1rem;
  color: #b8945f; /* Your accent color */
  margin: 0.25rem 0;
}

.mobile-header-subtitle {
  font-size: 0.875rem;
  color: #888;
  margin: 0.25rem 0 0;
}
</style>