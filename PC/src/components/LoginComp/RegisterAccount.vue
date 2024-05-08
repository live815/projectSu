<template>
  <div class="input-box">
    <div class="username-box">
      <img class="icon" src="./img/userNameIcon.png" width="16" height="16" />
      <input
        class="input"
        v-model="userName"
        type="text"
        maxLength="12"
        :placeholder="$t('Components.Notice_13')"
        @blur="onBlurUsername"
        @input="onInputUsername"
      />
      <div class="warning">{{ userNameWarning }}</div>
    </div>

    <div class="password-box">
      <img class="icon" src="./img/passwordIcon.png" width="16" height="16" />
      <input
        class="input"
        v-model="passWord"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="$t('Components.Notice_14')"
        maxLength="20"
        @blur="onBlurPassword"
        @input="onInputPassword"
      />
      <div class="icon" @click="toShowPassword">
        <ShowPassWord :isShow="showPassword"></ShowPassWord>
      </div>
      <div class="warning">{{ passWordWarning }}</div>
    </div>

    <ButtonV
      class="btn"
      width="100%"
      height="40px"
      :text="$t('Components.Register')"
      :active="active"
      @click="userRegister"
    ></ButtonV>

    <div class="text">
      <span
        >{{ $t('Components.AlreadyHaveAnAccount')
        }}<span class="go-login" @click="goLogin">{{ $t('Components.GoToLogin') }}</span></span
      >
    </div>
    <div class="contact">
      <span class="contact-text" @click="showChannels = true" @mouseleave="showChannels = false">
        <CSChannels :isServicePop="showChannels" style="top: -92px; left: -15px" />
        {{ $t('Components.ContactCustomerService') }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import Reg from '@/utils/reg'
import { countryCode } from '@/i18n'
import ButtonV from '@/components/ButtonV'
import { useUserStore } from '@/stores/user'
import { useCaptcha } from '@/hooks/useCaptcha'
import CSChannels from '@/components/CSChannels'

const showChannels = ref(false)
const { initCaptcha, isloading } = useCaptcha()
const user = useUserStore()
const userName = ref('')
const passWord = ref('')
const showPassword = ref(false)
const userNameWarning = ref('')
const passWordWarning = ref('')

const active = computed(() => {
  return Reg.usernameReg.test(userName.value.trim()) && Reg.passwordReg.test(passWord.value)
})

// 账户密码验证
const onBlurUsername = (e) => {
  if (!e.target.value) {
    userNameWarning.value = i18n.global.t('Components.Notice_13')
  } else if (!Reg.usernameReg.test(e.target.value)) {
    userNameWarning.value = i18n.global.t('Components.Notice_15')
  }
}
function onInputUsername() {
  userNameWarning.value = ''
}
const onBlurPassword = (e) => {
  if (!e.target.value) {
    passWordWarning.value = i18n.global.t('Components.Notice_14')
  } else if (!Reg.passwordReg.test(e.target.value)) {
    passWordWarning.value = i18n.global.t('Components.Notice_16')
  }
}
function onInputPassword() {
  passWordWarning.value = ''
}
function goLogin() {
  user.LoginDialog.currentPage = 'login'
}

// 验证账号密码
function ifIsValided() {
  let cond = true
  if (!Reg.usernameReg.test(userName.value.trim())) {
    userNameWarning.value = i18n.global.t('Components.Notice_15')
    return
  }
  if (!Reg.passwordReg.test(passWord.value)) {
    passWordWarning.value = i18n.global.t('Components.Notice_16')
    return
  }
  return cond
}

const userRegister = async (event) => {
  event.preventDefault()
  if (isloading.value) return ElMessage(i18n.global.t('Components.Loading'))
  if (ifIsValided()) {
    initCaptcha(async function (validate) {
      try {
        const data = {
          validate,
          username: userName.value.trim(),
          password: passWord.value,
          countryCode: countryCode()
        }
        await user.registerAction(data)
        await user.getUserInfoAction()
        closeLoginDialog()
        ElMessage.success(i18n.global.t('common.registrationSuccess'))
      } catch (err) {
        console.log(err)
      }
      isloading.value = false
    })
  }
}
function toShowPassword() {
  showPassword.value = !showPassword.value
}
function closeLoginDialog() {
  user.setLoginDialogAction({
    isShowLoginDialog: false,
    currentPage: ''
  })
}
</script>

<style lang="scss" scoped>
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #fff;
  transition: background-color 5000s ease-out 0.5s;
}
.input-box {
  width: 100%;
  height: 365px;

  .username-box,
  .password-box,
  .country-box {
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-top: 40px;
    height: 32px;
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
    .country-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      overflow: hidden;
      background-size: cover;
    }
  }
  .comment {
    color: var(--40, rgba(255, 255, 255, 0.4));

    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
  }
  .btn {
    margin-top: 40px;
  }
  .text {
    color: #999;

    font-style: normal;
    margin-top: 16px;
    display: flex;
    justify-content: center;

    .go-login {
      color: #f35f1b;

      font-size: 14px;
      font-weight: 400;
    }
    .go-login {
      cursor: pointer;
    }
  }
  .contact {
    margin-top: 110px;
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
}
.warning {
  position: absolute;
  top: 30px;
  color: var(--unnamed, #e93d3d);

  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
}
</style>
