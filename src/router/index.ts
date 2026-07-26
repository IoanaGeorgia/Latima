import WelcomePage from '@/components/WelcomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddPoem from '@/components/AddPoem.vue'
import Poems from '@/components/Poems.vue'


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
    {
      path: '/poems',
      name: 'poems',
      component: Poems,
    },
  ],
})

router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  requestAnimationFrame(() => {
    const scrollableElements = document.querySelectorAll('*')
    scrollableElements.forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    })
  })
})

export default router
