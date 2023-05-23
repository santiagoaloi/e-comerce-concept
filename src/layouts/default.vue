<template>
  <div>
    <GSnackbar />
    <CartDrawer />
    <FilterDrawer />
    <GAppBar />
    <VMain scrollable>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <VFadeTransition hide-on-leave>
            <Component :is="Component" />
          </VFadeTransition>
        </template>
      </RouterView>
    </VMain>
  </div>
</template>
