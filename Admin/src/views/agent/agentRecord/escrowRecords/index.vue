<!-- 代存记录 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.storageTime')" prop="">
        <el-date-picker
          v-model="accountChangeTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('agent.startTime')"
          :end-placeholder="$t('agent.endTime')"
          :default-time="defaultTime"
          :shortcuts="shortcuts"></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('agent.walletTypeQuot')" prop="walletType">
        <el-select
          v-model="queryParams.walletType"
          clearable
          :placeholder="$t('agent.pleaseSelect')">
          <el-option
            v-for="item in walletTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.agentAccountQuote')" prop="agentName">
        <el-input v-model="queryParams.agentName" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.orderNo')" prop="orderNo">
        <el-input v-model="queryParams.orderNo" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="'代存类型 :'" prop="depositType">
        <el-select
          v-model="queryParams.depositType"
          clearable
          :placeholder="$t('agent.pleaseSelect')">
          <el-option
            v-for="item in depositTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.subordinateAccount')" prop="subAgentName">
        <el-input v-model="queryParams.subAgentName" :placeholder="$t('agent.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="$t('agent.depositAmount')" prop="depositMoney">
        <el-input
          v-model="queryParams.depositMoneyStart"
          :placeholder="$t('agent.pleaseInput')"
          maxlength="6"
          @input="handleInput('depositMoneyStart')"
          style="width: 80px">
        </el-input>
        <span> &nbsp;-&nbsp; </span>
        <el-input
          v-model="queryParams.depositMoneyEnd"
          maxlength="6"
          @input="handleInput('depositMoneyEnd')"
          :placeholder="$t('agent.pleaseInput')"
          style="width: 80px">
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
      <el-table-column prop="orderNo" :label="$t('agent.orderNoNoQuote')" width="180" />
      <el-table-column prop="agentName" :label="$t('agent.agentAccount')" width="180" />
      <el-table-column prop="agentLevel" :label="$t('agent.agentLevel')" width="180">
        <template #default="{ row }">
          <span>{{ row.agentLevel + 1 }}{{ $t('agent.level') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creditWalletType" :label="$t('agent.walletType')" width="180">
        <template #default="{ row }">
          <span v-if="row.creditWalletType == 1">{{ $t('agent.quotaWallet') }}</span>
          <span v-if="row.creditWalletType == 2">{{ $t('agent.creditWallet') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="subAgentName"
        :label="$t('agent.subordinateAccountQuot')"
        width="180" />
      <el-table-column prop="accountType" :label="$t('agent.accountType')" width="180">
        <template #default="{ row }">
          <span v-if="row.accountType == 0">{{ $t('agent.member') }}</span>
          <span v-if="row.accountType == 1">{{ $t('agent.acting') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="depositType" :label="$t('agent.surrogateType')" width="180">
        <template #default="{ row }">
          <span v-if="row.depositType == 0">{{ $t('agent.depositAndRecharge') }}</span>
          <span v-if="row.depositType == 1">{{ $t('agent.depositoryDividend') }}</span>
          <span v-if="row.depositType == 2">{{ $t('agent.commissionIssuance') }}</span>
          <span v-if="row.depositType == 3">{{ $t('agent.transfer') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="depositMoney" :label="$t('agent.depositAmountQuot')" width="180">
        <template #default="{ row }">
          {{ row.depositMoney.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="depositTime" :label="$t('agent.storageTimeQuot')" width="180" />
      <el-table-column prop="mark" :label="$t('agent.remarkQuote')" width="180">
        <template #default="{ row }">
          <span>{{ row.mark || '-' }}</span>
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
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { queryDepositRecordApi } from '@/api/agent/agentRecord/agentRecord.js'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const queryParams = ref({
  agentName: '',
  depositType: '',
  depositMoneyEnd: '',
  depositMoneyStart: '',
  depositTimeEnd: '',
  depositTimeStart: '',
  orderNo: '',
  pageNum: 1,
  pageSize: 10,
  subAgentName: '',
  walletType: ''
})
const total = ref(0)
const loading = ref(false)
const accountChangeTime = ref([]) //代存时间
const walletTypeList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 1,
    label: i18n.global.t('agent.quotaWallet')
  },
  {
    value: 2,
    label: i18n.global.t('agent.creditWallet')
  }
])
const depositTypeList = ref([
  {
    value: '',
    label: i18n.global.t('agent.all')
  },
  {
    value: 0,
    label: i18n.global.t('agent.depositAndRecharge')
  },
  {
    value: 1,
    label: i18n.global.t('agent.depositoryDividend')
  },
  {
    value: 2,
    label: i18n.global.t('agent.commissionIssuance')
  },
  {
    value: 3,
    label: i18n.global.t('agent.transfer')
  }
])
// 拼音输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}

//{{$t('agent.search')}}
function handleQuery() {
  console.log()
  if (accountChangeTime.value) {
    queryParams.value.depositTimeStart = accountChangeTime.value[0]
    queryParams.value.depositTimeEnd = accountChangeTime.value[1]
  } else {
    queryParams.value.depositTimeStart = null
    queryParams.value.depositTimeEnd = null
  }
  // 获取存款金额范围
  const depositMoneyStart = queryParams.value.depositMoneyStart * 1
  const depositMoneyEnd = queryParams.value.depositMoneyEnd * 1

  // 对比金额范围
  if (!depositMoneyEnd && !depositMoneyStart) {
    queryParams.value.pageNum = 1
    queryDepositRecordList()
  } else if (!depositMoneyEnd || !depositMoneyStart || depositMoneyEnd < depositMoneyStart) {
    proxy.$modal.msgError(i18n.global.t('agent.noBiggerThenStart'))
    return
  } else {
    queryParams.value.pageNum = 1
    queryDepositRecordList()
  }
}

// {{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.walletType = ''
  queryParams.value.agentName = ''
  queryParams.value.orderNo = ''
  queryParams.value.subAgentName = ''
  queryParams.value.depositMoneyStart = ''
  queryParams.value.depositMoneyEnd = ''
  queryParams.value.depositTimeStart = ''
  queryParams.value.depositTimeEnd = ''
  queryParams.value.depositType = ''
  accountChangeTime.value = ''
}
// 列表
const tableData = ref([])
const queryDepositRecordList = async () => {
  try {
    let res = await queryDepositRecordApi(queryParams.value)
    tableData.value = res.rows
    tableData.value.forEach((item) => {
      item.id = BigInt(item.id).toString()
    })
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 分页
function getList() {
  loading.value = true
  queryDepositRecordApi(queryParams.value)
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
  queryDepositRecordList()
})
</script>

<style lang="scss" scoped></style>
