<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { poems } from '@/data.js'
import { usePoemStore } from '@/stores/poems'
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'

const poemStore = usePoemStore()

onMounted(()=>{
  poemStore.setPoems(poems)
})
</script>

<template>

  <Header/>
  <SideMenu/>
  <main>
  <div>
  <RouterView />
  </div>
  </main>
  <Footer />
  
</template>

