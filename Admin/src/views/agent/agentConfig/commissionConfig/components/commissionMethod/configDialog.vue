<template>
  <div>
    <div class="title">{{ titleText }}</div>
    <!-- 新建方案 -->
    <div v-if="dialogType.type == 1 && load == false" style="padding-top: 20px">
      <el-form
        label-width="auto"
        label-position="right"
        ref="initMethodForm"
        :rules="initMethodRule"
        :model="initMethodData"
      >
        <el-form-item :label="$t('agent.planName')" prop="planName">
          <el-input style="width: 300px" v-model="initMethodData.planName" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑档位 -->
    <div class="body" v-if="dialogType.type == 2 && load == false">
      <el-form
        label-width="auto"
        label-position="right"
        :rules="commissionLevel"
        :model="commissionLevelData"
        ref="commissionLevelFrom"
      >
        <el-form-item :label="$t('agent.gearQuote')" prop="seq">
          <el-input v-model="commissionLevelData.seq" style="width: 300px" />
        </el-form-item>
        <el-form-item :label="$t('agent.activeMemberNumber')" prop="activeNumber">
          <el-input
            v-model="commissionLevelData.activeNumber"
            :placeholder="$t('agent.pleaseInput')"
            style="width: 300px"
          >
            <template #prepend>
              <span>&ge;</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('agent.winAndLoseOfEveryMonth')" prop="winLose">
          <el-input
            v-model="commissionLevelData.winLose"
            style="width: 300px"
            :placeholder="$t('agent.pleaseInput')"
            maxlength="16"
          />
        </el-form-item>
        <el-form-item :label="$t('agent.commissionRateQuote')" prop="ratio">
          <el-input
            v-model="commissionLevelData.ratio"
            style="width: 300px"
            :placeholder="$t('agent.pleaseInput')"
          >
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增档位 -->
    <div class="body" v-if="dialogType.type == 10 && load == false">
      <el-form
        label-width="auto"
        label-position="right"
        :rules="newLevelLevel"
        :model="newLevel"
        ref="newLevelForm"
      >
        <el-form-item :label="$t('agent.gearQuote')" prop="seq">
          <el-input v-model="newLevel.seq" style="width: 300px" />
        </el-form-item>
        <el-form-item :label="$t('agent.activeMemberNumber')" prop="activeNumber">
          <el-input
            v-model="newLevel.activeNumber"
            :placeholder="$t('agent.pleaseInput')"
            style="width: 300px"
          >
            <template #prepend>
              <span>&ge;</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('agent.winAndLoseOfEveryMonth')" prop="winLose">
          <el-input
            v-model="newLevel.winLose"
            style="width: 300px"
            :placeholder="$t('agent.pleaseInput')"
            maxlength="16"
          />
        </el-form-item>
        <el-form-item :label="$t('agent.commissionRateQuote')" prop="ratio">
          <el-input
            v-model="newLevel.ratio"
            style="width: 300px"
            :placeholder="$t('agent.pleaseInput')"
          >
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑计算方法 -->
    <div class="body">
      <el-form
        label-width="auto"
        label-position="right"
        v-if="load == false"
        ref="fromData"
        :rules="fromDataRule"
        :model="requestData"
      >
        <el-form-item
          :label="$t('agent.calculationFormulaNoQuote')"
          prop=""
          v-if="statusCode == 12"
        >
          <el-select v-model="mathMethod" class="m-2" placeholder="Select">
            <el-option
              v-for="item in mathList"
              :key="item.id"
              :label="item.algorithmName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('agent.profitRatio')" prop="bonusRatio" v-if="statusCode == 3">
          <el-input style="width: 300px" v-model="requestData.bonusRatio">
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('agent.rebateRatio')"
          prop="rebateRatio"
          v-if="dialogType.type == 4"
        >
          <el-input v-model="requestData.rebateRatio" style="width: 300px">
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('agent.lobbyFeeRatio')"
          prop="venueRatio"
          v-if="dialogType.type == 5"
        >
          <el-input v-model="requestData.venueRatio" style="width: 300px">
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('agent.bearProfitsRatio')"
          prop="substituteBonusRatio"
          v-if="dialogType.type == 6"
        >
          <el-input v-model="requestData.substituteBonusRatio" style="width: 300px">
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('agent.creditDepositRatio')"
          prop="creditSubstituteBonusRatio"
          v-if="dialogType.type == 7"
        >
          <el-input v-model="requestData.creditSubstituteBonusRatio" style="width: 300px">
            <template #append>
              <span>%</span>
            </template>
          </el-input>
        </el-form-item>
        <div v-if="dialogType.type == 8">
          <el-form-item :label="$t('agent.rechargeAmount')" prop="activeUserRechargeAmount">
            <el-input
              v-model="requestData.activeUserRechargeAmount"
              style="width: 300px"
              maxlength="16"
            >
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('agent.validBet')" prop="activeUserValidAmount">
            <el-input
              v-model="requestData.activeUserValidAmount"
              style="width: 300px"
              maxlength="16"
            >
            </el-input>
          </el-form-item>
          <el-form-item :label="'月累计有效注单笔数'" prop="activeUserBetNums">
            <el-input v-model="requestData.activeUserBetNums" style="width: 300px" maxlength="4">
            </el-input>
          </el-form-item>
        </div>
        <div v-if="dialogType.type == 9">
          <el-form-item :label="$t('agent.depositFeeRate')" prop="depositFeeRatio">
            <el-input v-model="requestData.depositFeeRatio" style="width: 300px" maxlength="5">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('agent.withdrawFeeRate')" prop="withdrawFeeRatio">
            <el-input v-model="requestData.withdrawFeeRatio" style="width: 300px" maxlength="5">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div v-if="dialogType.type == 11">
          <el-form
            label-width="auto"
            label-position="right"
            v-if="load == false"
            ref="venueRatioForm"
            :rules="venueRatioRule"
            :model="venueRatioData"
          >
            <el-form-item :label="$t('agent.lobbyName')">
              <el-input v-model="venueRatioData.lobbyName" style="width: 300px" disabled>
                <template #append>
                  <span>%</span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('agent.chargeRate')" prop="ratio">
              <el-input v-model="venueRatioData.ratio" style="width: 300px" :maxlength="5">
                <template #append>
                  <span>%</span>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-form>
    </div>
    <!-- 编辑方案名称 -->
    <div v-if="dialogType.type == 13 && load == false" style="padding-top: 20px">
      <el-form
        label-width="auto"
        label-position="right"
        ref="planNameform"
        :rules="planNameform"
        :model="requestData"
      >
        <el-form-item :label="$t('agent.planName')" prop="planName">
          <el-input style="width: 300px" v-model.trim="requestData.planName" />
        </el-form-item>
      </el-form>
    </div>

    <div class="footer-btn">
      <el-button @click="close">{{ $t('agent.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('agent.submit') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
const { proxy } = getCurrentInstance()
import { getCommissonMethodListApi, getVenueList } from '@/api/agent/agentConfig'
import { deepCopy } from '@/utils'
const props = defineProps({
  dialogType: {
    type: Object,
    default: {}
  },
  currentMethodData: {
    type: Object,
    default: {}
  },
  currentRow: {
    type: Object,
    default: {}
  },
  methodList: {
    type: Array || Object
  }
})
const initMethodForm = ref(null)
const commissionLevelFrom = ref(null)
const venueRatioForm = ref(null)
const newLevelForm = ref(null)
const planNameform = ref(null)
const emit = defineEmits(['handleCloseDialog', 'toEdit', 'toEditVenue', 'addMethod'])
const requestData = ref()
const commissionLevelData = ref()
const fromData = ref()
const venueRatioData = ref({})

const statusCode = computed(() => {
  if (props.dialogType.type) {
    return props.dialogType.type
  } else {
    return 0
  }
})
onMounted(async () => {
  requestData.value = deepCopy(props.currentMethodData)
  delete requestData.value.venueRateConfigList
  if (props.dialogType.type == 2) {
    commissionLevelData.value = requestData.value.commissionGearList[props.dialogType.index]
  }
  if (props.dialogType.type == 12) {
    mathList.value = await getCommissonMethodListApi()
    mathMethod.value = requestData.value.algorithmId
    console.log(mathList.value)
  }
  load.value = false
  venueRatioData.value = deepCopy(props.currentRow)
})

const close = () => {
  emit('handleCloseDialog')
}

//   弹窗
//  1=新增方案  2=编辑佣金档位 3=修改红利承担比例 4=修改返水承担比例 5=场馆费承担比例
//  6=编辑代存红利承担比例 7=编辑信用代存红利承担比例 8=活跃用户定义  9=存款/取款手续费 10=新增新增佣金档位 11=编辑场馆费率 12=更改计算公式
// 13=编辑方方案名称
const submit = async () => {
  if (props.dialogType.type == 2) {
    try {
      await commissionLevelFrom.value.validate()
    } catch (err) {
      proxy.$modal.msgError(i18n.global.t('agent.pleaseInputCorrectGearData'))
      return
    }
    requestData.value.commissionGearList[props.dialogType.index] = commissionLevelData.value
    emit('toEdit', requestData.value)
  } else if (props.dialogType.type == 10) {
    try {
      console.log(requestData.value)
      await newLevelForm.value.validate()
    } catch (err) {
      console.log(err)
      proxy.$modal.msgError(i18n.global.t('agent.pleaseInputCorrectGearData'))
      return
    }
    if (!Array.isArray(requestData.value.commissionGearList)) {
      requestData.value.commissionGearList = []
    }
    requestData.value.commissionGearList.push(newLevel.value)
    emit('toEdit', requestData.value)
  } else if (props.dialogType.type == 11) {
    try {
      await venueRatioForm.value.validate()
      const { id, ratio } = venueRatioData.value
      const val = { id, ratio }
      emit('toEditVenue', val)
    } catch {
      proxy.$modal.msgError(i18n.global.t('agent.pleaseInputCorrectData'))
    }
  } else if (props.dialogType.type == 1) {
    try {
      await initMethodForm.value.validate()
    } catch {
      return
    }
    let VenueList = await getVenueList()
    VenueList.forEach((item) => {
      delete item.id
      delete item.parentId
      item.ratio = 0.05
      item.cost = item.lobbyFee / 100
    })
    let temp = await getCommissonMethodListApi()

    initMethodData.value.algorithmId = temp[0].id
    initMethodData.value.venueRateConfigList = VenueList
    console.log(initMethodData.value)
    emit('addMethod', initMethodData.value)
  } else if (props.dialogType.type == 12) {
    requestData.value.algorithmId = mathMethod.value
    emit('toEdit', requestData.value)
  } else if (props.dialogType.type == 13) {
    editPlanName()
  } else if (props.dialogType.type == 9) {
    try {
      await fromData.value.validate()

      // requestData.value.depositFeeRatio = (requestData.value.depositFeeRatio / 100).toFixed(4)
      // requestData.value.withdrawFeeRatio = (requestData.value.withdrawFeeRatio / 100).toFixed(4)
      emit('toEdit', requestData.value)
    } catch (err) {
      proxy.$modal.msgError(i18n.global.t('agent.pleaseInputCorrectData'))
      return
    }
  } else {
    try {
      await fromData.value.validate()
    } catch (err) {
      proxy.$modal.msgError(i18n.global.t('agent.pleaseInputCorrectData'))
      return
    }
    emit('toEdit', requestData.value)
  }
}
const editPlanName = () => {
  if (!requestData.value.planName) {
    proxy.$modal.msgError(i18n.global.t('agent.planNameCannotBeEmpty'))
    return
  }
  let isSame = 0
  props.methodList.forEach((item) => {
    console.log(item.planName == requestData.value.planName)
    if (item.planName == requestData.value.planName) {
      isSame++
    }
  })
  if (isSame > 1) {
    proxy.$modal.msgError(i18n.global.t('agent.planNameCannotBeRepeat'))
    return
  }
  emit('toEdit', requestData.value)
}
// 计算公式
const mathMethod = ref()
const mathList = ref([])
// 新增档位
const newLevel = ref({
  seq: '',
  activeNumber: '',
  winLose: '',
  ratio: ''
})
// 新方案初始化数据
const initMethodData = ref({
  accumulate: false,
  activeUserRechargeAmount: 500,
  activeUserType: 1,
  activeUserValidAmount: 500,
  algorithmDirections: 1,
  algorithmId: '',
  bonusRatio: 0.33,
  commissionGearList: [],
  creditSubstituteBonusRatio: 0.33,
  depositFeeRatio: 0.33,
  planName: '',
  rebateRatio: 0.33,
  substituteBonusRatio: 0.33,
  tenantId: 1,
  venueRateConfigList: [],
  venueRatio: 0.33,
  venueType: 1,
  withdrawFeeRatio: 0.33
})
// 表单验证
const newPlanRule = {
  validator: (rule, value, callback) => {
    let isRepeated = false
    if (Array.isArray(props.methodList)) {
      isRepeated = props.methodList.some((item) => {
        return item.planName == value
      })
    }
    if (isRepeated) {
      callback(new Error(i18n.global.t('agent.planNameCannotBeRepeat')))
    } else {
      callback()
    }
  },
  trigger: 'submit'
}
const initMethodRule = {
  planName: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    newPlanRule
  ]
}
const maxMinRule = {
  validator: (rule, value, callback) => {
    const numRegex = /^[0-9]+(\.[0-9]+)?$/

    if (!numRegex.test(value)) {
      callback(new Error(i18n.global.t('agent.zeroToHundred')))
    } else {
      const numValue = parseFloat(value)
      if (isNaN(numValue) || numValue > 100) {
        callback(new Error(i18n.global.t('agent.zeroToHundred')))
      } else {
        callback()
      }
    }
  },
  trigger: 'blur'
}
const levelRule = {
  validator: (rule, value, callback) => {
    let isRepeated = false
    console.log(value)
    if (Array.isArray(requestData.value.commissionGearList)) {
      requestData.value.commissionGearList.forEach((item) => {})
      isRepeated = requestData.value.commissionGearList.some((item) => {
        return item.seq == value
      })
    }
    if (isRepeated) {
      callback(new Error(i18n.global.t('agent.gearLevelCannotRepeat')))
    } else {
      callback()
    }
  }
}
const venueRatioRule = {
  ratio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ]
}
const fromDataRule = {
  bonusRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ],
  rebateRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ],
  venueRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ],
  substituteBonusRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ],
  creditSubstituteBonusRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ],
  activeUserRechargeAmount: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  activeUserValidAmount: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  activeUserBetNums: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  depositFeeRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ],
  withdrawFeeRatio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    maxMinRule
  ]
}
const commissionLevel = {
  seq: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  activeNumber: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  winLose: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  ratio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },
    maxMinRule
  ]
}
const newLevelLevel = {
  seq: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    },
    levelRule
  ],
  activeNumber: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  winLose: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    {
      pattern: /^[0-9]+$/,
      message: i18n.global.t('agent.pleaseInputNumber'),
      trigger: 'blur'
    }
  ],
  ratio: [
    {
      required: true,
      message: i18n.global.t('agent.isRequired'),
      trigger: 'blur'
    },

    maxMinRule
  ]
}

