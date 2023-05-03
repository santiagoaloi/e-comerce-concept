<template>
  <VContainer>
    <div class="product-cards-container">
      <ProductCard
        v-for="product in products"
        :key="product.title"
        :avatar="product.avatar"
        :cart="product._cart"
        :description="product.description"
        :discount="product.discount"
        :discount-price="product.discountPrice"
        :favorite="product.favorite"
        :price="product.price"
        :rating="product.rating"
        :title="product.title"
        @add="addProduct(product)"
        @favorited="favorite(product)"
        @remove="removeProduct(product)"
      />
    </div>
  </VContainer>
</template>

<script setup>
const { products } = useProductStore()

function addProduct(product) {
  if (product._cart.added === 100) return

  product._cart.added += 1
}

function removeProduct(product) {
  if (!product._cart.added) return
  product._cart.added -= 1
}

function favorite(product) {
  product._cart.favorite = !product._cart.favorite
}
</script>

<style scoped>
.product-cards-container {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3
}
</style>
