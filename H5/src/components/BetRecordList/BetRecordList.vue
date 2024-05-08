<template>
  <div class="list-content-main BetRecordListview">
    <div
      class="bet-item"
      v-for="(item, index) in list"
      :key="item.id"
      :class="{ open: collapseOrderIds.includes(item.id) }"
    >
      <!-- 标题badge -->
      <div class="title-box">
      <!-- {{ titleBadgeText(item) }} -->
      {{ item.gameName }}
      </div>
      <!-- 已结算注单的输赢状态标识 -->
      <div class="status">
        <img v-if="settledType" :src="getBetProfitStatusIcon(item)" alt="" class="is-win-img" />
        <template v-else>
          <p class="order-status" :class="getBookOrderStatusClass(item)">
            <span v-if="bookType">{{ orderBookStatus(item.rst) }}</span>
            <span v-else>{{ orderStatus(item.st) }}</span>
          </p>
          <p v-if="bookType" class="cancel-reason">{{ item.fr }}</p>
        </template>
      </div>
      <!-- 第一行头部信息 注单时间、状态、单号 -->
      <div class="order-no-check">
        <div class="logo"></div>
        <div class="check">
          <p class="check-title">{{ $t('common.bettingTime') }}</p>
          <p class="check-time">
            <!-- {{ formatTime(item.cte) }} -->
            {{ item.betTime || formatTime(item.cte) }}
          </p>
        </div>
        <div class="order-no">
          <p class="order-title">
            <span>{{ $t('common.sportsOrder') }}</span>
          </p>
          <p class="order-num">{{ item.orderNo || item.id }}</p>
        </div>
        <div class="copy">
          <div class="line"></div>
          <div class="btn" v-clipboard="item.orderNo || item.id">{{ $t('common.copy') }}</div>
        </div>
      </div>
      <!-- 投注额-可赢额 -->
      <div class="bet-win-size">
        <div class="bet">
          <p class="common-title">
            {{ bookType ? $t('common.bookSelfMoney') : $t('common.betAmount') }}
          </p>
          <p class="size"><CurrencyUnit />{{ item.orderAmount || item.sat }}</p>
        </div>
        <!-- <div class="line"></div> -->
        <!--  有效投注-->
        <div class="bet validFlow" v-if="settledType">
          <p class="common-title valid-title">{{ $t('common.validBet') }}</p>
          <p class="size"><CurrencyUnit />{{ item.validBet }}</p>
        </div>
        <!-- 未结算可赢额 -->
        <div class="win" v-if="unSettleType">
          <p class="common-title win-title">{{ $t('common.shouldWin') }}</p>
          <p class="size win"><CurrencyUnit />{{ item.maxWinAmount }}</p>
        </div>
        <!-- 已结算输赢 -->
        <div class="win" v-else-if="settledType">
          <p class="common-title win-title">{{ $t('common.profit') }}</p>
          <p :class="getProfitClass(item.profitAmount)" class="size">
            <CurrencyUnit />{{ item.profitAmount.toFixed(2) }}
          </p>
        </div>
        <!-- 预约 -->
        <div class="win" v-else>
          <p class="common-title win-title">{{ $t('common.maxWin') }}</p>
          <p class="size win"><CurrencyUnit />{{ (item.sat * (item.ops[0].od - 1)).toFixed(2) }}</p>
        </div>
      </div>
      <!-- 预约注单详情 -->
      <template v-if="bookType">
        <div class="game-detail" v-for="itm in item.betContentList" :key="itm.id">
          <!-- 球类、vs球队 -->
          <p class="detail-title-1">
            <span v-if="item.sert">【{{ getBallTypeTextById(itm.sid) }}】</span>
            <span class="tournamentName">{{ itm.tournamentName }}</span>
          </p>
          <!-- 联赛 -->
          <p class="detail-title-2">{{ itm.hostVsGuest }}</p>
          <!-- 比赛开始时间 -->
          <p class="detail-title-3">{{ $t('common.beginMatch') }} 
            <!-- {{ formatTime(itm.bt) }} -->
            {{ itm.matchTime }}
          </p>
          <!-- 投注项 赔率  -->
          <p class="detail-title-4">
            <span>{{ itm.optionName }}</span>
            <span class="m-odd">@{{ itm.betOdds }}</span>
            
          </p>
          <p class="detail-title-4">
            <span class="m-odd-type"> 
              <span v-if="itm.ip==1">{{ $t('common.sportLive') }}-</span>{{ itm.playName }}
              <!-- 下注时比分 -->
              <span class="bsc" v-if="itm.matchScore">({{ filterScore(itm.matchScore) }})</span>
              <!-- 盘口类型 -->
              [{{ getOddFormatText(itm.oddsFormat) }}] 
            </span>
          </p>
          <!-- 投注玩法 -->
          <p class="detail-title-4 ty">
            <!-- 当前比分 -->
            <span class="scs" v-if="itm.scs?.length>0">({{ itm.scs[0] }}-{{ itm.scs[1] }})</span>
            <span class="pe" v-if="itm.mc?.pe">{{ getMatchStatus(itm, fbStore) }}</span>
            <!-- 走表类型 -->
            <Counter
              v-if="isShowMatchCounter(itm)"
              :tp="itm.mc?.tp"
              :s="itm.mc?.s"
              :r="itm.mc?.r"
            />
          </p>

          <!-- 右侧信息 -->
          <template v-if="settledType">
            <!-- 赛果 -->
            <div class="match-result" v-if="itm.rs">
              <span class="label">{{ $t('common.matchResult') }}：</span>
              <span>{{ itm.rs }}</span>
            </div>
            <!-- 比赛输赢 -->
            <div v-if="item.sert" :class="getProfitStatusClass(itm.sr)" class="profit-status">
              <span>{{ getProfitText(itm.sr) }}</span>
            </div>
          </template>
        </div>
      </template>
      <!-- 注单详情 -->
      <template v-else>
        <div class="game-detail" v-for="itm in item.betContentList" :key="itm.id">
          <!-- 球类、vs球队 -->
          <p class="detail-title-1">
            <span v-if="item.sert">【{{ getBallTypeTextById(itm.sid) }}】</span>
            <span class="tournamentName">{{ itm.tournamentName }}</span>
          </p>
          <!-- 联赛 -->
          <p class="detail-title-2">{{ itm.hostVsGuest }}</p>
          <!-- 比赛开始时间 -->
          <p class="detail-title-3">{{ $t('common.beginMatch') }} 
            <!-- {{ formatTime(itm.bt) }} -->
            {{ itm.matchTime }}
          </p>
          <!-- 投注项 赔率  -->
          <p class="detail-title-4">
            <span>{{ itm.optionName }}</span>
            <span class="m-odd">@{{ itm.betOdds }}</span>
            
          </p>
          <p class="detail-title-4">
            <span class="m-odd-type"> 
              <span v-if="itm.ip==1">{{ $t('common.sportLive') }}-</span>{{ itm.playName }}
              <!-- 下注时比分 -->
              <span class="bsc" v-if="itm.matchScore">({{ filterScore(itm.matchScore) }})</span>
              <!-- 盘口类型 -->
              [{{ getOddFormatText(itm.oddsFormat) }}] 
            </span>
          </p>
          <!-- 投注玩法 -->
          <p class="detail-title-4 ty">
            <!-- 当前比分 -->
            <span class="scs" v-if="itm.scs?.length>0">({{ itm.scs[0] }}-{{ itm.scs[1] }})</span>
            <span class="pe" v-if="itm.mc?.pe">{{ getMatchStatus(itm, fbStore) }}</span>
            <!-- 走表类型 -->
            <Counter
              v-if="isShowMatchCounter(itm)"
              :tp="itm.mc?.tp"
              :s="itm.mc?.s"
              :r="itm.mc?.r"
            />
          </p>

          <!-- 右侧信息 -->
          <template v-if="settledType">
            <!-- 赛果 -->
            <div class="match-result" v-if="itm.rs">
              <span class="label">{{ $t('common.matchResult') }}：</span>
              <span>{{ itm.rs }}</span>
            </div>
            <!-- 比赛输赢 -->
            <div v-if="item.sert" :class="getProfitStatusClass(itm.sr)" class="profit-status">
              <span>{{ getProfitText(itm.sr) }}</span>
            </div>
          </template>
        </div>
      </template>
      
      <!-- 未结算 & 可提前结算注单 -->
      <div
        v-if="allowEarlySettle(item) && unSettleType"
        :class="{ 'disabled-btn': onSettlementing(item) }"
        class="currency"
        @click="openDialog(item)"
      >
        <div class="currency-content">
          <div v-if="onSettlementing(item)">
            <span>{{ $t('common.preSettling') }}</span>
            <van-loading color="#ff5000" size="22" />
          </div>
          <div v-else>
            <span>{{ $t('common.preSettle') }} <CurrencyUnit />{{ getPrice(item) }}</span>
          </div>
        </div>
        <div class="currency-img" v-if="false">
          <img src="@/assets/img/success.png" alt="" />
        </div>
      </div>
      <!-- 预约操作栏 -->
      <div class="cooperation" v-if="item.rst === 0">
        <div @click="cancelBook(item.id)" class="cancel-btn">{{ $t('common.cancelBook') }}</div>
        <!-- <van-icon class="icon-edit" name="edit" /> -->
      </div>

      <!-- 折叠 -->
      <div v-if="item.betContentList?.length > 1" @click="collapse(item, index)" class="collapse">
        <van-button
          style="height: 30px"
          :icon="collapseOrderIds.includes(item.id) ? 'arrow-up' : 'arrow-down'"
          >{{
            collapseOrderIds.includes(item.id) ? $t('common.collapse') : $t('common.expand')
          }}</van-button
        >
      </div>
    </div>
    <!-- 提前结算确认框 -->
    <van-popup round v-model:show="open" position="bottom" :style="{ height: '15%' }">
      <van-button style="width: 100%; margin-bottom: 10px; border: none" @click="open = false">{{
        $t('common.cancelSettle')
      }}</van-button>
      <V-button @click="submit">{{ $t('common.confirmSettle') }}</V-button>
    </van-popup>
  </div>
