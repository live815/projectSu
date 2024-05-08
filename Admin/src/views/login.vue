<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="lang-wrapper" v-if="IS_DEV">
        <LanguageSelector />
      </div>
      <h3 class="title">{{ $t('login.title') }}</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="$t('login.username')"
        >
          <template #prefix
            ><svg-icon icon-class="user" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="$t('login.password')"
          @keyup.enter="getIsShowGoogleVerification"
        >
          <template #prefix
            ><svg-icon icon-class="password" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          :placeholder="$t('login.code')"
          style="width: 63%"
          @keyup.enter="getIsShowGoogleVerification"
        >
          <template #prefix
            ><svg-icon icon-class="validCode" class="el-input__icon input-icon"
          /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">{{
        $t('login.remember')
      }}</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          @click="getIsShowGoogleVerification"
          type="primary"
          style="width: 100%"
        >
          <!-- @click.prevent="handleLogin" -->
          <span v-if="!loading">{{ $t('login.loginIn') }}</span>
          <span v-else>{{ $t('login.loading') }}</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'">{{ $t('login.register') }}</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2023 ruoyi.vip All Rights Reserved.</span>
    </div>

    <el-dialog
      v-model="isShowGoogleVerification"
      :title="'谷歌验证'"
      width="400px"
      :center="true"
      :align-center="true"
      :before-close="closeParentDialog"
      v-if="isShowGoogleVerification"
    >
      <div style="height: 340px; display: flex; align-items: center">
        <el-form
          ref="QrForm"
          :model="loginForm"
          style="margin-left: 52px"
          @keyup.enter="validQr"
          @submit.native.prevent
        >
          <el-form-item>
            <div class="code" v-if="isShowQr">
              <img :src="QRImage" alt="" />
            </div>
          </el-form-item>
          <div style="text-align: center; margin: -20px 0 20px 0px; color: red" v-if="isShowQr">
            请使用谷歌身份验证器扫码绑定
          </div>
          <el-form-item
            prop="qrCode"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                message: '验证码不能为空'
              },
              {
                pattern: /^\d+$/,
                trigger: 'blur',
                message: '验证码必须为数字'
              }
            ]"
          >
            <el-input
              v-model="loginForm.qrCode"
              style="width: 240px"
              placeholder="请输入谷歌验证码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="validQr" style="width: 240px">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { IS_DEV } from '@/utils/config'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { getGoogleQr } from '@/api/login'
import useUserStore from '@/store/modules/user'
import i18n from '@/i18n'
const userStore = useUserStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
const QrForm = ref(null)
const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: '',
  qrCode: ''
})

const QRImage = computed(() => {
  const viteSite = import.meta.env.VITE_BACKEND_API
  return viteSite + `admin/auth/google/generateQrcode?userName=${loginForm.value.username}`
})

// 谷歌验证码弹窗

const isShowQr = ref(false)
const isShowGoogleVerification = ref(false)

// 如果账户未绑定谷歌验证码  生成二维码
const getIsShowGoogleVerification = () => {
  userStore
    .login(loginForm.value)
    .then((res) => {
      isShowGoogleVerification.value = !isShowGoogleVerification.value
      if (!res.googleBindStatus) {
        isShowQr.value = true
      }
    })
    .catch(() => {
      // 重新获取验证码
      if (captchaEnabled.value) {
        getCode()
      }
    })
}

// 校验谷歌二维码 获取token
const validQr = () => {
  QrForm.value.validate((valid) => {
    if (valid) {
      userStore.validQr(loginForm.value.username, loginForm.value.qrCode).then(() => {
        router.push({ path: redirect.value || '/' })
      })
    }
  })
}
const closeParentDialog = () => {
  isShowGoogleVerification.value = false
  loginForm.value.qrCode = ''
}
const loginRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.global.t('login.usernamePlaceholder')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.global.t('login.passwordPlaceholder')
    }
  ],
  code: [
    {
      required: true,
      trigger: 'change',
      message: i18n.global.t('login.codePlaceholder')
    }
  ]
}

const codeUrl = ref('')
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)
// 注册开关
const register = ref(false)
const redirect = ref(undefined)

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.value.password), {
          expires: 30
        })
        Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          router.push({ path: redirect.value || '/' })
        })
        .catch(() => {
          loading.value = false
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode()
          }
        })
    }
  })
}

function getCode() {
  getCodeImg().then((res) => {
    console.log(res)
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img
      loginForm.value.uuid = res.uuid
    }
  })
}

function getCookie() {
  const username = Cookies.get('username')
  console.log(username, '888')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

getCode()
getCookie()
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  position: relative;
  .lang-wrapper {
    position: absolute;
    right: 20px;
    top: 25px;
  }
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
.code {
}
:deep() {
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    > .el-dialog__body {
      overflow: auto;
      color: #666666;
    }
  }
}
</style>
