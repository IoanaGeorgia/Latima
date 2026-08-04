import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';

const app = createApp(App)

app.use(VueMasonryPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
