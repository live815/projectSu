<template>
  <button class="custom-btn" :class="[isDisabled, sizeClass, colorClass]" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium'
  },
  color: {
    type: String,
    default: 'medium'
  }
})

const isDisabled = computed(() => {
  return `button--` + props.isDisabled
})
const sizeClass = computed(() => {
  return `button--` + props.size
})
const colorClass = computed(() => {
  return `button--` + props.color
})
</script>
<style lang='scss' scoped>
.custom-btn {
  width: 100%;
  height: 44px;
  margin-top: 12px;
  color: #fff;
  border-radius: 6px;
  flex-shrink: 0;
  background: #dbdbdb;
  border: none;
}
.custom-btn::after {
  border-color: transparent;
}
.button--small {
  padding: 5px 10px;
}

.button--large {
  padding: 15px 30px;
}

.button--primary {
  background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
}

.button--secondary {
  background-color: lightgray;
}

.button--success {
  background-color: lightgreen;
}

.button--error {
  background-color: lightcoral;
}
.button--disabled {
  background: var(--3, #ffc6ac);
}
</style>