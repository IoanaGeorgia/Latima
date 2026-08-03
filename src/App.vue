<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { poems, user } from '@/data.js'
import { usePoemStore, useUserStore } from '@/stores/poems'
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'

const poemStore = usePoemStore()
const userStore = useUserStore()

onMounted(() => {
  poemStore.setPoems(poems)
  userStore.setUser(user)
})

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
