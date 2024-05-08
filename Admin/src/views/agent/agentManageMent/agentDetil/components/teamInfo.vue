<template>
  <div class="teamInfo-container">
    <!-- header -->
    <div class="teamInfo-header-row">
      <div class="left-box">
        <div class="black-box">{{ $t('agent.teamInformation') }}</div>
        <el-button type="primary">{{ $t('agent.refresh') }}</el-button>
        <div class="month-box">
          <span :class="monthFlag == 1 ? 'month  active' : 'month'" @click="changeMonth(1)">{{
            $t('agent.thisMonth')
          }}</span>
          <span :class="monthFlag == 1 ? 'month' : 'month active'" @click="changeMonth(0)">{{
            $t('agent.lastMonth')
          }}</span>
        </div>
      </div>
    </div>
    <!-- 团队概览 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.teamOverview') }}</div>
      <el-row>
        <el-col :span="6">
          <el-popover
            placement="top"
            title="注释"
            :width="240"
            trigger="click"
            content="展示所有下级代理人数，包含自己">
            <template #reference>
              <el-icon><Warning /></el-icon>
            </template>
          </el-popover>

          {{ $t('agent.numberOfSubordinateAgents') }}{{ teamInfo.subProxyNums || '0' }}
        </el-col>
        <el-col :span="6">
          <el-popover
            placement="top"
            title="注释"
            :width="240"
            trigger="click"
            content="展示所有下级代理人数，包含自己">
            <template #reference>
              <el-icon><Warning /></el-icon>
            </template>
          </el-popover>
          {{ $t('agent.numberOfDirectAgents') }}{{ teamInfo.directProxyNums || '0' }}</el-col
        >
        <el-col :span="6">
          <el-popover
            placement="top"
            title="注释"
            :width="220"
            trigger="click"
            content="展示下级代理的所有会员人数">
            <template #reference>
              <el-icon><Warning /></el-icon>
            </template>
          </el-popover>
          {{ $t('agent.numberOfSubordinate') }}{{ teamInfo.subMemberNums || '0' }}</el-col
        >
        <el-col :span="6">
          <el-popover
            placement="top"
            title="注释"
            :width="220"
            trigger="click"
            content="展示直属代理的所有会员人数">
            <template #reference>
              <el-icon><Warning /></el-icon>
            </template>
          </el-popover>
          {{ $t('agent.subordinateAgentMembers') }}{{ teamInfo.directMemberNums || '0' }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.numberOfActive') }}{{ teamInfo.subActiveMemberNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.numberOfActiveTeamMembers')
          }}{{ teamInfo.teamActiveMemberNums || '0' }}</el-col
        >
      </el-row>
    </div>
    <!-- 团队新增 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.teamAdded') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.newLowerLevelAgentsAddedToday')
          }}{{ teamInfo.todaySubProxyAddNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.todaysDirectAgentsAdded')
          }}{{ teamInfo.todayDirectProxyAddNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.newLowerLevelAgents') }}{{ teamInfo.monthSubProxyAddNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.directAgentAdded') }}{{ teamInfo.monthDirectProxyAddNums || '0' }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.newLowerLevelMembersAddedToday')
          }}{{ teamInfo.todaySubProxyMemberAddNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.newDirectMembersAddedToday')
          }}{{ teamInfo.todayDirectProxyMemberAddNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.newLowerLevelMembers')
          }}{{ teamInfo.monthSubProxyMemberAddNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.directMembersAdded')
          }}{{ teamInfo.monthDirectProxyMemberAddNums || '0' }}</el-col
        >
      </el-row>
    </div>
    <!-- 会员质量 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.memberQuality') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.numberOfActivePeopleThisMonth')
          }}{{ teamInfo.monthSubActiveMemberNums || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.newActivePeopleThisMonth')
          }}{{ teamInfo.monthSubActiveMemberAddNums || '0' }}</el-col
        >
      </el-row>
    </div>
    <!-- 会员盈亏信息 -->
    <div class="info-row-container">
      <div class="title">{{ $t('agent.memberProfitAndLossInformation') }}</div>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.totalBetAmount') }}{{ teamInfo.orderAmountTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalValidBets') }}{{ teamInfo.validBetTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalBettingProfitAndLoss')
          }}{{ teamInfo.betProfitLossTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalDepositedBonus') }}{{ teamInfo.depositDividendTotal || '0' }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.totalRewardQuote') }}{{ teamInfo.rebateTotal || '0' }}</el-col
        >
        <el-col :span="6">
          {{ $t('agent.totalActivityBonus') }}{{ teamInfo.dividendTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalAdjustments') }}{{ teamInfo.adjustTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalDepositAmount') }}{{ teamInfo.depositAmountTotal || '0' }}</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >{{ $t('agent.totalDepositTransferAmount')
          }}{{ teamInfo.depositTransferTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalCreditDepositBonus')
          }}{{ teamInfo.creditDepositDividendTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalCreditDepositRechargeAmount')
          }}{{ teamInfo.creditDepositAmountTotal || '0' }}</el-col
        >
        <el-col :span="6"
          >{{ $t('agent.totalCreditDepositTransferAmount')
          }}{{ teamInfo.creditDepositTransferTotal || '0' }}</el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { getAgentTeamInfoApi } from '@/api/agent/agentList.js'
import { useRoute } from 'vue-router'
const route = useRoute()
const monthFlag = ref(1)
const teamInfo = ref({})
onMounted(() => {
  getTeamInfo()
})

const getTeamInfo = () => {
  getAgentTeamInfoApi(route.query.id, monthFlag.value)
    .then((res) => {
      teamInfo.value = res
    })
    .catch((err) => {
      console.log(err)
    })
}
const changeMonth = (num) => {
  monthFlag.value = num
  getTeamInfo()
}
</script>

<style lang="scss" scoped>
* {
  font-size: 17px;
}

.teamInfo-container {
  padding: 15px;
}

.teamInfo-header-row {
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

  .black-box {
    text-align: center;
    width: 200px;
    height: 45px;
    background-color: black;
    color: white;
    line-height: 45px;
  }

  .month-box {
    display: flex;
    gap: 20px;
  }

  .month {
    width: 50px;
    cursor: pointer;
  }

  .active {
    color: rgb(96, 174, 255);
  }
}

.title {
  font-size: 20px;
  font-weight: 600;
  line-height: 60px;
}

.info-row-container {
  width: 1300px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(235, 235, 235);

  div {
    line-height: 40px;
  }
}
</style>
