import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/components/WelcomePage.vue' 

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
      component: () => import('@/components/AddPoem.vue'),
    },
    {
      path: '/poems',
      name: 'poems',
      component: () => import('@/components/Poems.vue'),
    },
    {
      path: '/search/:term',
      name: 'searchPage',
      component: () => import('@/components/SearchPage.vue'),
    },
    {
      path:'/account',
      name:'account',
      component: () => import('@/components/Account.vue')
    },
     {
      path:'/register',
      name:'register',
      component: () => import('@/components/Register.vue')
    }
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