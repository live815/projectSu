<template>
  <div v-if="showHead" class="head">
    <img v-if="data.userRole" class="title-icon" :src="data.userRole === 1 ? anchor : admin" />
    <img v-if="data.vipLevel" class="title-icon" :src="vipIcon[data.vipLevel]" />
    <div class="name">
      {{ HandlerAccountName(data.pushUserName) }}
    </div>
    <div class="post-orders">{{ $t('Mletter.Postorder') }}</div>
    <div class="date">{{ dayjs(data.createTime).format('HH:mm') }}</div>
  </div>
  <div class="order-box" :class="{ dark: !isPostOrders && data.st !== 5 }">
    <div class="top">
      <div>
        <div class="type">{{ titleBadgeText }}</div>
        <div v-if="!data.sert" class="odds">{{ data.ops[0].onm }} @{{ data.ops[0].bo }} [{{ getOddFormatText(data.ops[0].of) }}]</div>
        <div v-else class="odds">
          {{ leagueName }} @ <span v-if="isPostOrders">{{ multipleOdds?.toFixed(2) }}</span>
          <span v-else>{{ data.totalOdds.toFixed(2) }}</span>
        </div>
      </div>
      <img v-if="data.st === 5" class="order-results" :src="getBetProfitStatusIcon(data)" />
      <div v-if="isPostOrders" :class="active ? 'circle-active' : 'circle'" @click="check"></div>
      <div v-else>
        <img
          v-if="data.st === 5"
          class="order-results result-img"
          :src="getBetProfitStatusIcon(data)"
        />
        <div v-else class="follow" @click="followerDom.showHide()">
          <span>{{ $t('Mletter.followorders') }}</span
          ><van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <div>
        <span class="text">{{ $t('Mletter.betamount') }}</span
        ><span class="bet-amount">{{ data.sat.toFixed(2) }}</span>
      </div>
      <div>
        <span class="text">{{ $t('Mletter.maxwin') }}</span
        ><span class="win-amount">{{ data.mwa.toFixed(2) }}</span>
      </div>
    </div>
  </div>
  <teleport to="#app">
    <FollowOrder ref="followerDom" :OrderData="data" />
  </teleport>
</template>

<script setup>
import { HandlerAccountName } from '@/utils'
import { vipIcon } from '@/utils/config.js'
import dayjs from 'dayjs'
import FollowOrder from '../FollowOrder/FollowOrder'
import { useFBStore } from '@/stores/fb'
import i18n from '@/i18n'
import { updateOddBeforeBet } from '@/api/fb'
import { useAppStore } from '@/stores/app'
import { getOddFormatText } from '@/hooks/useSportDict'

const appStore = useAppStore()
const fbStore = useFBStore()
const active = ref(false)
const emit = defineEmits(['check'])
const followerDom = ref(null)
const multipleOdds = ref(0)

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isPostOrders: {
    type: Boolean,
    default: false
  },
  showHead: {
    type: Boolean,
    default: false
  },
  id: {
    type: String
  },
  checkList: {
    type: Array
  }
})

const anchor = computed(() => {
  return new URL(`./img/${appStore.language}/anchor.png`, import.meta.url).href
})

const admin = computed(() => {
  return new URL(`./img/${appStore.language}/admin.png`, import.meta.url).href
})

