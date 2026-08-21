import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/components/WelcomePage.vue' 
import { useUserStore } from '@/stores/poems'

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
      meta: { requiresAuth: true }
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
      props: true
    },
    {
      path:'/account',
      name:'account',
      component: () => import('@/components/Account.vue'),
      meta: { requiresAuth: true }
    },
     {
      path:'/register',
      name:'register',
      component: () => import('@/components/Register.vue'),
      meta: { requiresGuest: true }
    },
   {
      path:'/login',
      name:'login',
      component: () => import('@/components/Login.vue'),
      meta: { requiresGuest: true }
    }  ],
})


router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === null) {
    await getUser() 
  }

  if (to.meta.requiresAuth && !userStore.user) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresGuest && userStore.user) {
    return next({ name: 'home' })
  }

  next()
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



async function getUser(): Promise<void>{
    const userStore = useUserStore()
  try{
    const response = await fetch("/api/getUser")

    if(!response.ok){
      userStore.setUser(null);
      console.log("User couldn't be fetched")
      return;
    }

    const result = await response.json()
    userStore.setUser(result.data)
  }
  catch(err){
    console.log("User couldn't be fetched")
  }
}

export default router