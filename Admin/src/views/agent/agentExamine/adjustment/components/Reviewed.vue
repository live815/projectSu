<!-- 资金调整{{$t('agent.review')}}已{{$t('agent.review')}} -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-row>
        <el-form-item :label="$t('agent.applyTime')"
          ><el-date-picker
            v-model="applicationTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('agent.startTime')"
            :end-placeholder="$t('agent.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts"></el-date-picker
        ></el-form-item>
        <el-form-item :label="$t('agent.agentAccountQuote')"
          ><el-input
            v-model="queryParams.agentName"
            :placeholder="$t('agent.pleaseInput')"
            clearable
            style="width: 180px">
          </el-input
        ></el-form-item>
        <el-form-item :label="$t('agent.adjustType')"
          ><el-select
            v-model="queryParams.adjustType"
            @change="adjustTypeChange"
            class="m-2"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 120px">
            <el-option
              v-for="item in fund_adjust_type"
              :key="item.value"
              :label="item.label"
              :value="item.value" /> </el-select
        ></el-form-item>
        <el-form-item :label="$t('agent.adjustReason')"
          ><el-select
            v-model="queryParams.adjustReason"
            class="m-2"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 120px">
            <el-option
              v-for="item in reasonForAdjustmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
            <el-option
              :label="$t('agent.companyWinLoseAdjust')"
              :value="3"
              v-if="queryParams.adjustType" /> </el-select
        ></el-form-item>
        <el-form-item :label="$t('agent.orderStatusQuote')"
          ><el-select
            v-model="selectStatus"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 120px">
            <el-option
              v-for="item in orderStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value" /> </el-select
        ></el-form-item>
        <el-form-item label="">
          <el-button icon="Search" type="primary" @click="handleQuery">{{
            $t('agent.search')
          }}</el-button>
          <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table :data="reviewDataList" style="width: 100%" :empty-text="$t('member.noData')">
      <el-table-column property="orderNo" :label="$t('agent.orderNoNoQuote')" width="220" />
      <el-table-column property="agentName" :label="$t('agent.agentAccount')" width="180" />
      <el-table-column property="walletType" :label="$t('agent.walletType')" width="180">
        <template #default="{ row }">
          <span v-if="row.walletType == 0">{{ $t('agent.quotaWallet') }} </span>
          <span v-if="row.walletType == 1">{{ $t('agent.creditWallet') }} </span>
          <span v-if="row.walletType == 2">{{ $t('agent.companyWinLose') }}</span>
          <span v-if="row.walletType == 3">{{ $t('agent.withdrawLimit') }} </span>
        </template>
      </el-table-column>
      <el-table-column property="adjustMoney" :label="$t('agent.adjustAmount')" width="180" />
      <el-table-column
        property="adjustType"
        :label="$t('agent.adjustTypeNoQuote')"
        width="180"
        sortable
        ><template #default="{ row }">
          <span v-if="row.adjustType == 0">{{ $t('agent.plusAmount') }} </span>
          <span v-if="row.adjustType == 1">{{ $t('agent.reduceAmount') }} </span>
        </template>
      </el-table-column>
      <el-table-column property="adjustReason" :label="$t('agent.adjustReasonNoQuote')" width="180">
        <template #default="{ row }">
          <span v-if="row.adjustReason == 0">{{ $t('agent.otherAdjust') }}</span>
          <span v-if="row.adjustReason == 1">{{ $t('agent.commission') }}</span>
          <span v-if="row.adjustReason == 2">{{ $t('agent.addCreditLine') }}</span>
          <span v-if="row.adjustReason == 3">{{ $t('agent.companyWinLoseAdjust') }}</span>
          <span v-if="row.adjustReason == 4">{{ $t('agent.commissionCreditReduce') }}</span>
          <span v-if="row.adjustReason == 5">{{ $t('agent.commissionReduce') }}</span>
          <span v-if="row.adjustReason == 6">{{ $t('agent.gamePoints') }}</span>
          <span v-if="row.adjustReason == 7">{{ $t('agent.rechargeAndRebateQuot') }}</span>
          <span v-if="row.adjustReason == 8">{{ $t('agent.virtualQuota') }}</span>
          <span v-if="row.adjustReason == 9">{{ $t('agent.wrongDepositAddedBack') }}</span>
          <span v-if="row.adjustReason == 10">{{ $t('agent.activityBonusIncludedInBonus') }}</span>
          <span v-if="row.adjustReason == 11">{{ $t('agent.redEnvelopeIncludedInBonus') }}</span>
          <span v-if="row.adjustReason == 12">{{ $t('agent.systemRebate') }}</span>
          <span v-if="row.adjustReason == 13">{{ $t('agent.memberRechargeAndRebate') }} </span>
          <span v-if="row.adjustReason == 14">{{ $t('agent.withdrawLimit') }} </span>
        </template>
      </el-table-column>
      <el-table-column property="status" :label="$t('agent.reviewStatus')" width="230">
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
      <el-table-column
        property="applicantTime"
        :label="$t('agent.applyInformation')"
        width="260"
        sortable>
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.applier') }}{{ row.applicant }}</p>
            <p class="margin">{{ $t('agent.applyTime') }}{{ row.applicantTime }}</p>
            <p class="margin">{{ $t('agent.applyRemark') }}{{ row.applicantMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        property="firstReviewTime"
        :label="$t('agent.firstReviewInformation')"
        width="260"
        sortable>
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.firstReviewer') }}{{ row.firstReview }}</p>
            <p class="margin">{{ $t('agent.firstReviewTime') }}{{ row.firstReviewTime }}</p>
            <p class="margin">{{ $t('agent.firstReviewRemark') }}{{ row.firstReviewMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        property="finalReviewTime"
        :label="$t('agent.secondReviewInformation')"
        width="260"
        sortable>
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.secondReviewer') }}{{ row.finalReview }}</p>
            <p class="margin">{{ $t('agent.secondReviewTime') }}{{ row.finalReviewTime }}</p>
            <p class="margin">{{ $t('agent.secondReviewRemark') }}{{ row.finalReviewMark }}</p>
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
      style="height: 40px" />
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { queryFundAdjustmentApi, queryTotalAmountApi } from '@/api/agent/adjustment.js'

const props = defineProps([
  'fund_adjust_type',
  'agent_fund_adjust_add_reason',
  'agent_fund_adjust_sub_reason'
])

const selectStatus = ref('all')
const queryParams = ref({
  adjustReason: '',
  adjustType: '',
  agentName: '',
  applicant: '',
  applicantEndTime: '',
  applicantStartTime: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  statusList: [1, 3, 4]
})

const total = ref(0)
const loading = ref(false)
const applicationTime = ref([]) //申请时间
const reasonForAdjustmentList = ref([]) // 调整下拉原因
//调整类型联动选择，生成不同的调整原因下拉
function adjustTypeChange(val) {
  if (val === '0') {
    reasonForAdjustmentList.value = props.agent_fund_adjust_add_reason
  } else if (val === '1') {
    reasonForAdjustmentList.value = props.agent_fund_adjust_sub_reason
  } else {
    reasonForAdjustmentList.value = []
  }
  queryParams.value.adjustReason = null
}

//表格
const reviewDataList = ref([])
const fundingAdjustmentList = async () => {
  try {
    let res = await queryFundAdjustmentApi(queryParams.value)
    reviewDataList.value = res.records
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 查询列表
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
  fundingAdjustmentList()
}

// 订单状态映射
const orderStatusMap = ref({
  all: [1, 3, 4],
  firstReject: [1],
  secReject: [3],
  thirdPass: [4]
})
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
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.adjustType = ''
  queryParams.value.agentName = ''
  queryParams.value.adjustReason = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  queryParams.value.statusList = [1, 3, 4]
  selectStatus.value = ''
  applicationTime.value = ''
}
// 分页
function getList() {
  loading.value = true
  queryFundAdjustmentApi(queryParams.value)
    .then((res) => {
      loading.value = false
      reviewDataList.value = res.records || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}
onMounted(() => {
  fundingAdjustmentList() //初始化加载数据
})
</script>

<style lang="scss" scoped>
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