//   弹窗
//  1=新增方案  2=编辑佣金档位 3=修改红利承担比例 4=修改返水承担比例 5=场馆费承担比例
//  6=编辑代存红利承担比例 7=编辑信用代存红利承担比例 8=活跃用户定义  9=存款/取款手续费 10=新增新增佣金档位 11=编辑场馆费率 12=更改计算公式
// 13=编辑方方案名称
const titleText = computed(() => {
  switch (props.dialogType.type) {
    case 1:
      return i18n.global.t('agent.addDefinitionPlan')
    case 2:
      return i18n.global.t('agent.addOrEditGear')
    case 3:
      return i18n.global.t('agent.editProfitsRatio')
    case 4:
      return i18n.global.t('agent.editRebateRatio')
    case 5:
      return i18n.global.t('agent.editLobbynameRatio')
    case 6:
      return i18n.global.t('agent.editDepositeRatio')
    case 7:
      return i18n.global.t('agent.editCreditRatio')
    case 8:
      return i18n.global.t('agent.activeUserDefinition')
    case 9:
      return i18n.global.t('agent.depositWithdrawFee')
    case 10:
      return i18n.global.t('agent.addCommissionGear')
    case 11:
      return i18n.global.t('agent.editFee')
    case 12:
      return i18n.global.t('agent.editCalculationFormule')
    case 13:
      return i18n.global.t('agent.editPlanName')
    default:
      return dialogType
  }
})

// 加载状态
const load = ref(true)
</script>

<style lang="scss" scoped>
.title {
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  line-height: 10px;
  border-bottom: 1px solid rgb(183, 183, 183);
}
.body {
  margin: 20px 0 20px 0;
}
.footer-btn {
  display: flex;
  justify-content: end;
}
</style>
