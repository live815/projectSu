<template>
  <CustomizeDialog
    :dialogShow="isRecommendedPopup"
    :width="480"
    :title="$t('DepositWithdraw.tip65')"
    v-if="isRecommendedPopup"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="popup-min">
      <div class="popup-min-title">
        <p>{{ $t('DepositWithdraw.tip66') }}</p>

        <p>{{ $t('DepositWithdraw.tip67') }}</p>
      </div>
      <div class="popup-min-item">
        <div
          class="popup-min-item-list"
          v-for="(item, index) in amountData.amountList"
          :key="index"
          :class="{ active: item.highlighted }"
          @click="selectBank(item)"
        >
          <span> <CurrencyUnit />{{ item.amount }}</span>
          <img src="../img/checkIcon.png" class="span" v-if="item.highlighted" />
        </div>
      </div>
    </div>
    <div class="popup-min-footer">
      <div class="popup-min-footer-left" @click="onClickAmount(1)">
        {{ $t('DepositWithdraw.tip68') }}
      </div>
      <div class="popup-min-footer-right" @click="onClickAmount(2)">
        {{ $t('DepositWithdraw.tip69') }}
      </div>
    </div>
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import eventBus from '@/utils/eventBus'
import { getDeviceInfo } from '@/utils/mobileDeviceInfo'
import { getc2cOrder } from '@/api/recharge.js'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal'
const { deviceId, optClient } = getDeviceInfo()
const mainConfig = useChargeAndWithdrawal()

// 点击推荐金额当前项
const checkedObj = ref({})

// 传递过来的数据
const amountData = ref({})
const isRecommendedPopup = ref(false)
eventBus.on('isRecommendedPopup', (val) => {
  amountData.value = val
  isRecommendedPopup.value = true
})
onUnmounted(() => {
  // eventBus.off('isRecommendedPopup')
})
const closeBtn = () => {
  isRecommendedPopup.value = false
}

// 点击当前项
const selectBank = (item) => {
  amountData.value.amountList.forEach((el) => {
    if (el.amount == item.amount) {
      item.highlighted = true
    } else {
      el.highlighted = false
    }
  })
  if (item.highlighted) {
    checkedObj.value = { ...item }
  } else {
    checkedObj.value = {}
  }
}
// 点击推荐金额
const onClickAmount = (val) => {
  if (val == 1) {
    const params = {
      amount: amountData.value.amount,
      channelTypeId: amountData.value.channelTypeId,
      amountType: 2,
      realName: amountData.value.realName,
      deviceId: deviceId.value,
      optClient: optClient.value,
      bankCode: amountData.value.bankCode
    }
    getc2cOrder(params)
      .then((res) => {
        if (res.code == 200) {
          mainConfig.OrderNo = res.data.orderNo
          mainConfig.detailType = 1
          // 证明已经开始充值
          mainConfig.isRecharge = true
          mainConfig.addOrderDetail(res.data)
          isRecommendedPopup.value = false
        }
      })
      .catch((err) => {})
  } else {
    const params = {
      amount: checkedObj.value.amount
        ? checkedObj.value.amount
        : amountData.value.amountList[0].amount,
      channelTypeId: amountData.value.channelTypeId,
      amountType: 1,
      realName: amountData.value.realName,
      deviceId: deviceId.value,
      optClient: optClient.value,
      bankCode: amountData.value.bankCode
    }
    getc2cOrder(params).then((res) => {
      if (res.code == 200) {
        mainConfig.OrderNo = res.data.orderNo
        mainConfig.detailType = 1
        // 证明已经开始充值
        mainConfig.isRecharge = true
        mainConfig.addOrderDetail(res.data)
        isRecommendedPopup.value = false
      }
    })
  }
  eventBus.emit('updateBalnce', '1')
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
  .popup-min-title {
    width: 440px;
    color: var(-----100, #fff);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 185.714% */
    margin: 32px 20px 18px 20px;
  }
  .popup-min-item {
    width: 100%;
    .popup-min-item-list {
      position: relative;
      height: 48px;
      color: var(-----100, #fff);
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px;
      background: #1d223c;
      text-align: center;
      .span {
        position: absolute;
        top: 50%;
        right: 15px;
        width: 16px;
        height: 12px;
        transform: translateY(-50%);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .active {
      background: #171a2f;
    }
  }
}
.popup-min-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  .popup-min-footer-left,
  .popup-min-footer-right {
    min-width: 160px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: var(-----60, rgba(255, 255, 255, 0.6));
    font-size: 14px;
    border-radius: 4px;
    background: #171a2f;
  }
  .popup-min-footer-right {
    margin-left: 36px;
    color: var(--color-white, #fff);
    border-radius: 4px;
    background: var(-----, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
</style>