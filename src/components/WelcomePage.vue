<script setup lang="ts">
defineProps<{

}>()

const scrollToAbout = () => {
  const element = document.getElementById('about')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="welcome-wrapper">
      <p>Welcome to l<span>ati</span>ma</p>
      <button @click="scrollToAbout">Learn more</button>
    </div>

    <div id="about" class="about-wrapper">
     <div class="wrapper">
      <div class="texts">
        <p class="title">P<span class="reverse">oe</span>ms</p>
        <p>A place for poem lovers to discover other poems or read poems from all over the world</p>
      </div>
      <div class="decoration">🖋</div>
     </div>
    </div>

<div class="how-wrapper">
  <div class="wrapper">
    <p class="title">
      How it <span>wor</span>ks
    </p>

    <p class="subtitle-text">
      Latima is a shared canvas for original verse. Whether you are looking to lose yourself in hidden verses from around the globe or share your own raw emotions with the world, our space is built to connect minds through rhythm and metaphor.
    </p>

    <div class="list-wrapper">
      <div>
        <h3>Rea<span>di</span>ng</h3>
        <ul>
          <li>Explore curated collections from authors around the globe</li>
          <li>Follow your favou<span>rite</span> poets and never miss a new stanza</li>
          <li>Uncover trending verses and see what <span>res</span>onates with the community</li>
        </ul>
      </div>

      <div>
        <h3>Writing</h3>
        <ul>
          <li>Publish your own poetry instantly in a clean, modern canvas</li>
          <li>Receive authentic feed<span>ba</span>ck and love from real readers</li>
          <li>Build your personal ar<span>chiv</span>e and track your journey as a writer</li>
        </ul>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<style scoped>
.welcome-wrapper p {
  font-size: 10vw;
  text-align: center;
}

.welcome-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  width:100%;
  height: 100%;

}



.about-wrapper{
  min-height: 500px;
  background-color: var(--defaultDark);
  color:var(--defaultLight);
   display: flex;
  justify-content:  center;
  align-items: center;
}

.about-wrapper .wrapper{
  max-width:var(--containerDefaultWidth);
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  color:var(--defaultLight);
  gap:var(--defaultSmallPadding);
}

.about-wrapper .wrapper .texts{
  max-width:800px;
  width:100%;
}

.how-wrapper .wrapper > p{
  max-width: var(--textsSmallDiv);
  width:100%;
  text-align: center;
}


.how-wrapper .wrapper{
  max-width:var(--containerDefaultWidth);
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  gap:var(--defaultSmallPadding);
  padding:  var(  --defaultPagePadding)
}
.how-wrapper .list-wrapper{
  width:100%;
  max-width: var(--textsSmallDiv);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  gap:var(--defaultSmallPadding);
  margin-top:var(--defaultMargin);
    padding-top:  var(  --defaultPagePadding);
}


</style>
