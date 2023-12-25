import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry";
const emitter = mitt()

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'
import App from './App.vue'

import router from './router'

import '@/assets/scss/main.scss'

const app = createApp(App)

app.use(createVuetify({
  components,
  directives,
}))

app.config.globalProperties.emitter = emitter
app.use(VueMasonryPlugin)
app.use(router)

app.use(
  VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.mount('#app')