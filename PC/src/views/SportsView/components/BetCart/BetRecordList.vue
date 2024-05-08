<template>
  <div class="BetRecordList-view" >
    <div class="BetRecordList-wrap" v-if="props.list">
      <div class="BetRecordList-content" v-for="(item, index) in props.list" :key="index" ref="common" :class="{ collBtn: isExpand }">
        <div class="BetRecordList-title">
          <p class="check-title">
            <span v-if="!bookType">{{ orderStatus(item.st) }}</span>
            <span v-else>{{ $t('SportsView.ReservationInProgress') }}</span>
          </p>
          <div class="title-box">{{ titleChangeNew(item) }}</div>
        </div>
        <p class="check-time">{{ getTime(item.cte) }}</p>

        <div class="order-no">
          <div class="ordernum">
            <p class="order-title">{{ $t('SportsView.SportsOrderNumber') }}:</p>
            <p class="order-num" :title="item.id">{{ item.id }}</p>
          </div>
          <div class="copy">
            <div class="line"></div>
            <div class="btn" v-clipboard="item.id">{{ $t('SportsView.Copy') }}</div>
          </div>
        </div>
        
        <!-- 投注额-可赢额 -->
        <div class="bet-win-size">
          <div class="bet">
            <p class="common-title">
              {{ bookType ? $t('SportsView.ReserveAmount') : $t('SportsView.BetAmount') }}
            </p>
            <p class="size"><CurrencyUnit />{{ item.sat }}</p>
          </div>
          <div class="line"></div>
          <!-- 未结算 -->
          <div class="win" v-if="unSettleType">
            <p class="common-title win-title">{{ $t('SportsView.WinningAmount') }}</p>
            <p class="size win"><CurrencyUnit />{{ item.mwa }}</p>
          </div>
          <!-- 已结算 -->
          <div class="win" v-else-if="settledType">
            <p class="common-title win-title">{{ $t('SportsView.profit') }}</p>
            <p :class="getProfitClass(item)" class="size">
              <CurrencyUnit />{{ getProfitAmount(item).toFixed(2) }}
            </p>
          </div>
          <!-- 预约 -->
          <div class="win" v-else>
            <p class="common-title win-title">{{ $t('SportsView.MaximumWinnable') }}</p>
            <p class="size win"><CurrencyUnit />{{ (item.sat * (item.ops[0].od - 1)).toFixed(2) }}</p>
          </div>
        </div>

        <template v-for="itm in item.ops" :key="itm.id">
          <div class="game-detail" :class="[item.ops.length>1?'bottom':'']">
            <p class="detail-title-1">{{ itm.mn }}</p>
            <p class="detail-title-3 check-time">{{ getTime(itm.bt) }}</p>
            <p class="detail-title-2 check-time">{{ itm.ln }}</p>
            
            <p class="detail-title-4 check-time">
              {{ itm.onm + ' ' }}<span class="title-rate">@{{ itm.bo }}</span>
              <!-- <span class="line"></span> -->
            </p>
            <div class="detail-title-4 check-time mgn">
              <label>
                <span v-if="itm.ip==1">{{ $t('SportsView.RollingBall') }}-</span>
                {{ itm.mgn }}
              </label>
              <!-- 下注时比分 -->
              <span class="bsc" v-if="itm.bsc">({{ filterScore(itm.bsc) }})</span>
              [{{ getOddFormatText(itm.of) }}] 
              
            </div>
            <p class="detail-title-4 check-time">
              <!-- 当前比分 -->
              <span class="scs" v-if="itm.scs?.length>0">({{ itm.scs[0] }}-{{ itm.scs[1] }})</span>
              <span class="pe" v-if="itm.mc?.pe">{{ getMatchStatus(itm, fbStore) }}</span>
              <!-- 赛事计时 -->
              <Counter
                v-if="itm.mc?.hasOwnProperty('s') && itm.mc?.s >= 0"
                :tp="itm.mc?.tp"
                :s="itm.mc?.s"
                :r="itm.mc?.r"
              />
            </p>
          </div>
        </template>
        <!-- 未结算 & 可提前结算注单 -->
        <div
          v-if="allowEarlySettle(item) && unSettleType"
          :class="{ 'disabled-btn': onSettlementing(item) }"
          class="currency"
          @click="openDialog(item)"
        >
          <div class="currency-content">
            <div v-if="onSettlementing(item)">
              <el-button class="loadBtn" :loading="loading">{{ $t('SportsView.EarlySettlementInProgress') }}</el-button>
            </div>
            <div v-else>
              <span>{{ $t('SportsView.EarlySettlement') }} <CurrencyUnit />{{ getPrice(item) }}</span>
            </div>
          </div>
          <div class="currency-img" v-if="false">
            <!-- <img src="@/assets/img/success.png" alt="" /> -->
          </div>
        </div>
        <!-- 折叠按钮 -->
        <div class="collapse" @click="expand(item, index)"  ref="collapseBtn" v-show="item.bt && Number(item.bt[0]) > 1">
          <el-button  round >
          {{item.isExpand ? $t('SportsView.Fold')  : $t('SportsView.Unfold')}}
          <el-icon v-if="item.isExpand"><ArrowUp /></el-icon>
          <el-icon v-else><ArrowDown /></el-icon>
        </el-button>
        </div>
      </div>
    </div>
    <div class="footer" v-if="total>pageSize">
      <Pagination
        v-if="total>0"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :small="small"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div>
    
    <!-- 确认提前结算的弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      width="311px"
      height="66px"
      center
      align-center
    >
      <span>{{$t('SportsView.EarlySettlementTips')}}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="cancel" @click="dialogVisible = false">{{$t('SportsView.Cancel')}}</el-button>
          <el-button class="confirm" type="primary" @click="submit">
            {{$t('SportsView.Sure')}}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  
