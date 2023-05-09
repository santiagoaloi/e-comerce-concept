<template>
  <ProductCardWrapper>
    <div class="card-wrapper">
      <VSkeletonLoader type="image, article" />
    </div>
  </ProductCardWrapper>
</template>

<style scoped>
.card-wrapper {
  @apply flex h-full flex-col gap-4
}
</style>
