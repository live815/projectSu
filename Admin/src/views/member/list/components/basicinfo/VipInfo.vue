<template>
  <div class="basic-info-vip-info">
    <h3 class="h3-title">{{ $t('member.vipInformation') }}</h3>
    <el-row :gutter="30" style="align-items: center;">
      <el-col :span="20" class="vip-progress">
        <div class="upgrade">
          <div class="upgrade-header">
            <span>{{ $t('member.left') }}</span>
            <span>{{ percentageUpgradeLeft }}</span>
          </div>
          <el-progress :percentage="percentageUpgrade" color="#409eff" />
          <div class="upgrade-header">
            <span>{{ $t('member.upgradeCurrenDp') }}</span>
            <span>{{queryParams.upgradeCurrenDp||0}}/{{ queryParams.upgradeLeastDp||0 }}</span>
          </div>
        </div>
        <div class="upgrade">
          <div class="upgrade-header">
            <span>{{ $t('member.left') }}</span>
            <span>{{ percentageUpgradeTurnOverLeft }}</span>
          </div>
          <el-progress :percentage="percentageUpgradeTurnOver" color="#409eff" />
          <div class="upgrade-header">
            <span>{{ $t('member.upgradeCurrenTurnover') }}</span>
            <span>{{props.queryParams.upgradeCurrenTurnover||0}}/{{ queryParams.upgradeLeastTurnover||0 }}</span>
          </div>
        </div>
        <div class="upgrade">
          <div class="upgrade-header">
            <span>{{ $t('member.keepLevelLeft') }}</span>
            <span>{{ percentageRelegationLeft }}</span>
          </div>
          <el-progress :percentage="percentageRelegation" color="#409eff" />
          <div class="upgrade-header">
            <span>({{ queryParams.relegationValidDate }}){{ $t('member.validBet') }}</span>
            <span>{{queryParams.relegationCurrenTurnover||0}}/{{ queryParams.relegationLeastTurnover||0 }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <span>{{ $t('member.vipLevel') }}</span>
        <span class="ml-16">{{queryParams.vipName||"-"}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const props = defineProps(["queryParams"]);

//升级存款比例
const percentageUpgrade = computed(()=>{
  if(!props.queryParams.upgradeLeastDp) return 0
  const percent = parseFloat(((props.queryParams.upgradeCurrenDp/props.queryParams.upgradeLeastDp)*100).toFixed(2)) || 0
  return percent > 100 ? 100 : percent
})
//升级存款剩余
const percentageUpgradeLeft = computed(()=>{
  const min = props.queryParams.upgradeLeastDp-props.queryParams.upgradeCurrenDp
  return min > 0 ? min : 0
})
//升级流水比例
const percentageUpgradeTurnOver = computed(()=>{
  if(!props.queryParams.upgradeLeastTurnover) return 0
  const percent = parseFloat(((props.queryParams.upgradeCurrenTurnover/props.queryParams.upgradeLeastTurnover)*100).toFixed(2))||0
  return percent>100 ? 100 : percent
})
//升级存款剩余
const percentageUpgradeTurnOverLeft = computed(()=>{
  const min = props.queryParams.upgradeLeastTurnover-props.queryParams.upgradeCurrenTurnover
  return  min > 0 ? min : 0
})
//保级剩余比例
const percentageRelegation = computed(()=>{
  if(!props.queryParams.relegationLeastTurnover) return 0
  const percent = parseFloat(((props.queryParams.relegationCurrenTurnover/props.queryParams.relegationLeastTurnover)*100).toFixed(2))||0
  return percent > 100 ? 100 : percent
})
//保级剩余
const percentageRelegationLeft = computed(()=>{
  const min = props.queryParams.relegationLeastTurnover-props.queryParams.relegationCurrenTurnover
  return  min > 0 ? min : 0
})
</script>

<style lang="scss" scoped>
.basic-info-vip-info {
  .h3-title {
    font-size: 16px;
    font-weight: 600;
  }
  .vip-progress {
    display: flex;
    justify-content: space-between;
    border-right:1px solid #EEE;
    .upgrade {
      width: 35%;
      .upgrade-header,
      .upgrade-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        width: calc(100% - 50px);
      }
    }
    .relegation {
      width: 45%;
    }
  }
}
</style>
