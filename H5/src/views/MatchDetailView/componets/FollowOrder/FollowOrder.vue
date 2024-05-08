<template>
  <div class="follow-order">
    <van-popup v-model:show="showBottom" position="bottom" closeable :overlay="false">
      <div class="heat">{{ $t('Mletter.followorders') }}</div>
      <van-icon name="arrow-left" size="24px" color="#333333" />
      <div class="content-box">
        <div class="bet-box">
          <div class="content">
            <template v-for="item in OrderData.ops" :key="item.mid">
              <p class="game-play" :class="{ 'multiple-game-play': true }">
                {{ item.mgn }}
              </p>
              <p class="title" :class="{ 'multiple-title': true }">{{ item.ln }}</p>
              <div class="team-name-odds">
                <p class="team-name">{{ item.mn }}</p>
                <div style="display: flex">
                  <div class="odds">
                    <p>@{{ item.bo }}</p>
                  </div>
                  <!-- <IconKLineUp v-if="true" />
                <IconKLineArrow v-if="false" /> -->
                </div>
              </div>
            </template>
            <div v-if="!isMultiple" class="input-box">
              <div class="input">
                <div class="currency"><CurrencyUnit /></div>
                <div class="line"></div>
                <input
                  class="number"
                  readonly
                  v-model="number"
                  type="number"
                  :placeholder="
                    bms?.smin && bms?.smax ? `${$t('Mletter.limit')} ${bms?.smin}~${bms?.smax}` : ''
                  "
                />
              </div>
              <!-- 添加预约 -->
              <!-- <div v-if="reserve" class="reserve" @click="showReserve">+ 预约</div> -->
              <!-- 预约赔率调控器 -->
              <!-- <div v-else class="odds-ctrl">
              <div class="steppers">
                <van-stepper
                  v-model="selfOdds"
                  :min="odds"
                  step="0.01"
                  :decimal-length="2"
                  :input-width="44"
                  :button-size="24"
                />
              </div>
            </div> -->
            </div>
            <!-- 预约按钮组 -->
            <!-- <div v-if="!reserve" class="book-btn-group">
            <button @click="cancelBook" class="left-button">取消预约</button>
            <button class="right-button">预约</button>
          </div> -->
          </div>
        </div>
        <div class="bottom-box">
          <div v-if="isMultiple" class="bet-area">
            <div>
              <div>
                <span class="type">{{ formattedBt }}</span
                ><span class="odds">@{{ getBetMultipleOdds?.sodd.toFixed(2) }}</span>
              </div>
              <div class="most-win">{{ $t('Mletter.mlettertip16') }}{{ 0.0 }}</div>
            </div>
            <div class="input">
              <div class="currency"><CurrencyUnit /></div>
              <div class="line"></div>
              <input
                class="number"
                readonly
                v-model="number"
                type="number"
                :placeholder="`${$t('Mletter.limit')} ${getBetMultipleOdds?.mi}~${
                  getBetMultipleOdds?.mx
                }`"
              />
            </div>
          </div>
          <div class="finance-box">
            <div class="bet-amount">
              <p class="item">{{ $t('Mletter.betmount') }}</p>
              <p class="item"><CurrencyUnit />{{ number || '0.00' }}</p>
            </div>
            <div class="bet-amount">
              <p class="item">{{ $t('Mletter.Winamount') }}</p>
              <p class="item number"><CurrencyUnit />{{ totalWin || '0.00' }}</p>
            </div>
            <div class="prompt-message">{{ $t('Mletter.mlettertip17') }}</div>
          </div>
          <!-- 键盘 -->
          <div class="keyboard-wrapper">
            <van-number-keyboard
              v-model="number"
              :show="show"
              theme="costom"
              :extra-key="'.'"
              :transition="false"
              :hide-on-click-outside="true"
            >
              <template #title-left>
                <div class="left-aside">
                  <div @click="addAmount(500)" class="key">+500</div>
                  <div @click="addAmount(1000)" class="key">+1000</div>
                  <div @click="toMax" class="key max">MAX</div>
                  <div @click="onClose" class="key close">
                    <IconKeyBoard />
                  </div>
                </div>
              </template>
            </van-number-keyboard>
          </div>
          <div class="bet-button">
            <van-button :disabled="disableButton" @click="handleBetIng">
              {{ buttonText }}
              <span v-if="totalWin && !isMultiple"
                >( {{ $t('Mletter.Winamount') }}{{ totalWin }} )</span
              >
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { SingleBet, updateOddBeforeBet, betMultiple } from '@/api/fb.js'
import { liveStatistics } from '@/api/live'
import { useFBStore } from '@/stores/fb'
import Big from 'big.js'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import { userFollowOrderSave } from '@/api/chatroom.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const fbStore = useFBStore()
const showBottom = ref(false)
const show = ref(true)
const number = ref()
const selfOdds = ref()
const reserve = ref(true)
const odds = ref(0)
const multipleOddsGroup = ref()
const sos = ref() // 串关组合赔率及限额
const bms = ref() // 单注限额

const props = defineProps({
  OrderData: {
    type: Object,
    required: true
  },
  from: {
    type: String
  }
})

const isMultiple = computed(() => props.OrderData?.ops.length > 1)

const buttonText = computed(() => {
  // ss 玩法销售状态,1开售,赔率小于0代表锁盘
  if (!isMultiple.value) {
    if (bms.value?.ss !== 1) return i18n.global.t('Mletter.mlettertip18')
    if (!odds.value) return i18n.global.t('Mletter.lockplate')
  }
  return i18n.global.t('Mletter.bet')
})

// 格式化串关类型
const formattedBt = computed(() => {
  return props.OrderData.bt
})

// 获取当前下注串关组合
const getBetMultipleOdds = computed(() => {
  return sos.value?.find((item) => item.sn === props.OrderData.sv)
})

// 按钮禁用状态
const disableButton = computed(() => {
  // 未开售和锁盘禁用投注按钮
  if (isNaN(Number(number.value)) || bms.value?.ss !== 1 || !odds.value) {
    return true
  }

  if (isMultiple.value) {
    const min = number.value < getBetMultipleOdds.value?.mi
    const max = number.value > getBetMultipleOdds.value?.mx
    return min || max
  } else {
    const min = number.value < bms.value?.smin
    const max = number.value > bms.value?.smax
    return min || max
  }
})

const showReserve = () => {
  reserve.value = false
}

const cancelBook = () => {
  reserve.value = true
}

// 开启定时器函数
const startTimer = () => {
  return setInterval(() => {
    if (showBottom.value) {
      updateOdds()
    }
  }, 3000)
}

// 定时器变量
let timer
watchEffect(() => {
  // 弹出跟单弹窗开启定时器
  if (showBottom.value) {
    // 打开弹窗先直接调用赔率接口获取最新赔率，再定时轮训接口实时获取最新赔率
    updateOdds()
    timer = startTimer()
  } else {
    clearInterval(timer)
  }
})

// 请求最新赔率
const updateOdds = () => {
  const betMatchMarketList = props.OrderData?.ops.map((order) => {
    return {
      marketId: order.mrid,
      matchId: order.mid,
      type: order.ty
    }
  })
  const reqData = {
    isSelectSeries: isMultiple.value, // 是否参选串关
    betMatchMarketList: betMatchMarketList
  }
  updateOddBeforeBet(reqData).then((res) => {
    if (!isMultiple.value) {
      if (res.bms && res.bms.length && res.bms[0].op?.od) {
        odds.value = res.bms[0].op?.od
        bms.value = res.bms[0]
      }
    } else {
      multipleOddsGroup.value = res.bms
      sos.value = res.sos
    }
  })
}

// 串关的情况用于展示的赔率
const getMultipleOdds = (mid) => {
  const item = multipleOddsGroup.value?.find((item) => {
    return item.mid === mid
  })
  return item?.op?.od.toFixed(2)
}

// 计算可赢金额
const totalWin = computed(() => {
  const betIngOdds = isMultiple.value ? getBetMultipleOdds.value?.sodd : odds.value
  if (betIngOdds && number.value) {
    const numbers = new Big(number.value) // 下注金额
    const oddsS = new Big(betIngOdds) // 下注赔率
    if (!isMultiple.value) {
      // 计算单注可赢
      return numbers.times(oddsS.minus(1)).toFixed(2)
    } else {
      // 计算串关可赢
      return numbers.times(oddsS.minus(getBetMultipleOdds.value.in)).toFixed(2)
    }
  } else {
    return 0
  }
})

const handleBetIng = () => {
  if (!isMultiple.value) {
    if (Number(userStore.userInfo.balance) < bms.value?.smin) {
      showToast(i18n.global.t('Mletter.mlettertip20'))
      showHide()
      return
    }
    // 单注投注
    const reqData = {
      singleBetList: [
        {
          unitStake: number.value,
          oddsChange: fbStore.settings.oddsChange,
          betOptionList: [
            {
              marketId: props.OrderData?.ops[0]?.mrid,
              optionType: props.OrderData?.ops[0]?.ty,
              odds: odds.value,
              oddsFormat: fbStore.settings.oddsFormat
            }
          ]
        }
      ]
    }
    SingleBet(reqData).then((res) => {
      const orderId = res[0].id
      showToast(i18n.global.t('Mletter.mlettertip21'))
      showHide()

      let param = {}
      const liveStreamId = route.query.liveID
      const chatRoomId = route.query.liveID ? route.query.liveID : route.params.id
      const { id, betOrderCode, st, pushOrderId } = props.OrderData
      if (props.from === 'anchorsOrders') {
        param = {
          betOrderCode: orderId,
          betOrderState: 0,
          chatRoomId,
          followBetAmount: Number(number.value),
          followType: 1,
          followBetType: 2,
          memberId: userStore.userInfo.id,
          memberName: userStore.userInfo.userName,
          vipLevel: userStore.userInfo.vipLevel,
          liveStreamId,
          pushOrderId
        }
      } else if (betOrderCode) {
        const betOrderState = st === 5 ? 1 : 0
        param = {
          betOrderCode: orderId,
          betOrderState,
          chatRoomId,
          followBetAmount: Number(number.value),
          followType: 2,
          followBetType: 2,
          memberId: userStore.userInfo.id,
          memberName: userStore.userInfo.userName,
          vipLevel: userStore.userInfo.vipLevel,
          liveStreamId,
          pushOrderId: betOrderCode
        }
      } else {
        const betOrderState = st === 5 ? 1 : 0
        param = {
          betOrderCode: orderId,
          betOrderState,
          chatRoomId,
          followBetAmount: Number(number.value),
          followType: 2,
          followBetType: 2,
          memberId: userStore.userInfo.id,
          memberName: userStore.userInfo.userName,
          vipLevel: userStore.userInfo.vipLevel,
          liveStreamId,
          pushOrderId: id
        }
      }
      // 新增会员跟单信息
      userFollowOrderSave(param)

      // 统计直播间投注总次数、总金额
      const roomCode = route.query.data === 'fromLive' ? route.query.roomCode : route.params.id
      liveStatistics({
        roomCode,
        betCount: 1,
        betAmount: Number(number.value)
      })
      number.value = ''
    })
  } else {
    if (Number(userStore.balance) < getBetMultipleOdds.value?.mi) {
      showToast(i18n.global.t('Mletter.mlettertip20'))
      showHide()
      return
    }
    // 串关投注
    const betOptionList = props.OrderData?.ops.map((order) => {
      return {
        marketId: order.mrid,
        matchId: order.mid,
        oddsFormat: fbStore.settings.oddsFormat,
        optionType: props.OrderData?.ops[0]?.ty,
        odds: getMultipleOdds(order.mrid),
        type: order.ty
      }
    })
    const reqData = {
      betMultipleData: [
        {
          oddsChange: fbStore.settings.oddsChange,
          seriesValue: getBetMultipleOdds.value.sn,
          unitStake: number.value
        }
      ],
      betOptionList
    }
    betMultiple(reqData).then(() => {
      showHide()
      showToast(i18n.global.t('Mletter.mlettertip21'))
      number.value = ''
    })
  }
}

const onClose = () => {
  show.value = false
}
const addAmount = (amount) => {
  number.value = String(Number(number.value) + amount)
}
const toMax = () => {
  if (!isMultiple.value) {
    number.value = String(bms.value?.smax)
  } else {
    number.value = String(getBetMultipleOdds.value?.mx)
  }
}
const showHide = () => {
  showBottom.value = !showBottom.value
}
defineExpose({ showHide })
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.follow-order {
  @include mobile-padding();
  :deep() {
    .van-popup--bottom {
      border-radius: var(--van-popup-round-radius) var(--van-popup-round-radius) 0 0;
      height: calc(var(--app-height) - 245px);
    }
  }
  .heat {
    height: 50px;
    line-height: 47px;
    border-radius: 20px 20px 0px 0px;
    background: #fff;
    color: #333;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .van-icon {
    position: absolute;
    top: 15px;
    left: 12px;
  }

  .bet-box {
    overflow: auto;
    height: 170px;
    text-align: left;
    padding-top: 15px;
    background: rgb(247, 247, 247);
    .content {
      width: 350px;
      margin: auto;
      padding: 15px;
      border-radius: 5px;
      background: #fff;
    }
    .game-play {
      color: #111;
      font-size: 15px;
      span {
        font-size: 12px;
        margin-left: 5px;
      }
    }
    .multiple-game-play {
      font-size: 14px;
      font-weight: 600;
      span {
        font-size: 12px;
        font-weight: 600;
      }
    }
    .title {
      color: #111;
      font-size: 15px;
      font-weight: 600;
      margin: 10px 0;
    }
    .multiple-title {
      color: #666;
      font-size: 13px;
      font-weight: 400;
    }
    .team-name-odds {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .team-name {
        color: #666;
        font-size: 14px;
      }
      .odds {
        color: #f53f3f;
        font-size: 18px;
        font-weight: 600;
      }
      svg {
        width: 17px;
        height: 20px;
        margin-left: 5px;
        fill: #f53f3f;
      }
    }
    .input-box {
      display: flex;
      justify-content: space-between;
      .reserve {
        width: 94px;
        height: 50px;
        border-radius: 6px;
        border: 0.5px solid #eee;
        background: #fff8ef;
        color: #ff5000;
        text-align: center;
        font-size: 15px;
        font-weight: 600;
        line-height: 50px;
      }
      .odds-ctrl {
        display: flex;
        align-items: center;
        .odds-sys {
          margin-right: 6px;
          font-size: 20px;
        }
        .steppers {
          border: 1px solid #ddd;
          background: #f2f3f5;
          border-radius: 6px;
          height: 50px;
          display: flex;
          align-items: center;
          :deep() {
            .van-stepper__minus,
            .van-stepper__plus {
              background: transparent;
            }
          }
        }
      }
    }
    .book-btn-group {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      .left-button {
        width: 90px;
        height: 40px;
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        background: #fff;
        color: var(--color-primary);
      }
      .right-button {
        width: 235px;
        height: 40px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
        opacity: 0.6;
      }
    }
  }
  .bottom-box {
    width: 100%;
    background: rgb(247, 247, 247);
    padding: 10px 0;
    .finance-box {
      padding: 0 15px;
      margin-top: 15px;
    }
    .bet-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .type {
        color: #111;
        font-size: 15px;
        margin-right: 10px;
      }
      .odds {
        color: #ff9000;
        font-size: 18px;
        font-weight: 600;
      }
      .most-win {
        color: #999;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    .input {
      width: 210px;
    }
    .bet-amount {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .item {
        color: #999;
        font-size: 12px;
      }
      .number {
        color: #f53f3f;
      }
    }
    .prompt-message {
      width: 353px;
      height: 24px;
      border-radius: 6px;
      background: #fff8ef;
      color: #f53f3f;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
    }
  }
  .keyboard-wrapper {
    position: relative;
    margin: 0 11px 9px 11px;
    :deep() {
      .van-number-keyboard {
        position: static;
        padding-bottom: 0;
        padding-left: 80px;
        background: transparent;
        .van-number-keyboard__header {
          height: 0;
          padding: 0;
        }
        .van-key__wrapper:nth-of-type(3n) {
          padding-right: 0;
        }
        .van-key {
          height: 38px;
          border: 1px solid #eee;
          background: #fff;
          color: var(--color-text-dark);
          font-size: 24px;
          font-weight: 600;
        }

        .van-key--delete {
          color: var(--color-text-light);
          .van-key__delete-icon {
            transform: scale(0.7);
          }
        }
      }
    }
    .left-aside {
      position: absolute;
      top: 6px;
      left: -80px;
      width: 80px;
      // border: 1px solid red;
      .key {
        height: 38px;
        line-height: 38px;
        border-radius: 8px;
        margin-bottom: 6px;
        text-align: center;
        border: 1px solid #eee;
        background: #f4f4f4;
        font-size: 16px;
        font-weight: 600;
        &.max {
          color: var(--color-orange);
        }
      }
      .close {
        padding-top: 2px;
      }
    }
  }
  .bet-button {
    width: 353px;
    margin: auto;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    line-height: 50px;
    button {
      width: 353px;
      border-radius: 6px;
      background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
      color: #fff;
      border: none;
    }
  }
  .input {
    display: flex;
    align-items: center;
    // width: 231px;
    width: 340px;
    height: 50px;
    border-radius: 6px;
    border: 0.5px solid #eee;
    background: #fff;
    .currency {
      width: 18px;
      height: 18px;
      background: #ff9000;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      color: #fff;
      margin-left: 15px;
    }
    .line {
      width: 0.5px;
      height: 30px;
      border-radius: 50px;
      background: #eee;
      margin: 0 16px;
    }
    .number {
      font-family: DIN Alternate;
      color: #111;
      font-size: 20px;
      font-weight: 700;
      margin-right: -100px;
    }
    .number::placeholder {
      font-size: 14px;
      color: #d7d7d7;
    }
  }
}
</style>
