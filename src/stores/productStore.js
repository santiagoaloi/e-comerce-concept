export const useProductStore = defineStore('global-products', {
  state: () => ({
    selectedProducts: [],
    products: []
  }),

  persist: {
    paths: ['selectedProducts']
  },

  getters: {},

  actions: {
    async getProducts() {
      try {
        const result = await axios.post('/publicProduct.getAll')
        this.products = result.data.result
      } catch (e) {
        console.log(e)
      }
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
