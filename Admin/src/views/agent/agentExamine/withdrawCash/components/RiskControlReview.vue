<!-- 提现风控{{$t('agent.review')}} {{$t('agent.review')}}弹窗-->
<template>
  <div>
    <el-form :model="queryParams">
      <div class="button-container" v-if="status != 3">
        <el-form-item>
          <el-button @click="handleClose">{{ $t('agent.cancel') }}</el-button>
          <el-button type="warning" v-if="status == 1" @click="openDialog(1)">{{
            $t('agent.putOnHold')
          }}</el-button>
          <el-button type="danger" @click="openDialog(2)">{{ $t('agent.refuse') }}</el-button>
          <el-button type="success" @click="openDialog(3)">{{ $t('agent.pass') }}</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <div class="agent">{{ $t('agent.agentAccountInformation') }}</div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="agentName"
            :label="$t('agent.agentAccount')"
            width="230"
            align="center"
          />
          <el-table-column
            prop="agentLevel"
            :label="$t('agent.agentLevel')"
            width="230"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.agentLevel + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="superiorAgentName"
            :label="$t('agent.immediateSuperior')"
            width="230"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.superiorAgentName || '--' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="agentStatus"
            :label="$t('member.accountStatus')"
            width="230"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ agentStatusMap[row.agentStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tagList" :label="$t('agent.agentTag')" width="230" align="center">
            <template #default="{ row }">
              <span>{{ row.tagList }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="agent">{{ $t('agent.historicalDeposit') }}</div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="historyInfoRespVO.lastWithdrawalTime"
            :label="$t('agent.lastWithdrawalTime')"
            width="288"
            align="center"
          />
          <el-table-column
            prop="historyInfoRespVO.totalWithdrawalAmount"
            :label="$t('agent.lastWithdrawalAmount')"
            width="288"
            align="center"
          >
            <template #default="{ row }">
              <span>
                <CurrencyUnit />{{ row.historyInfoRespVO?.totalWithdrawalAmount.toFixed(2) }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="historyInfoRespVO.lastWithdrawalStatus"
            :label="$t('agent.lastWithdrawalStatus')"
            width="287"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ statusMap[row.historyInfoRespVO.lastWithdrawalStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="historyInfoRespVO.lastWdWayType"
            :label="$t('agent.lastWithdrawalMethod')"
            width="287"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ wdTypeMap[row.historyInfoRespVO.lastWdWayType] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="historyInfoRespVO.totalWithdrawalAmount"
            :label="$t('agent.cumulativeWithdrawalAmount')"
            width="383"
            align="center"
          >
            <template #default="{ row }">
              <span>
                <CurrencyUnit />{{ row.historyInfoRespVO?.totalWithdrawalAmount.toFixed(2) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="historyInfoRespVO.totalWithdrawalNums"
            :label="$t('agent.cumulativeNumberOfWithdrawals')"
            width="383"
            align="center"
          />
          <el-table-column
            prop="historyInfoRespVO.totalWithdrawalDepositGapAmount"
            :label="$t('agent.accumulatedDifferenceBetween')"
            width="383"
            align="center"
          >
            <template #default="{ row }">
              <span>
                <CurrencyUnit />{{
                  row.historyInfoRespVO?.totalWithdrawalDepositGapAmount.toFixed(2)
                }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="agent">{{ $t('agent.thisWithdrawalInformation') }}</div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="orderNo" :label="$t('funds.orderNo')" width="200" align="center" />
          <el-table-column
            prop="withdrawalIp"
            :label="$t('agent.withdrawalIp')"
            width="200"
            align="center"
          />
          <el-table-column
            prop="deviceNo"
            :label="$t('agent.withdrawalTerminalEquipmentNumber')"
            width="200"
            align="center"
          />
          <el-table-column
            prop="address"
            :label="$t('agent.isItTheFirstMention')"
            width="200"
            align="center"
          >
            <template #default="{ row }">
              <span style="color: #d9001b">{{ $t('agent.deny') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wdType" :label="$t('agent.isItALargeWithdrawal')" align="center">
            <template #default="{ row }">
              <span style="color: #d9001b">{{
                row.wdType == 0 ? $t('agent.ordinaryWithdrawal') : $t('agent.largeWithdrawals')
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="date"
            :label="$t('agent.withdrawalMethod')"
            width="200"
            align="center"
          >
            <template #default="{ row }">
              <span>{{
                row.wdWayType == 0 ? $t('agent.bankCardCashWithdrawal') : $t('agent.withdrawUsdt')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="todayWithdrawalNums"
            :label="$t('agent.numberOfWithdrawalsMadeToday')"
            width="200"
            align="center"
          />
          <el-table-column
            prop="todayWithdrawalAmountTotal"
            :label="$t('agent.totalWithdrawalsToday')"
            width="200"
            align="center"
          />
          <el-table-column
            prop="address"
            :label="$t('agent.withdrawalInformation')"
            width="200"
            align="center"
          />
          <el-table-column prop="address" :label="$t('funds.withdrawalAmount')" align="center">
            <template #default="{ row }">
              <span style="color: #d9001b; font-size: 13px"
                ><CurrencyUnit /> {{ row.amount.toFixed(2) }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div v-if="status != 1 && tableData[0]">
      <div class="agent">{{ $t('agent.reviewInformation') }}</div>
      <el-row>
        <el-col :span="8">{{ $t('agent.reviewer') }}{{ tableData[0].riskApprover }}</el-col>
        <el-col :span="8">{{ $t('agent.reviewTime') }}{{ tableData[0].riskApprovalTime }}</el-col>
        <el-col :span="8">{{ $t('agent.reviewRemark') }}{{ tableData[0].riskApprovalMark }}</el-col>
      </el-row>
    </div>
    <el-dialog
      v-model="isShowReview"
      :title="submitTypeMap[submitType]"
      width="800px"
      :center="true"
      destroy-on-close
    >
      <div>
        <el-form :model="submitData" label-width="80">
          <el-form-item
            :label="$t('agent.remark')"
            :rules="[
              {
                required: true,
                message: $t('agent.remarksCannotBeEmpty'),
                trigger: 'blur'
              }
            ]"
            prop="reviewMark"
          >
            <el-input v-model="submitData.reviewMark" type="textarea" :rows="6"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="closeDialog">{{ $t('agent.cancel') }}</el-button>
            <el-button type="primary" @click="submit()">{{ $t('agent.ensure') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getAgentWithdraDetailApi, auditPassOrRejectionOrShuntApi } from '@/api/agent/adjustment.js'
import CurrencyUnit from '@/components/CurrencyUnit/CurrencyUnit'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
import { ref } from 'vue'
const props = defineProps({
  rowItem: Object,
  status: Number,
  isHold: Boolean
})
const emit = defineEmits(['closeReviewDetails'])
const queryParams = ref({})
onMounted(async () => {
  let res = await getAgentWithdraDetailApi(props.rowItem.id)
  tableData.value.push(res)
  console.log(props.isHold)
  if (props.isHold === true) {
    openDialog(1)
  }
})
//表格数据
const tableData = ref([])

// {{$t('agent.review')}}弹窗 1=通过 2=拒绝 3=搁置
const isShowReview = ref(false)
const submitType = ref(0)
const submitData = ref({
  id: 0,
  passOrRejectionOrShuntFlag: '',
  review: '',
  reviewMark: ''
})
const openDialog = (type) => {
  submitType.value = type
  isShowReview.value = true
}
const closeDialog = () => {
  isShowReview.value = false
}

const submit = () => {
  if (!submitData.value.reviewMark) {
    proxy.$modal.msgError(i18n.global.t('agent.remarksCannotBeEmpty'))
    return
  }
  submitData.value.id = BigInt(tableData.value[0].id).toString()
  submitData.value.passOrRejectionOrShuntFlag = submitType.value
  auditPassOrRejectionOrShuntApi(submitData.value)
    .then(() => {
      proxy.$modal.msgSuccess(i18n.global.t('agent.reviewSuccessful'))
      emit('closeReviewDetails')
    })
    .catch((err) => {})
}

const submitTypeMap = {
  1: i18n.global.t('agent.withdrawalReviewOnHold'),
  2: i18n.global.t('agent.withdrawalReviewRejected'),
  3: i18n.global.t('agent.withdrawalApproved')
}
const agentStatusMap = {
  0: i18n.global.t('agent.nomral'),
  1: i18n.global.t('agent.loginLock'),
  2: i18n.global.t('agent.withdrawLock')
}
const statusMap = {
  0: i18n.global.t('agent.riskControlPendingReview'),
  1: i18n.global.t('agent.riskControlOnHold'),
  2: i18n.global.t('agent.riskControlReviewRejected'),
  3: i18n.global.t('agent.riskControlReviewPassed'),
  4: i18n.global.t('agent.withdrawalSuccessful'),
  5: i18n.global.t('agent.threePartyWithdrawal'),
  6: i18n.global.t('agent.threePartyWithdrawalFailed'),
  7: i18n.global.t('agent.refuseToWithdrawMoney'),
  8: i18n.global.t('agent.forceSuccess')
}
const wdTypeMap = {
  0: i18n.global.t('agent.bankCardCashWithdrawal'),
  1: i18n.global.t('agent.withdrawUsdt')
}
// 关闭弹窗
const handleClose = () => {
  emit('closeReviewDetails')
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #e9e9e9;
}

.display {
  display: flex;
  gap: 260px;
}

.agent {
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Arial Black', 'Arial Normal', 'Arial', sans-serif;
}
</style>
