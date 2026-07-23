<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WelcomePage from './components/WelcomePage.vue';
</script>

<template>

   <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink> -->
  <div>
  <RouterView />
  </div>
</template>

<style scoped>

</style>
