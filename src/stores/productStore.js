import NProgress from 'nprogress'

export const useProductStore = defineStore('global-products', {
  state: () => ({
    cart: [],
    products: [],
    favorites: [],
    isLoading: false
  }),

  persist: {
    paths: ['cart']
  },

  getters: {
    cartUnitsAdded() {
      /**  sums up all units in `products._cart.units` in all cart product objects. */
      return this.cart.reduce((arg, prod) => (arg += prod._cart.units), 0)
    },

    routeQueryPage() {
      /** If the url has no page value, the 1st page is requested. */
      return Number(this.router.currentRoute.value.query.page) || 1
    }
  },

  actions: {
    setLoading() {
      return {
        start: () => {
          this.isLoading = true
          NProgress.start()
        },
        done: () => {
          this.isLoading = false
          NProgress.done()
        }
      }
    },

    productExists(id) {
      return this.cart.find((cartProduct) => cartProduct.id === id)
    },

    favoriteCartUnit(product) {
      const productExists = this.productExists(product.id)
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
      const productExists = this.productExists(product.id)

      if (productExists && productExists._cart.units > 1) {
        productExists._cart.units -= 1
        return
      }

      if (productExists) this.removeProductFromCart(productExists.id)
    },

    increaseCartUnit(product) {
      const productExists = this.productExists(product.id)

      if (!productExists) {
        product._cart.units += 1
        this.cart.push(product)
        return
      }

      productExists._cart.units += 1
    },

    getProducts(page) {
      return request({
        url: `/publicProduct.getAll?page=${page}`,
        method: 'post'
      })
    },

    async switchPaginationPage(page) {
      try {
        /**  Trigger spinners and loading state. */
        this.setLoading().start()

        /**  Get the pagintaed products from backend. */
        const products = await this.getProducts(page)

        /** becomes http://localhost:8001/?page=x */
        this.router.push({ path: '/', query: { page } })

        const paginatedProducts = products.data.result

        /**  We add the _cart object to every product */
        paginatedProducts.data = paginatedProducts.data.map((product) => {
          return { ...product, _cart: { units: 0, favorite: false } }
        })

        /**  Assign prodocts to state. */
        this.products = paginatedProducts
      } catch (e) {
        /**  Switch off spinners and loading state. */
        this.setLoading().done()
      } finally {
        /**  Switch off spinners and loading state. */
        this.setLoading().done()
      }
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
