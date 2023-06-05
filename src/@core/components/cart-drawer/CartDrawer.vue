<template>
  <VNavigationDrawer
    location="end"
    v-model="drawers.cartDrawer"
    color="drawer"
    elevation="10"
    width="360"
  >
    <template #prepend>
      <div class="flex items-center border-b py-2">
        <div class="flex items-center py-2 pl-4 justify-between">
          <VImg class="logo" />
        </div>
        <VSpacer />
        <div class="mr-4">
          <VBtn icon="$close" size="small" variant="text" @mousedown="drawers.cartDrawer = false" />
        </div>
      </div>
    </template>

    <template v-for="(product, i) in cart" :key="i">
      <VCard
        v-if="cart.length"
        :class="{ 'active-push-down': clicked }"
        :ripple="false"
        class="my-2 mx-3 px-2 border"
        link
        @mousedown="clicked = true"
        @mouseup="clicked = false"
      >
        <div v-motion-pop>
          <div class="flex flex-no-wrap">
            <VAvatar class="mx-2 mt-3" rounded="0" size="115">
              <VImg src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></VImg>
            </VAvatar>
            <div class="flex flex-col gap-1">
              <div class="mt-3">Martillo multicolor de madera dura press and tag and stick</div>
              <small>Ellie Goulding</small>
              <small class="text-green">$500</small>
            </div>
          </div>
          <div class="flex justify-between py-1">
            <VRow class="align-center pl-2">
              <VCol cols="5">
                <QuantitySelector
                  v-model="product._cart.units"
                  :max="999"
                  @decrease="decreaseCartUnit(product)"
                  @increase="increaseCartUnit(product)"
                />
              </VCol>
              <VCol class="flex justify-end" cols="7">
                <VBtn
                  class="mr-2"
                  color="transparent"
                  size="47"
                  @mousedown.stop="removeProductFromCart(product)"
                >
                  <VIcon class="mt-n1" icon="$mdiTrashCanOutline" size="20" />
                </VBtn>
              </VCol>
            </VRow>
          </div>
        </div>
      </VCard>
    </template>
    <VFadeTransition hide-on-leave>
      <div v-if="!cart.length" class="flex flex-col h-full items-center justify-center">
        <EmptyCart />
        <div>No hay productos en el carrito</div>
      </div>
    </VFadeTransition>

    <template #append>
      <VList lines="three">
        <VListSubheader>User Controls</VListSubheader>

        <VListItem>
          <VListItemTitle>Password</VListItemTitle>

          <VListItemSubtitle>
            Require password for purchase or use password to restrict purchase
          </VListItemSubtitle>
        </VListItem>
      </VList>
      <div class="mx-3 mb-3">
        <VBtn block color="primary">Confirmar Compra</VBtn>
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup>
const { drawers, cart, removeProductFromCart, increaseCartUnit, decreaseCartUnit } =
  storeToRefsVerbose(useProductStore())

const clicked = ref(false)
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
