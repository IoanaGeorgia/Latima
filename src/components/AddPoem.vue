<script setup lang="ts">
import { usePoemStore, useCategoriesStore } from '@/stores/poems'
import { ref, reactive } from 'vue'
import TopRead from './TopRead.vue'
import Loader from './Loader.vue'

defineProps<{}>()

const categoriesStore = useCategoriesStore()
const categories = categoriesStore.categories


let poem = ref({
  title: '',
  text: '',
  tags: [] as string[],
  categories: [] as string[],
  main_category: '',
  author: 'default'
})

let isOpenMain = ref(false)
let catDropdownMainValue = ref('Select main category')
let isOpen = ref(false)
let catDropdownValue = ref('Select categories')
let isLoading = ref(false)
let isSubmitted = ref(false)

const errors = reactive({
  title: '',
  text: '',
  main_category: '',
  categories: '',
  tags: '',
  submit: ''
})

const clearErrors = () => {
  errors.title = ''
  errors.text = ''
  errors.main_category = ''
  errors.categories = ''
  errors.tags = ''
  errors.submit = ''
}

const validateForm = (): boolean => {
  clearErrors()
  let isValid = true

  if (!poem.value.title.trim()) {
    errors.title = 'Title is required.'
    isValid = false
  }

  if (!poem.value.text.trim()) {
    errors.text = 'Poem body cannot be empty.'
    isValid = false
  }

  if (!poem.value.main_category) {
    errors.main_category = 'Please select a main category.'
    isValid = false
  }

  if (poem.value.categories.length === 0) {
    errors.categories = 'Select at least one category.'
    isValid = false
  }

  if (poem.value.tags.length === 0) {
    errors.tags = 'Please add at least one tag.'
    isValid = false
  }

  return isValid
}

const autoResize = (event: any) => {
  const el = event.target
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

const addTags = (event: any) => {
  const val = event.target.value.trim()
  if (val && val.length > 2) {
    if (poem.value.tags.length >= 10) {
      errors.tags = 'Maximum of 10 tags allowed.'
      return
    }
    let tempSet = new Set(poem.value.tags)
    tempSet.add(val)
    poem.value.tags = [...tempSet]
    event.target.value = ''
    errors.tags = '' 
  }
}

const toggleMainDropdown = () => {
  isOpenMain.value = !isOpenMain.value
}

const selectMainCategory = (name: string | undefined) => {
  if (name) {
    catDropdownMainValue.value = name
    poem.value.main_category = name
    isOpenMain.value = false
    errors.main_category = ''
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectCategory = (name: string | undefined) => {
  if (name) {
    catDropdownValue.value = name
    let tempSet = new Set(poem.value.categories)
    tempSet.add(name)
    poem.value.categories = [...tempSet]
    isOpen.value = false
    errors.categories = ''
  }
}

const deleteCat = (name: string | undefined) => {
  if (name) {
    poem.value.categories = poem.value.categories.filter((cat) => cat !== name)
  }
}

const deleteTag = (name: string | undefined) => {
  if (name) {
    poem.value.tags = poem.value.tags.filter((tag) => tag !== name)
  }
}

const submitForm = async () => {
  if (!validateForm()) {
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
    errors.submit = 'Something went wrong submitting your poem. Please try again.'
  } finally {
    isLoading.value = false
  }
}

function getCategorySymbol(categoryName: string) {
  if (!categories?.value) return ''
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
        <p>We will review it in 3-5 working days and let you know further ahead if there are any issues.</p>
        <div>𓆏</div>
      </div>
    </div>

    <div v-else class="form-wrapper">
      <form class="container" @submit.prevent="submitForm">
        
        <div v-if="errors.submit" class="error-msg global-error">
          {{ errors.submit }}
        </div>

        <div class="input-wrapper">
          <label>Poem title:</label>
          <input
            type="text"
            v-model="poem.title"
            :class="{ 'has-error': errors.title }"
            placeholder="Write the title here..."
          />
          <p v-if="errors.title" class="error-msg">{{ errors.title }}</p>
        </div>

        <div class="input-wrapper">
          <label>Poem body: </label>
          <textarea
            v-model="poem.text"
            @input="autoResize"
            :class="{ 'has-error': errors.text }"
            placeholder="Write here the content of your poem..."
          />
          <p v-if="errors.text" class="error-msg">{{ errors.text }}</p>
        </div>

        <div class="input-wrapper">
          <label>Main category:</label>
          <div class="cat-dropdown" :class="{ 'has-error': errors.main_category }">
            <p class="main-btn" @click="toggleMainDropdown">
              <span>{{ catDropdownMainValue }}</span>
              <div v-if="isOpenMain" class="arrow opened">〉</div>
              <div v-else class="arrow closed">〉</div>
            </p>
            <div v-if="isOpenMain" class="options">
              <div
                v-for="category in categories"
                :key="category.id"
                @click="selectMainCategory(category.name)"
              >
                <span>{{ category.symbol }} {{ category.name }}</span>
              </div>
            </div>
          </div>
          <p v-if="errors.main_category" class="error-msg">{{ errors.main_category }}</p>
        </div>

        <div class="input-wrapper">
          <label>Categories (at least 1): </label>
          <div class="cat-dropdown" :class="{ 'has-error': errors.categories }">
            <p class="main-btn" @click="toggleDropdown">
              <span>{{ catDropdownValue }}</span>
              <div v-if="isOpen" class="arrow opened">〉</div>
              <div v-else class="arrow closed">〉</div>
            </p>
            <div v-if="isOpen" class="options">
              <div
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category.name)"
              >
                <span>{{ category.symbol }} {{ category.name }}</span>
              </div>
            </div>
          </div>

          <div class="categories">
            <div v-if="!poem.categories.length" class="empty-hint">No categories selected</div>
            <div class="tag" v-else v-for="name in poem.categories" :key="name">
              <span>{{ getCategorySymbol(name) }}{{ name }}</span>
              <button type="button" class="close-tag" @click="deleteCat(name)">×</button>
            </div>
          </div>
          <p v-if="errors.categories" class="error-msg">{{ errors.categories }}</p>
        </div>

        <div class="input-wrapper">
          <label>Tags (1 to 10 required): </label>
          <input
            type="text"
            @keydown.enter.prevent="addTags"
            :class="{ 'has-error': errors.tags }"
            placeholder="Type tag and press Enter"
          />
          <div  v-if="poem.tags.length > 0" class="input tags">
            <div class="tag" v-for="tag in poem.tags.slice(0, 10)" :key="tag">
              #{{ tag }}
              <button type="button" class="close-tag" @click="deleteTag(tag)">×</button>
            </div>
          </div>
          <p v-if="errors.tags" class="error-msg">{{ errors.tags }}</p>
        </div>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Saving...' : 'Save' }}
        </button>
      </form>
    </div>
    <TopRead />
  </div>
</template>
