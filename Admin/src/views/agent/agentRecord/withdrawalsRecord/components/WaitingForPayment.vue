<!-- 提现记录待出款 -->
<template>
  <div class="app-container">
    <!-- 筛选栏 -->
    <el-form :model="queryParams" :inline="true" label-width="80px">
      <el-row>
        <el-form-item :label="$t('agent.withdrawalTimeOne')">
          <el-date-picker
            v-model="withdrawalTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('agent.startTime')"
            :end-placeholder="$t('agent.endTime')"
            :default-time="defaultTime"
            :shortcuts="shortcuts"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('agent.withdrawalTime')">
          <el-date-picker
            v-model="cashOutTime"
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
      </el-row>
      <!-- <el-form-item :label="$t('agent.financialHierarchyQuot')">
        <el-select
          style="width: 192px"
          v-model="queryParams.financialLevel"
          multiple
          filterable
          collapse-tags
          allow-create
          default-first-option
          :reserve-keyword="false"
        >
          <el-option
            v-for="item in financialLevelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item :label="$t('agent.riskControlLevel')">
        <el-select
          style="width: 192px"
          v-model="queryParams.riskControlLevel"
          multiple
          filterable
          collapse-tags
          allow-create
          default-first-option
          :reserve-keyword="false"
        >
          <el-option
            v-for="item in riskControlLevelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item :label="$t('agent.withdrawalMethod') + ':'">
        <el-select
          v-model="queryParams.wdWayType"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 192px"
        >
          <el-option
            v-for="item in withdrawMethodList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.paymentMethodQuot')">
        <el-select
          v-model="queryParams.paymentMethod"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 192px"
        >
          <el-option
            v-for="item in paymentMethodList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.orderStatusQuote')">
        <el-select
          v-model="orderStatus"
          multiple
          collapse-tags
          default-first-option
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 192px"
        >
          <el-option
            v-for="item in orderStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.payoutMerchant')">
        <el-select
          v-model="queryParams.mchId"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 192px"
        >
          <el-option
            v-for="item in payoutMerchantList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.agentAccount') + ' :'">
        <el-input v-model="queryParams.agentName" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.orderNo')">
        <el-input v-model="queryParams.orderNo" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.reviewer')">
        <el-input v-model="queryParams.operApprover" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="toQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="reset">{{ $t('agent.reset') }}</el-button>
        <el-button type="warning" @click="exportData" icon="Download">{{
          $t('agent.export')
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 操作 -->
      <el-table-column prop="date" :label="$t('agent.handle')" width="230" align="center">
        <template #default="scope">
          <div class="danger">
            <el-button
              :disabled="scope.row.status != 3"
              type="danger"
              @click="toShowDialog({ type: 1, data: scope.row })"
              >{{ $t('agent.refuseToWithdrawMoney') }}</el-button
            >
            <el-button
              :disabled="scope.row.status != 3 && scope.row.status != 5"
              type="primary"
              @click="toShowDialog({ type: 2, data: scope.row })"
              >{{ $t('agent.forceSuccess') }}</el-button
            >
            <el-button
              :disabled="scope.row.status != 3"
              type="primary"
              @click="toShowDialog({ type: 3, data: scope.row })"
              >{{ $t('agent.threePartyPayment') }}</el-button
            >
            <el-button
              :disabled="scope.row.status != 3"
              type="primary"
              @click="toShowDialog({ type: 4, data: scope.row })"
              >{{ $t('agent.manualWithdrawal') }}</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 订单号 -->
      <el-table-column prop="orderNo" :label="$t('agent.orderNoNoQuote')" width="180" />
      <!-- 代理信息 -->
      <el-table-column prop="name" :label="$t('agent.agentInformation')" width="220">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.agentAccount') }}：{{ row.agentName }}</p>
            <p class="margin">{{ $t('agent.agentLevel') }}：{{ row.agentLevel + 1 }}</p>
            <p class="margin">
              {{ $t('agent.parentAccount') }}：{{ row.superiorAgentName || '--' }}
            </p>
          </div>
        </template>
      </el-table-column>
      <!-- 提现金额 -->
      <el-table-column prop="name" :label="$t('agent.withdrawalAmountQuot')" width="180" sortable>
        <!-- 提现金额 -->
        <template #default="{ row }">
          <div style="margin: 0; padding: 0" v-if="row.wdWayType == 0">
            <p class="margin">{{ $t('agent.withdrawalAmountQuot') }}：{{ row.amount }}</p>
          </div>
          <div style="margin: 0; padding: 0" v-else>
            <p class="margin">{{ $t('agent.exchangeRate') }}{{ row.rate }}</p>
            <p class="margin">{{ $t('agent.withdrawalAmount') }}{{ row.amount }}</p>
            <p class="margin">{{ $t('agent.usdtQuantity') }}{{ row.usdtNum }}</p>
          </div>
        </template>
      </el-table-column>
      <!-- 到账金额 -->
      <el-table-column :label="$t('agent.amountReceivedQuot')" width="180">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0" v-if="row.wdWayType == 0">
            <p class="margin">{{ $t('agent.amountReceived') }}{{ row.actualAmt }}</p>
          </div>
          <div style="margin: 0; padding: 0" v-else>
            <p class="margin">{{ $t('agent.amountReceived') }}{{ row.actualAmt }}</p>
            <p class="margin">{{ $t('agent.usdtQuantity') }}{{ row.actualUsdtNum }}</p>
          </div>
        </template>
      </el-table-column>
      <!-- 提现信息 -->
      <el-table-column prop="name" :label="$t('agent.withdrawalInformation')" width="240">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0" v-if="row.wdWayType == 0">
            <p class="margin">
              {{ $t('agent.withdrawalMethod') }}：{{ $t('agent.bankCardCashWithdrawal') }}
            </p>
            <p class="margin">
              {{ $t('agent.paymentMethodQuot') }}{{ paymentMethodMap[row.paymentMethod] }}
            </p>
            <p class="margin">{{ $t('agent.payoutMerchant') }}{{ row.mchName || '-' }}</p>
          </div>
          <div style="margin: 0; padding: 0" v-else>
            <p class="margin">{{ $t('agent.withdrawalMethod') }}：{{ $t('agent.usdtWithdraw') }}</p>
            <p class="margin">
              {{ $t('agent.paymentMethodQuot') }}{{ paymentMethodMap[row.paymentMethod] }}
            </p>
            <p class="margin">{{ $t('agent.payoutMerchant') }}{{ row.mchName || '-' }}</p>
          </div>
        </template>
      </el-table-column>
      <!-- 订单状态 -->
      <el-table-column prop="status" :label="$t('agent.orderStatus')" width="180">
        <template #default="scope">
          <!-- <el-tag v-if="scope.row.status == 2" type="danger">{{
            $t("agent.riskControlReviewRejected")
          }}</el-tag> -->
          <el-tag v-if="scope.row.status == 3" type="warning">{{
            $t('agent.riskControlReviewPassed')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 4" type="success">{{
            $t('agent.withdrawalSuccessful')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 5" type="success">{{
            $t('agent.threePartyWithdrawal')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 6" type="warning">{{
            $t('agent.threePartyWithdrawalFailed')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 7" type="danger">{{
            $t('agent.refuseToWithdrawMoney')
          }}</el-tag>
          <el-tag v-if="scope.row.status == 8" type="danger">{{ $t('agent.forceSuccess') }}</el-tag>
        </template>
      </el-table-column>
      <!-- 收款信息 -->
      <el-table-column prop="name" :label="$t('agent.billingMessage')" width="220">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0" v-if="row.wdWayType == 0">
            <p class="margin">{{ $t('agent.bankName') }}{{ row.payeeBankName }}</p>
            <p class="margin">{{ $t('agent.bankCardNumber') }}{{ row.payeeCardNo }}</p>
            <p class="margin">{{ $t('agent.payee') }}{{ row.payeeName }}</p>
          </div>
          <div style="margin: 0; padding: 0" v-else>
            <p class="margin">
              {{ $t('agent.vcProtoco') }}：{{ tradeProtocolMap[row.tradeProtocol] }}
            </p>
            <p class="margin">{{ $t('agent.getMonetAddress') }}：{{ row.tradeAddr }}</p>
          </div>
        </template>
      </el-table-column>
      <!-- 时间 -->
      <el-table-column prop="address" :label="$t('agent.time')" width="240">
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.withdrawalTimeOne') }}{{ row.createTime }}</p>
            <p class="margin">{{ $t('agent.withdrawalTime') }}{{ row.paymentTime || '--' }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('agent.riskControlReview')" width="240" sortable>
        <template #default="{ row }">
          <div style="margin: 0; padding: 0">
            <p class="margin">{{ $t('agent.reviewer') }} {{ row.riskApprover }}</p>
            <p class="margin">{{ $t('agent.reviewTime') }}{{ row.riskApprovalTime }}</p>
            <p class="margin">{{ $t('agent.reviewRemark') }}{{ row.riskApprovalMark }}</p>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getData"
      style="height: 40px"
    />

    <el-dialog v-model="isShowDialog" :center="true">
      <!-- 拒绝或强制成功 -->
      <RefuseOrForceSuccess
        v-if="(dialogType == 1 || dialogType == 2) && isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @toCloseDialog="toCloseDialog"
      />

      <!-- 人工出款或三方出款 -->
      <ManualWithdraw
        v-if="(dialogType == 3 || dialogType == 4) && isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :payoutMerchantList="payoutMerchantList"
        @toCloseDialog="toCloseDialog"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import {
  getWithdrawRecordApi,
  getThreeMchListApi,
  exportWithdrawRecordAPI
} from '@/api/agent/agentRecord/agentRecord.js'
import RefuseOrForceSuccess from './DialogContent/RefuseOrForceSuccess.vue'
import ManualWithdraw from './DialogContent/ManualWithdraw.vue'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
onMounted(() => {
  getData()
  getThreeMchListApi().then((res) => {
    let tempArr = res
    if (Array.isArray(tempArr)) {
      tempArr.forEach((item) => {
        payoutMerchantList.value.push({
          value: item.mchId.toString(),
          label: item.mchName
        })
      })
    }
  })
})
const total = ref(0)
const getData = () => {
  getWithdrawRecordApi(queryParams.value).then((res) => {
    tableData.value = res.rows
    // tableData.value.sort((a, b) => {
    //   const orderA =
    //     statusWeight.value[a.status] !== undefined
    //       ? statusWeight.value[a.status]
    //       : Infinity;
    //   const orderB =
    //     statusWeight.value[b.status] !== undefined
    //       ? statusWeight.value[b.status]
    //       : Infinity;
    //   return orderA - orderB;
    // });
    total.value = res.total
  })
}

// 导出功能
const exportData = () => {
  console.log(queryParams.value)
  proxy.download(
    '/system/agent/withdrawalRecord/export',
    queryParams.value,
    `${i18n.global.t('funds.withdrawalRecord')}.xlsx`
  )
}

const orderStatus = ref([])
const withdrawalTime = ref([]) //提现时间
const cashOutTime = ref([]) //出款时间
const reviewTime = ref([]) //审核时间

const formatTime = (arr, obj, startKey, endKey) => {
  if (!arr || arr.length == 0) {
    obj[startKey] = ''
    obj[endKey] = ''
  } else {
    obj[startKey] = arr[0]
    obj[endKey] = arr[1]
  }
}
// 查询功能
const toQuery = () => {
  if (orderStatus.value.length > 0) {
    queryParams.value.statusList = orderStatus.value
  }
  formatTime(withdrawalTime.value, queryParams.value, 'createStartTime', 'createEndTime')
  formatTime(cashOutTime.value, queryParams.value, 'paymentStartTime', 'paymentEndTime')
  formatTime(reviewTime.value, queryParams.value, 'riskApprovalStartTime', 'riskApprovalEndTime')
  getData()
}
// 重置功能
const reset = () => {
  withdrawalTime.value = null
  cashOutTime.value = null
  reviewTime.value = null
  orderStatus.value = []
  queryParams.value = {
    agentName: '',
    createEndTime: '',
    createStartTime: '',
    mchId: '',
    operApprover: '',
    orderNo: '',
    pageNum: 1,
    pageSize: 10,
    paymentEndTime: '',
    paymentMethod: '',
    paymentStartTime: '',
    riskApprovalEndTime: '',
    riskApprovalStartTime: '',
    searchFlag: 0,
    statusList: [3, 4, 5, 6, 7, 8],
    wdWayType: ''
  }
}
const queryParams = ref({
  agentName: '',
  createEndTime: '',
  createStartTime: '',
  mchId: '',
  operApprover: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  paymentEndTime: '',
  paymentMethod: '',
  paymentStartTime: '',
  riskApprovalEndTime: '',
  riskApprovalStartTime: '',
  searchFlag: 0,
  statusList: [3, 4, 5, 6, 7, 8],
  wdWayType: ''
})
const tableData = ref([])

// 弹窗控制
// 1：拒绝出款 2：强制成功 3：第三方出款 4：人工出款
const dialogType = ref()
const dialogData = ref()
const isShowDialog = ref(false)
const toShowDialog = ({ type, data }) => {
  dialogType.value = type
  dialogData.value = data
  console.log(dialogData.value)
  isShowDialog.value = true
}
// 弹窗关闭，并判断是否需要重新拉取数据
const toCloseDialog = (boolean) => {
  isShowDialog.value = false
  if (boolean) {
    getData()
  }
}

const withdrawMethodList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.bankCardCashWithdrawal')
  },
  {
    value: 1,
    label: i18n.global.t('agent.withdrawUsdt')
  }
])
const paymentMethodList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.threePartyAutomaticWithdrawal')
  },
  {
    value: 1,
    label: i18n.global.t('agent.threePartyManualWithdrawal')
  },
  {
    value: 2,
    label: i18n.global.t('agent.manualWithdrawal')
  }
])
const orderStatusList = ref([
  // {
  //   value: 0,
  //   label: i18n.global.t("agent.riskControlPendingReview"),
  // },
  // {
  //   value: 1,
  //   label: i18n.global.t("agent.riskControlOnHold"),
  // },
  // {
  //   value: 2,
  //   label: i18n.global.t("agent.riskControlReviewRejected"),
  // },
  {
    value: 3,
    label: i18n.global.t('agent.riskControlReviewPassed')
  },
  {
    value: 4,
    label: i18n.global.t('agent.withdrawalSuccessful')
  },
  {
    value: 5,
    label: i18n.global.t('agent.threePartyWithdrawal')
  },
  {
    value: 6,
    label: i18n.global.t('agent.threePartyWithdrawalFailed')
  },
  {
    value: 7,
    label: i18n.global.t('agent.refuseToWithdrawMoney')
  },
  {
    value: 8,
    label: i18n.global.t('agent.forceSuccess')
  }
])
const payoutMerchantList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  }
])

const paymentMethodMap = {
  0: i18n.global.t('agent.threePartyAutomaticWithdrawal'),
  1: i18n.global.t('agent.threePartyManualWithdrawal'),
  2: i18n.global.t('agent.manualWithdrawal')
}

const tradeProtocolMap = {
  1: 'trc20',
  2: 'rec20'
}

// 定义排序权重
const statusWeight = {
  3: 0,
  5: 1,
  6: 2
}
</script>

<style lang="scss" scoped>
.danger {
  display: flex;
  flex-flow: wrap;
  gap: 5px;

  :deep() {
    .el-button + .el-button {
      margin-left: 0px;
    }
  }
}

.margin {
  margin: 5px;
  padding: 0;
  line-height: 1;
}

:deep() {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
