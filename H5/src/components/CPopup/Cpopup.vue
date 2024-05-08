<template>
  <van-popup
    v-model:show="cPopupDom"
    :style="{ height: onComputedPopupHeight }"
    :position="position"
    @close="onClose"
    round
  >
    <slot></slot>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:visible', 'close'])
const cPopupDom = ref(false)
const showhide = () => {
  cPopupDom.value = cPopupDom.value ? false : true
}
defineExpose({ showhide })
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: 'auto'
  },
  // 弹出层位置可选位置top bottom right left
  position: {
    type: String,
    default: 'center'
  }
})

const onComputedPopupHeight = computed(() => {
  return props.height
})

const onClose = () => {
  emit('update:visible', false)
  emit('close')
}
</script>
<style lang='scss' scoped>
</style>
