<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import { RouterLink } from 'vue-router';
import Poem from './Poem.vue';
defineProps<{
}>()

const poemStore = usePoemStore()

</script>

<template>
  <div class="">

    <div class="top-wrapper">
      <div class="wrapper">
        <p class="title">Most r<span>ea</span>d</p>

        <RouterLink to="/poems"><button>See all poems</button></RouterLink>

        <div v-if="poemStore.poems && poemStore.poems.length" class="top-poems">
          <Poem v-for="poem in poemStore.poems.slice(0, 4)" :poem="poem"></Poem>
        </div>
        <div v-else class="error">No poems available</div>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>
