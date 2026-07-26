<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import { RouterLink } from 'vue-router';
import Poem from './Poem.vue';
defineProps<{
}>()

const poemStore = usePoemStore()

</script>

<template>
  <div class="page-wrapper">

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
.top-wrapper .wrapper {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--defaultSmallPadding);
}


.top-wrapper .wrapper .top-poems {
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
  .top-wrapper .wrapper .top-poems {
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
  .top-wrapper .wrapper .top-poems {
    width: max-content;
    max-width: max-content;
    display: grid;
    grid-template-columns: repeat(1, 320px);
    justify-items: center;
    align-items: start;
    margin: auto;
    gap: var(--defaultSmallPadding);
    margin-top: var(--bigMargin);
  }

  .how-wrapper .list-wrapper {
    flex-direction: column;
  }

}

.top-wrapper .error {
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
