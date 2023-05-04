<template>
  <div class="container">
    <VCard :disabled="loading" class="overflow-auto h-full bg-transparent p-5" elevation="0" flat>
      <div class="product-cards-grid">
        <ProductCard
          v-for="product in products?.data"
          :key="product.id"
          :price="product.price_base"
          :rating="2"
          :title="product.name"
        />
      </div>
    </VCard>
    <VCard class="d-flex flex-col justify-center">
      <VPagination
        v-model="page"
        :length="15"
        :total-visible="4"
        active-color="primary"
        density="comfortable"
        variant="tonal"
      />
    </VCard>
  </div>
</template>

<script setup>
const page = ref(1)
const products = ref()

const initialUrl = '/publicProduct.getAll'

const loading = ref(false)

watchEffect(async () => {
  try {
    const result = await axios.post(products.value?.links[page.value].url || initialUrl)
    products.value = result.data.result
  } catch (e) {
    console.log(e)
  }
})
</script>

<style scoped>
.container {
  @apply flex h-full flex-col mx-auto 
}
.product-cards-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3
}
</style>
