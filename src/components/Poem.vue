<script setup lang="ts">
import PoemSymbol from './PoemSymbol.vue';
import { useUiStore } from '@/stores/poems.ts';
const props = defineProps<{

  poem: {
    title: string
    text: string
    tags: string[]
    main_category: string
    categories: string[]
    author?: string
  }
}>()

const uiStore = useUiStore()

const openSideMenu = () => {
  uiStore.openMenu(props.poem)
}

</script>

<template>

  <div class="poem container" @click="openSideMenu">
    <p class="subtitle">{{ poem.title }}</p>
    <div class="content" v-html="poem.text"></div>

    <div class="poem-footer">
      <div class="wrapper">
        <p class="author note">Written by <span class="author-name"> {{ poem.author }}</span> in <span>{{
          poem.main_category }}</span></p>

        <div class="tags note">
          <p>Tags: </p>
          <div>
            <div v-for="tag in poem.tags.slice(0, 6)" :key="tag">
              #{{ tag }}
            </div>
          </div>
        </div>

      </div>

      <PoemSymbol :category="poem.main_category"></PoemSymbol>
    </div>
  </div>


</template>

<style scoped></style>
