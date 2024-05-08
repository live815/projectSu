<template>
  <div>
    <div class="table-container">
      <el-table :data="data.records" style="width: 100%; overflow-x: scroll">
        <el-table-column prop="seq" :label="$t('agent.agentAccountMode')" width="180">
          <template #default="{ row }">
            <span v-if="data.records.length > 0">
              {{ row.agentName }}
              {{
                `(${row.agentMode == 0 ? $t('agent.commissionMode') : $t('agent.dispatchMode')})`
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="agentLevel" :label="$t('agent.agentLevel')" width="180">
          <template #default="{ row }">
            <span> {{ row.agentLevel + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="superiorAgentName" :label="$t('agent.parentAccount')" width="180" />
        <el-table-column
          prop="companyWinLose"
          :label="$t('agent.agentCompanyWinLosr')"
          width="180"
        />
        <el-table-column prop="activeMembers" :label="$t('agent.activeUser')" width="180" />
        <el-table-column prop="commissionRate" :label="$t('agent.commissionRate')" width="180" />
        <el-table-column prop="venueFee" :label="$t('agent.lobbyNameFee')" width="180" />
        <el-table-column prop="rebateTotal" :label="$t('agent.totalReward')" width="180" />
        <el-table-column prop="welfareTotal" :label="$t('agent.totalDividend')" width="180" />
        <el-table-column
          prop="depositAndWithdrawalFees"
          :label="$t('agent.depositWithdrawFee')"
          width="180"
        />
        <el-table-column prop="lastMonth" :label="$t('agent.totalLastMonth')" width="180" />
        <el-table-column
          prop="depositAmount"
          :label="$t('agent.totalForDepositAmont')"
          width="180"
        />
        <el-table-column
          prop="creditDepositAmount"
          :label="$t('agent.totalForCreditAmount')"
          width="180"
        />
        <el-table-column
          prop="depositWelfare"
          :label="$t('agent.depositoryDividend')"
          width="180"
        />
        <el-table-column
          prop="ownerCommission"
          :label="$t('agent.currentLevelCommison')"
          width="180"
        />
        <el-table-column prop="subCommission" :label="$t('agent.submemberCommison')" width="180" />
      </el-table>
      <div class="pag-container">
        <el-pagination
          background
          v-model:current-page="requestData.pageNum"
          :page-size="10"
          layout="total,prev, pager, next, jumper"
          :total="tableData.total"
          @current-change="getSubAgentList"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { querySubordinateAgentsApi } from '@/api/agent/commission'
const props = defineProps({
  tableData: Object,
  agentId: String,
  date: String
})
const data = ref({
  records: []
})
onMounted(() => {
  data.value = props.tableData
})

const requestData = ref({
  agentId: props.agentId,
  pageNum: 1,
  pageSize: 10,
  commissionDate: props.date
})
const getSubAgentList = () => {
  requestData.value.agentId = props.agentId
  querySubordinateAgentsApi(requestData.value).then((res) => {
    tableData.value = res
  })
}
</script>

<style lang="scss" scoped>
.pag-container {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
