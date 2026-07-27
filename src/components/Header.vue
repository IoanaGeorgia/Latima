<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import { RouterLink } from 'vue-router'
import { ref, watch } from 'vue';
import router from '@/router';
defineProps<{
}>()

const isMobileOpen = ref(false)

const poemStore = usePoemStore()



const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const searchTerm = ref("")
const debouncedSearchTerm = ref<string>('')
let timeoutId:any = null


watch(searchTerm, (newVal) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    debouncedSearchTerm.value = newVal;
  
  }, 300)
})

const sendSearch = () =>{
  if(debouncedSearchTerm){
    router.push({ 
    name: 'searchPage', 
    params: { term:debouncedSearchTerm.value } 
  })
  }
}

const sendSearchDirect = () =>{
  if(searchTerm){
    router.push({ 
    name: 'searchPage', 
    params: { term:searchTerm.value } 
  })
  }
}




</script>

<template>

  <header>
    <div class="header-wrapper">
      <RouterLink to="/">
        <div class="logo">𓍊<span>𓋼L</span>at</div>
      </RouterLink>
      <div class="buttons desktop">
        <div class="search-wrapper">
          <input v-model.trim="searchTerm" type="text" placeholder="Type here to search" @keyup.enter="sendSearchDirect"></input>
          <button class="search-btn" @click="sendSearch">🔍︎

          </button>
        </div>
        <RouterLink to="/add-poem"> <button class="reverse">🖍</button></RouterLink>
        <button class="reverse">𖠋</button>
        <RouterLink to="/poems"> <button class="reverse all-poems">🕮</button></RouterLink>
      </div>

      <button class="mobileMenu" @click="toggleMobileMenu"> ≡</button>
      <div v-if="isMobileOpen" class="mobile-menu-wrapper">
        <div class="buttons">

          <RouterLink to="/add-poem"> <button class="reverse">🖍</button></RouterLink>
          <button class="reverse">𖠋</button>
          <div class="search-wrapper">
            <input type="text" placeholder="Type here to search"></input>
            <button class="search-btn">🔍︎

            </button>
          </div>
        </div>
      </div>

    </div>

  </header>



</template>

<style scoped></style>
