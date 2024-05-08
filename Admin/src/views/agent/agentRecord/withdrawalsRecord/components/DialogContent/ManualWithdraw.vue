<template>
  <!-- 人工/三方出款  dialogType 3=三方 4=人工-->
  <div id="ManualWithdraw">
    <div class="head-title">
      {{ props.dialogType == 3 ? $t('agent.threeMchOutMoney') : $t('agent.manualWithdrawal') }}
    </div>
    <div class="sub-title">代理信息</div>
    <el-row>
      <el-col :span="6" class="text-row"
        ><div>代理账号：{{ queryParams.agentName }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>代理等级：{{ queryParams.agentLevel + 1 || '-' }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>上级账号：{{ queryParams.superiorAgentName || '-' }}</div></el-col
      >
    </el-row>
    <div class="sub-title">订单信息</div>
    <el-row>
      <el-col :span="6" class="text-row"
        ><div>订单号：{{ queryParams.orderNo }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>提现方式：{{ queryParams.wdWayType == 0 ? '银行卡提现' : 'USDT提现' }}</div></el-col
      >

      <el-col :span="6" class="text-row"
        ><div>订单状态：{{ orderStatusList[queryParams.status] || '-' }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>提现时间：{{ queryParams.operateApplicantTime }}</div></el-col
      >
    </el-row>
    <div class="sub-title">提现金额</div>
    <el-row v-if="queryParams.wdWayType == 0">
      <el-col :span="6" class="text-row"
        ><div>提现金额：{{ queryParams.amount.toFixed(2) }}</div></el-col
      >
    </el-row>
    <el-row v-else>
      <el-col :span="6" class="text-row"
        ><div>提现金额：{{ queryParams.amount }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>汇率：{{ queryParams.rate }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>USDT数量：{{ queryParams.actualUsdtNum }}</div></el-col
      >
    </el-row>
    <div class="sub-title">收款信息</div>
    <el-row v-if="queryParams.wdWayType == 0">
      <el-col :span="6" class="text-row"
        ><div>收款人姓名：{{ queryParams.payeeName }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>收款银行：{{ queryParams.payeeBankName }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>收款卡号：{{ queryParams.payeeCardNo }}</div></el-col
      >
    </el-row>
    <el-row v-else>
      <el-col :span="6" class="text-row"
        ><div>协议：{{ queryParams.tradeProtocol == 1 ? 'trc20' : 'rec20' }}</div></el-col
      >
      <el-col :span="6" class="text-row"
        ><div>收款地址：{{ queryParams.tradeAddr }}</div></el-col
      >
    </el-row>
    <hr />
    <el-form label-width="auto" :model="submitData" :rules="rules">
      <el-form-item label="出款金额:">
        <el-input disabled style="width: 200px" v-model="queryParams.actualAmt"></el-input>
      </el-form-item>
      <el-form-item label="出款商户:" v-if="dialogType == 3">
        <el-select v-model="submitData.mchId" clearable>
          <el-option
            v-for="item in mchList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="paymentMark">
        <el-input
          type="textarea"
          v-model="submitData.paymentMark"
          rows="6"
          maxLength="200"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-row">
      <el-button @click="handleClose(false)">取消</el-button>
      <el-button type="primary" @click="submit">确认出款</el-button>
    </div>
  </div>
</template>

<script setup>
import {
  getWithdrawDetailApi,
  manualPayoutApi,
  getThreeMchDetailListApi,
  thirdPayoutApi
} from '@/api/agent/agentRecord/agentRecord.js'
import { deepCopy } from '@/utils'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const props = defineProps(['dialogData', 'dialogType', 'payoutMerchantList'])
const emit = defineEmits(['toCloseDialog'])
const handleClose = (val) => {
  emit('toCloseDialog', val)
}
onMounted(() => {
  getData()
})
const queryParams = ref({
  paymentMark: ''
})

const getData = () => {
  getWithdrawDetailApi(BigInt(props.dialogData.id).toString()).then((res) => {
    queryParams.value = res
    submitData.value.orderNo = res.orderNo
    if (props.dialogType == 3) {
      submitData.value.mchId = res.mchId || null
      submitData.value.mchName = res.mchName
      getMchList(res.wdWayType)
    } else {
    }
  })
}

// 提交审核
const submitData = ref({
  mchId: null,
  orderNo: null,
  paymentMark: null
})
const submit = () => {
  if (!submitData.value.paymentMark) {
    proxy.$modal.msgWarning(i18n.global.t('agent.pleaseInputRemark'))
    return
  }
  if (props.dialogType == 3) {
    // 第三方出款
    let temp = mchList.value.filter((item) => {
      return item.value == submitData.value.mchId
    })
    if (temp.length == 0) {
      proxy.$modal.msgWarning(i18n.global.t('agent.plsSeletMch'))
      return
    }
    submitData.value.mchName = temp[0].label
    thirdPayoutApi(submitData.value).then((res) => {
      proxy.$modal.msgSuccess(i18n.global.t('agent.reviewSuccessful'))
      emit('toCloseDialog', true)
    })
  } else {
    // 人工出款
    delete submitData.value.mchId
    manualPayoutApi(submitData.value).then((res) => {
      proxy.$modal.msgSuccess(i18n.global.t('agent.reviewSuccessful'))
      emit('toCloseDialog', true)
    })
  }
}

// 处理出款商户列表
const mchList = ref([])
const getMchList = (type) => {
  let params = {
    paymentChannelType: null
  }
  if (type) {
    params.paymentChannelType = 'USDT'
  } else {
    params.paymentChannelType = 'BANK'
  }
  getThreeMchDetailListApi(params).then((res) => {
    let arr = res
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        mchList.value.push({
          value: item.mchId,
          label: item.mchName
        })
      })
    }
  })
}

// 状态映射
const orderStatusList = {
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
// 表单校验
const rules = {
  paymentMark: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseInputRemark'),
      trigger: 'blur'
    }
  ]
}
</script>

<style lang="scss" scoped>
.sub-title {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 600;
}
.text-row {
  margin-top: 10px;
}
hr {
  margin-top: 30px;
  margin-bottom: 30px;
}
.btn-row {
  display: flex;
  position: relative;
  justify-content: end;
}
.head-title {
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: 600;
}
</style>
