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
        <div v-if="searchedPoems.length" class="top-poems">
          <Poem v-for="poem in searchedPoems" :poem="poem"></Poem>
        </div>
      <Error v-else />
      </div>
      <div v-else>
        <p>No search terms found</p>
      </div>

    </div>

  </div>
</template>

<style scoped>
.all-wrapper .wrapper {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--defaultSmallPadding);
  padding-top: var(--headerHeight);
  padding-bottom: var(--headerHeight);
}


.all-wrapper .wrapper .top-poems {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: start;
  align-items: start;
  margin: auto;
  gap: var(--defaultSmallPadding);
  margin-top: var(--bigMargin);
  width: max-content;
}


@media(max-width:1414px) {
  .all-wrapper .wrapper .top-poems {
    width: max-content;
    max-width: max-content;
    display: grid;
    grid-template-columns: repeat(2, 320px);
    justify-items: center;
    align-items: start;
    margin: auto;
    gap: var(--defaultSmallPadding);
    margin-top: var(--bigMargin);
  }

}

@media(max-width:700px) {
  .all-wrapper .wrapper .top-poems {
    width: max-content;
    max-width: max-content;
    display: grid;
    grid-template-columns: repeat(1, 100%);
    justify-items: center;
    align-items: start;
    margin: auto;
    gap: var(--defaultSmallPadding);
    margin-top: var(--bigMargin);
  }


}

</style>
