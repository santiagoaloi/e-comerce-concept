import { mochilas, zapatos } from '@/data'

export const useProductStore = defineStore('global-products', {
  state: () => ({
    products: [...mochilas, ...zapatos].map((product) => {
      const _cart = {
        added: 0,
        favorited: false
      }
      return { ...product, _cart }
    })
  }),

  // persist: true,

  getters: {
    cartProducts() {
      return this.products.filter((product) => {
        return product._cart.added
      })
    },

    cartProducsCounter() {
      return this.cartProducts.reduce((acc, prod) => (acc += prod._cart.added), 0)
    }
  },

  actions: {}
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
