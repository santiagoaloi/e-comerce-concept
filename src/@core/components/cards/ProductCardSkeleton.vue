<template>
  <ProductCardWrapper>
    <div class="skeleton-wrapper">
      <VSkeletonLoader type="image, article" />
    </div>
  </ProductCardWrapper>
</template>

<style scoped>
.skeleton-wrapper {
  @apply flex h-full flex-col gap-4
}
</style>
