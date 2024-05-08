<template>
  <div class="match-detail-view">
    <div class="header" :style="{ backgroundImage: `url(${bg})` }">
      <component
        :is="components[currentComponent]"
        @play="play"
        :url="satelliteLiveUrl"
      ></component>
    </div>
    <div
      class="content-container"
      :class="marginTopClass"
      v-if="chatStore.loading"
      :style="{ borderRadius: currentComponent === 'Live' ? 'initial' : 'revert-layer' }"
    >
      <van-tabs v-model:active="activeName" @click-tab="onClickTab">
        <van-tab
          v-for="item in filteredTabsList"
          :key="item.id"
          :name="item.name"
          :badge="
            item.name === 'chatroom' && activeName !== 'chatroom' && ChatRoomNewMessages !== 0
              ? ChatRoomNewMessages
              : null
          "
        >
          <template v-slot:title
            ><span
              :class="{
                'van-tab--active': item.name === tabActive
              }"
              >{{ item.title }}</span
            ></template
          >
          <component
            :is="item.components"
            :skeletonLoading="skeletonLoading"
            :id="route.query.anchorId"
            @update-message-counter="getMessageNumber"
            :tabsName="activeName"
          ></component>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 卫星直播线路 -->
    <Route />
  </div>
</template>

<script setup>
import Top from './componets/Top/Top'
import Betting from './componets/Betting/Betting'
import Animation from './componets/Animation/Animation'
import Live from './componets/Live/Live'
import Chatroom from './componets/Chatroom/Chatroom'
import Plan from './componets/Plan/Plan'
import Anchor from './componets/Anchor/Anchor'
import { useFBStore } from '@/stores/fb'
import { useLiveList } from '@/stores/live'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import { getToken } from '@/utils/cache'
import bg from './componets/Top/img/contest-bg.png'
import { getLiveList, liveStatistics, addSatelliteLiveInfo } from '@/api/live'
import { useChatroomStore } from '@/stores/chatroom'
import useWebSocket from '@/hooks/useWebSocket'
import dayjs from 'dayjs'
import storage from 'good-storage'
import i18n from '@/i18n'
import Route from './componets/Route/Route'

const isLogin = getToken()
const route = useRoute()
const router = useRouter()
const fbStore = useFBStore()
const liveStore = useLiveList()
const chatStore = useChatroomStore()
const currentComponent = ref('Top')
const activeName = ref('Betting')
const components = { Top, Animation, Live }
const skeletonLoading = ref(false)
const tabActive = ref('Betting')
const ChatRoomNewMessages = ref(0)

const fromLive = computed(() => {
  return route.query.data === 'fromLive'
})
const getMessageNumber = (number) => {
  ChatRoomNewMessages.value = number
}
const handleNewConfig = (message) => {
  try {
    const newData = JSON.parse(message)
    if (newData.businessType === 'chatRoomConfig') {
      chatStore.updateChatroomConfig(newData.businessContent[0])
    } else if (newData.businessType === 'memberUntie') {
      chatStore.updateMemberUntie(newData.businessContent[0])
    } else if (newData.businessType === 'pushOrder') {
      // 更新主播推单信息
      const pushOrderData = newData.businessContent.filter((item) => {
        return item.liveStreamId == route.query.liveID
      })
      liveStore.anchorsPushOrders = pushOrderData
    } else if (newData.businessType === 'liveStream') {
      // 查不到当前直播间信息表示 推送的这条信息为关闭当前直播
      const isCloseLive = newData.businessContent.some((item) => item.id == route.query.liveID)
      if (!isCloseLive && fromLive.value) {
        router.back()
      }
    }
  } catch {
    console.error(message)
  }
}
const { initWs, close } = useWebSocket(import.meta.env.VITE_WS, handleNewConfig)

// 根据条件动态设置marginTop值
const marginTopClass = computed(() => {
  const isAnimationComponent = currentComponent.value === 'Animation'
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)
  const hasVideoUrl = route.query.videoUrl

  if (isAnimationComponent) {
    return 'marginTop-310'
  } else if (isMatchDetail234 && !hasVideoUrl && !liveStore.matchAnchorArr.length) {
    return 'marginTop-200'
  } else if (currentComponent.value === 'Live') {
    return 'marginTop-265'
  }

  return '' // 默认情况下返回空字符串
})

const onClickTab = (v) => {
  tabActive.value = v.name
  // 投注浏览量统计
  const roomCode = fromLive.value ? route.query.roomCode : route.params.id
  const flagged = storage.get('liveBetView') || []
  if (
    (satelliteLiveUrl.value || fromLive.value) &&
    v.name === 'Betting' &&
    !flagged.includes(roomCode)
  ) {
    liveStatistics({
      betView: 1,
      roomCode
    }).then((res) => {
      if (res.code === 200) {
        if (flagged.length >= 50) {
          flagged.length = 0 // 清空数组
        }
        flagged.push(roomCode)
        storage.set('liveBetView', flagged)
      }
    })
  }
}
// 定义定时器变量
let timerId = null
let prevMatchInterval = null

