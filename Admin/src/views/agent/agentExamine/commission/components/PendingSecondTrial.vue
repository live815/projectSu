<!-- 佣金{{$t('agent.review')}} 待二审-->
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
        <el-button icon="Search" type="primary" @click="toQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="commissionTableDataList" style="width: 100%">
      <el-table-column :label="$t('agent.handle')" width="120" align="center">
        <template #default="scope">
          <el-button type="primary" @click="reviewDetails(scope.row)">{{
            $t('agent.review')
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column property="orderNo" :label="$t('agent.orderNo')" width="220" />
      <el-table-column property="commissionDate" :label="$t('agent.commissionMonth')" width="220">
        <template #default="{ row }">
          {{ formattedCommissionDate(row.commissionDate) }}
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
      v-model="isShowReview"
      :title="$t('agent.commissionSecondReviewDetails')"
      width="1300px"
      :center="true"
    >
      <CommissionReview
        v-if="isShowReview"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @closeAndRegainDate="closeAndRegainDate"
      ></CommissionReview>
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

const total = ref(5)
const queryParams = ref({
  agentName: '',
  applicantEndTime: '',
  applicantStartTime: '',
  commissionEndDate: '',
  commissionStartDate: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  statusList: [3],
  teamCommissionEnd: '',
  teamCommissionStart: ''
})

const size = ref()

//表格数据
const commissionTableDataList = ref([])
// 列表
const commissionReviewList = async () => {
  try {
    let res = await queryAuditListApi(queryParams.value)
    commissionTableDataList.value = res.records
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
const loading = ref(false)
const isShowReview = ref(false)
const reviewDetails = (row) => {
  rowItems.value = row
  isShowReview.value = !isShowReview.value
}
onMounted(() => {
  commissionReviewList()
})

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
  applicationTime.value = ''
  commissionMonth.value = ''
}
// 关闭弹窗
const closeParentDialog = () => {
  isShowReview.value = false
}

// 关闭弹窗并重新获取数据
const closeAndRegainDate = (status) => {
  if (status == 3) {
    isShowReview.value = false
    commissionReviewList()
  }
}
const formattedCommissionDate = (dateString) => {
  if (typeof dateString === 'string') {
    return dateString.slice(0, 7)
  } else {
    return '-'
  }
}
// 拼音输入时实时更新输入值
const handleInput = (field) => {
  console.log(field)
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}
</script>

<style lang="scss" scoped></style>
