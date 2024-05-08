<template>
  <div class="BetItem-view">
    <div class="cartCard" >
      <div class="cartCard-title">
        <p v-if="item.visible.title" class="tit" :title="item.visible.title">{{ item.visible.title }}</p>
        <p class="tit" :title="item.visible.lgName" v-else>{{ item.visible.lgName }}</p>
        <div @click="deleteBetItem(item)" class="delete"><img :src="trashbin" alt=""></div>
      </div>
      <div class="lgName">
        <span>{{ item.visible.lgName}}</span>
        <!-- 比赛开始时间 -->
        <span>{{ formatTime(item.visible.begainTime) }}</span>
      </div>
      <div class="bg-wrap">
        <div class="market-name">
          <span v-if="item.ip==1">{{ $t('SportsView.RollingBall') }}-</span>
          {{ item.visible.marketTitle }}
          <!-- 下注时的比分 -->
          <span class="re" style="margin: 0 3px;" v-if="item.re">({{ item.re }})</span>
           [{{ getOddFormatText(fbStore.settings.oddsFormat) }}]
        </div>
        <div class="match-option-name">
          <div class="team-wrapper" v-if="[1, 2].includes(item.betMatchMarket.optionType)">
            <div class="teamName nm">
              <!-- {{ item.nm }} -->
              <!-- 是否显示主客队 -->
              <p :title="item.visible?.teamName + item.visible?.betOpTitle">
                <span v-if="[1, 2].includes(item.betMatchMarket.optionType)" >{{item.visible.teamName}}</span>
              </p>
            </div>
          </div>
          <div class="book-wrapper" >
            <!-- 盘口和赔率 -->
            <div class="rate" :class="item.changeStateClass">
              <span style="margin-right: 10px;">{{ item.visible.betOpTitle }}</span>
              <span class="num">@{{ getOddFormat(item.betMatchMarket.odds, fbStore.settings.oddsFormat) }}</span>
              <IconKLineArrow v-if="item.changeStateClass == 'up' || item.changeStateClass == 'down'" class="arrow"/>
            </div>
            <!-- 预约按钮 -->
            <div class="book" @click="addBook(item)"  v-if="!betCartStore.isSelectSeries && isOpenStatusCanBet">+{{ $t('SportsView.Reserve') }}</div>
          </div>
        </div>
        <!-- 预约赔率调整框 -->
        <div class="book-rate" v-if="isBooking && isOpenStatusCanBet && !betCartStore.isSelectSeries">
          <el-input-number v-model="selfOdds" size="small" :min="getOddFormat(item.betMatchMarket.odds, fbStore.settings.oddsFormat)"
          :step="parseFloat('0.01')" />
        </div>
      </div>
      <div class="amount-box" v-if="!betCartStore.isSelectSeries && isOpenStatusCanBet">
        <div class="amount-input-box">
          <div class="amount-icon">
            <CurrencyUnit/>
            <!-- <img :src="moneyicon" alt=""> -->
          </div>
          <!-- 金额输入框 -->
          <input  :disabled="(item?.smax && isOpenStatusCanBet)?false:true" type="Number" v-model="amount" @click="inputClick(item)" :placeholder="[item?.smax>0?$t('SportsView.Limit')+(item?.smin || 0)+'-'+(item?.smax || 0):$t('SportsView.Loading')]">
        </div>
      </div>
      <!-- 超过金额范围提示 -->
      <div v-if="isOverMax" class="tip" >
          <p>
            {{$t('SportsView.AmountRange')}}：{{ item.smin }}-{{ item.smax }}，<span v-text="tip"></span>
          </p>
        </div>
      <div class="amount-after" v-if="!betCartStore.isSelectSeries && isOpenStatusCanBet">
        <div>{{$t('SportsView.Winnable')}}：</div>
        <div><CurrencyUnit />{{winnable}}</div>
      </div>
      <div class="quickBox" v-if="item.showQuick  && isOpenStatusCanBet">
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(100)" >+100</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(200)">+200</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(500)">+500</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(1000)">+1000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(5000)">+5000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="toMax(item)">MAX</el-button>
      </div>
      <!-- <div class="quickBox" v-if="item.showQuick  && isOpenStatusCanBet && appStore.language == 'vi'">
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(100000)" >+100000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(200000)">+200000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(500000)">+500000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(1000000)">+1000000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="addAmount(5000000)">+5000000</el-button>
        <el-button :disabled="item?.smax?false:true" class="quickamount" @click="toMax(item)">MAX</el-button>
      </div> -->
      <!-- 比赛状态 提示语-->
      <div class="bettips gray" v-if="!isOpenStatusCanBet">
        <span class="mark">!</span>
        <span>{{$t('SportsView.HandicapClosed')}}</span>
      </div>
      <div class="bettips gray" v-else-if="notAllowMultiBet && betCartStore.isSelectSeries">
        <span class="mark">!</span>
        <span>{{$t('SportsView.NotSupportCrossMatching')}}</span>
      </div>
      <div class="bettips gray" v-else-if="hasSameMatch">
        <span class="mark">!</span>
        <span>{{$t('SportsView.CannotSelectTheSameEvent')}}</span>
      </div>
      <!-- 预约投注 -->
      <div class="bookBottom" v-if="isBooking && isOpenStatusCanBet && !betCartStore.isSelectSeries">
        <div class="Bottom">
          <div class="del" @click.stop="cancelBook(item)">{{$t('SportsView.Cancel')}}</div>
          <el-button type="info" :disabled="disabledbtn" class="bet"  @click="bookBet(item)" :loading="loading">{{$t('SportsView.ConfirmBookingReservation')}}</el-button>
        </div>
      </div>
      <div :class="{ 'close-state': !item.isBooking && isBooking }"></div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref} from 'vue'
