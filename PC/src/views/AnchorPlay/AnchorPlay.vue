<template>
  <div class="boxPlay">
    <div class="playMain">
      <div class="palyHeader">
        <div class="headerLeft">
          <div class="leftTop">
            <div
              :class="[currenTab == index ? 'actvie tabDiv' : 'tabDiv']"
              @click="tabBtn(index)"
              v-for="(item, index) in tabList"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="leftMain">
            <DocumentaryRecords v-if="currenTab == 0" />
            <GiftList v-show="currenTab == 1" />
          </div>
        </div>
        <div class="headerCen">
          <div class="ranks" v-if="anchorDebut.roomStyle == 1 || anchorDebut.roomStyle == 2">
            <div class="t1">{{ anchorDebut.mainName }}</div>
            <img :src="getIntercept(anchorDebut.icons, 0)" style="margin-left: 5px" />
            <div class="score" style="margin-left: 35px">{{  fbStore.matchDetailList?.nsg?fbStore.matchDetailList?.nsg[0]?.sc[0]:0}}</div>
            <div class="have">
              <playIcon />
              <span class="t1" style="font-size: 12px; margin-left: 5px">{{
                getMatchStatus(fbStore.matchDetailList, fbStore)
              }}</span>
            </div>
            <div class="score">{{ fbStore.matchDetailList?.nsg?fbStore.matchDetailList?.nsg[0]?.sc[1]:0}}</div>
            <img style="margin-left: 35px" :src="getIntercept(anchorDebut.icons, 1)" />
            <div class="t1" style="margin-left: 5px">{{ anchorDebut.cusName }}</div>
          </div>
          <div class="ranks" v-else>
            <div class="t1" style="font-size: 18px">{{ anchorDebut.roomTitle }}</div>
          </div>
          <div class="cenMain">
            <TcVideo
              :width="1314"
              :height="740"
              :anchorUrl="anchorDebut.webrtcPullUrl"
              :anchorType="1"
              v-if="anchorDebut.webrtcPullUrl"
            />
            <div class="btnList">
              <div
                class="pushOrder"
                @click="pushOrderBtn"
                v-if="anchorDebut.roomStyle == 1 || anchorDebut.roomStyle == 3"
              >
                {{$t('AnchorPlay.PushOrders')}}
              </div>
              <div class="pushOrder stopPaly" @click="stopPaly">{{$t('AnchorPlay.StopLivebroadcast')}}</div>
            </div>
          </div>
          <!-- 推单卡片 -->
          <div class="cardList" v-if="isShow && orderList && orderList.length > 0">
            <div class="pushColse">
              <el-icon @click="closeBtnIc" style="font-size: 20px; color: #fff">
                <Close />
              </el-icon>
            </div>
            <AnchorPushList :orderList="orderList" />
          </div>
        </div>
        <div class="headerRight">
          <div class="rightTop">
            <div>{{$t('AnchorPlay.Chat')}}</div>
          </div>
          <div class="rightMain">
            <!-- <img src="./img/bgRoom01.png" /> -->
            <ChatRoom v-if="roomStatus && chatStore.chatRoomConfig?.chatRoomEnable==1" class="room" :heightType="2" :key="anchorDebut.id" />
          </div>
        </div>
        <GiftListVideo style="position: absolute; left: 69%" />
      </div>
    </div>
    <CustomizeDialog
      :dialogShow="dialogShow"
      @closeBtn="closeBtn"
      :title="$t('AnchorPlay.PleseSelectGameplay')"
      v-if="dialogShow"
    >
      <PushOrder v-if="dialogShow" @closeDialog="closeDialog" />
    </CustomizeDialog>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  </div>
</template>

<script setup>
 import i18n from '@/i18n'   
