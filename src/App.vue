<template>
  <VApp :theme="currentTheme">
    <!-- handles layouts only -->
    <RouterView />
  </VApp>
</template>

<script setup>
// 👉 pinia appStore.currentTheme is persisted.
// 👉 currentTheme values are light / dark
// 👉 toRefs is needed so reactivity continues in destructure.

axios.defaults.baseURL = import.meta.env.VITE_BaseApiURL
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

const { currentTheme } = toRefs(useAppStore())

// 👉 Tweak to make sure the html tag background
// 👉 matches the current theme.

if (currentTheme.value === 'light') {
  document.documentElement.classList.toggle('dark') // toggle tailwind theme.
}

watchEffect(() => {
  const html = document.documentElement
  html.classList.remove('bg-light', 'bg-dark')
  html.classList.add(currentTheme.value === 'light' ? 'bg-light' : 'bg-dark')
  document.documentElement.classList.toggle('dark') // toggle tailwind theme.
})
</script>
