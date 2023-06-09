import { createVuetify } from 'vuetify'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

// Default configurations
import { defaultsCustom, defaultsNative, theme, icons, aliases } from '@/config/vuetify'

// Dont import @/@core/scss/vuetify/_variables.scss
// as it is imported by vuetify plugin in vite.config.js
import '@/@core/scss/vuetify/index.scss'

// Icons
import { aliases as iconAliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'

export const install = (app) => {
  const vuetify = createVuetify({
    components: {
      VSkeletonLoader
    },
    defaults: {
      ...defaultsCustom,
      ...defaultsNative
    },
    icons: {
      defaultSet: 'mdiSvg',
      aliases: {
        ...icons,
        ...iconAliases
      },

      sets: {
        mdiSvg
      }
    },
    theme,
    aliases
  })

  app.use(vuetify)
}
