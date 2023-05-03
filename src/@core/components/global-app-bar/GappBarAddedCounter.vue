<template>
  <VBtn color="secondary" icon size="small">
    <VBadge :content="addedProductsCounter" color="primary">
      <VIcon icon="$mdiStoreOutline" />
    </VBadge>
  </VBtn>
</template>

<script setup>
const { addedProductsCounter } = toRefs(useProductStore())
</script>
