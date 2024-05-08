<!-- 转账记录 -->
<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item :label="$t('agent.transferTime')" prop="">
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
      <el-form-item :label="$t('agent.transferOutAgentAccount') + ' :'" prop="agentName">
        <el-input
          v-model="queryParams.transferOutAgentName"
          :placeholder="$t('agent.pleaseConfirm')"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.transferToAgentAccount') + ' :'" prop="orderNo">
        <el-input
          v-model="queryParams.transferInAgentName"
          :placeholder="$t('agent.pleaseConfirm')"
        />
      </el-form-item>
      <el-form-item :label="$t('agent.transferAmount')" prop="transferMoney">
        <el-input
          v-model="queryParams.transferMoneyStart"
          :placeholder="$t('agent.pleaseConfirm')"
          @input="handleInput('transferMoneyStart')"
          style="width: 80px"
        >
        </el-input>
        <span> &nbsp;-&nbsp; </span>
        <el-input
          v-model="queryParams.transferMoneyEnd"
          :placeholder="$t('agent.pleaseConfirm')"
          @input="handleInput('transferMoneyEnd')"
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
      <el-table-column prop="orderNo" :label="$t('agent.orderNoNoQuote')" width="200" />
      <el-table-column
        prop="transferOutAgentName"
        :label="$t('agent.transferOutAgentAccount')"
        width="200"
      />
      <el-table-column
        prop="transferInAgentName"
        :label="$t('agent.transferToAgentAccount')"
        width="200"
      />
      <el-table-column prop="walletType" :label="$t('agent.limitType')" width="200">
        <template #default="{ row }">
          <span v-if="row.walletType == 0">{{ $t('agent.quotaWallet') }}</span>
          <span v-if="row.walletType == 1">{{ $t('agent.creditWallet') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transferMoney" :label="$t('agent.transferAmountQuot')" width="200">
        <template #default="{ row }">
          <span>{{ row.transferMoney.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="transferType" :label="$t('agent.transferType')" width="200">
        <template #default="{ row }">
          <span v-if="row.transferType == 2">{{ $t('agent.commissionIssuance') }}</span>
          <span v-if="row.transferType == 3">{{ $t('agent.agentTransfer') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="transferTime" :label="$t('agent.transferTimeQuot')" width="200" />
      <el-table-column prop="remark" :label="$t('agent.remarkQuote')">
        <template #default="{ row }">
          <span>{{ row.remark || '-' }}</span>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultTime, shortcuts } from '@/utils/config'
import { queryTransferRecordsApi } from '@/api/agent/agentRecord/agentRecord.js'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()

const queryParams = ref({
  transferOutAgentName: '',
  transferInAgentName: '',
  pageNum: 1,
  pageSize: 10,
  subAgentName: '',
  transferMoneyEnd: '',
  transferMoneyStart: '',
  transferTimeEnd: '',
  transferTimeStart: ''
})
const total = ref()
const loading = ref(false)
const accountChangeTime = ref([]) //账变时间

function handleQuery() {
  if (accountChangeTime.value) {
    queryParams.value.transferTimeStart = accountChangeTime.value[0]
    queryParams.value.transferTimeEnd = accountChangeTime.value[1]
  } else {
    queryParams.value.transferTimeStart = null
    queryParams.value.transferTimeEnd = null
  }

  // 获取存款金额范围
  const depositMoneyStart = queryParams.value.transferMoneyStart * 1
  const depositMoneyEnd = queryParams.value.transferMoneyEnd * 1

  // 对比金额范围
  if (!depositMoneyEnd && !depositMoneyStart) {
    queryParams.value.pageNum = 1
    // queryDepositRecordList()
  } else if (!depositMoneyEnd || !depositMoneyStart || depositMoneyEnd < depositMoneyStart) {
    proxy.$modal.msgError(i18n.global.t('agent.noBiggerThenStart'))
    return
  } else {
    queryParams.value.pageNum = 1
    // queryDepositRecordList()
  }

  queryTransferRecordsList()
}
// {{$t('agent.reset')}}
function resetQuery() {
  queryParams.value.transferOutAgentName = ''
  queryParams.value.transferInAgentName = ''
  queryParams.value.transferMoneyStart = ''
  queryParams.value.transferMoneyEnd = ''
  queryParams.value.transferTimeStart = ''
  queryParams.value.transferTimeEnd = ''
  accountChangeTime.value = ''
}
// 拼音输入时实时更新输入值
const handleInput = (field) => {
  queryParams.value[field] = queryParams.value[field].replace(/^(0+)|[^\d]+/g, '')
}
// 列表
const tableData = ref([])
const queryTransferRecordsList = async () => {
  try {
    let res = await queryTransferRecordsApi(queryParams.value)
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
  queryTransferRecordsApi(queryParams.value)
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
  queryTransferRecordsList()
})
</script>

<style lang="scss" scoped>
.refresh {
  font-size: 14px;
  margin-left: 5px;
}
</style>
