<template>
  <div class="box">
    <div class="boxMian">
      <!-- 左边 -->
      <div class="videoLeft">
        <div class="top" v-if="isShow">
          <div class="ranks">
            <div class="t1" v-if="liveStore.liveRoom?.ts">{{ liveStore.liveRoom.ts[0]?.na }}</div>
            <img
              v-if="liveStore.liveRoom?.ts"
              :src="liveStore.liveRoom?.ts[0]?.lurl"
              style="margin-left: 4px"
            />
            <div class="score" style="margin-left: 35px" v-if="liveStore.liveRoom?.nsg">
              {{ liveStore.liveRoom?.nsg[0]?.sc[0] }}
            </div>
            <div class="score" style="margin-left: 35px" v-else>0</div>
            <div class="have">
              <playIcon v-if="liveStore.liveRoom?.ms == 5" />
              <span class="t1" style="font-size: 12px; margin-left: 4px">{{
                getMatchStatus(liveStore.liveRoom, fbStore)
              }}</span>
            </div>
            <div class="score" style="margin-right: 40px" v-if="liveStore.liveRoom?.nsg">
              {{ liveStore.liveRoom.nsg[0]?.sc[1] }}
            </div>
            <div class="score" style="margin-right: 40px" v-else>0</div>
            <img v-if="liveStore.liveRoom?.ts" :src="liveStore.liveRoom.ts[1]?.lurl" />
            <div v-if="liveStore.liveRoom?.ts" class="t1" style="margin-left: 4px">
              {{ liveStore.liveRoom?.ts[1]?.na }}
            </div>
          </div>
          <div></div>
        </div>
        <div class="playV" :style="{ width: `${isWidth}px`, height: `${isHeight}px` }">
          <template
            v-if="
              [5, 8].includes(liveStore.liveRoom?.ms) ||
              (modeCurr === 1 && liveStore.liveRoom?.as?.[0])
            "
          >
            <TcVideo
              v-if="fbStore.videoSource === 'video1' && modeCurr === 0"
              :width="isWidth"
              :height="isHeight"
              :anchorUrl="iframeURL"
              :loop="false"
              :anchorType="1"
              :key="iframeURL"
            />
            <iframe
              v-else
              :style="{ width: `${isWidth}px`, height: `${isHeight}px` }"
              :src="iframeURL"
              scrolling="no"
              frameborder="0"
              allow="autoplay"
              allowfullscreen="true"
            />
          </template>
          <div
            v-else
            :style="{ width: `${isWidth}px`, height: `${isHeight}px`, position: 'relative' }"
          >
            <xgVideo v-if="liveStore.liveRoom?.ms != 5" :width="isWidth" :height="isHeight" />
          </div>
        </div>
        <div class="below">
          <div class="belowLeft">
            <!-- 线路 -->
            <div v-if="lineList.length > 1" class="switchLine">
              <div class="lt1">{{ $t('HomeView.SwitchLines') }}：</div>
              <div class="lineBg">
                <div
                  :class="[lineCurr === item.value ? 'lineTxt lineAcive' : 'lineTxt']"
                  v-for="item in lineList"
                  :key="item.value"
                  @click="lineBtnTab(item.value)"
                >
                  {{ item.label }}
                </div>
              </div>
            </div>
            <!-- 播放模式 -->
            <div class="switchBfMode">
              <div class="lt1">{{ $t('HomeView.PlayMode') }}：</div>
              <div class="modeBg">
                <div
                  :class="[{ modeActive: modeCurr === index }, 'modeBtn']"
                  v-for="(item, index) in modeList"
                  :key="index"
                  @click="modeBtnTab(index)"
                >
                  <videotape v-if="index == 0" />
                  <resource v-if="index == 1" />
                  <div>{{ item }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="belowRight">
            <div
              class="TBicon"
              @click="sunbathingBtn"
              v-if="user.userInfo.userName && user.userInfo.role === 0"
            >
              <img src="../../../assets/img/TBicon03.png" />
              <p>{{ $t('HomeView.Postorders') }}</p>
            </div>
            <div
              class="TBicon"
              @click="lookSunbathingBtn"
              v-if="user.userInfo.userName && user.userInfo.role === 0"
            >
              <img src="../../../assets/img/TBicon02.png" />
              <p>{{ $t('HomeView.OnlyLookAtTheOrders') }}</p>
            </div>
            <div class="point">
              <AnchorPrompt />
            </div>
            <div class="chatBtn" @click="retractBtn">{{ $t('HomeView.HideChatRoom') }}</div>
          </div>
        </div>
      </div>
      <div class="videoRight" v-show="isShow">
        <LiveBroadcastLift />
      </div>
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
import { useLiveStore } from '@/stores/liveBroadcast'
import playIcon from '@/components/icons/playIcon.vue'
import { getSatelliteList } from '@/api/liveBroadcast'
import LiveBroadcastLift from '@/components/LiveBroadcastLift/LiveBroadcastLift.vue'
import { getMatchStatus } from '@/hooks/useSportDict'
import { onMounted, reactive, watchEffect } from 'vue'
import AnchorPrompt from '@/components/AnchorPrompt/AnchorPrompt.vue'
import xgVideo from '@/components/Video/xgVideo.vue'
import resource from '@/components/icons/resource.vue'
import videotape from '@/components/icons/videotape.vue'
import Sunbathing from '@/components/Sunbathing/Sunbathing.vue'
import SeeSunbathing from '@/components/SeeSunbathing/SeeSunbathing.vue'
import { useUserStore } from '@/stores/user.js'
import { useFBStore } from '@/stores/fb'
import { iframeVider } from '@/utils/cache'
const modeCurr = ref(0)
const user = useUserStore()
const fbStore = useFBStore()
const liveStore = useLiveStore()
const isShow = ref(true)
const isWidth = ref('989')
const isHeight = ref('555')
const dialogShow = ref(false)
const dialogShowTwo = ref(false)
const skeletonLoading = ref(false)
const iframeURL = ref('')

watchEffect(() => {
  if (liveStore.liveRoom.id) {
    if (modeCurr.value == 0) {
      if (fbStore.videoSource === 'video1' && liveStore.liveRoom?.liveFlv) {
        const url = liveStore.liveRoom.liveFlv.split(',')[0]
        iframeURL.value = url
      } else if (fbStore.videoSource === 'video2' && liveStore.liveRoom?.liveUrl) {
        iframeURL.value = iframeVider(liveStore.liveRoom.liveUrl, 1)
      }
    } else {
      if (liveStore.liveRoom?.as?.[0]) {
        iframeURL.value = liveStore.liveRoom?.as?.[0]
      }
    }
  } else {
    iframeURL.value = ''
  }
})

// const iframeURL = computed(() => {
//   if (liveStore.liveRoom.id) {
//     if (modeCurr.value == 0) {
//       if (fbStore.videoSource === 'video1' && liveStore.liveRoom?.liveFlv) {
//         // 破晓视频源取liveFlv字段
//         const url = liveStore.liveRoom.liveFlv.split(',')[0]
//         return url
//       } else if (fbStore.videoSource === 'video2' && liveStore.liveRoom?.liveUrl) {
//         // PM视频源取liveUrl字段
//         return iframeVider(liveStore.liveRoom.liveUrl, 1)
//       }
//       return liveStore.liveRoom?.animationUrl
//     } else {
//       if (liveStore.liveRoom?.animationUrl) {
//         return liveStore.liveRoom?.animationUrl
//       }
//       return iframeVider(liveStore.liveRoom?.liveFlv, 1)
//     }
//   }
// })
onMounted(() => {
  init()
  getSatelliteData()
})

const lineList = computed(() => {
  const keys = Object.keys(liveStore.videoSourceGather)
  const processedArray = keys.map((key, index) => {
    return {
      label: `${i18n.global.t('HomeView.Line')}${index + 1}`, // 生成 "线路1", "线路2" 等标签
      value: index + 1 // 生成相应的值
    }
  })

  return processedArray
})
const lineCurr = ref(1)
const modeList = reactive([i18n.global.t('HomeView.Video'), i18n.global.t('HomeView.Animation')])

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
const sunbathingBtn = () => {
  dialogShow.value = true
}
const lookSunbathingBtn = () => {
  dialogShowTwo.value = true
}
const sunbathingShow = () => {
  dialogShow.value = false
}
const seebathingShow = () => {
  dialogShowTwo.value = false
}
const getSatelliteData = async () => {
  try {
    let res = await getSatelliteList()
    liveStore.videoSourceGather = res.data
    liveStore.videoSource = res.data[fbStore.videoSource]
  } catch (e) {
    console.log('有错误')
  }
}
const lineBtnTab = (index) => {
  lineCurr.value = index
  liveStore.videoSource = liveStore.videoSourceGather[fbStore.videoSource]
  fbStore.videoSource = `video${index}`
}

const modeBtnTab = (index) => {
  modeCurr.value = index
}
const getVideoSourceUrl = (fbId) => {
  console.log(fbId, 'fbId111', liveStore.videoSource)
  if (liveStore.videoSource && liveStore.videoSource.length > 0) {
    let url = liveStore.videoSource.find((source) => Number(source.fbId) == fbId)?.liveUrl
    console.log(url, 'getVideoSourceUrl', fbId)
    if (url) {
      return url
    }
    return ''
  }
  return ''
}
//投注 初始化
let timerId = null
let prevMatchInterval = null
watch(
  () => liveStore.liveRoom?.id,
  (newGameId) => {
    console.log(newGameId, 'newGameId')
    if (newGameId) {
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
  if (liveStore.liveRoom.id) {
    await fbStore.getMatchDetail({
      matchId: liveStore.liveRoom.id
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
onBeforeUnmount(() => {
  stopTimer()
})
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
      justify-content: center;
      height: 73px;
      padding-left: 20px;
      .anchorImg {
        width: 50px;
        height: 50px;
        .fcImg {
          width: 50px;
          height: 50px;
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
      }
      .ranks {
        display: flex;
        align-items: center;
        // margin-left: 168px;
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
      min-width: 989px;
      height: 555px;
      // background-color: red;
    }
    .below {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 73px;
      .belowLeft {
        padding-left: 30px;
        display: flex;
        align-items: center;
        .switchLine {
          display: flex;
          align-items: center;
          margin-right: 30px;
          .lineBg {
            margin-left: 10px;
            width: 120px;
            height: 34px;
            flex-shrink: 0;
            border-radius: 90px;
            background: #0f111e;
            display: flex;
            align-items: center;
            justify-content: center;
            .lineTxt {
              width: 60px;
              height: 34px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--60, rgba(255, 255, 255, 0.6));

              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              cursor: pointer;
            }
            .lineAcive {
              color: var(--100, #fff);
              border-radius: 90px;
              background: var(--unnamed, #ff9000);
              // transition: all 0.3s ease-in-out;
            }
          }
        }
        .switchBfMode {
          display: flex;
          align-items: center;
          .modeBg {
            min-width: 140px;
            height: 34px;
            flex-shrink: 0;
            border-radius: 90px;
            background: #0f111e;
            display: flex;
            align-items: center;
            .modeBtn {
              min-width: 70px;
              padding: 0 8px;
              height: 34px;
              flex-shrink: 0;
              color: var(--60, rgba(255, 255, 255, 0.6));

              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              svg {
                opacity: 0.8;
                margin-right: 4px;
              }
            }
            .modeActive {
              color: var(--100, #fff);
              border-radius: 90px;
              background: var(--unnamed, #ff9000);
              svg {
                opacity: 1;
              }
            }
          }
        }
        .lt1 {
          color: var(--100, #fff);

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
        }
      }
      .belowRight {
        display: flex;
        align-items: center;
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
        .point {
          margin-right: 20px;
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
}
</style>
