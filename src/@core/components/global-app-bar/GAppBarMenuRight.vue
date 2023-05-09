<template>
  <div class="menu-wrapper">
    <GAppBarThemeSwitch />
    <!-- <GappBarFavoriteCounter /> -->
    <GappBarAddedCounter @click="cartDrawer = !cartDrawer" />
  </div>
</template>

<script setup>
const { cartDrawer } = toRefs(useProductStore())
</script>
<style scoped>
.menu-wrapper {
  @apply flex items-center fixed right-0 mr-10 gap-4
}
</style>
