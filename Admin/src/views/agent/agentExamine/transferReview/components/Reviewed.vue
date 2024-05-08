<!-- 转代{{$t('agent.review')}} 已{{$t('agent.review')}}-->
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
      <el-form-item :label="$t('agent.transferLoanMemberAccount')">
        <el-input
          v-model="queryParams.memberName"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.theAffiliatedAgentAccount')">
        <el-input
          v-model="queryParams.superiorAgentName"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.transferToAgentAccount')">
        <el-input
          v-model="queryParams.newSuperiorAgentName"
          :placeholder="$t('agent.pleaseInput')"
          clearable
          style="width: 180px"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.applier')">
        <el-input
          v-model="queryParams.applicant"
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
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :label="$t('agent.handle')" width="120" align="center">
        <template #default="scope">
          <el-button type="primary" @click="reviewDetails(scope.row)">{{
            $t('agent.check')
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column property="orderNo" :label="$t('agent.orderNoNoQuote')" width="220" />
      <el-table-column
        property="memberName"
        :label="$t('agent.transferMemberAccountQuot')"
        width="220"
      />
      <el-table-column
        property="superiorAgentName"
        :label="$t('agent.theAffiliatedAgentAccountQuot')"
        width="220"
      />
      <el-table-column
        property="newSuperiorAgentName"
        :label="$t('agent.transferToAgentAccountQuot')"
        width="220"
      />
      <el-table-column property="status" :label="$t('agent.orderStatus')" width="220">
        <template #default="{ row }">
          <span style="color: rgb(243, 74, 74)" v-if="row.status == 1">{{
            $t('agent.firstReviewRefuse')
          }}</span>
          <span style="color: rgb(204, 46, 46)" v-if="row.status == 3">{{
            $t('agent.secondReviewRefuse')
          }}</span>
          <span style="color: #04f21c" v-if="row.status == 4">{{
            $t('agent.secondReviewPass')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column property="name" :label="$t('agent.applyInformation')" width="280">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.applier') }} {{ row.applicant }}</p>
            <p class="margin">{{ $t('agent.applyTime') }} {{ row.applicantTime }}</p>
            <p class="margin">{{ $t('agent.applyRemark') }} {{ row.applicantMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        :label="$t('agent.firstInstanceReviewInformation')"
        width="280"
      >
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.oneReviewer') }} {{ row.firstReview }}</p>
            <p class="margin">{{ $t('agent.oneReviewTime') }}{{ row.firstReviewTime }}</p>
            <p class="margin">{{ $t('agent.oneReviewNote') }}{{ row.firstReviewMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" :label="$t('agent.secondReviewInformation')" width="280">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.twoReviewers') }}{{ row.finalReview }}</p>
            <p class="margin">{{ $t('agent.secondReviewTime') }}{{ row.finalReviewTime }}</p>
            <p class="margin">{{ $t('agent.twoReviewNotes') }}{{ row.finalReviewMark }}</p>
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
      v-model="isShowReview"
      :title="$t('agent.transferReview')"
      width="1000px"
      :center="true"
      :before-close="closeParentDialog"
    >
      <CheckTheDetails
        v-if="open"
        v-model:open="open"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @changeStatus="handleUpdateOpen"
      ></CheckTheDetails>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import CheckTheDetails from './CheckTheDetails.vue'
import { getTransferReviewListApi } from '@/api/agent/transferReview.js'

const queryParams = ref({
  applicant: '',
  applicantEndTime: '',
  applicantStartTime: '',
  memberName: '',
  newSuperiorAgentName: '',
  pageNum: 1,
  pageSize: 10,
  review: '',
  statusList: [1, 3, 4],
  superiorAgentName: ''
})
const total = ref(5)
const loading = ref(false)
const open = ref(false)
const rowItems = ref({})
const applicationTime = ref([])
// 表格数据
const tableData = ref([])
const transferReviewList = async () => {
  try {
    let res = await getTransferReviewListApi(queryParams.value)
    tableData.value = res.records
    tableData.value.forEach((item) => {
      item.id = BigInt(item.id).toString()
    })
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 查询
function handleQuery() {
  if (applicationTime.value) {
    queryParams.value.applicantStartTime = applicationTime.value[0]
    queryParams.value.applicantEndTime = applicationTime.value[1]
  } else {
    queryParams.value.applicantStartTime = null
    queryParams.value.applicantEndTime = null
  }
  transferReviewList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.memberName = ''
  queryParams.value.superiorAgentName = ''
  queryParams.value.newSuperiorAgentName = ''
  queryParams.value.applicant = ''
  queryParams.value.review = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  applicationTime.value = ''
  transferReviewList()
}
onMounted(() => {
  transferReviewList()
})
// 分页
function getList() {
  loading.value = true
  getTransferReviewListApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.records || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}
// 查看弹窗
const isShowReview = ref(false)
const reviewDetails = (row) => {
  isShowReview.value = !isShowReview.value
  rowItems.value = row
  console.log(rowItems.value)
  open.value = true
}
const closeParentDialog = () => {
  isShowReview.value = false
  open.value = false
}
const handleUpdateOpen = (val) => {
  if (val) {
    transferReviewList()
    isShowReview.value = false
    open.value = false
  }
}
</script>

<style lang="scss" scoped>
.new-line {
  display: flex;
  justify-content: flex-end;
  // margin-top: 10px;
}

.flex-grow {
  margin-right: 5px;
}

.flex-none {
  margin-right: 0;
}

.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}
</style>
