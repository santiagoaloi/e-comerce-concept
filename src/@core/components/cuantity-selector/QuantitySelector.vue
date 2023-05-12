<template>
  <div class="quantity-selector-wrapper">
    <div class="quantity-selector-input-wrapper border">
      <VBtn
        :disabled="count <= min"
        class="rounded-md"
        icon="$minus"
        variant="text"
        @mousedown.stop="dec(), emit('decrease')"
      />

      <input
        v-model="count"
        :max="max"
        :min="min"
        class="field"
        role="spinbutton"
        type="number"
        @input="handleOnChange"
      />
      <VBtn
        :disabled="count >= max"
        class="rounded-md"
        icon="$plus"
        variant="text"
        @mousedown.stop="inc(), emit('increase')"
      />
    </div>
  </div>
</template>

<script setup>
import { useCounter } from '@vueuse/core'

const emit = defineEmits(['update:modelValue', 'increase', 'decrease'])

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },

  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 99
  }
})

// Create a ref for the minimum and maximum values based on the props passed to the component
const min = ref(props.min)
const max = ref(props.max)

// Use the useCounter hook from VueUse to create a counter that can be incremented and decremented, and that is bounded by the min and max values
const { count, inc, dec, set } = useCounter(props.modelValue, { min: min.value, max: max.value })

// A function that is called whenever the user types a new value into the input field
function handleOnChange(event) {
  // Get the current value of the input field
  const currentValue = event.target.value
  // Convert the current value to a number
  const nextValue = parseFloat(currentValue)
  // Ensure that the new value is within the bounds set by the min and max values
  set(clamp(nextValue, min.value, max.value))
  // Emit an update:modelValue event to update the parent component's value with the new count value
  emit('update:modelValue', count.value)
}

// Use the watch function from Vue to watch for changes to the modelValue prop
watch(
  () => props.modelValue,
  (newValue) => {
    // If the modelValue prop changes, update the count value to match
    set(newValue)
  }
)
</script>

<style scoped>
.quantity-selector-wrapper {
@apply inline-flex flex-col items-center
}

.quantity-selector-input-wrapper {
@apply flex  rounded-md
}

.field {
   @apply appearance-none mx-2 w-8 text-center bg-transparent font-medium outline-none
}
</style>
