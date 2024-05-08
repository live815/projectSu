<template>
  <div class="FixedBotomMultiBet-view">
    <div class="FixedBotomMultiBet-wrap">
      <!-- 基础串关几串一 -->
      <div class="markets-list last" >
        <!-- 只有两场赛事 -->
        <template  v-if="filterSos.length == 1">
          <div class="item"  v-for="(market, idx) in  filterSos" :key="idx">
            <div class="market">
              <p class="ty-odd">
                <span class="ty">{{ getMarketText(market) }}</span>
                <span class="odd">@{{ market.sodd?.toFixed(2) }}</span>
              </p>
            </div>
            <!-- 金额输入框 -->
            <div class="amount-input-box">
              <div class="amount-icon">
                <CurrencyUnit/>
                <!-- <img :src="moneyicon" alt=""> -->
              </div>
              <input type="Number" :disabled="minMaxValue?false:true" id="myInput"   v-model="market.uniStake" @keydown="handleKeyPress"  @click="showQuickamount = true" :placeholder="$t('SportsView.Limit')+market.mi+'-'+market.mx">
            </div>
            <!-- 最高可赢 -->
            <div class="total-amount">
              <div class="flex-title">
                <span class="title">{{$t('SportsView.MaximumWinnable')}}：</span>
                <span class="title-red"><CurrencyUnit />{{ shouldWin(market).toFixed(2)}}</span>
              </div>
            </div>
            <!-- 快捷金额 -->
            <div class="quickBox" v-if="showQuickamount">
              <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(100,market)" >+100</el-button>
              <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(200,market)">+200</el-button>
              <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(500,market)">+500</el-button>
              <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(1000,market)">+1000</el-button>
              <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(5000,market)">+5000</el-button>
              <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="toMax(market)">MAX</el-button>
            </div>
          </div>
        </template>
        <!-- 大于两场赛事 -->
        <template  v-if="filterSos.length>1">
          <div class="item"  v-for="(market, idx) in  filterSos" :key="idx">
            <template v-if="idx == filterSos.length-2">
              <div class="market">
                <p class="ty-odd">
                  <span class="ty">{{ getMarketText(market) }}</span>
                  <span class="odd">@{{ market.sodd?.toFixed(2) }}</span>
                </p>
              </div>
              <!-- 金额输入框 -->
              <div class="amount-input-box">
                <div class="amount-icon">
                  <CurrencyUnit/>
                  <!-- <img :src="moneyicon" alt=""> -->
                </div>
                <input type="Number" :disabled="minMaxValue?false:true" id="myInput"   v-model="market.uniStake" @keydown="handleKeyPress"  @click="inputClick(market)" :placeholder="$t('SportsView.Limit')+market.mi+'-'+market.mx">
              </div>
              <!-- 最高可赢 -->
              <div class="total-amount">
                <div class="flex-title">
                  <span class="title">{{$t('SportsView.MaximumWinnable')}}：</span>
                  <span class="title-red"><CurrencyUnit />{{ shouldWin(market).toFixed(2)}}</span>
                </div>
              </div>
              <!-- 快捷金额 -->
              <div class="quickBox" v-if="market.showQuick">
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(100,market)" >+100</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(200,market)">+200</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(500,market)">+500</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(1000,market)">+1000</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(5000,market)">+5000</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="toMax(market)">MAX</el-button>
              </div>
            </template>
          </div>
        </template>
      </div>
      
      <!-- 展开或者折叠更多串关 -->
      <div class="more" @click="collapse = !collapse " v-if="filterSos.length>1">
        <div v-if="collapse">
          <p>{{$t('SportsView.ExpandMore')}}</p><el-icon><CaretBottom /></el-icon>
        </div>
        <div v-else>
          <p>{{$t('SportsView.CloseMore')}}</p><el-icon><CaretTop /></el-icon>
        </div>
      </div>
      <!-- 更多串关方式 -->
      <div class="markets-list"  v-if="!collapse">
        <template  v-if="filterSos.length ">
          <div class="item" v-for="(market, idx) in  filterSos" :key="idx">
            <template v-if="idx !== filterSos.length-2">
              <div class="market">
                <p class="ty-odd">
                  <span class="ty">{{ getMarketText(market) }}</span>
                  <span class="odd">@{{ market.sodd }}</span>
                </p>
              </div>
              <div class="amount-input-box">
                <div class="amount-icon">
                  <CurrencyUnit/>
                  <!-- <img :src="moneyicon" alt=""> -->
                </div>
                <input type="Number" :disabled="minMaxValue?false:true" id="myInput"  v-model="market.uniStake" @keydown="handleKeyPress"  @click="inputClick(market)" :placeholder="$t('SportsView.Limit')+market.mi+'-'+market.mx">
              </div>
              <div class="total-amount">
                <div class="flex-title">
                  <span class="title">{{$t('SportsView.MaximumWinnable')}}：</span>
                  <span class="title-red"><CurrencyUnit />{{ shouldWin(market).toFixed(2)}}</span>
                </div>
              </div>
              <div class="quickBox" v-if="market.showQuick">
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(100,market)" >+100</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(200,market)">+200</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(500,market)">+500</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(1000,market)">+1000</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(5000,market)">+5000</el-button>
                <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="toMax(market)">MAX</el-button>
              </div>
            </template>
          </div>
        </template>
      </div>
      <!-- 总金额计算 -->
      <div class="total-amount">
        <div class="flex-title">
          <span class="title totalamount">{{$t('SportsView.AllBetAmount')}}:</span>
          <span class="title"><CurrencyUnit />{{ betCartStore.isSelectSeries ? multiTotalBet.toFixed(2) : totalBet.toFixed(2) }}</span>
        </div>
        <div class="flex-title">
          <span class="title">{{$t('SportsView.MaximumWinnable')}}：</span>
          <span class="title-red"><CurrencyUnit />{{ betCartStore.isSelectSeries ? multiTotalWin.toFixed(2) : totalWin.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 投注按钮和删除按钮 -->
      <div class="Bottom">
        <div class="del" @click.stop="dialogVisible = true">{{$t('SportsView.Delete')}}</div>
            <el-button type="info" class="bet" :disabled="!availableInputUniStake" @click="subimtBet" :loading="loading">
              {{$t('SportsView.Bet')}}
              <!-- <span class="can-win" >
                ({{$t('SportsView.WinningAmount')}}<CurrencyUnit />{{ betCartStore.isSelectSeries ? multiTotalWin.toFixed(2) : totalWin.toFixed(2) }})
              </span> -->
          </el-button>
      </div>
    </div>
    <!-- 确认删除弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      width="311px"
      height="66px"
      center
      align-center
    >
      <span>{{$t('SportsView.DeleteAll')}}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="cancel" @click="dialogVisible = false">{{$t('SportsView.Cancel')}}</el-button>
          <el-button class="confirm" type="primary" @click="deleteAllBetList">
            {{$t('SportsView.Sure')}}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 余额不足提示 -->
    <el-dialog
      v-model="dialogVisible2"
      width="311px"
      height="66px"
      center
      align-center
    >
      <span>{{$t('SportsView.tips_1')}}</span>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button class="cancel" @click="dialogVisible = false">{{$t('SportsView.Cancel')}}</el-button> -->
          <el-button class="confirm" type="primary" @click="dialogVisible2 = false">
            {{$t('SportsView.Sure')}}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { CaretTop } from '@element-plus/icons-vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { minBy } from 'lodash'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const user = useUserStore()

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const collapse = ref(true) // 默认折叠状态
// const defaultShowMultiMarketLength = 3
const loading = ref(false)
const oneKeyNumber = ref('')
// const oneKeyNumber2 = ref('')
const showQuickamount = ref(false)
// const amount1 = ref()

function addAmount(val,val1) {
  // console.log(val,'val',betCartStore.sos,val1)
  val1.uniStake = val
}
function toMax(item){
  if(userStore.balance>item.mi && userStore.balance<item.mx){
    item.uniStake = userStore.balance
  }
  if(userStore.balance>item.mx){
    item.uniStake = item.mx
  }
  if(userStore.balance<item.mi){
    item.uniStake = 0
  }
}
const sos = computed(() => {
  let res = [...betCartStore.sos]
  res.sort((a, b) => a.sn - b.sn)
  if (res.length > 2) {
    res.push(res.shift())
  }
  // console.log(res,res.length)
  return res
})

const filterSos = computed(() => {
  return sos.value
  // return collapse.value ? sos.value.slice(0, defaultShowMultiMarketLength) : sos.value
})
// const filterData = computed(()=>{
//   // console.log(sos.value.slice(sos.value.length-2, sos.value.length-1),sos.value)
//   return sos.value.slice(sos.value.length-3, sos.value.length-2)
// })
// 几串几
function getMarketText(market) {
  // console.log(market,'market')
  let sn = market.sn // 比赛场次
  let combinations = market.in // 注码组合数
  const totalMatchs = betCartStore.canMultiBetsList.length
  let matchs = sn || totalMatchs
  let chuan = 1
  if (sn === 0) {
    chuan = combinations
  }
  return `${matchs}${i18n.global.t('SportsView.chuan')}${chuan}*${combinations}`
}
// 单个玩法可赢
function shouldWin(market) {
  return Number(market.uniStake) * (market.sodd - market.in) || 0
}
// 点击金额输入框
function inputClick(val){
  // console.log(val,'val',val.id,sos.value)
  val.showQuick = true
}
// 确认删除
function deleteAllBetList(){
  betCartStore.removeAllBets()
  betCartStore.isOpenBetCart = false
}
// const minMinValue = computed(() => {
//   // console.log(betCartStore.betList)
//   return minBy(betCartStore.betList, 'smin')?.smin || 0
// })
const minMaxValue = computed(() => {
  return minBy(betCartStore.betList, 'smax')?.smax || 0
})
// 总投注额
const totalBet = computed(() => {
  return sos.value.reduce((accumulator, market) => {
    return accumulator + (Number(market.uniStake) || 0) * market.in
  }, 0)
})

// 总可赢额
const totalWin = computed(() => {
  return sos.value.reduce((accumulator, market) => {
    return accumulator + (Number(market.uniStake) * (market.sodd - market.in) || 0)
  }, 0)
})

// 串关总投注额
const multiTotalBet = computed(() => {
  return betCartStore.sos.reduce((accumulator, market) => {
    return accumulator + (Number(market.uniStake) || 0) * market.in
  }, 0)
})
// 串关总可赢额
const multiTotalWin = computed(() => {
  return betCartStore.sos.reduce((accumulator, market) => {
    return accumulator + (Number(market.uniStake) * (market.sodd - market.in) || 0)
  }, 0)
})
// 投注按钮的状态
const availableInputUniStake = computed(() => {
  // console.log(sos.value,'sos.value',)
  return sos.value.some(
    (market) =>
      Number(market.uniStake) >= market.mi &&
      Number(market.uniStake) <= market.mx &&
      Number(market.uniStake) <= Number(userStore.balance)
  )
})
let fetchOrderStatusTimer = null
//确认投注
async function subimtBet() {
  // console.log(Number(multiTotalBet.value.toFixed(2)),Number(userStore.balance))
  // 总投注额大于可用余额时直接弹出余额不足的提示不发送请求不生成订单
  // if(Number(multiTotalBet.value.toFixed(2))>Number(userStore.balance)){
  //   dialogVisible2.value = true
  //   return false
  // }
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    await fbStore.getFBToken()
  }
  if(user.userInfo.centerWallet == 0){
    return false
  }
 
  const canSubmitMultiBetMarkets = sos.value.filter((market) => Number(market.uniStake))
  const betMultipleData = canSubmitMultiBetMarkets.map((market) => {
    return {
      oddsChange: fbStore.settings.oddsChange,
      itemCount: betCartStore.canMultiBetsList.length,
      seriesValue: market.sn,
      unitStake: market.uniStake
    }
  })
   // 存储提交时的投注金额与赔率与可赢额 用于注单确认框
   betCartStore.canSubmitMultiBetMarkets = canSubmitMultiBetMarkets.map((market) => {
    // console.log(market,'market')
    let obj = {
      multiMarketText: getMarketText(market), // 几串几,
      shouldWin: shouldWin(market).toFixed(2),
      unitStake: (Number(market.uniStake) * market.in || 0).toFixed(2),
      sodd: market.sodd.toFixed(2)
    }
    return obj
  })
  // 发送请求的参数
  const reqData = {
    betMultipleData,
    betOptionList: betCartStore.canMultiBetsList.map((bet) => {
      bet.betMatchMarket.oddsFormat = fbStore.settings.oddsFormat
      return bet.betMatchMarket
    })
  }
  loading.value = true
  try {
    const orderList = await betCartStore.submitMultiple(reqData)
    let orderIds = orderList.map((item) => item.id)
    betCartStore.orderList = orderList // 获取订单列表并保存
    if (orderList && orderList.length) {
      // 注单提交成功之后，更新注单在下单成功时的实时赔率
      updateBetOddsWhenSuccessOrdered()
      let isOrderConfirmed = orderList.every((order) => order.st === 4)
      // console.log(isOrderConfirmed,'isOrderConfirmed')
      
      if (!isOrderConfirmed) {
        // 打开注单确认弹框
        // betCartStore.openConfirmDialog()
        fbStore.ifShowLayer = true//打开确认页面
        eventBus.emit('quickbet',false)
        let reqData = {
          orderIds
        }
        // 获取下单状态
        betCartStore.getStakeOrderStatus(reqData)
        // console.log(betCartStore.orderConfirmStatus,'betCartStore.orderConfirmStatus')
        fetchOrderStatusTimer = setInterval(() => {
          if (!betCartStore.orderConfirmStatus) {
            clearInterval(fetchOrderStatusTimer)
            return
          }
          betCartStore.getStakeOrderStatus(reqData)
        }, 1000)
        // eventBus.emit('loadingText',i18n.global.t('SportsView.BetSuccessful'))
        // ElNotification({
        //   title: i18n.global.t('SportsView.BetSuccessful'),
        //   message: `${i18n.global.t('SportsView.MulBetSuccessTips',{id:betCartStore.orderList[0].id})}`,
        //   type: 'success',
        //   // duration:0
        // })
      } else {
        // console.log('投注成功，请移步注单列表查看注单详情')
      }
    }
  } catch (e) {
    // eventBus.emit('loadingText',i18n.global.t('SportsView.BetFailed'))
    // ElNotification({
    //   title: i18n.global.t('SportsView.BetFailed'),
    //   message: `${i18n.global.t('SportsView.MulBetFailedTips',{id:betCartStore.orderList[0].id})}`,
    //   type: 'error',
    //   // duration:0
    // })
    console.log(e)
  }
  loading.value = false
}
function updateBetOddsWhenSuccessOrdered() {
  betCartStore.canMultiBetsList.forEach((bet) => {
    if (betCartStore.orderList.length) {
      let newBet = betCartStore.orderList[0]?.ops.find((item) => item.mid === bet.id)
      if (newBet) {
        let key = newBet.of === 1 ? 'od' : 'bod'
        bet.betMatchMarket.odds = newBet[key]
      }
    }
  })
}
// 关闭定时器
watchEffect(() => {
  if (!betCartStore.isOpenConfirmDialog) {
    clearInterval(fetchOrderStatusTimer)
  }
})

</script>

<style lang="scss" scoped>
.FixedBotomMultiBet-view{
  
  padding-bottom: 70px;
  
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  .FixedBotomMultiBet-wrap{
    .markets-list{
      .item{
        .market{
          padding: 0 10px;
          .ty-odd{
            height: 28px;
            display: flex;
            align-items: center;
            color: var(--100, #FFF);
          }
        }
      }
      .item:last-child{
        border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        margin-bottom: 10px;
      }
    }
    .amount-input-box{
      width: 92%;
      height: 35px;
      border: 1px solid rgba(255, 255, 255, 0.10);
      display: flex;
      align-items: center;
      margin: 15px auto;
      padding: 0 10px;
      .amount-icon{
        display: flex;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff9000;
          //margin:0 10px;
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
        margin-left: 10px;
      }
    }
    .quickBox{
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      // padding: 0 10px;
      width: 92%;
      margin:0 auto;
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
    .single-can-win{
      height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 0 10px;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      margin-bottom: 10px;
    }
    .more{
      display: flex;
      height: 40px;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.10);
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      margin-bottom: 10px;
      color: var(--unnamed, #F35F1B);
      font-size: 12px;
      cursor: pointer;
      div{
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        p{
          margin-right: 5px;
          margin-left: 5px;
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
      padding: 0 10px;
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
        // border-color:#454859 ;
      }
      .active{
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      }
    }
    .total-amount{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px;
      .flex-title{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--60, rgba(255, 255, 255, 0.60));
        margin-bottom: 15px;
      }
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    
  }
  :deep(){
    .el-button.is-disabled{
      background: #454859;
      border-color:#454859 ;
    }
    .el-button{
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      border-color:#FF9000 ;
    }
    .el-dialog__header{
      display: none;
    }
    .el-dialog__footer{
      text-align: center;
    }
    .el-notification{
      border-radius: 8px;
      background-color: var(--unnamed, #323C6F);
      border: none;
    }
    .el-dialog{
      border-radius: 12px;
      background: #232949;
    }
    .el-dialog__header{
      display: none;
    }
    .el-dialog--center .el-dialog__body{
      text-align: center;
      color: #fff;
    }
    .el-button{
      width: 106px;
      height: 40px;
    }
    .cancel{
      background: transparent;
      color: var(--unnamed, #F35F1B);
      border-color: var(--unnamed, #F35F1B);
    }
  }
}

</style>