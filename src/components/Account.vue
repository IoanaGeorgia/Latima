<script setup lang="ts">
import { computed } from 'vue'
import { usePoemStore, useUserStore } from '@/stores/poems'
import { RouterLink } from 'vue-router'
import Poem from '@/components/Poem.vue'
import router from '@/router';

defineProps<{}>()

export interface User {
  username: string
  mail:string
  createdAt: string
  in_submission: number
  
}

const poemStore = usePoemStore()
const userStore = useUserStore()

const poemsByAuthor = computed(() => {
  if (!userStore.user?.username) return []
  return poemStore.poems.filter((poem) => poem.author === userStore.user?.username)
})


const formattedJoinedDate = computed(() => {
  const dateStr = userStore.user?.createdAt
  if (!dateStr) return ''

  const date = new Date(dateStr)
  
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short', 
    year: 'numeric'
  })
})

async function logout() {
  try {
    await fetch('/api/logout', { method: 'POST' });
  } catch (err) {
    console.error("Failed to destroy server session:", err);
  } finally {
    userStore.setUser(null);
     window.location.href = "/";
  }
}

</script>

<template>
  <div class="page-wrapper account-wrapper">
    <div class="account-innerWrapper">
      <p class="title">
        <span>𓍊𓋼</span> Hi, {{ userStore.user?.username }}!
      </p>

      <div class="info">
        <p>You have been with us since: {{ formattedJoinedDate }}</p>
        <p>Poems in submission: {{ userStore.user?.in_submission }}</p>
        <button @click="logout">Log out</button>
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

<style scoped>
.info button{
  max-width:fit-content;
}
</style>