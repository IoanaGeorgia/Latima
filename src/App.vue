<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { poems } from '@/data.js'
import { usePoemStore } from '@/stores/poems'
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'

const poemStore = usePoemStore()

onMounted(()=>{
  poemStore.setPoems(poems)
})
</script>

<template>

   <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
  <Header/>
  <SideMenu/>
  <div>
  <RouterView />
  </div>
</template>

<style scoped>

</style>
