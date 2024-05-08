<template>
  <div class="box">
    <div class="boxMian">
      <!-- 左边 liveStore.liveRoom.webrtcPullUrl && liveStore.liveRoom.status==2
                isVideo==1 && liveStore.liveRoom.status==2
            -->
      <div class="videoLeft">
        <div class="top" v-if="isShow">
          <div style="display: flex; align-items: center">
            <div class="anchorImg">
              <img
                v-if="liveStore.liveRoom.presenterAvatar"
                class="fcImg"
                :src="getImgUrl(liveStore.liveRoom.presenterAvatar)"
              />
              <img v-else src="../../../assets/img/anchorImg.png" />
            </div>
            <div class="name">{{ liveStore.liveRoom.presenterName }}</div>
          </div>

          <div
            class="ranks"
            v-if="liveStore.liveRoom.roomStyle == 1 || liveStore.liveRoom.roomStyle == 3"
          >
            <div class="t1">{{ liveStore.liveRoom.mainName }}</div>
            <img :src="getIntercept(liveStore.liveRoom.icons, 0)" style="margin-left: 4px" />
            <div class="score" style="margin-left: 35px" v-if="liveStore.liveRoom.status == 2">
              {{ liveScore(liveStore.liveRoom.gameId, 0) }}
            </div>
            <div class="have" v-if="liveStore.liveRoom.status == 2">
              <playIcon />
              <span class="t1" style="font-size: 12px; margin-left: 4px">{{
                getMatchStatus(fbStore.matchDetailList, fbStore)
              }}</span>
            </div>
            <div class="haves" v-else>
              <div class="t1" style="font-size: 12px; margin-left: 4px">
                {{ formatTime(liveStore.liveRoom.startTimestamp) }}
              </div>
              <div class="t1" style="font-size: 12px">{{ $t('HomeView.NotStartedYet') }}</div>
            </div>
            <div class="score" style="margin-right: 40px" v-if="liveStore.liveRoom.status == 2">
              {{ liveScore(liveStore.liveRoom.gameId, 1) }}
            </div>
            <img :src="getIntercept(liveStore.liveRoom.icons, 1)" />
            <div class="t1" style="margin-left: 4px">{{ liveStore.liveRoom.cusName }}</div>
          </div>
          <div class="ranks" v-else>
            <div class="t1" style="font-size: 16px">{{ liveStore.liveRoom.roomTitle }}</div>
          </div>
          <div></div>
        </div>
        <div class="playV" :style="{ width: `${isWidth}px`, height: `${isHeight}px` }">
          <TcVideo
            v-if="liveStore.liveRoom.webrtcPullUrl && liveStore.liveRoom.status == 2"
            :width="isWidth"
            :height="isHeight"
            :anchorUrl="liveStore.liveRoom.webrtcPullUrl"
            :loop="false"
            @startPlay="startPlay = true"
          />
          <div v-if="!startPlay && liveStore.liveRoom.status !== 1" class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>

          <xgVideo
            v-if="liveStore.liveRoom.webrtcPullUrl && liveStore.liveRoom.status == 1"
            :width="isWidth"
            :height="isHeight"
            :anchorUrl="liveStore.liveRoom.webrtcPullUrl"
          />

          <!-- 礼物展示 -->
          <GiftListVideo />
        </div>
        <div class="below">
          <div
            class="TBicon"
            @click="sunbathingBtn"
            v-if="
              user.userInfo.userName &&
              user.userInfo.role === 0 &&
              (liveStore.liveRoom.roomStyle == 1 || liveStore.liveRoom.roomStyle == 3)
            "
          >
            <img src="../../../assets/img/TBicon03.png" />
            <p>{{ $t('HomeView.Postorders') }}</p>
          </div>
          <div
            class="TBicon"
            @click="lookSunbathingBtn"
            v-if="
              user.userInfo.userName &&
              user.userInfo.role === 0 &&
              (liveStore.liveRoom.roomStyle == 1 || liveStore.liveRoom.roomStyle == 3)
            "
          >
            <img src="../../../assets/img/TBicon02.png" />
            <p>{{ $t('HomeView.OnlyLookAtTheOrders') }}</p>
          </div>
          <div
            class="TBicon"
            @click="giftBtn"
            v-if="user.userInfo.userName && user.userInfo.role === 0"
          >
            <img src="../../../assets/img/TBicon01.png" />
            <p>{{ $t('HomeView.Gift') }}</p>
          </div>
          <div class="point">
            <AnchorPrompt />
          </div>
          <div class="chatBtn" @click="retractBtn" v-if="liveStore.liveBtn">
            {{
              isShow && liveStore.liveBtn
                ? $t('HomeView.HideChatRoom')
                : i18n.global.t('HomeView.ExpandChatRoom')
            }}
          </div>
        </div>
      </div>
      <div class="videoRight" v-show="isShow">
        <LiveBroadcastLift />
      </div>
    </div>
    <div
      class="giftDiv"
      :style="{ width: `${isWidth - 20}px` }"
      v-if="isClose && chatStore.chatRoomConfig?.giftEnable == 1"
    >
      <div class="colseIcon">
        <el-icon @click="closeBtnIc" style="font-size: 20px; color: #fff"><Close /></el-icon>
      </div>
      <GiftList
        v-if="isClose && chatStore.chatRoomConfig?.giftEnable == 1"
        :tableData="giftData"
        :width="isWidth"
        :height="isHeight"
      />
    </div>
    <div
      class="pushOrder"
      v-if="isCloseTwo && liveStore.liveRoom.orderList && liveStore.liveRoom.orderList.length > 0"
    >
      <div class="pushColse">
        <el-icon @click="closeBtnOrder" style="font-size: 20px; color: #fff">
          <Close />
        </el-icon>
      </div>
      <pushOrder
        v-if="isCloseTwo && liveStore.liveRoom.orderList && liveStore.liveRoom.orderList.length > 0"
      />
    </div>
  </div>
  <!-- 晒单 -->
  <Sunbathing v-if="dialogShow" :sunbathingBool="dialogShow" @sunbathingShow="sunbathingShow" />
  <!-- 只看晒单 -->
  <SeeSunbathing
    v-if="dialogShowTwo"
    :seebathingBool="dialogShowTwo"
    @seebathingShow="seebathingShow"
  />
