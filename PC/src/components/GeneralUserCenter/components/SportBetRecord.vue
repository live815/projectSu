<template>
  <div class="SportBetRecord-view">
    <div class="drop-down">
      <el-form :model="filtedOpt" v-show="showSearch" :inline="true" label-width="auto">
        <el-form-item :label="$t('GeneralUserCenter.Platform')" v-if="curTab == 1">
          <el-select
            v-model="filtedOpt.channelPlatform"
            class="m-2"
            :placeholder="$t('GeneralUserCenter.PleaseEnter')"
            style="width: 148px"
            :disabled="statu"
            @change="change()"
          >
            <el-option
              v-for="item in platform"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 注单状态 -->
        <el-form-item
          :label="$t('GeneralUserCenter.State')"
          prop="channelStatus"
          v-if="curTab == 1"
        >
          <el-select
            v-model="filtedOpt.channelStatus"
            class="m-2"
            :placeholder="$t('GeneralUserCenter.PleaseEnter')"
            style="width: 148px"
            @change="updateStatus()"
          >
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 时间筛选 -->
        <el-form-item>
          <el-button
            type="info"
            class="customize-el-btn"
            :class="{ seactive: seactive == 0 }"
            @click="pickDate(0)"
            >{{ $t('GeneralUserCenter.Today') }}</el-button
          >
          <el-button
            type="info"
            class="customize-el-btn"
            :class="{ seactive: seactive == 1 }"
            @click="pickDate(1)"
            >{{ $t('GeneralUserCenter.Yesterday') }}</el-button
          >
          <el-button
            type="info"
            class="customize-el-btn"
            :class="{ seactive: seactive == 6 }"
            @click="pickDate(6)"
            >{{ $t('GeneralUserCenter.SevenDays') }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <div class="btn non-color" @click="resetFilter">{{ $t('GeneralUserCenter.Reset') }}</div>
          <el-button
            class="btn color"
            @click="handlefilter"
            :loading="loading"
            :disabled="loading"
            >{{ $t('GeneralUserCenter.Inquire') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="total">
      <!-- 总计单数 -->
      <div class="total-one">
        {{ $t('GeneralUserCenter.Total', { totalNum }) }}
      </div>
      <!-- 投注额 -->
      <div class="total-two">{{ $t('GeneralUserCenter.BetAmount') }}：{{ props.totalBet }}</div>
      <!-- 输赢 -->
      <div class="total-three" v-if="filtedOpt.channelStatus == 1">
        {{ $t('GeneralUserCenter.WinLose') }}：{{ props.totalWin }}
      </div>
      <!-- 有效流水 -->
      <div class="total-four" v-if="filtedOpt.channelStatus == 1">
        {{ $t('GeneralUserCenter.EffectiveFlow') }}：{{ props.totalValidFlow }}
      </div>
    </div>
    <!-- 投注记录表 -->
    <div class="table-spacing">
      <div class="table-content">
        <el-table :data="props.tabledata" style="width: 100%; height: 400px">
          <!-- 投注时间 -->
          <el-table-column
            prop="cte"
            :label="$t('GeneralUserCenter.BettingTime')"
            align="center"
            width="140"
          >
            <template #default="scope">
              <p v-if="scope.row">
                {{ formatTimes(scope.row.betTime)[0] }}<br />{{ formatTimes(scope.row.betTime)[1] }}
              </p>
            </template>
          </el-table-column>
          <!-- 订单号 -->
          <el-table-column
            prop="id"
            :label="$t('GeneralUserCenter.OrderNumber')"
            align="center"
            min-width="170"
          >
            <template #default="scope">
              <div class="orderNum">
                {{ scope.row.orderNo }}
                <div class="copybtn" v-if="scope.row.orderNo" v-clipboard="scope.row.orderNo">
                  {{ $t('GeneralUserCenter.Copy') }}
                </div>
                <!-- <span class="copybtn" @click="handleCopyButtonClick(scope.row.id)">
                  {{ $t('GeneralUserCenter.Copy') }}</span
                > -->
              </div>
            </template>
          </el-table-column>
          <!-- 平台 -->
          <!-- <el-table-column prop="lobbyName" :label="$t('GeneralUserCenter.Platforms')" align="center" width="90">
            {{$t('GeneralUserCenter.Csport')}}
          </el-table-column> -->
          <!-- 投注类型 -->
          <el-table-column prop="sert" :label="$t('SportsView.BetType')" width="100" align="center">
            <template #default="{ row }">
              <p
                class="types"
                v-text="row.betContentList.length > 1 ? row.gameName : $t('SportsView.SingleLevel')"
              ></p>
              <!-- <span v-if="row.sert">{{ row.bt }}</span> -->
              <p class="oddsFormat">{{ getOddFormatText(row.betContentList[0].oddsFormat) }}</p>
              <!-- <p >{{ getOddFormatText(row.ops[0].of) }}</p> -->
            </template>
          </el-table-column>
          <!-- 游戏内容 -->
          <!-- <el-table-column prop="gameContent" :label="$t('GeneralUserCenter.GameContent')" align="center" >
            <template #default="scope">
              <p>{{ titleBadgeText(scope.row) }}</p>
            </template>
          </el-table-column> -->
          <!-- 比赛 -->
          <el-table-column
            prop="com"
            :label="$t('GeneralUserCenter.Contest')"
            min-width="160"
            align="center"
          >
            <template #default="scope">
              <!-- <p class="bigtitle">{{ scope.row.ops[0].ln }}</p>
              <p class="smalltitle">{{ scope.row.ops[0].mn }}</p> -->
              <!-- <div class="game-detail">
                <p>{{ scope.row.gameName }}</p>
                <p>{{ scope.row.betContentList[0].tournamentName }}</p>
                <p class="detail-title-1">{{ scope.row.betContentList[0].hostVsGuest }}</p>
                <p>{{ scope.row.betContentList[0].matchTime }}</p>
              </div> -->
              <p class="gameName" v-if="scope.row.betContentList.length < 2">
                {{ scope.row.gameName }}
              </p>
              <div v-for="itm in scope.row.betContentList" :key="itm.id">
                <div class="game-detail">
                  <!-- 球类型 -->
                  <p class="detail-title-2 check-time">{{ itm.tournamentName }}</p>
                  <p class="detail-title-1">{{ itm.hostVsGuest }}</p>
                  <!-- 比赛日期和时间 -->
                  <p>{{ itm.matchTime }}</p>
                  <!-- 当前比分 -->
                  <!-- <span v-if="itm.scs?.length>0">{{ itm.scs[0] }}-{{ itm.scs[1] }}</span> -->
                  <!-- 下注时比赛状态 -->
                  <!-- <span class="pe" v-if="itm.mc?.pe">{{ getMatchStatus(itm, fbStore) }}</span> -->
                  <!-- 下注时比赛进行时间 mc.s-->
                  <!-- <span class="mc" v-if="itm.mc?.s" > -->
                  <!-- {{ itm.mc.s }} -->
                  <!-- 赛事计时 -->
                  <!-- <Counter
                      v-if="itm.mc?.hasOwnProperty('s') && itm.mc?.s >= 0"
                      :tp="itm.mc?.tp"
                      :s="itm.mc?.s"
                      :r="itm.mc?.r"
                    /> -->
                  <!-- </span> -->
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- 选项 -->
          <el-table-column
            prop="option"
            :label="$t('GeneralUserCenter.Options')"
            width="160"
            align="center"
          >
            <template #default="scope">
              <!-- <p class="detail-title-4 check-time">
                <span class="rate">
                  <span class="rates">
                    {{ itm.onm + ' ' }}
                  </span>
                  <span class="title-rate">@
                    {{ itm.bo }}
                  </span>
                </span>
                <span class="line"></span>
              </p> -->

              <div v-for="itm in scope.row.betContentList" :key="itm.id">
                <p class="detail-title-4 check-time">
                  <span class="mgn">
                    <span v-if="itm.ms == 5">{{ $t('SportsView.RollingBall') }}-</span
                    >{{ itm.playName }}
                    <!-- 下注时比分 -->
                    <span class="bsc" v-if="itm.matchScore"
                      >({{ filterScore(itm.matchScore) }})</span
                    >
                  </span>
                  <span class="rate"
                    ><span class="rates">
                      <!-- {{ itm.onm + ' ' }} -->
                      {{ itm.optionName }}
                    </span>
                    <span class="title-rate"
                      >@
                      <!-- {{ itm.bo }} -->
                      {{ itm.betOdds }}
                    </span>
                  </span>
                  <span class="line"></span>
                </p>
              </div>
            </template>
          </el-table-column>
          <!-- 已结算注单显示赛果 -->
          <!-- <el-table-column prop="Result" :label="$t('GeneralUserCenter.Result')"   align="center"  v-if="showSettledColumns()">
          
          </el-table-column> -->
          <!-- 投注结果已结算注单显示 -->
          <!-- <el-table-column prop="sr" :label="$t('SportsView.BettingResults')"  width="110"  align="center" v-if="showSettledColumns()">
            <template #default="scope">
              <p v-if="scope.row.rj">{{ getRejectResult(scope.row.rj) }}</p>
              <p v-else>{{ getResult(scope.row) || betStatus(scope.row.st) }} </p>
            </template>
          </el-table-column> -->
          <!-- 投注额 -->
          <el-table-column
            prop="orderAmount"
            :label="$t('GeneralUserCenter.BetAmount')"
            align="center"
            width="130"
          />
          <!-- <el-table-column prop="sat" :label="$t('GeneralUserCenter.EffectiveFlow')"  align="center" /> -->
          <!-- 可赢金额 -->
          <el-table-column
            prop="maxWinAmount"
            :class="[filtedOpt.channelStatus == 0 ? 'sport' : '']"
            v-if="filtedOpt.channelStatus == 0"
            :label="$t('GeneralUserCenter.AmountToWin')"
            align="center"
            width="150"
          >
          </el-table-column>
          <!-- 输赢 -->
          <el-table-column
            prop="profitAmount"
            v-else
            :label="$t('GeneralUserCenter.WinLose')"
            align="center"
            width="100"
          >
            <template #default="scope">
              <p :class="getProfitClass(scope.row.profitAmount)">{{ scope.row.profitAmount }}</p>
            </template>
          </el-table-column>
          <!-- 已结算注单显示有效投注流水 -->
          <el-table-column
            prop="validBet"
            :label="$t('GeneralUserCenter.validBet')"
            align="center"
            v-if="showSettledColumns()"
          >
          </el-table-column>
          <!-- 注单状态 -->
          <el-table-column
            prop="st"
            :class="[filtedOpt.channelStatus == 0 ? 'sport' : '']"
            v-if="showunSettledColumns()"
            :label="$t('GeneralUserCenter.BetStatus')"
            align="center"
            width="150"
          >
            <template #default="scope">
              <p class="status" :style="changeTextColor(scope.row.betResult)">
                {{ orderStatus(scope.row.betResult) }}
              </p>
              <!-- 提前结算按钮 -->
              <div
                v-if="allowEarlySettle(scope.row) && unSettleType"
                :class="{ 'disabled-btn': onSettlementing(scope.row) }"
                class="currency btn"
                @click="openDialog(scope.row)"
              >
                <div class="currency-content">
                  <div v-if="onSettlementing(scope.row)">
                    <el-button class="loadBtn" :loading="loading">
                      <span>{{ $t('GeneralUserCenter.EarlySettlementInProgress') }}</span>
                    </el-button>
                  </div>
                  <div v-else>
                    <span
                      >{{ $t('GeneralUserCenter.EarlySettlement') }} <CurrencyUnit />{{
                        getPrice(scope.row)
                      }}</span
                    >
                  </div>
                </div>
                <div class="currency-img" v-if="false"></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="st"
            v-else
            :label="$t('GeneralUserCenter.BetStatus')"
            align="center"
            width="150"
          >
            <template #default="scope">
              <p class="status" :style="changeTextColor(scope.row.betResult)">
                {{ orderStatus(scope.row.betResult) }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <Pagination
        v-if="total > 0"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div>
    <!-- 确认提前结算的弹窗 -->
    <el-dialog
      class="settleDialog"
      v-model="dialogVisible"
      width="311px"
      height="66px"
      center
      align-center
    >
      <span>{{ $t('GeneralUserCenter.EarlySettlementTips') }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="cancel" @click="dialogVisible = false">{{
            $t('GeneralUserCenter.Cancel')
          }}</el-button>
          <el-button class="confirm" type="primary" @click="submit">
            {{ $t('GeneralUserCenter.Sure') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { formatTime } from '@/utils'
import { getTimeStampByPassDay } from '@/utils'
import { getOddFormatText, getMatchStatus, getballType } from '@/hooks/useSportDict'
import { filterScore, orderStatus, changeTextColor } from '@/hooks/sportsView'
import Pagination from '@/components/Pagination/Pagination.vue'
import eventBus from '@/utils/eventBus'
// import { betRecord } from '@/api/fb'
import vClipboard from '@/directives/clipboard'
import Counter from '@/components/Counter/Counter.vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import { submitPriceRecord } from '@/api/fb'
// import { betRecord,priceRecord } from '@/api/fb'
import { useFBStore } from '@/stores/fb'
import { onUnmounted } from 'vue'
const fbStore = useFBStore()

const curTab = ref(1)
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const loading = ref(false)
const emit = defineEmits(['updatePage', 'upadtePageSize', 'updateStatus'])
const props = defineProps([
  'tabledata',
  'totalNum',
  'totalBet',
  'totalValidFlow',
  'totalWin',
  '',
  'priceList',
  'status'
])
const total = ref(props.totalNum)
const timeData = ref([])
fbStore.queryMatchListParams.current = 1
// const totalBet = ref(props.totalBet)//总投注金额
// const totalWin = ref(props.totalWin || 0)//总结算派奖金额
// const totalValidFlow = ref(props.totalValidFlow || 0)//总有效流水
// const orderIds = ref([])//未结算订单的ID集合查询是否能提前结算
const showSettledColumns = () => filtedOpt.value.channelStatus == 1
const showunSettledColumns = () => filtedOpt.value.channelStatus == 0

const totalNum = ref(props.totalNum) //总订单数
const statu = ref(true)
const currentDate = new Date()

// 初始化时间
const timeRange = ref({
  startTime: new Date(new Date().setHours(0, 0, 0, 0)) * 1,
  endTime: new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59,
    999
  ).getTime()
})
const filtedOpt = ref({
  channelPlatform: i18n.global.t('GeneralUserCenter.Csport'),
  channelStatus: 0
})
const unSettleType = filtedOpt.value.channelStatus == 0
const seactive = ref(0)
const showSearch = ref(true)
// const tableData = ref()// 注单列表
// const pagesize = ref(10)
const platform = ref([])
// 状态
const status = [
  {
    value: 0,
    label: i18n.global.t('GeneralUserCenter.Unsettlement')
  },
  {
    value: 1,
    label: i18n.global.t('GeneralUserCenter.Settled')
  }
]
onMounted(() => {
  pickDate(0)
  filtedOpt.value.channelStatus = 0
})
watchEffect(() => {
  totalNum.value = props.totalNum
  total.value = props.totalNum
})
function change() {
  if (curTab.value == 2) {
    currentGame.value = filtedOpt.value.channelPlatform
  } else {
    currentGame.value = i18n.global.t('GeneralUserCenter.Csport')
  }
}
function updateStatus() {
  emit('updateStatus', filtedOpt.value.channelStatus)
}
// 日期选择按钮
function pickDate(days) {
  timeData.value = getTimeStampByPassDay(days)
  seactive.value = days
  timeRange.value.startTime = timeData.value[0]
  timeRange.value.endTime = timeData.value[1]
  eventBus.emit('updataTime', timeRange.value)
}
//日历选择
function updateTimeData(n) {
  timeData.value = n
  seactive.value = 2
  timeRange.value.startTime = timeData.value[0]
  timeRange.value.endTime = timeData.value[1]
}
// 重置
function resetFilter() {
  filtedOpt.value.channelPlatform = i18n.global.t('GeneralUserCenter.Csport')
  filtedOpt.value.channelStatus = 0
  timeData.value = []
  handlefilter()
}
// 获取输赢值class
function getProfitClass(profitAmount) {
  if (profitAmount > 0) {
    return 'green'
  }
  if (profitAmount < 0) {
    return 'red'
  }
}

// 点击查询按钮
function handlefilter() {
  loading.value = true
  eventBus.emit('updataTime', timeRange.value)
}
eventBus.on('loading', (val) => {
  loading.value = val
})
onUnmounted(() => {
  eventBus.off('loading')
})
// 翻页
const handleCurrentPageUpdate = (newPage) => {
  currentPage.value = newPage
  fbStore.queryMatchListParams.current = newPage
  emit('updatePage', newPage, 'sport')
}
// 一页多少条数据
const handlePageSizeUpdate = (newSize) => {
  pageSize.value = newSize
  emit('upadtePageSize', newSize, 'sport')
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
//保存结算临时变量信息
const settleValue = ref({})
const openDialog = (item) => {
  loading.value = true
  dialogVisible.value = true
  open.value = true
  settleValue.value = item
}
// 确定提前结算注单
const submit = async () => {
  dialogVisible.value = false
  let price = props.priceList.find((itm) => settleValue.value.id === itm.oid)
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
// 拒单结果
function getRejectResult(val) {
  switch (val) {
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
// 投注结果
function getResult(val) {
  if (val.sv == 1) {
    switch (val.ops[0].sr) {
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
  } else {
    if (val.uwl > 0) {
      return i18n.global.t('SportsView.Win')
    }
    if (val.uwl < 0) {
      return i18n.global.t('SportsView.Lose')
    }
  }
}
function getDynamicContent(id) {
  return id // 返回需要复制的内容，这里以 row.id 为例
}
function handleCopyButtonClick(id) {
  // 在复制按钮的点击事件处理程序中获取当前内容并复制到剪贴板
  const currentContent = getDynamicContent(id)

  navigator.clipboard
    .writeText(currentContent)
    .then(() => {
      console.log('内容已成功复制到剪贴板')
    })
    .catch((error) => {
      console.error('复制内容到剪贴板时出错:', error)
    })
}

// 处理时间换行
function formatTimes(val) {
  let parts = val.split(' ')
  let part1 = parts[0]
  let part2 = parts[1]
  return [part1, part2]
}
</script>

<style lang="scss" scoped>
.SportBetRecord-view {
  .drop-down {
    margin: 30px auto 0px;
    width: 93%;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 88px;
      height: 34px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
    .non-color {
      color: var(--unnamed, #f35f1b);
      border: 1px solid var(--unnamed, #f35f1b);
    }
    .color {
      margin-left: 10px;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff;
    }
    .customize-el-btn {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .seactive {
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff;
    }
  }
  .total {
    height: 44px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    display: flex;
    color: var(--100, #fff);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px;
    padding-left: 40px;
    width: 1240px;
    margin: 0 auto;
    .total-two,
    .total-three,
    .total-four {
      margin-left: 40px;
    }
  }
  .table-spacing {
    min-width: 1240px;
    max-width: 1240px;
    margin: 0 auto;
    margin-top: 30px;
    .table-content {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .order-number {
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      border-radius: 2px;
      width: 100px;
      margin: 0 auto;
    }
    .copybtn {
      cursor: pointer;
      color: var(--unnamed, #409eff);
      margin-left: 5px;
      font-size: 12px;
    }
  }
  .footer {
    display: flex;
    justify-content: end;
    margin-top: 20px;
    padding: 0 40px 20px;
  }
  :deep() {
    .el-table__body tr:hover > td.el-table__cell {
      background-color: #171a2f;
    }
    .el-form--inline .el-form-item {
      margin-right: 10px;
    }
    .el-form-item__label {
      color: var(--100, #fff);

      font-size: 14px;
      font-style: normal;
    }
    .el-table {
      --el-table-border-color: 1px solid rgba(255, 255, 255, 0.2);
      --el-table-header-bg-color: var(--unnamed, #171a2f);
      --el-table-border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .el-table tr {
      background-color: #272b45;
      color: var(--100, #fff);
    }
    .el-button--info {
      --el-button-hover-border-color: #f35f1b;
      --el-button-bg-color: #272b45;
      background-color: #272b45 !important;
    }
    .el-button:focus,
    .el-button:hover {
      color: #f35f1b;
    }
    .el-input {
      --el-input-bg-color: #272b45;
    }
    .el-input__inner {
      color: var(--100, #fff);
    }
    .el-input__inner:hover {
      box-shadow: none;
    }
    .el-input__wrapper {
      background-color: #272b45;
      // border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }
    .el-date-editor .el-range-separator {
      color: var(--100, #fff);
    }
    .el-date-editor .el-range-input {
      color: var(--100, #fff);
    }
    .el-select {
      --el-select-input-focus-border-color: none;
    }
    .el-range-editor.is-active:hover {
      box-shadow: none;
    }
    .el-text.el-text--danger {
      --el-text-color: #e93d3d;
    }
    .el-scrollbar__wrap {
      background: #272b45;
    }
    .btn {
      border: 1px solid var(--unnamed, #f35f1b);
      border-radius: 3px;
      color: #f35f1b;
      cursor: pointer;
      margin-top: 3px;
    }
    .el-button.is-disabled {
      background: #454859;
      border-color: #454859;
    }
    .el-button {
      // background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      border-color: #ff9000;
    }
    .el-dialog__header {
      display: none !important;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .el-notification {
      border-radius: 8px;
      background-color: var(--unnamed, #323c6f);
      border: none;
    }
    .el-dialog {
      border-radius: 12px;
      background: #232949;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog--center .el-dialog__body {
      text-align: center;
      color: #fff;
      min-height: 75px !important;
      border-radius: 20px;
    }
    .el-button {
      min-width: 61px;
      height: 40px;
    }
    .cancel {
      background: transparent !important;
      color: #f35f1b !important;
      border-color: #f35f1b !important;
    }
    .confirm {
      background: #f35f1b !important;
    }
    .loadBtn {
      background: transparent;
      border: none;
      color: #f35f1b;
      font-size: 12px;
    }
    .el-button.is-loading:before {
      background-color: transparent;
    }
    .el-button > span {
      color: #fff;
    }
    .seactive,
    .el-button:active {
      color: #fff;
    }
    .red {
      color: var(--color-danger);
    }
    .green {
      color: var(--color-green);
    }
    .game-detail {
      .detail-title-1 {
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 12px;
      }
      .pe {
        margin: 0 5px;
      }
    }
    .title-rate {
      color: var(--unnamed, #f35f1b);
      margin-left: 5px;
      margin-right: 5px;
    }
    .rates {
      margin-left: 5px;
      margin-right: 5px;
      font-size: 12px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      display: inline-flex;
      // width: 100%;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .rate {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .mgn {
      display: block;
    }
    .orderNum {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
    }
    .el-table td.el-table__cell div {
      max-height: 110px;
      overflow: scroll;
    }
  }
}
</style>