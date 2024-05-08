<template>
  <div class="withdraw-refuse-dialog">
    <!-- 新增/编辑黑名单 -->
    <el-dialog
      v-model="dialogVisible"
      width="600px"
      :title="$t('risk.review')"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form :model="queryParams" label-position="left" ref="queryRef" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('risk.userName')" prop="userName">
              <span>{{ cloneRow.userName || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('risk.withdrawAmountQuote')" prop="amount">
              <span class="mr-4">{{ formatNumber(cloneRow.amount) }}</span>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="$t('risk.rejectReason')" prop="rejectReason">
              <el-radio-group v-model="queryParams.rejectReason">
                <el-radio v-for="item in list" :key="item.value" :label="item.value">{{
                  item.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('risk.remark')" prop="remark">
              <el-input
                v-model="queryParams.remark"
                :rows="5"
                maxlength="100"
                :placeholder="$t('agent.pleaseInputRemark')"
                show-word-limit
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('risk.cancel') }}</el-button>
          <el-button @click="submit"> {{ $t('risk.reject') }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { getCurrentInstance } from 'vue'
import { getMulReviewOrder, getWithdrawlOrderUserDetail } from '@/api/risk/review/index'
import { formatNumber } from '@/utils/index'

const props = defineProps(['openRefuse', 'cloneRow'])
const emit = defineEmits(['update:openRefuse', 'close'])

const { proxy } = getCurrentInstance()

const queryRef = ref(null)
const queryParams = ref({
  rejectReason: null,
  remark: null
})
const rules = ref({
  rejectReason: [{ required: true, message: i18n.global.t('risk.pleaseSelectRefuseReason'), trigger: 'change' }]
})
const list = ref([
  {
    value: i18n.global.t('risk.bankAccountNotSameName'),
    label: i18n.global.t('risk.bankAccountNotSameName')
  },
  {
    value: i18n.global.t('risk.runningNotReachRequirment'),
    label: i18n.global.t('risk.runningNotReachRequirment')
  },
  {
    value: i18n.global.t('risk.rebateAndProfitsNotReachRequirment'),
    label: i18n.global.t('risk.rebateAndProfitsNotReachRequirment')
  },
  {
    value: i18n.global.t('risk.cheafRefreshRunning'),
    label: i18n.global.t('risk.cheafRefreshRunning')
  },
  {
    value: i18n.global.t('risk.cheafGaming'),
    label: i18n.global.t('risk.cheafGaming')
  },
  {
    value: i18n.global.t('risk.others'),
    label: i18n.global.t('risk.others')
  }
])

const dialogVisible = computed({
  get() {
    return props.openRefuse
  },
  set(val) {
    emit('update:openRefuse', val)
  }
})

function cancel() {
  dialogVisible.value = false
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      console.log(props.cloneRow.orderNo,queryParams.value)
      getMulReviewOrder({
        orderNos: [props.cloneRow.orderNo],
        type: '2',
        ...queryParams.value
      }).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t('risk.operateSuccessfully'))

        dialogVisible.value = false
        emit('close')
      })
    } else {
      return
    }
  })
}
</script>

<style lang="scss" scoped>
.withdraw-refuse-dialog {
  :deep() {
    .el-dialog__title {
      font-weight: 600;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .dialog-footer .el-button {
      width: 140px;
      height: 40px;
      &:first-child {
        color: #8c8c8c;
        border: 1px solid rgba(121, 121, 121, 1);
      }
      &:nth-child(2) {
        background: #F56C6C !important;
        color:#fff;
      }
    }
    .el-radio-group{
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