const winImage = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/win.png`, import.meta.url).href
})
const winHalfImage = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/win-half.png`, import.meta.url).href
})
const loseImage = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/lose.png`, import.meta.url).href
})
const loseHalfImage = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/lose-half.png`, import.meta.url).href
})
const tie = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/tie.png`, import.meta.url).href
})
const settle = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/settle.png`, import.meta.url).href
})
const backMoney = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/back-money.png`, import.meta.url).href
})
const invalidOrder = computed(() => {
  return new URL(`../../../../assets/img/${appStore.language}/invalid-order.png`, import.meta.url)
    .href
})

// 串关订单获取组合赔率
const getMultipleOdds = () => {
  const betMatchMarketList = props.data.ops.map((order) => {
    return {
      marketId: order.mrid,
      matchId: order.mid,
      type: order.ty
    }
  })
  const reqData = {
    isSelectSeries: true, // 是否参选串关
    betMatchMarketList: betMatchMarketList
  }
  updateOddBeforeBet(reqData).then((res) => {
    multipleOdds.value = res.sos?.find((ite) => ite.sn === props.data.sv).sodd
  })
}

// const init = () => {
//   if (props.data.sert && props.isPostOrders) {
//     getMultipleOdds()
//   }
// }
// init()

const check = () => {
  active.value = !active.value
  emit('check', props.data, active.value, props.id, multipleOdds.value)
}

// 注单标题
const titleBadgeText = computed(() => {
  if (props.data.sert) {
    return `${i18n.global.t('Mletter.Mixedcrossborder')} ${props.data.bt.replace(
      /x/gi,
      i18n.global.t('Mletter.string')
    )}`
  } else {
    return props.data.ops[0].ip ? i18n.global.t('Mletter.Rollball') : '' + props.data.ops[0].mgn
  }
})
// 注单输赢状态标识
function getBetProfitStatusIcon(item) {
  if (item.sert) {
    // 串关结算输赢状态
    return multipleBetSettleRes(item)
  } else {
    // 注单单项结算结果(单关)
    return singleBetSettleRes(item.ops?.[0]?.sr) || betStatus(item.st)
  }
}
// 串关结算输赢状态
function multipleBetSettleRes(item) {
  let profitAmount = getProfitAmount(item)
  if (profitAmount > 0) {
    return winImage.value.value
  } else if (profitAmount < 0) {
    return loseImage.value
  } else {
    if (Object.prototype.hasOwnProperty.call(item, 'sa')) {
      return tie.value
    } else {
      return betStatus(item.st)
    }
  }
}
// 注单单项结算结果(单关)
const singleBetSettleRes = (isWin) => {
  switch (isWin) {
    case 4:
      return winImage.value
    case 5:
      return winHalfImage.value
    case 3:
      return loseImage.value
    case 6:
      return loseHalfImage.value
    case 2:
      return tie.value
    case 7:
      return invalidOrder.value
  }
}
// 注单顶层状态 处理没有返回注单输赢状态的边界
const betStatus = (st) => {
  switch (st) {
    case 2:
      return invalidOrder.value // 拒单
    case 3:
      return backMoney.value // 取消订单
    default:
      return settle.value // 提前结算
  }
}

// 获取输赢值 结算派彩金额||提前结算派彩金额 - 本金/投注额
function getProfitAmount(item) {
  let bonus = Object.prototype.hasOwnProperty.call(item, 'sa') ? item.sa : item.cops
  return bonus - item.sat || 0
}

const leagueName = computed(() => {
  return fbStore.matchDetailList?.lg?.na
})
watchEffect(()=>{
  if (!props.checkList?.length) {
    active.value = false
  }
})
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  margin: 15px 0 8px 0;
  .title-icon {
    width: 36px;
    height: 16px;
  }
  .name {
    color: #666;
    font-size: 12px;
    margin: 0 5px;
  }
  .date {
    color: #aaa;
    font-size: 10px;
  }
  .post-orders {
    color: #ff9000;
    border-radius: 24px;
    background: var(--4, #fff5f0);
    padding: 4px 4px 2px 4px;
    margin-right: 5px;
  }
}
.order-box {
  position: relative;
  width: 345px;
  height: 107px;
  margin: auto;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 12px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .type {
      color: #666;
      font-size: 13px;
      margin-bottom: 12px;
      text-align: left;
    }
    .odds {
      @include textToOmit(250px);
      color: #333;
      font-size: 15px;
      font-weight: 600;
    }
    .circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #ddd;
    }
    .circle-active {
      width: 18px;
      height: 18px;
      background-color: #ff5000;
      border-radius: 50%;
      position: relative;
    }
    .circle-active::before {
      content: '';
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 48%;
      transform: translate(-50%, -50%);
    }
    .order-results {
      width: 60px;
      height: 60px;
      position: absolute;
      right: 80px;
    }
    .result-img {
      right: 15px;
      bottom: 40px;
    }
    .follow {
      color: #fff;
    }
  }
  .line {
    width: 321px;
    height: 1px;
    border-top: 1px dashed#d4d9e3;
    margin: auto;
    margin-bottom: 13px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      color: #666;
      font-size: 12px;
    }
    .bet-amount {
      color: var(--333, #333);
      font-size: 15px;
      font-weight: 600;
    }
    .win-amount {
      color: #ff5000;
      font-size: 15px;
      font-weight: 600;
    }
  }
}
.dark {
  background: linear-gradient(90deg, #6a85b6 0%, #a5bade 100%);
  .top {
    .type {
      color: #fff;
    }
    .odds {
      color: #fff;
    }
  }
  .line {
    border-top: 2px dashed#697FA4;
  }
  .bottom {
    .text {
      color: #fff;
    }
    .bet-amount {
      color: #fff;
    }
    .win-amount {
      color: #fff;
    }
  }
}
</style>
