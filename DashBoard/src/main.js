import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app
  .use(router)
  .use(pinia)

app.mount('#app')
