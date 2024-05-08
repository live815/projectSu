<template>
  <div class="homeIndex" style="margin: 20px 0">
    <!-- 头部 -->
    <MainTop />
    <PromptTitle :title="$t('HomeView.PopularLiveBroadcast')" />
    <LiveBroadcastTab />
    <!-- 视频 -->
    <!-- <homeVideo /> -->
    <PromptTitle :title="$t('HomeView.HotGames')" />
    <PopularGames />
    <PromptTitle :title="$t('HomeView.AppDownload')" />
    <AppInfo />
    <PromptTitle :title="$t('HomeView.Cstyle')" />
    <bottomCard />
    <!-- 广告悬浮框 -->
    <DragAds
      v-if="imgData && imgData.length && showDragAds > 0"
      :imgData="imgData"
      @closeDragAds="closeDragAds"
    />
    <el-dialog
      v-if="popupAdsData.length > 0"
      v-model="showPopupAds"
      :show-close="false"
      align-center
      class="popup-ads"
    >
      <img class="close-btn" @click="closePopup" src="./img/popup_close.png" />
      <PopupAds :popupAdsData="popupAdsData" />
    </el-dialog>
  </div>
</template>

<script setup>
import PopupAds from './components/PopupAds.vue'
import DragAds from './components/DragAds.vue'
import MainTop from './components/MainTop.vue'
import PromptTitle from './components/PromptTitle.vue'
import LiveBroadcastTab from './components/LiveBroadcastTab.vue'
// import homeVideo from './components/homeVideo.vue'
import PopularGames from './components/PopularGames.vue'
import AppInfo from './components/AppInfo.vue'
import bottomCard from './components/bottomCard.vue'
import { promotionStore } from '@/stores/promotion'
import { useAnnouncementStore } from '@/stores/announcement'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

const announcement = useAnnouncementStore()
const promotion = promotionStore()
onMounted(() => {
  // 获取公告和站内信未读
  announcement.getAnnouncementList()
})

// 弹出框广告

const showPopupAds = ref(true)
const popupAdsData = computed(() => {
  if (promotion.promotionData.AdsPopData) {
    let list = []
    promotion.promotionData.AdsPopData.forEach((item) => {
      if (item.popupType == 1) {
        if (checkDailyFlag(1, item.id)) {
          list.push(item)
        }
      } else {
        list.push(item)
      }
    })
    return list
  } else {
    return []
  }
})
const closePopup = () => {
  showPopupAds.value = false
}

//悬浮窗数据
const imgData = computed(() => {
  if (
    promotion.promotionData.floatWindowData &&
    promotion.promotionData.floatWindowData.length > 0
  ) {
    return promotion.promotionData.floatWindowData
  } else {
    return []
  }
})
// 关闭悬浮窗
const showDragAds = ref(true)
const closeDragAds = () => {
  showDragAds.value = false
}
watch(
  () => user.isLogin,
  () => {
    showPopupAds.value = true
  }
)
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .homeIndex {
    zoom: 0.9;
  }
}

:deep() {
  .popup-ads {
    width: 750px;
    height: 500px;
    border-radius: 12px;
  }

  .popup-ads .el-dialog__header {
    display: none;
  }

  .popup-ads .el-dialog__body {
    padding: 0;
    width: 100%;
    height: 100%;
  }
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 500;
  cursor: pointer;
}
</style>
