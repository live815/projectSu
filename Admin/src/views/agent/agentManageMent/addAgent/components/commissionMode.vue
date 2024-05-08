<template>
  <div>
    <el-form label-width="auto" label-position="right">
      <el-form-item
        :label="$t('agent.commisionPlan')"
        :rules="[
          {
            required: true,
            trigger: 'blur'
          }
        ]"
      >
        <el-select v-model="thisCommissionPlan" class="m-2" style="width: 140px">
          <el-option
            v-for="item in planList"
            :key="item.id"
            :label="item.planName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <div v-if="isTopAgent == true">
        <el-form-item :label="$t('agent.commissionSettingQuote')">
          <template #default>
            <div class="setting-box">
              <el-form
                label-width="auto"
                label-position="left"
                :model="thisSuperiorAgentLsit"
                ref="superiorForm"
              >
                <div
                  class="setting-row"
                  v-for="(item, index) in thisSuperiorAgentLsit.superiorAgentLsit"
                  :key="index"
                >
                  <el-form-item
                    :label="`${getChineseNum(item.agentLevel)}${$t('agent.levelOfAgent')}${
                      item.agentName
                    } `"
                    :prop="`superiorAgentLsit.${index}.percent`"
                    :rules="rules.percent"
                  >
                    <el-input
                      :placeholder="$t('agent.pleaseInput')"
                      style="width: 100px"
                      v-model="item.percent"
                      maxlength="3"
                    >
                      <template #append>
                        <span>%</span>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </el-form>

              <div class="setting-row">
                <el-form-item
                  :label="`${getChineseNum(currentLevel)}${$t('agent.levelOfAgentThisAgent')}`"
                >
                  <el-input
                    :placeholder="$t('agent.pleaseInput')"
                    disabled
                    v-model.number="currentPercentage"
                  >
                    <template #append>
                      <span>%</span>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </template>
        </el-form-item>
      </div>
      <el-form-item :label="$t('agent.applyRemark')">
        <el-input v-model="thisRemarkText" :rows="3" type="textarea" style="width: 300px" />
      </el-form-item>
    </el-form>
    <div class="btn-row">
      <el-button type="primary" plain style="width: 100px" @click="handleBackStage">{{
        $t('agent.cancel')
      }}</el-button>
      <el-button type="primary" style="width: 100px" @click="handleAddAgent">{{
        $t('agent.ensure')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { getCommissionPlanApi } from '@/api/agent/agentList.js'
import i18n from '@/i18n'
const props = defineProps([
  'commissionPlan',
  'remarkText',
  'commissionPlanList',
  'isTopAgent',
  'superiorAgentLsit'
])
const emit = defineEmits([
  'updateCommissionPlan',
  'updateRemarkText',
  'backStage',
  'addAgent',
  'updateSuperiorAgentLsit'
])

onMounted(() => {
  getPlanList()
})

// 获取佣金方案列表
const planList = ref([])
const getPlanList = () => {
  getCommissionPlanApi().then((res) => {
    planList.value = res
  })
}
// 获取当前代理等级
const currentLevel = computed(() => {
  if (props.superiorAgentLsit && props.superiorAgentLsit.length) {
    return props.superiorAgentLsit.length + 1
  } else {
    return 1
  }
})
// 计算抽佣比例
const currentPercentage = computed(() => {
  let temp = 100
  props.superiorAgentLsit.forEach((item) => {
    temp -= item.percent
  })
  return temp
})

// 取得中文数字
const getChineseNum = (number) => {
  const chineseNumbers = [
    i18n.global.t('agent.one'),
    i18n.global.t('agent.two'),
    i18n.global.t('agent.three'),
    i18n.global.t('agent.four'),
    i18n.global.t('agent.five'),
    i18n.global.t('agent.six'),
    i18n.global.t('agent.seven'),
    i18n.global.t('agent.eight'),
    i18n.global.t('agent.nine'),
    i18n.global.t('agent.ten')
  ]
  if (number >= 1 && number <= 10) {
    return chineseNumbers[number - 1]
  } else {
    return ''
  }
}
// 提交表单验证
const superiorForm = ref(null)
const rules = {
  percent: [
    {
      required: true,
      message: '*必填项',
      trigger: 'blur'
    },
    {
      pattern: /^(?:100|\d{1,2}|0)$/,
      message: '请输入0到100的数字',
      trigger: 'blur'
    }
  ]
}

// props参数传回父组件
const handleAddAgent = () => {
  if (props.isTopAgent) {
    superiorForm.value.validate((vali) => {
      if (vali) {
        emit('addAgent', currentPercentage.value, currentLevel.value)
      }
    })
  } else {
    emit('addAgent', currentPercentage.value, currentLevel.value)
  }
}
const handleBackStage = () => {
  emit('backStage')
}

const thisCommissionPlan = computed({
  get: () => {
    return props.commissionPlan
  },
  set: (val) => {
    emit('updateCommissionPlan', val)
  }
})
const thisRemarkText = computed({
  get: () => {
    return props.remarkText
  },
  set: (val) => {
    emit('updateRemarkText', val)
  }
})

const thisSuperiorAgentLsit = computed({
  get: () => {
    let SuperuirAgentForm = {
      superiorAgentLsit: props.superiorAgentLsit
    }
    return SuperuirAgentForm
  },
  set: (val) => {
    emit('updateSuperiorAgentLsit', val.superiorAgentLsit)
  }
})
</script>

<style lang="scss" scoped>
.setting-box {
  width: 300px;
  min-height: 100px;

  .setting-row {
    height: 45px;
  }
}

.btn-row {
  padding-left: 95px;
}

:deep() {
  .setting-row .el-form-item__label {
    margin-right: 50px;
  }
}
</style>
