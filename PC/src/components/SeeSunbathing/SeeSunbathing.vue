<template>
  <CustomizeDialog :dialogShow="dialogShow" @closeBtn="closeBtn" :title="$t('Components.OnlyLookAtTheOrders')" v-if="dialogShow" :width="454">
    <div class="lookBask" v-if="shineUponList && shineUponList.length > 0">
      <div>
        <div class="lookWrap">
          <div class="lookMain" v-for="item in shineUponList" :key="item">
            <div class="lookTop">
              <img class="memberVip" :src="vipLive[item.orderGroupList[0]?.userVipLevel]" />
              <p class="lk1">{{ item.orderGroupList[0].pushUserName }}</p>
              <div class="lk2">{{$t('Components.PostedAnOrder')}}</div>
              <div class="lk3">{{dayjs(item.orderGroupList[0].createTime).format('HH:mm') }}</div>
            </div>
            <div class="lookCen">
              <div class="shbBon">
                <div class="shbTop">
                  <div class="topLeft">
                    <div class="b2">{{ item.orderGroupList[0].orderTitle }}</div>
                    <div class="txt b1">{{ item.orderGroupList[0].betStyleName }} @{{ item.orderGroupList[0].betOdds }}</div>
                  </div>
                    <img v-if="item.orderGroupList[0].betOrderState === 5" class="result1" :src="getBetProfitStatusIcon(getOrderData.ops[0])">
                    <div class="rightLook"  v-if="item.orderGroupList[0].betOrderState !== 5 && item.orderGroupList[0].pushUserName !== user.userInfo.userName" @click="followerFn(item.orderGroupList[0])">
                      <div class="txt b3 txtC">{{$t('Components.FollowOrders')}}</div>
                      <RightArrow />
                    </div>
                </div>
                <div class="line"></div>
                <div>
                  <div class="bonDetail">
                    <div class="b2">{{$t('Components.BetAmount')}}：<span class="b4">{{ item.orderGroupList[0].betAmount }}</span></div>
                    <div class="b2">{{$t('Components.MaximumWinnable')}}：<span class="b4" style="color: var(--2, #FF5000);">+{{ item.orderGroupList[0].winAmount }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoList class="lookBask" v-else />
  </CustomizeDialog>
</template>
<script setup>
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import NoList from '@/components/NoList/NoList.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import dayjs from 'dayjs'
import { orderLisUser } from '@/api/liveBroadcast'
import { useBetCartStore } from '@/stores/betCart'
import { useUserStore } from '@/stores/user'
import RightArrow from '@/components/icons/RightArrow.vue'
import winImage from '@/assets/img/result1.png'
import winHalfImage from '@/assets/img/result2.png'
import { vipLive } from '@/utils/config.js'
import loseImage from '@/assets/img/result3.png'
import loseHalfImage from '@/assets/img/result4.png'
import backMoney from '@/assets/img/result5.png'
import draw from '@/assets/img/result6.png'
import invalidOrder from '@/assets/img/result7.png'
import settle from '@/assets/img/result8.png'
import { onMounted } from 'vue'
const props = defineProps({
  seebathingBool: {
    type: Boolean
  }
})
const user = useUserStore()
const betCartStore = useBetCartStore()
const emit = defineEmits(['seebathingShow'])
const dialogShow = ref(false)
const liveStore = useLiveStore()

const shineUponList = ref([])
//晒单列表
const closeBtn = (type) => {
  dialogShow.value = type
  emit('seebathingShow',false)
}
onMounted(() => {
  console.log('props.seebathingBool', props.seebathingBool)
  dialogShow.value = props.seebathingBool
  getOrderListAnchor()
})
//用户晒单列表
const getOrderListAnchor = async () => {
  let data = {
    chatRoomId: liveStore.liveRoom.id,
  }
  if(liveStore.roomSportType==0){
    data.pushType=2
  }
  
  try {
    let res = await orderLisUser(data)
    shineUponList.value = Object.values(res.data)
    // console.log(shineUponList.value[0].orderGroupList[0].id,'shineUponList')
  } catch (e) {
    console.log(e)
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
//只看晒单 的跟单
const followerFn = (item) => {
  betCartStore.anchorBetType = 2
  betCartStore.anchorBetObj = {
    id: item.marketId,
    betMatchMarket: {
      optionType: item.betStyle // 投注类型
    },
    // // 展示类型数据
    visible: {
      betOpTitle: item.betStyleName // 投注项名称 -0/0.5
    },
    marketId: item.marketId, // 玩法id  加个字段
    betMarket: item.betMarket,
    betOdds: item.betOdds,
    cusName: item.cusName, //客队
    gameId: item.gameId,
    gameTimestamp: item.gameTime,
    leagueName: item.leagueName,
    orderTitle: item.orderTitle,
    mainName: item.mainName, //主队
    pushType: 2,
    betStyle: item.betStyle, // 投注类型
    matchTeam: item.matchTeam,
    betStyleName: item.betStyleName
  }
  dialogShow.value = false
  emit('seebathingShow',false)
  console.log(betCartStore.anchorBetObj, 'betCartStore.anchorBetObj')
}
</script>
<style scoped lang="scss">
.lookBask {
  height: 428px;
  overflow-y: auto;
  scrollbar-width: none; //火狐浏览器 隐藏滚动条
  .result1 {
    position: absolute;
    right: 30px;
  }
  .lookWrap {
    display: flex;
    column-gap: 20px;
    flex-wrap: wrap;
    gap: 20px;
  }

  .lookMain {
    width: 310px;
  }

  .lookTop {
    display: flex;
    align-items: center;
    .memberVip{
      width: 36px;
      height: 16px;
    }
    .lk1 {
      color: var(--60, rgba(255, 255, 255, 0.6));
      
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      /* 133.333% */
      max-width: 66px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-left: 4px;
    }

    .lk2 {
      min-width: 56px;
      height: 16px;
      border-radius: 24px;
      background: var(--unnamed, #171a2f);
      color: var(--unnamed, #f35f1b);
      
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
      padding: 0 6px;
      /* 100% */
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 4px;
    }

    .lk3 {
      color: #aaa;
      
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 10px;
      /* 100% */
      margin-left: 4px;
    }
  }

  .lookCen { 
    width: 414px;
    height: 105px;
    flex-shrink: 0;
    background-color: #171A2F;
    border-radius: 8px;
    margin-top: 8px;

    .shbBon {
      height: 105px;
      padding: 12px;
    }

    .shbTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #171A2F;

      .topLeft {
        display: flex;
        flex-direction: column;
        align-items: baseline;
      }
    }

    .b1 {
      font-size: 14px;
      font-weight: 400;
      margin-top: 6px;
    }

    .b2 {
      color: var(--60, rgba(255, 255, 255, 0.6));
      text-align: center;
      
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
    }

    .txt {
      color: #fff;
      
      font-style: normal;
      line-height: normal;
    }

    .rightLook {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .line {
      margin: 10px 0;
    }

    .line::before {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      background: repeating-linear-gradient(to right, #555, #555 5px, transparent 5px, transparent 10px);
    }
    .bonDetail {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }


      .b4 {
        color: #FFF;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
        /* 114.286% */
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
        line-height: 17px;
        /* 141.667% */
      }
    }
  }
  .txtC {
    max-width: 90px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}</style>
