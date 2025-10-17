import { createRouter, createWebHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'
import App from '../App.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'
import { projects } from '../data/projects.js'  // ← Import once
import HomePageWrapper from '../components/HomePageWrapper.vue'


const isMobile = () => window.innerWidth < 768

const routes = [
  {
    path: '/',
    component: HomePageWrapper,
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