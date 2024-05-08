<template>
  <div class="noMoney">
    <CustomizeDialog
      :dialogShow="dialogShow"
      @closeBtn="closeBtn"
      :title="$t('Components.InsufficientBalance')"
      :width="480"
      v-if="dialogShow"
    >
      <div class="tle" v-if="props.txt">{{ props.txt }}</div>
      <div class="btnDiv">
        <div class="btn" @click="cancelBtn">{{ $t('Components.Cancel') }}</div>
        <div class="btn recharge" @click="goRecharge">{{ $t('Components.Deposit') }}</div>
      </div>
    </CustomizeDialog>
  </div>
</template>
<script setup>
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import { onMounted } from 'vue'
import eventBus from '@/utils/eventBus'
const dialogShow = ref(false)
const emit = defineEmits(['closeGift'])
const props = defineProps({
  txt: {
    type: String
  },
  isShow: {
    type: Boolean
  }
})
onMounted(() => {
  dialogShow.value = props.isShow
})
const cancelBtn = () => {
  dialogShow.value = false
  emit('closeGift')
}
const goRecharge = () => {
  dialogShow.value = false
  const params = {
    isOpen: true
  }
  eventBus.emit('showCharge', params)
  emit('closeGift')
}
const closeBtn = () => {
  dialogShow.value = false
  emit('closeGift')
}
</script>
<style lang="scss" scoped>
.noMoney {
  .tle {
    color: var(--60, rgba(255, 255, 255, 0.6));

    /* 标准/400/B1-14-Base */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    letter-spacing: -0.01px;
  }
  .btnDiv {
    display: flex;
    column-gap: 12px;
    margin-top: 20px;
    justify-content: end;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 32px;
    border-radius: 4px;
    background: var(--unnamed, #171a2f);
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
    color: var(--60, rgba(255, 255, 255, 0.6));
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
  }
  .recharge {
    width: 60px;
    height: 32px;
    color: var(--color-white, #fff);
    box-shadow: none;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
</style>
