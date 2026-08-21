<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import Poem from './Poem.vue';
import { useUiStore } from '@/stores/poems';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loader from './Loader.vue';
import Error from './Error.vue';


const props = defineProps<{
  term: string
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
const poemStore = usePoemStore();
const route = useRoute();

const searchTerm = computed(() => {
  const term = route.params?.term;
  return typeof term === 'string' ? term : '';
});


const searchedPoems = ref<Poem[]>([]);
const isLoading = ref(false);

const searchTermFunc = () => {
  searchedPoems.value = [];

  if (searchTerm.value) {
    const query = searchTerm.value.toLowerCase().trim();

    searchedPoems.value = poemStore.poems.filter(poem => {
      const matchesTitle = poem.title && poem.title.toLowerCase().includes(query);
      const matchesAuthor = poem.author && poem.author.toLowerCase().includes(query);
      const matchesTags = poem.tags && poem.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesTitle || matchesAuthor || matchesTags;
    });
  }

  isLoading.value = false;
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    searchTermFunc();
  }, 2000);
});

onUnmounted(() => {
  uiStore.closeMenu();
});


watch(
  () => props.term,
  (newTerm) => {
    if (newTerm) {
      isLoading.value = true
      searchTermFunc()
    }
  },
  { immediate: true }
)

</script>


<template>
  <div class="page-wrapper">
     <div class="title-wrapper">
      <p class="title">🔍︎ : {{ searchTerm }}</p>
    </div>

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
}

.all-wrapper .masonryWrap{
  margin:auto;
}


.all-wrapper .masonryWrap .item{
  padding-top:20px;
}

.title-wrapper .title{
  font-size:3rem;
}


</style>