import trashbin from './img/trashbin.png'
import { getOddFormatText, getOddFormat } from '@/hooks/useSportDict'
import eventBus from '@/utils/eventBus'
import { ElNotification } from 'element-plus'
import { formatTime } from '@/utils'
import moneyicon from './img/moneyicon.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const winnable=ref(0)
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  isBooking: {
    type: Boolean,
    default: false
  },
  amounts: {
    type: [Number,String],
    default: 0
  },
  max: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  showQuick:{
    type:Boolean,
    default:false
  }
})

const isOverMax = ref(false)
const amount = ref()
const quickbox = ref(true)
const loading = ref(false)
const selfOdds = ref(0)
const emit = defineEmits(['updateAmount', 'updateIsBooking', 'bookSuccess'])
const showQuickamount = ref(false)
const tip = ref(i18n.global.t('SportsView.ToMaximum'))
const disabledbtn = computed(()=>{
  if(betCartStore.betList.length > 0 && Number(userStore.balance)>0 && Number(userStore.balance)>=amount.value ){
      return false
  }else{
    return true
  }
})
//删除注单
function deleteBetItem(betItem) {
  betCartStore.removeBet(betItem)
}
eventBus.on('quickbox',(val)=>{
  quickbox.value = val
})
onUnmounted(()=>{
  eventBus.off('quickbox')
})
function inputClick(item){
  item.showQuick = true
}
// 点击预约
function addBook(val) {
  val.isBooking = true
// 初始化预约赔率
  selfOdds.value = getOddFormat(val.betMatchMarket?.odds, fbStore.settings.oddsFormat)
  emit('updateIsBooking', true, selfOdds.value)
}
// 取消预约
function cancelBook(val) {
  val.isBooking = false
  selfOdds.value=getOddFormat(props.item.betMatchMarket.odds, fbStore.settings.oddsFormat)
  emit('updateIsBooking', false, selfOdds.value)
}
const isHongKong = computed(() => {
  return fbStore.settings.oddsFormat === 2
})
// 提交预约
async function bookBet(val) {
  betCartStore.ifShowLayer = true
  eventBus.emit('loadingText',i18n.global.t('SportsView.ReservationBettingConfirmed'))
  const betMatchMarket = val.betMatchMarket
  betMatchMarket.odds = Number(selfOdds.value) + (isHongKong.value ? 1 : 0)
  betMatchMarket.oddsFormat = fbStore.settings.oddsFormat
  const reqData = {
    betOptionList: [betMatchMarket],
    unitStake: val.unitStake
  }
  loading.value = true
  try {
    const result = await betCartStore.bookBet(reqData)
    if (result.id) {
      bookSuccess(val)
      cancelBook(val)
      eventBus.emit('loadingText',i18n.global.t('SportsView.AppointmentSuccessful'))
    }
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}
// 预约成功
function bookSuccess() {
  const item = props.item
  ElNotification({
    title: i18n.global.t('SportsView.AppointmentSuccessful'),
    message: `${(i18n.global.t('SportsView.BetSuccessTips',{title:item.visible.title,marketTitle:item.visible.marketTitle}))}`,
    type: 'success',
    // duration:0
  })
  amount.value = ''
}
function addAmount(val) {
  amount.value =  val
}
function toMax(val) {
  let balance = Number(userStore.balance)
  let max = val.smax
  if (!balance) return

  if (balance >= max) {
    amount.value = max
  } else {
    amount.value = balance
  }
  isOverMax.value = true
}
//监听金额
watch(
  [() =>amount.value,()=>props.item.betMatchMarket.odds],
  ([newvalue1,newvalue2]) => {
    // console.log(newvalue1,newvalue2,444444)
  const balance = ref(Number(userStore.balance) || 0)
  let max = props.max
  // console.log(amount.value,2222,balance.value,)
  if (amount.value >= balance.value) {
    isOverMax.value = true
    amount.value = balance.value
    // tip.value = '账户可用余额不足'
  } else if (amount.value >= max) {
    amount.value = max
    isOverMax.value = true
  } else {
    isOverMax.value = false
  }
  // 最终要转string
  // amount.value = String(amount.value)
  // console.log(selfOdds.value,'selfOdds',props.item.betMatchMarket.odds,fbStore.settings.oddsFormat,amount.value)
  if(selfOdds.value !== props.item.betMatchMarket.odds && props.isBooking){
    // console.log(11111)
    selfOdds.value = getOddFormat(selfOdds.value, fbStore.settings.oddsFormat)
  }else{
    selfOdds.value=getOddFormat(props.item.betMatchMarket.odds, fbStore.settings.oddsFormat)
    // console.log(selfOdds.value,'selfOdds.value')
  }
  // console.log(isHongKong.value,selfOdds.value,amount.value,props.isBooking)
  // console.log(selfOdds.value,'selfOdds.value amount',props.item.betMatchMarket.odds,amount.value,!amount.value)
    if(!amount.value){
      winnable.value = 0
    }
    if(amount.value > 0 && !props.isBooking){
      // console.log(isHongKong.value,selfOdds.value,Number(amount.value))
      winnable.value=(Number(amount.value) * (Number(Number(props.item.betMatchMarket.odds) - Number(isHongKong.value ? 0 : 1)))).toFixed(2)
      // console.log(winnable.value,'winnable.value')
    }else{
      winnable.value=(Number(amount.value) * (Number(Number(selfOdds.value) - Number(isHongKong.value ? 0 : 1)))).toFixed(2)
    }
    
  
  emit('updateAmount', amount.value,props.item,selfOdds.value)
},{deep:true, immediate: true})
//监听预约赔率
watch(
  () => selfOdds.value,
  () => {
    // console.log(selfOdds.value)
    if(!amount.value){
      winnable.value = 0
    }else{
      winnable.value=(amount.value * (Number(Number(selfOdds.value) - Number(isHongKong.value ? 0 : 1)))).toFixed(2)
    }
    // winnable.value=(amount.value * (Number(Number(selfOdds.value) - Number(isHongKong.value ? 0 : 1)))).toFixed(2)
    emit('updateAmount', amount.value,props.item,selfOdds.value)
  },{deep:true, immediate: true}
)
// 开售状态，可下注
const isOpenStatusCanBet = computed(() => {
  return props.item.ss === 1 && props.item.betMatchMarket.odds > 0
})

// 不支持串关
const notAllowMultiBet = computed(() => {
  return props.item.au !== 1
})

// 存在相同赛事
const hasSameMatch = computed(() => {
  return (
    betCartStore.betList.filter((bet) => bet.matchId === props.item.matchId).length > 1 &&
    betCartStore.isSelectSeries
  )
})
watch(
  ()=>betCartStore.oneKeyNumber,
  ()=>{
    amount.value = betCartStore.oneKeyNumber
  }
)

</script>

<style lang="scss" scoped>
.BetItem-view{
  position: relative;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;//火狐浏览器 隐藏滚动条
  .cartCard{
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    .cartCard-title{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      color: var(--100, #FFF);
      
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      position: relative;
      padding: 0 10px;
      &::before{
        content: "";
        position: absolute;
        width: 4px;
        height: 15px;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        border-radius: 0px 100px  100px 0;
        left: 0;
      }
      .tit{
          width: 82%;
          overflow: hidden;
          flex-wrap: nowrap;
          display: -webkit-box;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-align: left;
          height: 30px;
          line-height: 30px;
      }
      .delete{
        cursor: pointer;
      }
      .lgName{
        display: flex;
        justify-content: space-between;
      }
    }
    .lgName{
      color: var(--60, rgba(255, 255, 255, 0.60));
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; 
      text-align: left;
      padding: 0 10px;
    }
    .bg-wrap{
      display: flex;
      width: 224px;
      // height: 62px;
      line-height: 24px;
      flex-direction: column;
      border-radius: 2px;
      background: #232949;
      padding: 8px 10px;
      margin: 10px auto;
      align-items: flex-start;
      div{
        margin-right: 10px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        
      }
      .book{
        margin-right:0px;
      }
      .market-name{
        color: var(--100, #FFF);
        display: flex;
        flex-wrap: wrap;
      }
      .match-option-name{
        color: var(--60, rgba(255, 255, 255, 0.60));
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        .teamName{
          width: auto;
          overflow: hidden;
          flex-wrap: nowrap;
          display: -webkit-box;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-align: left;
          height: 30px;
          line-height: 30px;
        }
        .nm{
          margin-right: 0;
          max-width: 100px;
          p{
            width: 100px;
          }
        }
        .rate{
          color: var(--unnamed, #FF9000);
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          // margin-left: 5px;
        }
        .up {
          .num {
            color: var(--color-danger);
          }
          .arrow {
            fill: var(--color-danger);
            transform: rotateX(180deg);
          }
        }
        .down {
          .num {
            color: #00b42a;
          }
          .arrow {
            fill: #00b42a;
            opacity: 1;
          }
        }
        .book-wrapper{
          
          cursor: pointer;
          margin-right:0px;
          display: flex;
          width: 100%;
          justify-content: space-between;
          .rate{
            color: var(--60, rgba(255, 255, 255, 0.6));
          }
          .num,.book{
            color: var(--unnamed, #F35F1B);
          }
        }
      }
      .book-rate{
        width: 100%;
        :deep(){
          .el-input-number--small{
            width: 100%;
            margin: 5px 0;
            border: 1px solid #454859;
            background: transparent;
          }
          .el-input--small,.el-input__wrapper,.el-input-number__decrease, .el-input-number__increase{
            background: transparent;
          }
          .el-input-number__decrease{
            border-right: none;
          }
          .el-input-number__increase{
            border-left: none;
          }
          .el-input__wrapper{
            box-shadow: none;
          }
          .el-input-number .el-input__inner{
            color: #fff;
          }
        }
      }
    }
    .amount-box{
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 35px;
      justify-content: space-between;
      padding: 0 10px;
      .amount-input-box{
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.10);
        display: flex;
        align-items: center;
        .amount-icon{
          display: flex;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff9000;
          margin:0 10px;
          align-items: center;
          justify-content: center;
          color: #FFF;
          font-size: 13px;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        input{
          color: #fff;
        }
      }
      .book-wrapper{
        display: flex;
        align-items: center;
        width: 52px;
        height: 100%;
        border-radius: 2px;
        background: #272220;
        color: var(--unnamed, #F35F1B);
        
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        justify-content: center;
        cursor: pointer;
        .book{
          
        }
      }
    }
    .tip{
      color: #f53f3f;
      font-size: 12px;
      margin: 10px 10px;
      line-height: 20px;
      text-align: left;
    }
    .amount-after{
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
    .quickBox{
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      padding: 0 10px;
      .quickamount{
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        background: #1D223C;
        color: var(--60, rgba(255, 255, 255, 0.60));
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        border: none;
        margin-left: 0;
        
      }
      .is-disabled{
          cursor: not-allowed;
        }
      
      .quickamount:nth-child(3n){
        margin-right: 0px;
      }
    }
    .bettips{
      height: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
      // color: var(--unnamed, #E93D3D);
      .mark{
        display: block;
        width: 12px;
        height: 12px;
        background: #E93D3D;
        border-radius: 50%;
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    .gray{
      background: #63676F;
      color: var(--60, rgba(255, 255, 255, 0.60));
      margin-bottom: 10px;
      .mark{
        background: #9b9ea5;
      }
    }
  }
  .Bottom{
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
      // background: #454859;
      display: flex;
      align-items: center;
      height: 100%;
      color: #fff;
      width: 70%;
      justify-content: center;
      border: 1px solid transparent;
      // border-color:#454859 ;
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
    }
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
  }
  :deep(){
    .el-button.is-disabled{
      background: #454859;
      border-color:#454859 ;
    }
  }
}
</style>