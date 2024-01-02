import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/util/colors'

import '@mdi/font/css/materialdesignicons.css'
const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
  }
}

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: true,
        colors: {
          primary: colors.cyan.darken4, 
          // secondary: colors.red.lighten4, 
        }
      },
    },
  },
  components,
  directives,
  icons
})