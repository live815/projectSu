<template>
  <div class="cellIphone-content">
    <NavBar :title="$t('LetterC.BindPhoneNumber')" />
    <div class="cellIphone">
      <div class="bankInfo-iphone">
        <div class="phone-wrapper">
          <div class="country-wrapper">
            <Country v-model="country" />
          </div>
          <CustomInputBorder
            :maxLength="getPhoneInputLength(country.countryCode)"
            :placeholder="$t('LetterC.EnterPhoneNumber')"
            v-model="bankInfo.phone"
            isPhone
            class="bankInfo-iphone-num"
          />
        </div>

        <div class="code-wrapper">
          <CustomInputBorder
            :maxLength="6"
            :placeholder="$t('LetterC.EnterVerificatCode')"
            v-model="bankInfo.code"
          />
          <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
        </div>
      </div>
      <div class="addBankcard-iphone-text">
        {{ $t('LetterC.LetterCTip1') }}
      </div>
      <div class="addBankcard-footer-btn">
        <DedicatedButton :color="isColor" @click="onClickAdd">
          {{ $t('LetterC.Bind') }}</DedicatedButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import { computed, reactive } from 'vue'
import { getBindMobile } from '@/api/bindInfo'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useSendCode } from '@/hooks/useSendCode'
const { availableSendCode, sendCode, getPhoneInputLength } = useSendCode()
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
import { getRegByPhoneCode } from '@/utils/regCountry'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(country.value?.phoneCode)
})
const router = useRouter()
const country = ref({})
const bankInfo = reactive({
  phone: '',
  code: ''
})
const isColor = computed(() => {
  if (bankInfo.phone && bankInfo.code) {
    return 'primary'
  } else {
    return ''
  }
})

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
    sendCode(bankInfo.phone, 4, country.value.phoneCode, validate, user.userInfo.userName)
  })
}

const onClickAdd = () => {
  const params = {
    mobile: bankInfo.phone,
    mobileCode: country.value.phoneCode.replace(/\+/, ''),
    smsCode: bankInfo.code
  }
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  getBindMobile(params)
    .then((res) => {
      if (res.data) {
        showToast(i18n.global.t('LetterC.BindSuccess'))
        closeToast()
        router.back()
      } else {
        closeToast()
      }
    })
    .catch(() => {
      closeToast()
    })
}
</script>
<style lang="scss" scoped>
.cellIphone-content {
  background: #fff;
}
.cellIphone {
  padding: 0 25px;
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
        left: 1em;
        bottom: 12px;
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
    color: #999;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
  .addBankcard-footer-btn {
    margin-top: 200px;
  }
}
</style>
