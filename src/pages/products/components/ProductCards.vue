<template>
  <VContainer v-if="products?.length" class="top-container">
    <VCard :disabled="isLoading" border="0" class="top-card" elevation="0" flat>
      <div class="product-cards-grid">
        <template v-for="product in products" :key="product.id">
          <ProductCard
            v-if="!isLoading && products.length"
            :cart-product="productExists(product.id)"
            :price="product.price_base"
            :rating="2"
            :title="product.name"
            @add="increaseCartUnit(product)"
            @clear="removeProductFromCart(product)"
            @favorite="favoriteCartUnit(product)"
            @remove="decreaseCartUnit(product)"
          />
        </template>
        <template v-for="(_, i) in 6" :key="i">
          <ProductCardSkeleton v-if="isLoading" />
        </template>
      </div>
    </VCard>
    <VCard border="0" class="pagination-wrapper rounded-0">
      <VPagination
        v-model="currentPage"
        :disabled="isLoading"
        :length="paginatedProducts?.last_page || 1"
        :total-visible="6"
        active-color="primary"
        density="comfortable"
        variant="tonal"
      />
    </VCard>
  </VContainer>
</template>

<script setup>
const {
  isLoading,
  products: paginatedProducts,
  favoriteCartUnit,
  switchPaginationPage,
  increaseCartUnit,
  decreaseCartUnit,
  removeProductFromCart,
  productExists,
  routeQueryPage
} = makeStoreDestructurable(useProductStore())

/**  The default value of currentPage comes from the url. */
const currentPage = ref(routeQueryPage.value)

const products = computed(() => paginatedProducts.value.data)

/**  Listen to the currentPage value and call the backend */
/** requesting a specific paginated page. */
watchEffect(async () => {
  switchPaginationPage(currentPage.value)
})
</script>

<style scoped>
.top-container {
  @apply flex h-full flex-col mx-auto p-0
}
.top-card {
  @apply overflow-auto h-full bg-transparent p-5 
}
.product-cards-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3
}
.pagination-wrapper {
  @apply flex flex-col items-center bg-transparent p-2 
}
</style>
