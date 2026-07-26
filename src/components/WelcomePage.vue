<script setup lang="ts">
import PoemSymbol from './PoemSymbol.vue';
import { usePoemStore } from '@/stores/poems'
import { RouterLink } from 'vue-router'
import TopRead from './TopRead.vue';
defineProps<{
}>()

const poemStore = usePoemStore()

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
          Latima is a shared canvas for original verse. Whether you are looking to lose yourself in hidden verses from
          around the globe or share your own raw emotions with the world, our space is built to connect minds through
          rhythm and metaphor.
        </p>

        <div class="list-wrapper">
          <div>
            <h3>Rea<span>di</span>ng</h3>
            <ul>
              <li>
                Dive into a rich, ever-exp<span>andi</span>ng tapestry of voices spanning continents, cultures, and
                traditions. From traditional haikus and structured sonnets to raw, modern free verse, our curated
                collections bring together the finest poetic perspectives from around the globe. Every tap uncovers a
                new worldview, letting you wander through oceans of rhythm, metaphor, and shared human experience
                without ever leaving your screen.
              </li>
              <li>
                Build meaningful connections with the writers whose words speak directly to your soul. By following your
                favorite poets, you create a personalized feed where every new stanza, draft, or published piece reaches
                you the moment it’s written. Never lose track of a captivating story arc or a writer’s evolving style,
                and watch their creative journey unfold in real-time.
              </li>
              <li>
                Experience the collective heartbeat of our community by exploring what readers are currently loving.
                Discover trending poems that are sparking conversations, evoking deep emotions, and capturing the spirit
                of the moment. See which stanzas are receiving love, bookmark popular pieces for quiet moments, and join
                a vibrant global discussion built entirely around the power of language.
              </li>
            </ul>
          </div>

          <div>
            <h3>Writing</h3>
            <ul>
              <li>
                Transform your raw thoughts into beautifully formatted verse with an effortless, distraction-free
                writing environment. Our clean, modern canvas is designed to respect your visual layout—ensuring that
                every line break, stanza separation, and stylistic choice displays exactly as you envisioned. Sharing
                your voice with the world takes just seconds, leaving you free to focus entirely on the craft of
                writing.
              </li>
              <li>
                Step into an encouraging and passionate community that values the vulnerability of creative writing.
                Instead of noisy algorithms, connect with genuine poetry enthusiasts who read your work with intention.
                Receive thoughtful feedback, constructive engagement, and heartfelt enc<span>ouragement th</span>at
                inspires you to keep sharpening your pen and honing your voice.
              </li>
              <li>
                Watch your artistry grow over time with a dedicated personal repository for all your work. Organize your
                poems into custom digital chapbooks, sav<span>e private drafts for later, and refl</span>ect on past
                entries to see how your voice has evolved. Your profile becomes an elegant, living portfolio—a lasting
                archive of every emotion, story, and stanza you’ve given to the world.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <TopRead></TopRead>


    <div class="community-wrapper">
      <div class="wrapper">
        <div class="texts">
          <p class="title">A com<span class="reverse">munit</span>y</p>
          <p>People all over the world can submit poems and hace access to others.</p>
          <p>This is a place to connect and show people what they feel has been felt by people all over the world, for
            ages.</p>
          <RouterLink to="/add-poem">
            <button class="reverse">Write a poem</button>
          </RouterLink>
        </div>
        <div class="decoration">⋆˙⟡</div>
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
  width: 100%;
  height: 100%;

}



.about-wrapper {
  min-height: 500px;
  background-color: var(--defaultDark);
  color: var(--defaultLight);
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-wrapper .wrapper {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  color: var(--defaultLight);
  gap: var(--defaultSmallPadding);
}

@media(max-width:560px) {
  .about-wrapper .wrapper {
    flex-direction: column;
  }
}

.about-wrapper .wrapper .texts {
  max-width: 800px;
  width: 100%;
}

.how-wrapper {
  background-color: #FFF;
}

.how-wrapper .wrapper>p {
  max-width: var(--textsSmallDiv);
  width: 100%;
  text-align: center;
}


.how-wrapper .wrapper {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  gap: var(--defaultSmallPadding);
  padding: var(--defaultPagePadding)
}

.how-wrapper .list-wrapper {
  width: 100%;
  max-width: var(--textsSmallDiv);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  gap: var(--defaultSmallPadding);
  margin-top: var(--defaultMargin);
  padding-top: var(--defaultPagePadding);
}


.community-wrapper {
  min-height: 500px;
  background-color: var(--defaultDark);
  color: var(--defaultLight);
  display: flex;
  justify-content: center;
  align-items: center;
}

.community-wrapper .wrapper {
  max-width: var(--containerDefaultWidth);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  color: var(--defaultLight);
  gap: var(--defaultSmallPadding);
}

.community-wrapper button {
  margin-top: var(--defaultSmallPadding);
}

@media(max-width:1045px) {
  .community-wrapper .wrapper {
    flex-direction: column;
    text-align: center;
  }
}

.community-wrapper .wrapper .texts {
  max-width: 800px;
  width: 100%;
}
</style>
