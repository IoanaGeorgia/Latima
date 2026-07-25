<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { poems } from '@/data.js'
import { usePoemStore } from '@/stores/poems'
import Header from './components/Header.vue'

const poemStore = usePoemStore()

onMounted(()=>{
  poemStore.setPoems(poems)
})
</script>

<template>

   <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
  <Header/>
  <div>
  <RouterView />
  </div>
</template>

<style scoped>

</style>
