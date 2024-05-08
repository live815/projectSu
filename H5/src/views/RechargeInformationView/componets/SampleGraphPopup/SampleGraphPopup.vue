<template>
  <CPopup ref="SmpleGraphDom" height="580px" position="bottom">
    <div class="popup-top">
      <span>{{ $t('Rletter.rlettertip32') }}</span>
      <span class="popup-top-right" @click="onClickOff"><van-icon name="cross" /></span>
    </div>
    <div class="popup-text">
      <div class="popup-text-item">
        <div class="span"></div>
        <div>{{ $t('Rletter.rlettertip33') }}</div>
      </div>
      <div class="popup-text-item">
        <div class="span"></div>
        <div>{{ $t('Rletter.rlettertip34') }}</div>
      </div>
      <div class="popup-text-item">
        <div class="span"></div>
        <div>{{ $t('Rletter.rlettertip35') }}</div>
      </div>
    </div>
    <div class="popup-box">
      <div class="popup-box-img">
        <img :src="sample1" class="popup-box-img-info" />
        <img :src="success" class="popup-box-img-icon" />
      </div>
      <div class="popup-box-img">
        <img class="popup-box-img-info" :src="sample2" />
        <img class="popup-box-img-icon" :src="error" />
      </div>
    </div>
    <div class="popup-footer" @click="onClickOff">{{ $t('Rletter.rlettertip36') }}</div>
  </CPopup>
</template>

<script setup>
import CPopup from '@/components/CPopup/Cpopup'
import sample1 from './img/sample1.png'
import sample2 from './img/sample2.png'
import error from './img/error.png'
import success from './img/success.png'
const SmpleGraphDom = ref(null)
const showhide = () => {
  SmpleGraphDom.value.showhide()
}
defineExpose({ showhide })

// 关闭
const onClickOff = () => {
  SmpleGraphDom.value.showhide()
}
</script>
<style lang="scss" scoped>
.popup-top {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
  color: var(--gray-1, #111);
  font-size: 18px;
  font-weight: 600;
  .popup-top-right {
    margin-left: 103px;
    margin-right: 18px;
  }
}
.popup-text {
  width: 335px;
  height: 60px;
  color: #666;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 auto;
  .popup-text-item {
    display: flex;
    align-items: center;
    .span {
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: #666;
      margin-right: 8px;
      border-radius: 50%;
    }
  }
}
.popup-box {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  .popup-box-img {
    position: relative;
    width: 151px;
    height: 160px;
    margin-right: 13px;
    border-radius: 12px;
    background: linear-gradient(180deg, #fff 0%, #f1f1f1 100%);
    .popup-box-img-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 59px;
      height: 105px;
      border-radius: 5px;
      border: 0.5px solid var(--gray-fff, #fff);
    }
    .popup-box-img-icon {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translate(-50%);
      width: 24px;
      height: 24px;
    }
  }
}
.popup-footer {
  margin-top: 200px;
  color: var(--2, #ff5000);
  text-align: center;
  font-size: 18px;
}
</style>
