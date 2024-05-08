<template>
  <div>
    <el-form label-width="90">
      <el-form-item :label="$t('agent.agentTypeNoQuote')">
        <el-select v-model="detailDataForm.agentType" placeholder="Select">
          <el-option :label="$t('agent.innerAgent')" :value="0" />
          <el-option :label="$t('agent.outerAgent')" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('agent.remarkQuote')">
        <el-input
          type="textarea"
          v-model="formData.applicantMark"
          :rows="5"
          :maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-button @click="handleClose">{{ $t('agent.cancel') }}</el-button>
      <el-button @click="submit" type="primary">{{ $t('agent.submit') }}</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { deepCopy } from '@/utils'
import { editAgentBaseInfoApi } from '@/api/agent/agentList.js'
import { useRoute } from 'vue-router'
import i18n from '@/i18n'

const { proxy } = getCurrentInstance()
const route = useRoute()
const props = defineProps({
  detailData: Object
})
const emit = defineEmits(['closeDetailEdit'])
const detailDataForm = ref(deepCopy(props.detailData))
const formData = ref({
  adjustAfter: '',
  adjustBefore: '',
  adjustContentType: 13,
  agentId: 0,
  agentName: '',
  applicantMark: ''
})
const submit = () => {
  formData.value.adjustContentType = 13
  formData.value.agentId = route.query.id
  formData.value.agentName = props.detailData.agentUsername
  formData.value.adjustBefore = selectMap[props.detailData.agentType]
  formData.value.adjustAfter = selectMap[detailDataForm.value.agentType]
  editAgentBaseInfoApi(formData.value).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t('agent.submittedSuccessfully'))
    handleClose()
  })
}
// 关闭弹窗并重获数据
const handleClose = () => {
  emit('closeDetailEdit')
}

const selectMap = {
  0: i18n.global.t('agent.innerAgent'),
  1: i18n.global.t('agent.outerAgent')
}
</script>

<style lang="scss" scoped></style>