import playIcon from '@/components/icons/playIcon.vue'
import TcVideo from '@/components/Video/TcVideo.vue'
import GiftListVideo from '@/components/GiftListVideo/GiftListVideo.vue'
import DocumentaryRecords from './components/DocumentaryRecords.vue'
import GiftList from './components/GiftList.vue'
import AnchorPushList from './components/AnchorPushList.vue'
import PushOrder from './components/PushOrder.vue'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import { onMounted, reactive } from 'vue'
import { getStreamStop, orderListAnchor,getGiftList,getStreamStatus } from '@/api/liveBroadcast'
import { getIntercept, getScore } from '@/utils/cache'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import ChatRoom from '@/components/ChatRoom/ChatRoom.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { getMatchStatus } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
import { useUserStore } from '@/stores/user.js'
import { getUserInfo } from '@/api/user'
import { useChatRoomStore } from '@/stores/chatRoom'
const user = useUserStore()
const chatStore = useChatRoomStore()
const liveStore = useLiveStore()
const dialogShow = ref(false)
const fbStore = useFBStore()
const tabList = reactive([i18n.global.t('AnchorPlay.DocumentationRecords'), i18n.global.t('AnchorPlay.GiftRecord')])
const currenTab = ref(0)
const skeletonLoading = ref(false)
const anchorDebut = ref(JSON.parse(localStorage.getItem('AnchorDebut')))
const orderList = ref([])
const isShow = ref(true)
let obsTime=null
const roomStatus = ref(false)
const tabBtn = (index) => {
  currenTab.value = index
}
const closeBtn = () => {
  dialogShow.value = false
}
const closeDialog = () => {
  dialogShow.value = false
  isShow.value = true
  getOrderListAnchor()
}
//推单
const pushOrderBtn = () => {
  dialogShow.value = true
}
const closeBtnIc = () => {
  isShow.value = false
}
//推单列表
const getOrderListAnchor = async () => {
  let data = {
    liveStreamId: anchorDebut.value.id,
    pushUserId: anchorDebut.value.presenterId,
    pushType: 1
  }
  try {
    let res = await orderListAnchor(data)
    orderList.value = res.data
  } catch (e) {}
}
onMounted(() => {
  liveStore.anchorStatus = 1
  init()
  getOrderListAnchor()
  giftListData()
  chatStore.getChatroomConfig(1)
  getUserInfo().then((res) => {
    user.userInfo = res.data
    roomStatus.value = true
  })
  liveStore.liveRoom=anchorDebut.value
  setTimeout(()=>{
    timeQueryOBS()
  },180000)
  
})
const giftListData = async () => {
  try {
    let res = await getGiftList({})
    liveStore.listGift= res.data.list
  } catch (error) {}
}
//停止直播
const stopPaly = () => {
  ElMessageBox.confirm(i18n.global.t('AnchorPlay.AskQuestion'), i18n.global.t('AnchorPlay.Tips'), {
    confirmButtonText: i18n.global.t('AnchorPlay.Sure'),
    cancelButtonText: i18n.global.t('AnchorPlay.Cancel'),
    type: 'warning'
  })
    .then(() => {
      getStreamStop({ currentRoomCode: anchorDebut.value.roomCode, id: anchorDebut.value.id }).then(
        (res) => {
          if (res.code == 200) {
            ElMessage({
              message: i18n.global.t('AnchorPlay.StopLive'),
              type: 'success'
            })
            setTimeout(() => {
              window.close()
            }, 2000)
          }
        }
      )
    })
    .catch(() => {})
}
onBeforeUnmount(() => {
  stopTimer()
  clearInterval(obsTime)
  obsTime=null
})
//投注 初始化
let timerId = null
let prevMatchInterval = null
watch(
  () => anchorDebut.value?.gameId,
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
//查询obs是否关闭
const queryOBS= async ()=>{
  let data={
    currentRoomCode:anchorDebut.value.roomCode,
    id:anchorDebut.value.id,
    stopType:0,
  }
  try {
    let res = await getStreamStatus(data)
    if(res.data!=='active'){
      getStreamStop({ currentRoomCode: anchorDebut.value.roomCode, id: anchorDebut.value.id }).then(
        (res) => {
          if (res.code == 200) {
            ElMessage({
              message: i18n.global.t('AnchorPlay.StopLive'),
              type: 'success'
            })
            setTimeout(() => {
              window.close()
            }, 2000)
          }
        }
      )
    }
    console.log(res,'queryOBS')
  } catch (error) {
    console.log(error)
  }
}
const timeQueryOBS=()=>{
  clearInterval(obsTime)
  obsTime=null
  obsTime=setInterval(() => {
    queryOBS()
  }, 3000)
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
  if (anchorDebut.value.gameId) {
    await fbStore.getMatchDetail({
      matchId: anchorDebut.value.gameId
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
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .headerCen {
    width: 600px !important;
  }
}

.boxPlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: calc(100vh - 80px);
  background-color: var(--el-overlay-color-lighter);
  overflow: auto;
}
.playMain {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: var(--unnamed, #1d223c);
}
.palyHeader {
  position: relative;
  display: flex;
  align-items: center;
  height: 1000;
  // height: calc(100vh - 80px);
  color: var(--100, #fff);
  
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  .headerLeft {
    width: 268px;
    display: flex;
    flex-direction: column;
    .leftTop {
      height: 80px;
      display: flex;
      align-items: center;
      font-size: 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      .tabDiv {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .actvie {
        color: var(--unnamed, #f35f1b);
      }
      .actvie::before {
        content: '';
        position: absolute;
        width: 134px;
        height: 4px;
        border-radius: 50px;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        top: 78px;
      }
    }
    .leftMain {
      height: calc(100vh - 80px);
      overflow-y: auto;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
    }
  }
  .headerCen {
    width: 1314px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    //   position:relative;
    .ranks {
      display: flex;
      align-items: center;
      height: 80px;
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
        font-weight: 600;
        line-height: normal;
      }
      .have {
        display: flex;
        align-items: center;
        margin: 0 30px;
      }
    }
    .cenMain {
      width: 100%;
      height: calc(100vh - 80px);
      // height: 741px;
    }
    .btnList {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: end;
      margin-right: 20px;
    }
    .pushOrder {
      min-width: 143px;
      height: 56px;
      flex-shrink: 0;
      border-radius: 8px;
      border: 1px solid var(--unnamed, #ff9000);
      color: var(--unnamed, #ff9000);
      
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      cursor: pointer;
    }
    .stopPaly {
      color: var(--unnamed, #f35f1b);
      margin-left: 20px;
    }
  }
  .headerRight {
    width: 340px;
    flex-direction: column;
    position: relative;
    .rightTop {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .rightMain {
      width: 100%;
      height: calc(100vh - 80px);
      // height: 741px;
      //   background: red;
    }
  }
}
.cardList {
  max-width: 680px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.5);
  // background: rgba(255,144, 0, 0.65);
  position: absolute;
  top: 70%;
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
</style>
<style lang="scss">
.room .roomMain {
  height: 680px !important;
}
.room .dialog-box {
  height: 650px !important;
}
.el-message-box {
  background-color: #232949 !important;
  border: none !important;
}
.el-message-box__header {
  background: #323c6f !important;
  .el-message-box__title {
    color: #fff;
  }
  .el-message-box__close {
    color: #fff;
    font-size: 22px;
  }
  .el-message-box__close:hover {
    color: #fff;
  }
}
.el-message-box__content {
  .el-message-box-icon--warning {
    color: #fff;
  }
  .el-message-box__message {
    color: #fff;
  }
}
.el-message-box__btns {
  .el-button {
    border-radius: 4px;
    background: #171a2f;
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
    border: none !important;
    color: rgba(255, 255, 255, 0.8);
  }
  .el-button--primary {
    border-radius: 4px;
    background: linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%) !important;
    border: none !important;
    color: rgba(255, 255, 255, 0.8);
  }
  .el-button:hover {
    border: none !important;
    color: #fff;
  }
}
</style>
