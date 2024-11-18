import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//I only need one route(HOME)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
