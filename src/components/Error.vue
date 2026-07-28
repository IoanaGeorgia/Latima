<script setup lang="ts">
defineProps<{
}>()



</script>

<template>

  <div class="error">No poems available <div>𓇢𓆸</div></div>
</template>

<style scoped>

.error{
  display: flex;
  height: calc(100vh - var(--headerHeight) - var(--headerHeight) );
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.error div{
  font-size:5rem;
  color:var(--accentColor)
}

</style>
