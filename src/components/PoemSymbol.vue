<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/poems'

const props = defineProps<{
  category: string
}>()

const categoriesStore = useCategoriesStore()

const { categories } = storeToRefs(categoriesStore)

const symbol = computed(() => {
  if (!categories.value || !Array.isArray(categories.value)) {
    return '｡˚○'
  }

  const found = categories.value.find(
    (cat) => cat.name.toLowerCase() === props.category?.toLowerCase()
  )

  return found?.symbol ?? '｡˚○'
})
</script>

<template>
  <div class="symbol-wrapper">
    <span>
      <div>
        {{ symbol }}
      </div>
    </span>
  </div>
</template>

<style scoped>
.symbol-wrapper div {
  font-size: 50px;
  color: var(--accentColor);
  line-height: 0px;
}
</style>