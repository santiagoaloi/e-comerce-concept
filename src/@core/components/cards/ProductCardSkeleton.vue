<template>
  <ProductCardWrapper>
    <div class="card-wrapper">
      <VSkeletonLoader type="image, article" />
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

const buttonActions = [
  { action: () => emit('remove'), icon: '$mdiMinus' },
  { action: () => emit('add'), icon: '$mdiPlus' }
]
</script>

<style scoped>
.card { 
  @apply p-5 rounded-lg
}

.card-wrapper {
  @apply flex h-full flex-col gap-4
}

.card-image {
  @apply rounded-lg p-3
}

.card-top-elements {
  @apply flex opacity-90 items-center text-xl font-semibold
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
  @apply text-green-500 flex
}

.card-header {
  @apply flex grow h-full
}

.card-footer {
  @apply flex items-center gap-1
}
</style>
