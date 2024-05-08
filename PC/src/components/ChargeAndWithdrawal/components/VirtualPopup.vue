<template>
  <CustomizeDialog
    :dialogShow="tipsShow"
    :width="480"
    :title="$t('DepositWithdraw.Withdrawaltips')"
    v-if="tipsShow"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="popup-min">
      {{ $t('DepositWithdraw.VirtualPopup_1') }}<span>{{ usdtMsg }}</span>
    </div>
    <div class="popup-footer" @click="onClickGOHome">{{ $t('DepositWithdraw.Sure') }}</div>
  </CustomizeDialog>
</template>

<script setup>
import { ref } from 'vue'
const usdtMsg = ref('')
const tipsShow = ref(false)

eventBus.on('virtualPopup', (val) => {
  tipsShow.value = true
  usdtMsg.value = val
})
onUnmounted(() => {
  eventBus.off('virtualPopup')
})
const closeBtn = () => {
  tipsShow.value = false
}

// 去完成
const onClickGOHome = () => {
  tipsShow.value = false
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
.popup-min {
  width: 440px;
  height: 48px;
  margin: 32px auto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  color: var(--100, #fff);

  span {
    color: var(--2, #ff5000);
  }
}
.popup-footer {
  margin: 0 auto 20px;
  width: 160px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
  color: var(--color-white, #fff);
  font-size: 14px;

  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
}
</style>