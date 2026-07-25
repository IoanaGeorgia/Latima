
<script setup lang="ts">
import PoemSymbol from './PoemSymbol.vue';
import { usePoemStore } from '@/stores/poems'
import { RouterLink} from 'vue-router'
defineProps<{
}>()

const poemStore = usePoemStore()

const scrollToAbout = () => {
  const element = document.getElementById('about')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>

  <header>
    <div class="header-wrapper">
      <div class="logo">𓍊<span>𓋼L</span>at</div>
      <div class="buttons">
        <div class="search-wrapper">
          <input type="text" placeholder="Type here to search"></input>
          <button class="search-btn">🔍︎

          </button>
        </div>
         <RouterLink to="/add-poem"> <button class="reverse">🖍</button></RouterLink>
        <button class="reverse">𖠋</button>
      </div>
    </div>
    
  </header>



</template>

<style scoped>

</style>
