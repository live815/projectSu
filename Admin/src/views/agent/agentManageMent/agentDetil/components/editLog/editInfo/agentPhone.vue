<template>
  <div>
    <el-form label-width="90" :model="detailDataForm" ref="fromRef" :rules="rules">
      <el-form-item
        :label="$t('agent.phoneNumberQuot')"
        prop="mobile"
        :rules="[
          {
            pattern: /^[0-9]{5,11}$/,
            message: '只能输入数字且长度在5到11位之间',
            trigger: 'blur'
          }
        ]"
      >
        <!-- +86  -->

        <el-select placeholder="请选择" v-model="phoneCode" style="width: 100px">
          <el-option label="+86" value="86" />
          <el-option label="+63" value="63" />
          <el-option label="+84" value="84" />
        </el-select>
        &nbsp;-&nbsp;
        <el-input
          v-model="detailDataForm.mobile"
          style="width: 230px"
          :placeholder="$t('agent.pleaseEnterThePhoneNumber')"
          maxlength="11"
        >
        </el-input>
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
import { valiPhoneReg } from '@/utils/phoneReg'

const fromRef = ref(null)
const { proxy } = getCurrentInstance()
const route = useRoute()
const props = defineProps({
  detailData: Object
})
onMounted(() => {
  if (typeof detailDataForm.value.mobileArea !== 'string') {
    phoneCode.value = detailDataForm.value.mobileArea.toFixed()
  } else {
    phoneCode.value = detailDataForm.value.mobileArea
  }
})
const emit = defineEmits(['closeDetailEdit'])
const detailDataForm = ref(deepCopy(props.detailData))
const formData = ref({
  adjustAfter: '',
  adjustBefore: '',
  adjustContentType: 9,
  agentId: 0,
  agentName: '',
  applicantMark: ''
})

// 区号
const phoneCode = ref('86')
// 提交
const submit = () => {
  if (!detailDataForm.value.mobile) {
    proxy.$modal.msgError(i18n.global.t('agent.pleaseFillInCellPhoneNumber'))
    return
  }
  fromRef.value.validate((vali) => {
    if (vali) {
      formData.value.adjustContentType = 9
      formData.value.agentId = route.query.id
      formData.value.agentName = props.detailData.agentUsername
      formData.value.adjustBefore = props.detailData.mobile || '--'
      formData.value.adjustAfter = phoneCode.value + '-' + detailDataForm.value.mobile
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
// 校验
const rules = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (valiPhoneReg(detailDataForm.value.mobile, phoneCode.value)) {
          callback()
        } else {
          callback(new Error('手机格式错误'))
        }
      },
      trigger: 'blur'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
