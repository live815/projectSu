<template>
  <CustomizeDialog
    :dialogShow="tipsShow"
    :width="480"
    :title="$t('DepositWithdraw.Kindtips')"
    v-if="tipsShow"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="popup-min">
      <div class="text">
        {{ $t('DepositWithdraw.Flowrequirements') }}{{ tipsData?.totalBetRequest }}
      </div>
      <div class="text">
        {{ $t('DepositWithdraw.Remainingturnover') }}{{ tipsData?.totalBetUnFinished }}
      </div>
      <!-- <div class="text" v-if="tipsData?.totalBetFinished < tipsData?.totalBetRequest">
        {{ $t('DepositWithdraw.Salescompleted') }}<span>{{ tipsData?.totalBetFinished }}</span
        >/{{ tipsData?.totalBetRequest }}
      </div> -->
      <div class="text" style="margin-top: 25px">
        <span>*</span>{{ $t('DepositWithdraw.TipsPopupTips_1') }}
      </div>
    </div>
    <div class="popup-footer" @click="onClickGOHome">{{ $t('DepositWithdraw.ToComplete') }}</div>
  </CustomizeDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tipsData = ref({})
const emit = defineEmits(['closeWithdraw'])
const tipsShow = ref(false)

eventBus.on('tipsData', (val) => {
  tipsShow.value = true
  tipsData.value = val
})
onUnmounted(() => {
  eventBus.off('tipsData')
})
const closeBtn = () => {
  tipsShow.value = false
}

// 去完成
const onClickGOHome = () => {
  tipsShow.value = false
  emit('closeWithdraw')
  const params = {
    isOpen: false
  }
  eventBus.emit('showCharge', params)
  router.push('/sports')
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
  height: 156px;
  margin: 32px auto;
  .text:nth-child(2) {
    color: var(--2, #ff5000);
  }
  .text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    color: var(--100, #fff);

    span {
      color: var(--2, #ff5000);
    }
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