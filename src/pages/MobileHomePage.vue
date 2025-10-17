<template>
  <div class="mobile-home">
    <!-- Mobile header -->
    <header class="mobile-header">
      <h1>Pasquale</h1>
      <p>Computer & Electronics Engineering Student</p>
      <p class="mobile-university">Università del Salento</p>
    </header>

    <!-- Mobile hero -->
    <div class="mobile-hero">
      <img src="/img3.jpg" alt="Hero" />
    </div>

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
      <div class="mobile-skills-grid">
        <div v-for="skill in softwareSkills" :key="skill.name" class="mobile-skill">
          <img :src="skill.logo" :alt="skill.name" />
          <span>{{ skill.name }}</span>
        </div>
      </div>

      <h3 class="mobile-subsection-title">Hardware & Embedded</h3>
      <div class="mobile-skills-grid">
        <div v-for="skill in hardwareSkills" :key="skill.name" class="mobile-skill">
          <img :src="skill.logo" :alt="skill.name" />
          <span>{{ skill.name }}</span>
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
      <div class="mobile-blog-placeholder">
        📝 Working on it...
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
import { ref, computed } from 'vue'
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
</script>

<style scoped>
.mobile-home {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to br, #f5f1e8 to #ede5d9);
  overflow-x: hidden;
}

.mobile-header {
  padding: 1.5rem 0;
  text-align: center;
  background: white;
  margin: 0;
}

.mobile-header h1 {
  font-size: 2.5rem;
  font-family: serif;
  font-weight: bold;
  margin: 0.5rem 0 0;
}

.mobile-header p {
  font-size: 0.875rem;
  color: #b8945f;
  margin: 0.25rem 0;
}

.mobile-university {
  font-size: 0.75rem;
  color: #999;
}

.mobile-hero {
  width: 100%;
  height: 180px;
  overflow: hidden;
  margin: 0;
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
}

.mobile-progress span {
  font-size: 0.75rem;
  font-family: monospace;
  color: #999;
  min-width: 35px;
}

/* Skills */
.mobile-skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
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
}

.mobile-tag {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
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
</style>