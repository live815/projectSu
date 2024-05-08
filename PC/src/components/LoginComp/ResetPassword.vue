<template>
  <div class="right-box">
    <div class="header">{{ $t('Components.RetrievePassword') }}</div>
    <div class="progress">
      <div class="circle active"></div>
      <div class="line" :class="{ active: [2, 3].includes(progressState) }"></div>
      <div class="circle" :class="{ active: [2, 3].includes(progressState) }"></div>
      <div class="line" :class="{ active: progressState === 3 }"></div>
      <div class="circle" :class="{ active: progressState === 3 }"></div>
    </div>
    <div class="progress-text">
      <div class="text">{{ $t('Components.ConfirmTheAccount') }}</div>
      <div class="text">{{ $t('Components.GetVerificationCode') }}</div>
      <div class="text">{{ $t('Components.ResetPassword') }}</div>
    </div>
    <div class="input-box">
      <!--      第一步-->
      <div class="username" v-if="progressState === 1">
        <div class="input-inner">
          <img class="icon" src="./img/userNameIcon.png" width="16" height="16" />
          <input
            class="input"
            v-model="userName"
            type="text"
            :placeholder="$t('Components.InputUsernametwo')"
          />
        </div>
      </div>
      <!--      第二步-->
      <div class="phone" v-else-if="progressState === 2">
        <div class="phone-box">
          <div class="country-box" @click.stop="showSelect">
            <div
              class="country-icon"
              :style="{ backgroundImage: 'url(' + getImg(currentCountry.icon) + ')' }"
            ></div>
            <div class="phone-select">{{ currentCountry.phoneCode }}</div>
          </div>
          <input
            class="phone-input"
            type="text"
            :placeholder="$t('Components.EnterPhoneNumber')"
            :value="hidePhoneNumber(userInfo.mobile)"
            disabled
            :maxlength="getPhoneInputLength(currentCountry.countryCode)"
            oninput="value=value.replace(/\D/g,'')"
          />
        </div>
        <PhoneSelector ref="phoneseletor" @getAreaCode="getAreaCode"></PhoneSelector>
        <div class="verification">
          <img class="icon" src="./img/verification.png" width="16" height="16" />
          <input
            class="verification-input"
            type="text"
            maxlength="6"
            v-model="verificationCode"
            :placeholder="$t('Components.EnterVerificationCode')"
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
      </div>

      <!--      第三步-->
      <div class="reset-box" v-else-if="progressState === 3">
        <div class="password">
          <div class="input-inner">
            <img class="icon" src="./img/passwordIcon.png" width="16" height="16" />
            <input
              class="input"
              v-model="passWord"
              :type="eyeOpen ? 'text' : 'password'"
              :placeholder="$t('Components.InputNewPassword')"
            />
            <img
              class="icon"
              v-if="eyeOpen"
              @click="handleChangeEyes"
              src="./img/eye.png"
              width="18"
              height="18"
            />
            <img
              class="icon"
              v-else
              @click="handleChangeEyes"
              src="./img/ueye.png"
              width="18"
              height="18"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="btn" v-if="progressState === 1">
      <button
        class="login-btn"
        @click="verifyAccount"
        v-if="progressState === 1"
        :class="{ active: activeFirstStep }"
      >
        {{ $t('Components.NextStep') }}
      </button>
    </div>

    <div class="btn-small-row" v-if="progressState === 2">
      <div class="btn-small" @click="prev">{{ $t('Components.Previous') }}</div>
      <div class="btn-small" @click="verifyPhone" :class="{ active: activeSecondStep }">
        {{ $t('Components.NextStep') }}
      </div>
    </div>

    <div class="btn-small-row" v-if="progressState === 3">
      <div class="btn-small" @click="prev">{{ $t('Components.Previous') }}</div>
      <div class="btn-small" @click="resetPwd" :class="{ active: activethirdStep }">
        {{ $t('Components.Reset') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { getImg ,hidePhoneNumber} from '@/utils'
import i18n from '@/i18n/index'
import PhoneSelector from '../PhoneSelector'
import { getCheckAccount, getCheckMobile, getUpPass } from '@/api/forget'
import { ERR_OK } from '@/utils/config'
import { useSendCode } from '@/hooks/useSendCode'
import { useCaptcha } from '@/hooks/useCaptcha'
const { sendCode, getPhoneInputLength } = useSendCode()
const { initCaptcha, isloading } = useCaptcha()

const user = useUserStore()
const progressState = ref(1)
const userName = ref('')
const passWord = ref('')
const verificationCode = ref('')
const countdown = ref(60)
const phoneseletor = ref(null)
const eyeOpen = ref(true)
// 当前国家
const currentCountry = ref({})
const userInfo = reactive({
  accessToken: '',
  mobile: '',
  phoneCode: ''
})
const prev = () => {
  progressState.value--
}
const next = () => {
  if (progressState.value === 1) progressState.value++
  if (activeSecondStep.value) progressState.value++
}

const activeFirstStep = computed(() => {
  return userName.value.length >= 6 && userName.value.length <= 16
})

function onSendCode() {
  initCaptcha(async function (validate) {
    isloading.value = false
    // 发送验证码
    await sendCode(userInfo.mobile, 3, currentCountry.value?.['phoneCode'], validate)
    await startCountdown()
  })
}

const activeSecondStep = computed(() => {
  return verificationCode.value?.length > 4
})
const activethirdStep = computed(() => {
  return passWord.value.length >= 8 && passWord.value.length <= 20
})

function showSelect() {
  phoneseletor.value.handleShowSelect()
}

function getAreaCode(item) {
  currentCountry.value = item
}

// 验证账号
const verifyAccount = async () => {
  try {
    if (!userName.value) {
      ElMessage({
        type: 'error',
        message: '用户名不能为空'
      })
    } else {
      const res = await getCheckAccount({ userName: userName.value })
      if (res['code'] === ERR_OK) {
        const { accessToken, mobile, phoneCode } = res.data
        userInfo.accessToken = accessToken
        userInfo.mobile = mobile
        userInfo.phoneCode = phoneCode
        next()
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}

// 验证手机号
const verifyPhone = async () => {
  try {
    const res = await getCheckMobile(
      { mobile: userInfo.mobile, smsCode: verificationCode.value },
      userInfo.accessToken
    )
    if (res['code'] === ERR_OK) {
      next()
    }
  } catch (e) {
    console.log(e.message)
  }
}

const handleChangeEyes = () => {
  eyeOpen.value = !eyeOpen.value
}

const resetPwd = async () => {
  try {
    const res = await getUpPass({ password: passWord.value }, userInfo.accessToken)
    if (res['code'] === ERR_OK) {
      ElMessage.success(i18n.global.t('Components.ResetSuccess'))
      setTimeout(() => {
        user.setLoginDialogAction({
          isShowLoginDialog: true,
          currentPage: 'login'
        })
      }, 1000)
    }
  } catch (e) {
    console.log(e.message)
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

.right-box {
  width: 442px;
  height: 100%;
  padding: 58px 56px 0 56px;

  .header {
    text-align: center;
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 22px;
    font-weight: 400;
  }

  .progress {
    display: flex;
    align-items: center;
    width: 284px;
    height: 10px;
    margin: 44px auto 0;

    .circle {
      width: 10px;
      height: 10px;
      background-color: rgba(46, 49, 68, 1);
      border-radius: 50%;
    }

    .line {
      width: 119px;
      height: 1px;
      margin: 0 4px 0 4px;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .progress-text {
    display: flex;
    justify-content: space-between;
    height: 24px;
    margin-top: 8px;

    .text {
      color: var(--60, rgba(255, 255, 255, 0.6));

      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
    }
  }

  .input-box {
    .input-inner {
      display: flex;
      align-items: flex-start;
      margin-top: 40px;
      height: 32px;
      overflow: hidden;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .icon {
        position: relative;
        top: 4px;
      }

      .input {
        width: 284px;
        margin-left: 12px;
        color: var(--100, #fff);

        font-size: 14px;
        font-weight: 400;
      }
    }

    .username,
    .password {
      height: 73px;
    }

    .phone {
      height: 186px;

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
  }

  .btn {
    width: 100%;
    height: 40px;

    .login-btn {
      width: 100%;
      height: 100%;
      color: var(--40, rgba(255, 255, 255, 0.4));

      font-size: 16px;
      font-weight: 400;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
    }

    .login-btn.active {
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%)) !important;
      color: #fff !important;
    }

    .login-btn:hover {
      cursor: pointer;
    }
  }

  .btn-small-row {
    display: flex;
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
}

.active {
  background-color: var(--unnamed, #f35f1b) !important;
  color: #fff !important;
}

//:deep() {
//  .el-dialog {
//    background: var(--unnamed, #323c6f) !important;
//    border-radius: 8px;
//  }
//  .el-dialog__header {
//    padding: 12px 20px 12px 20px;
//    margin-right: 0 !important;
//    // padding-bottom: 20px;
//    border-radius: 8px 8px 0 0;
//    background: var(--unnamed, #323c6f) !important;
//  }
//  .el-dialog__title {
//    color: var(--100, #fff);
//
//    font-size: 16px;
//    font-style: normal;
//    font-weight: 400;
//    line-height: 16px; /* 100% */
//    opacity: 0.8;
//  }
//  .el-dialog__headerbtn .el-dialog__close {
//    font-size: 26px;
//    color: #fff;
//    top: -14px;
//    svg {
//      height: 20px;
//      width: 20px;
//    }
//  }
//  .el-dialog__body {
//    background: #232949;
//    border-radius: 0 0 8px 8px;
//  }
//}
</style>
