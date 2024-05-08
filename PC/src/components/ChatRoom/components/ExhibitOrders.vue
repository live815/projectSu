<template>
  <div class="order-box">
    <div class="order-info">
      <div class="betList">
        <div class="sbhMain" :class="{
          already: getOrderData.st === 5,
          notYet: getOrderData.st !== 5
        }">
          <div class="shbBon">
            <div class="shbTop">
              <div class="topLeft">
                <div class="b2">{{ getOrderData.ops[0].mgn }}</div>
                <div class="txt b1">{{ getOrderData.ops[0].onm }} @{{ getOrderData.ops[0].od }}</div>
              </div>

              <img v-if="getOrderData.st === 5" class="result1" :src="getBetProfitStatusIcon(getOrderData.ops[0])">
              <div v-else class="rightLook" @click="followerFn()">
                <div class="txt b3 txtC">{{ $t('Components.FollowOrders') }}</div>
                <RightArrow />
              </div>
            </div>

            <div :class="{
              aline: getOrderData.st === 5,
              line: getOrderData.st !== 5
            }"></div>
            <div>
              <div class="bonDetail">
                <div class="b2">{{ $t('Components.BetAmount') }}：<span class="b3">{{ getOrderData.sat }}</span></div>
                <div class="b2">{{ $t('Components.MaximumWinnable') }}：<span class="b3"
                    :class="{ txtBg: getOrderData.st === 5 }">+{{ getOrderData.mwa }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import winImage from '@/assets/img/result1.png'
import winHalfImage from '@/assets/img/result2.png'

import RightArrow from '@/components/icons/RightArrow.vue'
import loseImage from '@/assets/img/result3.png'
import loseHalfImage from '@/assets/img/result4.png'
import backMoney from '@/assets/img/result5.png'
import draw from '@/assets/img/result6.png'
import invalidOrder from '@/assets/img/result7.png'
import settle from '@/assets/img/result8.png'
import { onMounted } from 'vue'
import { useFBStore } from '@/stores/fb'
import { useBetCartStore } from '@/stores/betCart'
import { useLiveStore } from '@/stores/liveBroadcast'

import { useUserStore } from '@/stores/user.js'
const user = useUserStore()
const fbStore = useFBStore()
const betCartStore = useBetCartStore()
const liveStore = useLiveStore()
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})
const getOrderData = computed(() => props.data.content.description)

// 注单输赢状态标识
const getBetProfitStatusIcon = (item) => {
  return optSettleRes(item.sr) || betStatus(props.data.st)
}
// 注单单项结算结果(单关)
const optSettleRes = (isWin) => {
  switch (isWin) {
    case 4:
      return winImage
    case 5:
      return winHalfImage
    case 3:
      return loseImage
    case 6:
      return loseHalfImage
    case 2:
      return draw
    case 7:
      return invalidOrder
  }
}
// 注单顶层状态 处理没有返回注单输赢状态的边界
const betStatus = (st) => {
  switch (st) {
    case 2:
      return invalidOrder // 拒单
    case 3:
      return backMoney // 取消订单
    default:
      return settle // 提前结算
  }
}
onMounted(() => {
  console.log(props.data, 'props.data.content.description')
})
const followerFn = () => {
  // console.log( props.data.content.description,'item')
  let isLogin = getToken()
  if (!isLogin) {
    user.setLoginDialogAction({
      isShowLoginDialog: true,
      currentPage: 'login'
    })
    return
  }
  if (user.userInfo.role === 1) {
    return
  }
  let option = props.data.content.description
  const matchId = liveStore.roomSportType == 0 ? liveStore.liveRoom.gameId : liveStore.liveRoom.id
  const match = fbStore.matchDetailList
  betCartStore.anchorBetType = 2
  betCartStore.anchorBetObj = {
    id: option.id,
    betMatchMarket: {
      optionType: option.ops[0].ty // 投注类型
    },
    // // 展示类型数据
    visible: {
      betOpTitle: option.ops[0].onm // 投注项名称 -0/0.5
    },
    marketId: option.ops[0].mrid, // 玩法id  加个字段
    betMarket: option.ops[0].onm,
    betOdds: option.ops[0].od,
    cusName: fbStore.matchDetailList.ts[1].na, //客队
    gameId: matchId,
    gameTimestamp: match.bt,
    leagueName: match.lg.na,
    orderTitle: option.ops[0].mgn,
    mainName: fbStore.matchDetailList.ts[0].na, //主队
    pushType: 1,
    betStyle: option.ops[0].ty, // 投注类型
    matchTeam: fbStore.matchDetailList.nm,
    betStyleName: option.ops[0].na
  }
  console.log(betCartStore.anchorBetObj, 'betCartStore.anchorBetObj')
}
</script>

<style lang="scss" scoped>
.order-box {
  width: 310px;
  margin-top: 8px;

  .betList {
    width: 311px;
    height: 105px;
    position: relative;
  }

  .already {
    background-color: #283057;
  }

  .notYet {
    background: linear-gradient(90deg, #6A85B6 0%, #A5BADE 100%);
  }

  .sbhMain {
    width: 311px;
    height: 105px;
    flex-shrink: 0;
    border-radius: 8px;

    .shbBon {
      height: 105px;
      padding: 12px;

      .shbTop {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .topLeft {
          display: flex;
          flex-direction: column;
          align-items: baseline;
        }
      }

      .result1 {
        position: absolute;
        right: 30px;
      }

      .line {
        margin: 10px 0;
      }

      .line::before {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: repeating-linear-gradient(to right, #697FA4, #697FA4 5px, transparent 5px, transparent 10px);
      }

      .aline {
        margin: 10px 0;
      }

      .aline::before {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: repeating-linear-gradient(to right, #555, #555 5px, transparent 5px, transparent 10px);
      }

      .b1 {
        font-size: 14px;
        font-weight: 400;
        margin-top: 6px;
      }

      .bonDetail {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .b2 {
        color: #FFF;
        text-align: center;
        
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
      }

      .b3 {
        color: #FFF;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
        /* 114.286% */
      }
    }

    .drop {
      width: 4px;
      height: 4px;
      flex-shrink: 0;
      background: #f35f1b;
      border-radius: 50%;
    }

    .bonLeft {
      display: flex;
      align-items: center;
    }

    .bonT1 {
      color: var(--60, rgba(255, 255, 255, 0.6));
      
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      /* 141.667% */
      margin-left: 6px;
    }
  }

  .txtC {
    max-width: 90px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .txtBg {
    color: #FF5000 !important;
  }

  .rightLook {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .sendBtn {
    margin-top: 5px;
    display: flex;
    width: 414px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: #4F546D;
    color: #FFF;
    
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
  }

  .sendBtnActive {
    background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
  }

  .txt {
    color: #fff;
    
    font-style: normal;
    line-height: normal;
  }
}</style>
