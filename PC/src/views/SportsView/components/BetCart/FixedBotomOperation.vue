<template>
  <div class="FixedBotomOperation-view">
    <div class="FixedBotomOperation-wrap" >
      <template v-if="betCartStore.betList.length > 1">
        <div class="tit" >
          <h4>{{$t('SportsView.SingleBet')}}*{{betCartStore.betList.length}}</h4>
        </div>
        <!-- 金额输入框 -->
        <div class="amount-input-box">
          <div class="amount-icon">
            <CurrencyUnit/>
            <!-- <img :src="moneyicon" alt=""> -->
          </div>
          <input type="Number" :disabled="minMaxValue?false:true" id="myInput" @input="onInput"  v-model="oneKeyNumber" @keydown="handleKeyPress"  @click="showQuickamount = true" :placeholder="$t('SportsView.Limit')+minMinValue+'-'+minMaxValue">
        </div>
        <!-- 快捷金额 -->
        <div class="quickBox" v-if="showQuickamount">
          <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(100)" >+100</el-button>
          <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(200)">+200</el-button>
          <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(500)">+500</el-button>
          <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(1000)">+1000</el-button>
          <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="addAmount(5000)">+5000</el-button>
          <el-button :disabled="minMaxValue?false:true" class="quickamount" @click="toMax(minMaxValue)">MAX</el-button>
        </div>
      </template>
      <!-- 总金额计算 -->
      <div class="total-amount">
        <div class="flex-title">
          <span class="title">{{$t('SportsView.AllBetAmount')}}:</span>
          <span class="title"><CurrencyUnit />{{ totalBet.toFixed(2) }}</span>
        </div>
        <div class="flex-title">
          <span class="title">{{$t('SportsView.MaximumWinnable')}}：</span>
          <span class="title-red"><CurrencyUnit />{{ totalWin.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 投注和删除按钮 -->
      <div class="Bottom">
        <div class="del" @click.stop="dialogVisible = true">{{$t('SportsView.Delete')}}</div>
        <el-button type="info" class="bet" :disabled="disabledBetBtn" @click="subimtBet" :loading="loading">
          {{$t('SportsView.Bet')}}
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
      :show-close='false'
    >
      <span>{{$t('SportsView.DeleteAllSingle')}}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="cancel" @click="dialogVisible = false">{{$t('SportsView.Cancel')}}</el-button>
          <el-button class="confirm" type="primary" @click="confirm">
            {{$t('SportsView.Sure')}}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref} from 'vue'
import { minBy } from 'lodash'
import { ElNotification } from 'element-plus'
import eventBus from '@/utils/eventBus'
import moneyicon from './img/moneyicon.png'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const user = useUserStore()
const showQuickamount = ref(false)
const loading = ref(false)
const oneKeyNumber = ref('')
const dialogVisible = ref(false)

const onInput = (event) => {
  // 当输入框内容发生变化时执行的代码
  oneKeyNumber.value = event.target.value;
  betCartStore.oneKeyNumber = event.target.value;
};
//投注按钮
const disabledBetBtn = computed(() => {
  // 判断 totalBet.value、minMinValue.value 和 userStore.balance 是否全部为 0
  const allZero = totalBet.value == 0 && minMinValue.value == 0 && Number(userStore.balance) == 0;

  // 盘口关闭了
  const isClose = betCartStore.betList.find(item=>
     item.ss !== 1 && item.betMatchMarket.odds < 0
  )

  // console.log(betCartStore.betList.length,isClose,allZero,totalBet.value,minMinValue.value,minMaxValue.value)
  if (betCartStore.betList.length > 1) {
    if (Number(userStore.balance) > 0) {
      if (isClose || allZero || totalBet.value < minMinValue.value || totalBet.value > Number(userStore.balance)) {
        return true;
      }
      if (oneKeyNumber.value) {
        if (oneKeyNumber.value < minMinValue.value || oneKeyNumber.value > minMaxValue.value) {
          return true;
        }
      }
    } else {
      return true;
    }
  } else {
    if (allZero || totalBet.value < minMinValue.value || totalBet.value > minMaxValue.value || totalBet.value > Number(userStore.balance)) {
      return true;
    }
  }
  return false;
});

// 总投注额
const totalBet = computed(() => {
  return betCartStore.betList.reduce((accumulator, bet) => {
    return accumulator + (Number(bet.unitStake) || 0)
  }, 0)
})
// 总可赢额
const totalWin = computed(() => {
  return betCartStore.betList.reduce((accumulator, bet) => {
    return accumulator + (Number(bet.unitStake) * (bet.betMatchMarket.odds - 1) || 0)
  }, 0)
})
const minMinValue = computed(() => {
  return minBy(betCartStore.betList, 'smin')?.smin || 0
})
const minMaxValue = computed(() => {
  return minBy(betCartStore.betList, 'smax')?.smax || 0
})

// 确认删除
function confirm(){
  betCartStore.removeAllBets()
  betCartStore.isOpenBetCart = false
}
//监听投注金额
watchEffect(() => {
  betCartStore.betList.forEach((bet) => {
    if(bet.ss !== 1 || bet.betMatchMarket.odds < 0){
      bet.unitStake = ''
    }else{
      bet.unitStake = oneKeyNumber.value
    }
  })
  // console.log(betCartStore.betList,'betCartStore.betList')
  if (!betCartStore.isOpenBetCart) {
    oneKeyNumber.value = ''
  }
})
// 可投注且输入了投注金额的注单列表,过滤掉已经关闭的盘口
const canBetWithAmountList = computed(() => {
  return betCartStore.betList.filter((bet) => {
    return Number(bet.unitStake) && bet.ss === 1 && bet.betMatchMarket.odds > 0
  })
})
let fetchOrderStatusTimer = null
//确认投注
async function subimtBet() {
  // 查询账户余额
  if(user.userInfo.centerWallet == 0){
    return false
  }

  eventBus.emit('quickbox',false)
  eventBus.emit('loadings',true)
  
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    await fbStore.getFBToken()
  }
  // console.log(canBetWithAmountList.value,'canBetWithAmountList.value')
  // 先保存将要提交的注单列表备用
  // if(canBetWithAmountList.value.length>0){}
  let submitBetList = canBetWithAmountList.value
  // console.log(canBetWithAmountList.value,'canBetWithAmountList.value')
  // if(canBetWithAmountList.value.length>0){}
  submitBetList = JSON.parse(JSON.stringify(submitBetList))
  betCartStore.submitBetList = submitBetList
  // console.log(submitBetList,'submitBetList')
  const resultArray = submitBetList.map((bet) => {
    bet.betMatchMarket.oddsFormat = fbStore.settings.oddsFormat;
      let obj = {
        oddsChange: fbStore.settings.oddsChange,
        unitStake: bet.unitStake,
        betOptionList: [bet.betMatchMarket]
      };
      return obj;
    });

  // 检查结果数组是否为空
  const isResultEmpty = resultArray.length == 0;

  if(!isResultEmpty){
    const reqData = {
      singleBetList: submitBetList.map((bet) => {
        bet.betMatchMarket.oddsFormat = fbStore.settings.oddsFormat
        let obj = {
          oddsChange: fbStore.settings.oddsChange,
          unitStake: bet.unitStake,
          betOptionList: [bet.betMatchMarket]
        }
        return obj
      })
    }
    loading.value = true
    try {
      const orderList = await betCartStore.submitSingleBet(reqData)
      
      let orderIds = orderList.map((item) => item.id)
      // console.log(orderIds,3333,orderList)
      betCartStore.orderList = orderList
      if (orderList && orderList.length) {
        // console.log(22222222222,orderList)
        // 注单提交成功之后，更新注单在下单成功时的实时赔率
        updateBetOddsWhenSuccessOrdered()
        let isOrderConfirmed = orderList.every((order) => order.st === 4)
        // console.log(!isOrderConfirmed,'isOrderConfirmed')
        if (!isOrderConfirmed) {
          // 打开注单确认弹框
          // betCartStore.openConfirmDialog()
          fbStore.ifShowLayer = true//打开确认页面
          eventBus.emit('quickbet',false)
          let reqData = {
            orderIds
          }
          // console.log(reqData,'reqData',fbStore.ifShowLayer)
          
          // 获取下单状态
          betCartStore.getStakeOrderStatus(reqData)
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
          //   message: `${(i18n.global.t('SportsView.BetSuccessTips_1',{title:betCartStore.submitBetList[0].visible.title,marketTitle:betCartStore.submitBetList[0].visible.marketTitle}))}`,
          //   type: 'success',
          //   // duration:0
          // })
        }
      
      }
    } catch (e) {
      loading.value = false
      // eventBus.emit('loadingText',i18n.global.t('SportsView.BetFailed'))
      // ElNotification({
      //   title: i18n.global.t('SportsView.BetFailed'),
      //   message: `${(i18n.global.t('SportsView.BetFailedTips_2',{title:betCartStore.submitBetList[0].visible.title,marketTitle:betCartStore.submitBetList[0].visible.marketTitle}))}`,
      //   type: 'error',
      //   // duration:0
      // })
      console.log(e)
    }
  }else{
    eventBus.emit('loadingText',i18n.global.t('SportsView.BetFailed'))
      // ElNotification({
      //   title: i18n.global.t('SportsView.BetFailed'),
      //   message: `${i18n.global.t('SportsView.BetOrder')}${betCartStore.submitBetList[0].visible.title}, 【${betCartStore.submitBetList[0].visible.marketTitle}】${i18n.global.t('SportsView.BetFailed')}`,
      //   type: 'error',
      //   // duration:0
      // })
  }
  loading.value = false
}


