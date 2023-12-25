import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'
import App from './App.vue'

import router from './router'

import './index.css'

const app = createApp(App)

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