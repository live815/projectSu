<template>
  <div>
    <van-popup v-model:show="show" round>
      <div class="popup-box">
        <div class="header">{{ $t('setview.tip14') }}V1.9.0</div>
        <div class="text">
          {{ $t('setview.tip15') }}
        </div>
        <div class="footer">
          <VButton class="btn-left" @click="quit"> {{ $t('setview.remindnexttime') }}</VButton>
          <VButton class="btn-right">{{ $t('setview.Updatenow') }}</VButton>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
const show = ref(false)
const showPopup = () => {
  console.log('changing')
  show.value = true
}
function quit() {
  show.value = false
}
defineExpose({ showPopup })
</script>

<style lang="scss" scoped>
.header {
  height: 26px;
  color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
  text-align: center;

  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
}
.popup-box {
  width: 311px;
  display: flex;
  padding: 32px 24px 0px 24px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}
.text {
  height: 264px;
  overflow: scroll;
  color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
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
</style>
