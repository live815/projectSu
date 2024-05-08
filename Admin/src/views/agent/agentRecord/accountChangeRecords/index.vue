<!-- 账变记录 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.accountChangeTime')" prop="">
        <el-date-picker
          v-model="accountChangeTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('agent.agentAccount') + ':'" prop="agentName">
        <el-input v-model="queryParams.agentName" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.associatedOrderNumber')" prop="orderNo">
        <el-input v-model="queryParams.orderNo" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.businessType')" prop="businessType">
        <el-select
          v-model="queryParams.businessType"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
        >
          <el-option
            v-for="item in businessTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.accountChangeType')" prop="recordType">
        <el-select
          v-model="queryParams.recordType"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
        >
          <el-option
            v-for="item in AccountChangeTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.accountChangeAmount')" prop="">
        <el-input
          v-model="queryParams.recordMoneyStart"
          :placeholder="$t('agent.pleaseInput')"
          @input="handleInput('recordMoneyStart')"
          clearable
          style="width: 80px"
        >
        </el-input>
        <span> &nbsp;-&nbsp; </span>
        <el-input
          v-model="queryParams.recordMoneyEnd"
          :placeholder="$t('agent.pleaseInput')"
          @input="handleInput('recordMoneyEnd')"
          clearable
          style="width: 80px"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t('agent.search')
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('agent.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderNo" :label="$t('agent.associatedOrderNumberQuot')" width="200" />
      <el-table-column prop="agentName" :label="$t('agent.agentAccount')" width="180" />
      <el-table-column prop="walletType" :label="$t('agent.walletType')" width="180">
        <template #default="{ row }">
          <span v-if="row.walletType == 0">{{ $t('agent.quotaWallet') }}</span>
          <span v-if="row.walletType == 1">{{ $t('agent.creditWallet') }}</span>
          <span v-if="row.walletType == 2">{{ $t('agent.companyWinLose') }}</span>
          <span v-if="row.walletType == 3">{{ $t('agent.withdrawLimit') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="businessType" :label="$t('agent.businessTypeQuot')" width="180">
        <template #default="{ row }">
          <span v-if="row.businessType == 1">{{ $t('agent.agentWithdrawal') }}</span>
          <span v-if="row.businessType == 2">{{ $t('agent.agencyCommission') }}</span>
          <span v-if="row.businessType == 3">{{ $t('agent.agentTransfer') }}</span>
          <span v-if="row.businessType == 4">{{ $t('agent.creditLimitDeposit') }}</span>
          <span v-if="row.businessType == 5">{{ $t('agent.creditDeposit') }}</span>
          <span v-if="row.businessType == 6">{{ $t('agent.creditLimitAdjustment') }}</span>
          <span v-if="row.businessType == 7">{{ $t('agent.fundingAdjustment') }}</span>
          <span v-if="row.businessType == 8">{{ $t('agent.companyWinLossAdjustment') }}</span>
          <span v-if="row.businessType == 9">{{ $t('agent.agencyQuotaAdjustment') }}</span>
          <span v-if="row.businessType == 10">提款额度调整</span>
        </template>
      </el-table-column>
      <el-table-column prop="recordType" :label="$t('agent.accountChangeTypeQuot')" width="180">
        <template #default="{ row }">
          <span v-if="row.recordType == 101">{{ $t('agent.agentWithdrawal') }}</span>
          <span v-if="row.recordType == 102">{{ $t('agent.withdrawalFailedAndReturned') }}</span>
          <span v-if="row.recordType == 201">{{ $t('agent.commissionIssuance') }}</span>
          <span v-if="row.recordType == 202">{{ $t('agent.commissionManualReduction') }}</span>
          <span v-if="row.recordType == 203">{{ $t('agent.manualAdditionOfCommission') }}</span>
          <span v-if="row.recordType == 301">{{ $t('agent.agentTransferOut') }}</span>
          <span v-if="row.recordType == 302">{{ $t('agent.agentTransferTransfer') }}</span>
          <span v-if="row.recordType == 401">{{ $t('agent.creditLimitDepositReduction') }}</span>
          <span v-if="row.recordType == 402">{{ $t('agent.creditLimitRecharge') }}</span>
          <span v-if="row.recordType == 501">{{ $t('agent.creditDepositReduction') }}</span>
          <span v-if="row.recordType == 502">{{ $t('agent.creditDepositTopup') }}</span>
          <span v-if="row.recordType == 601">{{ $t('agent.creditLimitReduction') }}</span>
          <span v-if="row.recordType == 602">{{ $t('agent.creditLineTopup') }}</span>
          <span v-if="row.recordType == 701">{{ $t('agent.otherAdjustmentDeductions') }}</span>
          <span v-if="row.recordType == 702">{{ $t('agent.otherAdjustmentsAndTopups') }}</span>
          <span v-if="row.recordType == 801">{{
            $t('agent.companyWinAndLossAdjustmentDeductions')
          }}</span>
          <span v-if="row.recordType == 802">{{
            $t('agent.companyWinLossAdjustmentPlusAmount')
          }}</span>
          <span v-if="row.recordType == 901">{{ $t('agent.gamePoints') }}</span>
          <span v-if="row.recordType == 902">{{ $t('agent.rechargeAndRebate') }}</span>
          <span v-if="row.recordType == 903">{{ $t('agent.virtualCreditLimitTopUp') }}</span>
          <span v-if="row.recordType == 904">{{ $t('agent.wrongDepositAddedBack') }}</span>
          <span v-if="row.recordType == 905">{{ $t('agent.activityBonusIncludedInBonus') }}</span>
          <span v-if="row.recordType == 906">{{ $t('agent.redEnvelopeIncludedInBonus') }}</span>
          <span v-if="row.recordType == 907">{{ $t('agent.systemRebate') }}</span>
          <span v-if="row.recordType == 908">{{ $t('agent.memberRechargeAndRebate') }}</span>
          <span v-if="row.recordType == 909">{{ $t('agent.rebateReduction') }}</span>
          <span v-if="row.recordType == 910">{{ $t('agent.virtualCreditLimitReduction') }}</span>
          <span v-if="row.recordType == 1001">提款额度减额</span>
          <span v-if="row.recordType == 1002">提款额度加额</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="transactionType"
        :label="$t('agent.incomeAndExpenditureType')"
        width="180"
      >
        <template #default="{ row }">
          <span v-if="row.transactionType == 0">{{ $t('agent.income') }}</span>
          <span v-if="row.transactionType == 1">{{ $t('agent.expenditure') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="recordMoneyBefore"
        :label="$t('agent.balanceBeforeAccountChange')"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.recordMoneyBefore.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recordMoney" :label="$t('agent.accountChangeAmountQuot')" width="180">
        <template #default="{ row }">
          <span>{{ row.recordMoney.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="recordMoneyAfter"
        :label="$t('agent.balanceAfterAccountChange')"
        width="180"
      >
        <template #default="{ row }">
          <span>{{ row.recordMoneyAfter.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recordTime" :label="$t('agent.accountChangeTimeQuot')" width="180" />
      <el-table-column prop="remark" :label="$t('agent.remarkQuote')" width="200" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { queryAccountChangeRecordsApi } from '@/api/agent/agentRecord/agentRecord.js'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const queryParams = ref({
  agentName: '',
  businessType: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  recordMoneyEnd: '',
  recordMoneyStart: '',
  recordTimeEnd: '',
  recordTimeStart: '',
  recordType: '',
  walletType: ''
})
const total = ref(0)
const loading = ref(false)
const accountChangeTime = ref([]) //账变时间

// 输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}

const businessTypeList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 1,
    label: i18n.global.t('agent.agentWithdrawal')
  },
  {
    value: 2,
    label: i18n.global.t('agent.agencyCommission')
  },
  {
    value: 3,
    label: i18n.global.t('agent.agentTransfer')
  },
  {
    value: 4,
    label: i18n.global.t('agent.creditLimitDeposit')
  },
  {
    value: 5,
    label: i18n.global.t('agent.creditDeposit')
  },
  {
    value: 6,
    label: i18n.global.t('agent.creditLimitAdjustment')
  },
  {
    value: 7,
    label: i18n.global.t('agent.fundingAdjustment')
  },
  {
    value: 8,
    label: i18n.global.t('agent.companyWinLossAdjustment')
  },
  {
    value: 9,
    label: i18n.global.t('agent.agencyQuotaAdjustment')
  }
])
const AccountChangeTypeList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 101,
    label: i18n.global.t('agent.agentWithdrawal')
  },
  {
    value: 102,
    label: i18n.global.t('agent.withdrawalFailedAndReturned')
  },
  {
    value: 201,
    label: i18n.global.t('agent.commissionIssuance')
  },
  {
    value: 202,
    label: i18n.global.t('agent.commissionManualReduction')
  },
  {
    value: 203,
    label: i18n.global.t('agent.manualAdditionOfCommission')
  },
  {
    value: 301,
    label: i18n.global.t('agent.agentTransferOut')
  },
  {
    value: 302,
    label: i18n.global.t('agent.agentTransferTransfer')
  },
  {
    value: 401,
    label: i18n.global.t('agent.creditLimitDepositReduction')
  },
  {
    value: 402,
    label: i18n.global.t('agent.creditLimitRecharge')
  },
  {
    value: 501,
    label: i18n.global.t('agent.creditDepositReduction')
  },
  {
    value: 502,
    label: i18n.global.t('agent.creditDepositTopup')
  },
  {
    value: 601,
    label: i18n.global.t('agent.creditLimitReduction')
  },
  {
    value: 602,
    label: i18n.global.t('agent.creditLineTopup')
  },
  {
    value: 701,
    label: i18n.global.t('agent.otherAdjustmentDeductions')
  },
  {
    value: 702,
    label: i18n.global.t('agent.otherAdjustmentsAndTopups')
  },
  {
    value: 801,
    label: i18n.global.t('agent.companyWinAndLossAdjustmentDeductions')
  },
  {
    value: 802,
    label: i18n.global.t('agent.companyWinLossAdjustmentPlusAmount')
  },
  {
    value: 901,
    label: i18n.global.t('agent.gamePoints')
  },
  {
    value: 902,
    label: i18n.global.t('agent.rechargeAndRebate')
  },
  {
    value: 903,
    label: i18n.global.t('agent.virtualCreditLimitTopUp')
  },
  {
    value: 904,
    label: i18n.global.t('agent.wrongDepositAddedBack')
  },
  {
    value: 905,
    label: i18n.global.t('agent.activityBonusIncludedInBonus')
  },
  {
    value: 906,
    label: i18n.global.t('agent.redEnvelopeIncludedInBonus')
  },
  {
    value: 907,
    label: i18n.global.t('agent.systemRebate')
  },
  {
    value: 908,
    label: i18n.global.t('agent.memberRechargeAndRebate')
  },
  {
    value: 909,
    label: i18n.global.t('agent.rebateReduction')
  },
  {
    value: 910,
    label: i18n.global.t('agent.virtualCreditLimitReduction')
  },
  {
    value: 1001,
    label: '提款额度减额'
  },
  {
    value: 1002,
    label: '提款额度加额'
  }
])

//{{$t('agent.search')}}
function handleQuery() {
  if (accountChangeTime.value) {
    queryParams.value.recordTimeStart = accountChangeTime.value[0]
    queryParams.value.recordTimeEnd = accountChangeTime.value[1]
  } else {
    queryParams.value.recordTimeStart = null
    queryParams.value.recordTimeEnd = null
  }
  let start = queryParams.value.recordMoneyStart
  let end = queryParams.value.recordMoneyEnd

  if (!start && !end) {
    queryParams.value.pageNum = 1
    checkCommissionRecordsList()
  } else if (!start || !end || start * 1 > end * 1) {
    proxy.$modal.msgWarning(i18n.global.t('agent.amountInputTip1'))
    return
  } else {
    queryParams.value.pageNum = 1
    checkCommissionRecordsList()
  }
}
// {{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.recordType = ''
  queryParams.value.agentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.businessType = ''
  queryParams.value.recordMoneyStart = ''
  queryParams.value.recordMoneyEnd = ''
  queryParams.value.recordTimeStart = ''
  queryParams.value.recordTimeEnd = ''
  accountChangeTime.value = ''
  checkCommissionRecordsList()
}
// 列表
const tableData = ref([])
const checkCommissionRecordsList = async () => {
  try {
    let res = await queryAccountChangeRecordsApi(queryParams.value)
    tableData.value = res.rows
    if (Array.isArray(tableData.value)) {
      tableData.value.forEach((item) => {
        item.id = BigInt(item.id).toString()
      })
    }

    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 分页
function getList() {
  loading.value = true
  queryAccountChangeRecordsApi(queryParams.value)
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
  checkCommissionRecordsList()
})
</script>

<style lang="scss" scoped></style>
