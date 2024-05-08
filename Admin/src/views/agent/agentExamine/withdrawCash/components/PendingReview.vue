<!-- 提现风控{{$t('agent.review')}} 待{{$t('agent.review')}}-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-row>
        <el-form-item :label="$t('agent.withdrawalTime')"
          ><el-date-picker
            v-model="applicationTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('agent.startTime')"
            :end-placeholder="$t('agent.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts"
          ></el-date-picker
        ></el-form-item>
        <el-form-item :label="$t('agent.agentAccount') + ':'"
          ><el-input
            v-model="queryParams.agentName"
            :placeholder="$t('agent.pleaseInput')"
            clearable
            style="width: 180px"
          >
          </el-input
        ></el-form-item>
        <el-form-item :label="$t('agent.withdrawalOrderNumber')"
          ><el-input
            v-model="queryParams.orderNo"
            :placeholder="$t('agent.pleaseInput')"
            clearable
            style="width: 180px"
          >
          </el-input
        ></el-form-item>
        <el-form-item :label="$t('agent.withdrawalMethod') + ':'">
          <el-select
            v-model="queryParams.wdWayType"
            class="m-2"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 180px"
          >
            <el-option
              v-for="item in withdrawalMethodList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('agent.withdrawalAmount')">
          <el-input
            v-model="queryParams.withdrawalMoneyStart"
            :placeholder="$t('agent.pleaseInput')"
            clearable
            style="width: 100px"
            @input="handleInput('withdrawalMoneyStart')"
          >
          </el-input>
          <span> &nbsp;-&nbsp; </span>
          <el-input
            v-model="queryParams.withdrawalMoneyEnd"
            :placeholder="$t('agent.pleaseInput')"
            clearable
            style="width: 100px"
            @input="handleInput('withdrawalMoneyEnd')"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button icon="Search" type="primary" @click="query">{{
            $t('agent.search')
          }}</el-button>
          <el-button icon="Refresh" @click="reset">{{ $t('agent.reset') }}</el-button>
        </el-form-item>
      </el-row>
      <div class="form-items-container">
        <div>
          <el-form-item :label="$t('agent.autoRefresh') + ':'">
            <el-select
              v-model="autoRefresh"
              class="m-2"
              :placeholder="$t('agent.pleaseSelect')"
              style="width: 120px"
              @change="startAuto"
            >
              <el-option
                v-for="item in autoRefreshList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <span style="color: rgba(217, 0, 27, 0.85)"
              >{{ $t('agent.dataUpdateTime') }} {{ updateTime }}</span
            >
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-table :data="fundsDataList" style="width: 100%">
      <el-table-column :label="$t('agent.handle')" width="160" align="center">
        <template #default="scope">
          <el-button type="warning" @click="reviewDetails(scope.row, true)">{{
            $t('agent.putOnHold')
          }}</el-button>
          <el-button type="primary" @click="reviewDetails(scope.row)">{{
            $t('agent.review')
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column property="orderNo" :label="$t('agent.orderNoNoQuote')" width="180" />
      <el-table-column property="agentUsername" :label="$t('agent.agentInformation')" width="180">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.agentAccount') }} {{ row.agentName }}</p>
            <p class="margin">{{ $t('agent.agentLevelQuote') }} {{ row.agentLevel + 1 }}</p>
            <p class="margin">
              {{ $t('agent.parentAccountQuote') }}
              {{ row.superiorAgentName || '--' }}
            </p>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column property="agentLevel" label="代理层级" width="180" /> -->
      <el-table-column
        property="amount"
        :label="$t('agent.withdrawalAmountQuot')"
        width="180"
        sortable
      />
      <el-table-column property="wdWayType" :label="$t('agent.withdrawalMethod')" width="150">
        <template #default="{ row }">
          <span>{{
            row.wdWayType == 0 ? $t('agent.bankCardCashWithdrawal') : $t('agent.withdrawUsdt')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column property="agentMode" :label="$t('agent.orderStatus')" width="180">
        <template #default="{ row }">
          <span>{{ statusMap[row.status] }}</span>
          <!-- <span>{{ row.status }}</span> -->
        </template>
      </el-table-column>
      <el-table-column property="status" :label="$t('agent.billingMessage')" width="250">
        <template #default="{ row }">
          <div v-if="row.wdWayType == 0" style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.payee') }} {{ row.payeeName || '--' }}</p>
            <p class="margin">{{ $t('agent.bankName') }}{{ row.payeeBankName || '--' }}</p>
            <p class="margin">{{ $t('agent.bankCardNumber') }}{{ row.payeeCardNo || '--' }}</p>
          </div>
          <div v-else style="margin: 0; padding: 0">
            <p class="margin">
              {{ $t('agent.transactionAgreement') }}
              {{ row.tradeProtocol == 1 ? 'TRC20' : 'ERC20' }}
            </p>
            <p class="margin">{{ $t('agent.paymentAddress') }}{{ row.tradeAddr || '--' }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="createTime" :label="$t('agent.time')" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />

    <el-dialog
      v-model="isShowReview"
      :title="$t('agent.withdrawalRiskControlReview')"
      width="1200px"
      :center="true"
    >
      <RiskControlReview
        v-if="isShowReview"
        :rowItem="rowItem"
        :isHold="isHold"
        :status="1"
        @closeReviewDetails="closeReviewDetails"
      ></RiskControlReview>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import RiskControlReview from './RiskControlReview.vue'
import { getAgentWithdrawListApi } from '@/api/agent/adjustment.js'
const { proxy } = getCurrentInstance()

const queryParams = ref({
  agentName: '',
  createEndTime: '',
  createStartTime: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  statusList: [0],
  wdWayType: '',
  withdrawalMoneyEnd: '',
  withdrawalMoneyStart: ''
})
const startAmount = ref()
const endAmount = ref()
const total = ref(0)
const applicationTime = ref([]) //申请时间

onMounted(async () => {
  await getList()
})
//表格
const fundsDataList = ref([])
// 分页
const getList = async () => {
  getAgentWithdrawListApi(queryParams.value).then((res) => {
    fundsDataList.value = res.rows
    total.value = res.total
    let date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    updateTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  })
}

// {{$t('agent.search')}}功能
const query = () => {
  // if (startAmount.value && endAmount.value && endAmount.value > startAmount.value) {
  //   queryParams.value.withdrawalMoneyStart = startAmount.value
  //   queryParams.value.withdrawalMoneyEnd = endAmount.value
  // } else {
  //   queryParams.value.withdrawalMoneyStart = endAmount.value
  //   queryParams.value.withdrawalMoneyEnd = startAmount.value
  // }
  if (applicationTime.value) {
    queryParams.value.createStartTime = applicationTime.value[0]
    queryParams.value.createEndTime = applicationTime.value[1]
  } else {
    queryParams.value.createStartTime = ''
    queryParams.value.createEndTime = ''
  }

  let start = queryParams.value.withdrawalMoneyStart
  let end = queryParams.value.withdrawalMoneyEnd

  if (!start && !end) {
    queryParams.value.pageNum = 1
    getList()
  } else if (!start || !end || start * 1 > end * 1) {
    proxy.$modal.msgWarning(i18n.global.t('agent.noBiggerThenStart'))
    return
  } else {
    queryParams.value.pageNum = 1
    getList()
  }
}

// {{$t('agent.reset')}}功能
const reset = () => {
  queryParams.value = {
    agentName: '',
    createEndTime: '',
    createStartTime: '',
    orderNo: '',
    pageNum: 1,
    pageSize: 10,
    statusList: [0],
    wdWayType: '',
    withdrawalMoneyEnd: '',
    withdrawalMoneyStart: ''
  }
  startAmount.value = null
  endAmount.value = null
  applicationTime.value = null
  getList()
}
// {{$t('agent.review')}}弹窗
const isShowReview = ref(false)
const rowItem = ref({})
const isHold = ref(false)
const reviewDetails = (row, boolean) => {
  rowItem.value = row
  isShowReview.value = true
  if (boolean) {
    // isHold.value = true;
  } else {
    isHold.value = false
  }
}
const closeReviewDetails = () => {
  isShowReview.value = false
  getList()
}

//自动刷新
const updateTime = ref()
const autoRefresh = ref(false)
const isfristLoad = ref(true)
let interval //倒计时器
const startAuto = (val) => {
  console.log(val)
  if (val) {
    autoRefresh.value = val
    clearInterval(interval)
    interval = setInterval(async () => {
      getList()
    }, autoRefresh.value)
  } else {
    clearInterval(interval)
  }
}

onUnmounted(() => {
  clearInterval(interval)
})
const withdrawalMethodList = [
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.bankCardCashWithdrawal')
  },
  {
    value: 1,
    label: i18n.global.t('agent.withdrawUsdt')
  }
]
const autoRefreshList = [
  {
    value: 300000,
    label: i18n.global.t('agent.fiveMinute')
  },
  {
    value: 900000,
    label: i18n.global.t('agent.fifteen')
  },
  {
    value: 1800000,
    label: i18n.global.t('agent.thirtyMinute')
  },
  {
    value: false,
    label: i18n.global.t('agent.abandon')
  }
]
const statusMap = {
  0: i18n.global.t('agent.riskControlPendingReview'),
  1: i18n.global.t('agent.riskControlOnHold'),
  2: i18n.global.t('agent.riskControlReviewRejected'),
  3: i18n.global.t('agent.riskControlReviewPassed'),
  4: i18n.global.t('agent.withdrawalSuccessful'),
  5: i18n.global.t('agent.threePartyWithdrawal'),
  6: i18n.global.t('agent.threePartyWithdrawalFailed'),
  7: i18n.global.t('agent.refuseToWithdrawMoney'),
  8: i18n.global.t('agent.forceSuccess')
}

// 输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/[^\d]/g, '')
}
</script>

<style lang="scss" scoped>
.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}

.form-items-container {
  display: flex;
  justify-content: space-between;
}

.right-aligned-items {
  display: flex;
  align-items: center;
}
</style>
