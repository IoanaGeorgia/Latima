import { ref} from 'vue'
import { defineStore } from 'pinia'


export interface Poem {
  id: any
  title: string
  text: string
  author:string
  main_category: string
  tags:string[]
  categories:string[]
}

export const usePoemStore = defineStore('poem', () => {
 
  const poems = ref<Poem[]>([])

  function setPoems(newPoems: Poem[]) {
    poems.value = newPoems
  }

  return {
    poems,
    setPoems
  }
})