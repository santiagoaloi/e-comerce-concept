import NProgress from 'nprogress'

export const useProductStore = defineStore('global-products', {
  state: () => ({
    cart: [],
    products: [],
    favorites: [],
    isLoading: false,
    drawers: {
      cartDrawer: false,
      filterDrawer: true
    },

    filters: {
      selectedFilters: {},
      filterData: []
    },

    requestOptions: {
      company_id: 6,
      results_per_page: 20
    }
  }),

  persist: {
    /** An array of state property names that will be persisted on 
    page refresh or when the user navigates to a different page. */
    paths: ['cart', 'cartDrawer']
  },

  getters: {
    cartUnitsAdded() {
      // Sum up all units in `products._cart.units` in all cart product objects.
      return this.cart.reduce((arg, prod) => (arg += prod._cart.units), 0)
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
    isInCart(id) {
      // Find the product with the specified ID in the cart and return it
      return this.cart.find((cartProduct) => cartProduct.id === id)
    },

    /**
     * Removes the product with the specified ID from the cart.
     * @param {number} id - The ID of the product to remove.
     */
    removeProductFromCart(product) {
      // Reset product cart units
      product._cart.units = 0

      // Remove the product with the specified ID from the cart
      this.cart = this.cart.filter((cartProduct) => {
        return cartProduct.id !== product.id
      })
    },

    /**
     * Decreases the number of units for the given product in the cart.
     *
     * @param {object} product - The product to be decreased in the cart.
     */
    decreaseCartUnit(product) {
      // Check if the product already exists in the cart.
      const cartProduct = this.isInCart(product.id)

      // If the cartProduct has more than one unit, decrease the number of units by 1.
      if (cartProduct?._cart?.units > 1) {
        cartProduct._cart.units -= 1
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
      const cartProduct = this.isInCart(product.id)

      // If the product does not exist in the cart, add it with a unit count of 1
      if (!cartProduct) {
        product._cart.units += 1
        this.cart.push(product)
        return
      }

      // If the product exists in the cart, increase its unit count by 1
      if (cartProduct._cart.units < 999) cartProduct._cart.units += 1
    },

    /**
     * Retrieves filter values from the backend for families, brands, and categories.
     */
    async getFilterValues() {
      const endpoints = ['/getAllCategories', '/getAllFamilies', '/getAllBrands']

      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          request([{ method: 'post', url: endpoint, data: { ...this.requestOptions } }])
        )
      )

      this.filters.filterData = Object.fromEntries(
        responses.map((r, i) => [['categories', 'families', 'brands'][i], r.result])
      )
    },

    /**
     * Handles the paginated product results by updating the state.
     * @param {object} products - The paginated product results.
     */
    paginateProductResults(products) {
      // Simplify the path to the paginated products
      const paginatedProducts = products.result

      // Add the _cart object to every product
      paginatedProducts.data = paginatedProducts.data.map((product) => ({
        ...product,
        _cart: { units: 0, favorite: false }
      }))

      // Assign the paginated products to state
      this.products = paginatedProducts
    },

    async filterProducts() {
      // Send a post request to the backend API to retrieve the filtered products
      this.paginateProductResults(
        await request([
          {
            url: `/getFilteredProducts`,
            method: 'post',
            data: { selectedFilters: this.filters.selectedFilters, ...this.requestOptions }
          }
        ])
      )
    },

    /**
     * Switches the pagination page, fetching and displaying the paginated products from the backend.
     * @param {number} page - The page number to switch to.
     */
    async switchPaginationPage(page) {
      // Trigger spinners and loading state.
      this.setLoading().start()

      try {
        this.paginateProductResults(
          await request([
            {
              url: `/publicProduct.getAll?page=${page}`,
              method: 'post',
              data: { ...this.requestOptions }
            }
          ])
        )
      } catch (e) {
        // Log any errors that occur during pagination.
        console.error(e)
      } finally {
        // Switch off spinners and loading state
        this.setLoading().done()
      }
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
