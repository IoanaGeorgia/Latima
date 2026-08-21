<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue';
import router from '@/router';
import { useUserStore } from '@/stores/poems';
defineProps<{
}>()

const isMobileOpen = ref(false)

const userStore = useUserStore()

const isRegister = computed(() => {
  return !!userStore.user?.username; 
});


const route = useRoute()

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const searchTerm = ref("")
const debouncedSearchTerm = ref<string>('')
let timeoutId: any = null


watch(route, () => {
  searchTerm.value = ""
  isMobileOpen.value = false

})


watch(searchTerm, (newVal) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    debouncedSearchTerm.value = newVal;

  }, 300)
})

const sendSearch = () => {
  if (debouncedSearchTerm) {
    router.push({
      name: 'searchPage',
      params: { term: debouncedSearchTerm.value }
    })
  }
}

const sendSearchDirect = () => {
  if (searchTerm) {
    router.push({
      name: 'searchPage',
      params: { term: searchTerm.value }
    })
  }
}




</script>

<template>

  <header>
    <div class="header-wrapper">
      <RouterLink to="/">
        <div class="logo">𓍊<span>𓋼L</span>at</div>
      </RouterLink>
      <div class="buttons desktop">
        <div class="search-wrapper">
          <input v-model.trim="searchTerm" type="text" placeholder="Type here to search"
            @keyup.enter="sendSearchDirect" maxlength="15"></input>
          <button class="search-btn" @click="sendSearch">🔍︎

          </button>
        </div>
        <RouterLink to="/add-poem"> <button class="reverse" aria-label="Add a poem" title="Add a poem">🖍</button>
        </RouterLink>
        <RouterLink v-if="!isRegister" to="/register"><button class="reverse sign-up" aria-label="Sign up"
            title="Sign up">Sign up</button></RouterLink>
        <RouterLink v-else to="/account"><button class="reverse" aria-label="Go to account"
            title="Account">𓍊𓋼𓍊</button></RouterLink>

        <RouterLink to="/poems"> <button class="reverse all-poems" aria-label="See all poems"
            title="See all poems">🕮</button></RouterLink>
      </div>

      <button class="mobileMenu" @click="toggleMobileMenu"> ≡</button>
      <div v-if="isMobileOpen" class="mobile-menu-wrapper">
        <div class="buttons">

          <RouterLink to="/add-poem"> <button class="reverse" aria-label="Add a poem" title="Add a poem">🖍</button>
          </RouterLink>
          <RouterLink v-if="!isRegister" to="/register"><button class="reverse sign-up" aria-label="Sign up"
              title="Sign up">Sign up</button></RouterLink>
          <RouterLink v-else to="/account"><button class="reverse" aria-label="Go to account"
              title="Account">𓍊𓋼𓍊</button></RouterLink>


          <RouterLink to="/poems"> <button class="reverse" aria-label="See all poems" title="See all poems">🕮</button>
          </RouterLink>
          <div class="search-wrapper">
            <input v-model.trim="searchTerm" type="text" placeholder="Type here to search"
              @keyup.enter="sendSearchDirect" maxlength="15"></input>
            <button class="search-btn" @click="sendSearch" aria-label="search" title="search">🔍︎

            </button>
          </div>
        </div>
      </div>

    </div>

  </header>



</template>

<style scoped>
header {
  width: 100%;
  padding: var(--defaultSmallPadding);
  z-index: 9999
}

header>div {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  position: fixed;
}

header .buttons {
  display: flex;
  gap: var(--defaultSmallPadding);
}

header .buttons button.sign-up {
  font-size: 16px;
  padding: 2px 15px;
  height: stretch;
}

header .logo {
  font-size: 40px;
  background-color: var(--defaultLight);
}

header .buttons button {
  padding: 2px 45px;
  font-size: 25px;
  max-width: 123px;
  width: 100%;
}

header .buttons button.search-btn {
  max-width: unset;
  width: unset;
}

header .buttons .search-wrapper button,
header .buttons button.all-poems {
  border: none;
  background-color: var(--defaultLight);
  color: var(--defaultDark);
  padding: 5px 15px;


}


header .buttons button.all-poems:hover {
  background-color: var(--defaultDark);
  color: var(--defaultLight)
}

header input {
  margin-right: 5px;
}

header button.mobileMenu {
  display: none;
}

header .mobile-menu-wrapper {
  display: none;
}

header .search-wrapper {
  display: flex;
}

header .search-wrapper input {
  max-width: 250px;
  width: 100%;
}

@media(max-width:734px) {
  header .buttons.desktop {
    display: none;
  }

  header button.mobileMenu {
    display: block;
    padding: 5px 45px;
    font-size: 25px;
  }

  header .mobile-menu-wrapper {
    display: block;
    padding: var(--defaultPagePadding);
    width: 100%;
    max-width: 300px;
    background-color: var(--defaultLight);
    position: absolute;
    top: var(--headerHeight);
    right: var(--defaultSmallPadding);
    border: 1px solid var(--defaultDark);
    border-radius: 5px;
  }

  header .mobile-menu-wrapper .buttons {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--defaultSmallPadding);

  }

}
</style>
