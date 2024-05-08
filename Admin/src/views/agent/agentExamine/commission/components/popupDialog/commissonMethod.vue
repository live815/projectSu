<template>
  <div>
    <!-- 佣金档位 -->
    <div>
      <div class="sub-title">{{ $t('agent.commissionLevel') }}</div>
      <el-table :data="tableData.commissionGearList">
        <el-table-column prop="seq" :label="$t('agent.gear')" width="180" />
        <el-table-column prop="activeNumber" :label="$t('agent.activeUser')" width="180">
          <template #default="{ row }">
            <span>≥ {{ row.activeNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="winLose" :label="$t('agent.companyWinLose')" width="180">
          <template #default="{ row }">
            <span>≥ {{ row.activeNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ratio" :label="$t('agent.commissionRate')" width="180">
          <template #default="{ row }">
            <span> {{ (row.ratio * 100).toFixed(2) }}%</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 计算公式 -->
    <div class="commisson-cal">
      <div class="sub-title">{{ $t('agent.calculationFormula') }}</div>
      <div>{{ tableData.algorithmContent }}</div>
      <div class="descri-container">
        <el-descriptions direction="vertical" border width="360px">
          <el-descriptions-item :label="$t('agent.parameterType')" width="120px">
            <div class="item-row">{{ $t('agent.profitRatio') }}</div>
            <div class="item-row">{{ $t('agent.rebateRatio') }}</div>
            <div class="item-row">{{ $t('agent.lobbyFeeRatio') }}</div>
            <div class="item-row">{{ $t('agent.activeUserDefinition') }}</div>
            <div class="item-row">
              {{ $t('agent.thisMonthProfitUnderZero') }}
            </div>
            <div class="item-row">{{ $t('agent.depositWithdrawFee') }}</div>
            <div class="item-row">{{ $t('agent.bearProfitsRatio') }}</div>
            <div class="item-row">{{ $t('agent.creditDepositRatio') }}</div>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('agent.parameter')" width="120px">
            <div class="item-row mid">
              <div>{{ (tableData.bonusRatio * 100).toFixed(2) }}%</div>
            </div>
            <div class="item-row mid">
              <div>{{ (tableData.rebateRatio * 100).toFixed(2) }}%</div>
            </div>
            <div class="item-row mid">
              <div>{{ (tableData.venueRatio * 100).toFixed(2) }}%</div>
              <el-radio-group class="ml-4" v-model="tableData.venueType" disabled>
                <el-radio :label="1">{{ $t('agent.calculationMemberProfitsUnderZero') }}</el-radio>
              </el-radio-group>
            </div>
            <div class="item-row mid">
              <div>
                {{ $t('agent.activeUserRechargeAmount') }}：{{
                  tableData.activeUserRechargeAmount.split('.')[0]
                }}
              </div>
              <div>
                {{ $t('agent.activeUserValidAmount') }}：{{
                  tableData.activeUserValidAmount.split('.')[0]
                }}
              </div>
              <div>3.月累计有效注单笔数：{{ tableData.activeUserBetNums }}</div>
              <el-radio-group v-model="tableData.activeUserType" disabled>
                <el-radio :label="1">{{ $t('agent.enoughEveryOneItem') }}</el-radio>
                <el-radio :label="2">{{ $t('agent.enoughBothThree') }}</el-radio>
              </el-radio-group>
            </div>
            <div class="item-row mid">
              <el-radio-group v-model="tableData.accumulate" disabled>
                <el-radio :label="true">{{ $t('agent.grandTotal') }}</el-radio>
                <el-radio :label="false">{{ $t('agent.donotAccumulate') }}</el-radio>
              </el-radio-group>
            </div>
            <div class="item-row mid">
              <div>
                {{ $t('agent.depositFeeRatio') }}
                {{ (tableData.depositFeeRatio * 100).toFixed(2) }}%
              </div>
              <div>
                {{ $t('agent.withdrawFeeRatio') }}
                {{ (tableData.withdrawFeeRatio * 100).toFixed(2) }}%
              </div>
            </div>
            <div class="item-row mid">
              <div>{{ (tableData.substituteBonusRatio * 100).toFixed(2) }}%</div>
            </div>
            <div class="item-row mid">
              <div>{{ (tableData.creditSubstituteBonusRatio * 100).toFixed(2) }}%</div>
            </div>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('agent.parameterFunction')" width="120px">
            <div class="item-row mid">{{ $t('agent.agentProfitRatio') }}</div>
            <div class="item-row mid">{{ $t('agent.agentRebateRatio') }}</div>
            <div class="item-row mid">{{ $t('agent.agentLobbyCost') }}</div>
            <div class="item-row mid">
              {{ $t('agent.activeUserDefinition') }}
            </div>
            <div class="item-row mid">
              {{ $t('agent.thisMonthProfitUnderZero') }}
            </div>
            <div class="item-row mid">
              {{ $t('agent.agentDepositWithdrawFeeCost') }}
            </div>
            <div class="item-row mid">
              {{ $t('agent.agentDepositProfitsCost') }}
            </div>
            <div class="item-row mid">{{ $t('agent.agentCreditCost') }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <!-- 场馆费率 -->
    <div>
      <div class="sub-title">{{ $t('agent.lobbyFeeRate') }}</div>
      <div class="center">
        <el-table
          :data="tableData.venueRateConfigList"
          style="width: 500px; border: 1px solid #d3d3d3"
          :empty-text="$t('member.noData')"
        >
          <el-table-column prop="lobbyName" :label="$t('agent.lobbyName')" />
          <el-table-column prop="ratio" :label="$t('agent.chargeRate')">
            <template #default="{ row }"> {{ (row.ratio * 100).toFixed(2) }}% </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {} from '@/utils'
const props = defineProps({
  tableData: Object
})
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 19px;
  margin-bottom: 10px;
}

.item-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  border-bottom: 1px solid rgb(215, 215, 215);
}

.mid {
  align-items: center;
  white-space: nowrap;
}
.commisson-cal {
  margin-top: 25px;
  margin-bottom: 25px;
}
.center {
  display: flex;
  justify-content: center;
}

:deep() {
  .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
    font-size: 13px;
    border: none;
    padding: 0;
  }
  .is-vertical-label {
    height: 40px;
    text-align: center !important;
  }
}
</style>
