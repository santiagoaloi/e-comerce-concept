// https://motion.vueuse.org/
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export const install = (app) => {
  app.use(Vue3Lottie, { name: 'Lottie' }) // use in template <Lottie />
}
