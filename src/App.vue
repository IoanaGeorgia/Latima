<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { usePoemStore, useUserStore, useCategoriesStore } from '@/stores/poems'

import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'

const poemStore = usePoemStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  await Promise.all([getUser(), getPoems(), getCategories()])
})

async function getUser(): Promise<void>{
  try{
    const response = await fetch("/api/getUser", {
      method: "GET",
      credentials: "include" 
    })

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

async function getPoems(): Promise<void> {
  try {
    const response = await fetch('/api/poems')

    if (!response.ok) {
      console.log("Poems couldn't be fetched")
      return;
    }
    
    const result = await response.json()
    poemStore.setPoems(result.data)
  } catch (error) {
    console.error('Failed to fetch poems:', error)
  }
}

async function getCategories(): Promise<void> {
  try {
    const response = await fetch('/api/categories')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()
    categoriesStore.setCategories(result.data)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}
</script>

<template>
  <Header />
  <SideMenu />
  <main>
    <div>
      <RouterView />
    </div>
  </main>
  <Footer />
</template>