<template>
  <VCard :key="i" class="pa-8 active-push-down rounded-lg">
    <div class="mb-3">
      <VChip color="red-lighten-4">{{ discount }}% off</VChip>
    </div>
    <VImg :src="avatar" class="w-full rounded-lg">
      <template #placeholder>
        <div class="flex h-full items-center justify-center">
          <VProgressCircular color="primary" indeterminate />
        </div>
      </template>
    </VImg>

    <div class="flex item-center backdrop:">
      <div class="flex flex-col my-6">
        <h3 class="text-xl font-semibold">{{ title }}</h3>
        <div class="text-blue-200 mt-5">{{ description }} </div>
      </div>
      <VSpacer />
      <div class="flex flex-col my-6">
        <VRating :model-value="rating" color="yellow-darken-3" length="5" size="25" />
      </div>
    </div>

    <div class="flex gap-3">
      <div class="mt-auto flex items-center gap-x-3 text-blue">{{ price }}</div>
      <div class="mt-auto flex items-center gap-x-3 line-through">{{ discountPrice }}</div>
      <VSpacer />
      <VBtn color="primary" icon="$mdiPlus" size="x-small" variant="elevated" />
    </div>
  </VCard>
</template>

<script setup>
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
    type: Number,
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
  }
})
</script>
