<template>
  {{ YAML.dump(store.filters) }}
</template>
<script setup>
import YAML from 'js-yaml'

const store = useProductStore()
</script>
