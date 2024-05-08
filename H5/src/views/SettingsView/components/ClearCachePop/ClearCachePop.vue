<template>
  <div>
    <van-popup v-model:show="show" round>
      <div class="popup-box">
        <div class="body">
          <div class="title">{{ $t('setview.Kindtips') }}</div>
          <div class="text">{{ $t('setview.tip13') }}</div>
        </div>
        <div class="footer">
          <VButton class="btn-left" @click="quit">{{ $t('setview.cancel') }}</VButton>
          <VButton class="btn-right">{{ $t('setview.sure') }}</VButton>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
const show = ref(false)
const showPopup = () => {
  show.value = true
}

function quit() {
  show.value = false
}
defineExpose({ showPopup })
</script>

<style lang="scss" scoped>
.popup-box {
  width: 311px;
  height: 178px;
  .body {
    display: flex;
    padding: 32px 24px 0px 24px;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    .title {
      color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
      text-align: center;

      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px;
    }
    .text {
      color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
      text-align: center;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }
  .footer {
    display: flex;
    height: 88px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    .btn-left {
      width: 125px;
      height: 40px;
      flex-shrink: 0;
      color: #ff5000;
      border-radius: 6px;
      background: var(--4, #fff5f0);
    }
    .btn-right {
      width: 125px;
      height: 40px;
    }
  }
}
</style>
