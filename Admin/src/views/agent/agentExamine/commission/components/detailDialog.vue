<template>
  <div>
    <div class="title-row">{{ title }}</div>
    <!-- 佣金方案 -->
    <commissonMethod
      :tableData="tableData"
      v-if="type == 1 && !isLoading"
      :agentId="detailData.agentId"
      :commissionRecordId="detailData.id"
    />
    <!-- 场馆费率 -->
    <gameFee
      v-if="type == 2 && !isLoading"
      :tableData="tableData"
      :detailData="detailData"
      :agentId="detailData.agentId"
      :commissionRebateConfigId="detailData.commissionRebateConfigId"
    />
    <!-- 下级佣金 -->
    <subAgentCommission
      :agentId="detailData.agentId"
      :tableData="tableData"
      :date="date"
      v-if="type == 3 && !isLoading"
    />

    <!-- 佣金加减记录 -->
    <adjustRecord
      :tableData="tableData"
      :commissionRecordId="detailData.id"
      v-if="type == 4 && !isLoading"
    />
    <!-- 佣金加减 -->
    <commissonAdjust
      ref="commissonAdjustRef"
      v-if="type == 5 && !isLoading"
      :tableData="tableData"
    />

    <!-- 公司输赢调整金额 -->
    <winLoseAdjust
      :tableData="tableData"
      :commissionRecordId="detailData.id"
      v-if="type == 6 && !isLoading"
    />

    <!-- 加载 -->
    <div class="loading" v-if="isLoading">
      <el-icon><Loading /></el-icon>
      <div>{{ $t('agent.loading') }}</div>
    </div>
    <div class="btn-row" v-if="!isLoading">
      <el-button @click="submit" v-if="type == 5">{{ $t('agent.ensure') }}</el-button>
      <el-button type="primary" @click="handleCloseDialog">{{ $t('agent.cancel') }}</el-button>
    </div>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
import {
  inquireAboutCommissionPlansApi,
  querySubordinateAgentsApi,
  inquiryAboutVenueFeesApi,
  commisssionAdjustListApi,
  getCommisssionAdjustListApi,
  checkTheCompanysWinOrLossApi
} from '@/api/agent/commission.js'
import { deepCopy } from '@/utils'
import commissonMethod from './popupDialog/commissonMethod.vue'
import gameFee from './popupDialog/gameFee.vue'
import subAgentCommission from './popupDialog/subAgentCommission.vue'
import commissonAdjust from './popupDialog/commissonAdjust.vue'
import adjustRecord from './popupDialog/adjustRecord.vue'
import winLoseAdjust from './popupDialog/winLoseAdjust.vue'

const props = defineProps({
  type: Number,
  detailData: Object
})
const emit = defineEmits(['closeDetail', 'closeAndRegainData'])
const commissonAdjustRef = ref(null)
const isLoading = ref(true)
const tableData = ref({})
const date = ref('')

// 获得初始化数据传入子组件
onMounted(() => {
  let requestData = {}
  switch (props.type) {
    case 1:
      let id = BigInt(props.detailData.commissionRebateConfigId).toString()
      inquireAboutCommissionPlansApi(id).then((res) => {
        tableData.value = res
        isLoading.value = false
      })
      break
    case 2:
      requestData = {
        agentId: props.detailData.agentId,
        commissionRebateConfigId: BigInt(props.detailData.commissionRebateConfigId).toString(),
        pageNum: 1,
        pageSize: 10,
        tenantId: 0,
        commissionDate: props.detailData.commissionDate
      }
      inquiryAboutVenueFeesApi(requestData)
        .then((res) => {
          tableData.value = res
          isLoading.value = false
        })
        .catch((err) => {
          console.log(err)
          isLoading.value = false
        })
      return
    case 3:
      let temp = new Date(props.detailData.commissionDate)
      const year = temp.getFullYear()
      const month = (temp.getMonth() + 1).toString().padStart(2, '0')
      const commissionDate = `${year}-${month}-01`

      date.value = commissionDate
      requestData = {
        agentId: props.detailData.agentId,
        pageNum: 1,
        pageSize: 10,
        commissionDate
      }
      querySubordinateAgentsApi(requestData)
        .then((res) => {
          tableData.value = res
          isLoading.value = false
        })
        .catch((err) => {
          isLoading.value = false
        })
      return
    case 4:
      requestData = {
        commissionRecordId: props.detailData.id,
        pageNum: 1,
        pageSize: 10
      }
      getCommisssionAdjustListApi(requestData).then((res) => {
        tableData.value = res
        console.log(tableData.value, 'rnm')
        isLoading.value = false
      })
      return
    case 5:
      tableData.value = deepCopy(props.detailData)
      isLoading.value = false
      return
    case 6:
      requestData = {
        agentId: props.detailData.agentId,
        id: props.detailData.id,
        pageNum: 1,
        pageSize: 10
      }

      checkTheCompanysWinOrLossApi(requestData).then((res) => {
        tableData.value = res
        isLoading.value = false
      })
      return
  }
})

const title = computed(() => {
  switch (props.type) {
    case 1:
      return '佣金方案'
    case 2:
      return '场馆费'
    case 3:
      return '下级佣金'
    case 4:
      return '佣金加减记录'
    case 5:
      return '佣金加减'
    case 6:
      return '公司输赢调整'
  }
})

// 提交佣金加减
const submit = async () => {
  commissonAdjustRef.value.submitData.commissionRecordId = props.detailData.id
  if (!commissonAdjustRef.value.submitData.amount) {
    proxy.$modal.msgError(`请输入调整金额`)
    return
  }
  try {
    await commisssionAdjustListApi(commissonAdjustRef.value.submitData)
    proxy.$modal.msgSuccess(`调整成功`)
    handelCloseAndRegainData()
  } catch (err) {
    console.log(err)
  }
}

const handleCloseDialog = () => {
  emit('closeDetail')
}
const handelCloseAndRegainData = () => {
  emit('closeAndRegainData')
}
</script>

<style lang="scss" scoped>
.title-row {
  font-size: 24px;
  line-height: 35px;
  border-bottom: 1px solid #b3b3b3;
  margin-bottom: 20px;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}
.btn-row {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
