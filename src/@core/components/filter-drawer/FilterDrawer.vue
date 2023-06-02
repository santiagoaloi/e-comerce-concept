<template>
  <VNavigationDrawer
    location="start"
    v-model="filterDrawer"
    color="drawer"
    elevation="10"
    width="280"
  >
    <template #prepend>
      <VContainer>
        <div v-for="(field, label) in filters" class="flex items-center">
          <v-select
            :label="label"
            :items="field"
            itemTitle="name"
            itemValue="id"
            v-model="selectedFilters[label]"
            multiple
          />
        </div>
        <v-btn block>Filtrar</v-btn>
      </VContainer>
    </template>
  </VNavigationDrawer>
</template>

<script setup>
const { filters, filterDrawer, selectedFilters, filterProducts, getFilterValues } =
  storeToRefsVerbose(useProductStore())

getFilterValues()
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
