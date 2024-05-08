<template>
  <CustomizeDialog
    :dialogShow="dialogShow"
    :width="480"
    :title="$t('DepositWithdraw.OrderPopup_1')"
    v-if="dialogShow"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="dialong-title">
      <div class="title">{{ $t('DepositWithdraw.OrderPopup_2') }}</div>
      <div class="checkbox">
        <el-checkbox v-model="checked"></el-checkbox>
        <div class="checkbox-text">{{ $t('DepositWithdraw.OrderPopup_3') }}</div>
      </div>
    </div>
    <div class="dialong-footer">
      <div class="dialong-footer-btn" @click="closeBtn">
        {{ $t('DepositWithdraw.OrderPopup_4') }}
      </div>
      <div class="dialong-footer-btns" :class="{ active: checked }" @click="onClickCancelOrder">
        {{ $t('DepositWithdraw.Sure') }}
      </div>
    </div>
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, computed } from 'vue'
import { getCancelOrder } from '@/api/recharge'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import { ElMessageBox } from 'element-plus'
import { useOpenNewWindow } from '@/hooks/useOpenNewWindow'

import eventBus from '@/utils/eventBus'
const emit = defineEmits(['closeOrder'])

const { closeNewWindow } = useOpenNewWindow()

const props = defineProps({
  isRevocationShow: {
    type: Boolean
  },
  orderNo: {
    type: String
  }
})
const dialogShow = ref(false)

const checked = ref(false)

eventBus.on('isRevocationShow', (value) => {
  dialogShow.value = value
})
onUnmounted(() => {
  eventBus.off('isRevocationShow')
})
const onComputedRevocationShow = computed(() => {
  return props.isRevocationShow
})

dialogShow.value = onComputedRevocationShow.value

const closeBtn = () => {
  dialogShow.value = false
  emit('closeOrder')
}
// 撤销订单
const onClickCancelOrder = () => {
  if (checked.value) {
    ElMessageBox.confirm(
      i18n.global.t('DepositWithdraw.OrderPopup_5'),
      i18n.global.t('DepositWithdraw.Kindtips'),
      {
        confirmButtonText: i18n.global.t('DepositWithdraw.Sure'),
        cancelButtonText: i18n.global.t('DepositWithdraw.Cancel'),
        type: 'warning'
      }
    )
      .then(() => {
        getCancelOrder({ orderNo: props.orderNo }).then(() => {
          emit('closeOrder')
          const params = {
            isOpen: false
          }
          eventBus.emit('showCharge', params)
          closeNewWindow()
          eventBus.emit('updateBalnce', '1')
        })
      })
      .catch(() => {})
  }
}
</script>
<style lang='scss' scoped>
:deep() {
  .el-dialog__header {
    padding: 12px 20px 12px 20px !important;
    margin-right: 0px !important;
    border-radius: 8px 8px 0px 0px !important;
    background: var(--unnamed, #323c6f) !important;
  }
}
.dialong-title {
  width: 480px;
  height: 138px;
  padding-left: 20px;
  .title {
    color: var(--60, rgba(255, 255, 255, 0.6));
    font-size: 14px;
    margin: 32px 0 16px 0;
  }
  :deep() {
    .el-checkbox__inner {
      border-radius: 50%;
      // border: 1px solid #ff5000;
    }
    .el-checkbox__input.is-checked::before {
      // background-color: #ff5000 !important;
    }
  }
  .checkbox {
    display: flex;
    align-items: center;
    color: var(--100, #fff);
    font-size: 14px;
    .checkbox-text {
      margin-left: 8px;
    }
  }
}
.dialong-footer {
  width: 480px;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  .dialong-footer-btn {
    display: flex;
    min-width: 84px;
    height: 32px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: var(--60, rgba(255, 255, 255, 0.6));
    font-size: 14px;
    border-radius: 4px;
    background: var(--unnamed, #171a2f);
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
  }
  .dialong-footer-btns {
    display: flex;
    min-width: 60px;
    height: 32px;
    padding: 5px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: var(--color-white, #fff);
    font-size: 14px;
    margin: 0 20px 0 10px;
    border-radius: 4px;
    opacity: 0.5;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
  .active {
    border-radius: 4px;
    opacity: 1;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
</style>