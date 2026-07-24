
<script setup lang="ts">
const props = defineProps<{
  category: string
}>()
  const symbols:Record<string, string> ={
    "love":"𖹭",
    "sad":"𓁿",
    "nature":"𓋼𓍊",
    "life":"𓊝",
    "happiness":"⋆˙⟡",
    "friends":"𓀤𓀥",
    "family":"⾕"
  }


let symbol = symbols[props.category] ?? "｡˚○"

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



.symbol-wrapper div{
  font-size:50px;
    color: var(--accentColor);
  line-height: 0px;
}

</style>
