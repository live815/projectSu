<!-- 代理信息调整{{$t('agent.review')}} 已{{$t('agent.review')}} -->
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
      <el-form-item :label="$t('agent.agentAccountQuote')">
        <el-input
          v-model="queryParams.agentName"
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
      <el-form-item :label="$t('agent.adjustContent')">
        <el-select
          v-model="queryParams.adjustContentType"
          class="m-2"
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 140px"
        >
          <el-option
            v-for="item in adjustContentList"
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
    <el-table :data="agentAdjustmentList" style="width: 100%" :empty-text="$t('member.noData')">
      <el-table-column property="orderNo" :label="$t('agent.orderNoNoQuote')" width="220" />
      <el-table-column property="agentName" :label="$t('agent.agentAccount')" width="180" />
      <el-table-column
        property="adjustContentType"
        :label="$t('agent.adjustContentNoQuote')"
        width="180"
      >
        <template #default="{ row }">
          <span v-if="row.adjustContentType == 0">{{ $t('agent.accountStatusQuot') }}</span>
          <span v-if="row.adjustContentType == 1">{{ $t('agent.agentModelNoQuote') }}</span>
          <span v-if="row.adjustContentType == 2">{{ $t('agent.commisionPlanQuot') }}</span>
          <span v-if="row.adjustContentType == 3">{{ $t('agent.developer') }}</span>
          <span v-if="row.adjustContentType == 4">{{ $t('agent.maintainer') }}</span>
          <span v-if="row.adjustContentType == 5">{{ $t('agent.creditWalletStatus') }}</span>
          <span v-if="row.adjustContentType == 6">{{ $t('agent.name') }}</span>
          <span v-if="row.adjustContentType == 7">{{ $t('agent.gender') }}</span>
          <span v-if="row.adjustContentType == 8">{{ $t('agent.birthdayQuot') }}</span>
          <span v-if="row.adjustContentType == 9">{{ $t('agent.phoneNumberQuot') }}</span>
          <span v-if="row.adjustContentType == 10">{{ $t('agent.emailNoqute') }}</span>
          <span v-if="row.adjustContentType == 11">{{ $t('agent.wechatQuot') }}</span>
          <span v-if="row.adjustContentType == 12">{{ $t('agent.qqQuot') }}</span>
          <span v-if="row.adjustContentType == 13">{{ $t('agent.agentTypeNoQuote') }}</span>
        </template>
      </el-table-column>
      <el-table-column property="adjustBefore" :label="$t('agent.adjustBefore')" width="180">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            v-if="scope.row.adjustContentType == 1"
            @click="beforeFixing(scope.row)"
            >{{ $t('agent.checkDetail') }}</el-button
          >
          <span v-else>{{ scope.row.adjustBefore }}</span>
        </template>
      </el-table-column>
      <el-table-column property="adjustAfter" :label="$t('agent.adjustAfter')" width="180">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            v-if="scope.row.adjustContentType == 1"
            @click="checkTheDetails(scope.row)"
            >{{ $t('agent.checkDetail') }}</el-button
          >
          <span v-else>{{ scope.row.adjustAfter }}</span>
        </template>
      </el-table-column>
      <el-table-column property="status" :label="$t('agent.orderStatus')" width="230">
        <template #default="{ row }">
          <el-tag v-if="row.status == 1" type="danger">{{ $t('agent.reviewRefuse') }}</el-tag>
          <el-tag v-if="row.status == 2" type="success">{{ $t('agent.reviewPass') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="" :label="$t('agent.applyInformation')" width="330">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.applier') }}{{ row.applicant }}</p>
            <p class="margin">{{ $t('agent.applyTime') }}{{ row.applicantTime }}</p>
            <p class="margin">{{ $t('agent.applyRemark') }}{{ row.applicantMark }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="" :label="$t('agent.reviewInformation')" width="330">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.reviewer') }}{{ row.review }}</p>
            <p class="margin">{{ $t('agent.reviewTime') }}{{ row.reviewTime }}</p>
            <p class="margin">{{ $t('agent.reviewRemark') }}{{ row.reviewMark }}</p>
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

    <!-- 调整前 -->
    <el-dialog
      v-model="isShowBeforeFixing"
      :title="$t('agent.adjustBeforeAgent')"
      width="600px"
      :center="true"
    >
      <BeforeFixing v-if="isShowBeforeFixing" :rowItem="rowItem"></BeforeFixing>
    </el-dialog>
    <!-- 调整后 -->
    <el-dialog
      v-model="isShowAdjusted"
      :title="$t('agent.adjustAfterAgent')"
      width="600px"
      :center="true"
    >
      <Adjusted v-if="isShowAdjusted" :rowItem="rowItem"></Adjusted>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import BeforeFixing from './BeforeFixing.vue'
import Adjusted from './Adjusted.vue'
import { getAgentInfoAdjustAuditListApi } from '@/api/agent/adjustment.js'

const queryParams = ref({
  agentName: '',
  applicant: '',
  adjustContentType: '',
  pageNum: 1,
  pageSize: 10
})
const total = ref(5)
const loading = ref(false)

const rowItem = ref({})
//调整前
const isShowBeforeFixing = ref(false)
const beforeFixing = (row) => {
  rowItem.value = row
  isShowBeforeFixing.value = !isShowBeforeFixing.value
}
//调整后
const isShowAdjusted = ref(false)
const checkTheDetails = (row) => {
  rowItem.value = row
  isShowAdjusted.value = !isShowAdjusted.value
}

//调整内容下拉框数据
const adjustContentList = [
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.accountStatusQuot')
  },
  {
    value: 1,
    label: i18n.global.t('agent.agentModelNoQuote')
  },
  {
    value: 2,
    label: i18n.global.t('agent.commisionPlanQuot')
  },
  {
    value: 3,
    label: i18n.global.t('agent.developer')
  },
  {
    value: 4,
    label: i18n.global.t('agent.maintainer')
  },
  {
    value: 5,
    label: i18n.global.t('agent.creditWalletStatus')
  },
  {
    value: 6,
    label: i18n.global.t('agent.name')
  },
  {
    value: 7,
    label: i18n.global.t('agent.gender')
  },
  {
    value: 8,
    label: i18n.global.t('agent.birthdayQuot')
  },
  {
    value: 9,
    label: i18n.global.t('agent.phoneNumberQuot')
  },
  {
    value: 10,
    label: i18n.global.t('agent.emailNoqute')
  },
  {
    value: 11,
    label: i18n.global.t('agent.wechatQuot')
  },
  {
    value: 12,
    label: i18n.global.t('agent.qqQuot')
  },
  {
    value: 13,
    label: i18n.global.t('agent.agentTypeNoQuote')
  }
]
onMounted(() => {
  agentInfoAdjustAuditList()
})
//表格
const agentAdjustmentList = ref([])
const agentInfoAdjustAuditList = async () => {
  try {
    let res = await getAgentInfoAdjustAuditListApi(queryParams.value)
    agentAdjustmentList.value = res.rows
    agentAdjustmentList.value.forEach((item) => {
      item.id = BigInt(item.id).toString()
    })
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 查询列表
const applicationTime = ref([]) //申请时间
function handleQuery() {
  if (applicationTime.value) {
    queryParams.value.applicantStartTime = applicationTime.value[0]
    queryParams.value.applicantEndTime = applicationTime.value[1]
  } else {
    queryParams.value.applicantStartTime = null
    queryParams.value.applicantEndTime = null
  }
  agentInfoAdjustAuditList()
}
// 重置
function resetQuery() {
  queryParams.value.agentName = ''
  queryParams.value.applicant = ''
  queryParams.value.adjustContentType = ''
  queryParams.value.applicantStartTime = ''
  queryParams.value.applicantEndTime = ''
  applicationTime.value = ''
}
// 分页
function getList() {
  loading.value = true
  getAgentInfoAdjustAuditListApi(queryParams.value)
    .then((res) => {
      loading.value = false
      agentAdjustmentList.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}
</style>
