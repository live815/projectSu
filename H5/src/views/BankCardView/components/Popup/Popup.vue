<template>
  <div class="popup-overlay" v-if="onComputedVisible">
    <div class="popup-container">
      <div class="popup-header">
        <h2 class="popup-title">{{ title }}</h2>
      </div>
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import i18n from '@/i18n'

const emit = defineEmits(['update:visible'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: i18n.global.t('BankcardView.Kindtips')
  }
})
const onComputedVisible = computed(() => {
  return props.visible
})
const closePopup = () => {
  emit('update:visible', false)
}
</script>
<style lang="scss" scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.popup-container {
  background-color: white;
  width: 311px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.popup-title {
  color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));

  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}

.popup-close {
  padding: 0;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.popup-content {
  /* 设置弹出层内容的样式 */
  text-align: center;
}
</style>
