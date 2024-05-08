<template>
  <div class="agentMode-edit-container">
    <el-form label-position="left" label-width="auto">
      <el-form-item :label="$t('agent.agentModel')">
        <el-select v-model="newData.agentMode" :placeholder="$t('agent.pleaseSelect')">
          <el-option :label="$t('agent.commissionMode')" :value="0" />
          <el-option :label="$t('agent.dispatchMode')" :value="1" />
        </el-select>
      </el-form-item>

      <div v-if="newData.agentMode == 0">
        <el-form-item :label="$t('agent.commissionSetting') + '：'">
          <template v-for="(item, index) in newData.takeCommissionSet" :key="index">
            <div class="setting-row" v-if="newData.takeCommissionSet.length - 1 != index">
              <el-form-item label-width="500px" label-position="right">
                <template #label>
                  <div class="">
                    {{ getChineseNum(item.agentLevel + 1) }}{{ $t('agent.levelOfAgent') }}
                    <div class="label">{{ item.agentName }}</div>
                    <span>{{ $t('agent.commisionRatio') }}</span>
                  </div>
                </template>
                <el-input-number v-model.number="item.percent">
                  <template #append>
                    <span>%</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </div>
          </template>
          <!--  -->
          <div class="setting-row">
            <el-form-item label-width="500px" label-position="right">
              <template #label>
                <div class="">
                  {{ $t('agent.agentAtThisLevel') }}
                  <div class="label">{{ currentLevelname }}</div>
                  <span>{{ $t('agent.commisionRatio') }}</span>
                </div>
              </template>
              <el-input-number v-model="currentLevelCommission" disabled>
                <template #append>
                  <span>%</span>
                </template>
              </el-input-number>
            </el-form-item>
          </div>
          <!--  -->
        </el-form-item>
      </div>

      <div v-if="newData.agentMode == 1">
        <el-form-item :label="$t('agent.dividedIntoSetting') + '：'">
          <el-form-item
            :label="$t('agent.totalCommissionRatio')"
            label-width="500"
            style="margin-bottom: 10px"
          >
            <el-input-number v-model="newData.shareSetDto.totalProportion"></el-input-number>
          </el-form-item>
          <template v-for="(item, index) in newData.shareSetDto.shareProportionSet" :key="index">
            <div
              class="setting-row"
              v-if="newData.shareSetDto.shareProportionSet.length - 1 != index"
            >
              <el-form-item label-width="500px" label-position="right">
                <template #label>
                  <div class="">
                    {{
                      index === newData.shareSetDto.shareProportionSet.length - 1
                        ? $t('agent.book')
                        : getChineseNum(item.agentLevel + 1)
                    }}{{ $t('agent.levelOfAgent') }}
                    <div class="label">{{ item.agentName }}</div>
                    <span>{{ $t('agent.commissionRateQuote') }}</span>
                  </div>
                </template>
                <el-input-number
                  v-model.number="item.proportion"
                  :disabled="index === newData.shareSetDto.shareProportionSet.length - 1"
                >
                  <template #append>
                    <span>%</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </div>
          </template>
          <!--  -->
          <div class="setting-row">
            <el-form-item label-width="500px" label-position="right">
              <template #label>
                <div class="">
                  {{ $t('agent.agentAtThisLevel') }}
                  <div class="label">{{ currentLevelname }}</div>
                  <span>{{ $t('agent.commissionRateQuote') }}</span>
                </div>
              </template>
              <el-input-number v-model="currentLevelShare" disabled>
                <template #append>
                  <span>%</span>
                </template>
              </el-input-number>
            </el-form-item>
          </div>
          <!--  -->
        </el-form-item>
      </div>
      <div>
        <el-form-item :label="$t('agent.remarkQuote') + ':'">
          <el-input type="textarea" v-model="formData.applicantMark" :rows="5"></el-input>
        </el-form-item>
      </div>
      <el-button @click="handleClose">{{ $t('agent.cancel') }}</el-button>
      <el-button @click="submit" type="primary">{{ $t('agent.submit') }}</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { editAgentBaseInfoApi } from '@/api/agent/agentList.js'
import { useRoute } from 'vue-router'
import { deepCopy } from '@/utils'
import i18n from '@/i18n'

