<template>
  <VBtn color="secondary" icon size="small">
    <VBadge :content="cartProducsCounter" color="error">
      <VIcon icon="$mdiStoreOutline" />
    </VBadge>
  </VBtn>
</template>

<script setup>
const { cartProducsCounter } = toRefs(useProductStore())
</script>