</template>

<script setup>
import { submitPriceRecord, cancelBookBet } from '@/api/fb'
import vClipboard from '@/directives/clipboard'
import { showToast, showConfirmDialog } from 'vant'
import { getBallTypeTextById, getOddFormatText,isShowMatchCounter,getMatchStatus } from '@/hooks/useSportDict'
import { formatTime } from '@/utils'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const appStore = useAppStore()
const props = defineProps(['list', 'currentIndex', 'priceList','booklist'])
const emit = defineEmits(['expand', 'refreshBookBetList'])

const winImage = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/win.png`, import.meta.url).href
})
const winHalfImage = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/win-half.png`, import.meta.url).href
})
const loseImage = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/lose.png`, import.meta.url).href
})
const loseHalfImage = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/lose-half.png`, import.meta.url).href
})
const tie = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/tie.png`, import.meta.url).href
})
const settle = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/settle.png`, import.meta.url).href
})
const backMoney = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/back-money.png`, import.meta.url).href
})
const invalidOrder = computed(() => {
  return new URL(`../../assets/img/${appStore.language}/invalid-order.png`, import.meta.url).href
})

const open = ref(false)
// 保存结算临时变量信息
const settleValue = ref({})
// 取消预约
function cancelBook(reserveId) {
  // 弹框提示登录失效
  showConfirmDialog({
    title: i18n.global.t('common.confirmCancel')
  })
    .then(() => {
      // on confirm
      cancelBookBet({ reserveId }).then((res) => {
        if (res && typeof res === 'boolean') {
          showToast({
            type: 'success',
            message: i18n.global.t('common.cancelSuccess')
          })
          emit('refreshBookBetList')
        }
      })
    })
    .catch(() => {
      // on cancel
    })
}

// 注单输赢状态标识
function getBetProfitStatusIcon(item) {
  console.log(item,11111)
  let containsNumber = /\d/.test(item.gameName);
  // if (item.sert) {
  //   // 串关结算输赢状态
  //   return multipleBetSettleRes(item)
  // } else {
  //   // 注单单项结算结果(单关)
  //   // return singleBetSettleRes(item.ops[0].sr) || betStatus(item.st)
  // }
  if (containsNumber) {
    // 串关结算输赢状态
    return multipleBetSettleRes(item.profitAmount)
  } else {
    // 注单单项结算结果(单关)
    return singleBetSettleRes(item.betResult)
  }
}
// 串关结算输赢状态
function multipleBetSettleRes(item) {
  // let profitAmount = getProfitAmount(item)
  let profitAmount = item
  if (profitAmount > 0) {
    return winImage.value
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
  console.log(isWin,333333)
  switch (Number(isWin)) {
    // case 4:
    //   return winImage.value
    // case 5:
    //   return winHalfImage.value
    // case 3:
    //   return loseImage.value
    // case 6:
    //   return loseHalfImage.value
    // case 2:
    //   return tie.value
    // case 7:
    //   return invalidOrder.value
    case 1004002:
      return winImage.value
    case 1004003:
      return winHalfImage.value
    case 1004005:
      return loseImage.value
    case 1004004:
      return loseHalfImage.value
    case 1004006:
      return tie.value
    case 1004008:
      return invalidOrder.value
    case 1004007:
      return backMoney.value  
  }
}

// 注单单项结算结果文字
function getProfitText(sr) {
  switch (sr) {
    case 0:
      return i18n.global.t('common.noResult')
    case 2:
      return i18n.global.t('common.tie')
    case 3:
      return i18n.global.t('common.lose')
    case 4:
      return i18n.global.t('common.win')
    case 5:
      return i18n.global.t('common.winHalf')
    case 6:
      return i18n.global.t('common.loseHalf')
    case 7:
      return i18n.global.t('common.cancel')
  }
}
function getProfitStatusClass(sr) {
  switch (sr) {
    case 0:
      return 'gray'
    case 2:
      return 'orange'
    case 3:
      return 'lose'
    case 4:
      return 'win'
    case 5:
      return 'win'
    case 6:
      return 'lose'
    case 7:
      return 'cancel'
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
const unSettleType = props.currentIndex === 0
const settledType = props.currentIndex === 1
const bookType = props.currentIndex === 2

// 注单状态
const orderStatus = (status) => {
  switch (status) {
    case 0:
      return i18n.global.t('common.createSuccess')
    case 1:
      return i18n.global.t('common.confirming')
    case 2:
      return i18n.global.t('common.refuse')
    case 3:
      return i18n.global.t('common.cancelOrder')
    case 4:
      return i18n.global.t('common.confirmed')
    case 5:
      return i18n.global.t('common.settled')
  }
}
// 预约注单状态
const orderBookStatus = (status) => {
  switch (status) {
    case 0:
      return i18n.global.t('common.booking')
    case 1:
      return i18n.global.t('common.bookedSuccess')
    case 2:
      return i18n.global.t('common.bookedFail')
    case 3:
      return i18n.global.t('common.canceled')
    case 4:
      return i18n.global.t('common.confirming')
  }
}
// 预约注单状态样式
function getBookOrderStatusClass(item) {
  switch (item.rst) {
    case 0:
      return 'green'
    case 1:
      return 'green'
    case 2:
      return 'red'
    case 3:
      return 'red'
    case 4:
      return 'green'
  }
}
// 注单标题
const titleBadgeText = (item) => {
  if (item.sert) {
    return `${i18n.global.t('common.Parlay')} ${item.bt.replace(
      /x/gi,
      appStore.language === 'zh-cn' ? '串' : 'x'
    )}`
  }
  return getBallTypeTextById(item.ops[0].sid)
}
// 获取输赢值 结算派彩金额||提前结算派彩金额 - 本金/投注额
function getProfitAmount(item) {
  let bonus = Object.prototype.hasOwnProperty.call(item, 'sa') ? item.sa : item.cops
  return bonus - item.sat || 0
}
// 获取输赢值class
function getProfitClass(item) {
  // let profitAmount = getProfitAmount(item)
  let profitAmount = item
  if (profitAmount > 0) {
    return 'win'
  }
  if (profitAmount < 0) {
    return 'lose'
  }
}
// 结算价格
function getPrice(item) {
  let price = allowEarlySettle(item)
  return (price?.amt * item.sat).toFixed(2) || 0
}
// 可提前结算数据
function allowEarlySettle(item) {
  return props.priceList.find((price) => price.oid === item.id && price.amt)
}
// 正在结算中
function onSettlementing(item) {
  return [101, 102].includes(allowEarlySettle(item)?.st)
}
const openDialog = (item) => {
  open.value = true
  settleValue.value = item
}
const submit = async () => {
  let price = props.priceList.find((itm) => settleValue.value.id === itm.oid)
  const res = await submitPriceRecord({
    orderId: settleValue.value.id,
    cashOutStake: Number(settleValue.value.sat),
    acceptOddsChange: true,
    unitCashOutPayoutStake: price.amt
  })
  if (res && res.st === 0) {
    showToast(i18n.global.t('common.preSettling'))
    open.value = false
    price.st = 102 // 手动修改结算状态
  }
}
//保存点击当前item的ID，刷新列表的时候根据ID是否打开或折叠
const collapseOrderIds = ref([])
const collapse = (item) => {
  const id = item.id
  const idx = collapseOrderIds.value.findIndex((orderId) => orderId === id)
  if (idx > -1) {
    collapseOrderIds.value.splice(idx, 1)
  } else {
    collapseOrderIds.value.push(id)
  }
}
// 比分数据过滤
function filterScore(str){
  const regex = /(\d+-\d+)/;
  const matches = str.match(regex);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
};

</script>

<style lang="scss" scoped>
.BetRecordListview {
  .bet-item {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 1px 0px 0px #ffdcad inset;
    margin: 0 7px 15px;
    padding-bottom: 15px;
    max-height: 350px;
    overflow: hidden;
    position: relative;
    &.open {
      max-height: none;
      padding-bottom: 40px;
    }
    .collapse {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      text-align: center;
      color: #999;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      :deep().van-button__icon {
        transform: scale(0.8);
      }
    }
    .title-box {
      padding: 0px 16px 0px 11px;
      // height: 24px;
      line-height: 24px;
      display: inline-flex;
      align-items: center;
      text-align: left;
      border-radius: 4px 40px 40px 0px;
      background: linear-gradient(93deg, var(--color-orange) 0%, var(--color-primary) 100%);
      color: #fff;

      font-size: 13px;
      font-style: normal;
      font-weight: 400;
    }
    .status {
      position: absolute;
      right: 0;
      top: 1px;
      // display: flex;
      // align-items: flex-start;
      .is-win-img {
        width: 60px;
        margin-top: -10px;
      }
      .order-status {
        padding: 4px 8px;
        justify-content: center;
        align-items: center;
        border-radius: 90px;
        font-size: 13px;
        color: var(--color-green);
        background: #e8ffea;
        &.green {
          color: var(--color-green);
          background: #e8ffea;
        }
        &.red {
          background: #fff5f0;
          color: var(--color-danger);
        }
      }
      .cancel-reason {
        color: var(--color-danger);
        font-size: 11px;
        text-align: center;
        margin-top: 2px;
      }
    }

    .common-title {
      color: #666;

      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      margin-bottom: 2px;
    }
    .order-no-check {
      padding: 12px 15px 10px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        width: 4px;
        height: 20px;
        border-radius: 0px 60px 60px 0px;
        background: var(--color-primary);
        // margin-right: 11px;
      }
      .check {
        margin-right: 15px;
        .check-title {
          // color: #00b42a;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
        .check-time {
          color: var(--color-text-dark);

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
      }
      .order-no {
        // margin-right: 5%;
        .order-title {
          color: #666;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
        .order-num {
          color: var(--color-text-dark);

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
      }
      .copy {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .line {
          width: 1px;
          height: 12px;
          background: #eee;
          margin-right: 14px;
        }
        .btn {
          color: var(--color-primary);

          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          z-index: 5;
        }
      }
    }
    .bet-win-size {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      .bet {
        .size {
          color: var(--color-text-dark);
          font-family: 'DIN Alternate';
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px;
        }
      }
      .line {
        width: 1px;
        height: 24px;
        background: #eee;
        margin-top: 5px;
      }
      .win {
        .win-title {
          text-align: right;
        }
        .size {
          font-family: 'DIN Alternate';
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 16px;
          &.win {
            color: var(--color-danger);
          }
          &.lose {
            color: var(--color-green);
          }
        }
      }
    }
    .game-detail {
      position: relative;
      padding: 15px;
      border-bottom: 1px solid #eee;
      // border: 1px solid red;
      p {
        margin-bottom: 6px;
      }
      .detail-title-1 {
        color: var(--color-text-dark);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .detail-title-2 {
        color: #666;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .detail-title-3 {
        color: #999;

        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .detail-title-4 {
        color: var(--color-text-dark);
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        span.m-odd {
          color: var(--color-orange);
          font-weight: 600;
          margin: 0 5px;
        }
        .m-odd-type {
          color: var(--color-text);
        }
        &.ty {
          margin-bottom: 0;
        }
        .pe{
          margin:0 5px;
          
        }
      }
      .match-result {
        position: absolute;
        bottom: 15px;
        right: 15px;
        color: var(--color-text-dark);
      }
      .profit-status {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        &.lose {
          color: var(--color-green);
        }
        &.win {
          color: var(--color-danger);
        }
        &.orange {
          color: var(--color-orange);
        }
      }
    }
    .currency {
      margin: 0 15px;
      margin-top: 15px;
      border-radius: 6px;
      border: 1px solid var(--color-primary);
      background: #fff;
      height: 44px;
      position: relative;
      .currency-content {
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-primary);
        line-height: 44px;
        & > div {
          display: flex;
          justify-content: center;
          .van-loading {
            margin-left: 10px;
          }
        }
      }
      .currency-img {
        position: absolute;
        top: 13px;
        right: 13px;
        & img {
          width: 18px;
        }
      }
    }
  }

  .cooperation {
    margin-top: 15px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    .cancel-btn {
      flex: 1;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      line-height: 28px;
      text-align: center;
      border-radius: 6px;
    }
    .icon-edit {
      margin-left: 15px;
      font-size: 24px;
      color: var(--color-primary);
    }
  }
}
</style>
