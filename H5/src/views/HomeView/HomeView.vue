<template>
  <div>
    <div class="home-wrapper" :style="imgSrc">
      <!-- 顶部下载栏 -->
      <DownloadBar></DownloadBar>
      <!-- 轮播图 -->
      <Banner />
      <div class="user-wrapper">
        <!-- 滚动公告栏 -->
        <Notice />
        <!-- 用户中心精简版 -->
        <UserCenterSimple />
      </div>
      <!-- 游戏大厅 -->
      <GameLobby />
    </div>
    <van-floating-bubble
      :offset="offset"
      axis="xy"
      magnetic="x"
      class="home-float"
      :gap="10"
      v-if="adsData && isSHowFloat"
    >
      <template #default>
        <div class="float-container">
          <div class="close-icon" @click.stop="isSHowFloat = !isSHowFloat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <g clip-path="url(#clip0_1599_35438)">
                <path
                  d="M5 10.0002C3.84909 9.99672 2.7346 9.59629 1.84465 8.86649C0.954693 8.13669 0.343758 7.12221 0.114949 5.99426C-0.113861 4.86631 0.0534654 3.69395 0.588689 2.67505C1.12391 1.65615 1.99426 0.853086 3.05285 0.401396C4.26691 -0.0781572 5.62038 -0.0639116 6.82408 0.441089C8.02778 0.946089 8.98627 1.9018 9.49476 3.10403C10.0032 4.30626 10.0214 5.65968 9.54539 6.87513C9.06936 8.09058 8.13687 9.07168 6.94716 9.60882C6.33105 9.86894 5.66878 10.0021 5 10.0002ZM5 0.783C2.67124 0.783 0.782792 2.68124 0.782792 5.00021C0.782792 7.31919 2.67124 9.21743 5 9.21743C7.32877 9.21743 9.21722 7.32898 9.21722 5.00021C9.21722 2.67145 7.31898 0.783 5 0.783Z"
                  fill="#999999"
                />
                <path
                  d="M3.13113 7.26031C3.05453 7.25924 2.97992 7.2357 2.91657 7.19262C2.85321 7.14955 2.80389 7.08883 2.77472 7.01798C2.74555 6.94714 2.73781 6.8693 2.75247 6.7941C2.76712 6.7189 2.80352 6.64966 2.85716 6.59495L6.58514 2.86697C6.6591 2.79301 6.75941 2.75146 6.864 2.75146C6.96859 2.75146 7.06891 2.79301 7.14286 2.86697C7.21682 2.94093 7.25837 3.04124 7.25837 3.14584C7.25837 3.25043 7.21682 3.35074 7.14286 3.4247L3.41489 7.1429C3.37795 7.18059 3.33377 7.21042 3.28501 7.2306C3.23624 7.25077 3.1839 7.26088 3.13113 7.26031Z"
                  fill="#999999"
                />
                <path
                  d="M6.8591 7.26033C6.75586 7.25886 6.65739 7.21666 6.58512 7.14291L2.85715 3.41494C2.82053 3.37832 2.79148 3.33484 2.77166 3.28699C2.75184 3.23915 2.74164 3.18786 2.74164 3.13607C2.74164 3.03148 2.78319 2.93117 2.85715 2.85721C2.93111 2.78325 3.03142 2.7417 3.13601 2.7417C3.24061 2.7417 3.34092 2.78325 3.41488 2.85721L7.13307 6.59497C7.18671 6.64968 7.22311 6.71892 7.23776 6.79412C7.25242 6.86932 7.24468 6.94716 7.21551 7.018C7.18634 7.08884 7.13702 7.14957 7.07366 7.19264C7.01031 7.23572 6.9357 7.25925 6.8591 7.26033Z"
                  fill="#999999"
                />
              </g>
              <defs>
                <clipPath id="clip0_1599_35438">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="img-container" @click="jumpActivity({ event: adsData, router: $router })">
            <img :src="getImg(adsData.appUrl)" />
          </div>
        </div>
      </template>
    </van-floating-bubble>
    <AdsPopup />
  </div>
</template>
<script setup>
import Banner from '@/components/Banner/Banner.vue'
import Notice from './components/Notice/Notice.vue'
import UserCenterSimple from './components/UserCenterSimple/UserCenterSimple.vue'
import GameLobby from './components/GameLobby/GameLobby.vue'
import eventBus from '@/utils/eventBus'
import { useAnnouncementStore } from '@/stores/announcement'
import { promotionStore } from '@/stores/promotion'
import AdsPopup from '@/components/AdsPopup/AdsPopup.vue'
import { getImg } from '@/utils'
import { jumpActivity } from '@/utils/jumpActivity'

const imgSrc = ref('')
const offset = ref({ x: 0, y: 0 }) // 悬浮框初始位置
const isSHowFloat = ref(true)
const promotion = promotionStore()
const announcement = useAnnouncementStore()

const adsData = computed(() => {
  const _floatWindowData = promotion.promotionData.floatWindowData
  return _floatWindowData && _floatWindowData.length > 0 ? _floatWindowData[0] : null
})

eventBus.on(
  'currentGameTypeIdxChange',
  (img) => (imgSrc.value = { backgroundImage: `url(${img})` })
)

onMounted(async () => {
  // 获取公共公告,站内信和广告数据
  announcement.getAnnouncementList()
  // 获取活动列表
  promotion.getAdvertise()
  offset.value = { x: window.innerWidth - 91 - 10, y: window.innerHeight - 149 }
})

onUnmounted(() => eventBus.off('currentGameTypeIdxChange'))
</script>

<style lang="scss" scoped>
.home-wrapper {
  background: #ecf2ff url('./img/index-bg.png') no-repeat center center;
  background-size: cover;
}

.user-wrapper {
  background: url('./img/user-wrapper-bg.png') no-repeat center center;
  background-size: 100% 100%;
  height: 100px;
  margin-top: 9px;
  margin-left: 5px;
  margin-right: 5px;
}

.float-container {
  position: relative;
  width: 85px;
  height: 85px;
  background-color: rgba(0, 0, 0, 0);

  img {
    width: 100%;
    height: 100%;
  }
}
.close-icon {
  position: absolute;
  top: 2px;
  right: 0px;
}
</style>

<style lang="scss">
.home-float.van-floating-bubble {
  width: 80px;
  height: 80px;
  background-color: transparent;
  border-radius: 0px !important;
}
</style>
