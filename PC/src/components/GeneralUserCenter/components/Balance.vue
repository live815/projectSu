<template>
  <!-- 资金明细 -->
  <div class="main-container Balance">
    <div class="drop-down balance">
      <el-form :inline="true" label-width="auto">
        <el-form-item :label="$t('GeneralUserCenter.Type')">
          <el-select
            v-model="queryParams.orderType"
            :placeholder="$t('GeneralUserCenter.ChooseTheType')"
            style="width: 148px"
          >
            <el-option
              v-for="item in platform"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('GeneralUserCenter.State')"
          prop="channelStatus"
          style="margin-left: 10px"
        >
          <el-select
            v-model="queryParams.orderStatus"
            :placeholder="$t('GeneralUserCenter.SelectAStatus')"
            style="width: 148px"
          >
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="dayslist-left">
            <div
              class="days"
              v-for="day in daysList"
              :key="day.label"
              :class="{ active: isActiveDay(day.label) }"
              @click="toggleActiveDay(day.label)"
            >
              {{ day.day }}
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker>
        </el-form-item>
        <el-form-item>
          <div class="btn non-color" @click="resetFilter">{{ $t('GeneralUserCenter.Reset') }}</div>
          <div class="btn color" @click="getList">{{ $t('GeneralUserCenter.Inquire') }}</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-spacing">
      <div class="table-content">
        <el-table
          v-loading="loading"
          :element-loading-text="$t('GeneralUserCenter.Loading')"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="dataList"
          style="width: 100%"
        >
          <el-table-column
            prop="orderTime"
            :label="$t('GeneralUserCenter.Time')"
            align="center"
            width="180"
          />
          <el-table-column
            prop="orderNo"
            :label="$t('GeneralUserCenter.OrderNumber')"
            align="center"
            width="240"
          >
            <template #default="scope">
              <div class="order-number">
                <div class="order-title">{{ scope.row.orderNo }}</div>
                <div class="order-text" v-if="scope.row.orderNo" v-clipboard="scope.row.orderNo">
                  {{ $t('AnchorPlay.Copy') }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderTypeName"
            :label="$t('GeneralUserCenter.TransactionType')"
            align="center"
          />
          <el-table-column
            prop="amount"
            :label="$t('GeneralUserCenter.AmountOfTheTransaction')"
            align="center"
          >
            <template #default="scope">
              {{ toFormatNumber(Number(scope.row.amount)) }}
            </template>
          </el-table-column>
          <template v-if="queryParams.orderType == 1">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.RechargeMethod')"
              align="center"
            />
            <el-table-column
              prop="actualAmt"
              :label="$t('GeneralUserCenter.ActualArrival')"
              align="center"
            />
          </template>
          <template v-if="queryParams.orderType == 2">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.WithdrawalMethod')"
              align="center"
            />
            <el-table-column
              prop="actualAmt"
              :label="$t('GeneralUserCenter.ActualArrival')"
              align="center"
            />
            <el-table-column
              prop="wdFee"
              :label="$t('GeneralUserCenter.HandlingFee')"
              align="center"
            />
          </template>
          <template v-if="queryParams.orderType == 3">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.Types')"
              align="center"
            />
            <el-table-column
              prop="gameLobby"
              :label="$t('GeneralUserCenter.Venue')"
              align="center"
            />
          </template>
          <template v-if="queryParams.orderType == 5">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.RebateType')"
              align="center"
            />
          </template>
          <template v-if="queryParams.orderType == 6">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.EventName')"
              align="center"
            />
          </template>
          <template v-if="queryParams.orderType == 7">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.ReasonForAdjustment')"
              align="center"
            />
          </template>
          <template v-if="queryParams.orderType == 8">
            <el-table-column
              prop="subOrderTypeName"
              :label="$t('GeneralUserCenter.ConsumptionType')"
              align="center"
            />
          </template>
          <el-table-column
            prop="orderStatus"
            :label="$t('GeneralUserCenter.States')"
            align="center"
          >
            <template #default="scope">
              <el-text v-if="scope.row.orderStatus == 1" type="success"
                >{{ $t('GeneralUserCenter.Success') }}
              </el-text>
              <el-text v-if="scope.row.orderStatus == 0" type="danger">{{
                $t('GeneralUserCenter.Processing')
              }}</el-text>
              <el-text v-if="scope.row.orderStatus == 2" type="danger">{{
                $t('GeneralUserCenter.Fail')
              }}</el-text>
              <el-text v-if="scope.row.orderStatus == 3" type="danger">{{
                $t('GeneralUserCenter.UnderReview')
              }}</el-text>
            </template>
          </el-table-column>
          <template v-if="queryParams.orderType == 1 || queryParams.orderType == 2">
            <el-table-column :label="$t('GeneralUserCenter.operate')" align="center">
              <template #default="scope">
                <el-button v-if="scope.row.orderStatus == 0" type="primary" @click="onClickCheck">{{
                  $t('GeneralUserCenter.Check')
                }}</el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="footer">
        <Pagination
          v-show="total > 0"
          :current-page="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          :total="total"
          @update:current-page="handleCurrentPageUpdate"
          @update:page-size="handlePageSizeUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getFristTimeStamp } from '@/utils'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { getListByDate } from '@/api/financialDetails'
import { toFormatNumber, getDateOffset, formatTime } from '@/utils'
import vClipboard from '@/directives/clipboard'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import { useAnnouncementStore } from '@/stores/announcement'
const announcement = useAnnouncementStore()
const mainConfig = useChargeAndWithdrawal()

const timeData = ref([])
const active = ref(0)
const loading = ref(false)
// 重置
function resetFilter() {
  active.value = 0
  timeData.value = []
  queryParams.orderType = '1'
  queryParams.orderStatus = ''
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  toggleActiveDay(0)
  getList()
}

// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
  console.log(newPage, 'newPage')
  queryParams.pageNum = newPage
  getList()
}
const handlePageSizeUpdate = (newSize) => {
  console.log(newSize, 'newSize')
  queryParams.pageSize = newSize
  getList()
}