</template>

<script setup>
import i18n from '@/i18n'
import { getImgUrl, getIntercept, liveScore, formatTime } from '@/utils/cache'
import { useLiveStore } from '@/stores/liveBroadcast'
import playIcon from '@/components/icons/playIcon.vue'
import xgVideo from '@/components/Video/xgVideo.vue'
import TcVideo from '@/components/Video/TcVideo.vue'
import LiveBroadcastLift from '@/components/LiveBroadcastLift/LiveBroadcastLift.vue'
import GiftListVideo from '@/components/GiftListVideo/GiftListVideo.vue'
import Sunbathing from '@/components/Sunbathing/Sunbathing.vue'
import SeeSunbathing from '@/components/SeeSunbathing/SeeSunbathing.vue'
import AnchorPrompt from '@/components/AnchorPrompt/AnchorPrompt.vue'
import GiftList from '@/components/GiftList/GiftList.vue'
import pushOrder from '@/components/pushOrder/pushOrder.vue'
import { useFBStore } from '@/stores/fb'
import { getGiftList } from '@/api/liveBroadcast'
import { Close } from '@element-plus/icons-vue'
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useChatRoomStore } from '@/stores/chatRoom'

import { getMatchStatus } from '@/hooks/useSportDict'
const user = useUserStore()
const fbStore = useFBStore()
const dialogShow = ref(false)
const dialogShowTwo = ref(false)
const liveStore = useLiveStore()
const isShow = ref(true)
const isCloseTwo = ref(false)
const chatStore = useChatRoomStore()
const isWidth = ref('989')
const isHeight = ref('555')
const giftData = ref([])
const skeletonLoading = ref(false)
const startPlay = ref(false)
watch(
  () => liveStore.liveRoom.webrtcPullUrl,
  () => {
    startPlay.value = false
  }
)
const isClose = ref(false)
const sunbathingBtn = () => {
  // betRecordOrder()
  dialogShow.value = true
}
const lookSunbathingBtn = () => {
  dialogShowTwo.value = true
  // getOrderListAnchor()
}
onMounted(() => {
  // console.log(props.liveRoom,'liveRoom-homeVideo',props.liveRoom.webrtcPullUrl)
  init()
  if (user.userInfo.userName) {
    giftListData()
  }
})
const retractBtn = () => {
  if (isShow.value) {
    isWidth.value = '1320'
    isHeight.value = '628'
  } else {
    isWidth.value = '989'
    isHeight.value = '555'
  }
  isShow.value = !isShow.value
}
//监听是否全屏
watch(
  () => liveStore.liveBtn,
  (newLiveBtn) => {
    console.log(newLiveBtn, 'newLiveBtn')
    if (newLiveBtn) {
      isWidth.value = '989'
      isHeight.value = '555'
    } else {
      isWidth.value = '1320'
      isHeight.value = '628'
    }
    isShow.value = !isShow.value
  }
)
const closeBtnIc = () => {
  isClose.value = false
}
const closeBtnOrder = () => {
  isCloseTwo.value = false
}
const giftBtn = () => {
  if (chatStore.chatRoomConfig?.giftEnable == 1) {
    isClose.value = !isClose.value
  } else {
    ElMessage(i18n.global.t('HomeView.GiftFunctionIsClosed'))
  }
}
const sunbathingShow = (type) => {
  dialogShow.value = type
}
const seebathingShow = (type) => {
  dialogShowTwo.value = type
}
onBeforeUnmount(() => {
  stopTimer()
})
//投注 初始化
let timerId = null
let prevMatchInterval = null
watch(
  () => liveStore.liveRoom?.gameId,
  (newGameId) => {
    if (newGameId) {
      console.log(newGameId, 'newGameId')
      fetchMatchDetail()
    } else {
      console.log(newGameId, 'newGameId没数据')
      fetchMatchDetail()
      fbStore.matchDetailList = {}
    }
  }
)
watch(
  () => liveStore.liveRoom.orderList,
  (newOrderList) => {
    // console.log(newOrderList.length, oldOrderList, 'newOrderList,oldOrderList')
    if (newOrderList && newOrderList.length > 0) {
      // console.log('111')
      isCloseTwo.value = true
    }
  },
  { deep: true, immediate: true }
)
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      console.log('系统繁忙，稍后重试')
    }
  }
  skeletonLoading.value = true
  await fetchMatchDetail()
  skeletonLoading.value = false
  startTimer()
  // getVideoList().then((res) => {
  //     videoList.value = res.video3.concat(res.video5)
  // })
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
  if (liveStore.liveRoom.gameId) {
    await fbStore.getMatchDetail({
      matchId: liveStore.liveRoom.gameId
    })
  }
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

