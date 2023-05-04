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
import NProgress from 'nprogress'

const page = ref(1)
const products = ref()
const loading = ref(false)

// Listen to the page value and call the backend
// requesting a specific paginated page.
watchEffect(async () => {
  switchPaginationPage(page.value)
})

async function switchPaginationPage(page) {
  try {
    NProgress.start()
    loading.value = true
    const result = await axios.post(`/publicProduct.getAll?page=${page}`)
    products.value = result.data.result
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
    NProgress.done()
  }
}
</script>

<style scoped>
.container {
  @apply flex h-full flex-col mx-auto 
}
.product-cards-grid {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3
}
</style>
