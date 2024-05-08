<template>
  <div class="lucky-wheel-view">
    <div class="background">
      <img class="banner" :src="getImg(config?.activityConfig.activityTopApp || '')" />
      <div class="img-box">
        <div
          class="turntable-img"
          :style="{
            backgroundImage: `url(${
              config?.turntableConf.appTurntableImg
                ? getImg(config?.turntableConf.appTurntableImg)
                : defaultImg
            })`,
            transform: `rotate(${state.degNum}deg)`,
            width: '320px',
            height: '320px'
          }"
        >
          <div class="lottery-box" style="top: -20px; left: -6px">
            <div
              class="num-item"
              v-for="(item, index) in config?.turntableConf.turntableGifts"
              :key="index"
              :class="['num-item' + index]"
              :style="item"
            >
              <img height="35" class="lottery-img" :src="getImg(item.giftImg || '')" />
              <span style="font-size: 12px" class="num-item-text">
                {{ item.giftAmount.toLocaleString() }}
              </span>
              <div style="font-size: 9px" class="num-item-name">{{ item.giftName }}</div>
            </div>
          </div>
        </div>
        <img
          style="width: 100px; height: 100px"
          class="l-circle-btn"
          :src="getImg(config?.turntableConf.appPointerImg || '')"
          @click="handlePreStartClick"
        />
        <img
          style="bottom: -50px"
          width="250"
          height="90"
          class="base"
          :src="getImg(config?.turntableConf.appBackImg || '')"
        />
        <img
          style="top: 265px"
          class="foreground-img"
          :src="getImg(config?.turntableConf.appFrontImg || '')"
        />
      </div>
      <div class="content">
        <div v-if="isLogin || token" class="limit-box">
          <div class="limit">
            <span class="number">{{ $t('Activity.LuckyWheel.Current', { num }) }}</span>
          </div>
          <p class="text" @click="recordDom.showPopup()">
            {{ $t('Activity.LuckyWheel.ViewLotteryRecords') }}
          </p>
        </div>
        <div v-if="listOfWinners.length">
          <h2 class="title">— {{ $t('Activity.LuckyWheel.WinningList') }} —</h2>
          <div class="list-of-winners">
            <div
              class="item"
              v-for="(item, index) in listOfWinners"
              :key="index"
              :style="{ transform: `translateY(${position}px)` }"
            >
              <div class="mes-box">
                <span>{{ $t('Activity.LuckyWheel.CongratulationsS') }}</span> &nbsp;
                <span>{{ maskString(item.memberUserName) }}</span> &nbsp;
                <span>{{ $t('Activity.LuckyWheel.Drawn') }}</span> &nbsp; {{ item.giftName }}:
                &nbsp; <span class="number">{{ item.giftAmount.toLocaleString() }}</span
                >{{ $t('Iletter.moneySite') }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 class="title">— {{ $t('Fletter.Activities') }} —</h2>
          <div v-for="(item, index) in contentData" :key="index">
            <p class="activity-text" v-if="item.type == 1">{{ item.content }}</p>
            <img v-else class="activity-img" :src="getImg(item.appImg || '')" />
          </div>
        </div>
        <div class="rule">
          <h2 class="title">— {{ $t('Fletter.ActivityRules') }} —</h2>
          <div v-for="(item, index) in ruleData" :key="index">
            <p class="activity-text" v-if="item.type == 1">{{ item.content }}</p>
            <img v-else class="activity-img" :src="getImg(item.appImg || '')" />
          </div>
        </div>
      </div>
    </div>
    <Record ref="recordDom" />
    <LotteryPopUp ref="lotteryPopUpDom" :data="winningInfo" />
  </div>
</template>

<script setup>
import {
  getTurntableDetail,
  getTurntablePrize,
  getTurntableUserNum,
  getTurntableRecord
} from '@/api/promotion.js'
import { getImg } from '@/utils'
import { getToken } from '@/utils/cache'
import Record from './components/Record'
import LotteryPopUp from './components/LotteryPopUp'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import i18n from '@/i18n'
import defaultImg from './img/default.png'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const route = useRoute()
const isLogin = getToken()
const config = ref()
const num = ref()
const recordDom = ref(null)
const lotteryPopUpDom = ref(null)
const winningInfo = ref({})
const { activityId } = route.query
const listOfWinners = ref([])
const position = ref(0) // 初始滚动位置
const scrollItemHeight = ref(40) // 每个元素的高度
const idx = ref(0)
const scrollInterval = ref()
const { isEmbeddedInMobile, token } = useMobileEvent()

const init = async () => {
  await getTurntableDetail({ activityId }).then((res) => {
    config.value = res.data
  })

  if (isLogin || token) {
    getTurntableUserNum({ activityId }).then((res) => {
      if (res.code === 200) {
        num.value = res.data
      }
    })
  }

  getLotteryRecords()

  // 初始化奖品位置
  getStyle()
}
init()

const getLotteryRecords = () => {
  getTurntableRecord({ activityId: activityId, pageNum: 1, pageSize: 50 }).then((res) => {
    listOfWinners.value = res.data?.records || []
    if (res.data?.records.length > 6) {
      clearInterval(scrollInterval.value)
      position.value = 0
      idx.value = 0
      startScroll()
    }
  })
}

// 状态数据
const state = reactive({
  isStart: false,
  circleNum: 0,
  currentLottery: {},
  degNum: 180
})

const lotteryList = computed(() => config.value?.turntableConf.turntableGifts)

const contentData = computed(() => {
  if (config.value?.activityConfig.activityContent) {
    return JSON.parse(config.value?.activityConfig.activityContent)
  }
})
const ruleData = computed(() => {
  if (config.value?.activityConfig.activityRule) {
    return JSON.parse(config.value?.activityConfig.activityRule)
  }
})
// 计算奖品位置样式
function getStyle() {
  const w = 330 // 原型的宽度
  const len = lotteryList.value?.length
  const dotLeft = (w - 100) / 2
  const dotTop = (w - 100) / 2
  const radius = w / 2
  const avd = 360 / len
  const ahd = (avd * Math.PI) / 180
  lotteryList.value?.forEach((item, index) => {
    item.left = Math.sin(ahd * index) * radius + dotLeft + 'px'
    item.top = Math.cos(ahd * index) * radius + dotTop + 'px'
    let deg = 180 - index * (360 / len) + 'deg'
    item.transform = `rotate(${deg})`
    item.width = '100px'
    item.height = '100px'
    item.paddingTop = '125px'
  })
}

// 处理开始按钮点击事件
const startClick = () => {
  if (!state.isStart) {
    state.isStart = true
    state.circleNum += 7
    state.isStart = true

    let index
    if (winningInfo.value) {
      index = lotteryList.value.findIndex((item) => item.id === winningInfo.value.giftId)
    } else {
      // 有多种情况会导致抽不到奖，接口返回null时，找到奖品金额为 0 的元素的下标
      index = lotteryList.value.findIndex((item) => item.giftAmount === 0)
    }
    state.degNum = state.circleNum * 360 + index * (360 / lotteryList.value.length) + 180

    setTimeout(() => {
      lotteryPopUpDom.value.showPopup()
      getLotteryRecords()
    }, 4500)
    state.isStart = false
  }
}

// 处理开始按钮点击
const handlePreStartClick = () => {
  if ((!isLogin && !token) || isEmbeddedInMobile) {
    lotteryPopUpDom.value.showPopup(true)
    return
  }
  if (!num.value) {
    showToast(i18n.global.t('Activity.LuckyWheel.NoAvailableChances'))
    return
  }
  getTurntablePrize({ activityId }).then((res) => {
    if (res.code === 200) {
      winningInfo.value = res.data
      startClick()
      num.value--
    }
  })
}

const startScroll = () => {
  scrollInterval.value = setInterval(() => {
    if (position.value < -scrollItemHeight.value * (listOfWinners.value.length - 10)) {
      listOfWinners.value.push(listOfWinners.value[idx.value])
      idx.value++
    }
    setTimeout(() => {
      position.value -= scrollItemHeight.value
    }, 300)
  }, 2000) // 2秒滚动一个元素的高度
}
const maskString = (str) => {
  const lastChar = str.substring(str.length - 3)
  const maskedMiddle = '****'

  return maskedMiddle + lastChar
}
</script>

<style lang="scss" scoped>
.lucky-wheel-view {
  overflow-x: hidden;
  .background {
    width: 100%;
    background-image: url('./img/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    .banner {
      width: 100%;
      height: 160px;
    }

    .img-box {
      display: flex;
      justify-content: center;
      position: relative;
      margin-bottom: 80px;
      .turntable-img {
        position: relative;
        z-index: 2;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 4s;
        .lottery-box {
          position: relative;

          .num-item {
            position: absolute;
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #ad5600;
            .num-item-name {
              font-size: 9px;
              font-weight: 600;
              margin: 3px 0;
              word-wrap: break-word;
              width: 55px;
              text-align: center;
            }

            .num-item-text {
              color: #ad5600;
              font-size: 12px;
              font-weight: 800;
            }
          }
        }
      }
      .base {
        position: absolute;
        z-index: 1;
      }
      .foreground-img {
        position: absolute;
        z-index: 2;
        width: 400px;
        height: 150px;
      }
      .l-circle-btn {
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -55%);
        width: 70px;
        height: 85px;
      }
    }
    .content {
      @include mobile-padding();
      padding-bottom: 40px;
      .limit-box {
        width: 185px;
        margin: auto;
        text-align: center;
        .limit {
          width: 185px;
          height: 50px;
          border-radius: 200px;
          background: #edd6b4;
          line-height: 50px;
          color: #965f03;
          font-size: 18px;
        }
        .number {
          color: var(---1, #f53f3f);
          font-weight: 600;
        }
        .text {
          color: #666;
          font-size: 14px;
          margin: 15px 0 50px 0;
        }
      }
      .title {
        color: #333;
        text-align: center;
        margin-bottom: 30px;
      }
      .rule {
        margin-top: 30px;
      }
      .activity-img {
        width: 100%;
      }
      .list-of-winners {
        width: 100%;
        overflow: hidden;
        text-align: center;
        margin-bottom: 20px;
        max-height: 250px;
        padding-bottom: 10px;
        .item {
          width: 345px;
          height: 40px;
          line-height: 40px;
          transition: transform 1s ease-in-out;
          cursor: pointer;
          color: #333;

          .number {
            color: var(---2, #ff5000);
          }
          .mes-box {
            @include textToOmit(330px);
          }
        }
        .item::after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(114, 114, 114, 0) 0%,
            #727272 47.97%,
            rgba(114, 114, 114, 0) 99.94%
          );
        }
      }
      .activity-text {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        word-wrap: break-word;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
