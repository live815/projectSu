<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('operation.memberaccount1')" prop="userName">
        <el-input v-model="queryParams.username" :placeholder="$t('operation.pleaseEnter')" />
      </el-form-item>
      <el-form-item :label="$t('operation.Agentaccount1')" prop="agent">
        <el-input
          v-model="queryParams.agent"
          clearable
          :placeholder="$t('operation.pleaseEnter')"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.Rebatestatus')" prop="status">
        <el-select
          v-model="queryParams.status"
          clearable
          :placeholder="$t('operation.paleaseChose')"
        >
          <el-option
            v-for="item in rebateStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('operation.tip148') + ' :'">
        <el-date-picker
          v-model="registerTime"
          value-format="YYYY-MM-DD"
          type="datetimerange"
          :range-separator="$t('operation.to')"
          :start-placeholder="$t('operation.beginTime')"
          :end-placeholder="$t('operation.endTime')"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleQuery">{{
          $t('operation.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('operation.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <div class="qqqq">
      <div class="text-total">
        <div>{{ $t('operation.tip149') }}{{ onComputedCount }}</div>
        <div>{{ $t('operation.tip150') }}{{ onComputedOnCount }}</div>
      </div>
      <div class="export">
        <el-button icon="Download" type="warning" style="margin-left: auto" @click="handleExport">{{
          $t('operation.Exportlist')
        }}</el-button>
      </div>
    </div>
    <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column
        prop="date"
        type="index"
        :label="$t('operation.serialnumber')"
        width="100"
        align="center"
      />
      <el-table-column prop="userName" :label="$t('operation.memberaccount')" width="180" />
      <el-table-column
        prop="vipLevel"
        class-name="filter-icon"
        column-key="vipLevel"
        :label="$t('operation.VIPlevel1')"
        width="180"
        :filters="vipLevel"
      >
        <template #default="scope"> VIP{{ scope.row.vipLevel }} </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        prop="riskLevel"
        column-key="riskLevel"
        :label="$t('operation.Riskcontrollevel')"
        width="200"
        :filters="riskList"
      >
        <template #default="scope">
          <span> {{ scope.row.riskLevel ? scope.row.riskLevel : '--' }} </span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="filter-icon"
        prop="financeLevel"
        column-key="financeLevel"
        :label="$t('operation.tip151')"
        width="180"
        :filters="financalList"
      >
        <template #default="scope">
          <span> {{ scope.row.financeLevel ? scope.row.financeLevel : '--' }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="agent" :label="$t('operation.Agentaccount')" width="180">
        <template #default="scope">
          <span> {{ scope.row.agent ? scope.row.agent : '--' }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :label="$t('operation.tip152')" width="200" align="center">
        <template #default="scope">
          <span class="details" type="primary" @click="rebateDetailsList(scope.row)">
            {{ scope.row.amount.toFixed(2) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('operation.tip153')" width="200">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == 1">{{
            $t('operation.Alreadyrebate')
          }}</el-tag>
          <el-tag type="warning" v-if="scope.row.status == 0">{{
            $t('operation.Norebate')
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('operation.tip148')" sortable>
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
      v-model="rebateDetails"
      :title="$t('operation.Rebatedetails')"
      width="1200px"
      :center="true"
    >
      <PersonalDetails
        :data="data"
        :rowItem="rowItem"
        @dataPaging="dataPaging"
        @closeDialog="closeParentDialog"
      ></PersonalDetails>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { cashbackRecordApi } from '@/api/operation/activeConfiguration'
import PersonalDetails from './PersonalDetails.vue'
import { cashbackDetailsApi, exportRebateRecordsApi } from '@/api/operation/activeConfiguration'
import i18n from '@/i18n'
import { getRiskFinancalList } from '@/api/risk/level/index'

onMounted(() => {
  queryRiskList()
  queryFinancalList()
})

const { proxy } = getCurrentInstance()
const data = ref()
const queryParams = ref({
  agent: '', //代理账号
  createTimeEnd: '', //
  createTimeStart: '', //
  status: '', //返水状态
  tenantId: '', //平台id
  username: '', //会员账号
  pageNum: 1,
  pageSize: 10
})
const dataPaging = (val) => {
  data.value = val
}
const total = ref(5)
const loading = ref(false)

// 筛选功能
const handleSelectionChange = () => {}
const riskList = ref([]) //风控层级
const financalList = ref([]) //财务层级
// vip层级
const vipLevel = ref([
  { text: 'VIP0', value: '0' },
  { text: 'VIP1', value: '1' },
  { text: 'VIP2', value: '2' },
  { text: 'VIP3', value: '3' },
  { text: 'VIP4', value: '4' },
  { text: 'VIP5', value: '5' },
  { text: 'VIP6', value: '6' },
  { text: 'VIP7', value: '7' },
  { text: 'VIP8', value: '8' },
  { text: 'VIP9', value: '9' },
  { text: 'VIP10', value: '10' },
  { text: 'VIP11', value: '11' }
])

//查询风控层级
function queryRiskList() {
  return getRiskFinancalList(2).then((res) => {
    riskList.value = res || []
    riskList.value = filterLevel(riskList.value)
  })
}
//查询财务层级
function queryFinancalList() {
  return getRiskFinancalList(1).then((res) => {
    financalList.value = res || []
    financalList.value = filterLevel(financalList.value)
  })
}
function filterLevel(list) {
  list.forEach((item) => {
    item.text = item.layerName
    item.value = item.id
  })
  return list
}

const rebateStatus = [
  {
    value: '',
    label: i18n.global.t('operation.Nolimit')
  },
  {
    value: 1,
    label: i18n.global.t('operation.Alreadyrebate')
  },
  {
    value: 0,
    label: i18n.global.t('operation.Norebate')
  }
  // {
  //   value: "3",
  //   label: "返水失败",
  // },
]
const tableData = ref([])
//返水计算
const onComputedCount = computed(() => {
  if (tableData.value) {
    return tableData.value
      .filter((item) => item.status == 1)
      .reduce((total, item) => total + item.amount, 0)
  }
  return 0
})
const onComputedOnCount = computed(() => {
  if (tableData.value) {
    return tableData.value
      .filter((item) => item.status != 1)
      .reduce((total, item) => total + item.amount, 0)
  }
  return 0
})
// 当前行数据
const rowItem = ref({})
//返水明细列表
const rebateDetails = ref(false)
const rebateDetailsList = (val) => {
  getDataListDetail(val)
  rowItem.value = val
  rebateDetails.value = !rebateDetails.value
}
const closeParentDialog = () => {
  rebateDetails.value = false
}
//列表
const getDataList = async () => {
  try {
    let res = await cashbackRecordApi(queryParams.value)
    tableData.value = res.rows
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
//详情列表
const getDataListDetail = async (item) => {
  const Params = {
    pageNum: 1,
    pageSize: 10,
    recordTime: item.createTime,
    userId: item.userId
  }
  try {
    let res = await cashbackDetailsApi(Params)
    data.value = res
    // total.value = res.total;
  } catch (e) {
    console.log(e)
  }
}
// 查询列表
const registerTime = ref([])
function handleQuery() {
  if (registerTime.value) {
    queryParams.value.createTimeStart = registerTime.value[0]
    queryParams.value.createTimeEnd = registerTime.value[1]
  } else {
    queryParams.value.createTimeStart = null
    queryParams.value.createTimeEnd = null
  }
  getDataList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.username = ''
  queryParams.value.agent = ''
  queryParams.value.status = ''
  queryParams.value.createTimeStart = ''
  queryParams.value.createTimeEnd = ''
  registerTime.value = []
  getDataList()
}
// 导出
const handleExport = () => {
  proxy.download(
    '/system/rebate/record/export',
    { ...queryParams.value },
    `返水记录_${new Date().toDateString()}.xlsx`
  )
}

// 分页
function getList() {
  loading.value = true
  cashbackRecordApi(queryParams.value)
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
  getDataList()
})
</script>

<style lang="scss" scoped>
.qqqq {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text-total {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    div {
      width: 190px;
      height: 58px;
      border-radius: 5px;
      border: 1px solid #a2d2ff;
      font-size: 13px;
      background-color: rgba(226, 241, 255, 0.99);
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
      color: #1890ff;
      text-align: center;
      line-height: 58px;
    }
  }
  .export {
    display: flex;
    align-items: center;
  }
}

.details {
  cursor: pointer;
  color: #1890ff;
}

:deep() {
  .filter-icon .el-icon svg {
    display: none;
  }
  .filter-icon .el-icon {
    content: url('@/assets/icons/svg/filter.svg') !important;
  }
}
</style>
