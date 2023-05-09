<template>
  <VNavigationDrawer v-model="cartDrawer" color="drawer" width="360">
    <template #prepend>
      <VList class="border-b bg-appbar-background" nav>
        <div class="flex items-center py-2 px-2 justify-between">
          <RouterLink to="/">
            <VImg class="logo" />
          </RouterLink>
        </div>
      </VList>
    </template>

    <VCard
      v-for="(product, i) in cart"
      :key="i"
      :class="{ 'active-push-down ': clicked }"
      :ripple="false"
      class="my-2 mx-3 px-2 border"
      link
      @mousedown="clicked = true"
      @mouseup="clicked = false"
    >
      <div class="d-flex flex-no-wrap">
        <VAvatar class="mx-2 mt-3" rounded="0" size="115">
          <VImg src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></VImg>
        </VAvatar>
        <div class="d-flex flex-column gap-1">
          <div class="mt-3">Martillo multicolor de madera dura press and tag and stick</div>
          <small>Ellie Goulding</small>
          <small class="text-green">$500</small>
        </div>
      </div>
      <div class="d-flex justify-between py-1">
        <VRow class="align-center pl-2">
          <VCol cols="5">
            <VTextField
              v-model="product._cart.units"
              bg-color="transparent"
              class="unit-field"
              @input="valueThreshold($event, product)"
              @mousedown.stop
            >
              <template #prepend-inner>
                <VIcon
                  class="cursor-pointer"
                  icon="$minus"
                  @click.stop
                  @mousedown.stop="decreaseCartUnit(product)"
                ></VIcon>
              </template>

              <template #append-inner>
                <VIcon
                  class="cursor-pointer"
                  icon="$mdiPlus"
                  @click.stop
                  @mousedown.stop="increaseCartUnit(product)"
                />
              </template>
            </VTextField>
          </VCol>
          <VCol class="d-flex justify-end" cols="7">
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
    </VCard>

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
        <VBtn block>Confirmar compra</VBtn>
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup>
const { cartDrawer, cart, removeProductFromCart, increaseCartUnit, decreaseCartUnit } =
  makeStoreDestructurable(useProductStore())

const clicked = ref(false)

// This function checks if the entered value exceeds the maximum allowed value of 999.
// If the value is greater than 999, it updates the units property of the given product
// object to 999.
function valueThreshold(event, product) {
  // Get the entered value from the event object
  const value = event.target.value

  // Check if the entered value is greater than 999
  if (value > 999) {
    // If the value exceeds 999, set the units property of the product object to '999'
    product._cart.units = 999
  }
}
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
  @apply cursor-pointer shadow-md duration-500 active:translate-y-[1.2px] active:shadow-sm active:duration-500
}
</style>
