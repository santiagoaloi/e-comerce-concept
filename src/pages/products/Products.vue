<template>
  <div class="top-container">
    <VCard
      :disabled="loading"
      border="0"
      class="overflow-auto h-full bg-transparent p-5 no-scrollbar"
      elevation="0"
      flat
    >
      <div class="product-cards-grid">
        <ProductCard
          v-for="product in products?.data"
          :key="product.id"
          :cart-product="productExists(product.id)"
          :price="product.price_base"
          :rating="2"
          :title="product.name"
          @add="increaseCartUnit(product)"
          @clear="removeProductFromCart(product.id)"
          @favorite="favoriteCartUnit(product)"
          @remove="decreaseCartUnit(product)"
        />
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
  loading,
  products,
  favoriteCartUnit,
  switchPaginationPage,
  increaseCartUnit,
  decreaseCartUnit,
  removeProductFromCart,
  productExists,
  routeQueryPage
} = makeStoreDestructurable(useProductStore())

// Listen to the page value and call the backend
// requesting a specific paginated page.

const currentPage = ref(routeQueryPage.value)

watchEffect(async () => {
  switchPaginationPage(currentPage.value)
})
</script>

<style scoped>
.top-container {
  @apply flex h-full flex-col mx-auto 
}
.product-cards-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3
}
</style>
