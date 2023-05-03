import { mochilas, zapatos } from '@/data'

export const useProductStore = defineStore('global-products', {
  state: () => ({
    products: []
  }),

  persist: true,

  getters: {
    addedProducts() {
      return this.products.filter((product) => {
        return product._cart.added
      })
    },

    favoriteProducts() {
      return this.products.filter((product) => {
        return product._cart.favorite
      })
    },

    addedProductsCounter() {
      // sum the number of units added across all selected products.
      return this.addedProducts.reduce((acc, prod) => (acc += prod._cart.added), 0)
    },

    favoriteProductsCounter() {
      // sum the number of units added across all selected products.
      return this.favoriteProducts.reduce((acc, prod) => (acc += Number(prod._cart.favorite)), 0)
    }
  },
  actions: {
    simulateProductsGet() {
      // Fetch newProducts from backend.
      const newProducts = [...mochilas, ...zapatos].map((product) => {
        // Add the _cart object to every product object.
        const _cart = {
          added: 0,
          favorite: false
        }
        return { ...product, _cart }
      })

      const mergedProducts = newProducts.map((product) => {
        // find the corresponding object in newProducts based on product id.
        const matchingProduct = this.products.find((item) => item._id === product._id)

        // merge _cart values into the resulting object.
        if (matchingProduct) {
          return { ...product, _cart: matchingProduct._cart }
        }

        // if there is no matching product,
        // just return the original product object from newProducts.
        return product
      })

      this.products = mergedProducts
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
