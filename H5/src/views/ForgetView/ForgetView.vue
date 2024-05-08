<template>
  <div class="forget-view">
    <div class="navbar-wrapper">
      <NavBar :is-back="false" @onClickLeft="onClickLeft" />
    </div>
    <div class="content">
      <h1>{{ $t('Fletter.FindPassword') }}</h1>

      <!-- 第一步 验证用户名 -->
      <div v-if="step === 1" class="form">
        <CustomInputBorder
          clearable
          :maxlength="16"
          :label="$t('Fletter.Account')"
          :placeholder="$t('Fletter.EnterAccount')"
          v-model="username"
        />
        <VButton
          style="margin-top: 60px"
          @click="verifyAccount"
          :disabled="!isVerify"
          class="o-btn"
          >{{ $t('Fletter.NextStep') }}</VButton
        >
      </div>

      <!-- 第二步 验证手机号 -->
      <div v-if="step === 2">
        <div class="phone-wrapper">
          <div class="country-wrapper">
            <Country disabled :hasImg="false" />
          </div>
          <CustomInputBorder
            disabled
            :maxlength="11"
            :placeholder="$t('Fletter.EnterPhoneNumber')"
            :label="$t('Fletter.PhoneNumber')"
            v-model="completePhoneNumber"
          />
        </div>

        <div class="code-wrapper">
          <CustomInputBorder
            :maxlength="6"
            :placeholder="$t('Fletter.EnterVerificatCode')"
            :label="$t('Fletter.VerificatCode')"
            v-model="code"
          />
          <!-- actionType:3 //登录 -->
          <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
        </div>

        <v-button @click="verifyPhone" :disabled="!isVerifyPhone" class="o-btn">{{
          $t('Fletter.NextStep')
        }}</v-button>
      </div>

      <!-- 第三步 重置密码 -->
      <div v-if="step === 3">
        <CustomInputBorder
          clearable
          isPwd
          :maxlength="20"
          :placeholder="$t('Fletter.EnterNewPassword')"
          :label="$t('Fletter.NewPassword')"
          v-model="password"
        />
        <v-button @click="resetPwd" :disabled="!isVerifyPwd" class="o-btn">{{
          $t('Fletter.Reset')
        }}</v-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ERR_OK } from '@/utils/config'
import NavBar from '@/components/NavBar/NavBar.vue'
import { getCheckAccount, getCheckMobile, getUpPass } from '@/api/forget'
import { computed, ref } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
import { useSendCode } from '@/hooks/useSendCode'
const { availableSendCode, sendCode } = useSendCode()
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const router = useRouter()
const username = ref('')
const code = ref('')
const password = ref('')
const step = ref(1)
const userInfo = reactive({
  accessToken: '',
  mobile: '',
  phoneCode: ''
})

const isVerify = computed(() => {
  return username.value
})
const isVerifyPhone = computed(() => {
  return code.value
})

const isVerifyPwd = computed(() => {
  return password.value
})

// 手机区号+编码+屏蔽
const completePhoneNumber = computed(() => {
  return `${userInfo.phoneCode} ${hideStr(mobile.value)}`
})
const mobile = computed(() => {
  let reg = /\s/
  if (reg.test(userInfo.mobile.trim())) {
    return userInfo.mobile.split(' ')[1]
  }
  return userInfo.mobile
})
function hideStr(str) {
  return `*******${str.slice(str.length - 4, str.length)}`
}

const onClickLeft = () => {
  if (step.value > 1) {
    prev()
  } else {
    router.back()
  }
}
const prev = () => {
  step.value--
}
const next = () => {
  step.value++
}

function onSendCode() {
  if (isloading.value) return
  // 打开3方图形验证
  initCaptcha(function (validate) {
    isloading.value = false
    sendCode(mobile.value, 3, userInfo.phoneCode, validate, user.userInfo.userName)
  })
}
// 验证账号
const verifyAccount = async () => {
  try {
    const res = await getCheckAccount({ userName: username.value })
    if (res.code === ERR_OK) {
      const { accessToken, mobile, phoneCode } = res.data
      userInfo.accessToken = accessToken
      userInfo.mobile = mobile
      userInfo.phoneCode = phoneCode
      next()
    }
  } catch (e) {
    console.log(e.message)
  }
}
// 验证手机号
const verifyPhone = async () => {
  try {
    const res = await getCheckMobile(
      { mobile: mobile.value, smsCode: code.value },
      userInfo.accessToken
    )
    if (res['code'] === ERR_OK) {
      next()
    }
  } catch (e) {
    console.log(e.message)
  }
}
const resetPwd = async () => {
  try {
    const res = await getUpPass({ password: password.value }, userInfo.accessToken)
    if (res['code'] === ERR_OK) {
      showToast(i18n.global.t('Fletter.ResetSuccess'))
      router.back()
    }
  } catch (e) {
    console.log(e.message)
  }
}
</script>

<style lang="scss" scoped>
.forget-view {
  padding-top: 10px;
  background: #fff;
}
.navbar-wrapper {
  padding: 0 10px;
}
.content {
  padding: 0 25px;
  @include clearfix();
  h1 {
    font-size: 25px;
    font-weight: 600;
    color: #000;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .phone-wrapper {
    position: relative;
    .country-wrapper {
      position: absolute;
      z-index: 10;
      left: 1em;
      bottom: 12px;
      width: 78px;
    }
  }
  .code-wrapper {
    position: relative;
    margin-bottom: 40px;
    .send-code {
      position: absolute;
      right: 1em;
      bottom: 20px;
    }
  }
  .o-btn {
  }
}
.slideClass {
  z-index: 100 !important;
}
</style>
