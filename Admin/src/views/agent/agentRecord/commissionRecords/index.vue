<!-- 佣金记录 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.creatTime') + ':'" prop="">
        <el-date-picker
          v-model="accountChangeTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('agent.commissionMonth') + ':'" prop="">
        <el-date-picker
          v-model="commissionMonth"
          type="daterange"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="-"
          :start-placeholder="$t('agent.startMonth')"
          :end-placeholder="$t('agent.endMonth')"
          :size="size"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.agentAccount') + ':'" prop="agentName">
        <el-input v-model="queryParams.agentName" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.orderNo')" prop="">
        <el-input v-model="queryParams.orderNo" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.commissionAmount')" prop="">
        <el-input
          v-model="queryParams.ownerCommissionStart"
          @input="handleInput('ownerCommissionStart')"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 80px"
        >
        </el-input>
        <span> &nbsp;-&nbsp; </span>
        <el-input
          v-model="queryParams.ownerCommissionEnd"
          :placeholder="$t('agent.pleaseInput')"
          @input="handleInput('ownerCommissionEnd')"
          clearable
          style="width: 80px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.orderStatusQuote')" prop="status">
        <el-select v-model="queryParams.status" clearable :placeholder="$t('agent.pleaseSelect')">
          <el-option
            v-for="item in businessTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
      <el-row>
        <el-form-item>
          <!--  -->
          <el-form-item :label="$t('agent.autoRefresh')">
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
              >{{ $t('agent.dataUpdateTime') }}{{ updateTime }}</span
            >
          </el-form-item>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="orderNo" label="同步数据" width="120" align="center">
        <template #default="{ row }">
          <el-button type="primary">取消同步</el-button>
        </template>
      </el-table-column> -->
      <el-table-column prop="orderNo" :label="$t('agent.orderNoNoQuote')" width="200" />
      <el-table-column prop="updateTime" :label="$t('agent.updateTime')" width="180" />
      <el-table-column prop="agentName" :label="$t('agent.agentAccount')" width="180" />
      <el-table-column prop="commissionDate" :label="$t('agent.commissionMonth')" width="120" />
      <el-table-column
        prop="ownerCommission"
        :label="$t('agent.commissionAmountQuot')"
        width="120"
      />
      <el-table-column
        prop="subCommission"
        :label="$t('agent.subordinateCommissionShare')"
        width="120"
      />
      <el-table-column prop="currentMonth" :label="$t('agent.cumulativeForTheMonth')" width="120" />
      <el-table-column prop="status" :label="$t('agent.releaseStatus')" width="140">
        <template #default="{ row }">
          <span style="color: #96cab7" v-if="row.status == 0">{{ $t('agent.statistics') }}</span>
          <span style="color: #1890ff" v-if="row.status == 1">{{ $t('agent.waitReview') }}</span>
          <span style="color: #d794a1" v-if="row.status == 2">{{ $t('agent.notIssued') }}</span>
          <span style="color: green" v-if="row.status == 3">{{ $t('agent.hasBeenIssued') }}</span>
          <span style="color: #d37881" v-if="row.status == 4">{{
            $t('agent.distributionStandardsNotMet')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="companyWinLose" :label="$t('agent.companyWinLose')" width="120" />
      <el-table-column
        prop="companyWinLoseAdjust"
        :label="$t('agent.companyWinLoseAdjust')"
        width="120"
      />
      <el-table-column prop="activeMembers" :label="$t('agent.activeMember')" width="120" />
      <el-table-column prop="commissionRate" :label="$t('agent.commissionRate')" width="120">
        <template #default="{ row }">
          <span>{{ (row.commissionRate * 100).toFixed(2).toString() + '%' || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="venueFee" :label="$t('agent.lobbyNameFee')" width="120">
        <template #default="{ row }">
          <span style="color: #1890ff">{{ row.venueFee }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rebateTotal" :label="$t('agent.totalReward')" width="120" />
      <el-table-column prop="welfareTotal" :label="$t('agent.totalDividend')" width="120" />
      <el-table-column
        prop="depositAndWithdrawalFees"
        :label="$t('agent.depositWithdrawFee')"
        width="120"
      />
      <el-table-column prop="lastMonth" :label="$t('agent.totalLastMonth')" width="120" />
      <el-table-column prop="depositAmount" :label="$t('agent.totalForDepositAmont')" width="120" />
      <el-table-column
        prop="creditDepositAmount"
        :label="$t('agent.totalForCreditAmount')"
        width="120"
      />
      <el-table-column prop="depositWelfare" :label="$t('agent.depositoryDividend')" width="120" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { checkCommissionRecordsApi } from '@/api/agent/agentRecord/agentRecord.js'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()

const queryParams = ref({
  agentName: '',
  commissionEndDate: '',
  commissionStartDate: '',
  createEndTime: '',
  createStartTime: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  status: '',
  ownerCommissionEnd: '',
  ownerCommissionStart: ''
})
const total = ref(0)
const loading = ref(false)
const size = ref()
const accountChangeTime = ref([]) //账变时间
const commissionMonth = ref([]) //佣金月份
const businessTypeList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.statistics')
  },
  {
    value: 1,
    label: i18n.global.t('agent.waitReview')
  },
  {
    value: 2,
    label: i18n.global.t('agent.notIssued')
  },
  {
    value: 3,
    label: i18n.global.t('agent.hasBeenIssued')
  },
  {
    value: 4,
    label: i18n.global.t('agent.distributionStandardsNotMet')
  }
])

// 输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}

//{{$t('agent.search')}}
function handleQuery() {
  if (accountChangeTime.value) {
    queryParams.value.createStartTime = accountChangeTime.value[0]
    queryParams.value.createEndTime = accountChangeTime.value[1]
  } else {
    queryParams.value.createStartTime = null
    queryParams.value.createEndTime = null
  }
  if (commissionMonth.value) {
    queryParams.value.commissionStartDate = commissionMonth.value[0]
    queryParams.value.commissionEndDate = commissionMonth.value[1]
  } else {
    queryParams.value.commissionStartDate = null
    queryParams.value.commissionEndDate = null
  }

  let start = queryParams.value.ownerCommissionStart
  let end = queryParams.value.ownerCommissionEnd

  if (!start && !end) {
    queryParams.value.pageNum = 1
    checkCommissionRecordsList()
  } else if (!start || !end || start * 1 > end * 1) {
    proxy.$modal.msgWarning(i18n.global.t('agent.amountInputTip1'))
  } else {
    queryParams.value.pageNum = 1
    checkCommissionRecordsList()
  }
}
// {{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.agentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.status = ''
  queryParams.value.ownerCommissionStart = ''
  queryParams.value.ownerCommissionEnd = ''
  queryParams.value.commissionStartDate = ''
  queryParams.value.commissionEndDate = ''
  queryParams.value.createStartTime = ''
  queryParams.value.createEndTime = ''
  queryParams.value.pageNum = 1
  accountChangeTime.value = ''
  commissionMonth.value = ''
  checkCommissionRecordsList()
}
// 列表
const tableData = ref([])
const checkCommissionRecordsList = async () => {
  try {
    let res = await checkCommissionRecordsApi(queryParams.value)
    tableData.value = res.rows || []
    tableData.value.forEach((item) => {
      item.id = BigInt(item.id).toString()
    })
    total.value = res.total
    let date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    updateTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } catch (e) {
    console.log(e)
  }
}
// 分页
function getList() {
  loading.value = true
  checkCommissionRecordsApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}

onMounted(() => {
  checkCommissionRecordsList()
})
// 自动更新功能
const updateTime = ref('')
const autoRefresh = ref(false)
const isfristLoad = ref(true)
let interval //倒计时器
const startAuto = (val) => {
  if (isfristLoad.value) {
    isfristLoad.value = false
  } else {
    checkCommissionRecordsList()
  }

  if (val) {
    autoRefresh.value = val
    clearInterval(interval)
    interval = setInterval(async () => {
      await checkCommissionRecordsList()
    }, autoRefresh.value)
  } else {
    clearInterval(interval)
  }
}
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
</script>

<style lang="scss" scoped>
.refresh {
  font-size: 14px;
  margin-left: 5px;
}
</style>
