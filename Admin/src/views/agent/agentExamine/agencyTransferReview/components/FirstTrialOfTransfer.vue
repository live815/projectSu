<!-- 转账一审 -->
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
      <el-table-column prop="date" :label="$t('agent.handle')" width="220" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="getIsShowPopup(row, 2)">{{
            $t('agent.pass')
          }}</el-button>
          <el-button type="danger" @click="getIsShowPopup(row, 1)">{{
            $t('agent.refuse')
          }}</el-button>
        </template>
      </el-table-column>
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
        <template #default="{ row }">
          <span style="color: #04f21c" v-if="row.status == 0">{{
            $t('agent.waitFirstReview')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="申请信息" sortable width="260">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.applier') }}{{ row.applicant }}</p>
            <p class="margin">{{ $t('agent.applyTime') }}{{ row.applicantTime }}</p>
            <p class="margin">{{ $t('agent.applyRemark') }}{{ row.applicantMark }}</p>
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

    <el-dialog
      v-model="isShowPopup"
      :title="passOrReject == 2 ? $t('agent.reviewPass') : $t('agent.reviewRefuse')"
      width="800px"
      :center="true"
      :before-close="closeParentDialog"
    >
      <ByRejectingPopups
        v-if="isShowPopup"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @changeStatus="handleUpdateOpen"
        :passOrReject="passOrReject"
      ></ByRejectingPopups>
    </el-dialog>
  </div>
</template>

<script setup>
import { defaultTime, shortcuts } from '@/utils/config'
import i18n from '@/i18n'
import ByRejectingPopups from './ByRejectingPopups.vue'
import { ref } from 'vue'
import { getQueryTransferListApi } from '@/api/agent/agentTransfer.js'

const queryParams = ref({
  applicant: '',
  applicantEndTime: '',
  applicantStartTime: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  statusList: [0],
  transferInAgentName: '',
  transferOutAgentName: ''
})

const total = ref(0)
const applicationTime = ref([]) //申请时间
const loading = ref(false)

//查询
function handleQuery() {
  if (applicationTime.value) {
    queryParams.value.applicantStartTime = applicationTime.value[0]
    queryParams.value.applicantEndTime = applicationTime.value[1]
  } else {
    queryParams.value.applicantStartTime = null
    queryParams.value.applicantEndTime = null
  }
  agentTransferList()
}
//重置
function resetQuery() {
  queryParams.value.transferOutAgentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.applicant = ''
  queryParams.value.transferInAgentName = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  applicationTime.value = ''
}
// 审核弹窗
const rowItems = ref({})
const isShowPopup = ref(false)
const passOrReject = ref('')
const getIsShowPopup = (row, type) => {
  passOrReject.value = type
  isShowPopup.value = !isShowPopup.value
  rowItems.value = row
}
const handleUpdateOpen = (val) => {
  if (val) {
    agentTransferList()
    isShowPopup.value = false
    open.value = false
  }
}
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
//取消关闭弹窗
const closeParentDialog = () => {
  isShowPopup.value = false
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
