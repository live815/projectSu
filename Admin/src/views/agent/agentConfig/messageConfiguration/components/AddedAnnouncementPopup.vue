<template>
  <div>
    <el-form :model="queryParams" ref="ruleFormRef" label-width="145px" :rules="rules">
      <el-form-item label="标题名称 :" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入20个字符以内的标题"
          maxlength="20"
          clearable
        />
      </el-form-item>
      <el-form-item label="指定代理账号类型 :" prop="isAllAgent">
        <el-radio-group v-model="queryParams.isAllAgent">
          <el-radio :label="0">全部代理</el-radio>
          <el-radio :label="1">指定代理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="agentNameList" v-if="queryParams.isAllAgent == 1">
        <el-input
          v-model="queryParams.agentNameList"
          :rows="6"
          type="textarea"
          placeholder="请输入代理账号，多个代理账号请用，隔开"
        />
      </el-form-item>
      <el-form-item label="内容详情 :" prop="noticeString">
        <Editor v-model="queryParams.noticeString" :minHeight="200"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('agent.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t('agent.ensure')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { Base64 } from 'js-base64'
import { ElMessageBox, ElMessage } from 'element-plus'
import { newAgentAnnouncementApi, modifyAgentAnnouncementApi } from '@/api/agent/helpConfig.js'
import i18n from '@/i18n'

const emit = defineEmits(['submitBtn'])
const ruleFormRef = ref()
const props = defineProps({
  opRow: {
    type: Object,
    default: () => {}
  },
  type: Number
})

const queryParams = ref({
  noticeTitle: '',
  isAllAgent: '',
  agentNameList: '',
  noticeContent: '',
  noticeString: '',
  noticeType: props.type,
  status: 0
})
// 校验
const rules = ref({
  noticeTitle: [
    {
      required: true,
      message: '标题不能为空',
      trigger: 'blur'
    }
  ],
  isAllAgent: [
    {
      required: true,
      message: '指定代理账号类型不能为空',
      trigger: 'blur'
    }
  ],
  noticeString: [
    {
      required: true,
      message: '内容不能为空',
      trigger: 'blur'
    }
  ],
  agentNameList: [
    {
      required: true,
      message: '请输入相应的用户名',
      trigger: 'blur'
    }
  ]
})
// 传递过来的当前项值
const onComputedOpRow = computed(() => {
  return props.opRow
})
//数据回显
onMounted(() => {
  if (props.opRow.noticeId) {
    console.log(Base64.decode(props.opRow.noticeContent))
    Object.assign(queryParams.value, {
      noticeId: onComputedOpRow.value.noticeId,
      noticeTitle: onComputedOpRow.value.noticeTitle,
      isAllAgent: onComputedOpRow.value.isAllAgent,
      agentNameList: onComputedOpRow.value.agentNameList,
      noticeContent: onComputedOpRow.value.noticeContent
    })
    queryParams.value.noticeString = Base64.decode(onComputedOpRow.value.noticeContent)
  }
})

//新增
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (onComputedOpRow.value.noticeId) {
        queryParams.value.noticeContent = Base64.encode(queryParams.value.noticeString)
        modifyAgentAnnouncementApi(queryParams.value)
          .then((res) => {
            emit('submitBtn', 1)
            ElMessage({
              type: 'success',
              message: i18n.global.t('agent.updateSuccessfully')
            })
          })
          .catch(() => {
            console.log(queryParams.value.noticeContent)
          })
      } else {
        if (onComputedOpRow)
          // queryParams.value.agentNameList = onComputedOpRow.value.agentNameList;
          // console.log(queryParams.value.agentNameList);
          // .map((item) => item.value)
          // .join(", ");
          queryParams.value.noticeContent = Base64.encode(queryParams.value.noticeString)
        newAgentAnnouncementApi(queryParams.value)
          .then(() => {
            emit('submitBtn', 1)
            ElMessage({
              type: 'success',
              message: i18n.global.t('agent.addSuccessfully')
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}
</script>

<style lang="scss" scoped></style>
