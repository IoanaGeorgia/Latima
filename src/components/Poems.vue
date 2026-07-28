
<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import Poem from './Poem.vue';
import { useUiStore } from '@/stores/poems';
import { onMounted, onUnmounted, ref } from 'vue';
import Loader from './Loader.vue';
import Error from './Error.vue';

defineProps<{
}>()

export interface Poem {
  id: any
  title: string
  text: string
  author:string
  main_category: string
  tags:string[]
  categories:string[]
}

const uiStore = useUiStore();

 const poemStore = usePoemStore()

let poems = ref<Poem[]>([]);

let isLoading = ref(false)

onMounted(()=>{
  isLoading.value = true
setTimeout(()=>{
  poems.value = poemStore.poems
  isLoading.value = false
}, 2000)
})



onUnmounted(()=>{
  uiStore.closeMenu()
})

</script>

<template>
  <div class="page-wrapper">

  
    
<div class="all-wrapper">
  <Loader v-if="isLoading" />
    <div  v-else class="wrapper">
    <div v-if="poems && poems.length" class="top-poems">
      <Poem v-for="poem in poems" :poem="poem"></Poem>
    </div>
    <Error v-else />
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
    width:100%;
    max-width: max-content;
    display: flex;
    flex-direction: column;
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
