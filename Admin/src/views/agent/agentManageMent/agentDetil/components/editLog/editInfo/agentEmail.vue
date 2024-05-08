<template>
  <div>
    <el-form label-width="90" :model="detailDataForm" ref="formRef">
      <el-form-item
        :label="$t('agent.email')"
        prop="email"
        :rules="[
          {
            required: true,
            message: '请输入电子邮箱',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '电子邮箱格式错误',
            trigger: 'blur'
          }
        ]"
      >
        <el-input v-model="detailDataForm.email" style="width: 230px"> </el-input>
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
const formRef = ref(null)
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
  formRef.value.validate().then((valid) => {
    if (valid) {
      formData.value.adjustContentType = 10
      formData.value.agentId = route.query.id
      formData.value.agentName = props.detailData.agentUsername
      formData.value.adjustBefore = props.detailData.email || '--'
      formData.value.adjustAfter = detailDataForm.value.email
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
