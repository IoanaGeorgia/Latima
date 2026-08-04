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

        <div v-if="poemStore.poems.length" v-masonry transition-duration="300ms" fit-width="true" item-selector=".item"
          class="masonry-container masonryWrap" gutter="20">
          <div v-masonry-tile class="item" :key="index" v-for="(poem, index) in poemStore.poems.slice(0, 4)">
            <Poem :key="index" :poem="poem" />
          </div>
        </div>
        <p v-else>No poems found.</p>

      </div>

    </div>

  </div>
</template>

<style scoped></style>
