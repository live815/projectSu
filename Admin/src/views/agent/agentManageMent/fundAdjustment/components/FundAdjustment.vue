<!-- 单用户调整 -->
<template>
  <div class="app-container">
    <el-form
      :label-position="labelPosition"
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="auto">
      <el-form-item
        :label="$t('agent.agentAccountQuote')"
        :placeholder="$t('agent.pleaseEnterAgentAccount')"
        prop="agentName"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseEnterAgentAccount'),
            trigger: 'blur'
          }
        ]">
        <el-input
          v-model="queryParams.agentName"
          :placeholder="$t('agent.pleaseEnterAgentAccount')"
          clearable
          style="width: 300px"
          @input="queryParams.balance = ''">
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('agent.limitType') + ' :'"
        :placeholder="$t('agent.pleaseSelect')"
        prop="walletType"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseSelectWalletType'),
            trigger: 'blur'
          }
        ]">
        <el-select
          v-model="queryParams.walletType"
          clearable
          :placeholder="$t('agent.pleaseSelectWalletType')"
          style="width: 300px"
          @change="changeWallet">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('agent.quotaBalanceQuot')"
        prop="balance"
        :rules="[
          {
            required: true,
            message: '请查询余额',
            trigger: 'blur'
          },
          { validator: valiBalance, trigger: 'blur' }
        ]">
        <el-input
          v-model="queryParams.balance"
          :placeholder="CurUnit + $t('agent.enterTheQuotaBalance')"
          disabled
          style="width: 300px">
        </el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          @click="checkMemberWallet"
          :disabled="!queryParams.agentName"
          >{{ $t('agent.search') }}</el-button
        >
      </el-form-item>

      <el-form-item
        :label="$t('agent.adjustType')"
        prop="adjustType"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseSelectAnAdjustmentType'),
            trigger: 'blur'
          }
        ]">
        <el-select
          v-model="queryParams.adjustType"
          @change="adjustTypeChange"
          :placeholder="$t('agent.pleaseSelect')"
          clearable
          style="width: 300px">
          <el-option
            v-for="dict in fund_adjust_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('agent.adjustReason')"
        prop="adjustReason"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseSelectTheReasonForApplication'),
            trigger: 'blur'
          }
        ]">
        <el-select
          v-model="queryParams.adjustReason"
          :placeholder="$t('agent.pleaseSelectTheAdjustmentTypeFirst')"
          clearable
          style="width: 300px">
          <!-- adjustReduceReasonList -->

          <el-option
            v-for="dict in adjustReasonList"
            v-show="
              queryParams.walletType != 2 &&
              queryParams.walletType != 3 &&
              queryParams.walletType != 1
            "
            :key="dict.value"
            :label="dict.label"
            :value="dict.value" />
          <el-option
            :label="$t('agent.addCreditLine')"
            :value="2"
            v-if="queryParams.walletType == 1 && queryParams.adjustType == 0" />
          <el-option
            :label="$t('agent.commissionReduce')"
            :value="5"
            v-if="queryParams.walletType == 1 && queryParams.adjustType == 1" />

          <el-option
            :label="$t('agent.companyWinLoseAdjust')"
            :value="3"
            v-if="queryParams.walletType == 2" />
          <el-option
            :label="$t('agent.withdrawLimit')"
            :value="14"
            v-if="queryParams.walletType == 3" />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('agent.adjustAmountQuote')"
        :placeholder="$t('agent.pleaseEnterTheAdjustmentAmount')"
        prop="adjustMoney"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseEnterTheAdjustmentAmount'),
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]+$/,
            message: $t('agent.onlyNum'),
            trigger: 'blur'
          },
          { validator: adjustMoneyVlia, trigger: 'blur' }
        ]">
        <el-input
          v-model="queryParams.adjustMoney"
          :placeholder="$t('agent.pleaseEnterTheAdjustmentAmount')"
          clearable
          style="width: 300px"
          maxlength="16">
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('agent.adjustMonth')"
        :placeholder="$t('agent.pleaseSelect')"
        prop="adjustMonth"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseEnterTheAdjustmentMonth'),
            trigger: 'blur'
          }
        ]">
        <el-select
          v-model="queryParams.adjustMonth"
          clearable
          :placeholder="$t('agent.pleaseSelect')"
          style="width: 300px">
          <el-option :label="$t('agent.lastMonth')" :value="0" />
          <el-option :label="$t('agent.currentMonth')" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('agent.reasonForApplication')"
        :placeholder="$t('agent.pleaseEnterTheReasonForApplication')"
        prop="applicantMark"
        :rules="[
          {
            required: true,
            message: $t('agent.pleaseEnterTheReasonForApplication'),
            trigger: 'blur'
          }
        ]">
        <el-input
          v-model="queryParams.applicantMark"
          :rows="6"
          maxlength="500"
          :placeholder="$t('agent.pleaseEnterTheReasonForApplication')"
          show-word-limit
          type="textarea"
          style="width: 300px" />
      </el-form-item>

      <el-form-item style="margin: 30px 0px 0px 350px">
        <!-- <el-button style="width: 80px" @click="cancel">{{ $t('agent.cancel') }}</el-button> -->
        <el-button style="width: 80px" type="primary" @click="onSubmit">{{
          $t('agent.ensure')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import {
  addAgentAdjustment,
  getWalletBalance,
  getCreditWalletStatusApi
} from '@/api/agent/agentList'
import useUserStore from '@/store/modules/user'
import i18n from '@/i18n'

const user = useUserStore()
const { proxy } = getCurrentInstance()
const props = defineProps([
  'fund_adjust_type',
  'agent_fund_adjust_add_reason',
  'agent_fund_adjust_sub_reason'
])

const CurUnit = computed(() => {
  let site = import.meta.env.VITE_SITE
  switch (site) {
    case 'cn':
      return '￥'
    case 'vietnam':
      return '₫'
    case 'en':
      return '￥'
    default:
      return '￥'
  }
})
//减额原因下拉
const queryRef = ref(null)
const queryParams = ref({
  adjustMoney: null,
  adjustMonth: null,
  adjustReason: null,
  adjustType: null,
  agentName: null,
  applicantMark: null,
  walletType: null,
  balance: null
})

const labelPosition = ref('right')

const options = [
  {
    value: 0,
    label: i18n.global.t('agent.quotaWallet')
  },
  {
    value: 1,
    label: i18n.global.t('agent.creditWallet')
  },
  {
    value: 2,
    label: i18n.global.t('agent.companyWinLose')
  },
  {
    value: 3,
    label: i18n.global.t('agent.withdrawLimit')
  }
]
const adjustReasonList = ref([]) // 调整下拉原因
//调整类型联动选择，生成不同的调整原因下拉

function adjustTypeChange(val) {
  if (val === '0') {
    adjustReasonList.value = props.agent_fund_adjust_add_reason
  } else if (val === '1') {
    adjustReasonList.value = props.agent_fund_adjust_sub_reason
  } else {
    adjustReasonList.value = []
  }
  queryParams.value.adjustReason = null
}
// 当input值发生改变时清空

const changeWallet = () => {
  console.log('cnm')
  queryParams.value.adjustReason = null
  queryParams.value.adjustType = null
}

//查询余额
const isCredit = ref(false)
const checkMemberWallet = async () => {
  queryRef.value.clearValidate()
  if (queryParams.value.walletType == null) {
    proxy.$modal.msgError(i18n.global.t('agent.pleaseSelectWalletType'))
    return
  }
  try {
    getCreditWalletStatusApi({ agentName: queryParams.value.agentName }).then((res) => {
      if (res.creditWalletStatus === 0) {
        isCredit.value = true
      } else {
        isCredit.value = false
      }
      getWalletBalance({
        agentName: queryParams.value.agentName,
        walletType: queryParams.value.walletType
      }).then((res) => {
        if (queryParams.value.walletType === 1) {
          isCredit.value
            ? (queryParams.value.balance = res)
            : (queryParams.value.balance = '该账户未开启信用额度')
        } else {
          queryParams.value.balance = res
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}

// 提交用户调整
function onSubmit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      queryParams.value.applicant = user.userInfo.userName
      addAgentAdjustment(queryParams.value).then(() => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.addSuccessfully'))
        queryParams.value = {
          adjustMoney: null,
          adjustMonth: null,
          adjustReason: null,
          adjustType: null,
          agentName: null,
          applicantMark: null,
          walletType: null,
          balance: null
        }
      })
    } else {
      return
    }
  })
}

// 调整金额校验
const adjustMoneyVlia = (rule, value, callback) => {
  let money = queryParams.value.adjustMoney
  if (queryParams.value.adjustType == 1 && money > queryParams.value.balance) {
    callback(new Error('调整类型为减额时，调整金额不能大于账号余额'))
  } else {
    callback()
  }
}

// 校验信用钱包
const valiBalance = (rule, value, callback) => {
  if (queryParams.value.walletType === 1) {
    if (isCredit.value) {
      callback()
    } else {
      callback(new Error('该账户未开启信用额度'))
    }
  } else {
    callback()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  border: 1px solid #f2f2f2;
  width: 683px;
  margin: 0 auto;
  padding-left: 130px;
}
</style>
