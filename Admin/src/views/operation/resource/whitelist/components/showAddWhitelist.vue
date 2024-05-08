<template>
  <div>
    <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleFormRef">
      <el-form-item :label="$t('operation.IPAdress')" prop="ip">
        <el-input v-model="ruleForm.ip" :placeholder="$t('operation.pleaseEnter')" />
      </el-form-item>
      <el-form-item :label="$t('operation.User')" prop="account">
        <el-input v-model="ruleForm.account" :placeholder="$t('operation.pleaseEnter')" />
      </el-form-item>
      <el-form-item :label="$t('operation.remark1')" prop="remark">
        <el-input v-model="ruleForm.remark" :placeholder="$t('operation.pleaseEnter')" />
      </el-form-item>
      <el-form-item :label="$t('operation.Expiration')" prop="expirationTime">
        <el-date-picker
          v-model="ruleForm.expirationTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          :placeholder="$t('operation.pleaseChoseTime')"
        />
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
import { setWhiteListConfig, upWhiteListConfig } from '@/api/operation/resource'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const emit = defineEmits(['submitBtn'])
const prop = defineProps({
  opRow: {
    type: Object
  },
  typeAdd: {
    type: Number
  }
})
const ruleFormRef = ref()
const ruleForm = ref({
  account: '',
  ip: '',
  expirationTime: '',
  remark: ''
})
const rules = ref({
  ip: [
    {
      required: true,
      message: i18n.global.t('operation.tip209'),
      trigger: 'blur'
    }
  ],
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
  ],
  expirationTime: [
    {
      required: true,
      message: i18n.global.t('operation.tip210'),
      trigger: 'blur'
    }
  ]
})
onMounted(() => {
  if (prop.typeAdd == 2) {
    ruleForm.value = prop.opRow
  }
})
const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      if (prop.typeAdd == 2) {
        upWhiteListConfig(ruleForm.value).then((res) => {
          emit('submitBtn', 1)

          ElMessage({
            type: 'success',

            message: i18n.global.t('operation.tip98')
          })
        })
      } else {
        setWhiteListConfig(ruleForm.value)
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
