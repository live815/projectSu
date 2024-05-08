<template>
  <div class="box">
    <div class="box_bmain">
      <div class="tabList">
        <div
          :class="{ 'match-tab': true, active: currenTab == index }"
          @click="switchBtn(index)"
          v-for="(item, index) in tabList"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="moreGames" @click="goCSport">
        {{ $t('HomeView.MoreGames') }}
        <solidArrow style="margin-left: 5px" />
      </div>
    </div>
  </div>

  <div v-if="liveStore.dataList.length == 0 && currenTab == 0" class="noList">
    {{ $t('HomeView.NoLiveBroadcastYet') }}
  </div>
  <div
    v-if="fbStore.matchAnchorList?.length == 0 && (currenTab == 1 || currenTab == 2)"
    class="noList"
  >
    {{ $t('HomeView.NoLiveBroadcastYet') }}
  </div>
  <div style="height: 175px">
    <!-- 主播  -->
    <LiveBroadcast1
      v-if="liveStore.dataList?.length > 0 && currenTab == 0"
      @activeClick="activeClick"
    />

    <!-- 足球 篮球 -->
    <SatelliteAnchor
      :tableData="fbStore.matchAnchorList"
      v-if="fbStore.matchAnchorList?.length > 0 && (currenTab == 1 || currenTab == 2)"
      @activeClick="activeClick"
      :key="currenTab"
    />
  </div>
  <!-- 播放 :liveRoom="liveStore.liveRoom" -->
  <homeVideo v-if="liveStore.dataList?.length > 0 && liveStore.liveRoom && currenTab == 0" />
  <SatelliteVideo
    v-if="
      fbStore.matchAnchorList &&
      fbStore.matchAnchorList.length > 0 &&
      (currenTab == 1 || currenTab == 2)
    "
  />
  <!-- 投注 -->
  <LiveRoomBetting />
  <!-- 快速投注 -->
  <QuickBetting />
