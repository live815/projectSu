<template>
  <div class="exclusive-customer">
    <NavBar :border="true" :title="$t('serviceview.title1')" :isShowRight="false" />
    <div class="content" :style="{ backgroundImage: `url(${imgHandler})` }">
      <div class="download-customer">
        <img src="./img/Ellipse.png" alt="" class="img-ellipse" />
        <span class="download-app">{{ $t('serviceview.content3') }}</span>
        <!-- <span class="add-manager">-->
        <!--          <span>{{ $t('serviceview.content4') }}</span>-->
        <!--          <p class="copy-content">{{ sms }}</p>-->
        <!--          <div v-clipboard="sms" class="copy-btn">{{ $t('serviceview.copy') }}</div>-->
        <!--        </span>-->
        <!--        <span class="unlock-welfare">{{ $t('serviceview.unlockbenefits') }}</span> -->
        <van-button @click="download" class="download-btn">
          {{ $t('serviceview.download') }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import vClipboard from '@/directives/clipboard.js'
import { useAppStore } from '@/stores/app'
import { webviewBridgeRedirect } from '@/utils'

const appStore = useAppStore()
// const sms = ref('12345678901')

const download = () => {
  webviewBridgeRedirect({ url: 'https://66chat1.cc', appFunName: 'openBrowser' })
}
const imgHandler = computed(() => {
  return new URL(`./img/${appStore.language}/customer-service.png`, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.exclusive-customer {
  height: 100%;
  overflow-y: hidden;
  .content {
    @include mobile-padding();
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: 20px;
    background-color: #fff;
  }

  .download-customer {
    position: fixed;
    bottom: 0;
    margin: 0 -15px;
    border-radius: 20px 20px 0 0;
    background: #fff;
    box-shadow: 5px 0 15px 0 #e5e5e5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-ellipse {
      margin-top: 20px;
      width: 50px;
    }
    .download-app {
      color: #111;
      font-size: 16px;
      font-weight: 600;
      line-height: 28px;
      margin-top: 9px;
    }
    .add-manager {
      color: #111;
      font-size: 13px;
      line-height: 28px;
      margin-top: 6px;
      display: flex;
      align-items: center;
      $borderHeight: 26px;
      text-align: center;
      .copy-content {
        margin-left: 5px;
        height: $borderHeight;
        line-height: $borderHeight;
        padding: 0 5px;
        border: 1px solid #f53f3f;
        border-radius: 90px 0 0 90px;
      }
      .copy-btn {
        width: 42px;
        height: $borderHeight;
        line-height: $borderHeight;
        border-radius: 0 90px 90px 0;
        background: #f53f3f;
        color: #fff;
        font-size: 13px;
        text-align: center;
      }
    }
    .unlock-welfare {
      color: #111;
      font-size: 13px;
      font-weight: 400;
      line-height: 28px;
    }
    .download-btn {
      // width:100%;
      width: 325px;
      margin: 13px 17px 30px 33px;
      border-radius: 6px;
      height: 50px;
      background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
      font-size: 15px;
      color: #fff;
      font-weight: 500;
      border: none;
    }
  }
}
</style>
