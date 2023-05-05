<template>
  <div class="menu-wrapper">
    <GAppBarThemeSwitch />
    <!-- <GappBarFavoriteCounter /> -->
    <GappBarAddedCounter />
  </div>
</template>
<style scoped>
.menu-wrapper {
  @apply flex items-center fixed right-0 mr-5 gap-4
}
</style>