</template>
<script setup>
import i18n from '@/i18n'
import { useLiveStore } from '@/stores/liveBroadcast'
import solidArrow from '@/components/icons/solidArrow.vue'
import LiveBroadcast1 from './LiveBroadcast1.vue'
import SatelliteAnchor from './SatelliteAnchor.vue'
import SatelliteVideo from './SatelliteVideo.vue'
import LiveRoomBetting from '@/components/LiveRoomBetting/LiveRoomBetting.vue'
import QuickBetting from '@/components/QuickBetting/QuickBetting.vue'
import homeVideo from './homeVideo.vue'
import useWebSocket from '@/utils/WebSocket' // 路径根据实际情况修改
import { useChatRoomStore } from '@/stores/chatRoom'
import { watch } from 'vue'
import { arrSort } from '@/utils/cache'
import eventBus from '@/utils/eventBus'
import { useFBStore } from '@/stores/fb'
import { getLiveMatchScore } from '@/api/liveBroadcast'
import { useRouter } from 'vue-router'
const chatStore = useChatRoomStore()
const router = useRouter()
const currenTab = ref(0)
const fbStore = useFBStore()
const intervalTime = ref()
const liveStore = useLiveStore()
const sportId = ref(0)
const circulateTime = ref(null)
const { receivedMessage, sendMessage } = useWebSocket(import.meta.env.VITE_IMG_WS)
const tabList = reactive([
  i18n.global.t('HomeView.Anchor'),
  i18n.global.t('HomeView.Football'),
  i18n.global.t('HomeView.Basketball'),
]) //
onMounted(async () => {
  liveStore.getList(currenTab)
  sendMessageBtn()
  atRegularTime()
  LiveMatchScore()
})
const goCSport = () => {
  router.push('/sports')
}
const sendMessageBtn = () => {
  const message = { businessType: 'ping', businessContent: [] }
  sendMessage(message)
}
const switchBtn = (index) => {
  currenTab.value = index
  if (index == 0) {
    liveStore.getList(currenTab)
    liveStore.roomSportType = 0
    atRegularTime()
    stopTimer()
  } else if (index == 1) {
    sportId.value = 1
    liveStore.roomSportType = 1
    // clearInterval(intervalTime.value)
    // stopTimer()
    satelliteList() //足球
  } else {
    // clearInterval(intervalTime.value)
    liveStore.roomSportType = 2
    // stopTimer()
    sportId.value = 3
    satelliteList() //篮球
  }
}
// 选择那个主播回调
const activeClick = (obj) => {
  console.log(obj, 'iiiid')
  liveStore.liveRoom = obj
  //关闭投注弹窗
  eventBus.emit('closeBet')
}
const atRegularTime = () => {
  clearInterval(intervalTime.value)
  intervalTime.value = setInterval(() => {
    sendMessageBtn()
    if (liveStore.dataList && liveStore.dataList.length > 0) {
      LiveMatchScore()
    }
  }, 10000)
  // setTimeout(() => {
  //   sendMessageBtn()
  // }, 3000)
}
onBeforeUnmount(() => {
  clearInterval(intervalTime.value)
  stopTimer()
})
//获取比赛比分
const LiveMatchScore = async () => {
  let res = await getLiveMatchScore()
  liveStore.liveMatchScore = res.data
}
watch(
  () => receivedMessage.value,
  (receivedMessage) => {
    //ws 开播、停播、推单时推送消息
    if (receivedMessage.businessType == 'liveStream') {
      //第一次没数据的时候
      if (liveStore.dataList?.length == 0) {
        liveStore.setDataList(arrSort(receivedMessage.businessContent))
        if (liveStore.roomSportType === 0) {
          liveStore.setLiveRoom(liveStore.dataList[0])
        }
      } else {
        //有数据
        liveStore.setDataList(arrSort(receivedMessage.businessContent))
        if (liveStore.liveRoom && liveStore.liveRoom.id) {
          const foundItem = receivedMessage.businessContent.find(
            (item) => item.id === liveStore.liveRoom.id,
          )
          // console.log(foundItem.orderList.length,'11foundItem',liveStore.liveRoom.orderList.length)
          if (foundItem && foundItem.orderList) {
            const isOrderListLonger =
              foundItem.orderList.length > liveStore.liveRoom.orderList.length
            const isDifferentPresenter =
              foundItem.presenterName !== liveStore.liveRoom.presenterName
            const isRoomSportTypeZero = liveStore.roomSportType === 0
            if ((isOrderListLonger && isRoomSportTypeZero) || isDifferentPresenter) {
              liveStore.setLiveRoom(foundItem)
            }
          }
          if (!foundItem && liveStore.roomSportType === 0) {
            liveStore.setLiveRoom(liveStore.dataList[0])
          }
        }
      }
    }
    //后台修改聊天室开关 或者 配置变更， 刷新最新配置
    if (receivedMessage.businessType == 'chatRoomConfig') {
      chatStore.chatRoomConfig = receivedMessage.businessContent[0]
      console.log(chatStore.chatRoomConfig, 'chatStore.chatRoomConfig')
    }
    if (receivedMessage.businessType == 'memberUntie') {
      chatStore.chatRoomProhibition = receivedMessage.businessContent[0]
    }
    //
  },
  { deep: true },
)
//卫星直播
const satelliteList = async () => {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      console.log('系统繁忙，稍后重试')
    }
  }
  await getList()
  startTimer()
}
//赛事
const getList = async () => {
  const sportType = {
    current: 1,
    isPC: true,
    orderBy: fbStore.queryMatchListParams.orderBy,
    sportId: sportId.value,
    type: 6,
  }
  await fbStore.getMatchList(sportType)
}
const startTimer = () => {
  stopTimer()
  circulateTime.value = setInterval(() => {
    getList()
  }, 8000)
}
// 停止定时器
const stopTimer = () => {
  if (circulateTime.value) {
    clearInterval(circulateTime.value)
    circulateTime.value = null
  }
}
</script>

<style lang="scss" scoped>
.box {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;

  .box_bmain {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .tabList {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 34px;
    // margin-right: 341px; //306
  }

  .match-tab {
    display: flex;
    min-width: 114px;
    height: 46px;
    padding: 14px 26px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #383e4d;
    background: linear-gradient(180deg, rgba(41, 48, 70, 0.8) 0%, rgba(28, 33, 49, 0.8) 100%);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);

    color: rgba(255, 255, 255, 0.6);

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    // margin-right: 34px
    cursor: pointer;
  }

  .active {
    border: 1px solid #fa882e;
    background: linear-gradient(180deg, #f35d25 0%, #f28225 100%);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    color: #fff;
  }

  .match-tab:hover {
    color: #fff !important;
    opacity: 1 !important;
  }

  .moreGames {
    width: 125px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #383642;
    color: rgba(255, 255, 255, 0.6);

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
}

.noList {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
}
</style>
