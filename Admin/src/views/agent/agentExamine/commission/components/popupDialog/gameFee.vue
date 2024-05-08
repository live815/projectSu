<template>
  <div>
    <el-table :data="data.records">
      <el-table-column prop="lobbyName" :label="$t('agent.lobbyName')" />
      <el-table-column
        prop="totalProfitAndLoss"
        :label="$t('agent.companyTotalWinLose')"
        width="180"
      />
      <el-table-column prop="ratio" :label="$t('agent.lobbyChargeRate')" width="180">
        <template #default="{ row }">
          <span>{{ (row.ratio * 100).toFixed(2) }}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="lobbyFee" :label="$t('agent.lobbyNameFee')" width="180" />
    </el-table>

    <div class="pag-container">
      <el-pagination
        background
        v-model:current-page="requestData.pageNum"
        :page-size="10"
        layout="total,prev, pager, next, jumper"
        :total="tableData.total"
        @current-change="getVenueFees"
      />
    </div>
  </div>
</template>

<script setup>
import { inquiryAboutVenueFeesApi } from '@/api/agent/commission.js'
const props = defineProps({
  tableData: Object,
  agentId: String,
  commissionRebateConfigId: String,
  detailData: Object | Array
})
const data = ref({
  records: []
})
onMounted(() => {
  data.value = props.tableData
  console.log(props)
})

const requestData = ref({
  pageNum: 1,
  pageSize: 10,
  tenantId: 0,
  commissionDate: props.detailData.commissionDate
})

// 下一页获取数据
const getVenueFees = async () => {
  requestData.value.agentId = props.agentId
  requestData.value.commissionRebateConfigId = props.commissionRebateConfigId

  inquiryAboutVenueFeesApi(requestData.value).then((res) => {
    data.value = res
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
