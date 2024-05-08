<template>
  <div class="order-box">
    <div class="order-info">
      <!-- 头部 -->
      <div class="cenDiv">
        <div class="cenTop">
          <div class="cenLeft">
            <img
              style="width: 20px; height: 20px"
              :src="getOrderData.st === 5 ? settled : unsettled"
            />
            <p
              class="leftT"
              :class="{
                already: getOrderData.st === 5,
                notYet: getOrderData.st !== 5
              }"
            >
              {{ getOrderData.st === 5 ? $t('Components.Settled') : $t('Components.Unsettlement') }}
            </p>
          </div>
          <div class="leftLine"></div>
          <div class="leftT1">
            <p class="lt1">{{ getOrderData.sat }}</p>
            <p class="lt2">
              {{$t('Components.Win')}}<span class="orange">+{{ getOrderData.mwa }}</span
              >{{$t('Components.Currency')}}
            </p>
          </div>
        </div>
        <img
          v-if="getOrderData.st === 5"
          class="result1"
          :src="getBetProfitStatusIcon(getOrderData.ops[0])"
        />
      </div>
      <!-- 串关订单在此处遍历数据 -->
      <div
        v-for="ite in expandAll ? getOrderData.ops : getFirstTwoRecord(getOrderData.ops)"
        :key="ite.id"
        class="cenBon"
      >
        <div
          :class="[!expandAll && getOrderData.ops.length > 2 ? 'cenBard cenBardLine' : 'cenBard']"
        >
          <!-- 图片 -->
          <div class="rightImg" v-if="getOrderData.st === 5">
            <img :src="getBetProfitStatusIcon(ite)" />
          </div>
          <!-- 文案 -->
          <div class="br1">{{ ite.ln }} {{ dayjs(ite.bt).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <div class="br2">[{{ getBallTypeTextById(ite.sid) }}] {{ ite.mn }}</div>
          <div class="br3">{{ ite.mgn }}</div>
          <div class="br4">{{ ite.onm }} @{{ ite.od }}</div>
        </div>
      </div>
      <div
        style="display: flex; justify-content: center"
        v-if="!expandAll && getOrderData.ops.length > 2"
        @click="expand"
      >
        <div class="expandBtn">
          <span>{{$t('Components.Expand')}}</span>
          <el-icon style="margin-left: 4px"><ArrowDown /></el-icon>
        </div>
      </div>
      <!-- v-if="getOrderData.st !== 5 && data.from !== user.userInfo.userName" -->
      <div class="follower" v-if="getOrderData.st !== 5 && data.from !== user.userInfo.userName">
        <button @click="followerFn()">{{$t('Components.FollowOrders')}}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { getBallTypeTextById } from '@/hooks/useSportDict'
import { ArrowDown } from '@element-plus/icons-vue'
import settled from '../img/settled.png'
import unsettled from '../img/unsettled.png'

import winImage from '@/assets/img/result1.png'
import winHalfImage from '@/assets/img/result2.png'

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
const expandAll = ref(false)
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
const getOrderData = computed(() => props.data.content.description)

const getFirstTwoRecord = (arr) => {
  if (Array.isArray(arr) && arr.length > 2) {
    return arr.slice(0, 2)
  } else {
    return arr
  }
}
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
  const matchId = liveStore.liveRoom.gameId
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
  // min-height: 305px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-top: 8px;
  .cenDiv {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #171a2f;
    border-radius: 10px 10px 0 0;
  }
  .cenTop {
    display: flex;
    align-items: center;
    .cenLeft {
      width: 54px;
      height: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .leftT {
        
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 17px; /* 170% */
      }
    }
    .already {
      color: #ff8400;
    }
    .notYet {
      color: #419eff;
    }
    .leftLine {
      width: 1px;
      height: 34px;
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.1);
    }
    .leftT1 {
      // width: 120px;
      display: flex;
      flex-direction: column;
      // align-items: center;
      text-align: left;
      padding-left: 12px;
      .lt1 {
        color: var(--100, #fff);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px; /* 114.286% */
      }
      .lt2 {
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 133.333% */
      }
    }
  }
  .result1 {
    padding-right: 12px;
  }
  .cenBon {
    .cenBard {
      height: 100px;
      padding-left: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: left;
      .br1 {
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 17px; /* 141.667% */
        margin-top: 8px;
      }
      .br2 {
        color: var(--100, #fff);
        
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 17px; /* 141.667% */
        margin-top: 6px;
      }
      .br3 {
        color: var(--60, rgba(255, 255, 255, 0.6));
        
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 17px; /* 141.667% */
        margin-top: 6px;
      }
      .br4 {
        color: var(--unnamed, #f35f1b);
        
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 17px; /* 141.667% */
        margin-top: 6px;
      }

      .rightImg {
        position: absolute;
        right: 12px;
      }
    }
    .cenBardLine {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  .expandBtn {
    width: 64px;
    height: 24px;
    background-color: #171a2f;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span {
      color: var(--40, rgba(255, 255, 255, 0.4));
      text-align: center;
      
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 17px; /* 141.667% */
    }
  }
  .orange {
    color: var(--unnamed, #f35f1b);
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
}
</style>
