<script setup lang="ts">
defineProps<{
}>()



</script>

<template>

      <div class="loader">
        <div class="loading-wrapper">
          <div>𓍊</div>
          <div>𓋼</div>
          <div>𓍊</div>
          <div>𖡼</div>
          <div>.</div>
          <div>𖤣</div>
          <div>𖥧</div>
          <div>𖡼</div>
          <div>.</div>
          <div>𖤣</div>
          <div>𖥧</div>
          <div>𓋼</div>
          <div>𓍊</div>
          <div>𓋼</div>
        </div>
      </div>
</template>

<style scoped>
.loader{
  min-height:100vh;
  display:flex;
  justify-content: center;
  align-items: center;
}


.loader .loading-wrapper{
  line-height: 1;
  font-sIze:2rem;
  color:var(--accentColor);
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.loader .loading-wrapper div{
  animation: loading-grow 2s infinite linear;
  display: block;

}

.loader .loading-wrapper div:nth-child(1)  { animation-delay: 0ms; }
.loader .loading-wrapper div:nth-child(2)  { animation-delay: 100ms; }
.loader .loading-wrapper div:nth-child(3)  { animation-delay: 200ms; }
.loader .loading-wrapper div:nth-child(4)  { animation-delay: 300ms; }
.loader .loading-wrapper div:nth-child(5)  { animation-delay: 400ms; }
.loader .loading-wrapper div:nth-child(6)  { animation-delay: 500ms; }
.loader .loading-wrapper div:nth-child(7)  { animation-delay: 600ms; }
.loader .loading-wrapper div:nth-child(8)  { animation-delay: 700ms; }
.loader .loading-wrapper div:nth-child(9)  { animation-delay: 800ms; }
.loader .loading-wrapper div:nth-child(10) { animation-delay: 900ms; }
.loader .loading-wrapper div:nth-child(11) { animation-delay: 1000ms; }
.loader .loading-wrapper div:nth-child(12) { animation-delay: 1100ms; }
.loader .loading-wrapper div:nth-child(13) { animation-delay: 1200ms; }
.loader .loading-wrapper div:nth-child(14) { animation-delay: 1300ms; }




@keyframes loading-grow{

  0%{
    transform: translateY(0px);
  }

   50%{
    transform: translateY(-40px);
  }

    100%{
    transform: translateY(0px);
  }
  
}

</style>
