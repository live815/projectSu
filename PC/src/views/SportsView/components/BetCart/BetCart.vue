<template>
  <div class="BetCartviews">
    <div class="BetCartviews-wrap" v-if="quickBet">
      <div class="BetCartviews-title">
        <div class="back" @click="goBack"><img :src="arrowleft" alt=""></div>
        <div>{{$t('SportsView.QuickBet')}}</div>
        <div class="num"><span>{{ betCartStore.betNums }}</span></div>
      </div>
      <!-- 注单类型 -->
      <div class="BetCartviews-header" v-if="betCartStore.betList.length>0 ">
        <div class="item" :class="singleBetClass" @click="handleClick('SingleBet')">{{$t('SportsView.SingleLevel')}}</div>
        <div class="item" :class="multiBetClass" @click="handleClick('MultiBet')" v-if="betCartStore.betList.length > 1">{{$t('SportsView.Collusion')}}</div>
        <div class="item" :class="currentBetRecordClass" @click="handleClick('CurrentBetRecord')">{{$t('SportsView.InProgress')}}</div>
      </div>
      <!-- 购物车内容 -->
      <div class="BetCartviews-con" v-if="betCartStore.betList.length>0">
        <SingleBet v-if="activeName == 'SingleBet'" />
        <MultiBet v-if="activeName == 'MultiBet'" />
        <CurrentBetRecord v-if="activeName == 'CurrentBetRecord'" />
        <!-- 投注状态遮罩层 -->
        <!-- <div class="mask" ref="mask" v-if="betCartStore.ifShowLayer" @click="closeMask">
          <div>
            <img :src="load" alt="" v-if="loadings" class="loadings">
            <img :src="con" alt="" v-if="success" class="success">
            <img :src="fai" alt="" v-if="failure" class="failure">
            <span v-text="loadingText"></span>
          </div>
        </div> -->
      </div>
      
      <!-- <div v-else style="padding: 10px 10px;">暂无注单</div> -->
      
    </div>
    <!-- 注单状态 -->
    <div v-else>
      <OrderStatus :success="success" :failure="failure"/>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {  ref, watch } from 'vue'
import SingleBet from './SingleBet.vue'
import MultiBet from './MultiBet.vue'
import eventBus from '@/utils/eventBus'
import load from './img/loading.gif'
import con from './img/confirm.png'
import fai from './img/failure.png'
import arrowleft from './img/arrow-left.png'
import CurrentBetRecord from './CurrentBetRecord.vue'
import OrderStatus from './OrderStatus.vue'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const quickBet = ref(true)
const loadings = ref(false)
const success = ref(false)
const failure = ref(false)
const betSuccess = ref(false)
const activeName = ref('SingleBet')
const loadingText = ref(i18n.global.t('SportsView.BettingConfirmed'))
let refreshOddTimer = null
const mask = ref(null)
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
watchEffect(() => {
  betCartStore.isSelectSeries = activeName.value === 'MultiBet'
  updateOddBeforeBet()
  if (activeName.value === 'CurrentBetRecord') {
    clearInterval(refreshOddTimer)
  }
})
const singleBetClass = computed(() => {
  return {
    active: activeName.value === 'SingleBet'
  };
});

const multiBetClass = computed(() => {
  return {
    active: activeName.value === 'MultiBet'
  };
});

const currentBetRecordClass = computed(() => {
  return {
    active: activeName.value === 'CurrentBetRecord'
  };
});
// 切换单关串关和进行中
function handleClick(val){
  activeName.value = val
  fbStore.queryMatchListParams.current = 1
  betCartStore.betList.map((bet) => {
    // console.log(bet,'bet')
    bet.showQuick = false
  })
  if(activeName.value !== 'CurrentBetRecord'){
    StartInterval()
  }
}
// 开启定时器
function StartInterval(){
  StopInterval()
  refreshOddTimer = setInterval(() => {
      updateOddBeforeBet()
    }, 5000)
}
// 关闭定时器
function StopInterval() {
  clearInterval(refreshOddTimer)
  refreshOddTimer = null
}

// 监听是否有生成投注注单
watch(
  ()=>betCartStore.betList.length,
  ()=>{
    if(betCartStore.betList.length>0){
      StartInterval()
    }else{
      StopInterval()
    }
    if(betCartStore.betList.length == 1){
      activeName.value = 'SingleBet'
    }
    if(betCartStore.betList.length == 0){
      betCartStore.isOpenBetCart = false
      fbStore.hotMenuStatus = true
    }
  },{deep:true, immediate: true}
)


function updateOddBeforeBet() {
  const isSelectSeries = betCartStore.isSelectSeries
  let betMatchMarketList = []
  if (isSelectSeries) {
    betMatchMarketList = betCartStore.canMultiBetsList.map((bet) => {
      const obj = bet.betMatchMarket
      obj.type = obj.optionType
      return obj
    })
  } else {
    betMatchMarketList = betCartStore.betList.map((bet) => {
      const obj = bet.betMatchMarket
      obj.type = obj.optionType
      return obj
    })
    
  }
  const reqData = {
    isSelectSeries, // 是否参选串关
    betMatchMarketList // 赛事盘口集合
  }
  betCartStore.updateOddBeforeBet(reqData)
}