</template>

<script setup>
import i18n from '@/i18n'
import {onMounted, ref} from 'vue'
import {ArrowDown} from '@element-plus/icons-vue'
import {ArrowUp} from '@element-plus/icons-vue'
import { getBallTypeTextById,getOddFormatText,getMatchStatus } from '@/hooks/useSportDict'
import vClipboard from '@/directives/clipboard'
import Pagination from '@/components/Pagination/Pagination.vue'
import { submitPriceRecord } from '@/api/fb'
import { ElMessage } from 'element-plus'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const emit = defineEmits(['updatePage','upadtePageSize'])
const props = defineProps(['list', 'currentIndex', 'priceList'])
const common = ref([])
const loading = ref(false)
// const list = ref([])
// const bookType = ref(false)
const isExpand = ref(false)
const collapseBtn = ref([])
const total = ref()
const list = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const dialogVisible = ref(false)
const small = ref(true)

const unSettleType = props.currentIndex == 0
const settledType = props.currentIndex == 1
const bookType = props.currentIndex == 2
//未结算订单的ID集合查询是否能提前结算
// const orderIds = ref([])
//定时器
// let fetchPriceTimer = null
onMounted(()=>{
  fbStore.queryMatchListParams.current = currentPage.value
  // console.log(props.list,'props.list',props.priceList,'props.priceList',props.currentIndex)
})

const getTime = (date) => {
  return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()
}
//注单状态
const orderStatus = (status) => {
  switch (status) {
    case 0:
      return i18n.global.t('SportsView.CreatedSuccessfully')
    case 1:
      return i18n.global.t('SportsView.Confirming')
    case 2:
      return i18n.global.t('SportsView.RejectOrder')
    case 3:
      return i18n.global.t('SportsView.CancelOrder')
    case 4:
      return i18n.global.t('SportsView.Confirmed')
    case 5:
      return i18n.global.t('SportsView.Settled')
  }
}
//串关名称
const titleChangeNew = (item) => {
  if (item.bt && Number(item.bt[0]) > 1) {
    // const arr = [...new Set(item.ops.map((itm) => itm.sid))]
    // let titleFirst = ''
    // for (let i = 0; i < arr.length; i++) {
    //   titleFirst += getBallTypeTextById(arr[i]) + ' '
    // }
    // console.log(titleFirst)
    // return titleFirst + item.bt.replace(/x/gi, '串')
    return i18n.global.t('SportsView.MixedCrossBorder')+item.bt.replace(/x/gi, i18n.global.t('SportsView.chuan'))
  }
  return getBallTypeTextById(item.ops[0].sid) + ' ' + i18n.global.t('SportsView.SingleGame')
}


