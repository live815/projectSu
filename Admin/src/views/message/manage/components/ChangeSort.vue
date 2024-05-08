<template>
  <div class="change-sort-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="$t('message.updateSort')"
      :before-close="cancel"
      :close-on-click-modal="false">
      <h1>{{ queryParams.supplierName }}</h1>
      <el-form :model="queryParams" :rules="rules" ref="queryRef">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('message.sendPrioritySort')" prop="priority">
              <template #label>
                <span>{{ $t('message.sendPrioritySort') }}:</span>
              </template>
              <el-input
                v-model="queryParams.priority"
                :placeholder="$t('funds.pleaseInput')"
                clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="status">
              <template #label>
                <span>{{ $t('message.threeMessageStatus') }}:</span>
              </template>
              <el-radio-group class="ml-4" v-model="queryParams.status">
                <el-radio :label="0">{{ $t('message.startButton') }}</el-radio>
                <el-radio :label="1">{{ $t('message.disableButton') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel" class="common-cancel">{{ $t('funds.cancel') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('funds.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { queryInviteDepConfig, updateSupplierList } from '@/api/message/index'
import { onMounted } from 'vue'
import { deepCopy } from '@/utils/index'

const props = defineProps(['open', 'operateType', 'cloneRow'])
const emit = defineEmits(['update:open', 'onrefresh'])

const { proxy } = getCurrentInstance()
const cloneData = ref(null)
const queryRef = ref(null)
const queryParams = ref({
  priority: null,
  status: null
})
const rules = ref({
  priority: [{ required: true, message: i18n.global.t('message.pleaseInputSort'), trigger: 'blur' }]
})

const dialogVisible = computed({
  get() {
    return props.open
  },
  set(val) {
    emit('update:open', val)
  }
})

onMounted(async () => {
  await getInfo()
})
function getInfo() {
  return queryInviteDepConfig(props.cloneRow.id).then((res) => {
    queryParams.value = res || {}
    cloneData.value = deepCopy(res.priority)
  })
}
function cancel() {
  dialogVisible.value = false
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      if (cloneData.value === queryParams.value.priority) {
        delete queryParams.value.priority
      }
      updateSupplierList(queryParams.value).then((res) => {
        dialogVisible.value = false

        proxy.$modal.msgSuccess(i18n.global.t('funds.operateSuccessfully'))
        emit('onrefresh')
      })
    } else {
      return
    }
  })
}
</script>

<style lang="scss" scoped>
.change-sort-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .el-dialog__footer {
      display: flex;
      justify-content: center;
    }
  }
  h1 {
    color: #333333;
    font-weight: 600;
  }
  .common-cancel {
    background: #ffffff;
    border: 1px solid rgba(0, 121, 254, 1);
    color: #0079fe;
    font-size: 12px;
    font-weight: 600;
  }
  .el-button {
    width: 80px;
    height: 30px;
  }
}
</style>
