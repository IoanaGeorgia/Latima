<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
}>()

</script>

<template>

  <footer>
    <div class="footer-wrapper">
      <RouterLink to="/">
        °‧ 𓆝 𓆟 𓆞 ·｡
      </RouterLink>

    </div>

  </footer>



</template>

<style scoped>
.footer-wrapper{
  min-height:var(--headerHeight);
  background-color:var(--defaultDark);
  padding:var(--defaultSmallPadding);
  display: flex;
  justify-content: center;
  align-items: center;
  color:#FFF;
  font-size:3rem;
}
</style>
