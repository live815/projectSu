<template>
  <div>
    <el-form label-width="90" :model="detailDataForm" ref="formRef">
      <el-form-item
        :label="$t('agent.qq')"
        prop="qq"
        :rules="[
          {
            pattern: /^[0-9]{5,11}$/,
            message: '只能输入数字且长度在5到11位之间',
            trigger: 'blur'
          }
        ]"
        maxlength="11"
      >
        <el-input v-model="detailDataForm.qq" style="width: 230px"> </el-input>
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

const formRef = ref(null)
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
  adjustContentType: 0,
  agentId: 0,
  agentName: '',
  applicantMark: ''
})
const submit = () => {
  if (!detailDataForm.value.qq) {
    proxy.$modal.msgError(i18n.global.t('agent.pleaseFillInTheQqAccount'))
    return
  }
  formRef.value.validate((vali) => {
    if (vali) {
      formData.value.adjustContentType = 12
      formData.value.agentId = route.query.id
      formData.value.agentName = props.detailData.agentUsername
      formData.value.adjustBefore = props.detailData.qq || '--'
      formData.value.adjustAfter = detailDataForm.value.qq
      editAgentBaseInfoApi(formData.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t('agent.submittedSuccessfully'))
        handleClose()
      })
    }
  })
}
// 关闭弹窗并重获数据
const handleClose = () => {
  emit('closeDetailEdit')
}
</script>

<style lang="scss" scoped></style>
