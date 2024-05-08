<template>
  <div class="home-view-vi">
    <Head />
    <div class="scroll-area">
      <Banner />
      <Notice :volumeIcon="volumeIcon" />
      <HotGame />
      <GameLobby />
    </div>
    <DownloadBar />
  </div>
</template>

<script setup>
import Head from './components/Head/Head.vue'
import Banner from './components/Banner/Banner.vue'
import GameLobby from './components/GameLobby/GameLobby.vue'
import HotGame from './components/HotGame/HotGame.vue'
import { promotionStore } from '@/stores/promotion'
import { useAppStore } from '@/stores/app'
import volumeIcon from './img/sound.png'
import { useAnnouncementStore } from '@/stores/announcement'

const appStore = useAppStore()
const promotion = promotionStore()
const announcement = useAnnouncementStore()

const init = () => {
  // 获取公共公告,站内信和广告数据
  announcement.getAnnouncementList()
  promotion.getAdvertise()
  appStore.getGameTypeList() // 获取游戏列表
}
init()
</script>

<style lang="scss" scoped>
.home-view-vi {
  @include mobile-padding();
  height: calc(var(--app-height));
  overflow: hidden;
  background: #fff !important;
  :deep() {
    .van-notice-bar {
      padding: 0;
      margin-top: 8px;
    }
  }
  .top-box {
    top: auto;
    bottom: 60px;
    left: 0;
    right: 0;
  }
}
</style>
