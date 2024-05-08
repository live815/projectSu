<template>
  <div class="input-box" @keyup.enter="userLogin">
    <div class="phone-box">
      <div class="country-box" @click.stop="showSelect">
        <div
          class="country-icon"
          :style="{ backgroundImage: 'url(' + currentCountryIcon + ')' }"
        ></div>
        <div class="phone-select">{{ currentAreaCode }}</div>
      </div>
      <input
        class="phone-input"
        type="text"
        :placeholder="$t('Components.EnterPhoneNumber')"
        v-model.trim="phoneNum"
        oninput="value=value.replace(/\D/g,'')"
        :maxlength="getPhoneInputLength(currentAreaName)"
      />
    </div>
    <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
    <div class="verification">
      <img class="icon" src="./img/verification.png" width="16" height="16" />
      <input
        class="verification-input"
        type="text"
        :placeholder="$t('Components.EnterVerificationCode')"
        v-model.trim="verificationCode"
        oninput="value=value.replace(/\D/g,'')"
        maxlength="6"
      />
      <div class="line"></div>
      <button class="verification-btn" @click="onSendCode" :disabled="countdown < 60">
        {{
          countdown < 60
            ? $t('GeneralUserCenter.AfterSeconds', { countdown })
            : $t('GeneralUserCenter.GetVerificationCode')
        }}
      </button>
    </div>

    <ButtonV
      class="btn"
      width="100%"
      height="40px"
      :text="$t('Components.Login')"
      @click="userLogin"
      :active="active"
      :disable="!active"
    ></ButtonV>
    <div class="comment-box">
      <div class="text">{{ $t('Components.NoAccountYet') }}</div>
      <div class="register-text" @click.stop="goRegister">
        {{ $t('Components.NewUserRegistration') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getImg } from '@/utils'
import PhoneSelector from '@/components/PhoneSelector'
import ButtonV from '@/components/ButtonV'
import { useUserStore } from '@/stores/user'
import { useSendCode } from '@/hooks/useSendCode'
import { useCaptcha } from '@/hooks/useCaptcha'
const { sendCode, getPhoneInputLength } = useSendCode()
const { initCaptcha, isloading } = useCaptcha()
import { getRegByPhoneCode } from '@/utils/regCountry'
import i18n from '@/i18n'
import { loginCheckByMobile } from '@/api/forget'
import { ERR_OK } from '@/utils/config'

const user = useUserStore()
const phoneNum = ref('')
const verificationCode = ref('')
const currentAreaCode = ref('')
const currentAreaName = ref('')
const currentCountryIcon = ref('')
const phoneseletor = ref(null)
const countdown = ref(60)
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(currentAreaCode.value)
})
const active = computed(() => {
  return phoneNum.value && verificationCode.value !== ''
})
function showSelect() {
  phoneseletor.value.handleShowSelect()
}

function closeLoginDialog() {
  user.setLoginDialogAction({
    isShowLoginDialog: false,
    currentPage: ''
  })
}

function getAreaCode(item) {
  currentAreaCode.value = item.phoneCode
  currentAreaName.value = item.countryCode
  currentCountryIcon.value = getImg(item.icon)
}

function goRegister() {
  user.LoginDialog.currentPage = 'register'
}

const userLogin = async (event) => {
  event.preventDefault()
  if (isloading.value) return ElMessage(i18n.global.t('Components.Loading'))
  // 验证数据

  // 验证通过 发送请求
  const data = {
    phone: phoneNum.value,
    code: verificationCode.value,
    cuntryCode: currentAreaName.value
  }
  isloading.value = true

  try {
    await user.phoneLoginAction(data)
    closeLoginDialog()
    await user.getUserInfoAction()
  } catch (error) {
    console.log(error)
  }
  isloading.value = false
}

const onSendCode = async () => {
  if (isloading.value) return
  if (!phoneNum.value) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.EnterPhoneNumber')
    })
  }
  if (!i18nPhoneReg.value?.test(phoneNum.value)) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.formatPhoneNumber')
    })
  }
  isloading.value = true
  const res = await loginCheckByMobile({ phone: phoneNum.value })
  isloading.value = false
  if (res.code === ERR_OK) {
    // 打开3方图形验证
    initCaptcha(function (validate) {
      isloading.value = false
      sendCode(phoneNum.value, 2, currentAreaCode.value, validate)
      startCountdown()
    })
  } else {
    ElMessage({
      type: 'warning',
      message: res.msg
    })
  }
}

const startCountdown = () => {
  const timer = setInterval(() => {
    if (countdown.value <= 0) {
      clearInterval(timer)
      resetCountdown()
    } else {
      countdown.value--
    }
  }, 1000)
}

const resetCountdown = () => {
  countdown.value = 60
}
</script>

<style lang="scss" scoped>
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #fff;
  transition: background-color 5000s ease-out 0.5s;
}
.country-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-size: cover;
  overflow: hidden;
}
.input-box {
  width: 100%;
  height: 302px;

  .phone-box,
  .verification {
    display: flex;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 72px;
    padding-top: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    .icon {
      position: relative;
      top: 3px;
    }
    .country-box {
      display: flex;
      align-items: center;
      width: 80px;
      height: 20px;
      border-right: 1px solid rgba(238, 238, 238, 0.2);
      .phone-select {
        margin-left: 11px;
        color: var(--100, #fff);

        font-size: 14px;
        font-weight: 400;
      }
    }
    .country-box:hover {
      cursor: pointer;
    }
    .phone-input,
    .verification-input {
      width: 180px;
      color: var(--100, #fff);

      font-size: 14px;
      font-weight: 400;
      margin-left: 12px;
    }
    .line {
      position: relative;
      top: 5px;
      height: 12px;
      width: 1px;
      background: rgba(255, 255, 255, 0.2);
    }
    .verification-btn {
      margin-left: 12px;
      background-color: transparent;
      border: none;
      color: var(--unnamed, #f35f1b);

      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      white-space: nowrap;
    }
  }
}
.btn {
  margin-top: 40px;
}
.comment-box {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  .text {
    color: rgba(255, 255, 255, 0.4);

    font-size: 14px;
    font-weight: 400;
  }
  .register-text {
    color: #f35f1b;

    font-size: 14px;
    font-weight: 400;
  }
  .register-text:hover {
    cursor: pointer;
  }
}
</style>
