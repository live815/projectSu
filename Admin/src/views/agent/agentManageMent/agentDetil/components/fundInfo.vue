<template>
  <div class="fundInfo-container" v-if="!load">
    <!-- header -->
    <div class="fundInfo-header-row">
      <div class="left-box">
        <div class="black-box">{{ $t('agent.financialInformation') }}</div>
        <el-button type="primary" @click="refresh">{{ $t('agent.refresh') }}</el-button>
      </div>
    </div>
    <!-- 钱包余额 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.walletBalanceQuot') }}</div>
      <el-row>
        <el-col :span="4"
          >{{ $t('agent.quotaBalance') }}{{ formData.availableBalance.toFixed(2) }}</el-col
        >
        <el-col :span="4"
          >{{ $t('agent.withdrawalFrozenLimitBalance')
          }}{{ formData.availableBalanceFreeze.toFixed(2) }}</el-col
        >
        <el-col :span="4"
          >{{ $t('agent.totalCredit') }}{{ formData.creditBalanceTotal.toFixed(2) }}</el-col
        >
        <el-col :span="4"
          >{{ $t('agent.creditBalance') }}{{ formData.creditBalance.toFixed(2) }}</el-col
        >
        <el-col :span="4"
          >{{ $t('agent.withdrawLimit') }}：{{
            formData?.withdrawalBalance ? formData?.withdrawalBalance.toFixed(2) : '0.00'
          }}</el-col
        >
      </el-row>
    </div>
    <!-- 充提信息 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.depositAndWithdrawal') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.totalWithdrawalAmount')
          }}{{ formData.totalWithdrawalAmount.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfWithdrawals') }}{{ formData.totalWithdrawalNums }}</el-col
        >
      </el-row>
    </div>
    <!-- 佣金信息 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.commissionInformation') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.cumulativeCommissionCollected')
          }}{{ formData.commissionChargeTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.cumulativeCommissionIssued')
          }}{{ formData.commissionIssuedTotal.toFixed(2) }}</el-col
        >
      </el-row>
    </div>
    <!-- 额度代存信息 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.creditDepositInformation') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.totalDepositAmount') }}{{ formData.depositaryTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalDepositedBonus')
          }}{{ formData.depositDividendTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalCommissionIssued')
          }}{{ formData.commissionIssuedTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalTransferAmount') }}{{ formData.transferTotal.toFixed(2) }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.numberOfDepositsAndRecharges') }} {{ formData.depositaryNums }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfDepositedBonuses') }}{{ formData.depositDividendNums }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfCommissionsIssued') }}{{ formData.commissionIssuedNums }}</el-col
        >
        <el-col :span="6">{{ $t('agent.numberOfTransfers') }}{{ formData.transferNums }}</el-col>
      </el-row>
    </div>
    <!-- 信用代存信息 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.creditDepositInformationQuery') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.totalDepositAmount')
          }}{{ formData.creditDepositaryTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalDepositedBonus')
          }}{{ formData.creditDepositDividendTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalCommissionIssued')
          }}{{ formData.creditCommissionIssuedTotal.toFixed(2) }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalTransferAmount')
          }}{{ formData.creditTransferTotal.toFixed(2) }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.numberOfDepositsAndRecharges') }}{{ formData.creditDepositaryNums }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfDepositedBonuses')
          }}{{ formData.creditDepositDividendNums }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfCommissionsIssued')
          }}{{ formData.creditCommissionIssuedNums }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfTransfers') }}{{ formData.creditTransferNums }}</el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { getAgentFundDetailtApi } from '@/api/agent/agentList.js'
import { useRoute } from 'vue-router'
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
const route = useRoute()
const formData = ref({})
const load = ref(true)
onMounted(() => {
  getData()
})

const getData = () => {
  getAgentFundDetailtApi(route.query.id).then((res) => {
    formData.value = res
    load.value = false
  })
}
const refresh = () => {
  getAgentFundDetailtApi(route.query.id).then((res) => {
    formData.value = res
    proxy.$modal.msgSuccess(i18n.global.t('system.RefreshSuccess'))
  })
}
</script>

<style lang="scss" scoped>
* {
  font-size: 17px;
}

.fundInfo-container {
  padding: 15px;
}

.fundInfo-header-row {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 10px;
}

.left-box {
  display: flex;
  align-items: center;
  gap: 30px;
  height: 50px;
  width: 350px;

  .black-box {
    text-align: center;
    width: 200px;
    height: 45px;
    background-color: black;
    color: white;
    line-height: 45px;
  }
}

.title {
  font-size: 20px;
  font-weight: 600;
  line-height: 60px;
}

.info-row-container {
  width: 1800px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(235, 235, 235);

  div {
    line-height: 40px;
  }
}
</style>
