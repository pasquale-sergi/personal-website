import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'
import { projects } from '../data/projects.js'  // ← Import once
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/project/:id',
    component: ProjectDetail,
    props: (route) => {
      const project = projects.find((p) => p.id === parseInt(route.params.id))
      return { project }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router