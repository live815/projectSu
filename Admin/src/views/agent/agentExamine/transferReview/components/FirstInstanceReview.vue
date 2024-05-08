<!-- 转代审核 一审待审核-->
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
      <el-form-item :label="$t('agent.transferMemberAccount')">
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
      <el-form-item>
        <el-button icon="Search" type="primary" @click="handleQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :label="$t('agent.handle')" width="120" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="reviewDetails(row)">{{ $t('agent.review') }}</el-button>
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
          <span style="color: #04f21c" v-if="row.status == 0">{{
            $t('agent.waitFirstReview')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column property="name" :label="$t('agent.applyInformation')">
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
      v-model="isShowReview"
      :title="$t('agent.transferReview')"
      width="1000px"
      :center="true"
    >
      <ReviewContent
        v-model:open="open"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @changeStatus="handleUpdateOpen"
        v-if="isShowReview"
      ></ReviewContent>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import ReviewContent from './ReviewContent.vue'
import { getTransferReviewListApi } from '@/api/agent/transferReview.js'

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  statusList: [0]
})
const total = ref(5)
const open = ref(false)
const loading = ref(false)
const rowItems = ref({})
const applicationTime = ref([]) // 申请时间

// 审核弹窗
const isShowReview = ref(false)
const reviewDetails = (row) => {
  isShowReview.value = !isShowReview.value
  rowItems.value = row
  open.value = true
}
const handleUpdateOpen = (val) => {
  if (val) {
    transferReviewList()
    isShowReview.value = false
    open.value = false
  }
}
const closeParentDialog = () => {
  isShowReview.value = false
  open.value = false
}
// 列表
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
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  applicationTime.value = ''
}
// 表格数据
const tableData = ref([])
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

onMounted(() => {
  transferReviewList()
})
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
