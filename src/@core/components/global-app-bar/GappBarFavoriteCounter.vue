<template>
  <VBtn color="secondary" icon size="small">
    <CounterBadge :content="favoriteProductsCounter" color="primary">
      <VIcon icon="$mdiHeart" />
    </CounterBadge>
  </VBtn>
</template>

<script setup>
const { favoriteProductsCounter } = toRefs(useProductStore())
</script>
