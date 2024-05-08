<!-- 新增代理{{$t('agent.review')}}已{{$t('agent.review')}} -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.applyTime')">
        <el-date-picker
          v-model="applicationTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('agent.reviewTime')">
        <el-date-picker
          v-model="reviewTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('agent.agentAccountQuote')">
        <el-input
          v-model="queryParams.agentName"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.orderNo')">
        <el-input
          v-model="queryParams.orderNo"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.reviewer')">
        <el-input
          v-model="queryParams.review"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.agentType')">
        <el-select
          v-model="queryParams.agentType"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 120px"
        >
          <el-option
            v-for="item in agentTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.agentModel')">
        <el-select
          v-model="queryParams.agentMode"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 120px"
        >
          <el-option
            v-for="item in proxyModeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.orderStatusQuote')">
        <el-select
          v-model="selectStatus"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 120px"
        >
          <el-option
            v-for="item in orderStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('agent.handle')" width="120" align="center">
        <template #default="scope">
          <el-button type="primary" @click="clickToView(scope.row)">{{
            $t('agent.check')
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" :label="$t('agent.orderNoNoQuote')" width="220" />
      <el-table-column prop="agentName" :label="$t('agent.agentAccount')" width="180" />
      <el-table-column prop="agentLevel" :label="$t('agent.agentLevel')" width="180">
        <template #default="{ row }">
          <span>{{ row.agentLevel + 1 }} {{ $t('agent.level') }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="superiorAgentName" :label="$t('agent.parentAccount')" width="180">
        <template #default="{ row }">
          <span>{{ row.superiorAgentName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="agentType" :label="$t('agent.agentTypeNoQuote')" width="180">
        <template #default="scope">
          <span v-if="scope.row.agentType == 0">{{ $t('agent.innerAgent') }}</span>
          <span v-if="scope.row.agentType == 1">{{ $t('agent.outerAgent') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="agentMode" :label="$t('agent.agentModelNoQuote')" width="180">
        <template #default="scope">
          <span v-if="scope.row.agentMode == 0">{{ $t('agent.commissionMode') }}</span>
          <span v-if="scope.row.agentMode == 1">{{ $t('agent.dispatchMode') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('agent.orderStatus')" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 1" type="danger">{{ $t('agent.reviewRefuse') }}</el-tag>
          <el-tag v-if="scope.row.status == 2" type="success">{{ $t('agent.reviewPass') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('agent.applyInformation')" width="260">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.applier') }}{{ row.applicant }}</p>
            <p class="margin">{{ $t('agent.applyTime') }}{{ row.applicantTime }}</p>
            <p class="margin">{{ $t('agent.applyRemark') }}{{ row.applicantMark || ' -' }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('agent.reviewInformation')" width="330">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.reviewer') }}{{ row.review }}</p>
            <p class="margin">{{ $t('agent.reviewTime') }}{{ row.reviewTime }}</p>
            <p class="margin">{{ $t('agent.reviewRemark') }}{{ row.reviewMark || ' -' }}</p>
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
    <el-dialog v-model="addNewView" width="1000px" :center="true" :before-close="closeParentDialog">
      <ViewReview
        v-model:open="open"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @changeStatus="handleUpdateOpen"
        v-if="open"
      ></ViewReview>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import ViewReview from './ViewReview.vue'
import { agentNewReviewApi } from '@/api/agent/agentReview/agentReview.js'
const selectStatus = ref('all')
const queryParams = ref({
  agentMode: '',
  agentType: '',
  agentName: '',
  applicant: '',
  applicantEndTime: '',
  applicantStartTime: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  review: '',
  reviewEndTime: '',
  reviewStartTime: '',
  statusList: [1, 2],
  reviewMark: ''
})
const total = ref(5)
const open = ref(false)
const rowItems = ref({})
const loading = ref(false)
const agentTypeList = [
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.innerAgent')
  },
  {
    value: 1,
    label: i18n.global.t('agent.outerAgent')
  }
]
const proxyModeList = [
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.commissionMode')
  },
  {
    value: 1,
    label: i18n.global.t('agent.dispatchMode')
  }
]
// 订单状态映射
const orderStatusMap = ref({
  all: [1, 2],
  firstReject: [1],
  secReject: [2]
})
// 选项列表
const orderStatusList = ref([
  {
    value: 'all',
    label: i18n.global.t('agent.all')
  },
  {
    value: 'firstReject',
    label: i18n.global.t('agent.reviewRefuse')
  },
  {
    value: 'secReject',
    label: i18n.global.t('agent.reviewPass')
  }
])

// {{$t('agent.check')}}详情弹窗
const addNewView = ref(false)
const clickToView = (row) => {
  addNewView.value = !addNewView.value
  rowItems.value = row
  open.value = true
}
const handleUpdateOpen = (val) => {
  if (val) {
    agentListInformation()
    addNewView.value = false
    open.value = false
  }
}
const closeParentDialog = () => {
  addNewView.value = false
  open.value = false
}
// {{$t('agent.search')}}列表
const applicationTime = ref([]) //申请时间
const reviewTime = ref([]) //{{$t('agent.review')}}时间
function handleQuery() {
  if (applicationTime.value) {
    queryParams.value.applicantStartTime = applicationTime.value[0]
    queryParams.value.applicantEndTime = applicationTime.value[1]
  } else {
    queryParams.value.applicantStartTime = null
    queryParams.value.applicantEndTime = null
  }
  if (reviewTime.value) {
    queryParams.value.reviewStartTime = reviewTime.value[0]
    queryParams.value.reviewEndTime = reviewTime.value[1]
  } else {
    queryParams.value.reviewStartTime = null
    queryParams.value.reviewEndTime = null
  }
  let status = orderStatusMap.value[selectStatus.value]
  queryParams.value.statusList = status
  queryParams.value.pageNum = 1
  agentListInformation()
}
// {{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.agentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.review = ''
  queryParams.value.agentType = ''
  queryParams.value.agentMode = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  queryParams.value.reviewStartTime = ''
  queryParams.value.reviewEndTime = ''
  applicationTime.value = ''
  reviewTime.value = ''
  selectStatus.value = ''
  selectStatus.value = 'all'
  // agentListInformation();
}
// 获取新增代理列表信息
const agentListInformation = async () => {
  try {
    let res = await agentNewReviewApi(queryParams.value)
    tableData.value = res.records
    tableData.value.forEach((item) => {
      item.id = BigInt(item.id).toString()
    })
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
const tableData = ref([])
// 分页
function getList() {
  loading.value = true
  agentNewReviewApi(queryParams.value)
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
  agentListInformation()
})
</script>

<style lang="scss" scoped>
.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}
:deep() {
  .el-dialog__header {
    padding: 0 !important;
  }
}
</style>
