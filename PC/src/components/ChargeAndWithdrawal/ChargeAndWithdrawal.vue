<template>
  <div class="charge-withdrawal">
    <el-dialog
      v-model="isShow"
      v-if="isShow"
      width="720"
      :before-close="handleClose"
      :align-center="true"
      :show-close="false"
      class="charge-withdrawal-el-dialog"
    >
      <template #header>
        <div class="title">
          <div class="close-btn" @click="handleClose"><img :src="closeicon" /></div>
          <div
            :class="mainConfig.currentShow == 1 ? 'subtitle active' : 'subtitle  '"
            @click="changeShow(1)"
          >
            <div class="subtitle-text">{{ $t('DepositWithdraw.Deposit') }}</div>
          </div>
          <div
            :class="mainConfig.currentShow == 2 ? 'subtitle active' : 'subtitle '"
            @click="changeShow(2)"
          >
            <div class="subtitle-text">
              {{ $t('DepositWithdraw.Withdraw') }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="!mainConfig.isCourse">
        <div class="main-container">
          <!-- 充值页面 -->
          <Charge
            ref="chargeComp"
            v-if="mainConfig.currentShow == 1 && mainConfig.detailType == 0"
          />
          <!-- 提现页面 -->
          <WithDrawal
            ref="withdrawRef"
            v-if="mainConfig.currentShow == 2 && mainConfig.detailType == 0 && !mainConfig.isCourse"
          />
          <!-- 充值详情 -->
          <ChargeInfo v-if="mainConfig.detailType == 1 && mainConfig.orderDetail" />
          <!-- 提现详情 -->
          <WithDrawalInfo v-if="mainConfig.detailType == 2" />
        </div>
        <!-- 按钮 -->
        <div class="footer">
          <PhoneCall />
          <div
            class="contant"
            @mouseleave="showChannels = false"
            @click="showChannels = !showChannels"
          >
            {{ $t('DepositWithdraw.ContactCustomerService') }}
            <CSChannels :isServicePop="showChannels" style="top: -92px; left: -40px" />
          </div>
          <template v-if="mainConfig.currentShow == 1">
            <template v-if="mainConfig.currentType == 0">
              <ButtonV
                v-if="
                  mainConfig.currentShow == 1 &&
                  mainConfig.detailType == 0 &&
                  mainConfig.bankSupport.length > 0 &&
                  mainConfig.bankSupport[mainConfig.currentMethod].bindCardState == 1 &&
                  mainConfig.cardBinded == 0
                "
                class="add-btn"
                :text="$t('DepositWithdraw.Addbankcard')"
                :active="true"
                :width="'530px'"
                @click="onClickBank(1)"
              ></ButtonV>
              <ButtonV
                v-else-if="
                  mainConfig.currentShow == 1 &&
                  mainConfig.detailType == 0 &&
                  mainConfig.bankSupport.length > 0 &&
                  mainConfig.bankSupport[mainConfig.currentMethod].bindPhoneState == 1 &&
                  mainConfig.phoneBinded == 0
                "
                class="add-btn"
                :text="$t('DepositWithdraw.AddPhone')"
                :active="true"
                :width="'530px'"
                @click="onClickBank(2)"
              ></ButtonV>
              <ButtonV
                v-if="
                  mainConfig.currentShow == 1 &&
                  mainConfig.detailType == 0 &&
                  mainConfig.bankSupport.length > 0 &&
                  (mainConfig.bankSupport[mainConfig.currentMethod].bindPhoneState == 0 ||
                    mainConfig.phoneBinded == 1) &&
                  (mainConfig.bankSupport[mainConfig.currentMethod].bindCardState == 0 ||
                    mainConfig.cardBinded == 1)
                "
                class="add-btn"
                :text="$t('DepositWithdraw.RechargeNow')"
                :active="true"
                :width="'530px'"
                @click="handleNext"
              ></ButtonV>
            </template>
            <template v-if="mainConfig.currentType == 1">
              <ButtonV
                v-if="
                  mainConfig.currentShow == 1 &&
                  mainConfig.detailType == 0 &&
                  mainConfig.cryptoDpChannelList.length > 0 &&
                  mainConfig.cryptoDpChannelList[0].bindCardState == 1 &&
                  mainConfig.cardBinded == 0
                "
                class="add-btn"
                :text="$t('DepositWithdraw.Addbankcard')"
                :active="true"
                :width="'530px'"
                @click="onClickBank(1)"
              ></ButtonV>

              <ButtonV
                v-else-if="
                  mainConfig.currentShow == 1 &&
                  mainConfig.detailType == 0 &&
                  mainConfig.cryptoDpChannelList.length > 0 &&
                  mainConfig.cryptoDpChannelList[0].bindPhoneState == 1 &&
                  mainConfig.phoneBinded == 0
                "
                class="add-btn"
                :text="$t('DepositWithdraw.AddPhone')"
                :active="true"
                :width="'530px'"
                @click="onClickBank(2)"
              ></ButtonV>
              <ButtonV
                v-if="
                  mainConfig.currentShow == 1 &&
                  mainConfig.detailType == 0 &&
                  mainConfig.cryptoDpChannelList.length > 0 &&
                  (mainConfig.cryptoDpChannelList[0].bindPhoneState == 0 ||
                    mainConfig.phoneBinded == 1) &&
                  (mainConfig.cryptoDpChannelList[0].bindCardState == 0 ||
                    mainConfig.cardBinded == 1)
                "
                class="add-btn"
                :text="$t('DepositWithdraw.RechargeNow')"
                :active="true"
                :width="'530px'"
                @click="handleNext"
              ></ButtonV>
            </template>

            <ButtonV
              v-if="
                mainConfig.detailType == 1 &&
                mainConfig.currentType == 0 &&
                mainConfig.detailType == 1 &&
                mainConfig.isupLoad == 0 &&
                (mainConfig.orderDetail?.channelTypeCode == 'BANK' ||
                  mainConfig.orderDetail?.channelTypeCode == 'C2C_BANK' ||
                  mainConfig.orderDetail?.channelTypeCode == 'VNCard' ||
                  mainConfig.orderDetail?.channelTypeCode == 'VNBank')
              "
              class="add-btn"
              :text="$t('DepositWithdraw.PaidUploadVoucher')"
              :active="true"
              :width="'530px'"
              @click="changeShowUpload"
            ></ButtonV>
            <ButtonV
              v-if="
                mainConfig.detailType == 1 &&
                mainConfig.currentType == 0 &&
                mainConfig.isupLoad == 1
              "
              class="add-btn"
              :text="
                isReminder
                  ? $t('DepositWithdraw.Iwanttoremindyou')
                  : `${$t('DepositWithdraw.Iwanttoremindyou')}${formatTime}`
              "
              :active="isReminder"
              :width="'530px'"
              @click="onClickReminder"
            ></ButtonV>
          </template>
          <template v-if="mainConfig.currentShow == 2">
            <ButtonV
              class="add-btn"
              v-if="
                mainConfig.currentShow == 2 &&
                mainConfig.detailType == 0 &&
                withdrawStore.wdChannelTypeList.length > 0
              "
              :text="$t('DepositWithdraw.WithdrawImmediately')"
              :active="true"
              :width="'530px'"
              @click="handleNext"
            ></ButtonV>
            <ButtonV
              v-if="withdrawStore.setpActive == 2 && withdrawStore.withdrawDetail.splitFlag == 0"
              class="add-btn"
              :text="$t('DepositWithdraw.ConfirmPayment')"
              :active="true"
              :width="'530px'"
              @click="onClickConfirmation"
            ></ButtonV>
          </template>
          <div class="add-btn" :width="'530px'" :active="true"></div>
        </div>
      </template>
      <template v-else>
        <Course></Course>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { watch } from 'vue'
import closeicon from './img/close-icon.png'
import WithDrawalInfo from './WithDrawalInfo.vue'
import ChargeInfo from './ChargeInfo.vue'
import Charge from './Charge.vue'
import WithDrawal from './WithDrawal.vue'
import PhoneCall from '@/components/icons/PhoneCall.vue'
import ButtonV from '@/components/ButtonV'
import Course from './components/Course'
import { useWithdrawStore } from '@/stores/withdraw'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import CSChannels from '@/components/CSChannels'

const router = useRouter()
const user = useUserStore()
const mainConfig = useChargeAndWithdrawal()
const withdrawStore = useWithdrawStore()
const showChannels = ref(true)

// 定义充值的ref
const chargeComp = ref(null)
// 定义提现的ref
const withdrawRef = ref(null)
const isShow = ref(false)

// 我要催单按钮高亮
const isReminder = ref(true)
// 底部催单按钮倒计时
const footerBtnTime = ref(null)
// 顶部切换栏
function changeShow(page) {
  mainConfig.currentShow = page
  if (mainConfig.currentShow == 1) {
    mainConfig.getRecentlyOrder({ orderNo: '' })
  } else {
    if (mainConfig.isCourse) {
      mainConfig.isCourse = false
    }
    // 是否已点击提现详情
    withdrawStore.getWithdrawOrderNoDetail({ orderNo: '' })
  }
}

eventBus.on('showCharge', (val) => {
  const { isOpen, current } = val
  if (isOpen) {
    isShow.value = true
    user.getUserInfoAction()
    mainConfig.userBalance = user.balance || 0
    mainConfig.currentMethod = 0
    if (current == 2) {
      // 最近是否有提现的订单
      withdrawStore.getWithdrawOrderNoDetail({ orderNo: '' })
    } else {
      // 最近是否有充值的订单
      mainConfig.getRecentlyOrder({ orderNo: '' })
    }
  } else {
    resetInfo()
  }
})
onUnmounted(() => {
  eventBus.off('showCharge')
})
// 重置信息
const resetInfo = () => {
  mainConfig.currentShow = 1
  mainConfig.currentType = 0
  mainConfig.detailType = 0
  mainConfig.isupLoad = 0
  isShow.value = false
  mainConfig.currentMethod = 0
  mainConfig.isCourse = false
}

// 关闭弹窗
function handleClose() {
  resetInfo()
}

// 判断是点击充值 还是提现
async function handleNext() {
  if (mainConfig.currentShow == 1) {
    mainConfig.detailType = 0
    if (mainConfig.currentType == 0) {
      chargeComp.value.toWithdarw()
    } else {
      chargeComp.value.getVirtualAdd()
    }
    eventBus.emit('updateBalnce', '1')
  } else {
    withdrawRef.value.getWithraw()
    eventBus.emit('updateBalnce', '2')
  }
}

// 点击添加手机号或者银行卡
const onClickBank = (val) => {
  const params = {
    isOpen: false
  }
  eventBus.emit('showCharge', params)
  if (val == 1) {
    // 获取当前路由路径
    const currentPath = router.currentRoute.value.path
    const currentName = router.currentRoute.value.path
    // 判断当前路径是否包含需要跳转的路径
    if (!currentPath.includes('/personal/6')) {
      // 移除路径中的重复部分
      const newPath = currentPath.replace(currentName, '')
      // 进行路由跳转
      router.push('/personal/6' + newPath)
    }
  } else {
    // 获取当前路由路径
    const currentPath = router.currentRoute.value.path
    const currentName = router.currentRoute.value.path
    // 判断当前路径是否包含需要跳转的路径
    if (!currentPath.includes('/personal/6')) {
      // 移除路径中的重复部分
      const newPath = currentPath.replace(currentName, '')
      // 进行路由跳转
      router.push('/personal/6' + newPath)
    }
  }
}
// 上传支付凭证
const changeShowUpload = () => {
  eventBus.emit('isShowUpload')
}

// 我要催单
const onClickReminder = () => {
  if (isReminder.value) {
    footerBtnTime.value = 1 * 60
    isReminder.value = false
    footerBtnTime.value--
    ElMessage(i18n.global.t('DepositWithdraw.RemaindTips_1'))
  }
}

// 确认收款弹窗
const onClickConfirmation = () => {
  eventBus.emit('isCapitalPopup', withdrawStore.withdrawDetail?.orderNo)
}

const formatTime = computed(() => {
  const minutes = Math.floor(footerBtnTime.value / 60)
  const seconds = footerBtnTime.value % 60
  return `(${minutes}${i18n.global.t('DepositWithdraw.Minute')}${seconds}${i18n.global.t(
    'DepositWithdraw.Second'
  )})`
})
watch(footerBtnTime, (newVal) => {
  if (newVal <= 0) {
    isReminder.value = true
    // 倒计时结束
    // 在这里可以添加倒计时结束后的逻辑
    return
  }
  setTimeout(() => {
    footerBtnTime.value = newVal - 1 // 每秒减1
  }, 1000)
})
</script>

<style lang="scss" scoped>
.charge-withdrawal {
  .title {
    position: relative;
    display: flex;
    gap: 8px;
    width: 100%;
    height: 46px;
    align-items: flex-end;
    background-color: rgba(255, 0, 0, 0);

    .close-btn {
      position: absolute;
      right: -35px;
    }
    .subtitle {
      position: relative;
      width: 356px;
      height: 45px;
      text-align: center;
      color: var(--60, rgba(255, 255, 255, 0.6));

      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
    }
    .subtitle.active {
      height: 50px;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      border-radius: 20px 20px 0 0;
      color: var(--100, #fff);
    }
    .subtitle-text {
      text-align: center;
      line-height: 50px;
    }
  }
  .main-container {
    height: 600px;
    overflow: scroll;
    scrollbar-width: none; //火狐浏览器 隐藏滚动条
  }
  .footer {
    display: flex;
    align-items: center;
    width: 720px;
    height: 78px;
    padding-left: 30px;
    border-radius: 0px 0px 20px 20px;
    background: #323c6f;
    .contant {
      position: relative;
      margin-left: 6px;
      margin-right: 53px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
    }
  }
  :deep() {
    .charge-withdrawal-el-dialog {
      background: var(--unnamed, #323c6f) !important;
      border-radius: 15px;
    }
    .charge-withdrawal-el-dialog .el-dialog__header {
      padding: 0;
      margin-right: 0px !important;
      border-radius: 12px 12px 0px 0px;
      // padding-bottom: 20px;
      background: var(--unnamed, #323c6f) !important;
    }
    .charge-withdrawal-el-dialog .el-dialog__title {
      color: var(--100, #fff);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 100% */
      opacity: 0.8;
      background-color: transparent;
    }
    .charge-withdrawal-el-dialog .el-dialog__headerbtn .el-dialog__close {
      font-size: 26px;
      color: #fff;
      top: -14px;
      svg {
        height: 20px;
        width: 20px;
      }
    }
    .charge-withdrawal-el-dialog .el-dialog__body {
      background: #232949;
      padding: 0;
      overflow: scroll;
      scrollbar-width: none; //火狐浏览器 隐藏滚动条
    }
    .charge-withdrawal-el-dialog .el-dialog__footer {
      padding: 0;
    }
  }
}
</style>
