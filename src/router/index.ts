import WelcomePage from '@/components/WelcomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddPoem from '@/components/AddPoem.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage,
    },
    {
      path: '/add-poem',
      name: 'addPoem',
      component: AddPoem,
    },
  ],
})

export default router
