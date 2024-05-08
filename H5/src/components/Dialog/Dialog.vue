<template>
  <van-popup
    v-model:show="show"
    round
    position="center"
    :style="{ height: height + 'px', width: width + 'px' }"
  >
    <div class="popup-content">
      <div class="popup-header">{{ title }}</div>
      <div class="popup-body">
        <div class="scrollable-content" :style="{ maxHeight: height - 125 + 'px' }">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
    <div class="popup-footer">
      <slot name="footer">
        <template v-if="TrumpetDialog">
          <div class="footer-btn" @click="closePopup">{{ butText }}</div>
        </template>
        <template v-else>
          <van-button class="but" type="primary" @click="closePopup">{{ butText }}</van-button>
        </template>
      </slot>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'

defineProps(['title', 'butText', 'height', 'width', 'TrumpetDialog'])
const show = ref(false)
const showPopup = () => {
  show.value = true
}

const closePopup = () => {
  show.value = false
}
defineExpose({ showPopup })
</script>

<style lang="scss" scoped>
.popup-content {
  display: flex;
  flex-direction: column;
  color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
  font-size: 16px;
  line-height: 24px;
}

.popup-header {
  padding-top: 15px;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
}

.popup-body {
  overflow-y: auto;
  padding: 8px 20px 8px 20px;
}

.scrollable-content {
  overflow-y: auto;
}

.popup-footer {
  padding: 8px 15px 8px 15px;
  text-align: center;
  .but {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 230px;
    height: 40px;
    border-radius: 6px;
    background: var(--1, linear-gradient(93deg, #ff9000 0%, #ff5000 100%));
    border: none;
  }
  .footer-btn {
    color: var(--2, #ff5000);
    text-align: center;
    /* Mark/Large */

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    height: 45px;
    line-height: 45px;
    border: none;
  }
}
</style>