eventBus.on('loadingText',(val)=>{
  // console.log(val)
  loadingText.value = val
  betCartStore.ifShowLayer = true
  if(val == i18n.global.t('SportsView.BetSuccessful')){
    success.value = true
    loadings.value = false
    failure.value = false
    
  }
  if(val == i18n.global.t('SportsView.BetFailed')){
    success.value = false
    loadings.value = false
    failure.value = true
  }
  if(val == i18n.global.t('SportsView.BettingConfirmed') ||  val == i18n.global.t('SportsView.ReservationBettingConfirmed')){
    loadings.value = true
  }
  if(val == i18n.global.t('SportsView.AppointmentSuccessful')){
    success.value = true
    loadings.value = false
    failure.value = false
  }
})
eventBus.on('quickbet',(val)=>{
  // console.log(val,'val')
  quickBet.value = val
  betCartStore.betList.map((item)=>{
    item.unitStake = ''
  })
})
function closeMask(){
  // console.log(loadingText)
  // betCartStore.isClickBetLayer = true
  betCartStore.ifShowLayer = false
  if(loadingText.value == i18n.global.t('SportsView.BetSuccessful')){
    betSuccess.value = true
    quickBet.value = false
  }
  if(loadingText.value == i18n.global.t('SportsView.BetFailed')){
    betCartStore.ifShowLayer = false
  }
  if(loadingText.value == i18n.global.t('SportsView.ReservationBettingSuccessful')){
    // console.log('预约投注成功')
  }
}
const handleClickOutside = (event) =>{
  const maskDiv = mask.value;
  if (maskDiv && !maskDiv.contains(event.target)) {
    betCartStore.ifShowLayer = false
    betCartStore.betList = []
  }
}
function goBack(){
  betCartStore.isOpenBetCart = false
  fbStore.sportMenuStatus = true
  fbStore.hotMenuStatus = true
  activeName.value = 'SingleBet'
  StopInterval()
}
watch(
  ()=>fbStore.isClickColmn,
  ()=>{
    if(fbStore.isClickColmn){
      handleClick('SingleBet')
    }
  }
)
// 监听是否确认投注了
watch(
  ()=>fbStore.ifShowLayer,
  ()=>{
    // console.log(fbStore.ifShowLayer,'fbStore.ifShowLayer')
    if(fbStore.ifShowLayer){
      quickBet.value = false
    }
  },{deep:true, immediate: true}
)

onUnmounted(() => {
  clearInterval(refreshOddTimer)
  betCartStore.ifShowLayer = false
  document.removeEventListener('click', handleClickOutside);
  eventBus.off('loadingText')
  eventBus.off('quickbet')
})
onBeforeUnmount(() => {
  StopInterval()
  betCartStore.betList = []
});
</script>

<style lang="scss" scoped>
.BetCartviews{
  background: #171A2F;
  
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  .BetCartviews-wrap{
    .BetCartviews-title{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      height: 40px;
      color: var(--100, #FFF);
      
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      background: #171A2F;
      .back{
        cursor: pointer;
      }
      .num{
        span{
          display: flex;
          width: 28px;
          height: 20px;
          line-height: 20px;
          align-items: center;
          border-radius: 2px;
          background: #303862;
          justify-content: center;
          font-size: 12px;
        }
      }
    }
    .BetCartviews-header{
      display: flex;
      height: 45px;
      align-items: center;
      position: relative;
      justify-content: space-evenly;
      margin-top: 8px;
      margin-bottom: 3px;
        .item{
          width: 69px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background: #0D0F1C;
          color: var(--60, rgba(255, 255, 255, 0.60));
          cursor: pointer;
        }
        .active{
          color: var(--100, #FFF);
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        }

    }
    :deep(){
      .el-tabs__nav-wrap::after{
        display: none;
      }
      .el-tabs__active-bar{
        display: none; 
      }
      .el-tabs__content{
        display: none;
      }
      .el-tabs__item {
        width: 69px;
        height: 32px;
        color: var(--60, rgba(255, 255, 255, 0.60));
        text-align: center;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        border-radius: 4px;
        background: #0D0F1C;
        padding: 0;
      }
      .el-tabs__item.is-active{
        color: #FFF;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        text-align: center;
      }
    }
    .BetCartviews-con{
      // padding: 20px 10px;
      // height: auto;
      height: calc(100vh - 300px);
      overflow: scroll;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
      position: relative;
      max-height: 790px;
      .mask{
        position: fixed;
        height: 100%;
        width: 240px;
        background: rgba(0, 0, 0, 0.50);
        top: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img{
          display: block;
        }
        span{
          margin-top: 20px;
          color: #FFF;
        }
        .loadings{
          width: 40px;
          height: 20px;
        }
        .success{
          width: 40px;
          height: 40px;
        }
        .failure{
          width: 40px;
          height: 40px;
        }
      }
      .cartBottom{
        display: flex;
        flex-direction: row;
        height: 35px;
        align-items: center;
        justify-content: space-between;
        
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        cursor: pointer;
        margin-bottom: 10px;
        .del{
          width: 60px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          border: 1px solid var(--unnamed, #F35F1B);
          height: 100%;
          color: #F35F1B;
          justify-content: center;
        }
        .bet{
          border-radius: 4px;
          background: #454859;
          display: flex;
          align-items: center;
          height: 100%;
          color: #fff;
          width: 70%;
          justify-content: center;
          border-color:#454859 ;
        }
        .active{
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        }
      }
    }
  }
}

</style>