function addAmount(val) {
  oneKeyNumber.value =  val
  betCartStore.oneKeyNumber = val
}
function updateBetOddsWhenSuccessOrdered() {
  betCartStore.submitBetList.forEach((bet) => {
    const newBet = betCartStore.orderList.find((order) => {
      order.ops[0].mid === bet.id
    })
    if (newBet && newBet.ops) {
      bet.betMatchMarket.odds = newBet.ops[0].od
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
.FixedBotomOperation-view{
  padding: 0 10px;
  // padding-bottom: 55px;
  .FixedBotomOperation-wrap{
    
    font-style: normal;
    font-weight: 500;
    .tit{
      color: var(--100, #FFF);
      font-size: 14px;
      text-align: left;
      margin-top: 15px;
    }
    .total-amount{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .flex-title{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--60, rgba(255, 255, 255, 0.60));
        margin-bottom: 15px;
      }
    }
    .amount-input-box{
      width: 100%;
      height: 35px;
      border: 1px solid rgba(255, 255, 255, 0.10);
      display: flex;
      align-items: center;
      margin: 15px auto;
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
    .quickBox{
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      // padding: 0 10px;
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
        // border-color:#454859 ;
      }
      .active{
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      }
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
    .el-button{
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      border-color:#FF9000 ;
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