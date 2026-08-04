<script setup lang="ts">
import { usePoemStore, useUiStore } from '@/stores/poems'
import Poem from './Poem.vue'
import Loader from './Loader.vue'
import Error from './Error.vue'
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{}>()

export interface Poem {
  id: any
  title: string
  text: string
  author: string
  main_category: string
  tags: string[]
  categories: string[]
}

const uiStore = useUiStore()
const poemStore = usePoemStore()

let poems = ref<Poem[]>([])
let isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    poems.value = poemStore.poems
    isLoading.value = false
  }, 2000)
})

onUnmounted(() => {
  uiStore.closeMenu()
})
</script>

<template>
  <div class="page-wrapper">
    <div class="all-wrapper">
      <Loader v-if="isLoading" />
      <div v-else class="your-poems">
        <div v-if="poems.length" v-masonry transition-duration="300ms" fit-width="true" item-selector=".item"
          class="masonry-container" gutter="20">
          <div v-masonry-tile class="item" :key="index" v-for="(poem, index) in poems">
            <Poem :key="index" :poem="poem" />
          </div>
        </div>
        <Error v-else></Error>

      </div>
    </div>
  </div>
</template>

<style scoped>
.all-wrapper {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  margin: 0 auto;
  padding-bottom: var(--headerHeight);
}


.your-poems {
  width: 100%;
  margin-top: var(--bigMargin);
}

.your-poems>div {
  margin: auto;
}


.poem-card {
  margin-bottom: 40px;
}

.all-wrapper .error {
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.all-wrapper .item {
  padding-top: 20px;
}
</style>