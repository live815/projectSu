<template>
  <button :class="{ disabled: disabled }" @click="emit('click')"><slot /></button>
</template>

<script setup>
const emit = defineEmits(['click'])
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
button {
  min-width: 55px;
  height: 30px;
  border-radius: 90px;
  background: #ff5000;
  color: #fff;
  text-align: center;
  font-size: 14px;
  border: none;
  &[disabled],
  &.disabled {
    background: rgba(187, 187, 187, 0.5);
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>
