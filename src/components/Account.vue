<script setup lang="ts">
import { computed } from 'vue'
import { usePoemStore, useUserStore } from '@/stores/poems'
import { RouterLink } from 'vue-router'
import Poem from '@/components/Poem.vue'

defineProps<{}>()

export interface User {
  name: string
  created: string
  in_submission: number
}

const poemStore = usePoemStore()
const userStore = useUserStore()

const poemsByAuthor = computed(() => {
  if (!userStore.user?.name) return []
  return poemStore.poems.filter((poem) => poem.author === userStore.user?.name)
})

</script>

<template>
  <div class="page-wrapper account-wrapper">
    <div class="account-innerWrapper">
      <p class="title">
        <span>𓍊𓋼</span> Hi, {{ userStore.user?.name }}!
      </p>

      <div class="info">
        <p>You have been with us for: {{ userStore.user?.created }}</p>
        <p>Poems in submission: {{ userStore.user?.in_submission }}</p>
      </div>

      <div class="your-poems">
        <div class="smallDecoration">𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚ 𓇼</div>
        <p class="subtitle">Your poems:</p>

        <div v-if="poemsByAuthor.length" v-masonry transition-duration="300ms" fit-width="true" item-selector=".item"
          class="masonry-container" gutter="20">
          <div v-masonry-tile class="item" :key="index" v-for="(poem, index) in poemsByAuthor">
            <Poem :key="index" :poem="poem" />
          </div>
        </div>
        <p v-else>No poems found.</p>

      </div>
    </div>
  </div>
</template>

<style scoped></style>