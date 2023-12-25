import { createApp } from 'vue'
import {vuetify} from 'vuetify'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'
import App from './App.vue'

import router from './router'

import '@/assets/scss/main.scss'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(
  VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.mount('#app')