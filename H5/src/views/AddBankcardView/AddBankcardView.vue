<template>
  <div class="addBankcard">
    <NavBar :title="$t('AddPage.BindbankCard')" />
    <van-cell-group>
      <van-field
        class="border-cell"
        v-model="bankInfo.cardholder"
        :label="$t('AddPage.HolderName')"
        :placeholder="$t('AddPage.PleaseEnterYourRealName')"
        input-align="right"
        type="text"
        :style="{ '--placeholder-color': '#d7d7d7' }"
        @update:model-value="convertToUpperCase"
      />
    </van-cell-group>
    <div class="addBankcard-text">
      {{ $t('AddPage.AddPageTip1') }}
    </div>
    <div class="addBankcard-border">
      <div class="addBankcard-selector">
        <div class="addBankcard-selector-left">{{ $t('AddPage.AccountopenBank') }}</div>
        <div class="addBankcard-selector-right" @click="isBankPicker = true">
          <template v-if="bankInfo.selectedOptions.bankName">
            <img
              class="addBankcard-selector-right-img"
              :src="getImg(bankInfo.selectedOptions.icon)"
            />
            <div class="addBankcard-selector-right-title title-color">
              {{ bankInfo.selectedOptions.bankName }}
            </div>
            <img :src="arrowIcon" />
          </template>
          <template v-else>
            <div class="addBankcard-selector-right-title">{{ $t('AddPage.SelectBankCard') }}</div>
            <img :src="arrowIcon" />
          </template>
        </div>
      </div>
      <van-cell-group class="outer-container">
        <van-field
          v-model="bankInfo.cardNo"
          :label="$t('AddPage.BankcardNumber')"
          :placeholder="$t('AddPage.EnterBankcardNumber')"
          input-align="right"
          :minlength="getBankCardInputMinLength(country.countryCode)"
          :maxlength="19"
          type="number"
          :style="{ '--placeholder-color': '#d7d7d7', 'font-size': '15px' }"
        />
      </van-cell-group>
      <van-cell-group class="outer-container">
        <van-field
          v-model="bankInfo.accountAddr"
          :label="$t('AddPage.Openingaddress')"
          :placeholder="$t('AddPage.EnterOpeningaddress')"
          input-align="right"
          :style="{ '--placeholder-color': '#d7d7d7', 'font-size': '15px' }"
        />
      </van-cell-group>
    </div>
    <div class="bankInfo-iphone" v-if="isIphoneShow">
      <div class="phone-wrapper">
        <div class="country-wrapper">
          <Country v-model="country" />
        </div>
        <CustomInputBorder
          :maxLength="getPhoneInputLength(country.countryCode)"
          :placeholder="$t('AddPage.EnterphoneNumber')"
          v-model="bankInfo.phone"
          isPhone
          class="bankInfo-iphone-num"
        />
      </div>

      <div class="code-wrapper">
        <CustomInputBorder
          :maxLength="6"
          :placeholder="$t('AddPage.EnterVerificationCode')"
          v-model="bankInfo.code"
        />
        <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
      </div>
    </div>
    <div class="addBankcard-iphone-text" v-if="isIphoneShow">
      {{ $t('AddPage.AddPageTip2') }}
    </div>
    <div class="addBankcard-footer-btn">
      <DedicatedButton :color="color" @click="onClickAdd">
        {{ $t('AddPage.Addto') }}</DedicatedButton
      >
    </div>
    <!-- 点击银行卡弹出的弹窗 -->
    <CustomPicker :visible="isBankPicker" @onConfirm="onConfirm"></CustomPicker>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/NavBar'
import arrowIcon from './img/arrowIcon.png'
import CustomPicker from './components/CustomPicker/CustomPicker'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import { getBankCheckMobile, getBindBankCard, getBindWithPhone } from '@/api/bindInfo'
import { getImg } from '@/utils'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { getRegByPhoneCode } from '@/utils/regCountry'
import { useSendCode } from '@/hooks/useSendCode'
const { availableSendCode, sendCode, getPhoneInputLength, getBankCardInputMinLength } =
  useSendCode()
import { useCaptcha } from '@/hooks/useCaptcha'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

const { initCaptcha, isloading } = useCaptcha()
const country = ref({})
const router = useRouter()
const color = ref('')
onMounted(() => {
  getMobile()
})
// 选择银行显示
const isBankPicker = ref(false)
// 手机号页面是否显示
const isIphoneShow = ref(true)
// 添加银行的信息
const bankInfo = reactive({
  cardholder: '',
  cardNo: '',
  selectedOptions: {
    bankName: '',
    icon: '',
    bankCode: ''
  },
  phone: '',
  mobileCode: '',
  code: '',
  accountAddr: ''
})
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(country.value?.phoneCode)
})
// 检测是否获取到手机号
const getMobile = () => {
  getBankCheckMobile().then((res) => {
    const { data } = res
    if (data) {
      isIphoneShow.value = false
    }
  })
}
// 获取验证码
const onSendCode = () => {
  if (isloading.value) return
  if (!bankInfo.phone) {
    return showToast(i18n.global.t('Rletter.enternumber'))
  }
  if (!i18nPhoneReg.value?.test(bankInfo.phone)) {
    return showToast(i18n.global.t('Lletter.Llettertip13'))
  }
  // 三方图形验证
  initCaptcha(function (validate) {
    isloading.value = false
    sendCode(bankInfo.phone, 5, country.value.phoneCode, validate, user.userInfo.userName)
  })
}

