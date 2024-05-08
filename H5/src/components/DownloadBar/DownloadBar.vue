<template>
  <div
    @click="download"
    class="top-box flex"
    v-if="appStore.isShowDownload && !getIsHideDownload()"
  >
    <div class="top-left">
      <div class="canle-icon" @click.stop="close">
        <img src="./img/cancelicon.png" />
      </div>
      <div class="vip-icon">
        <img :src="logo" />
      </div>
      <div class="text-box">{{ $t('common.downloadTip') }}</div>
    </div>
    <div class="top-right">{{ $t('common.download') }}&gt;&gt;</div>
  </div>
</template>
<script setup>
import { getIsHideDownload } from '@/utils/cache'
import { webviewBridgeRedirect } from '@/utils'
import { useAppStore } from '@/stores/app'
// import { getToken } from '@/utils/cache'
// import { showToast } from 'vant'
// import i18n from '@/i18n/index'
const appStore = useAppStore()
// const isLogin = getToken()

function close() {
  appStore.isShowDownload = false
}
function download() {
  webviewBridgeRedirect({
    url: import.meta.env.VITE_APP_DOWNLOAD_URL + `?domain=${window.location.origin}`
  })
  // if (isLogin) {
  //   webviewBridgeRedirect({
  //     url: import.meta.env.VITE_APP_DOWNLOAD_URL + `?domain=${window.location.origin}`
  //   })
  // } else {
  //   showToast(i18n.global.t(i18n.global.t('common.pleaseSignIn')))
  // }
}
const logo = computed(
  () => new URL(`../../assets/img/${appStore.language}/logo-icon-squares.png`, import.meta.url).href
)
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-box {
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  top: 0;
  height: 50px;
  line-height: 50px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
  padding: 9px 10px;
  font-size: 15px;

  color: #fff;

  .top-left {
    display: flex;
    // justify-content: space-between;
    z-index: 100;
    .canle-icon {
      height: 14px;
      flex: 0 0 14px;
      img {
        width: 100%;
      }
    }
    .vip-icon {
      display: flex;
      align-items: center;
      margin: 0 8px;
      img {
        width: 32px;
        height: 32px;
      }
    }
    .text-box {
      @include ellipsis();
    }
  }

  .top-right {
    color: orange;
    flex: 0 0 90px;
    text-align: right;
  }
}
</style>
