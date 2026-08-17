<script setup lang="ts">
import { usePoemStore, useCategoriesStore } from '@/stores/poems'
import { ref } from 'vue'
import TopRead from './TopRead.vue'
import Loader from './Loader.vue'
defineProps<{
}>()

const poemStore = usePoemStore()

const scrollToAbout = () => {
  const element = document.getElementById('about')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const categoriesStore = useCategoriesStore()

const categories = categoriesStore.categories

let poem =ref({
  title:"",
  text:"",
  tags:[] as string[],
  categories:[] as string[],
  main_category:"",
  author:"default"
})
let isOpenMain = ref(false)
let catDropdownMainValue = ref("Search value")
let isOpen = ref(false)
let catDropdownValue = ref("Search value")
let isLoading=ref(false)
let isSubmitted = ref(false)

const autoResize = (event:any) => {
  const el = event.target;
  el.style.height = 'auto'; 
  el.style.height = el.scrollHeight + 'px'; 
};

const addTags = (event:any) =>{
  if(event.target.value && event.target.value.length > 2){
    let tempSet = new Set(poem.value.tags)
    tempSet.add(event.target.value.trim())
    poem.value.tags = [...tempSet]
    event.target.value=""
  }

}

const toggleMainDropdown = () =>{
  isOpenMain.value = !isOpenMain.value

}

const selectMainCategory = (name:string | undefined) =>{
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

const deleteCat = (name:string | undefined) =>{
  if(name){
  poem.value.categories = poem.value.categories.filter(cat =>( cat !== name))

  }
}

const deleteTag = (name:string | undefined) =>{

  if(name){
  poem.value.tags = poem.value.tags.filter(tag =>( tag !== name))

  }
}

const submitForm = async () => {
  if (!poem.value.title || !poem.value.text) {
    return
  }

  isLoading.value = true

  try {
    const response = await fetch('/api/poems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(poem.value)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const result = await response.json()
    console.log('Poem saved successfully:', result.data)
    isSubmitted.value = true
  } catch (error) {
    console.error('Failed to submit poem:', error)
  } finally {
    isLoading.value = false
  }
}


function getCategorySymbol(categoryName: string){
  if (!categories.value) return ''
  const found = categories.value.find(
    (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
  )
  return found ? found.symbol : ''
}

</script>

<template>
  <div class="page-wrapper add-poem">
    <div class="title-wrapper">
      <p class="title">Make your own p<span class="reverse">oe</span>m</p>
    </div>

    <div v-if="isSubmitted">
          <Loader v-if="isLoading" />
          <div v-else class="submitted">
            <p><strong>Thank you for your submission!</strong></p>
            <p>We will review it in 3-5 working days and let you knows further ahead if there are any issues</p>
            <div>𓆏</div>
          </div>

    </div>
    <div v-else class="form-wrapper">
      <form class="container" @submit.prevent>
        <div class="input-wrapper">
          <label>Poem title:</label>
          <input type="text" v-model="poem.title" placeholder="Write the title here..." />
        </div>

          <div class="input-wrapper">
            <label>Poem body:</label>
            <textarea 
              v-model="poem.text" 
              @input="autoResize" 
              placeholder="Write here the content of your poem..." 
            />
          </div>


          <div class="input-wrapper">
          <label>Main category:</label>
          <div class="cat-dropdown">
            <p class="main-btn" @click="toggleMainDropdown"><span>{{ catDropdownMainValue}}</span>
            <div v-if="isOpenMain" class="arrow opened">〉</div>
              <div v-else class="arrow closed">〉</div>
            </p>
            <div v-if="isOpenMain" class="options">
              <div v-for="(category) in categories" :key="category.id"  @click="selectMainCategory(category.name)">
                <span>{{ category.symbol }} {{category.name}}</span>
              </div>
            </div>

          </div>
        </div>

        <div class="input-wrapper">
          <label>Categories:</label>
          <div class="cat-dropdown">
            <p class="main-btn" @click="toggleDropdown"><span>{{ catDropdownValue}}</span>
              <div v-if="isOpen" class="arrow opened">〉</div>
              <div v-else class="arrow closed">〉</div>
            </p>
            <div v-if="isOpen" class="options">
              <div  v-for="(category) in categories" :key="category.id"  @click="selectCategory(category.name)">
                <span>{{ category.symbol }} {{category.name}}</span>
              </div>
            </div>

          </div>

          <div class="categories">
            <div v-if="!poem.categories.length">No categories selected</div>
            <div class="tag" v-else v-for="(name) in poem.categories" :key="name">
                <span>{{ getCategorySymbol(name) }}{{ name }}</span>  <button class="close-tag" @click="deleteCat(name)">×</button>
              </div>
          </div>
        </div>

        <div class="input-wrapper" >
          <label>Tags (up to 10):</label>
          <input type="text" @keydown.enter.prevent="addTags" placeholder="Add tags (max 10 tags)" />
          <div class="input tags">
            <div class="tag" v-for="tag in poem.tags.slice(0, 10)" >
              #{{ tag }}  <button class="close-tag" @click="deleteTag(tag)">×</button>
            </div>
          </div>
        </div>

        <button @click="submitForm">Save</button>

      </form>
    </div>
    <TopRead></TopRead>
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
  margin-top: var(--bigMargin);
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
  border: 1px solid var(--defaultDark);
}

.form-wrapper input:focus, .form-wrapper textarea:focus{
  background-color: inherit;
  color:inherit;
}

.form-wrapper textarea{
resize: none;
  overflow-y: hidden; 
  min-height: 200px;   
  box-sizing: border-box;
  outline: none;
    padding:10px 15px;
      font-size:var(--smallFontSize);
      color: var(--defaultDark);

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

.cat-dropdown .main-btn{
  display: flex;
  justify-content: space-between;
  gap:var(--defaultSmallPadding);
  align-items: center;
  cursor: pointer;
}

.cat-dropdown .arrow.closed{
  line-height:10px;
  transform: rotate(-90deg);
}

.cat-dropdown .arrow.opened{
  line-height:10px;
  transform: rotate(90deg);
}

.categories  .tag{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 150px;
  gap:5px;
  margin-top:5px;
}


.categories .close-tag{
  background-color: transparent;
  border:none;
  padding:5px 5px;
  color:var(--defaultDark)
}

.tags  .tag{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 150px;
  width:fit-content;
  gap:2px;
  margin-top:5px;
}


.tags .close-tag{
  background-color: transparent;
  border:none;
  padding:5px 5px;
  color:var(--defaultDark);
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
        z-index:30;
}

.cat-dropdown .options span{
  display: block;
  max-width: max-content;
  margin-top:var(--defaultSmallPadding)
}


.submitted{
  min-height:855px;
   max-width:400px;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:var(--defaultPagePadding);
  text-align:center;
  margin:auto;
  padding:var(--defaultSmallPadding);
}

.submitted div{
  font-size:6rem;
  color:var(--accentColor);
}
</style>
