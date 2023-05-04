import NProgress from 'nprogress'

export const useProductStore = defineStore('global-products', {
  state: () => ({
    selectedProducts: [],
    products: [],
    cart: [],
    favorites: [],
    page: 1,
    loading: false
  }),

  persist: true,

  getters: {},

  actions: {
    findCartProduct(product) {
      return this.cart.find((cartProduct) => cartProduct.id === product.id)
    },

    favoriteCartUnit(product) {
      const productExists = this.cart.find((cartProduct) => cartProduct.id === product.id)
      // const favoriteExists = this.favorites.find((favoriteProduct) => cartProduct.id === product.id)

      if (productExists) {
        productExists._cart.favorite = !productExists._cart.favorite
        return
      }
    },

    removeProductFromCart(id) {
      this.cart = this.cart.filter((product) => {
        return product.id !== id
      })
    },

    decreaseCartUnit(product) {
      const productExists = this.cart.find((cartProduct) => cartProduct.id === product.id)

      if (productExists && productExists._cart.units > 1) {
        productExists._cart.units -= 1
        return
      }

      if (productExists) this.removeProductFromCart(productExists.id)
    },

    increaseCartUnit(product) {
      const productExists = this.cart.find((cartProduct) => cartProduct.id === product.id)

      if (!productExists) {
        product._cart.units += 1
        this.cart.push(product)
        return
      }

      productExists._cart.units += 1
    },

    async switchPaginationPage(page) {
      try {
        NProgress.start()
        this.loading = true

        const result = await axios.post(`/publicProduct.getAll?page=${page}`)
        const paginatedProducts = result.data.result

        paginatedProducts.data = paginatedProducts.data.map((product) => {
          return { ...product, _cart: { units: 0, favorite: false } }
        })

        this.products = paginatedProducts
      } catch (e) {
        this.loading = false
        console.log(e)
      } finally {
        this.loading = false
        NProgress.done()
      }
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
