<template>
  <div>
    <el-form label-width="90">
      <el-form-item
        :label="$t('agent.maintainer')"
        :rules="[
          {
            required: true
          }
        ]"
      >
        <el-input v-model="detailDataForm.defender" style="width: 230px"> </el-input>
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
  adjustContentType: 4,
  agentId: 0,
  agentName: '',
  applicantMark: ''
})
const submit = () => {
  if (!detailDataForm.value.defender) {
    proxy.$modal.msgError(i18n.global.t('agent.pleaseFillInTheMaintainer'))
    return
  }
  formData.value.adjustContentType = 4
  formData.value.agentId = route.query.id
  formData.value.agentName = props.detailData.agentUsername
  formData.value.adjustBefore = props.detailData.defender || '--'
  formData.value.adjustAfter = detailDataForm.value.defender
  editAgentBaseInfoApi(formData.value).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t('agent.submittedSuccessfully'))
    handleClose()
  })
}
// 关闭弹窗并重获数据
const handleClose = () => {
  emit('closeDetailEdit')
}
</script>

<style lang="scss" scoped></style>
