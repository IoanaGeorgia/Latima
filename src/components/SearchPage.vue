
<script setup lang="ts">
import { usePoemStore } from '@/stores/poems'
import Poem from './Poem.vue';
import { useUiStore } from '@/stores/poems';
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';



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
const route = useRoute()
const searchTerm = computed(() => {
  const term = route.params?.term;
  return typeof term === 'string' ? term : '';
});

const searchedPoems = reactive<Poem[]>([])

onUnmounted(()=>{
  uiStore.closeMenu()
})

onMounted(()=>{
  searchTermFunc()

})


const searchTermFunc = () =>{
  if(searchTerm.value && typeof searchTerm.value === "string"){
      for(let poem of poemStore.poems){
        if(poem.tags){ 
          let tagHasQuery = poem.tags.find(tag =>(tag.toLowerCase().includes(searchTerm.value.toLowerCase())))
            if(tagHasQuery){
              searchedPoems.push(poem)
             
            }
        }
        
      }

      
  }
}


watch(
  () => route.params.term,
  () => {
    searchedPoems.length = 0; 
    searchTermFunc();       
  }
);


</script>

<template>
  <div class="page-wrapper">
    
<div class="all-wrapper">
    <div v-if="searchTerm" class="wrapper">
    <div v-if="searchedPoems.length " class="top-poems">
      <Poem v-for="poem in searchedPoems" :poem="poem"></Poem>
    </div>
    <div v-else class="error">No poems available</div>
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
