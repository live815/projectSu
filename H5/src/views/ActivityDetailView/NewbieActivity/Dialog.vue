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
        <div class="scrollable-content" :style="{ maxHeight: height - 140 + 'px' }">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
    <div class="popup-footer">
      <van-button class="but" type="primary" @click="closePopup">{{ cancelbtn }}</van-button>
      <van-button class="but" type="primary" @click="login">{{ butText }}</van-button>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { loginRedirect } = useMobileEvent()

defineProps(['title', 'butText', 'height', 'width', 'TrumpetDialog', 'cancelbtn'])
const show = ref(false)
const showPopup = () => {
  show.value = true
}

const closePopup = () => {
  show.value = false
}

const login = () => {
  show.value = false
  loginRedirect()
}
defineExpose({ showPopup })
</script>

<style lang="scss" scoped>
.popup-content {
  display: flex;
  flex-direction: column;

  color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.popup-header {
  padding: 16px;
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
  text-align: center;
}

.popup-footer {
  padding: 8px 15px 8px 15px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  .but {
    width: 49%;
    height: 40px;
    border-radius: 6px;
    background: var(--1, linear-gradient(93deg, #ff9000 0%, #ff5000 100%));
    border: none;
    &:first-child {
      background: #fff5f0;
      color: #ff5000;
    }
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
