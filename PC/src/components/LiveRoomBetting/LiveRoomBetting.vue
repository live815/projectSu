<template>
  <div class="liveBet" v-if="betCartStore.anchorBetShow">
    <div class="benCen" v-if="betCartStore.anchorBetOdss && JSON.stringify(betCartStore.anchorBetOdss) !== '{}'">
      <div class="betHead">
        <div class="headLeft">
          <div class="title">{{ $t('Components.QuickBet') }}</div>
          <div class="num">1</div>
          <div class="line"></div>
          <div class="del" @click.stop="closeBet">
            <span>{{ $t('Components.DeleteAll') }}</span>
            <img src="./img/betDel.png" />
          </div>
        </div>
        <div class="headRight">
          <el-icon @click.stop="closeBetDel">
            <Close />
          </el-icon>
        </div>
      </div>
      <div class="betMain">
        <div class="betCard" :class="{ disab: isEntertained }">
          <div class="cr1">
            <!--  {{ betCartStore.anchorBetObj.betMarket }} -->
            <div>
              {{ betCartStore.anchorBetObj?.orderTitle }}
              {{
                isEntertainedTrue
                ? betCartStore.anchorBetOdss?.bms[0]?.op?.nm
                : betCartStore.anchorBetObj?.betMarket
              }}
            </div>
            <BetCardDel @click.stop="closeBet" />
          </div>
          <div class="cr2">{{ betCartStore.anchorBetObj.leagueName }}</div>
          <div class="cr3">
            <div>{{ fbStore.matchDetailList.nm }}</div>
            <div class="upDiv">
              <span :class="{
                down: compareBg == 'down' && isEntertainedTrue,
                uptxt: compareBg == 'up' && isEntertainedTrue
              }">{{
  isEntertainedTrue
  ? getOddFormat(betCartStore.anchorBetOdss?.bms[0]?.op?.od, fbStore.settings.oddsFormat)
  : getOddFormat(betCartStore.anchorBetObj.betOdds, fbStore.settings.oddsFormat)
}}
              </span>
              <IconKLineArrow v-if="compareBg && isEntertainedTrue"
                :class="{ arrow: true, down: compareBg == 'down', up: compareBg == 'up' }" />
            </div>
          </div>

          <div class="betCardMask" @click.stop="closeBet" v-if="isEntertained">
            <div>{{ $t('Components.HandicapIsClosed') }}</div>
            <BetCardDel />
          </div>
        </div>
        <!-- 立即投注 -->
        <div class="betOption" v-if="betStatus == 0 && betType != 1">
          <div class="betInp">
            <div class="moneyBg">
              <CurrencyUnit />
            </div>
            <el-input v-model="input" maxlength="10" :readonly="isEntertained" :placeholder="`${$t('Components.Limit')}${isEntertainedTrue ? betCartStore.anchorBetOdss?.bms[0]?.smin : 0
              }~${isEntertainedTrue ? betCartStore.anchorBetOdss?.bms[0]?.smax : 0}`"
              oninput="value = value.replace(/[^0-9.]/g,'')" />
          </div>
        </div>
        <!-- 预约投注 -->
        <div class="perBet" v-if="betStatus == 0 && betType == 1">
          <div class="betOption">
            <div class="betInp">
              <div class="moneyBg">
                <CurrencyUnit />
              </div>
              <el-input v-model="input" maxlength="10" :readonly="isEntertained" :placeholder="`${$t('Components.Limit')}${isEntertainedTrue ? betCartStore.anchorBetOdss?.bms[0]?.smin : 0
                }~${isEntertainedTrue ? betCartStore.anchorBetOdss?.bms[0]?.smax : 0}`"
                oninput="value = value.replace(/[^0-9.]/g,'')" />
            </div>
          </div>

          <span class="preBook">{{ $t('Components.Reserve') }} @</span>
          <div class="perDiv">
            <div class="btnnum betL" @click="reduceNum">
              <el-icon>
                <Minus />
              </el-icon>
            </div>
            <input class="inp" v-model="preBookOdds" maxlength="6" oninput="value = value.replace(/[^0-9.]/g,'')" />
            <div class="btnnum betR" @click="addNum">
              <el-icon>
                <Plus />
              </el-icon>
            </div>
          </div>
        </div>
        <div class="betOdds">
          <div class="oddsDiv">
            <div class="o1">{{ $t('Components.BetAmount') }}</div>
            <div class="o1 o2">
              <CurrencyUnit />{{ betMoney }}
            </div>
          </div>
          <div class="oddsDiv">
            <div class="o1">{{ $t('Components.WinningAmount') }}</div>
            <div class="o1 o3">
              <CurrencyUnit />{{ winnable }}
            </div>
          </div>
        </div>
        <div class="betBtn">
          <!-- 预约投注 -->
          <div class="betLeft" @click="subscribeBet">{{ getType(subscribeType) }}</div>
          <!-- 立即投注 -->
          <div :class="[
            betMoney == '' || betMoney == 0 || isEntertained ? 'betRight disabledBtn' : 'betRight'
          ]" @click.stop="btnBetting">
            {{ betBtnTxt }}
          </div>
        </div>
        <div class="betDrop">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <span>
                {{ dropdownList[dropdownIndex] }}
              </span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="0">{{ $t('Components.RateTips_1') }}</el-dropdown-item>
                <el-dropdown-item command="1">{{ $t('Components.RateTips_2') }}</el-dropdown-item>
                <el-dropdown-item command="2">{{ $t('Components.RateTips_3') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 投注蒙版 -->
        <div class="betMask" v-if="betStatus != 0 && betStatus != 3" @click="upBet">
          <div v-if="betStatus == 1">
            <img class="gitImg" src="https://w9.btyyl12.com/spa/sport-pc/img/loading.17928bed.gif" />
            <div class="Copywriting">{{ $t('Components.BettingConfirmed') }}</div>
          </div>
          <div v-if="betStatus == 2">
            <BettingSucc />
            <div class="Copywriting">
              {{
                betType == 1
                ? $t('Components.AppointmentSuccessful')
                : $t('Components.BetSuccessful')
              }}
            </div>
          </div>
          <div v-if="betStatus == 4">
            <BettingErr />
            <div class="Copywriting">{{ $t('Components.BetFailed') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BalanceNo :isShow="isShow" :txt="txt" v-if="isShow" @closeGift="closeGift" />
</template>

<script setup>
import i18n from '@/i18n'
import { Close } from '@element-plus/icons-vue'
import BetCardDel from '@/components/icons/BetCardDel.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import IconKLineArrow from '@/components/icons/IconKLineArrow.vue'
import BettingSucc from '@/components/icons/BettingSucc.vue'
import { getOddFormat } from '@/hooks/useSportDict'
import BettingErr from '@/components/icons/BettingErr.vue'
import { addInfoSave } from '@/api/liveBroadcast'
import { onMounted, ref, watch, onUnmounted, computed } from 'vue'
import { useFBStore } from '@/stores/fb'
import { useBetCartStore } from '@/stores/betCart'
import { useLiveStore } from '@/stores/liveBroadcast'
import { Minus, Plus } from '@element-plus/icons-vue'
import eventBus from '@/utils/eventBus'
import { useUserStore } from '@/stores/user'
import BalanceNo from '@/components/BalanceNo/BalanceNo.vue'
const user = useUserStore()
const userInfo = computed(() => {
  return user.userInfo
})
const liveStore = useLiveStore()
const activeOdds = ref('')
const compareBg = ref('')
const isShow = ref(false)
const txt = ref('')
const fbStore = useFBStore()
const betCartStore = useBetCartStore()
const dropdownList = ref([
  i18n.global.t('Components.RateTips_1'),
  i18n.global.t('Components.RateTips_2'),
  i18n.global.t('Components.RateTips_3')
])
const subscribeType = ref(0) //预约投注类型 0 预约投注 1 关闭预约 2继续投注本单
const dropdownIndex = ref(0)
const input = ref('')
const betStatus = ref(0) //投注状态 1 进行中 2 完成 3 再次投注 4 错误
const betType = ref(0) //投注类型 1 预约 2立即投注
//投注额 可赢额
const betMoney = ref(0)
const winnable = ref(0)
const preBookOdds = ref(0)
const betBtnTxt = ref(i18n.global.t('Components.BetNow'))
const isEntertained = computed(() => {
  if (betCartStore.anchorBetOdss?.bms) {
    return betCartStore.anchorBetOdss?.bms[0]?.ss < 0
  }
  return false
})
const isEntertainedTrue = computed(() => {
  if (betCartStore.anchorBetOdss?.bms) {
    return betCartStore.anchorBetOdss?.bms[0]?.ss >= 0 ? true : false
  }
  return false
})
// 刷新投注赔率
const refreshOddTimer = ref(null)
const handleCommand = (command) => {
  console.log(command)
  dropdownIndex.value = command
}
const upBet = () => {
  if (betStatus.value == 2 || betStatus.value == 4) {
    betStatus.value = 3
    subscribeType.value = 2
  }
}
const closeGift = () => {
  isShow.value = false
}
watch(
  () => input.value,
  (newMoney) => {
    if (newMoney > 0) {
      //预约投注
      betMoney.value = newMoney
      if (betType.value == 1) {
        //玩家可赢额 = 投注本金*赔率 - 投注本金 （ 10*2.2 - 10 简化后 10*(2.2-1) = 12元  ）
        winnable.value = (newMoney * (Number(Number(preBookOdds.value) - Number(isHongKong.value ? 0 : 1)))).toFixed(2) //(newMoney * preBookOdds.value - betMoney.value).toFixed(2)
      } else {
        //立即投注 betCartStore.anchorBetOdss?.bms[0]?.op?.od 就是欧盘的·赔率
        winnable.value = (
          newMoney * betCartStore.anchorBetOdss?.bms[0]?.op?.od -
          betMoney.value
        ).toFixed(2)
      }

      if (newMoney < betCartStore.anchorBetOdss?.bms[0]?.smin) {
        betMoney.value = 0
        winnable.value = 0
        betBtnTxt.value = i18n.global.t('Components.BelowTheBettingMinimum')
      } else if (newMoney > betCartStore.anchorBetOdss?.bms[0]?.smax) {
        betMoney.value = 0
        winnable.value = 0
        betBtnTxt.value = i18n.global.t('Components.AboveBettingLimit')
      } else {
        betBtnTxt.value =
          betType.value == 1
            ? i18n.global.t('Components.ConfirmReservationBet')
            : i18n.global.t('Components.BetNow')
      }
    } else {
      betMoney.value = 0
      winnable.value = 0
      betBtnTxt.value =
        betType.value == 1
          ? i18n.global.t('Components.ConfirmReservationBet')
          : i18n.global.t('Components.BetNow')
    }
  }
)
watch(
  () => betCartStore.anchorBetObj,
  (newAnchorBetObj) => {
    if (newAnchorBetObj && JSON.stringify(newAnchorBetObj) !== '{}') {
      console.log('json 有数据')
      activeOdds.value = betCartStore.anchorBetObj.betOdds
      clearInterval(refreshOddTimer.value)
      updateOddBeforeBetAnchor()
      dataRefresh()
      console.log(fbStore.matchDetailList, 'fbStore.matchDetailList')
      betCartStore.anchorBetShow = true
      // setTimeout(()=>{
      //     betCartStore.anchorBetShow=true
      // },100)
    }
  }
)
watch(
  () => betCartStore.anchorBetOdss,
  (newAnchorBetOdss) => {
    if (newAnchorBetOdss?.bms) {
      if (newAnchorBetOdss?.bms[0]?.ss < 0) {
        clearInterval(refreshOddTimer.value)
      } else {
        betCartStore.anchorBetShow = true //有数据才显示
        if (activeOdds.value < betCartStore.anchorBetOdss?.bms[0]?.op?.od) {
          // console.log(activeOdds.value,'1111',betCartStore.anchorBetOdss.bms[0].op.od)
          activeOdds.value = betCartStore.anchorBetOdss?.bms[0]?.op?.od
          compareBg.value = 'up'
        } else if (activeOdds.value > betCartStore.anchorBetOdss?.bms[0]?.op?.od) {
          // console.log(activeOdds.value,'222',betCartStore.anchorBetOdss.bms[0].op.od)
          activeOdds.value = betCartStore.anchorBetOdss?.bms[0]?.op?.od
          compareBg.value = 'down'
        } else {
          activeOdds.value = betCartStore.anchorBetOdss?.bms[0]?.op?.od
          // console.log(activeOdds.value,'3333',betCartStore.anchorBetOdss.bms[0].op.od)
          compareBg.value = ''
        }
      }
      console.log(newAnchorBetOdss, 'newAnchorBetOdss')
    }
  },
  { deep: true }
)
//关闭
const closeBet = () => {
  betCartStore.anchorBetShow = false
  clearInterval(refreshOddTimer.value)
  betCartStore.anchorBetObj = {}
  betStatus.value = 0
  subscribeType.value = 0
  betType.value = 0
  winnable.value = 0
  betMoney.value = 0
  input.value = ''
}
const closeBetDel = () => {
  betCartStore.anchorBetShow = false
  clearInterval(refreshOddTimer.value)
  betStatus.value = 0
  subscribeType.value = 0
  betType.value = 0
  winnable.value = 0
  betMoney.value = 0
  input.value = ''
}
onMounted(() => {
  // console.log(route.name === 'home')
})
// updateOddBeforeBet()
const dataRefresh = () => {
  if (refreshOddTimer.value) {
    clearInterval(refreshOddTimer.value)
  }
  refreshOddTimer.value = setInterval(() => {
    updateOddBeforeBetAnchor()
  }, 5000)
}

function updateOddBeforeBetAnchor() {
  console.log('进来没')
  const reqData = {
    isSelectSeries: false, // 是否参选串关
    betMatchMarketList: [
      {
        matchId: betCartStore.anchorBetObj.gameId,
        marketId: betCartStore.anchorBetObj.marketId,
        odds: betCartStore.anchorBetObj.betOdds,
        optionType: betCartStore.anchorBetObj.betStyle,
        type: betCartStore.anchorBetObj.betStyle
      }
    ] // 赛事盘口集合
  }
  betCartStore.updateOddBeforeBetAnchor(reqData)
}
onBeforeUnmount(() => {
  betCartStore.anchorBetShow = false
  betCartStore.anchorBetObj = {}
})
onUnmounted(() => {
  if (refreshOddTimer.value) {
    clearInterval(refreshOddTimer.value)
  }
  eventBus.off('closeBet')
  eventBus.off('closeBetDel')
})
const isHongKong = computed(() => {
  return fbStore.settings.oddsFormat === 2
})
//投注
const btnBetting = async () => {
  //余额不足
  // console.log(input.value,user.balance,Number(input.value) > Number(user.balance))
  if (Number(input.value) > Number(user.balance) || !user.balance) {
    txt.value = i18n.global.t('Components.NoMoney')
    isShow.value = true
    return
  }
  if (betMoney.value == '' || betMoney.value == 0 || betCartStore.anchorBetOdss?.bms[0]?.ss < 0) {
    return
  }
  let reqData = {}

  if (betType.value == 1) {
    reqData = {
      oddsChange: dropdownIndex.value,
      unitStake: input.value,
      betOptionList: [
        {
          marketId: betCartStore.anchorBetObj.marketId,
          odds: Number(Number(preBookOdds.value) + Number(isHongKong.value ? 1 : 0)),//预约 欧盘 2.1 香港盘 1.1+1
          oddsFormat: fbStore.settings.oddsFormat,
          optionType: betCartStore.anchorBetOdss?.bms[0]?.op?.ty
        }
      ]
    }
  } else {
    reqData = {
      singleBetList: [
        {
          oddsChange: dropdownIndex.value,
          unitStake: input.value,
          betOptionList: [
            {
              matchId: betCartStore.anchorBetObj.gameId,
              marketId: betCartStore.anchorBetObj.marketId,
              odds:
                betType.value == 1 ? Number(Number(preBookOdds.value) + Number(isHongKong.value ? 1 : 0)):betCartStore.anchorBetOdss?.bms[0]?.op?.od,
              optionType: betCartStore.anchorBetOdss?.bms[0]?.op?.ty,
              type: betCartStore.anchorBetOdss?.bms[0]?.op?.ty,
              oddsFormat: fbStore.settings.oddsFormat
            }
          ]
        }
      ]
    }
  }
  try {
    betStatus.value = 1
    let orderList = []
    let booKObj = {}
    //预约投注
    if (betType.value == 1) {
      booKObj = await betCartStore.bookBet(reqData)
    } else {
      //立即投注
      orderList = await betCartStore.submitSingleBet(reqData)
    }
    //立即投注
    if (orderList && orderList.length > 0) {
      let orderIds = orderList.map((item) => item.id)
      let reqDataOrder = {
        orderIds
      }
      setTimeout(() => {
        orderStatus(reqDataOrder)
      }, 1000)
    } else if (booKObj && JSON.stringify(booKObj) !== '{}') {
      let orderIds = orderList.id
      let reqDataOrder = {
        orderIds
      }
      setTimeout(() => {
        orderStatus(reqDataOrder)
      }, 1000)
    } else {
      console.log('错误-------')
      betStatus.value = 4
    }
  } catch (e) {
    console.log(e, '-------')
  }
}
//查询投注状态
const orderStatus = async (reqDataOrder) => {
  try {
    let res = betCartStore.getStakeOrderStatus(reqDataOrder)
    if (betCartStore.anchorBetType == 1 || betCartStore.anchorBetType == 2) {
      infoSave(reqDataOrder) //记录
    }
    betStatus.value = 2
    console.log(res, 'res', betCartStore.orderStatusList)
  } catch (e) {
    console.log(e)
  }
}
//预约投注
const subscribeBet = () => {
  //盘口关闭
  if (isEntertained.value) {
    return
  }
  preBookOdds.value =
    betCartStore.anchorBetOdss?.bms[0].ss >= 0
      ? getOddFormat(betCartStore.anchorBetOdss?.bms[0]?.op?.od, fbStore.settings.oddsFormat)
      : getOddFormat(betCartStore.anchorBetObj.betOdds, fbStore.settings.oddsFormat)
  console.log(subscribeType.value, 'subscribeType.value',preBookOdds.value,betCartStore.anchorBetOdss?.bms[0]?.op?.od)
  if (betType.value == 1) {
    betBtnTxt.value = i18n.global.t('Components.BetNow')
  }
  betBtnTxt.value = i18n.global.t('Components.ConfirmReservationBet')
  if (subscribeType.value == 2) {
    subscribeType.value = 0
    betBtnTxt.value = i18n.global.t('Components.BetNow')
    betStatus.value = 0
    betType.value = 0
  } else {
    if (subscribeType.value == 0) {
      betType.value = 1
      subscribeType.value = 1
    } else {
      betType.value = 0
      subscribeType.value = 0
      betBtnTxt.value = i18n.global.t('Components.BetNow')
    }
  }
}
const getType = (type) => {
  if (type == 0) {
    return i18n.global.t('Components.ReserveBetting')
  } else if (type == 1) {
    return i18n.global.t('Components.CloseAppointment')
  } else if (type == 2) {
    return i18n.global.t('Components.ContinueBettingOnThisOrder')
  }
}
const reduceNum = () => {
  const precision = 100 // 定义精度，这里是两位小数，所以乘以 100
  if (
    preBookOdds.value &&
    isEntertainedTrue &&
    preBookOdds.value > getOddFormat(betCartStore.anchorBetOdss?.bms[0]?.op?.od, fbStore.settings.oddsFormat)
  ) {
    preBookOdds.value = ((preBookOdds.value * precision - 1) / precision).toFixed(2)
    // preBookOdds.value-=0.01
  }
}
const addNum = () => {
  const precision = 100 // 定义精度，这里是两位小数，所以乘以 100
  preBookOdds.value = ((preBookOdds.value * precision + 1) / precision).toFixed(2)
}
watch(
  () => preBookOdds.value,
  (newPreBookOdds) => {
    if (
      newPreBookOdds &&
      isEntertainedTrue &&
      newPreBookOdds < getOddFormat(betCartStore.anchorBetOdss?.bms[0]?.op?.od, fbStore.settings.oddsFormat)
    ) {
      setTimeout(() => {
        preBookOdds.value = getOddFormat(betCartStore.anchorBetOdss?.bms[0]?.op?.od, fbStore.settings.oddsFormat)
      }, 1000)
    } else {
      if (input.value > 0) {
        console.log(Number(Number(preBookOdds.value) - Number(isHongKong.value ? 1 : 0)),'+++++')
        //玩家可赢额 = 投注本金*赔率 - 投注本金 （ 10*2.2 - 10 简化后 10*(2.2-1) = 12元  ）
        winnable.value = (input.value * (Number(Number(preBookOdds.value) - Number(isHongKong.value ? 0 : 1))) ).toFixed(2)
      }
    }
  }
)
//用户跟单记录
const infoSave = async (reqDataOrder) => {
  console.log(userInfo.value, 'userInfo.value')
  let saveVO = {
    betOrderCode: betType.value == 1 ? reqDataOrder.orderIds : reqDataOrder.orderIds[0],
    betOrderState: 0,
    betResult: '',
    chatRoomId: liveStore.liveRoom.id,
    followBetAmount: input.value,
    followBetType: 2, //跟单投注类型
    followType: betCartStore.anchorBetType,
    liveStreamId: liveStore.liveRoom.id,
    memberId: userInfo.value.id,
    memberName: userInfo.value.userName,
    pushOrderId: betCartStore.anchorBetType == 1 ? betCartStore.anchorBetObj.id : betCartStore.anchorBetObj.id,
    reserveOdds: '',
    winAmount: winnable.value,
    vipLevel: userInfo.value.vipLevel
  }
  try {
    let res = await addInfoSave(saveVO)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
eventBus.on('closeBet', () => {
  betCartStore.anchorBetShow = false
  betCartStore.anchorBetObj = {}
  betStatus.value = 0
  clearInterval(refreshOddTimer.value)
})
eventBus.on('closeBetDel', (bool) => {
  console.log(bool, 'bool')
  betCartStore.anchorBetShow = bool
  betStatus.value = 0
  clearInterval(refreshOddTimer.value)
})
</script>

<style lang="scss" scoped>
.liveBet {
  position: fixed;
  z-index: 111;
  right: 60px;
  bottom: 10px;
  display: flex;
  align-items: flex-end;

  .benCen {
    width: 454px;
    // height: 398px;
    flex-shrink: 0;
    border-radius: 8px;
    background: #232949;
    margin-right: 70px;

    .betHead {
      width: 454px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 8px 8px 0px 0px;
      background: #323c6f;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .headLeft {
        display: flex;
        align-items: center;
      }

      .headRight {
        padding-right: 20px;
        cursor: pointer;

        i {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .title {
        color: var(--100, #fff);

        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-left: 20px;
      }

      .num {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        background-color: #f35f1b;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        color: #fff;
        margin-left: 6px;
      }

      .line {
        width: 1px;
        height: 24px;
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: var(--unnamed, rgba(255, 255, 255, 0.1));
        margin: 0 12px;
      }

      .del {
        color: var(--60, rgba(255, 255, 255, 0.6));

        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        /* 133.333% */
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          margin-left: 4px;
        }
      }
    }
  }

  .betMain {
    position: relative;
    padding: 20px 10px 10px 10px;

    .betCard {
      width: 434px;
      height: 98px;
      flex-shrink: 0;
      border-radius: 8px;
      background: var(--unnamed, #171a2f);
      padding: 15px 10px;
      position: relative;

      .cr1 {
        color: var(--100, #fff);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        /* 114.286% */
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .cr2 {
        color: var(--100, #fff);

        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        /* 114.286% */
        margin-top: 10px;
      }

      .cr3 {
        color: var(--60, rgba(255, 255, 255, 0.6));

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        /* 114.286% */
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
      }

      .upDiv {
        color: var(--unnamed, #fff);
        text-align: center;

        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        /* 114.286% */
        display: flex;
        align-items: center;

        .arrow {
          width: 12px;
          height: 12px;
          margin-left: 10px;
        }

        .up {
          fill: var(--unnamed, #e93d3d);
          transform: rotateX(180deg);
        }

        .uptxt {
          color: var(--unnamed, #e93d3d);
        }

        .down {
          color: var(--unnamed, #00b42a);
          fill: var(--unnamed, #00b42a);
        }
      }
    }

    .betOption {
      width: 434px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-top: 20px;

      .betInp {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding-left: 10px;

        .moneyBg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          background: #ff9000;
          border-radius: 50%;
          color: #fff;
          text-align: center;

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :deep() {
          .el-input__inner {
            color: #fff;
            border: none;
          }

          .el-input,
          .el-input__wrapper,
          .el-input {
            border: none;
            background: none;
            box-shadow: none !important;
          }
        }
      }
    }

    .betOdds {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 8px;

      .oddsDiv {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 14px;

        .o1 {
          color: var(--80, rgba(255, 255, 255, 0.8));

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
        }

        .o2 {
          color: var(--100, #fff);
        }

        .o3 {
          color: var(--unnamed, #e93d3d);
        }
      }
    }

    .betBtn {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      margin-top: 18px;

      .betLeft {
        display: flex;
        width: 210px;
        height: 40px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: 4px;
        border: 1px solid var(--unnamed, #f35f1b);
        color: var(--unnamed, #f35f1b);
        cursor: pointer;
      }

      .betRight {
        display: flex;
        width: 210px;
        height: 40px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: 4px;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        color: #fff;
        cursor: pointer;
      }
    }

    .betDrop {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .example-showcase .el-dropdown-link {
        cursor: pointer;
      }

      .el-icon--right {
        color: rgba(255, 255, 255, 0.6);
      }

      :deep() {
        .el-dropdown-link {
          display: flex;
          align-items: center;
          color: var(--unnamed, #409eff);

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          background: none;
        }
      }
    }

    .betMask {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      flex-shrink: 0;
      border-radius: 0px 0px 8px 8px;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      z-index: 100;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .gitImg {
        width: 46px;
        height: 7.5px;
      }

      .Copywriting {
        color: #fff;
        text-align: center;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        /* 114.286% */
        margin-top: 7.5px;
      }
    }

    .betCardMask {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      flex-shrink: 0;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      z-index: 100;
      justify-content: center;
      align-items: center;

      div {
        color: var(--60, rgba(255, 255, 255, 0.6));

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px;
        /* 85.714% */
        margin-right: 4px;
      }
    }

    .disab {

      .cr1,
      .cr2,
      .cr3 {
        opacity: 0.1;
      }
    }

    .perBet {
      display: flex;
      align-items: center;
      height: 40px;
      margin-top: 20px;

      .betOption {
        width: 210px !important;
        margin-top: 0;
      }

      .preBook {
        color: var(--100, #fff);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        /* 157.143% */
        margin: 0 10px 0 18px;
      }

      .perDiv {
        width: 149px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
      }

      .btnnum {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }

      .inp {
        width: 78px;
        height: 32px;
        color: #fff;
        margin: 0 4px;
        text-align: center;
        font-size: 16px;
      }

      .betL {
        width: 33px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #454859;
      }

      .betR {
        width: 33px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #454859;
      }
    }
  }

  .disabledBtn {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
}
</style>
<style lang="scss">
.liveBet {

  .el-input,
  .el-input__wrapper,
  .el-input {
    border: none;
    background: none;
    box-shadow: none;
  }

  .el-dropdown {
    background: none;
    border: 0;
  }

  .el-dropdown-menu {
    border-radius: 4px;
    background: #232949;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23);
    border: 0;
  }

  .el-popper.is-pure {
    background: #232949;
    border: 1px solid #232949;
  }

  .el-dropdown-menu__item {
    color: rgba(255, 255, 255, 0.7);
  }

  .el-popper.is-pure .el-popper__arrow::before {
    background: none;
    background: #232949;
    border: 1px solid #232949;
  }

  .el-dropdown-menu__item:not(.is-disabled):focus {
    background: #232949;
  }
}
</style>
