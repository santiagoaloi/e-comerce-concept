<template>
  <div class="menu-wrapper">
    <GAppBarThemeSwitch />
    <!-- <GappBarFavoriteCounter /> -->
    <GappBarAddedCounter @click="drawers.cartDrawer = !drawers.cartDrawer" />
  </div>
</template>

<script setup>
const { drawers } = toRefs(useProductStore())
</script>
<style scoped>
.menu-wrapper {
  @apply flex items-center fixed right-0 mr-10 gap-4
}
</style>