// 时间选择器组件getTimeStampByPassDay(7)
function updateTimeData(n) {
  timeData.value = n
  active.value = null
  let [startTime, endTime] = n
  if (startTime) {
    startTime = dayjs.unix(startTime / 1000).format('YYYY-MM-DD HH:mm:ss')
  }
  if (endTime) {
    endTime = dayjs.unix(endTime / 1000).format('YYYY-MM-DD HH:mm:ss')
  }
  let defaultStartTime = formatTime(getDateOffset(-90)) // 最近3个月
  let defaultEndTime = formatTime(getDateOffset(0))
  queryParams.startTime = startTime || defaultStartTime
  queryParams.endTime = endTime || defaultEndTime
}
// 时间筛选
const toggleActiveDay = (days) => {
  active.value = Number(days)
  timeData.value = getFristTimeStamp(days)
  active.value = days
  queryParams.startTime = dayjs.unix(timeData.value[0] / 1000).format('YYYY-MM-DD HH:mm:ss')
  queryParams.endTime = dayjs.unix(timeData.value[1] / 1000).format('YYYY-MM-DD HH:mm:ss')
}

const daysList = [
  { label: '0', day: i18n.global.t('GeneralUserCenter.Today') },
  { label: '1', day: i18n.global.t('GeneralUserCenter.Yesterday') },
  { label: '7', day: i18n.global.t('GeneralUserCenter.SevenDays') }
]

const isActiveDay = (day) => active.value == day

const platform = [
  {
    value: '1',
    label: i18n.global.t('GeneralUserCenter.Deposit')
  },
  {
    value: '2',
    label: i18n.global.t('GeneralUserCenter.Withdraw')
  },
  {
    value: '3',
    label: i18n.global.t('GeneralUserCenter.Transfer')
  },
  {
    value: '5',
    label: i18n.global.t('GeneralUserCenter.Rebate')
  },
  {
    value: '6',
    label: i18n.global.t('GeneralUserCenter.Dividend')
  },
  {
    value: '7',
    label: i18n.global.t('GeneralUserCenter.SystemAdjustment')
  },
  {
    value: '8',
    label: i18n.global.t('GeneralUserCenter.LiveStreaming')
  }
]
const status = [
  {
    value: '',
    label: i18n.global.t('GeneralUserCenter.All')
  },
  {
    value: '0',
    label: i18n.global.t('GeneralUserCenter.Processing')
  },
  {
    value: '1',
    label: i18n.global.t('GeneralUserCenter.Success')
  },

  {
    value: '2',
    label: i18n.global.t('GeneralUserCenter.Fail')
  }
]

