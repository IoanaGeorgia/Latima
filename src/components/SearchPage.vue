<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import Poem from './Poem.vue';
import { useUiStore } from '@/stores/poems';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loader from './Loader.vue';
import Error from './Error.vue';


defineProps<{
}>()

export interface Poem {
  id: any
  title: string
  text: string
  author: string
  main_category: string
  tags: string[]
  categories: string[]
}

const uiStore = useUiStore();
const poemStore = usePoemStore()
const route = useRoute()
const searchTerm = computed(() => {
  const term = route.params?.term;
  return typeof term === 'string' ? term : '';
});

let searchedPoems = reactive<Poem[]>([])


let isLoading = ref(false)



onUnmounted(() => {
  uiStore.closeMenu()
})

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    searchTermFunc()
  }, 2000)


})




const searchTermFunc = () => {
  if (searchTerm.value && typeof searchTerm.value === "string") {
    for (let poem of poemStore.poems) {
      if (poem.tags) {
        let tagHasQuery = poem.tags.find(tag => (tag.toLowerCase().includes(searchTerm.value.toLowerCase())))
        if (tagHasQuery) {
          searchedPoems.push(poem)

        }
      }

    }
  isLoading.value = false

  }
}


watch(
  () => route.params.term,
  () => {

   isLoading.value = true
   searchedPoems = []
  setTimeout(() => {
    searchTermFunc()
  }, 2000)

  }
);


</script>

<template>
  <div class="page-wrapper">
    <Loader v-if="isLoading" />
    <div v-else class="all-wrapper">
      <div v-if="searchTerm" class="wrapper">
        <div v-if="searchedPoems.length"  v-masonry transition-duration="300ms" fit-width="true" item-selector=".item" class="masonry-container masonryWrap"
          gutter="20">
          <div v-masonry-tile class="item" :key="index" v-for="(poem, index) in searchedPoems">
            <Poem :key="index" :poem="poem" />
          </div>
        </div>
        <Error v-else></Error>
      </div>
      <div v-else>
        <p>No search terms found</p>
      </div>

    </div>

  </div>
</template>

<style scoped>

.all-wrapper .wrapper{
  max-width:var(--containerDefaultWidth);
  width:100%;
  margin:auto;
  margin-top:var(--headerHeight);
}

.all-wrapper .masonryWrap{
  margin:auto;
}


.all-wrapper .masonryWrap .item{
  padding-top:20px;
}


</style>
