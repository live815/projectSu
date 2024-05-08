<template>
  <div>
    <el-form label-width="68px" :model="ruleForm" :rules="rules" ref="ruleFormRef">
      <el-form-item :label="$t('operation.name')" prop="account">
        <el-input v-model="ruleForm.account" :placeholder="$t('operation.pleaseEnter')" />
      </el-form-item>
      <el-form-item :label="$t('operation.remark1')">
        <el-input v-model="ruleForm.remark" :placeholder="$t('operation.pleaseEnter')" />
      </el-form-item>
      <el-form-item>
        <el-badge class="item" type="warning">
          <el-button class="whidth" type="danger" @click="resetForm(ruleFormRef)">{{
            $t('operation.cancel')
          }}</el-button>
        </el-badge>
        <el-badge class="item" type="warning">
          <el-button class="whidth" type="primary" @click="submitForm(ruleFormRef)">{{
            $t('operation.sure')
          }}</el-button>
        </el-badge>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { setwhiteUserConfig, upwhiteUser } from '@/api/operation/resource'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

//子传父
const emit = defineEmits(['submitBtn'])
// 父传子
const prop = defineProps({
  opRow: {
    type: Object
  },
  typeUserAdd: {
    type: Number
  }
})

const ruleFormRef = ref()
const ruleForm = ref({
  account: '',
  remark: ''
})

const rules = ref({
  account: [
    {
      required: true,
      message: i18n.global.t('operation.tip207'),
      trigger: 'blur'
    }
  ],
  remark: [
    {
      required: true,
      message: i18n.global.t('operation.tip208'),
      trigger: 'blur'
    }
  ]
})
onMounted(() => {
  if (prop.typeUserAdd == 2) {
    ruleForm.value = prop.opRow
  }
})

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      if (prop.typeUserAdd == 2) {
        upwhiteUser(ruleForm.value).then((res) => {
          emit('submitBtn', 1)

          ElMessage({
            type: 'success',

            message: i18n.global.t('operation.tip98')
          })
        })
      } else {
        setwhiteUserConfig(ruleForm.value)
          .then((res) => {
            emit('submitBtn', 1)

            ElMessage({
              type: 'success',
              message: i18n.global.t('operation.addsuccessful')
            })
          })
          .catch((res) => {})
      }

      // console.log(ruleForm.value,"ruleForm")
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}
</script>

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 20px;
  .whidth {
    width: 100px;
  }
}
</style>