// 限制输入的转换大写
const convertToUpperCase = () => {
  const site = import.meta.env.VITE_SITE
  if (site === 'vietnam') {
    bankInfo.cardholder = bankInfo.cardholder
      .toUpperCase()
      .replace(/[^A-Z\s]/g, '')
      .replace(/[a-z]/g, '')
      .replace(/[0-9]/g, '')
  }
}

// 添加成功按钮
const onClickAdd = () => {
  // 是否需要绑定手机号
  if (isIphoneShow.value) {
    if (bankInfo.cardholder && bankInfo.cardNo && bankInfo.phone && bankInfo.code) {
      const params = {
        bankcode: bankInfo.selectedOptions.bankCode,
        bankname: bankInfo.selectedOptions.bankName,
        cardNo: bankInfo.cardNo,
        cardholder: bankInfo.cardholder,
        icon: bankInfo.selectedOptions.icon,
        mobile: bankInfo.phone,
        mobileCode: country.value.phoneCode.replace(/\+/, ''),
        smsCode: bankInfo.code,
        accountAddr: bankInfo.accountAddr
      }
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      getBindWithPhone(params)
        .then((res) => {
          const { data } = res
          if (data) {
            router.back()
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    } else {
      closeToast()
      showToast(i18n.global.t('AddPage.FillCorrectInformat'))
    }
  } else {
    if (bankInfo.cardholder && bankInfo.cardNo && bankInfo.selectedOptions.bankCode) {
      const params = {
        bankcode: bankInfo.selectedOptions.bankCode,
        bankname: bankInfo.selectedOptions.bankName,
        cardNo: bankInfo.cardNo,
        cardholder: bankInfo.cardholder,
        icon: bankInfo.selectedOptions.icon,
        accountAddr: bankInfo.accountAddr
      }
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      getBindBankCard(params)
        .then((res) => {
          const { data } = res
          if (data) {
            router.push('/bankcard')
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    } else {
      closeToast()
      showToast(i18n.global.t('AddPage.FillCorrectInformat'))
    }
  }
}
// 点击银行卡弹出的弹窗
const onConfirm = (value) => {
  if (value) {
    bankInfo.selectedOptions.bankCode = value.bankCode
    bankInfo.selectedOptions.bankName = value.bankName
    bankInfo.selectedOptions.icon = value.icon
  }
  isBankPicker.value = false
}

watchEffect(() => {
  // 是否需要绑定手机号
  if (isIphoneShow.value) {
    if (
      bankInfo.cardholder &&
      bankInfo.selectedOptions.bankCode &&
      bankInfo.cardNo &&
      bankInfo.phone &&
      bankInfo.code
    ) {
      color.value = 'primary'
    } else {
      color.value = ''
    }
  } else {
    if (bankInfo.selectedOptions.bankCode && bankInfo.cardNo && bankInfo.cardholder) {
      color.value = 'primary'
    } else {
      color.value = ''
    }
  }
})
</script>
<style lang="scss" scoped>
.addBankcard {
  position: relative;
  padding: 15px;
  background: #fff;

  .addBankcard-text {
    color: #999;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    margin: 8px 0 20px 0;
  }
  .addBankcard-border {
    border-radius: 8px;
    border: 1px solid #eee;
    background: rgba(255, 255, 255, 0);
    box-sizing: border-box;

    .addBankcard-selector {
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 0 16px;
      font-size: 15px;
      .addBankcard-selector-left {
        color: #111;
      }
      .addBankcard-selector-right {
        display: flex;
        align-items: center;
        font-size: 14;
        .addBankcard-selector-right-img {
          width: 24px;
          height: 24px;
        }
        .addBankcard-selector-right-title {
          color: #d7d7d7;
          font-size: 15px;
          margin: 0 6px 0 8px;
        }
        .title-color {
          color: #111;
          font-size: 16px;
        }
        img {
          width: 12px;
          height: 12px;
        }
      }
    }
    :deep().van-hairline--top-bottom::after {
      border-width: 0; /* 取消::after伪元素的border-width */
    }
    :deep().outer-container {
      border-radius: 8px; /* 添加自定义圆角样式 */
      overflow: hidden; /* 确保内部元素不会溢出外部容器 */
    }
  }

  .bankInfo-iphone {
    margin-top: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    background: rgba(255, 255, 255, 0);
    .phone-wrapper {
      position: relative;
      .country-wrapper {
        position: absolute;
        z-index: 10;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 78px;
      }
      .bankInfo-iphone-num {
        margin: 0;
      }
      :deep().input-group-item .label {
        margin-bottom: 0;
      }

      :deep().input-group-item .input-wrapper input {
        border: none;
        border-bottom: 1px solid #eee;
        border-radius: 0;
      }
    }
    .code-wrapper {
      position: relative;
      .send-code {
        position: absolute;
        right: 20px;
        bottom: 18px;
      }
      :deep().input-group-item .label {
        margin-bottom: 0;
      }
      :deep().input-group-item {
        margin-bottom: 0;
      }
      :deep().input-group-item .input-wrapper input {
        border: none;
      }
    }
  }
  .addBankcard-iphone-text {
    margin-top: 8px;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: #999;
  }
  .addBankcard-footer-btn {
    width: 345px;
    margin: 80px auto 0;
  }
}

.border-cell {
  border-radius: 8px;
  border: 1px solid #eee;
  background: rgba(255, 255, 255, 0);

  font-size: 15px;
}
:deep().van-hairline--top-bottom::after {
  border-width: 0; /* 取消::after伪元素的border-width */
}
</style>
