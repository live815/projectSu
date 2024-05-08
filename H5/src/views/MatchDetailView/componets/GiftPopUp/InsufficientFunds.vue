<template>
  <div class="insufficient-funds-view">
    <van-popup v-model:show="showBottom" position="bottom">
      <h1 class="heat">{{ $t('Mletter.mlettertip20') }}</h1>
      <p class="text">{{ $t('Mletter.mlettertip24', { num: number }) }}</p>
      <div class="button-box">
        <button class="cancel" @click="showBottom = false">{{ $t('Mletter.cancel') }}</button>
        <button class="top-up" @click="router.push('/deposit')">{{ $t('Mletter.topup') }}</button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import i18n from '@/i18n'
const router = useRouter()
const showBottom = ref(false)
const number = ref()
const showHide = (amount) => {
  if (showBottom.value) {
    showToast(i18n.global.t('Mletter.mlettertip20'))
  }
  number.value = amount

  showBottom.value = !showBottom.value
}
defineExpose({ showHide })
</script>

<style lang="scss" scoped>
.insufficient-funds-view {
  :deep() {
    .van-popup {
      @include mobile-padding();
      height: 172px !important;
      border-radius: 20px 20px 0px 0px;
    }
  }
  .heat {
    color: var(--gray-1, #111);
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin: 17px 0 27px 0;
  }
  .text {
    color: var(--1, #f53f3f);
    text-align: center;
    font-size: 12px;
    margin: 20px 0 28px 0;
  }
  .button-box {
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    .cancel {
      width: 164px;
      height: 40px;
      border-radius: 6px;
      background: var(--gray-f-569, #f5f6f9);
      color: var(--gray-3, #333);
      border: none;
    }
    .top-up {
      width: 164px;
      height: 40px;
      border-radius: 6px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      color: #fff;
      border: none;
    }
  }
}
</style>
