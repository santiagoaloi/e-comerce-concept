<template>
  <VApp :theme="currentTheme">
    <!-- handles layouts only -->
    <RouterView />
  </VApp>
</template>

<script setup>
// Vuetifys theme switch
const { currentTheme } = toRefs(useAppStore())

// Sync tailwind with Vuetify
useTailwindTheme(currentTheme)
</script>
