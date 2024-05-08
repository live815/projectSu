<template>
  <div class="input-box">
    <div v-if="registerStep === 1">
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
        :text="$t('Components.Register')"
        :active="active"
        :disable="!active"
        @click="checkPhoneCode"
      ></ButtonV>

      <div class="text">
        <span
          >{{ $t('Components.AlreadyHaveAnAccount')
          }}<span class="go-login" @click="goLogin">{{ $t('Components.GoToLogin') }}</span></span
        >
      </div>
    </div>

    <div v-else>
      <div class="container">
        <div class="auto-create">
          <p class="title">{{ $t('Components.autoCreate') }}</p>
          <div class="phone-box">
            <div class="random-account" :class="!!editAccount || !!isFocus ? 'disabled' : ''">
              {{ randomAccount }}
              <span @click="handleRefresh"></span>
            </div>
            <img
              @click="handleRefresh"
              class="icon refresh"
              src="./img/refresh.png"
              width="16"
              height="16"
            />
          </div>
        </div>
        <div class="edit-create">
          <p class="title">{{ $t('Components.editCreateAccount') }}</p>
          <div class="phone-box">
            <input
              class="phone-input edit-account"
              ref="editAccountBox"
              clearable
              v-model="editAccount"
              @focus.stop="onFocus"
              @blur.stop="onBlur"
              oninput="value=value.replace(/[^\w\.\/]/ig,'')"
              :placeholder="$t('Components.Notice_13')"
            />
          </div>
        </div>
      </div>
      <div class="btn-small-row">
        <div class="btn-small" @click="handlePrev">{{ $t('Components.Previous') }}</div>
        <div class="btn-small active" @click="phoneRegister">{{ $t('Components.finish') }}</div>
      </div>
      <div class="register-tips">{{ $t('Components.tips') }}</div>
    </div>

    <!--    联系客服-->
    <div class="contact">
      <span class="contact-text" @click="openCustomerServicePop">{{
        $t('Components.ContactCustomerService')
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getImg } from '@/utils'
import { registerCheckByMobile, registerCheckByCode } from '@/api/user'
import PhoneSelector from '../PhoneSelector'
import ButtonV from '@/components/ButtonV'
import { useUserStore } from '@/stores/user'
import { registerCreatName } from '@/api/user'
import { openCustomerServicePop } from '@/utils/customerService'
import i18n from '@/i18n'
import Reg from '@/utils/reg'
import { useSendCode } from '@/hooks/useSendCode'
import { useCaptcha } from '@/hooks/useCaptcha'
const { sendCode, getPhoneInputLength } = useSendCode()
const { initCaptcha, isloading } = useCaptcha()
import { getRegByPhoneCode } from '@/utils/regCountry'
import { ERR_OK } from '@/utils/config'
const user = useUserStore()
const emit = defineEmits(['update:modelValue'])
const phoneNum = ref('')
const phoneNumErrorMsg = ref('')
const verificationCode = ref('')
const currentAreaCode = ref('86')
const currentAreaName = ref('')
const currentCountryIcon = ref('')
const phoneseletor = ref(null)
const countdown = ref(60)
const registerStep = ref(1)
const randomAccount = ref('')
const editAccount = ref('')
const isFocus = ref(false)
const errorMessage = ref('')
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(currentAreaCode.value)
})
const active = computed(() => {
  return phoneNum.value && verificationCode.value !== ''
})

const showSelect = () => {
  phoneseletor.value.handleShowSelect()
}

const getAreaCode = (item) => {
  currentAreaCode.value = item.phoneCode
  currentAreaName.value = item.countryCode
  currentCountryIcon.value = getImg(item.icon)
}

const closeLoginDialog = () => {
  user.setLoginDialogAction({
    isShowLoginDialog: false,
    currentPage: ''
  })
}

const onSendCode = async () => {
  if (isloading.value) return ElMessage(i18n.global.t('Components.Loading'))
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
  const isChecked = await checkPhoneNum()
  isloading.value = false
  if (isChecked) {
    initCaptcha(async function (validate) {
      isloading.value = false
      // 发送验证码
      await sendCode(phoneNum.value, 1, currentAreaCode.value, validate, user.userInfo.userName)
      await startCountdown()
    })
  }
}

const checkPhoneNum = async () => {
  let isChecked = false
  try {
    const res = await registerCheckByMobile({ phone: phoneNum.value })
    if (res.code === ERR_OK) {
      phoneNumErrorMsg.value = ''
      isChecked = true
    } else if (res.code == '1002000019') {
      phoneNumErrorMsg.value = i18n.global.t('GeneralUserCenter.formatPhoneNumber')
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.formatPhoneNumber')
      })
    } else if (res.code == '1002003001') {
      phoneNumErrorMsg.value = i18n.global.t('GeneralUserCenter.phoneAlready')
      ElMessage({
        type: 'warning',
        message: i18n.global.t('GeneralUserCenter.phoneAlready')
      })
    } else {
      phoneNumErrorMsg.value = res.msg
      ElMessage({
        type: 'warning',
        message: res.msg
      })
    }
  } catch (error) {
    console.log(error)
  }
  return isChecked
}

