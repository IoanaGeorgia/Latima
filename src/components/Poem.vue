<script setup lang="ts">
import router from '@/router/index.ts';
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


function searchPage(term:string){
   router.push({
      name: 'searchPage',
      params: { term: term }
    })
}

</script>

<template>

  <div class="poem container" >
    <div class="poem-content" @click="openSideMenu">
    <p class="subtitle">{{ poem.title }}</p>
    <div class="content" v-html="poem.text"></div>
</div>
    <div class="poem-footer">
      <div class="wrapper">
        <p class="author note">Written by <span class="author-name" @click="searchPage(poem.author || '')"> {{ poem.author }}</span> in <span>{{
          poem.main_category }}</span></p>

        <div class="tags note">
          <p>Tags: </p>
          <div>
            <div v-for="tag in poem.tags.slice(0, 6)" :key="tag"  @click="searchPage(tag)">
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
