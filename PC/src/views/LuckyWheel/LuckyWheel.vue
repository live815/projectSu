<template>
  <div class="lucky-wheel-view">
    <div class="background">
      <img class="top-img" :src="getImgUrl(config?.activityConfig.activityTopWeb)" />
      <div class="img-box">
        <div
          class="turntable-img"
          :style="{
            backgroundImage: `url(${
              config?.turntableConf.webTurntableImg
                ? getImgUrl(config?.turntableConf.webTurntableImg)
                : defaultImg
            })`,
            transform: `rotate(${state.degNum}deg)`
          }"
        >
          <div class="lottery-box">
            <div
              class="num-item"
              v-for="(item, index) in config?.turntableConf.turntableGifts"
              :key="index"
              :class="['num-item' + index]"
              :style="item"
            >
              <img class="lottery-img" :src="getImgUrl(item.giftImg)" />
              <span class="num-item-text">{{
                site === 'vietnam' ? formatNumberToK(item.giftAmount) : item.giftAmount
              }}</span>
              <div class="num-item-name">{{ item.giftName }}</div>
            </div>
          </div>
        </div>
        <img
          class="l-circle-btn"
          :src="getImgUrl(config?.turntableConf.webPointerImg)"
          @click="handlePreStartClick"
        />
        <img class="base" :src="getImgUrl(config?.turntableConf.webBackImg)" />
        <img class="foreground-img" :src="getImgUrl(config?.turntableConf.webGiftImg)" />
      </div>
      <div class="content">
        <div v-if="isLogin" class="limit-box">
          <div class="limit">
            <span v-html="$t('LuckyWheel.Current', { num })"></span>
          </div>
          <p class="text" @click="getRecord">{{ $t('LuckyWheel.LotteryRecords') }}</p>
        </div>
        <div class="content-and-list">
          <div
            class="activities activities-top"
            :class="{ 'only-activities-content': !listOfWinners.length }"
          >
            <div class="title title-top">
              <div class="dots"></div>
              <div class="text">{{ $t('FirstChargeView.Activities') }}</div>
              <div class="dots"></div>
            </div>
            <div v-for="(item, index) in contentData" :key="index">
              <p class="content-text" v-if="item.type == 1">{{ item.content }}</p>
              <img class="content-img" v-else :src="getImgUrl(item.webImg)" />
            </div>
          </div>

          <div v-if="listOfWinners.length" class="activities activities-top">
            <div class="title title-top">
              <div class="dots"></div>
              <div class="text">{{ $t('LuckyWheel.WinningList') }}</div>
              <div class="dots"></div>
            </div>
            <div>
              <div class="list-box">
                <div
                  class="item"
                  :style="{ transform: `translateY(${position}px)` }"
                  v-for="(item, index) in listOfWinners"
                  :key="index"
                >
                  <div class="mes-box">
                    <span>{{ $t('LuckyWheel.CongratulationsS') }}</span>
                    <span>{{ maskString(item.memberUserName) }}</span> &nbsp;&nbsp;
                    <span>{{ $t('LuckyWheel.Drawn') }}</span> &nbsp; {{ item.giftName }}：
                    <span>
                      {{ item.giftAmount?.toLocaleString() }}{{ $t('Components.Currency') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="activities rule-box">
          <div class="title">
            <div class="dots"></div>
            <div class="text">{{ $t('FirstChargeView.ActivityRules') }}</div>
            <div class="dots"></div>
          </div>
          <div v-for="(item, index) in ruleData" :key="index">
            <p class="rule-text" v-if="item.type == 1">{{ item.content }}</p>
            <img v-else :src="getImgUrl(item.webImg)" />
          </div>
        </div>
      </div>
    </div>
    <CustomizeDialog
      v-if="hintPopUp"
      class="popUp"
      :dialogShow="hintPopUp"
      :width="480"
      :title="$t('LuckyWheel.WinningTip')"
      @closeBtn="hintPopUp = false"
    >
      <p class="text">
        <span v-if="winningInfo?.giftAmount">{{ $t('LuckyWheel.Winner') }}</span>
        <span v-else>{{ $t('LuckyWheel.persistent') }}</span>
      </p>

      <p v-if="winningInfo?.giftAmount" class="number">
        <CurrencyUnit /> {{ winningInfo?.giftAmount?.toLocaleString() }}
      </p>
      <button class="btn knew" @click="hintPopUp = false">{{ $t('LuckyWheel.ISee') }}</button>
    </CustomizeDialog>
    <CustomizeDialog
      class="record-popUp"
      v-if="winningRecordPopUp"
      :dialogShow="winningRecordPopUp"
      :width="800"
      :title="$t('LuckyWheel.LotteryRecords')"
      @closeBtn="winningRecordPopUp = false"
    >
      <Table v-if="winningRecord.length" :tableData="tableData" class="tableStyle"></Table>
      <template v-else>
        <div class="top">
          <p>{{ $t('LuckyWheel.Number') }}</p>
          <p>{{ $t('LuckyWheel.PrizeWon') }}</p>
          <p>{{ $t('LuckyWheel.WinningTime') }}</p>
        </div>
        <img class="no-data" :src="noData" />
        <p class="text">{{ $t('LuckyWheel.NoData') }}</p>
      </template>
    </CustomizeDialog>
  </div>
</template>

<script setup>
import {
  getTurntableDetail,
  getTurntablePrize,
  getTurntableUserNum,
  getTurntableUserRecord,
  getTurntableRecord,
  getActivityDetil
} from '@/api/promotion.js'
import { getImgUrl } from '@/utils'
import { useRoute } from 'vue-router'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import Table from '@/components/Table/Table.vue'
import noData from './img/noData.png'
import { ElMessage } from 'element-plus'
import { WarningFilled } from '@element-plus/icons-vue'
import i18n from '@/i18n'
import defaultImg from './img/default.png'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const route = useRoute()
const isLogin = computed(() => user.isLogin)
const config = ref()
const num = ref(0)
const winningInfo = ref({})
const winningRecord = ref([])
const winningRecordPopUp = ref(false)
const hintPopUp = ref(false)
const listOfWinners = ref([])
const position = ref(0) // 初始滚动位置
const scrollItemHeight = ref(45) // 每个元素的高度
const idx = ref(0)
const scrollInterval = ref()
let site = import.meta.env.VITE_SITE

const { activityId, advertiseId, type } = route.query
const init = async () => {
  await getTurntableDetail({ activityId: activityId }).then((res) => {
    config.value = res.data
  })

  if (isLogin.value) {
    getTurntableUserNum({ activityId: activityId }).then((res) => {
      if (res.code === 200) {
        num.value = res.data
      }
    })
  }
  getActivityDetil({ activityId, advertiseId, deviceType: 1, enterLocation: Number(type) })
  getLotteryRecords()

  // 初始化奖品位置
  getStyle()
}
init()

const getLotteryRecords = () => {
  getTurntableRecord({ activityId: activityId, pageNum: 1, pageSize: 50 }).then((res) => {
    listOfWinners.value = res.data?.records || []
    if (res.data?.records.length > 9) {
      clearInterval(scrollInterval.value)
      position.value = 0
      idx.value = 0
      startScroll()
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

const getRecord = () => {
  getTurntableUserRecord({ activityId: route.query.activityId }).then((res) => {
    winningRecord.value = res.data
    winningRecordPopUp.value = true
  })
}

const tableData = computed(() => {
  const columns = [
    { id: 1, label: i18n.global.t('LuckyWheel.Number') },
    { id: 2, label: i18n.global.t('LuckyWheel.PrizeWon') },
    { id: 3, label: i18n.global.t('Activity.LuckyWheel.winningAmount') },
    { id: 4, label: i18n.global.t('LuckyWheel.WinningTime') }
  ]
  const arr = winningRecord.value?.map((item, index) => {
    return {
      index: index + 1,
      giftName: item.giftName,
      giftAmount: item?.giftAmount?.toLocaleString(),
      turntableTime: item.turntableTime
    }
  })
  return [{ columns, data: arr }]
})

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
  const w = 620 // 原型的宽度
  const len = lotteryList.value?.length
  const dotLeft = (w - 95) / 2
  const dotTop = (w - 100) / 2
  const radius = w / 2
  const avd = 360 / len
  const ahd = (avd * Math.PI) / 180
  lotteryList.value?.forEach((item, index) => {
    item.left = Math.sin(ahd * index) * radius + dotLeft + 'px'
    item.top = Math.cos(ahd * index) * radius + dotTop + 'px'
    let deg = 180 - index * (360 / len) + 'deg'
    item.transform = `rotate(${deg})`
  })
}

// 处理开始按钮点击事件
const startClick = () => {
  if (!state.isStart) {
    state.isStart = true
    state.circleNum += 7

    let index
    if (winningInfo.value) {
      index = lotteryList.value.findIndex((item) => item.id === winningInfo.value.giftId)
    } else {
      // 有多种情况会导致抽不到奖，接口返回null时，找到奖品金额为 0 的元素的下标
      index = lotteryList.value.findIndex((item) => item.giftAmount === 0)
    }

    state.degNum = state.circleNum * 360 + index * (360 / lotteryList.value.length) + 180

    setTimeout(() => {
      hintPopUp.value = true
      getLotteryRecords()
    }, 4500)
    state.isStart = false
  }
}

// 处理开始按钮点击
const handlePreStartClick = () => {
  if (!isLogin.value) {
    user.setLoginDialogAction({
      isShowLoginDialog: true,
      currentPage: 'login'
    })
    return
  }
  if (!num.value) {
    ElMessage({
      message: i18n.global.t('LuckyWheel.NoNumber'),
      icon: WarningFilled
    })
    return
  }

  if (isLogin.value) {
    getTurntablePrize({ activityId: route.query.activityId }).then((res) => {
      if (res.code === 200) {
        winningInfo.value = res.data
        startClick()
        num.value--
      }
    })
  } else {
    hintPopUp.value = true
  }
}
const maskString = (str) => {
  const lastChar = str.substring(str.length - 3)
  const maskedMiddle = '****'

  return maskedMiddle + lastChar
}
const formatNumberToK = (number) => {
  if (typeof number === 'string') {
    number = parseFloat(number.replace(/,/g, ''))
  }

  

  if (typeof number === 'number' && !isNaN(number)) {
    if (number >= 1000) {
      const formattedNumber = (number / 1000).toFixed(3).replace(/\.?0+$/, '') // 使用正则表达式去掉末尾的零
      return formattedNumber + 'K'
    } else {
      return number.toString()
    }
  } else {
    return 'Invalid input'
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-message {
    border-radius: 7px;
    background: #323c6f;
  }
}
.lucky-wheel-view {
  margin: 0 -20px -20px -5px;
  background-color: #1b1612;
  .background {
    width: 100%;
    background-image: url('./img/bg.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
    padding-bottom: 70px;
    margin: 0;
    .top-img {
      width: 100%;
      object-fit: fill;
    }

    .img-box {
      position: relative;
      .turntable-img {
        position: relative;
        z-index: 2;
        width: 620px;
        height: 620px;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 4s;
        display: block;
        margin: auto;
        .lottery-box {
          position: absolute;
          top: -80px;
          left: -7px;

          .num-item {
            position: absolute;
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-top: 270px;
            color: #ad5600;
            .lottery-img {
              height: 60px;
            }
            .num-item-name {
              font-size: 14px;
              font-weight: 600;
              text-align: center;
              word-wrap: break-word;
              width: 70px;
            }

            .num-item-text {
              color: #ad5600;
              font-size: 22px;
              font-weight: 800;
              margin-bottom: 8px;
            }
          }
        }
      }
      .l-circle-btn {
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 190px;
        transform: translate(-50%, 0);
        width: 176px;
        height: 212px;
      }
      .base {
        width: 500px;
        height: 150px;
        display: block;
        margin: auto;
        margin-top: -70px;
      }
      .foreground-img {
        position: relative;
        z-index: 2;
        width: 1000px;
        height: 400px;
        display: block;
        margin: auto;
        margin-top: -220px;
      }
    }
    .content {
      @include mobile-padding();
      .limit-box {
        position: relative;
        z-index: 3;
        width: 325px;
        margin: auto;
        text-align: center;
        margin: -130px auto 130px auto;
        .limit {
          width: 325px;
          height: 50px;
          border-radius: 200px;
          background: #edd6b4;
          line-height: 50px;
          color: #965f03;
          font-size: 18px;
        }
        // .number {
        //   color: var(---1, #f53f3f);
        //   font-weight: 600;
        // }
        .text {
          color: #fff;
          font-size: 18px;
          margin: 15px 0 50px 0;
        }
      }
      .activities {
        position: relative;
        width: 1100px;
        background: #130e0c;
        border: 1px solid #ddcd9f;
        padding: 60px 40px 40px;
        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 486px;
          height: 76px;
          background-image: url('./img/title.png');
          background-repeat: no-repeat;
          background-size: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);

          .text {
            color: #5f381e;
            font-size: 32px;
            font-weight: 600;
            margin: 0 20px;
          }
          .dots {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #5f381e;
          }
        }
        .title-top {
          min-width: 386px;
          height: 62px;
        }
        .content-text {
          color: #edd0a0;
          font-size: 16px;
          font-weight: 400;
          line-height: 30px;
          word-wrap: break-word;
          margin-bottom: 20px;
        }
        .content-img {
          width: 100%;
          min-height: 420px;
        }
      }
      .rule-box {
        margin: auto;
        line-height: 26px;
        .rule-text {
          color: #edd0a0;
          text-align: justify;
          font-size: 16px;
          font-weight: 400;
          line-height: 30px;
          word-wrap: break-word;
          margin-bottom: 20px;
        }
      }
      .content-and-list {
        display: flex;
        justify-content: center;
        > :first-child {
          margin-right: 60px;
        }
      }
      .activities-top {
        width: 520px;
        min-height: 500px;
        max-height: 500px;
        margin: 0 0 150px 0;
        .list-box {
          height: 400px;
          text-align: center;
          color: #edd0a0;
          font-size: 16px;
          overflow: hidden;

          .item {
            cursor: pointer;
            width: 448px;
            height: 45px;
            border-bottom: 1px solid #634429;
            line-height: 45px;
            transition: transform 1s ease-in-out;
            .mes-box {
              width: 400px;
              margin: auto;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .activities-first {
        width: 520px;
        margin-bottom: 150px;
      }
      .rule {
        margin-top: 30px;
      }
      .only-activities-content {
        width: 1100px;
        max-height: none;
      }
    }
  }
  .popUp {
    .text {
      color: var(-----80, rgba(255, 255, 255, 0.8));
      text-align: center;
      font-size: 14px;
    }
    .number {
      color: #fff;
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      margin-top: 20px;
    }
    .btn {
      width: 180px;
      height: 40px;
      border: none;
      font-size: 14px;
    }

    .btn-box {
      display: flex;
      justify-content: center;
      margin-top: 30px;

      .cancel {
        border-radius: 4px;
        border: 1px solid var(-----, #f35f1b);
        background: none;
        color: var(-----, #f35f1b);
        margin-right: 20px;
      }
      .to-login {
        border-radius: 4px;
        color: #fff;
        background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      }
    }
    .knew {
      width: 180px;
      color: #fff;
      border-radius: 4px;
      background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      display: block;
      margin: auto;
      margin-top: 30px;
    }
  }
  .record-popUp {
    :deep() {
      .el-dialog__body {
        min-height: 552px;
      }
    }
    .tableStyle {
      max-height: 520px;
      overflow-y: scroll;
    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 688px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: var(-----, #171a2f);
      margin: auto;
      padding: 0 50px;

      p {
        color: #fff;
        font-size: 14px;
      }
    }
    .no-data {
      width: 136px;
      height: 143px;
      display: block;
      margin: auto;
      margin: 60px auto 15px auto;
    }
    .text {
      color: var(-----60, rgba(255, 255, 255, 0.6));
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
