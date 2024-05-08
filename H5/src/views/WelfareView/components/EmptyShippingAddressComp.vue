<template>
  <div>
    <van-popup
      v-model:show="showpage"
      closeable
      position="bottom"
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
      round
    >
      <div class="main-outter">
        <div class="header-Text-box">
          <div class="header-Text">{{ $t('Wletter.tip58') }}</div>
        </div>
        <div class="mid-box">
          <div class="content-wrapper">
            <div class="noshow-img"></div>
            <div class="noshow-text">
              {{ $t('Wletter.tip59') }}<br />
              {{ $t('Wletter.tip60') }}
            </div>
          </div>
        </div>

        <div class="footer">
          <VButton class="btn-left" @click="onClickCloseIcon"> {{ $t('Wletter.cancel') }}</VButton>
          <VButton class="btn-right" @click="changeToAdd">{{ $t('Wletter.tip61') }}</VButton>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  showEmptyPage: {
    type: Boolean,
    default: false
  },
  changeToAdd: {
    type: Function
  }
})

const changeToAdd = () => {
  props.changeToAdd()
}
const emit = defineEmits(['update:showEmptyPage'])
const showpage = computed({
  get() {
    return props.showEmptyPage
  },
  set(value) {
    emit('update:showEmptyPage', value)
  }
})

// 点击弹出框的遮罩层触发
function onClickOverlay() {
  console.log('222')
}
// 点击取消按钮
function onClickCloseIcon() {
  console.log('333')
  showpage.value = false
}
</script>

<style lang="scss" scoped>
$btn-width: 160px;
$btn-height: 44px;

.main-outter {
  height: 561px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background: #fff;

  .header-Text-box {
    position: relative;
    height: 72px;
    width: 100%;

    .header-Text {
      // margin: 25px 0px 0px 25px;
      padding: 25px 0px 0px 25px;
      color: #111;

      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  }

  .mid-box {
    position: relative;
    text-align: center;
    width: 375px;
    height: 405px;
    flex-shrink: 0;
    background: #f7f7f7;

    .content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;

      .noshow-img {
        width: 200px;
        height: 125.644px;
        margin-top: 80px;
        flex-shrink: 0;
        background-image: url(../img/empty-icon.png);
        background-size: cover;
      }

      .noshow-text {
        margin-top: 9px;
        color: #999;
        text-align: center;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 84px;

    .btn-left {
      float: left;
      width: $btn-width;
      height: 44px;
      margin: 20px 0px 15px 15px;
      flex-shrink: 0;
      color: #ff5000;
      border-radius: 6px;
      border: 0.5px solid #ff5000;
      background: #fff;
    }

    .btn-right {
      float: left;
      width: $btn-width;
      height: 44px;
      margin: 20px 0px 15px 25px;
      flex-shrink: 0;
      border-radius: 6px;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
    }
  }
}
</style>
