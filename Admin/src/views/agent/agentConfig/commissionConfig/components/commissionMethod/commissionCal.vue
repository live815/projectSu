<template>
  <div>
    <div class="title">
      {{ $t('agent.calculationFormula') }}
      <span class="blue" @click="openDialog({ type: 12 })">{{ $t('agent.edit') }}</span>
    </div>
    <div class="type-text">{{ describeText }}</div>

    <div class="descri-container">
      <el-descriptions direction="vertical" border width="360px">
        <el-descriptions-item :label="$t('agent.parameterType')" width="120px">
          <div class="item-row">{{ $t('agent.profitRatio') }}</div>
          <div class="item-row">{{ $t('agent.rebateRatio') }}</div>
          <div class="item-row">{{ $t('agent.lobbyFeeRatio') }}</div>
          <div class="item-row">{{ $t('agent.activeUserDefinition') }}</div>
          <div class="item-row">{{ $t('agent.thisMonthProfitUnderZero') }}</div>
          <div class="item-row">{{ $t('agent.depositWithdrawFee') }}</div>
          <div class="item-row">{{ $t('agent.bearProfitsRatio') }}</div>
          <div class="item-row">{{ $t('agent.creditDepositRatio') }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('agent.parameter')" width="120px">
          <div class="item-row mid">
            <div>
              {{ methodData.bonusRatio }}%<el-icon
                size="20"
                color="#409EFF"
                @click="openDialog({ type: 3 })"
                ><Edit
              /></el-icon>
            </div>
          </div>
          <div class="item-row mid">
            <div>
              {{ methodData.rebateRatio }}%<el-icon
                size="20"
                color="#409EFF"
                @click="openDialog({ type: 4 })"
                ><Edit
              /></el-icon>
            </div>
          </div>
          <div class="item-row mid">
            <div>
              {{ methodData.venueRatio }}%<el-icon
                size="20"
                color="#409EFF"
                @click="openDialog({ type: 5 })"
                ><Edit
              /></el-icon>
            </div>
            <el-radio-group class="ml-4" v-model="radioGroup.venueType" @change="changeRadio">
              <el-radio :label="1">{{ $t('agent.calculationMemberProfitsUnderZero') }}</el-radio>
              <el-radio :label="2">{{ $t('agent.calculationMemberProfitsAll') }}</el-radio>
            </el-radio-group>
          </div>
          <div class="item-row mid">
            <div>
              {{ $t('agent.activeUserRechargeAmount') }}：{{ methodData.activeUserRechargeAmount
              }}<el-icon size="20" color="#409EFF" @click="openDialog({ type: 8 })"
                ><Edit
              /></el-icon>
            </div>
            <div>
              {{ $t('agent.activeUserValidAmount') }}：{{ methodData.activeUserValidAmount }}
            </div>
            <div>3.月累计有效注单笔数：{{ methodData.activeUserBetNums }}</div>
            <el-radio-group v-model="radioGroup.activeUserType" @change="changeRadio">
              <el-radio :label="1">{{ $t('agent.enoughEveryOneItem') }}</el-radio>
              <el-radio :label="2">{{ $t('agent.enoughBothThree') }}</el-radio>
            </el-radio-group>
          </div>
          <div class="item-row mid">
            <el-radio-group v-model="radioGroup.accumulate" @change="changeRadio">
              <el-radio :label="true">{{ $t('agent.grandTotal') }}</el-radio>
              <el-radio :label="false">{{ $t('agent.donotAccumulate') }}</el-radio>
            </el-radio-group>
          </div>
          <div class="item-row mid">
            <div>
              {{ $t('agent.depositFeeRatio') }}
              {{ methodData.depositFeeRatio }}%<el-icon
                size="20"
                color="#409EFF"
                @click="openDialog({ type: 9 })"
                ><Edit
              /></el-icon>
            </div>
            <div>
              {{ $t('agent.withdrawFeeRatio') }}
              {{ methodData.withdrawFeeRatio }}%
            </div>
          </div>
          <div class="item-row mid">
            <div>
              {{ methodData.substituteBonusRatio }}%<el-icon
                size="20"
                color="#409EFF"
                @click="openDialog({ type: 6 })"
                ><Edit
              /></el-icon>
            </div>
          </div>
          <div class="item-row mid">
            <div>
              {{ methodData.creditSubstituteBonusRatio }}%<el-icon
                size="20"
                color="#409EFF"
                @click="openDialog({ type: 7 })"
                ><Edit
              /></el-icon>
            </div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('agent.parameterFunction')" width="120px">
          <div class="item-row mid">{{ $t('agent.agentProfitRatio') }}</div>
          <div class="item-row mid">{{ $t('agent.agentRebateRatio') }}</div>
          <div class="item-row mid">{{ $t('agent.agentLobbyCost') }}</div>
          <div class="item-row mid">{{ $t('agent.activeUserDefinition') }}</div>
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
</template>

<script setup>
import {} from '@/utils'
import { deepCopy } from '@/utils'
const props = defineProps({
  currentMethodData: {
    type: Object,
    default: {}
  },
  algorithmList: {
    type: Array,
    default: []
  }
})

const methodData = ref({})
const emit = defineEmits(['handleOpenDialog', 'toEdit'])
const changeRadio = () => {
  emit('toEdit', radioGroup.value, true)
}
// 打开弹窗
const openDialog = (val) => {
  console.log(val)
  emit('handleOpenDialog', val)
}
const radioGroup = ref({
  accumulate: '',
  activeUserType: '',
  venueType: ''
})
onMounted(() => {
  methodData.value = deepCopy(props.currentMethodData)
  const { accumulate, activeUserType, venueType } = methodData.value
  radioGroup.value = { accumulate, activeUserType, venueType }
})
const describeText = computed(() => {
  const matchedItem = props.algorithmList.find(
    (item) => props.currentMethodData.algorithmId === item.id
  )

  if (matchedItem) {
    return matchedItem.algorithm
  } else {
    return ''
  }
})
watch(
  props,
  (val) => {
    methodData.value = deepCopy(props.currentMethodData)
    const { accumulate, activeUserType, venueType } = methodData.value
    radioGroup.value = { accumulate, activeUserType, venueType }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.item-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 110px;

  border-bottom: 1px solid rgb(215, 215, 215);
}
.descri-container {
  width: 900px;
}
.mid {
  align-items: center;
  white-space: nowrap;
}
i {
  margin-left: 5px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  font-weight: 600;
}
.blue {
  color: rgb(64, 158, 255);
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  margin-left: 45px;
  text-decoration: underline;
  cursor: pointer;
}
:deep() {
  .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
    border: none;
    padding: 0;
  }
  .is-vertical-label {
    height: 40px;
    text-align: center !important;
  }

  .el-icon {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