// 列表数据
const dataList = ref([])
// 数据总数
const total = ref(0)
// 订单状态
const queryParams = reactive({
  orderStatus: '', //交易订单统一状态：为空-查询全部、处理中（0）、成功（1）、失败（2）
  orderType: '1', // 交易订单类型(为空-查询全部、1-充值、2-提现)
  pageNum: 1, // 当前页面
  pageSize: 10, // 每页显示记录数
  startTime: '', // 开始时间
  endTime: '' // 结束时间
})

onMounted(() => {
  toggleActiveDay(0)
  getList()
  announcement.getAnnouncementList()
})

// 获取列表数据
const getList = () => {
  loading.value = true
  dataList.value = []
  const params = {
    orderStatus: queryParams.orderStatus,
    orderType: queryParams.orderType,
    startTime: queryParams.startTime,
    endTime: queryParams.endTime,
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize
  }
  getListByDate(params)
    .then((res) => {
      loading.value = false
      total.value = res.data.total
      dataList.value = res.data.rows || []
    })
    .catch(() => {
      loading.value = false
    })
}

// 查看当前订单
const onClickCheck = () => {
  if (queryParams.orderType == 1) {
    mainConfig.currentShow = 1
    const params = {
      isOpen: true,
      current: 1
    }
    toggleActiveDay(0)
    queryParams.orderType = '1'
    getList()
    eventBus.emit('showCharge', params)
  } else {
    mainConfig.currentShow = 2
    const params = {
      isOpen: true,
      current: 2
    }
    toggleActiveDay(0)
    queryParams.orderType = '2'
    getList()
    eventBus.emit('showCharge', params)
  }
}

eventBus.on('updateBalnce', (val) => {
  toggleActiveDay(0)
  queryParams.orderType = val
  setTimeout(() => {
    getList()
  }, 500)
})
onUnmounted(() => {
  eventBus.off('updateBalnce')
})
</script>

<style lang="scss" scoped>
.Balance {
  padding-left: 40px;
  min-width: 1320px;
  max-width: 1320px;
  margin-top: 5px;
  background: #272b45;
  border-radius: 8px;
  min-height: 705px;
  .drop-down {
    padding-top: 30px;
    .dayslist-left {
      display: flex;
      flex-direction: row;
      .days {
        display: flex;
        min-width: 60px;
        padding: 0 5px;
        height: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
        color: #fff;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          border: 1px solid var(--unnamed, #f35f1b);
          color: var(--unnamed, #f35f1b);
        }
      }
      .active {
        border: 1px solid var(--unnamed, #f35f1b);
        color: var(--unnamed, #f35f1b);
      }
    }
  }
  .table-spacing {
    width: 1240px;
    .table-content {
      border: 1px solid rgba(255, 255, 255, 0.2);
      .order-number {
        display: flex;
        align-items: center;
        .order-title {
          border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
          border-radius: 2px;
          margin-right: 5px;
        }
        .order-text {
          text-decoration: underline;
          font-size: 14px;
          color: var(--unnamed, #409eff);
        }
      }
    }
  }
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
  .color {
    margin-left: 10px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #fff;
  }
  .non-color {
    color: var(--unnamed, #f35f1b);
    border: 1px solid var(--unnamed, #f35f1b);
  }
  .customize-el-btn {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .footer {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
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
  .el-input {
    --el-input-bg-color: #272b45;
  }
  .el-input__inner {
    color: var(--60, rgba(255, 255, 255, 0.6));
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
    --el-select-input-focus-border-color: ;
  }
  .el-range-editor.is-active:hover {
    box-shadow: none;
  }
  .el-pagination {
    --el-pagination-hover-color: #f35f1b;
  }
  .el-pagination.is-background .el-pager li.is-active {
    color: #f35f1b;
    border: 1px solid #f35f1b;
    // background-color: var(--100, #fff);
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: #272b45;
    color: var(--100, #fff);
  }
  .el-button:focus,
  .el-button:hover {
    color: #f35f1b;
  }
  .el-text.el-text--danger {
    --el-text-color: #e93d3d;
  }
  .el-table__empty-block {
    background-color: #272b45;
  }
}
</style>
