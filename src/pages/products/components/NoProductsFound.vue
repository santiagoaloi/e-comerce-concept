<template>
  <div
    v-if="!products?.data?.length && !isLoading"
    class="d-flex fill-height align-center justify-center"
  >
    <NotFound
      subtitle="Posiblemente la pagina no exista o no haya ningun producto a la venta"
      title="No hay productos para mostrar"
      top="ups!"
    />
  </div>
</template>
<script setup>
const { isLoading, products } = makeStoreDestructurable(useProductStore())
</script>
