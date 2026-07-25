<script setup lang="ts">
import PoemSymbol from './PoemSymbol.vue';
import { usePoemStore } from '@/stores/poems'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
defineProps<{
}>()

const poemStore = usePoemStore()

const scrollToAbout = () => {
  const element = document.getElementById('about')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const symbols:Record<string, string> ={
    "love":"𖹭",
    "sad":"𓁿",
    "nature":"𓋼𓍊",
    "life":"𓊝",
    "happiness":"⋆˙⟡",
    "friends":"𓀤𓀥",
    "family":"⾕"
  }


let poem =ref({
  title:"",
  text:"",
  tags:['cat', 'dog', 'cat', 'dog','cat', 'dog','cat', 'dog'] as string[],
  categories:[] as string[],
  main_category:"",
  author:"default"
})
let isOpenMain = ref(false)
let catDropdownMainValue = ref("Search value")
let isOpen = ref(false)
let catDropdownValue = ref("Search value")

const autoResize = (event:any) => {
  const el = event.target;
  el.style.height = 'auto'; 
  el.style.height = el.scrollHeight + 'px'; 
};

const addTags = (event:any) =>{
  if(event.target.value && event.target.value.length > 2){
    poem.value.tags.push(event.target.value.trim());
    event.target.value=""
  }

}

const toggleMainDropdown = () =>{
  isOpenMain.value = !isOpenMain.value

}

const selectMainCategory = (name:string | undefined) =>{
  console.log('here')

  if(name){

    catDropdownMainValue.value = name
    poem.value.main_category = name
    isOpenMain.value =false
  }


}


const toggleDropdown = () =>{
  isOpen.value = !isOpen.value

}

const selectCategory = (name:string | undefined) =>{

  if(name){

    catDropdownValue.value = name

    let tempSet =  new Set(poem.value.categories)

    tempSet.add(name)
    poem.value.categories = [...tempSet]
    isOpen.value =false
  }


}

</script>

<template>
  <div class="page-wrapper add-poem">
    <div class="title-wrapper">
      <p class="title">Make your own p<span class="reverse">oe</span>m</p>
    </div>

    <div class="form-wrapper">
      <form class="container" @submit.prevent>
        <div class="input-wrapper">
          <label>Poem title:</label>
          <input type="text" v-model="poem.title" />
        </div>

        <div class="input-wrapper" @input="autoResize">
          <label>Poem body:</label>
          <textarea />
        </div>


          <div class="input-wrapper">
          <label>Main category:</label>
          <div class="cat-dropdown">
            <p @click="toggleMainDropdown"><span>{{ catDropdownMainValue}}</span></p>
            <div v-if="isOpenMain" class="options">
              <div v-for="(symbol, name) in symbols" :key="name"  @click="selectMainCategory(name)">
                <span>{{ symbol }}{{ name }}</span>
              </div>
            </div>

          </div>
        </div>

        <div class="input-wrapper">
          <label>Categories:</label>
          <div class="cat-dropdown">
            <p @click="toggleDropdown"><span>{{ catDropdownValue}}</span></p>
            <div v-if="isOpen" class="options">
              <div v-for="(symbol, name) in symbols" :key="name"  @click="selectCategory(name)">
                <span>{{ symbol }}{{ name }}</span>
              </div>
            </div>

          </div>

          <div class="categories">
            <div v-if="!poem.categories.length">No categories selected</div>
            <div v-else v-for="(name) in poem.categories" :key="name">
                <span>{{ symbols[name] }}{{ name }}</span>
              </div>
          </div>
        </div>

        <div class="input-wrapper" >
          <label>Tags (up to 10):</label>
          <input type="text" @keydown.enter.prevent="addTags" />
          <div class="input tags">
            <div class="tag" v-for="tag in poem.tags.slice(0, 10)" >
              #{{ tag }}
            </div>
          </div>
        </div>

        <button>Save</button>

      </form>
    </div>
  </div>
</template>

<style scoped>
.add-poem .title-wrapper {
  background-color: var(--defaultDark);
  color: var(--defaultLight);
  min-height: 40vh;
  padding: var(--defaultPagePadding);
  text-align: center;
  padding-top: var(--headerHeight);
  display: flex;
  justify-content: center;
  align-items: center;

}

.form-wrapper{
  padding:var(--defaultPagePadding);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-wrapper form.container{
  max-width:800px;
  width:100%;
  padding:var(--defaultPagePadding);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:var(--defaultPagePadding)
}

.form-wrapper .input-wrapper{
    display: flex;
  flex-direction: column;
  gap:var(--defaultSmallPadding);
  width:100%;
}

.form-wrapper input, .form-wrapper textarea{
  border-radius: 7px;
}

.form-wrapper input:focus, .form-wrapper textarea:focus{
  background-color: inherit;
  color:inherit;
  border: 1px solid var(--defaultDark);
}

.form-wrapper textarea{
resize: none;
  overflow-y: hidden; 
  min-height: 100px;   
  box-sizing: border-box;
  outline: none;
    padding:10px 15px;

}

.tags{
  width:100%;
  display: flex;
  gap:var(--defaultSmallPadding);
  justify-content: flex-start;
  align-items: center;
  margin-top:-10px;
}

.cat-dropdown{
  position: relative;
   border:1px solid var(--defaultDark);
  border-radius: 10px;
  padding:5px 15px;
  width:100%;
  max-width:150px;

}

.cat-dropdown .options{
     border:1px solid var(--defaultDark);
       margin-top:var(--defaultSmallPadding);
        padding-bottom:var(--defaultSmallPadding);
        position: absolute;
        left:0px;
        right:0px;
        top:30px;
        background-color: var(--defaultLight);
        height:fit-content;
        padding:var(--defaultSmallPadding);
        padding-top:0px;
        border-radius: 6px;
}

.cat-dropdown .options span{
  display: block;
  max-width: max-content;
  margin-top:var(--defaultSmallPadding)
}

</style>
