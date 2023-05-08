<template>
  <div class="top-container">
    <VCard :disabled="isLoading" border="0" class="top-card no-scrollbar" elevation="0" flat>
      <div class="product-cards-grid">
        <template v-for="product in products?.data" :key="product.id">
          <ProductCard
            v-if="!isLoading"
            :cart-product="productExists(product.id)"
            :price="product.price_base"
            :rating="2"
            :title="product.name"
            @add="increaseCartUnit(product)"
            @clear="removeProductFromCart(product.id)"
            @favorite="favoriteCartUnit(product)"
            @remove="decreaseCartUnit(product)"
          />
        </template>
        <template v-for="(skeleton, i) in 6" :key="i">
          <ProductCardSkeleton v-if="isLoading" />
        </template>
      </div>
    </VCard>
    <VCard border="t" class="d-flex flex-col justify-center bg-transparent">
      <VPagination
        v-model="currentPage"
        :length="products?.last_page || 1"
        :total-visible="4"
        active-color="primary"
        density="comfortable"
        variant="tonal"
      />
    </VCard>
  </div>
</template>

<script setup>
import { makeStoreDestructurable } from 'pinia-make-destructurable'
const {
  isLoading,
  products,
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

/**  Listen to the currentPage value and call the backend */
/** requesting a specific paginated page. */

watchEffect(async () => {
  switchPaginationPage(currentPage.value)
})
</script>

<style scoped>
.top-container {
  @apply flex h-full flex-col mx-auto 
}
.top-card {
  @apply overflow-auto h-full bg-transparent p-5 
}
.product-cards-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3
}
</style>
