<template>
  <div class="boxApp">
    <div class="appImg">
      <el-image loading="lazy" :src="appInfo" />
      <!-- <img :src="appInfo" /> -->
    </div>
    <div class="appRight">
      <div class="app_t1">{{ $t('HomeView.AppDownload_1') }}</div>
      <div class="app_t2">{{ $t('HomeView.AppDownload_2') }}</div>
      <div class="app_t3">
        <QrCode size="210" :link="downloadLink" />
        <img class="logo" :src="Cpng" alt="" />
        <!-- <template v-if="!user.isLogin">
          <div class="mask"></div>
          <button class="login" @click="login">{{ $t('Components.GoToLogin') }}</button>
        </template> -->
      </div>
      <div class="app_t4">{{ $t('HomeView.AppDownload_3') }}</div>
      <!-- <div class="app_t5">{{ downloadLink }}</div> -->
      <div class="app_t5">{{ currentLink }}</div>
    </div>
  </div>
</template>

<script setup>
import { downloadLink, currentLink } from '@/utils/config'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user.js'
const appStore = useAppStore()
const user = useUserStore()
const Cpng = new URL(`../../../assets/img/${appStore.language}/c.png`, import.meta.url).href
const appInfo = new URL(`../img/${appStore.language}/appInfo.png`, import.meta.url).href
function login() {
  user.setLoginDialogAction({
    isShowLoginDialog: true,
    currentPage: 'login'
  })
}
</script>

<style lang="scss" scoped>
.boxApp {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
  height: 626px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .appImg {
    width: 655px;
    height: 643px;
    flex-shrink: 0;
    img {
      width: 655px;
      height: 643px;
    }
  }

  .appRight {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    text-align: end;
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: black;
      opacity: 0.9;
      text-align: center;
      line-height: 150px;
    }
    .login {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: max-content;
      height: 30px;
      padding: 0 10px;
      border: 1px solid var(--unnamed, #f35f1b);
      border-radius: 30px;
      font-weight: 600;
      background: #f36625;
      color: #fff;
      cursor: pointer;
    }
  }

  .app_t1 {
    color: var(--100, #fff);

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    /* 108.333% */
  }

  .app_t2 {
    color: var(--60, rgba(255, 255, 255, 0.6));
    text-align: right;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    /* 162.5% */
    margin-top: 30px;
  }

  .app_t3 {
    margin: 30px 0;
    position: relative;
    width: 210px;
    .logo {
      width: 35px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  .app_t4 {
    color: var(--100, #fff);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    /* 162.5% */
  }

  .app_t5 {
    color: var(--100, #fff);

    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    /* 108.333% */
    margin-top: 5px;
  }
}
</style>
<!--  -->
