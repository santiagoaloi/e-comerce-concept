<template>
  <VApp :theme="currentTheme">
    <!-- handles layouts only -->
    <RouterView />
  </VApp>
</template>

<script setup>
const { currentTheme } = toRefs(useAppStore())
useTailwindTheme(currentTheme)
</script>
