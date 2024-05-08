<!-- 一审{{$t('agent.review')}}详情 -->
<template>
  <div v-if="agentTableData">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-tree :data="treeList" :props="defaultProps" lazy :load="loadNode">
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                {{ node.label }}&nbsp;&nbsp;<span class="blue"
                  >({{ data.directSubAgents }}/{{ data.allSubAgents }})
                </span>
              </span>
            </template>
          </el-tree>
        </el-col>
        <el-col :span="16">
          <div class="button-container" v-if="rowItem.status == 1 && !isView">
            <el-form-item>
              <el-button @click="confirmAndClose">取消</el-button>
              <el-button type="success" @click="passAndReject(2)">一审通过</el-button>
              <el-button type="danger" @click="passAndReject(1)">{{
                $t('agent.firstReviewRefuse')
              }}</el-button>
            </el-form-item>
          </div>
          <div class="button-container" v-if="rowItem.status == 3 && !isView">
            <el-form-item>
              <el-button @click="confirmAndClose">取消</el-button>
              <el-button type="success" @click="passAndReject(2)">二审通过</el-button>
              <el-button type="danger" @click="passAndReject(1)">{{
                $t('agent.secondReviewRefuse')
              }}</el-button>
            </el-form-item>
          </div>
          <el-form-item>
            <div class="agent">{{ $t('agent.agentInformation') }}</div>
            <el-table :data="agentTableData" border style="width: 100%">
              <el-table-column prop="agentName" :label="$t('agent.agentAccount')" width="230" />
              <el-table-column prop="agentStatus" :label="$t('agent.accountStatus')" width="230">
                <template #default="{ row }">
                  <span v-if="row.agentStatus == 0">{{ $t('agent.nomral') }} </span>
                  <span v-if="row.agentStatus == 1">{{ $t('agent.loginLock') }}</span>
                  <span v-if="row.agentStatus == 2">{{ $t('agent.withdrawLock') }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="tagList" :label="$t('agent.agentTag')" width="230" />
              <el-table-column prop="agentCreateTime" :label="$t('agent.createTime')" width="230" />
            </el-table>
          </el-form-item>
          <el-form-item>
            <div class="agent">
              {{ agentTableData[0] && agentTableData[0].commissionDate?.slice(0, -3)
              }}{{ $t('agent.period') }}
            </div>
            <el-table :data="agentTableData" border style="width: 100%">
              <el-table-column prop="agentMode" :label="$t('agent.agentModel')" width="180">
                <template #default="{ row }">
                  <span v-if="row.agentMode == 0">{{ $t('agent.commissionMode') }}</span>
                  <span v-else>{{ $t('agent.dispatchMode') }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="commissionRebateConfigName"
                :label="$t('agent.commisionPlan')"
                width="180"
              >
                <template #default="{ row }">
                  <span
                    style="color: #1890ff; cursor: pointer"
                    @click="openDetail({ type: 1, data: row })"
                    >{{ row.commissionRebateConfigName }}</span
                  >
                </template>
              </el-table-column>

              <el-table-column
                prop="ownerCompanyProfitAndLossMonth"
                :label="$t('agent.cuerrtMonthCompanyWinLose')"
                width="180"
              />
              <el-table-column prop="activeNumbers" :label="$t('agent.activeUser')" width="180" />
              <el-table-column prop="commissionRate" :label="$t('agent.commissionRate')">
                <template #default="{ row }">
                  <span>{{ (row.commissionRate * 100).toFixed(2) }}%</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <div class="agent-flex">
              <div class="agent">{{ $t('agent.commissonStatement') }}</div>
              <div
                class="subtraction"
                @click="openDetail({ type: 5, data: agentTableData[0] })"
                v-if="rowItems.status == 1"
              >
                <u>{{ $t('agent.commissonAdjust') }}</u>
              </div>
            </div>
            <el-table :data="agentTableData" border style="width: 100%">
              <el-table-column
                prop="companyProfitAndLossMonth"
                :label="$t('agent.cuerrtMonthCompanyWinLose')"
                width="180"
              />
              <el-table-column
                prop="companyProfitAndLossAdjust"
                :label="$t('agent.companyWinLoseAdjust')"
                width="180"
              >
                <template #default="{ row }">
                  <span
                    style="color: #1890ff; cursor: pointer"
                    @click="openDetail({ type: 6, data: row })"
                    >{{ row.companyProfitAndLossAdjust }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column prop="totalRebate" :label="$t('agent.totalReward')" width="180" />
              <el-table-column
                prop="totalDividend"
                :label="$t('agent.totalDividend')"
                width="180"
              />
              <el-table-column
                prop="depositAndWithdrawalFees"
                :label="$t('agent.depositWithdrawFee')"
              />
            </el-table>
            <el-table :data="agentTableData" border style="width: 100%">
              <el-table-column prop="venueFee" :label="$t('agent.lobbyNameFee')" width="180">
                <template #default="{ row }">
                  <span
                    style="color: #1890ff; cursor: pointer"
                    @click="openDetail({ type: 2, data: row })"
                    >{{ row.venueFee }}</span
                  >
                </template>
              </el-table-column>

              <el-table-column
                prop="addTotalLastMonth"
                :label="$t('agent.totalLastMonth')"
                width="180"
              />
              <el-table-column
                prop="insteadRechargeAmount"
                :label="$t('agent.totalForCharge')"
                width="180"
              />
              <el-table-column
                prop="creditInsteadRechargeAmount"
                :label="$t('agent.creditSubstitute')"
                width="180"
              />
              <el-table-column
                prop="insteadRechargeDividend"
                :label="$t('agent.insteadRechargeDividend')"
                width="180"
              />
            </el-table>
            <el-table :data="agentTableData" border style="width: 100%">
              <el-table-column
                prop="ownerCommission"
                :label="$t('agent.ownerCommission')"
                width="180"
              />
              <el-table-column
                prop="subTakeCommission"
                :label="$t('agent.subTakeCommission')"
                width="180"
              />
              <el-table-column
                prop="subordinateCommission"
                :label="$t('agent.subordinateCommission')"
                width="180"
              >
                <template #default="{ row }">
                  <span
                    style="color: #1890ff; cursor: pointer"
                    @click="openDetail({ type: 3, data: row })"
                    >{{ row.subordinateCommission }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="commissionAddSub"
                :label="$t('agent.commissonAdjust')"
                width="180"
              >
                <template #default="{ row }">
                  <span
                    style="color: #1890ff; cursor: pointer"
                    @click="openDetail({ type: 4, data: row })"
                    >{{ row.commissionAddSub }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column prop="teamCommission" :label="$t('agent.teamCommission')" />
            </el-table>
          </el-form-item>
          <el-row :gutter="24" v-if="rowItem.status >= 2">
            <el-col :span="8">
              <el-form-item :label="$t('agent.firstReviewer')">
                <span>{{ rowItems.firstReview }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"
              ><el-form-item :label="$t('agent.firstReviewTime')">{{
                rowItems.firstReviewTime
              }}</el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item :label="$t('agent.firstReviewRemark')">{{
                rowItems.firstReviewMark
              }}</el-form-item></el-col
            >
          </el-row>
          <el-row :gutter="24" v-if="rowItem.status >= 4">
            <el-col :span="8">
              <el-form-item :label="$t('agent.secondReviewer')">
                <span>{{ rowItems.finalReview }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"
              ><el-form-item :label="$t('agent.secondReviewTime')">{{
                rowItems.finalReviewTime
              }}</el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item :label="$t('agent.secondReviewRemark')">{{
                rowItems.finalReviewMark
              }}</el-form-item></el-col
            >
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <!-- 接受或拒绝 -->
    <el-dialog
      v-model="isShowReview"
      :title="`${passOrReject == 2 ? $t('agent.reviewPass') : $t('agent.reviewRefuse')}`"
      width="800px"
      :center="true"
      :before-close="closeParentDialog"
    >
      <PassAndReject
        v-if="isShowReview"
        :rowItems="rowItems"
        @closeDialog="closeParentDialog"
        @changeStatus="handleUpdateOpen"
        :passOrReject="passOrReject"
      ></PassAndReject>
    </el-dialog>
    <!-- 详情页 -->
    <el-dialog v-model="showDetail" :center="true" :before-close="closeDetail" width="800px">
      <detailDialog
        v-if="showDetail"
        :detailData="detailData"
        :type="dialogType"
        @closeDetail="closeDetail"
        @closeAndRegainData="closeAndRegainData"
      ></detailDialog>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { inquireAboutCommissionReviewApi, getSubAgentTreeList } from '@/api/agent/commission.js'
import PassAndReject from './PassAndReject.vue'
import detailDialog from './detailDialog'
import i18n from '@/i18n'

const props = defineProps({
  rowItems: Object,
  isView: { type: Boolean, default: false }
})
const emit = defineEmits([, 'closeDialog', 'closeAndRegainDate'])

// 详情弹窗
const showDetail = ref(false)
const detailData = ref({})
const dialogType = ref()
const openDetail = ({ type, data }) => {
  dialogType.value = type
  detailData.value = data
  showDetail.value = true
}
const closeDetail = () => {
  showDetail.value = false
}

const agentTableData = ref([]) //代理信息表格
const rowItem = computed(() => {
  return props.rowItems
})
//通过拒绝弹窗
const passOrReject = ref('')
const isShowReview = ref(false)
const passAndReject = (type) => {
  passOrReject.value = type
  isShowReview.value = !isShowReview.value
}

//关闭弹窗
const closeParentDialog = () => {
  isShowReview.value = false
}

// 关闭下级详情弹窗并重新获取数据
const closeAndRegainData = () => {
  showDetail.value = false
  inquireAboutCommissionReviewApi(rowItem.value.id)
    .then((res) => {
      let temp = res
      temp.commissionRebateConfigId = BigInt(temp.commissionRebateConfigId).toString()
      agentTableData.value[0] = temp
      agentTableData.value = idToString(agentTableData.value)
      getSubAgentData(agentTableData.value[0].agentId)
      isLoading.value = false
    })
    .catch((error) => {
      console.error('Error fetching agent details:', error)
    })
}
// 关闭本弹窗重新获取数据
const handleUpdateOpen = (status) => {
  isShowReview.value = false
  emit('closeAndRegainDate', status)
}

// 获取表格数据和树状图初始数据
const treeList = ref([])
onMounted(() => {
  inquireAboutCommissionReviewApi(rowItem.value.id)
    .then((res) => {
      let temp = res
      temp.commissionRebateConfigId = BigInt(temp.commissionRebateConfigId).toString()
      agentTableData.value.push(temp)
      agentTableData.value = idToString(agentTableData.value)
      getSubAgentData(agentTableData.value[0].agentId)
      isLoading.value = false
    })
    .catch((error) => {
      console.error('Error fetching agent details:', error)
    })
})

// 点击树状节点获取下级数据
const isLoading = ref(true)
const loadNode = async (node, resolve) => {
  if (agentTableData.value.length == 0) {
    return
  }
  console.log(node, 'nodenodenodenodenodenode')
  try {
    let res = await getSubAgentTreeList({ agentId: node.data.agentId })
    let temp = idToString(res)
    console.log(temp)
    temp = temp.filter((item) => {
      return item.agentId != treeList.value[0].agentId
    })
    console.log(temp)
    return resolve(idToString(temp))
  } catch (err) {
    console.log(err)
  }
}

// 获取初始化树形下级子项数据
const getSubAgentData = async (id) => {
  try {
    let res = await getSubAgentTreeList({ agentId: id })
    treeList.value.push(idToString(res)[0])
  } catch (err) {
    console.log(err)
  }
}
const confirmAndClose = () => {
  emit('closeDialog')
}
// 树形图节点配置
const defaultProps = {
  children: 'children',
  label: 'agentName'
}

// 把id转成字符串
const idToString = (list) => {
  list.forEach((item) => {
    item.agentId = BigInt(item.agentId).toString()
  })
  return list
}
</script>

<style lang="scss" scoped>
.agent {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333333;
  font-weight: bold;
  font-family: 'Arial Bold', 'Arial Normal', 'Arial', sans-serif;
}
.agent-flex {
  display: flex;
  gap: 10px;
}
.subtraction {
  margin-top: 5px;
  cursor: pointer;
  color: #1890ff;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #e9e9e9;
}
.blue {
  color: rgb(24, 174, 255);
}
</style>
