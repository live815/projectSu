<template>
  <div class="live-view">
    <van-sticky>
      <van-tabs v-model:active="activeName" animated>
        <van-tab :title="$t('Lletter.livestream')" name="LiveList" :to="{ name: 'LiveList' }">
          <template #title>
            <span>{{ $t('Lletter.livestream') }}</span>
            <div v-if="liveIng" class="title">
              <Animateview />
            </div>
          </template>
        </van-tab>
        <!-- <van-tab
          :title="$t('Lletter.BreakNews')"
          name="Information"
          :to="{ name: 'Information' }"
        ></van-tab> -->
        <van-tab
          :title="$t('Lletter.schedule')"
          name="MatchList"
          :to="{ name: 'MatchList' }"
        ></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Animateview from '@/components/Animate'
import { useRoute,useRouter } from 'vue-router'
import { useLiveList } from '@/stores/live'
import useWebSocket from '@/hooks/useWebSocket'
import { useChatroomStore } from '@/stores/chatroom'

const chatStore = useChatroomStore()
const liveStore = useLiveList()
const route = useRoute()
const activeName = ref(route.name)
const router = useRouter()
const liveIng = computed(() => {
  const filteredList = liveStore.liveList?.filter((item) => item.status === 2)
  return filteredList && filteredList.length > 0
})
const handleNewMessage = (message) => {
  liveStore.isConnected = true
  try {
    const newData = JSON.parse(message)
    
    // 更新直播列表
    if (newData.businessType === 'liveStream') {
      liveStore.liveList = newData.businessContent
      if (route.query.liveID) {
        // 在直播详情页面时，判断最新的直播列表是否有当前直播，没有表示为关闭了直播
        const isCloseLive = newData.businessContent.some((item) => item.id == route.query.liveID)
        if (!isCloseLive) {
          router.back()
        }
      }
      
    } else if (newData.businessType === 'chatRoomConfig') {
      chatStore.updateChatroomConfig(newData.businessContent[0])
    } else if (newData.businessType === 'memberUntie') {
      chatStore.updateMemberUntie(newData.businessContent[0])
    }
  } catch {
    console.error(message)
  }
}
const { initWs, close } = useWebSocket(import.meta.env.VITE_WS, handleNewMessage)

initWs() // 初始化ws连接

watch(
  () => route.name,
  (currentRoute) => {
    if (
      currentRoute !== 'LiveList' &&
      currentRoute !== 'live-page' &&
      currentRoute !== 'entertainmentLive'
    ) {
      close()
    }
  }
)
</script>

<style lang="scss" scoped>
.live-view {
  background: #fff;
  overflow: hidden;
}
:deep() {
  .van-tab__text {
    font-size: 16px;
  }
  .van-tab--active {
    color: var(--color-primary);
  }
  .van-tabs__line {
    width: 18px; //下划线长度
  }
}
.title {
  margin-left: 2px;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ff5000;
  border-radius: 4px;
  position: absolute;
  top: 14px;
}
</style>
