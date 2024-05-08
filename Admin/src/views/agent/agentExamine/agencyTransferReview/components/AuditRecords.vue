<!-- 转账已审核 -->
<template>
  <div>
    <el-form :model="queryParams" :inline="true">
      <el-row>
        <el-form-item label="申请时间 :"
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
        <el-form-item label="转出代理账号 :"
          ><el-input v-model="queryParams.transferOutAgentName" placeholder="请输入转出代理账号"
        /></el-form-item>
        <el-form-item label="转入代理账号 :"
          ><el-input v-model="queryParams.transferInAgentName" placeholder="请输入转入代理账号"
        /></el-form-item>
        <el-form-item label="订单号 :"
          ><el-input v-model="queryParams.orderNo" placeholder="请输入订单号" style="width: 300px"
        /></el-form-item>
        <el-form-item label="申请人 :"
          ><el-input v-model="queryParams.applicant" placeholder="请输入申请人"
        /></el-form-item>
        <el-form-item label="订单状态 :">
          <el-select v-model="selectStatus" clearable placeholder="请选择订单状态">
            <el-option
              v-for="item in orderStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> </el-select
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
      <div class="form-items-container">
        <div>
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
        </div>
      </div>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="220" />
      <el-table-column prop="transferOutAgentName" label="转出代理账号" />
      <el-table-column prop="walletType" label="额度类型">
        <template #default="{ row }">
          <span v-if="row.walletType == 0"> {{ $t('agent.quotaWallet') }}</span>
          <span v-if="row.walletType == 1"> {{ $t('agent.creditWallet') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transferInAgentName" label="转入代理账号" />
      <el-table-column prop="transferMoney" label="转账金额" sortable>
        <template #default="{ row }">
          <span>{{ row.transferMoney.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 1" type="danger">{{
            $t('agent.firstReviewRefuse')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger">{{
            $t('agent.secondReviewRefuse')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 4" type="success">{{
            $t('agent.secondReviewPass')
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="申请信息" width="260">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.applier') }}{{ row.applicant }}</p>
            <p class="margin">{{ $t('agent.applyTime') }}{{ row.applicantTime }}</p>
            <p class="margin">{{ $t('agent.applyRemark') }}{{ row.applicantMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="" :label="$t('agent.firstReviewInformation')" width="260">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.firstReviewer') }}{{ row.firstReview }}</p>
            <p class="margin">{{ $t('agent.firstReviewTime') }}{{ row.firstReviewTime }}</p>
            <p class="margin">{{ $t('agent.firstReviewRemark') }}{{ row.firstReviewMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="" :label="$t('agent.secondReviewInformation')" width="260">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.secondReviewer') }}{{ row.finalReview || '--' }}</p>
            <p class="margin">
              {{ $t('agent.secondReviewTime') }}{{ row.finalReviewTime || '--' }}
            </p>
            <p class="margin">
              {{ $t('agent.secondReviewRemark') }}{{ row.finalReviewMark || '--' }}
            </p>
          </div>
        </template>
      </el-table-column>
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
import { defaultTime, shortcuts } from '@/utils/config'
import i18n from '@/i18n'
import { ref } from 'vue'
import { getQueryTransferListApi } from '@/api/agent/agentTransfer.js'

const queryParams = ref({
  applicant: '',
  applicantEndTime: '',
  applicantStartTime: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  statusList: [1, 3, 4],
  transferInAgentName: '',
  transferOutAgentName: ''
})

const total = ref(0)
const applicationTime = ref([]) //申请时间
const loading = ref(false)
const selectStatus = ref('all')
//查询
function handleQuery() {
  if (applicationTime.value) {
    queryParams.value.applicantStartTime = applicationTime.value[0]
    queryParams.value.applicantEndTime = applicationTime.value[1]
  } else {
    queryParams.value.applicantStartTime = null
    queryParams.value.applicantEndTime = null
  }
  let status = orderStatusMap.value[selectStatus.value]
  queryParams.value.statusList = status
  agentTransferList()
}
// 订单状态映射
const orderStatusMap = ref({
  all: [1, 3, 4],
  firstReject: [1],
  secReject: [3],
  thirdPass: [4]
})
//重置
function resetQuery() {
  queryParams.value.transferOutAgentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.applicant = ''
  queryParams.value.transferInAgentName = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  selectStatus.value = ''
  applicationTime.value = ''
}
// 选项列表
const orderStatusList = ref([
  {
    value: 'all',
    label: i18n.global.t('agent.all')
  },
  {
    value: 'firstReject',
    label: i18n.global.t('agent.firstReviewRefuse')
  },
  {
    value: 'secReject',
    label: i18n.global.t('agent.secondReviewRefuse')
  },
  {
    value: 'thirdPass',
    label: i18n.global.t('agent.secondReviewPass')
  }
])
// 刷新时间
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
const updateTime = ref('')
const autoRefresh = ref(false)
const isfristLoad = ref(true)
let interval //倒计时器
const startAuto = (val) => {
  if (isfristLoad.value) {
    isfristLoad.value = false
  } else {
    agentTransferList()
  }
  if (val) {
    autoRefresh.value = val
    clearInterval(interval)
    interval = setInterval(async () => {
      await agentTransferList()
    }, autoRefresh.value)
  } else {
    clearInterval(interval)
  }
}
// 表格数据
const tableData = ref([])

// 列表
const agentTransferList = async () => {
  try {
    let res = await getQueryTransferListApi(queryParams.value)
    tableData.value = res.records
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
  getQueryTransferListApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.records || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}

onMounted(() => {
  agentTransferList() //初始化加载数据
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style lang="scss" scoped>
.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}
</style>
