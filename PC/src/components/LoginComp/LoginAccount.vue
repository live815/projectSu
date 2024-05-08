<template>
  <div class="input-box" @keyup.enter="userLogin">
    <div class="username-box">
      <img class="icon" src="./img/userNameIcon.png" width="16" height="16" />
      <input
        autocomplete="off"
        maxLength="12"
        class="input"
        v-model="userName"
        type="text"
        :placeholder="$t('Components.InputUsername')"
      />
    </div>

    <div class="tips" v-show="isWrongTip">{{ $t('Components.Notice_12') }}</div>

    <div class="password-box">
      <img class="icon" src="./img/passwordIcon.png" width="16" height="16" />
      <input
        class="input"
        autocomplete="off"
        v-model="passWord"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="$t('Components.InputPassword')"
        maxLength="20"
      />
      <div class="icon" @click="toShowPassword">
        <ShowPassWord :isShow="showPassword"></ShowPassWord>
      </div>
    </div>
    <p class="remember">
      <el-checkbox v-model="remember"><span>{{ $t('Components.rememberPassword') }}</span></el-checkbox>
    </p>
    <ButtonV
      class="btn"
      width="100%"
      height="40px"
      :text="$t('Components.Login')"
      :active="active"
      @click="userLogin"
      :disable="!active"
    >
    </ButtonV>
    <div class="comment-box">
      <div class="forget text" @click="goReset">{{ $t('Components.ForgetPassword') }}</div>
      <div style="display: flex; align-items: center">
        <div class="text">{{ $t('Components.NoAccountYet') }}</div>
        <div class="register-text" @click="goRegister">
          {{ $t('Components.NewUserRegistration') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import Reg from '@/utils/reg'
import ShowPassWord from '@/components/icons/ShowPassWord.vue'
import ButtonV from '@/components/ButtonV'
import {
  setUsernameAndPassword,
  getUsernameAndPassword,
  removeUsernameAndPassword
} from '@/utils/cache'

const user = useUserStore()
const showPassword = ref(true)
const userName = ref('')
const passWord = ref('')
const isWrongTip = ref(false)
const remember = ref(true)
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
const active = computed(() => {
  return Reg.usernameReg.test(userName.value.trim()) && Reg.passwordReg.test(passWord.value)
})


const userLogin = async (event) => {
  event.preventDefault()
  if (isloading.value) return ElMessage(i18n.global.t('Components.Loading'))
  initCaptcha(async function (validate) {
    const data = {
      validate,
      username: userName.value.trim(),
      password: passWord.value
    }
    try {
      await user.loginAction(data)
      closeLoginDialog()
      if (remember.value) {
        setUsernameAndPassword({ username: userName.value.trim(), password: passWord.value })
      } else {
        removeUsernameAndPassword()
      }
      await user.getUserInfoAction()
    } catch (error) {
      isWrongTip.value = true
    }
    isloading.value = false
  })
}
// 关闭登录弹框
function closeLoginDialog() {
  user.setLoginDialogAction({
    isShowLoginDialog: false,
    currentPage: ''
  })
}

const goRegister = () => {
  user.LoginDialog.currentPage = 'register'
}

const goReset = () => {
  user.LoginDialog.currentPage = 'reset'
}

const toShowPassword = () => {
  showPassword.value = !showPassword.value
}
onMounted(() => {
  const user = getUsernameAndPassword()
  if (user) {
    userName.value = user.username
    passWord.value = user.password
    remember.value = true
  }
})
watchEffect(() => {
  if (passWord.value) {
    showPassword.value = false
  }
})
</script>

<style lang="scss" scoped>
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #fff;
  transition: background-color 5000s ease-out 0.5s;
}

.input-box {
  width: 100%;
  height: 302px;
  overflow: hidden;

  .tips {
    position: absolute;
    color: var(--unnamed, #e93d3d);

    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
  }

  .username-box,
  .password-box {
    display: flex;
    align-items: flex-start;
    position: relative;
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

  .btn {
    margin-top: 20px;
  }
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

  .forget {
    margin-right: auto;
  }

  .register-text {
    color: #f35f1b;

    font-size: 14px;
    font-weight: 400;
  }

  .register-text:hover {
    cursor: pointer;
  }

  .forget {
    cursor: pointer;
  }
}
:deep() {
  .remember {
    margin-top: 5px;
    .el-checkbox__input.is-checked .el-checkbox__inner {
      border-color: #f35f1b !important;
      background: #f35f1b !important;
    }
    span {
      color: #f35f1b;
    }
  }
}
</style>
