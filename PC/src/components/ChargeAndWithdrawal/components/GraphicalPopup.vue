<template>
  <CustomizeDialog
    :dialogShow="dialogShow"
    :width="480"
    :title="$t('DepositWithdraw.Voucherimageexample')"
    v-if="dialogShow"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="graphical-content">
      <div class="graphical-content-top">
        <p>• {{ $t('DepositWithdraw.ReceiptTips_1') }}</p>
        <p>• {{ $t('DepositWithdraw.ReceiptTips_2') }}</p>
        <p>• {{ $t('DepositWithdraw.ReceiptTips_3') }}</p>
      </div>
      <div class="graphical-content-img">
        <img class="img" src="../img/graphical1.png" />
        <img class="img" src="../img/graphical2.png" />
      </div>
    </div>
    <div class="footer-btn" @click="closeBtn">{{ $t('DepositWithdraw.Isee') }}</div>
  </CustomizeDialog>
</template>

<script setup >
import eventBus from '@/utils/eventBus'

const dialogShow = ref(false)
const closeBtn = () => {
  dialogShow.value = false
}

eventBus.on('graphical', () => {
  dialogShow.value = true
})
onUnmounted(() => {
  eventBus.off('graphical')
})
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
.graphical-content {
  width: 480px;
  height: auto;
  .graphical-content-top {
    width: 440px;
    height: 72px;
    margin: 20px auto;
    p {
      color: var(--100, #fff);
      font-size: 14px;
      line-height: 24px; /* 171.429% */
    }
  }
  .graphical-content-img {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .img {
      width: 187px;
      height: 54px;
    }
    .img:first-child {
      margin-right: 23px;
    }
  }
}
.footer-btn {
  width: 160px;
  height: 32px;
  color: var(--color-white, #fff);
  text-align: center;
  font-size: 14px;
  line-height: 32px;
  margin: 10px auto 20px;
  border-radius: 4px;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
}
</style>