<template>
  <van-overlay
    :show="ComputedOverlay"
    :z-index="zIndex"
    :class="className"
    :custom-style="customStyle"
    @click="emit('OverlayShow')"
  >
    <slot></slot>
  </van-overlay>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['OverlayShow'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: 1
  },
  className: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: null
  }
})

const ComputedOverlay = computed(() => {
  return props.show
})
</script>

<style lang="scss" scoped>
</style>