const props = defineProps({
  detailData: Object
})
const emit = defineEmits(['closeDetailEdit'])
const { proxy } = getCurrentInstance()
const route = useRoute()
onMounted(() => {
  oldData.value = deepCopy(props.detailData.commissionSetDto)
  newData.value = deepCopy(props.detailData.commissionSetDto)

  // 记录代理账号的上级数据,拼接数据
  if (oldData.value.agentMode == 0) {
    // 当本级是抽佣模式,制造相应的分成模式数据
    superiorAgent.value = {
      totalProportion: 100,
      shareProportionSet: []
    }
    superiorAgent.value.shareProportionSet = deepCopy(oldData.value.takeCommissionSet)
    superiorAgent.value.shareProportionSet.forEach((item) => {
      delete item.percent
      item.proportion = 0
    })
    newData.value.shareSetDto = superiorAgent.value
  } else {
    superiorAgent.value = deepCopy(oldData.value.shareSetDto.shareProportionSet)
    superiorAgent.value.forEach((item) => {
      delete item.proportion
      item.percent = 0
    })
    newData.value.takeCommissionSet = superiorAgent.value
  }
})
const superiorAgent = ref()
const formData = ref({
  adjustAfter: '',
  adjustBefore: '',
  adjustContentType: 0,
  agentId: 0,
  agentName: '',
  applicantMark: ''
})
const oldData = ref({})
const newData = ref({})
// 提交数据
const submit = () => {
  if (newData.value.agentMode == 0) {
    newData.value.takeCommissionSet[newData.value.takeCommissionSet.length - 1].percent =
      currentLevelCommission.value

    // 表单验证 -- 抽佣模式
    console.log(newData.value)
    if (
      newData.value.takeCommissionSet.some((item) => item.percent * 1 > 100 || item.percent * 1 < 0)
    ) {
      proxy.$modal.msgError(i18n.global.t('agent.commissionRatioSettingMustBeBetween'))
      return
    }
    newData.value.shareSetDto = {}
    formData.value.adjustAfter = JSON.stringify(newData.value)
    formData.value.adjustBefore = JSON.stringify(oldData.value)
  } else {
    newData.value.shareSetDto.shareProportionSet[
      newData.value.shareSetDto.shareProportionSet.length - 1
    ].proportion = currentLevelShare

    // 表单验证 -- 分成模式
    if (
      newData.value.shareSetDto.totalProportion > 100 ||
      newData.value.shareSetDto.totalProportion < 1
    ) {
      proxy.$modal.msgError(i18n.global.t('agent.totalCommissionSettingMustBeBetween'))
      return
    }
    if (newData.value.shareSetDto.shareProportionSet.some((item) => item.proportion * 1 < 0)) {
      proxy.$modal.msgError(i18n.global.t('agent.theCommissionRatioCannot'))
      return
    }

    // 处理提交数据
    newData.value.takeCommissionSet = []
    formData.value.adjustAfter = JSON.stringify(newData.value)
    formData.value.adjustBefore = JSON.stringify(oldData.value)
  }
  formData.value.adjustContentType = 1
  formData.value.agentId = route.query.id
  formData.value.agentName = currentLevelname.value

  editAgentBaseInfoApi(formData.value).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t('agent.submittedSuccessfully'))
    handleClose()
  })
}

// 计算本级比例
const currentLevelname = computed(() => {
  if (newData.value.agentMode == 0) {
    if (Array.isArray(newData.value.takeCommissionSet)) {
      return newData.value.takeCommissionSet[newData.value.takeCommissionSet.length - 1].agentName
    }
  } else {
    const shareSetDto = newData.value.shareSetDto
    if (
      shareSetDto &&
      Array.isArray(shareSetDto.shareProportionSet) &&
      shareSetDto.shareProportionSet.length > 0
    ) {
      return shareSetDto.shareProportionSet[shareSetDto.shareProportionSet.length - 1].agentName
    }
  }
})

// 关闭弹窗并重获数据
const handleClose = () => {
  emit('closeDetailEdit')
}
const currentLevelCommission = computed({
  get: () => {
    let temp = 100
    if (newData.value && newData.value.agentMode == 0) {
      newData.value.takeCommissionSet.forEach((item, index) => {
        if (index != newData.value.takeCommissionSet.length - 1) temp -= item.percent
      })
      return temp
    } else {
      return 0
    }
  }
})
const currentLevelShare = computed({
  get: () => {
    if (newData.value && newData.value.agentMode == 1) {
      let temp = newData.value.shareSetDto.totalProportion
      newData.value.shareSetDto.shareProportionSet.forEach((item, index) => {
        if (index != newData.value.shareSetDto.shareProportionSet.length - 1) {
          temp -= item.proportion
        }
      })
      return temp
    } else {
      return 0
    }
  }
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
</script>

<style lang="scss" scoped>
.label {
  display: inline-block;
  width: 320px;
}

.setting-row {
  margin-bottom: 10px;
}
</style>
