<template>
  <VContainer>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        v-for="camiseta in camisetas"
        :key="camiseta.title"
        :avatar="camiseta.avatar"
        :description="camiseta.description"
        :discount="camiseta.discount"
        :discount-price="camiseta.discountPrice"
        :price="camiseta.price"
        :rating="camiseta.rating"
        :title="camiseta.title"
      />
    </div>
  </VContainer>
</template>

<script setup>
import { camisetas } from './data/camisetas'
</script>
