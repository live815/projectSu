<!-- 佣金已审核-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.creatTime') + ':'">
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

      <el-form-item :label="$t('agent.commissionMonth') + ':'">
        <el-date-picker
          v-model="commissionMonth"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          :start-placeholder="$t('agent.startMonth')"
          :end-placeholder="$t('agent.endMonth')"
          :size="size"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        />
      </el-form-item>

      <el-form-item :label="$t('agent.teamCommission') + ':'">
        <el-input
          v-model="queryParams.teamCommissionStart"
          :placeholder="$t('agent.pleaseInput')"
          @input="handleInput('teamCommissionStart')"
          clearable
          style="width: 100px"
        >
        </el-input>
        <span> &nbsp;-&nbsp; </span>
        <el-input
          v-model="queryParams.teamCommissionEnd"
          :placeholder="$t('agent.pleaseInput')"
          @input="handleInput('teamCommissionEnd')"
          clearable
          style="width: 100px"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item :label="$t('agent.agentAccount') + ':'">
          <el-input v-model="queryParams.agentName" />
        </el-form-item>
        <el-form-item :label="$t('agent.orderNo')">
          <el-input v-model="queryParams.orderNo" />
        </el-form-item>

        <el-form-item :label="$t('agent.orderStatus') + ':'">
          <el-select v-model="orderStatus" class="m-2" :placeholder="$t('agent.pleaseSelect')">
            <el-option :label="$t('agent.all')" :value="0" />
            <el-option :label="$t('agent.firstReviewRefuse')" :value="2" />
            <el-option :label="$t('agent.secondReviewRefuse')" :value="4" />
            <el-option :label="$t('agent.secondReviewPass')" :value="5" />
          </el-select>
        </el-form-item>
        <el-button icon="Search" type="primary" @click="toQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="commissionTableDataList" style="width: 100%">
      <el-table-column :label="$t('agent.handle')" width="120" align="center">
        <template #default="scope">
          <el-button type="primary" @click="commissionDetails(scope.row)">{{
            $t('agent.check')
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column property="orderNo" :label="$t('agent.orderNo')" width="220" />
      <el-table-column property="commissionDate" :label="$t('agent.commissionMonth')" width="220">
        <template #default="{ row }">
          <span>{{ formattedCommissionDate(row.commissionDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="agentName" :label="$t('agent.agentAccount')" width="220" />
      <el-table-column property="teamCommission" :label="$t('agent.teamCommission')" width="220" />
      <el-table-column property="status" :label="$t('agent.orderStatus')" width="220">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 1" type="info">{{
            $t('agent.waitFirstReview')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger">{{
            $t('agent.firstReviewRefuse')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 3" type="info">{{
            $t('agent.waitSecondReview')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 4" type="danger">{{
            $t('agent.secondReviewRefuse')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 5" type="success">{{
            $t('agent.secondReviewPass')
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="applicantTime" :label="$t('agent.applyTimeNoQuote')" />
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
      v-model="isShowDetails"
      :title="$t('agent.commissionReviewedDetails')"
      width="1300px"
      :center="true"
    >
      <CommissionReview
        v-if="isShowDetails"
        :rowItems="rowItems"
        :isView="true"
        @closeDialog="closeParentDialog"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import CommissionReview from './CommissionReview.vue'
import { queryAuditListApi } from '@/api/agent/commission.js'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const orderStatus = ref(0)
const total = ref(5)
const loading = ref(false)
const queryParams = ref({
  agentName: '',
  applicantEndTime: '',
  applicantStartTime: '',
  commissionEndDate: '',
  commissionStartDate: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  statusList: [2, 4, 5],
  teamCommissionEnd: '',
  teamCommissionStart: ''
})

const size = ref()

// {{$t('agent.search')}}
const applicationTime = ref([]) //申请时间
const commissionMonth = ref([]) //佣金月份
const toQuery = () => {
  if (!applicationTime.value || applicationTime.value.length == 0) {
    queryParams.value.applicantStartTime = ''
    queryParams.value.applicantEndTime = ''
  } else {
    queryParams.value.applicantStartTime = applicationTime.value[0]
    queryParams.value.applicantEndTime = applicationTime.value[1]
  }

  if (!commissionMonth.value || commissionMonth.value.length == 0) {
    queryParams.value.commissionStartDate = ''
    queryParams.value.commissionEndDate = ''
  } else {
    queryParams.value.commissionStartDate = commissionMonth.value[0]
    queryParams.value.commissionEndDate = commissionMonth.value[1]
  }
  if (orderStatus.value == 0) {
    queryParams.value.statusList = [2, 4, 5]
  } else {
    queryParams.value.statusList = []
    queryParams.value.statusList.push(orderStatus.value)
  }

  let start = queryParams.value.teamCommissionStart
  let end = queryParams.value.teamCommissionEnd

  if (!start && !end) {
    queryParams.value.pageNum = 1
    commissionReviewList()
  } else if (!start || !end || start * 1 > end * 1) {
    proxy.$modal.msgWarning(i18n.global.t('agent.noBiggerThenStart'))
    return
  } else {
    queryParams.value.pageNum = 1
    commissionReviewList()
  }
}
/** {{$t('agent.reset')}}按钮操作 */
function resetQuery() {
  queryParams.value.agentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  queryParams.value.commissionStartDate = ''
  queryParams.value.commissionEndDate = ''
  queryParams.value.teamCommissionStart = ''
  queryParams.value.teamCommissionEnd = ''
  orderStatus.value = ''
  applicationTime.value = ''
  commissionMonth.value = ''
}
//表格数据
const commissionTableDataList = ref([])
// 列表
const commissionReviewList = async () => {
  try {
    let res = await queryAuditListApi(queryParams.value)
    commissionTableDataList.value = res.records
    // agentDataList.value[0].id = BigInt(res.records[0].id).toString();
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 分页
function getList() {
  loading.value = true
  queryAuditListApi(queryParams.value)
    .then((res) => {
      loading.value = false
      commissionTableDataList.value = res.records || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}
//佣金详情弹窗
const rowItems = ref({})
const isShowDetails = ref(false)
const commissionDetails = (row) => {
  console.log(row)
  rowItems.value = row
  isShowDetails.value = !isShowDetails.value
}

// 关闭详情弹窗
const closeParentDialog = () => {
  isShowDetails.value = !isShowDetails.value
}

onMounted(() => {
  commissionReviewList()
})
// 日期格式化
const formattedCommissionDate = (dateString) => {
  if (typeof dateString === 'string') {
    return dateString.slice(0, 7)
  } else {
    return '-'
  }
}
// 拼音输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}
</script>

<style lang="scss" scoped></style>
