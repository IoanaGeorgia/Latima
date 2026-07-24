<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { poems } from '@/data.js'
import { usePoemStore } from '@/stores/poems'

const poemStore = usePoemStore()

onMounted(()=>{
  poemStore.setPoems(poems)
})
</script>

<template>

   <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
  <div>
  <RouterView />
  </div>
</template>

<style scoped>

</style>
