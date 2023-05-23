<template>
  <VNavigationDrawer
    location="end"
    v-model="filterDrawer"
    color="drawer"
    elevation="10"
    width="360"
  >
    <template #prepend>
      <div class="flex items-center border-b py-2">
        <v-select
          @update:modelValue="filterProducts"
          :items="[{ category: 'telefonos', id: 14 }]"
          itemTitle="category"
          itemValue="id"
          v-model="selectedFilter"
        />
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup>
const { filterDrawer, selectedFilter, filterProducts } = makeStoreDestructurable(useProductStore())
</script>

<style scoped>
:deep .unit-field .v-field__input {
  text-align: center
}

.logo {
  background-image: var(--v-logo);
  width: 120px;
  height: 40px;
  background-size: contain;
}

  .active-push-down {
    @apply cursor-pointer shadow-md duration-500 active:translate-y-[1.2px] active:shadow-sm active:duration-500;
  }
</style>
