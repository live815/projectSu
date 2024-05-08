
<template>
    <div class="BookRecordTable-view">
      <!-- 预约投注注单2 -->
      <el-table v-if="showBookBetColumns()" :data="tableData" border width="80%" height="450px" :highlight-current-row="false" :header-cell-style="{ background: '#171A2F',color:'#fff',fontSize:'14px' }">
        <el-table-column type="index" :label="$t('SportsView.SerialNumber')" width="80" />
        <el-table-column  prop="id" :label="$t('SportsView.OrderNumber')">
          <template #default="{row}">
           <p> {{ formatTime(row.cte) }}</p>
           <!-- 复制按钮 -->
          <p>{{ row.id }}<span class="copybtn" v-clipboard="row.id">{{$t('SportsView.Copy')}}</span></p>
          </template>
        </el-table-column>
        <!-- 投注类型 -->
        <el-table-column  prop="mgn"  :label="$t('SportsView.BetType')"  min-width="90">
          <template #default="{row}">
            <!-- 盘口类型 -->
            {{ getOddFormatText(row.ops[0].of) }}
            <!-- 单关或者串关 -->
            <p class="sert" v-text="row.sert?$t('SportsView.Collusion'):$t('SportsView.SingleLevel')"></p>
            <!-- <p>{{ row.ops[0].mgn }}</p> -->
          </template>
        </el-table-column>
        <!-- 比赛 -->
        <el-table-column  prop="com" :label="$t('SportsView.Contest')" min-width="180" >
          <template #default="{row}">
            <!-- 球类、 -->
            <div class="detail-title-1">
                <p>{{ getBallTypeTextById(row.ops[0].sid) }}</p>
                <span class="tournamentName">{{ row.ops[0].ln }}</span>
            </div>
            <!-- vs球队 -->
            <p class="mn">{{ row.ops[0].mn }}</p>
            <!-- 开赛时间 -->
            <p class="detail-title-3">
                {{ formatTime(row.ops[0].bt) }}
            </p>
          </template>
        </el-table-column>
        <!-- 选项 -->
        <el-table-column prop="option" :label="$t('SportsView.Options')" width="180" >
          <template #default="{row}">
            <p>{{ row.ops[0].mgn }}</p>
            <p>{{ row.ops[0].onm }} </p>
            <p class="rate">@{{ row.ops[0].bo }}</p>
          </template>
        </el-table-column>
        <!-- 预约投注额 -->
        <el-table-column prop="sat" :label="$t('SportsView.ReservedBettingAmount')" width="100" />
        <!-- 预约可赢额 -->
        <el-table-column prop="sat" :label="$t('SportsView.BookingWinAmount')"  width="100">
            <template #default="{row}">
                {{ (row.sat * (row.ops[0]?.od - 1)).toFixed(2) }}
            </template>
        </el-table-column>
        <!-- 预约投注状态 -->
        <el-table-column  prop="rst" :label="$t('SportsView.State')" >
          <template #default="{row}">
            <p v-text="bookorderStatus(row.rst)" :style="changeTextColors(row.rst)"></p>
            <!-- 预约操作栏 -->
            <div class="cooperation" v-if="row.rst === 0">
                <div @click="openDialog(row)" class="cancel-btn">{{ $t('SportsView.cancelBook') }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 取消预约投注的弹窗 -->
      <el-dialog
        class="settleDialog"
        v-model="dialogVisible"
        width="311px"
        height="66px"
        center
        align-center
      >
        <span>{{$t('SportsView.confirmCancel')}}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button class="cancel" @click="dialogVisible = false">{{$t('SportsView.Cancel')}}</el-button>
            <el-button class="confirm" type="primary" @click="cancelBook">
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
  import { formatTime } from '@/utils'
  import vClipboard from '@/directives/clipboard'
  import {filterScore,orderStatu,changeTextColors} from '@/hooks/sportsView'
  import { ElMessage } from 'element-plus'
  import { submitPriceRecord,cancelBookBet } from '@/api/fb'
  import Counter from '../MiddleSide/Counter.vue'
  import { useFBStore } from '@/stores/fb'
  const fbStore = useFBStore()
  import { getOddFormatText,getMatchStatus,getballType,getBallTypeTextById } from '@/hooks/useSportDict'
  const dialogVisible = ref(false)
  const loading = ref(false)
  const emit = defineEmits(['refreshBookBetList'])
  const props = defineProps({
    tableData:{
      default:Object
    },
    curtab:{
      default:Number
    },
    priceList:{
      default:Object
    },
    currentIndex:{
      default:Number||Boolean
    }
  })
  const showSettledColumns = () => props.curtab == 2;
  const showUnsettledColumns = () => props.curtab == 1 || props.curtab == 2;
  const showBookBetColumns = () => props.curtab == 3;
  const showUnsettled = () => props.curtab == 1;
  const unSettleType = props.currentIndex ==  0
  
  // 投注结果
  function getResult(val){
    if(val.sv == 1){
      switch(val.ops[0].sr){
        case 0:
          return i18n.global.t('SportsView.NoResult')
        case 2:
          return i18n.global.t('SportsView.Tie')
        case 3:
          return i18n.global.t('SportsView.Lose')
        case 4:
          return i18n.global.t('SportsView.Win') 
        case 5:
          return i18n.global.t('SportsView.WinHalf')
        case 6:
          return i18n.global.t('SportsView.LoseHalf')
        case 7:
          return i18n.global.t('SportsView.Cancel')
        default:  
          return ''
      }
    
    }else{
      if(val.uwl>0){
        return i18n.global.t('SportsView.Win') 
      }
      if(val.uwl<0){
        return i18n.global.t('SportsView.Lose')
      }
    }
    
  }
  // 注单顶层状态 处理没有返回注单输赢状态的边界
  const betStatus = (st) => {
    switch (st) {
      case 2:
        return i18n.global.t('SportsView.RejectOrder') // 拒单
      case 3:
        return i18n.global.t('SportsView.CancelOrder') // 取消订单
      default:
        return i18n.global.t('SportsView.EarlySettlement') // 提前结算
    }
  }
  // 获取输赢值 结算派彩金额||提前结算派彩金额 - 本金/投注额
  function getProfitAmount(item) {
    let bonus = Object.prototype.hasOwnProperty.call(item, 'sa') ? item.sa : item.cops
    return bonus - item.sat || 0
  }
  // 拒单结果
  function getRejectResult(val){
    switch(val){
      case 1:
        return i18n.global.t('SportsView.SystemException')
      case 2:
        return i18n.global.t('SportsView.ParameterErrorAndOrderRejection') 
      case 3:
        return i18n.global.t('SportsView.RiskControlLimitsOrderRejection')
      case 4:
        return i18n.global.t('SportsView.GamePlayPauseAndOrderRejection') 
      case 5:
        return i18n.global.t('SportsView.TraderRefusesOrder') 
      case 6:
        return i18n.global.t('SportsView.PaymentFailed')
      case 7:
        return i18n.global.t('SportsView.OrderNotConfirmedDuringSettlementAndRejected')
      default:  
        return ''
    }
  }
  // 预约状态
  function bookorderStatus(val){
    switch(val){
      case 0:
        return i18n.global.t('SportsView.ReservationInProgress')
      case 1:
        return i18n.global.t('SportsView.AppointmentSuccessful') 
      case 2:
        return i18n.global.t('SportsView.ReservationFailed') 
      case 3:
        return i18n.global.t('SportsView.Cancel')    
    }
  }
  
  // 正在结算中
  function onSettlementing(item) {
    return [101, 102].includes(allowEarlySettle(item)?.st)
  }
  // 结算价格
  function getPrice(item) {
    let price = allowEarlySettle(item)
    return (price?.amt * item.sat).toFixed(2) || 0
  }
  // 可提前结算数据
  function allowEarlySettle(item) {
    return props.priceList.find((price) =>price.oid === item.id && price.amt)
  }
  const open = ref(false)
  //保存结算临时变量信息
  const settleValue = ref({})
  const reserveIds = ref()
//   打开取消预约投注的弹窗
  const openDialog = (item) => {
    loading.value = true
    dialogVisible.value = true
    open.value = true
    settleValue.value = item
    reserveIds.value = item.id
    console.log(item,'item',reserveIds.value)
    // cancelBook(item)
  }
//   取消预约投注
  function cancelBook(){
    const data = {
        currencyId:1,
        oddsChange:1,
        reserveId:reserveIds.value
    }
    cancelBookBet( data ).then((res) => {
        dialogVisible.value = false
        if (res && typeof res === 'boolean') {
            ElMessage(i18n.global.t('SportsView.cancelSuccess'))
        }
        emit('refreshBookBetList')
    })
  }
//   // 确定提前结算注单
//   const submit = async () => {
//     dialogVisible.value = false
//     let price = props.priceList.find((itm) => settleValue.value.id === itm.oid)
//     console.log(settleValue.value,'settleValue',price.amt)
//     const res = await submitPriceRecord({
//       orderId: settleValue.value.id,
//       cashOutStake: Number(settleValue.value.sat),
//       acceptOddsChange: true,
//       unitCashOutPayoutStake: price.amt
//     })
//     if (res && res.st === 0) {
//       // showToast(i18n.global.t('common.preSettling'))
//       ElMessage(i18n.global.t('SportsView.EarlySettlementInProgress'))
//       open.value = false
//       price.st = 102 // 手动修改结算状态
//     }
//   } 
  // 获取输赢值class
  function getProfitClass(item) {
    let profitAmount = getProfitAmount(item)
    if (profitAmount > 0) {
      return 'win'
    }
    if (profitAmount < 0) {
      return 'lose'
    }
  }
  
  function getDynamicContent(id) {
    return id; // 返回需要复制的内容，这里以 row.id 为例
  }
  function  handleCopyButtonClick(id) {
    // 在复制按钮的点击事件处理程序中获取当前内容并复制到剪贴板
    const currentContent = getDynamicContent(id);
  
    navigator.clipboard.writeText(currentContent)
      .then(() => {
        console.log('内容已成功复制到剪贴板');
      })
      .catch((error) => {
        console.error('复制内容到剪贴板时出错:', error);
      });
  }
  </script>
  
  <style lang="scss" scoped>
  .BookRecordTable-view{
    :deep(){
      // .el-table__empty-block{
      //   height:450px !important;
      // }
      .currency{
        display: flex;
        width: 90%;
        margin: 5px auto 0px;
        align-items: center;
        height: 35px;
        border: 1px solid #F35F1B;
        color: #F35F1B;
        text-align: center;
        justify-content: center;
        border-radius: 5px;
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 12px;
      }
      .el-button.is-disabled{
        background: #454859;
        border-color:#454859 ;
      }
      .el-button{
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        border-color:#FF9000 ;
      }
      .el-dialog__header{
        display: none !important;
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
        min-height: 75px !important;
        border-radius: 20px;
      }
      .el-button{
        width: 106px;
        height: 40px;
      }
      .cancel{
        background: transparent !important;
        color:  #F35F1B !important;
        border-color: #F35F1B !important;
      }
      .loadBtn{
        background: transparent;
        border: none;
        color: #F35F1B;
        font-size: 12px;
      }
      .el-button.is-loading:before{
        background-color: transparent;
      }
      .win{
        color: var(--color-danger);
      }
      .lose {
        color: var(--color-green);
      }
      .game-detail{
        .detail-title-1{
          color: var(--60, rgba(255, 255, 255, .6));
          font-size: 12px;
        }
        .pe{
          margin: 0 5px;
        }
      }
      .title-rate{
        color: var(--unnamed, #F35F1B);
        margin-left: 5px;
        margin-right: 5px;
      }
      .rates{
        margin-left: 5px;
        margin-right: 5px;
        font-size: 12px;
        color: var(--60, rgba(255, 255, 255, .6));
        display: inline-flex;
        // width: 100%;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
      .rate{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
      .mgn{
        display: block;
      }
      .orderNum{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
      }
      .el-table td.el-table__cell div{
        max-height: 110px;
        overflow: scroll;
      }
      .cooperation{
        border: 1px solid var(--unnamed, #F35F1B);
        color: var(--unnamed, #F35F1B);
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
  </style>