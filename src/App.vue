<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { user } from '@/data.js'
import { usePoemStore, useUserStore, useCategoriesStore } from '@/stores/poems'
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'

const poemStore = usePoemStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

onMounted(() => {

  getPoems()
  getCategories()
  userStore.setUser(user)
})

async function getPoems() {
  try {
    const response = await fetch('/api/poems');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    poemStore.setPoems(result.data)
  } catch (error) {
    console.error('Failed to fetch poems:', error);
  }
}

async function getCategories() {
  try {
    const response = await fetch('/api/categories');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    categoriesStore.setCategories(result.data)
  } catch (error) {
    console.error('Failed to fetch categories:', error);
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
