<template>
  <VNavigationDrawer
    :rail="mainDrawerRail"
    color="drawer"
    elevation="7"
    expand-on-hover
    rail-width="55"
    width="260"
  >
    <VList nav>
      <div class="flex items-center pa-2 mb-3 justify-between">
        <RouterLink to="/">
          <VImg src="/company_logos/logo.svg" width="150">
            <template #placeholder>
              <div class="flex items-center justify-center h-full">
                <VProgressCircular color="grey-lighten-4" indeterminate />
              </div>
            </template>
          </VImg>
        </RouterLink>

        <div>
          <VIcon
            :icon="mainDrawerRail ? '$radioOff' : '$radioOn'"
            class="mt-n1 cursor-pointer"
            color="primary"
            size="small"
            @click="mainDrawerRail = !mainDrawerRail"
          />
        </div>
      </div>
      <!-- 
      <VListItem
        v-for="item in menu"
        :key="item.title"
        :prepend-icon="item.icon"
        :ripple="false"
        :title="item.title"
        :to="item.to"
        active-color="primary"
      /> -->
    </VList>
  </VNavigationDrawer>
</template>

<script setup>
const { mainDrawerRail } = toRefs(useAppStore())

const menu = [{ title: 'Products', to: '/products', icon: '$mdiShoeSneaker' }]
</script>
