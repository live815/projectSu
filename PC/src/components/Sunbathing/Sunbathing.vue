<template>
  <CustomizeDialog :dialogShow="dialogShow" @closeBtn="closeBtn" :title="i18n.global.t('HomeView.Postorders')" v-if="dialogShow" :width="454">
    <div class="sunbathing" v-if="betOrder && betOrder.length > 0">
      <div class="sbhList">
        <div v-for="item in betOrder" :key="item.id" class="betList">
          <div class="sbhMain" v-if="item.sert == 0">
            <div class="shbBon">
              <div class="shbTop">
                <div class="topLeft">
                  <!-- {{ item.ops[0].mgn }} @{{item.ops[0].od}} -->
                  <div class="b2">{{ item.ops[0].mgn }}</div>
                  <div class="txt b1">{{ item.ops[0].onm }} @{{item.ops[0].od}}</div>
                </div>
                <!-- <img class="result1" src="../../assets/img/result1.png"> -->
                <SunbathingIcon class="sIcon" @click="setItem(item)" v-if="activeIndex.includes(item.id)" />
                <div @click="setItem(item)" v-else class="iconBg"></div>
              </div>

              <div class="line"></div>
              <div>
                <div class="bonDetail">
                  <div class="b2">{{$t('Components.BetAmount')}}：<span class="b3">{{ item.us }}</span></div>
                  <div class="b2">{{$t('Components.MaximumWinnable')}}：<span class="b3" style="color: var(--2, #FF5000);">+{{ item.mwa }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div :class="[activeIndex?.length>0 ? 'sendBtn sendBtnActive' : 'sendBtn']" @click="AllSend()">
        {{$t('Components.Confirm')}}
      </div>
    </div>
    <NoList class="sunbathing" v-else />
  </CustomizeDialog>
</template> 
<script setup>
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import NoList from '@/components/NoList/NoList.vue'
import SunbathingIcon from '@/components/icons/SunbathingIcon.vue'
// import { getBallTypeTextById } from '@/hooks/useSportDict'
// import { orderStatus, formatCurrentTime } from '@/utils/cache'
import { betRecord } from '@/api/fb'
import { useFBStore } from '@/stores/fb'
import { useLiveStore } from '@/stores/liveBroadcast'
import eventBus from '@/utils/eventBus'
import { useTencentIM } from '@/utils/useTencentIM.js'
import { setPushOrder } from '@/api/liveBroadcast'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
const user = useUserStore()
const props = defineProps({
  sunbathingBool: {
    type: Boolean
  }
})
const emit = defineEmits(['sunbathingShow'])
const dialogShow = ref(false)
const liveStore = useLiveStore()
const fbStore = useFBStore()
const activeIndex = ref([])
const itemObj = ref()
const betOrder = ref([])

const closeBtn = (type) => {
  dialogShow.value = type
  emit('sunbathingShow',false)
}
onMounted(() => {
  console.log('props.sunbathingBool', props.sunbathingBool)
  dialogShow.value = props.sunbathingBool
  betRecordOrder()
})
//查询投注记录
const betRecordOrder = async () => {
  //查询已结算列表
  let res = await betRecord({
    isSettled: true,
    current: 1,
    size: 50
  })
  //查询未结算列表
  let resT = await betRecord({
    isSettled: false,
    current: 1,
    size: 50
  })
  let arrOrder = [...res.records, ...resT.records]
  let gameId=liveStore.roomSportType==0?liveStore.liveRoom.gameId:liveStore.liveRoom.id
  betOrder.value = arrOrder.filter(
    (item) => item.ops[0].mid == gameId && item.sert == 0
  )
  console.log(res, '--', resT, betOrder.value)
}
//晒单
const AllSend=()=>{
  console.log(activeIndex.value.length,activeIndex.value[0],'activeIndex.value')
  if(activeIndex.value?.length>0){
    let result = betOrder.value.filter(item => activeIndex.value.includes(item.id));
    result.forEach(item => {
      send(item);
    });
  }
  emit('sunbathingShow',false)
}
const send = (item) => {
  const { sendMessage } = useTencentIM()
  console.log(item, 'item')
  const role = user.userInfo.role
  const vipLevel = user.userInfo.vipLevel
  const userId = user.userInfo.id
  const nickName = user.userInfo.nickName
  const cloudCustomData = JSON.stringify({ role, vipLevel,userId,nickName })
  const data = {
    type: 'customize',
    text: 'exhibit-Order',
    description: JSON.stringify(item),
    cloudCustomData
  }
  sendMessage(data).then((res) => {
    eventBus.emit('SendMessage', res)
    // showHide()
  })
  const matchId = liveStore.roomSportType==0?liveStore.liveRoom.gameId:liveStore.liveRoom.id
  const match = fbStore.matchDetailList
  const betObj = {
    winAmount: item.mwa, //可赢金额
    betAmount: item.sat,
    betOrderState: item.st === 5 ? 1 : 0, //注单状态（0.未结算 1.已结算
    marketId: item.ops[0].mrid, // 玩法id  加个字段
    betMarket: item.ops[0].onm,
    betOdds: item.ops[0].od,
    cusName: fbStore.matchDetailList.ts[1].na, //客队
    gameId: matchId,
    gameTimestamp: match.bt,
    leagueName: match.lg.na,
    orderTitle: item.ops[0].mgn,
    liveRoomTitle: liveStore.liveRoom.roomTitle,
    liveStreamId: liveStore.liveRoom.id,
    chatRoomId: liveStore.liveRoom.id,
    mainName: fbStore.matchDetailList.ts[0].na, //主队
    pushType: 2,
    sportsType: liveStore.roomSportType==0?liveStore.liveRoom.roomStyle:liveStore.roomSportType==1?1:3,
    pushUserId: user.userInfo.id,
    pushUserName: user.userInfo.userName,
    betStyle: item.ops[0].ty, // 投注类型
    matchTeam: item.ops[0].mn,
    betStyleName: item.ops[0].onm,
    pushModel: 0,
    betOrderCode:item.id,//订单id
    userVipLevel:vipLevel,//VIp等级
  }
  setPushOrder([betObj])
  dialogShow.value = false
  console.log(betObj)
}
const setItem = (item) => {
  if (activeIndex.value.includes(item.id)) {
        // 如果id存在，则从数组中删除
        activeIndex.value = activeIndex.value.filter(items => items !== item.id);
  } else {
    // 如果id不存在，则添加到数组中
    activeIndex.value = [...activeIndex.value, item.id];
  }
  // console.log(activeIndex.value.length,activeIndex.value[0],'activeIndex.value')
  itemObj.value = item 
}
</script>
<style scoped lang="scss">
.sunbathing {
  display: flex;
  flex-direction: column;
  height: 375px;
  .sbhList {
    height: 375px;
    overflow-y: auto;
    scrollbar-width: none; //火狐浏览器 隐藏滚动条
  }

  .betList {
    width: 414px;
    height: 105px;
    margin-bottom: 20px;
  }

  .sbhMain {
    width: 414px;
    height: 105px;
    flex-shrink: 0;
    background-color: #171A2F;
    border-radius: 8px;

    .shbBon {
      height: 105px;
      padding: 12px;

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

      .result1 {
        position: absolute;
        right: 80px;
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

      .iconBg {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        cursor: pointer;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.20);
      }

      .sIcon {
        fill: #171A2F;
        margin-right: 8px;
        cursor: pointer;
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
        color: var(--60, rgba(255, 255, 255, 0.6));
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
}
</style>
