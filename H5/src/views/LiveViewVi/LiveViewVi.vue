<template>
  <div class="live-view-vi">
    <NavBar :title="$t('Lletter.livestream')" />
    <van-tabs v-model:active="activeName" animated>
      <van-tab title="Toàn Diện" :name="0"> </van-tab>
      <van-tab title="Bóng Đá" :name="1"></van-tab>
      <van-tab title="Bóng Rổ" :name="3"></van-tab>
      <van-tab title="Sự Giải Trí" :name="4"></van-tab>
    </van-tabs>
    <Banner />
    <MatchList v-if="activeName !== 4" />
    <LiveList :liveList="liveList" />
  </div>
</template>

<script setup>
import MatchList from './components/MatchList/MatchList.vue'
import LiveList from './components/LiveList/LiveList.vue'
import Banner from './components/Banner/Banner.vue'
import { useLiveList } from '@/stores/live'
import useWebSocket from '@/hooks/useWebSocket'
import { useRoute } from 'vue-router'

const route = useRoute()
const liveStore = useLiveList()
const activeName = ref(0)

const liveList = computed(() => {
  if (!activeName.value) {
    return liveStore.liveList
  } else {
    return liveStore.liveList.filter((item) => item.roomStyle === activeName.value)
  }
})

const handleNewMessage = (message) => {
  liveStore.isConnected = true
  try {
    const newData = JSON.parse(message)
    // 更新直播列表
    if (newData.businessType === 'liveStream') {
      liveStore.liveList = newData.businessContent
    }
  } catch {
    console.error(message)
  }
}
const { initWs, close } = useWebSocket(import.meta.env.VITE_WS, handleNewMessage)
const init = () => {
  liveStore.getLiveListAction()

  initWs() // 连接聊天室配置ws
}
init()
watch(
  () => route.name,
  (currentRoute) => {
    if (currentRoute !== 'live' && currentRoute !== 'entertainmentLive') {
      close()
    }
  }
)
</script>

<style lang="scss" scoped>
.live-view-vi {
  height: calc(var(--app-height));
}
</style>