// 结算价格
function getPrice(item) {
  let price = allowEarlySettle(item)
  return (price?.amt * item.sat).toFixed(2) || 0
}
// 可提前结算数据
function allowEarlySettle(item) {
  return props.priceList.find((price) => price.oid === item.id && price.amt)
}
// 正在结算中
function onSettlementing(item) {
  return [101, 102].includes(allowEarlySettle(item)?.st)
}
// function stopInterval() {
//   clearInterval(fetchPriceTimer)
//   fetchPriceTimer = null
// }
//接收content列表组件派发的id列表，根据id去开启或关闭按钮的折叠和展开
// const collapseList = ref([])
//保存点击当前item的ID，刷新列表的时候根据ID是否打开或折叠
const arr = ref([])
const expand = (item, index) => {
  const idx = arr.value.indexOf(item.id)
  if (!arr.value.includes(item.id)) {
    arr.value.push(item.id)
  } else {
    arr.value.splice(idx, 1)
  }
  item.isExpand = !item.isExpand
  if (item.isExpand) {
    common.value[index].style.maxHeight = 'none'
    common.value[index].style.paddingBottom = '60px'
    collapseBtn.value[index].style.bottom = '15px'
  } else {
    common.value[index].style.maxHeight = 330 + 'px'
    collapseBtn.value[index].style.bottom = '0px'
  }
}
//组件渲染完成时候根据元素的高度去判断是否展示折叠按钮
onMounted(() => {
  nextTick(() => {
    for (let index = 0; index < list.value.length; index++) {
      if (common.value[index].scrollHeight > common.value[index].clientHeight) {
        collapseBtn.value[index].style.display = 'block'
      }
    }
  })
})
const open = ref(false)
//保存结算临时变量信息
const settleValue = ref({})
const openDialog = (item) => {
  loading.value = true
  dialogVisible.value = true
  open.value = true
  settleValue.value = item
}
// 获取输赢值 结算派彩金额||提前结算派彩金额 - 本金/投注额
function getProfitAmount(item) {
  let bonus = Object.prototype.hasOwnProperty.call(item, 'sa') ? item.sa : item.cops
  return bonus - item.sat || 0
}
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
// 确定提前结算注单
const submit = async () => {
  let price = props.priceList.find((itm) => settleValue.value.id === itm.oid)
  // console.log(settleValue.value,'settleValue',price.amt)
  dialogVisible.value = false
  // loading.value = false
  const res = await submitPriceRecord({
    orderId: settleValue.value.id,
    cashOutStake: Number(settleValue.value.sat),
    acceptOddsChange: true,
    unitCashOutPayoutStake: price.amt
  })
  if (res && res.st === 0) {
    ElMessage(i18n.global.t('SportsView.EarlySettlementInProgress'))
    open.value = false
    price.st = 102 // 手动修改结算状态
  }
}         
// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
  currentPage.value = newPage
  fbStore.queryMatchListParams.current = newPage
  emit('updatePage',newPage)
}
const handlePageSizeUpdate = (newSize) => {
  pageSize.value = newSize
  emit('upadtePageSize',newSize)
}
// 比分数据过滤
function filterScore(str){
  const regex = /(\d+-\d+)/;
  const matches = str.match(regex);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
};
</script>