const giftListData = async () => {
  try {
    let res = await getGiftList({})
    giftData.value = res.data.list
    liveStore.listGift = res.data.list
  } catch (error) {
    console.log(error)
  }
}
//监听是否登录
watch(
  () => user.userInfo.userName,
  () => {
    if (user.userInfo.userName) {
      giftListData()
      fbStore.getFBToken()
    }
  }
)
</script>

<style lang="scss" scoped>
.box {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
  height: 700px;
  border-radius: 10px;
  // background-color: red;
  background: rgba(29, 34, 60, 1);
  box-shadow: 0px 4px 20px -1px rgba(0, 0, 0, 0);
  backdrop-filter: blur(25px);
  position: relative;
}
.boxMian {
  margin-top: 30px;
  display: flex;
  // align-items: center;
  justify-content: space-between;
  .videoLeft {
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 73px;
      padding-left: 20px;
      .anchorImg {
        width: 46px;
        height: 46px;
        .fcImg {
          width: 46px;
          height: 46px;
          border: 2px solid var(--unnamed, #f35f1b);
          border-radius: 50%;
        }
      }
      .name {
        color: var(--100, #fff);

        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 6px;
        max-width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .ranks {
        display: flex;
        align-items: center;
        margin-right: 156px;
        .t1 {
          color: var(--100, #fff);
          text-align: center;

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        img {
          width: 24px;
          height: 24px;
        }
        .score {
          color: var(--100, #fff);
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .have {
          display: flex;
          align-items: center;
          margin: 0 30px;
        }
        .haves {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 30px;
        }
      }
    }
    .playV {
      position: relative;
      min-width: 989px;
      height: 555px;
    }
    .spinner {
      height: 40px;
      font-size: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .spinner > div {
      background-color: #fff;
      height: 100%;
      width: 6px;
      margin-right: 3px;
      display: inline-block;
      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .spinner .rect3 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    .spinner .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .spinner .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
      0%,
      40%,
      100% {
        -webkit-transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1);
      }
    }

    @keyframes sk-stretchdelay {
      0%,
      40%,
      100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
        -webkit-transform: scaleY(1);
      }
    }
    .below {
      display: flex;
      align-items: center;
      justify-content: end;
      height: 73px;
      .chatBtn {
        min-width: 110px;
        height: 36px;
        flex-shrink: 0;
        border-radius: 90px 0px 0px 90px;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        color: var(--100, #fff);

        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 5px;
      }
    }
  }
  .videoRight {
    width: 330px;
    height: 700px;
    border-radius: 10px;
    background: linear-gradient(0deg, #1d223c 0%, #1d223c 100%), url(<path-to-image>),
      lightgray 0% 0% / 100px 100px repeat,
      linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(217, 217, 217, 0.04) 100%);
    box-shadow: 0px 4px 20px -1px rgba(0, 0, 0, 0);
    backdrop-filter: blur(25px);
  }
  .point {
    margin-right: 22px;
  }
  .tooltip-base-box .box-item {
    margin-top: 10px;
  }
  .TBicon {
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px; /* 100% */
    margin-right: 10px;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
    }
    p {
      color: #fff;
      margin-top: 6px;
      opacity: 0.5;
    }
  }

  .p1 {
    color: var(--100, #fff);
    text-align: justify;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  .p2 {
    color: var(--60, rgba(255, 255, 255, 0.6));
    text-align: justify;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
  }
}
.giftDiv {
  width: 973px;
  height: 202px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.65);
  // background: rgba(255,144, 0, 0.65);
  position: absolute;
  top: 420px;
  left: 8px;
  z-index: 200;
  .colseIcon {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    fill: #fff;
    z-index: 100;
  }
}
.orange {
  color: var(--unnamed, #f35f1b);
}
.greem {
  color: var(--unnamed, #008000);
}
.pushOrder {
  max-width: 680px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.5);
  // background: rgba(255,144, 0, 0.65);
  position: absolute;
  top: 460px;
  right: 360px;
  z-index: 100;
  .pushColse {
    position: absolute;
    top: 2px;
    right: 12px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    fill: #fff;
    z-index: 100;
  }
}
.follower {
  width: 286px;
  height: 40px;
  flex-shrink: 0;
  color: #fff;
  font-size: 15px;

  margin: 0 auto 20px auto;
  button {
    width: 286px;
    height: 40px;
    flex-shrink: 0;
    background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
    border-radius: 6px;
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>
<style></style>
