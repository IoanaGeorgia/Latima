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


export const useUiStore = defineStore('ui', () => {
  const isSideMenuOpen = ref(false)
  const activePoem = ref<any>(null)

  function openMenu(poem: any) {
    activePoem.value = poem
    isSideMenuOpen.value = true
  }

  function closeMenu() {
    isSideMenuOpen.value = false
  }

  return { isSideMenuOpen, activePoem, openMenu, closeMenu }
})