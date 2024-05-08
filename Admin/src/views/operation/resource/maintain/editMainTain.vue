<template>
  <el-dialog
    :title="title"
    v-model="open"
    width="600px"
    append-to-body
    :before-close="handleClose"
    :center="true"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="110px">
      <el-form-item :label="$t('operation.maintport')" prop="checkAll">
        <el-checkbox
          v-model="ruleForm.checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          {{ $t('operation.selectall') }}
        </el-checkbox>
        <el-checkbox-group
          style="margin-left: 20px"
          v-model="ruleForm.point"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="item in pointlist" :key="item.value" :label="item.label">
            {{ item.value }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item :label="$t('operation.title')" prop="title">
        <el-input v-model="ruleForm.title" :placeholder="$t('operation.tip8')" />
      </el-form-item>
      <el-form-item :label="$t('operation.content')" prop="content">
        <el-input
          v-model="ruleForm.content"
          :rows="2"
          type="textarea"
          :placeholder="$t('operation.tip48')"
        />
      </el-form-item>
      <el-form-item :label="$t('operation.MaintTime')" prop="maintainTime">
        <el-date-picker
          v-model="ruleForm.maintainTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('operation.tip192')"
          :end-placeholder="$t('operation.tip193')"
          :default-time="defaultTime"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          $t('operation.tip194')
        }}</el-button>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('operation.cancel') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { defaultTime } from '@/utils/config'
import { setSiteSave, updateSiteSave } from '@/api/operation/resource'
import i18n from '@/i18n'

const emit = defineEmits(['submitBtn'])
const prop = defineProps({ opRow: { type: Object } })
const isIndeterminate = ref(true)
const open = ref(true)
const title = ref('新增')
const ruleFormRef = ref()
const ruleForm = ref({
  point: ['0'],
  title: '',
  content: '',
  maintainTime: [],
  startTime: '',
  endTime: '',
  checkAll: false
})
const pointlist = reactive([
  {
    label: '0',
    value: 'Web'
  },
  {
    label: '1',
    value: 'H5'
  },
  {
    label: '2',
    value: i18n.global.t('operation.Android')
  },
  {
    label: '3',
    value: 'IOS'
  }
])
const rules = ref({
  checkAll: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === false && isIndeterminate.value === false) {
          callback(new Error(i18n.global.t('operation.pleaseSelectAMaintenancePort')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  title: [
    {
      required: true,
      message: i18n.global.t('operation.tip195'),
      trigger: 'blur'
    }
  ],
  maintainTime: [
    {
      required: true,
      message: i18n.global.t('operation.tip196'),
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: i18n.global.t('operation.tip197'),
      trigger: 'blur'
    }
  ]
})

const handleCheckAllChange = (val) => {
  ruleForm.value.point = val ? ['0', '1', '2', '3'] : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  ruleForm.checkAll = checkedCount === pointlist.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < pointlist.length
}
onMounted(() => {
  if (JSON.stringify(prop.opRow) !== '{}') {
    ruleForm.value = prop.opRow
    if (prop.opRow.point.includes(',')) {
      ruleForm.value.point = prop.opRow.point.split(',')
    } else {
      // 如果不含逗号，将整个字符串作为数组的唯一元素
      ruleForm.value.point = [prop.opRow.point]
    }
    ruleForm.value.maintainTime = [prop.opRow.startTime, prop.opRow.endTime]
  }
})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const params = Object.assign({}, ruleForm.value, {
        point: ruleForm.value.point.join(','),
        startTime: ruleForm.value.maintainTime[0],
        endTime: ruleForm.value.maintainTime[1]
      })

      if (prop.opRow.id) {
        updateSiteSave(params).then((res) => {
          emit('submitBtn', 1)
          ElMessage({
            type: 'success',
            message: i18n.global.t('operation.tip98')
          })
        })
      } else {
        setSiteSave(params)
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
const handleClose = (done) => {
  done()
  ruleFormRef.value.resetFields()
  emit('submitBtn', 2)
}
</script>

<style scoped lang="scss">
img {
  width: 80px;
  height: 80px;
}
.rewrite-icon {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}
</style>
