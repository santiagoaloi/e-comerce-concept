<template>
  <VBtn color="secondary" icon size="small">
    <CounterBadge :content="addedProductsCounter" color="primary">
      <VIcon icon="$mdiStoreOutline" />
    </CounterBadge>
  </VBtn>
</template>

<script setup>
const { addedProductsCounter } = toRefs(useProductStore())
</script>