const play = (v) => {
  currentComponent.value = v
}
onBeforeUnmount(() => {
  stopTimer()
  close()
})
// 初始化
init()
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      // console.log('系统繁忙，稍后重试')
    }
  }
  skeletonLoading.value = true
  await fetchMatchDetail()
  skeletonLoading.value = false
  startTimer()

  liveStore.getSatelliteLiveList({ fbId: route.params.id })

  getLiveList().then((res) => {
    liveStore.matchAnchorArr = res.data?.list.filter((item) => {
      return item.gameId == route.params.id && item.status === 2
    })
  })

  const chatRoomType = route.query.liveID ? 1 : 2
  chatStore.getChatroomConfig(chatRoomType)

  // 新增卫星直播统计数据
  const flagged = storage.get('satelliteLive') || []
  if (!flagged.includes(route.params.id) && !fromLive.value && !satelliteLiveUrl.value) {
    const prams = {
      associatedLeague: fbStore.matchDetailList?.lg?.na,
      cusName: fbStore.matchDetailList?.ts[1]?.na,
      mainName: fbStore.matchDetailList?.ts[0]?.na,
      playStartTime: dayjs(fbStore.matchDetailList?.bt).format('YYYY-MM-DD HH:mm:ss'),
      roomCode: route.params.id,
      roomStyle: 5,
      roomTitle: fbStore.matchDetailList?.nm
    }
    addSatelliteLiveInfo(prams).then((res) => {
      if (res.code === 200) {
        if (flagged.length >= 50) {
          flagged.length = 0
        }
        flagged.push(route.params.id)
        storage.set('satelliteLive', flagged)
      }
    })
  }

  initWs() // 初始化ws
}

// 创建定时器函数
function startTimer() {
  stopTimer()
  timerId = setInterval(() => {
    updateMatchDetail()
  }, 8000)
}
function updateMatchDetail() {
  // 先保存上一个赛事详情数据
  setPreviousMatch()
  // 获取赛事详情数据
  fetchMatchDetail()
}
async function fetchMatchDetail() {
  await fbStore.getMatchDetail({
    matchId: route.params.id
  })
}
function setPreviousMatch() {
  fbStore.previousMatchDetailData = { ...fbStore.matchDetailList }
  // 先清掉定时器
  if (prevMatchInterval) {
    clearTimeout(prevMatchInterval)
    prevMatchInterval = null
  }
  // 启动定时器
  prevMatchInterval = setTimeout(() => {
    fbStore.previousMatchDetailData = {}
    clearTimeout(prevMatchInterval)
    prevMatchInterval = null
  }, 2500)
}
// 停止定时器
function stopTimer() {
  clearInterval(timerId)
  timerId = null
}

const filteredTabsList = computed(() => {
  return tabsList.filter(
    (item) => item.name !== 'chatroom' || chatStore.chatroomConfig?.chatRoomEnable
  )
})

const tabsList = [
  {
    id: 0,
    title: i18n.global.t('Mletter.bet'),
    name: 'Betting',
    components: Betting
  },
  {
    id: 1,
    title: i18n.global.t('Mletter.chatroom'),
    name: 'chatroom',
    components: Chatroom
  },
  // {
  //   id: 2,
  //   title: i18n.global.t('Mletter.plan'),
  //   name: 'plan',
  //   components: Plan
  // },
  {
    id: 3,
    title: i18n.global.t('Mletter.Anchor'),
    name: 'anchor',
    components: Anchor
  }
]

const tabDataMap = {
  plan: 'plan',
  Betting: 'Betting',
  fromLive: 'chatroom'
}

// 监听路由参数的变化
watchEffect(() => {
  const data = route.query.data
  if (tabDataMap[data]) {
    activeName.value = tabDataMap[data]
    tabActive.value = tabDataMap[data]
  }

  if (fromLive.value && route.query.videoUrl) {
    currentComponent.value = 'Live'
  }
})

// 卫星直播url
const satelliteLiveUrl = computed(() => {
  if (liveStore.videoSource === 'video1') {
    const url = liveStore.satelliteLive?.[liveStore.videoSource]?.[0]?.liveM3u8?.split(',')[0] || '';
    return url;
  } else {
    return liveStore.satelliteLive?.[liveStore.videoSource]?.[0]?.liveUrl || '';
  }
})

// 切换至聊天室tab时没有登录跳转登录页
// const beforeChange = (v) => {
//   if (v === 'chatroom' && !isLogin) {
//     router.push(`/login?redirect=${route?.fullPath}`)
//   } else {
//     return true
//   }
// }
</script>

<style lang="scss" scoped>
.match-detail-view {
  padding-bottom: 0 !important;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 300px;
    z-index: 1;
  }
  .content-container {
    :deep() {
      .van-tab__text {
        font-size: 16px;
        color: #333;
      }
    }
    .van-tab--active {
      font-weight: 600;
    }

    width: 100%;
    margin-top: 230px;
    border-radius: 20px 20px 0px 0px;
    background: #fff;
    position: relative;
    z-index: 2; /* 将内容容器置于头部之上 */
    transition: z-index 0.3s ease;
    :deep() {
      .van-tabs__line {
        width: 20px;
        height: 3px;
        border-radius: 20px;
        background: #ff5000;
      }
      .van-tabs__nav--line {
        border-radius: 20px 20px 0px 0px;
      }
    }
  }
  .marginTop-310 {
    margin-top: 310px;
  }
  .marginTop-200 {
    margin-top: 190px;
  }
  .marginTop-265 {
    margin-top: 255px;
  }
}
</style>