<style lang="scss" scoped>
.BetRecordList-view{
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  background: #0D0F1C;
  .BetRecordList-wrap{
    position: relative;
    .BetRecordList-title{
      position: relative;
      height: 30px;
      display: flex;
      align-items: center;
      .check-title{
        width: 70px;
        color: var(--unnamed, #67C23A);
        
      }
      .title-box{
        background: url('./img/title-bg.png') center no-repeat;
        height: 20px;
        min-width: 120px;
        padding: 0 5px;
        line-height: 20px;
        background-size: 100% 100%;
      }
    }
    .BetRecordList-title::before{
      content: "";
      position: absolute;
      width: 4px;
      height: 15px;
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      border-radius: 0px 100px 100px 0;
      left: 0;
    }
    .check-time{
      color: rgba(255, 255, 255, 0.40);
      font-size: 12px;
      text-align: left;
      margin-left: 13px;
      margin-top: 5px;
    }
    .order-no{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #0D0F1C;
      height: 32px;
      width: 100%;
      margin: 10px auto;
      padding: 0 10px;
      .ordernum{
        display: flex;
        .order-title{
          color: var(--60, rgba(255, 255, 255, 0.60));
        }
        .order-num{
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--100, #FFF);
          margin-left: 10px;
        }
      }
      .copy{
        cursor: pointer;
        color: var(--unnamed, #F35F1B);
      }
    }
    .bet-win-size{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 10px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.10);
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      margin-bottom: 10px;
      .bet{
        .common-title{
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.40);

        }
        .size{
          color: var(--100, #FFF);
        }
      }
      .win{
        .common-title{
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.40);

        }
        .size{
          color: var(--unnamed, #E93D3D);
        }
      }
      .line{
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.10);

      }
    }
    .game-detail{
      // border-bottom: 1px solid rgba(255, 255, 255, 0.40);
      margin: 0 10px 10px;
      .detail-title-1{
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: unset;
        text-align: left;
        width: 100%;
        height: 30px;
        line-height: 18px;
        flex-wrap: nowrap;
        align-items: center;
        color: var(--100, #FFF);
        // padding: 0 10px;
      }
      .detail-title-3,.detail-title-4{
        margin-bottom: 10px;
      }
      .detail-title-4{
        display: flex;
        align-items: center;
        margin-top: 7px;
        .pe,.bsc{
          margin: 0 5px;
        }
      }
      .title-rate{
        color: #FF9000;
        margin: 0 5px;
      }
      .check-time{
        margin-left: 0px;
      }
      .mgn{
        // padding-left: 5px;
        // border-left: 1px solid rgba(255, 255, 255, 0.40);
        display: block;
      }
      .line{
        display: inline-block;
        width: 1px;
        background: rgba(255, 255, 255, 0.40);
        height: 10px;
        margin: 0 5px;
      }
    }
    .bottom{
      border-bottom: 1px solid rgba(255, 255, 255, 0.40);
    }
    .currency{
      display: flex;
      width: 90%;
      margin: 0 auto;
      align-items: center;
      height: 35px;
      border: 1px solid #F35F1B;
      color: #F35F1B;
      text-align: center;
      justify-content: center;
      border-radius: 5px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .collapse{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #171A2F;
      padding-bottom: 8px;
    }
    .BetRecordList-content{
      margin-bottom: 3px;
      background: #171A2F;
      padding: 15px 0 25px;
      position: relative;
      max-height: 365px;
    }
  }
  // .footer{
  //     display: absolute;
  //     width: 100%;
  //     height: 32px;
  //   }
  :deep(){
    .el-button{
      width: 78px;
      background: rgba(40, 48, 87, 0.70);
      color: #FFF;
      // border: none;
      &:hover{
        color: #FFF;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      }
    }
    .el-button.is-disabled{
      background: #454859;
      border-color:#454859 ;
    }
    .el-button{
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      border-color:#FF9000 ;
    }
    .loadBtn{
      background: transparent;
      border: none;
      color: #F35F1B;
    }
    .el-button.is-loading:before{
      background-color: transparent;
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
    
    .el-button:focus{
      color: rgba(255, 255, 255, 0.40);
    }
    .el-icon{
      margin-left: 5px;
    }
    .pagination{
      // position: absolute;
      bottom: 0;
    }
    .el-pagination>.is-first{
      font-size: 12px;
      width: 32px;
      display: none;
    }
    .el-pagination__sizes,.el-pagination>.is-last{
      display: none;
    }
    .el-pagination .el-select .el-input{
      width: 60px;
      height: 30px;
    }
    .el-icon svg{
      height: 12px;
      width: 12px;
    }
    .el-pagination button{
      padding: 0;
    }
  }
  .collBtn {
    padding-bottom: 30px;
  }
}
</style>