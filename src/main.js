import { createApp } from 'vue'
import { createPinia } from 'pinia'

import createVuetify from '@/plugins/vuetify'

import { VueMasonryPlugin } from "vue-masonry";

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'

import App from './App.vue'
import router from './router'

import '@/assets/scss/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(
  VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(createVuetify)

app.use(pinia)
app.use(VueMasonryPlugin)
app.use(router)

app.mount('#app')