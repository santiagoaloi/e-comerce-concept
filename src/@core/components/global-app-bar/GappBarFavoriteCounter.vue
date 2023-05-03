<template>
  <VBtn color="secondary" icon size="small">
    <VBadge :content="favoriteProductsCounter" color="primary">
      <VIcon icon="$mdiHeart" />
    </VBadge>
  </VBtn>
</template>

<script setup>
const { favoriteProductsCounter } = toRefs(useProductStore())
</script>
