import NProgress from 'nprogress'

export const useProductStore = defineStore('global-products', {
  state: () => ({
    cart: [],
    products: [],
    favorites: [],
    isLoading: false
  }),

  persist: {
    /** An array of state property names that will be persisted on 
    page refresh or when the user navigates to a different page. */
    paths: ['cart']
  },

  getters: {
    cartUnitsAdded() {
      // Sum up all units in `products._cart.units` in all cart product objects.
      return this.cart.reduce((arg, prod) => (arg += prod._cart.units), 0)
    },

    routeQueryPage() {
      // If the URL has no page value, the 1st page is requested.
      return Number(this.router.currentRoute.value.query.page) || 1
    }
  },

  actions: {
    /**
     * Returns an object with two functions that control the loading state of the app.
     * @returns {object} - An object with "start" and "done" functions to control the loading state.
     */
    setLoading() {
      // Return an object with two functions: "start" and "done"
      return {
        // The "start" function sets the isLoading flag to true and starts the NProgress spinner
        start: () => {
          this.isLoading = true
          NProgress.start()
        },
        // The "done" function sets the isLoading flag to false and stops the NProgress spinner
        done: () => {
          this.isLoading = false
          NProgress.done()
        }
      }
    },

    /**
     * Checks if a product with the specified ID exists in the cart.
     * Returns the product object if found, otherwise returns undefined.
     * @param {number} id - The ID of the product to check for.
     * @returns {object|undefined} - The product object if found, undefined otherwise.
     */
    productExists(id) {
      // Find the product with the specified ID in the cart and return it
      return this.cart.find((cartProduct) => cartProduct.id === id)
    },

    /**
     * Removes the product with the specified ID from the cart.
     * @param {number} id - The ID of the product to remove.
     */
    removeProductFromCart(id) {
      // Remove the product with the specified ID from the cart
      this.cart = this.cart.filter((product) => {
        return product.id !== id
      })
    },

    /**
     * Decreases the number of units for the specified product in the cart.
     * If the product exists in the cart and has more than 1 unit, its unit count is decreased by 1.
     * If the product exists in the cart and has only 1 unit, it is removed from the cart.
     * If the product does not exist in the cart, nothing happens.
     * @param {object} product - The product to decrease the unit count for.
     */
    decreaseCartUnit(product) {
      const productExists = this.productExists(product.id)

      if (productExists && productExists._cart.units > 1) {
        // Decrease the unit count of the existing product in the cart
        productExists._cart.units -= 1
        return
      }

      if (productExists) {
        // Remove the product from the cart if it has only 1 unit
        this.removeProductFromCart(productExists.id)
      }
    },

    /**
     * Increases the unit count of a product in the cart.
     * If the product is not already in the cart, it will be added.
     *
     * @param {Object} product - The product to add or update in the cart.
     */
    increaseCartUnit(product) {
      // Check if the product already exists in the cart
      const productExists = this.productExists(product.id)

      // If the product does not exist in the cart, add it with a unit count of 1
      if (!productExists) {
        product._cart.units += 1
        this.cart.push(product)
        return
      }

      // If the product exists in the cart, increase its unit count by 1
      productExists._cart.units += 1
    },

    /**
     * Retrieves a paginated list of products from the backend.
     * @param {number} page - The page number of the products to retrieve.
     * @returns {Promise} - A promise that resolves with the paginated list of products.
     */
    getProducts(page) {
      // Send a post request to the backend API to retrieve the paginated list of products
      return request({
        url: `/publicProduct.getAll?page=${page}`,
        method: 'post'
      })
    },

    /**
     * Switches the pagination page, fetching and displaying the paginated products from the backend.
     * @param {number} page - The page number to switch to.
     */
    async switchPaginationPage(page) {
      try {
        //Trigger spinners and loading state.
        this.setLoading().start()

        // Fetch the paginated products from the backend
        const products = await this.getProducts(page)

        // Update the URL to reflect the new page number
        this.router.push({ path: '/', query: { page } })

        // Simplify the path to the paginated products
        const paginatedProducts = products.data.result

        // Add the _cart object to every product
        paginatedProducts.data = paginatedProducts.data.map((product) => {
          return { ...product, _cart: { units: 0, favorite: false } }
        })

        // Assign the paginated products to state
        this.products = paginatedProducts
      } catch (e) {
        // Log any errors that occur during pagination.
        console.error(e)
      } finally {
        // Switch off spinners and loading state
        this.setLoading().done()
      }
    }

    // toggleFavoriteInCart(product) {
    //   const favoriteExists = this.productExists(product.id)

    //   if (favoriteExists) {
    //     favoriteExists._cart.favorite = !favoriteExists._cart.favorite
    //     return
    //   }
    // },
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
