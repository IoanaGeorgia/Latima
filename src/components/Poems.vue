
<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import Poem from './Poem.vue';
defineProps<{
}>()

const poemStore = usePoemStore()

</script>

<template>
  <div class="page-wrapper">
    
<div class="all-wrapper">
    <div class="wrapper">
    <div v-if="poemStore.poems && poemStore.poems.length" class="top-poems">
      <Poem v-for="poem in poemStore.poems" :poem="poem"></Poem>
    </div>
    <div v-else class="error">No poems available</div>
    </div>

</div>

  </div>
</template>

<style scoped>

.all-wrapper .wrapper{
  max-width:var(--containerDefaultWidth);
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap:var(--defaultSmallPadding);
  padding-top:var(--headerHeight);
    padding-bottom:var(--headerHeight);
}


.all-wrapper .wrapper .top-poems{
  max-width:var(--containerDefaultWidth);
  width:100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: start;
  align-items: start;
  margin: auto;
  gap:var(--defaultSmallPadding);
  margin-top:var(--bigMargin);
  width:max-content;
}


@media(max-width:1414px){
  .all-wrapper .wrapper .top-poems{
    width:max-content;
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

@media(max-width:700px){
  .all-wrapper .wrapper .top-poems{
    width:max-content;
    max-width: max-content;
    display: grid;
    grid-template-columns: repeat(1, 320px);
    justify-items: center; 
    align-items: start;
    margin: auto;
    gap: var(--defaultSmallPadding);
    margin-top: var(--bigMargin);
    }

    .how-wrapper .list-wrapper{
      flex-direction: column;
    }

}

.all-wrapper .error{
  min-height:60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; 
}

</style>