const checkPhoneCode = async (event) => {
  event.preventDefault()
  if (isloading.value) return
  if (phoneNumErrorMsg.value) {
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('GeneralUserCenter.formatPhoneNumber')
    })
  } else {
    const data = {
      phone: phoneNum.value,
      code: verificationCode.value
    }
    isloading.value = true
    const rpt = await registerCheckByCode(data)
    isloading.value = false
    if (rpt.code === ERR_OK) {
      getRandomAccount()
      emit('update:modelValue', true)
      registerStep.value = 2
    } else {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('Components.codeExpired')
      })
    }
  }
}

const goLogin = () => {
  user.LoginDialog.currentPage = 'login'
}

const handleRefresh = () => {
  setTimeout(() => {
    getRandomAccount()
  }, 1000)
}

const getRandomAccount = () => {
  registerCreatName().then((res) => {
    if (res?.code === 200) {
      randomAccount.value = res.data
    }
  })
}

const handlePrev = () => {
  emit('update:modelValue', false)
  registerStep.value = 1
}

const onFocus = () => {
  isFocus.value = true
}

const onBlur = (e) => {
  let t = setTimeout(() => {
    isFocus.value = false
    clearTimeout(t)
  })
  const value = e.target.value
  verify(value)
}
const verify = (val) => {
  if (!Reg.usernameReg.test(val)) {
    errorMessage.value = i18n.global.t('Components.Notice_13')
    return ElMessage({
      type: 'warning',
      message: i18n.global.t('Components.Notice_13')
    })
  } else {
    errorMessage.value = ''
  }
}

const phoneRegister = async (event) => {
  event.preventDefault()
  if (isloading.value) return
  let userName, rpt, data
  // 验证通过 发送请求
  if (editAccount.value) {
    userName = editAccount.value
    verify(userName)
    data = {
      phone: phoneNum.value,
      countryCode: currentAreaName.value,
      code: verificationCode.value,
      userName
    }
    isloading.value = true
    try {
      rpt = !errorMessage.value && (await user.phoneRegisterAction(data))
      if (!rpt) return
      await user.getUserInfoAction()
      closeLoginDialog()
      ElMessage.success(i18n.global.t('common.registrationSuccess'))
    } catch (error) {
      console.log(error)
    }
    isloading.value = false
  } else {
    userName = randomAccount.value
    data = {
      phone: phoneNum.value,
      code: verificationCode.value,
      countryCode: currentAreaName.value,
      userName
    }
    isloading.value = true
    try {
      rpt = await user.phoneRegisterAction(data)
      if (!rpt) return
      await user.getUserInfoAction()
      closeLoginDialog()
      ElMessage.success(i18n.global.t('common.registrationSuccess'))
    } catch (error) {
      console.log(error)
    }
    isloading.value = false
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
.country-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-size: cover;
  overflow: hidden;
}
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #fff;
  transition: background-color 5000s ease-out 0.5s;
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
    .icon.refresh {
      cursor: pointer;
    }
    .country-box {
      display: flex;
      align-content: center;
      width: 80px;
      height: 20px;
      border-right: 1px solid rgba(238, 238, 238, 0.2);
      .phone-select {
        display: flex;
        margin-left: 11px;
        align-items: center;
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
.text {
  color: #999;
  font-family: PingFang SC;
  font-style: normal;
  margin-top: 16px;
  display: flex;
  justify-content: center;

  .go-login {
    color: #f35f1b;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
  }
  .go-login {
    cursor: pointer;
  }
}
.contact {
  position: relative;
  margin-top: 234px;
  height: 10px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  .contact-text {
    position: relative;
    padding: 0 16px 0 16px;
    top: 1px;
    background-color: var(--unnamed, #232949);
    color: rgba(255, 255, 255, 0.4);

    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }
}

.container {
  margin-top: 25px;
  .auto-create {
    position: relative;
    .title {
      position: absolute;
      color: rgba(255, 255, 255, 0.6);
      top: 10px;
      font-size: 13px;
    }
    .random-account {
      width: 100%;
      color: #fff;
      font-size: 17px;
      font-weight: 400;
    }
    .random-account.disabled {
      color: #cccf;
    }
  }
  .edit-create {
    position: relative;
    margin-top: 35px;
    .title {
      position: absolute;
      color: rgba(255, 255, 255, 0.6);
      top: 10px;
      font-size: 13px;
    }
    .phone-input.edit-account {
      margin-left: 0;
      width: 284px;
    }
  }
}
.btn-small-row {
  display: flex;
  margin-top: 65px;
  justify-content: space-between;
  .btn-small {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 157px;
    height: 40px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }
}

.active {
  background-color: var(--unnamed, #f35f1b) !important;
  color: #fff !important;
}
.register-tips {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
</style>
