<template>
  <div>
    <el-dialog
      v-model="isShow"
      v-if="isShow"
      width="654px"
      :before-close="handleClose"
      :align-center="false"
    >
      <div class="upload-main-container">
        <div class="title">{{ $t('DepositWithdraw.UploadPaymentVoucher') }}</div>
        <div class="main-body">
          <div class="tip">
            {{ $t('DepositWithdraw.UploadPaymentVoucherTips_1') }}
          </div>
          <div class="upload-box">
            <div class="text-box">
              1.{{ $t('DepositWithdraw.UploadPaymentVoucherTips_2') }}
              <span @click="onClickGraphicalPopup"
                >（{{ $t('DepositWithdraw.UploadPaymentVoucherTips_3') }}）</span
              >
            </div>
            <div class="upload-row">
              <Uploader
                :text="$t('DepositWithdraw.Receipt')"
                :limit="1"
                :receiptType="1"
                @pushData="getData"
              ></Uploader>
            </div>
          </div>
          <div class="upload-box">
            <div class="text-box">
              2.{{ $t('DepositWithdraw.UploadPaymentVoucherTips_4') }}
              <span @click="onClickGraphicalPopup"
                >（{{ $t('DepositWithdraw.UploadPaymentVoucherTips_3') }}）</span
              >
            </div>
            <div class="upload-row">
              <Uploader
                :text="$t('DepositWithdraw.IncomeAndExpenditureFlow')"
                :limit="4"
                :receiptType="0"
                @pushData="getData"
              ></Uploader>
            </div>
          </div>
        </div>
        <div class="footer">
          <img src="../img/customer_service.png" />
          <div class="customer-service-text" @click="openCustomerServicePop">
            {{ $t('DepositWithdraw.ContactCustomerService') }}
          </div>
          <div class="btn btn-dark" @click="handleClose">{{ $t('DepositWithdraw.Cancel') }}</div>
          <div class="btn btn-light" @click="onClickAmount">
            {{ $t('DepositWithdraw.ConfirmSubmission') }}
          </div>
        </div>
      </div>
    </el-dialog>
    <GraphicalPopup></GraphicalPopup>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import Uploader from './Uploader.vue'
import { getBankUpload } from '@/api/recharge'
import eventBus from '@/utils/eventBus'
import GraphicalPopup from './GraphicalPopup.vue'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import { openCustomerServicePop } from '@/utils/customerService'
const mainConfig = useChargeAndWithdrawal()

const props = defineProps({
  isShowUpload: {
    type: Boolean,
    default: false
  },
  orderNo: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}
const isShow = computed(() => props.isShowUpload)

// 定义第一个图片，回执单图片地址
const receiptImg = ref('')

// 收支流水截图地址数组
const flowImgList = ref([])
const isloading = ref(false)
// 提交按钮
const onClickAmount = () => {
  isloading.value = true
  const params = {
    receiptImg: receiptImg.value,
    flowImgList: flowImgList.value,
    orderNo: props.orderNo
  }
  getBankUpload(params)
    .then(() => {
      mainConfig.isupLoad = 1
      mainConfig.getRecentlyOrder({ orderNo: props.orderNo })
      isloading.value = false
      emit('close', false)
    })
    .catch(() => {
      isloading.value = false
    })
}

// 打开图示
const onClickGraphicalPopup = () => {
  eventBus.emit('graphical')
}
const getData = (data, type) => {
  if (type) {
    receiptImg.value = data[0].url
  } else {
    flowImgList.value = data.map((item) => {
      return item.url
    })
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-dialog__body {
    border-radius: 8px;
  }
}
.upload-main-container {
  width: 654px;
  overflow: hidden;
  background: #232949;

  font-size: 14px;
  line-height: 22px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    border-bottom: 4px solid #1d223e;
    color: #fff;
    font-size: 18px;
  }
  .main-body {
    height: 540px;
    padding: 0 30px;
    .tip {
      margin-top: 30px;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .upload-box {
      width: 574px;
      height: 160px;
      margin-top: 24px;
      color: var(--100, #fff);
      span {
        color: var(--unnamed, #409eff);
      }
      .upload-row {
        padding-top: 20px;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    height: 78px;
    padding: 0 30px 0 36px;
    background: #323c6f;

    .customer-service-text {
      margin-left: 6px;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 44px;
      border-radius: 6px;
      font-size: 16px;
    }
    .btn-dark {
      margin-left: auto;
      margin-right: 20px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      background: #171a2f;
    }
    .btn-light {
      color: var(--100, #fff);
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    }
  }
}
</style>
