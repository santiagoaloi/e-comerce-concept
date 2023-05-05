<template>
  <VBtn color="secondary" icon size="small">
    <CounterBadge :content="cartUnitsAdded" color="primary">
      <VIcon icon="$mdiStoreOutline" />
    </CounterBadge>
  </VBtn>
</template>

<script setup>
const { cartUnitsAdded } = toRefs(useProductStore())
</script>
