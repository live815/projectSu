<template>
  <div class="app-container">
    <!-- 步骤进度条 -->
    <div class="progress">
      <div class="">
        <div class="step-box active">1</div>
        <div style="margin-top: 5px">基本信息</div>
      </div>
      <div class="bar"></div>
      <div>
        <div class="step-box" :class="{ active: stage > 0 }">2</div>
        <div style="margin-top: 5px">佣金配置</div>
      </div>
    </div>
    <!-- 第一步 -->
    <div v-if="stage == 0">
      <!-- <div class="sub-title">{{ $t("agent.basicInformation") }}</div> -->
      <el-form
        :model="requestData"
        :rules="fromRule"
        label-width="auto"
        ref="firstForm"
        label-position="right"
      >
        <el-form-item
          :label="$t('agent.agentType')"
          :placeholder="$t('agent.pleaseEnterAgentType')"
          :rules="[
            {
              required: true,
              trigger: 'blur'
            }
          ]"
        >
          <el-select
            v-model="requestData.agentType"
            class="m-2"
            :placeholder="$t('agent.pleaseSelect')"
            style="width: 120px"
          >
            <el-option
              v-for="item in agentTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('agent.agentAccountQuote')" prop="agentName">
          <el-input
            :placeholder="$t('agent.pleaseEnterAgentAccount')"
            clearable
            maxlength="16"
            style="width: 300px"
            v-model="requestData.agentName"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('agent.parentAccountQuote')" prop="superiorAgentName">
          <el-input
            :placeholder="$t('agent.pleaseEnterNoInput')"
            v-model="requestData.superiorAgentName"
            clearable
            type="text"
            style="width: 300px"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('agent.accountPassword')" prop="password">
          <el-input
            :placeholder="$t('agent.pleaseEnterYourAccountPassword')"
            clearable
            maxlength="20"
            style="width: 300px"
            v-model="requestData.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('agent.confirmPassword')" prop="confirmPassword">
          <el-input
            :placeholder="$t('agent.pleaseEnterTheConfirmationPassword')"
            clearable
            maxlength="20"
            style="width: 300px"
            v-model="requestData.confirmPassword"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100px" @click="nextStage">{{
        $t('agent.nextStep')
      }}</el-button>
    </div>

    <!-- 第二步 -->
    <div v-else>
      <!-- <div class="sub-title">{{ $t("agent.commissionConfiguration") }}</div> -->
      <div>
        <el-form-item
          :label="$t('agent.agentModel')"
          label-width="auto"
          label-position="right"
          :rules="[
            {
              required: true,
              trigger: 'blur'
            }
          ]"
        >
          <el-radio-group v-model="requestData.agentMode" class="ml-4">
            <el-radio :label="0">{{ $t('agent.commissionMode') }}</el-radio>
            <el-radio :label="1">{{ $t('agent.dispatchMode') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <commissionMode
        v-if="requestData.agentMode == 0"
        :isTopAgent="isTopAgent"
        :commissionPlan="commissionPlan"
        :remarkText="remarkText"
        :superiorAgentLsit="superiorAgentLsit"
        @updateCommissionPlan="updateCommissionPlan"
        @updateRemarkText="updateRemarkText"
        @updateSuperiorAgentLsit="updateSuperiorAgentLsit"
        @backStage="backStage"
        @addAgent="addAgent"
      ></commissionMode>

      <dividedMode
        v-if="requestData.agentMode == 1"
        :isTopAgent="isTopAgent"
        :remarkText="remarkText"
        :dividendRate="dividendRate"
        :divdiendPlan="commissionPlan"
        :superiorAgentLsit="superiorAgentLsit"
        @updateDividendRate="updateDividendRate"
        @updateDivdiendPlan="updateCommissionPlan"
        @updateRemarkText="updateRemarkText"
        @backStage="backStage"
        @addAgent="addAgent"
      />
    </div>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()

import cloneDeep from 'lodash/cloneDeep'
import { getSuperiorAgentApi, addAgentApi } from '@/api/agent/agentList.js'
import commissionMode from './components/commissionMode.vue'
import dividedMode from './components/dividedMode.vue'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
const router = useRouter()
const firstForm = ref(null)

const requestData = ref({
  agentType: 0,
  agentName: '',
  superiorAgentName: '',
  password: '',
  confirmPassword: '',
  agentMode: 0,
  commissionSetDto: {
    shareSetDto: {},
    takeCommissionSet: []
  }
})
// 提交数据
const addAgent = (percent, agentLevel) => {
  requestData.value.commissionRebateConfigId = commissionPlan.value
  requestData.value.applicantMark = remarkText.value
  if (!commonValidate(requestData.value)) {
    return
  }

  if (requestData.value.agentMode == 0) {
    requestData.value.commissionSetDto.takeCommissionSet = cloneDeep(superiorAgentLsit.value)
    console.log(requestData.value.commissionSetDto)
    if (
      requestData.value.commissionSetDto.takeCommissionSet.some((item) => {
        return item.percent < 0 || item.percent > 100
      })
    ) {
      proxy.$modal.msgError(i18n.global.t('agent.theCommissionRatioMustBeBetween'))
      return
    }
    requestData.value.commissionSetDto.takeCommissionSet.forEach((item) => {
      item.agentLevel -= 1
    })
    requestData.value.commissionSetDto.agentMode = 0
    requestData.value.commissionSetDto.takeCommissionSet.push({
      agentName: requestData.value.agentName,
      percent,
      agentLevel: agentLevel - 1
    })

    requestData.value.commissionSetDto.shareSetDto = {}
  }
  if (requestData.value.agentMode == 1) {
    requestData.value.commissionSetDto.shareSetDto.totalProportion = dividendRate.value
    requestData.value.commissionSetDto.shareSetDto.shareProportionSet = cloneDeep(
      superiorAgentLsit.value
    )

    if (requestData.value.commissionSetDto.shareSetDto.totalProportion < 0) {
      proxy.$modal.msgError(i18n.global.t('agent.theTotalCommissionRatioCannotBeLower'))
      return
    }

    requestData.value.commissionSetDto.shareSetDto.shareProportionSet.forEach((item) => {
      item.agentLevel -= 1
    })
    requestData.value.commissionSetDto.agentMode = 1
    requestData.value.commissionSetDto.shareSetDto.shareProportionSet.push({
      agentName: requestData.value.agentName,
      percent,
      agentLevel: agentLevel - 1
    })
    let validate = shareSetValidate(
      requestData.value.commissionSetDto.shareSetDto.shareProportionSet
    )
    if (
      validate.isNegative ||
      validate.total != requestData.value.commissionSetDto.shareSetDto.totalProportion
    ) {
      proxy.$modal.msgError(i18n.global.t('agent.theSplitRatioCannotBeZeroOrNegative'))
      return
    }
    requestData.value.commissionSetDto.shareSetDto.shareProportionSet =
      requestData.value.commissionSetDto.shareSetDto.shareProportionSet.map((item) => {
        const { percent, ...rest } = item
        return {
          ...rest,
          proportion: parseInt(percent, 10)
        }
      })
    requestData.value.commissionSetDto.takeCommissionSet = []
  }

  addAgentApi(requestData.value).then(() => {
    proxy.$modal.msgSuccess(i18n.global.t('agent.agentAddedSuccessfully'))
    resetAll()
  })
}

// 重置所有数据
const resetAll = () => {
  requestData.value = {
    agentType: 0,
    agentName: '',
    superiorAgentName: '',
    password: '',
    confirmPassword: '',
    agentMode: 0,
    commissionSetDto: { shareSetDto: {}, takeCommissionSet: [] }
  }
  superiorAgentLsit.value = []
  stage.value = 0
}
// 重置第二步的数据
const resetSec = () => {
  requestData.value.commissionSetDto = { shareSetDto: {}, takeCommissionSet: [] }
  superiorAgentLsit.value = []
}

// 当前步骤
const stage = ref(0)
// 是否是一级代理与上级代理列表
const isTopAgent = ref(false)
const superiorAgentLsit = ref([])
// 下一步逻辑
const nextStage = async () => {
  isTopAgent.value = false
  // 表单验证
  try {
    await firstForm.value.validate()
  } catch (error) {
    return
  }
  if (requestData.value.password != requestData.value.confirmPassword) {
    proxy.$modal.msgError(i18n.global.t('agent.passwordAndConfirmationPassword'))
    return
  }
  if (requestData.value.superiorAgentName) {
    superiorAgentLsit.value = await getSuperiorAgentApi(requestData.value.superiorAgentName)
  }

  if (superiorAgentLsit.value && superiorAgentLsit.value.length > 0) {
    superiorAgentLsit.value.forEach((item) => {
      item.percent = 0
    })
    isTopAgent.value = true
    stage.value = 1
  } else if (requestData.value.superiorAgentName == '') {
    // delete requestData.value.superiorAgentName;
    stage.value = 1
  } else {
    proxy.$modal.msgError(i18n.global.t('agent.theSuperiorUserDoesNotExist'))
  }
}
const backStage = () => {
  stage.value = 0
  resetSec()
}

const remarkText = ref('')
// 抽佣数据
const commissionPlan = ref()

// 分成数据
const dividendRate = ref(null)

//  接收子组件的数据- 抽佣模式
const updateSuperiorAgentLsit = (val) => {
  superiorAgentLsit.value = val
}
const updateCommissionPlan = (val) => {
  commissionPlan.value = val
}

const updateDividendRate = (val) => {
  dividendRate.value = val
}

// 备注变量公用
const updateRemarkText = (val) => {
  remarkText.value = val
}

// 代理类型
const agentTypeList = ref([
  {
    label: i18n.global.t('agent.innerAgent'),
    value: 0
  },
  {
    label: i18n.global.t('agent.outerAgent'),
    value: 1
  }
])
// 表单验证
const fromRule = {
  agentName: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseEnterAgentAccount'),
      trigger: 'blur'
    },
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: i18n.global.t('agent.usernameCanOnlyContainEnglish'),
      trigger: 'blur'
    },
    {
      min: 6,
      max: 16,
      message: i18n.global.t('agent.usernameLengthIsCharacters'),
      trigger: 'blur'
    }
  ],

  password: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseEnterYourAccountPassword'),
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      message: i18n.global.t('agent.thePasswordContains'),
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: i18n.global.t('agent.pleaseEnterYourAccountPassword'),
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      message: i18n.global.t('agent.thePasswordContains'),
      trigger: 'blur'
    }
  ]
}

// 第二部验证
const commonValidate = (val) => {
  if (!val.commissionRebateConfigId) {
    proxy.$modal.msgError(i18n.global.t('agent.pleaseSelectACommissionPlan'))
    return false
  } else {
    return true
  }
}
const shareSetValidate = (val) => {
  let total = 0
  let isNegative = false
  val.forEach((item) => {
    total += item.percent * 1
    if (item.percent < 0) {
      isNegative = true
    }
  })
  return { total, isNegative }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;
  margin-left: 70px;
  gap: 20px;
  width: 100%;
  height: 150px;
  .bar {
    width: 100px;
    border-top: 1px dashed black;
  }
  .step-box {
    text-align: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    border: 1px solid #bfbfbf;
    font-size: 23px;
    line-height: 60px;
  }
  .active {
    background-color: rgb(0, 121, 254);
    color: #fff;
  }
}
.app-container {
  border: 1px solid #f2f2f2;
  width: 683px;
  margin: 0 auto;
  padding-left: 130px;
}

.sub-title {
  position: relative;
  left: -50px;
  font-size: 20px;
  font-weight: 600;
  line-height: 45px;
}
</style>
