<template>
  <ProductCardWrapper
    :class="{ 'active-push-down elevation-3': clicked }"
    @mousedown="clicked = true"
    @mouseup="clicked = false"
  >
    <div v-motion-fade class="card-wrapper">
      <VImg cover class="card-image" height="250" src="https://placehold.co/600x400/png">
        <div class="card-top-elements">
          <div>
            <VChip class="bg-primary">{{ discount }}% off</VChip>
          </div>
          <VSpacer />
          <div>
            <VFadeTransition>
              <VChip
                v-if="cartProduct?._cart.units"
                class="bg-primary"
                append-icon="$mdiCartOutline"
                closable
                @click:close="$emit('clear')"
                @mousedown.stop
              >
                {{ cartProduct?._cart.units }}
              </VChip>
            </VFadeTransition>
          </div>
        </div>

        <template #placeholder>
          <div class="img-loader-spinner">
            <VProgressCircular color="primary" indeterminate />
          </div>
        </template>
      </VImg>

      <div class="flex">
        <div class="card-header">
          <div class="card-title-wrapper">
            <div class="card-title">{{ title }}</div>
          </div>
        </div>

        <div class="flex h-full pr-2">
          <ProductCardRating :model-value="rating" />
        </div>
      </div>

      <div class="card-description-wrapper">
        <div class="card-description">
          {{ description }}
        </div>
      </div>

      <div class="card-footer">
        <div class="card-price text-primary" v-html="`$${price}`" />
        <!-- <div class="flex line-through" v-html="`$${discountPrice}`" /> -->

        <VSpacer />

        <ProductCardActions
          v-for="(button, i) in buttonActions"
          :key="i"
          @mousedown.stop="button.action"
        >
          <VIcon :icon="button.icon" />
        </ProductCardActions>
      </div>
    </div>
  </ProductCardWrapper>
</template>

<script setup>
const emit = defineEmits(['favorite', 'add', 'remove', 'clear'])

defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  rating: {
    type: [Number, String],
    default: 1
  },
  price: {
    type: [String, Number],
    default: ''
  },
  discountPrice: {
    type: [String, Number],
    default: ''
  },
  discount: {
    type: [String, Number],
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  favorite: {
    type: Boolean,
    default: false
  },
  cartProduct: {
    type: Object,
    default: () => {}
  },
  hasUnits: {
    type: Boolean,
    default: false
  }
})

const clicked = ref(false)

const buttonActions = [
  { action: () => emit('remove'), icon: '$mdiMinus', name: 'remove' },
  { action: () => emit('add'), icon: '$mdiPlus', name: 'add' }
]
</script>

<style scoped>
.card {
  @apply p-5 rounded-lg
}

.card-wrapper {
  @apply flex h-full flex-col gap-4
}

.card-top-elements {
  @apply flex opacity-90 items-center text-xl font-semibold
}

.card-image {
  @apply rounded-lg p-3
}


.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title-wrapper {
  @apply flex items-start gap-3
}

.card-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-description-wrapper {
  @apply flex flex-col h-full
}

.card-price {
  @apply flex
}

.card-header {
  @apply flex grow h-full
}

.card-footer {
  @apply flex items-center gap-1
}

.active-push-down {
  @apply cursor-pointer shadow-md duration-500 translate-y-[1.2px] active:shadow-sm active:duration-500
}
</style>
