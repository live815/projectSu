<template>
  <div>
    <el-form :model="requestData" :inline="true" label-width="auto" label-position="left">
      <el-row>
        <el-form-item>
          <el-form-item :label="$t('agent.agentAccount') + ':'" v-if="viewType == 1">
            <el-input v-model="requestData.agentName" style="width: 150px" />
          </el-form-item>
          <el-form-item :label="$t('agent.memberAccount')" v-else>
            <el-input v-model="requestData.userName" style="width: 150px" />
          </el-form-item>
          <!-- <el-form-item :label="$t('agent.immediateSuperiorQuote')">
            <el-input v-model="requestData.superiorAgentName" style="width: 150px" />
          </el-form-item> -->
        </el-form-item>
        <el-button type="primary" @click="getTableData()">{{ $t('agent.search') }}</el-button>
      </el-row>
    </el-form>

    <div class="dialog-content">
      <table v-if="viewType != 3">
        <thead>
          <tr>
            <th>
              {{ viewType == 1 ? $t('agent.agentAccount') : $t('agent.memberAccount') }}
            </th>
            <th v-if="viewType == 1">{{ $t('agent.agentLevel') }}</th>
            <!-- <th>{{ $t("agent.immediateSuperior") }}</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.agentName || row.memberName }}</td>
            <td v-if="viewType == 1">{{ row.proxyLevel + 1 }}</td>
            <!-- <td>{{ row.superiorProxyName || row.superiorAgentName }}</td> -->
          </tr>
        </tbody>
      </table>
      <table v-else>
        <thead>
          <tr>
            <th>{{ $t('agent.memberAccountQuot') }}</th>
            <!-- <th>{{ $t("agent.immediateSuperior") }}</th> -->
            <th>{{ $t('agent.rechargeThisMonth') }}</th>
            <th>{{ $t('agent.bettingOfTheMonth') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.memberName }}</td>
            <!-- <td>{{ row.superiorAgentName }}</td> -->
            <td>{{ row.depositAmount }}</td>
            <td>{{ row.validBet }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pag-row">
      <div>{{ $t('agent.common') }}{{ total }}{{ $t('agent.records') }}</div>
      <div class="pag">
        <el-pagination
          v-model:current-page="currentPage"
          background
          :page-size="10"
          layout=" prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getSubAgentApi, getSubMembertApi, getActiveMembertApi } from '@/api/agent/agentList.js'
const props = defineProps(['agentId', 'tenantId', 'viewType'])
const requestData = ref({
  tenantId: 0,
  agentId: 0,
  agentName: '',
  userName: '',
  superiorAgentName: '',
  pageNum: 1,
  pageSize: 10
})
const tableData = ref([])
onMounted(() => {
  requestData.value.tenantId = props.tenantId
  requestData.value.agentId = props.agentId
  getTableData()
})

// 获取数据
const getTableData = () => {
  if (props.viewType == 1) {
    getSubAgentApi(requestData.value).then((res) => {
      total.value = res.total
      tableData.value = res.records
    })
  } else if (props.viewType == 2) {
    getSubMembertApi(requestData.value).then((res) => {
      total.value = res.total
      tableData.value = res.records
    })
  } else {
    getActiveMembertApi(requestData.value).then((res) => {
      total.value = res.total
      tableData.value = res.records
    })
  }
}

// 分页器逻辑
const currentPage = ref(1)
const total = ref(0)
const handleCurrentChange = (val) => {
  requestData.value.pageNum = val
  currentPage.value = val
  getTableData()
}
</script>

<style lang="scss" scoped>
.dialog-content {
  padding: 0 20px;
  min-height: 700px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: rgb(190, 190, 190);
}
th,
td {
  height: 50px;
  border: 1px solid #727272;
  text-align: center;
}
.pag-row {
  display: flex;
  align-items: center;
}
.pag {
  margin-left: auto;
}
</style>
