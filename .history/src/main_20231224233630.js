import { createApp } from 'vue'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VueMasonryPlugin } from "vue-masonry";

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'

import App from './App.vue'
import router from './router'

import '@/assets/scss/main.scss'

const app = createApp(App)

app.use(
  VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(createVuetify({
  components,
  directives,
}))

app.use(VueMasonryPlugin)
app.use(router)


app.mount('#app')