<template>
  <form class="form" @submit="submit">
    <CustomInput
      clearable
      hasErrorTip
      v-model="username"
      :placeholder="$t('Lletter.Llettertip15')"
      maxLength="12"
      :rule="{
        reg: Reg.usernameReg,
        errorMessage: $t('Lletter.Llettertip16')
      }"
    />
    <div class="split"></div>
    <CustomInput
      clearable
      isPwd
      hasErrorTip
      v-model="password"
      maxLength="20"
      :placeholder="$t('Lletter.Llettertip17')"
      :rule="{
        reg: Reg.passwordReg,
        errorMessage: $t('Lletter.Llettertip18')
      }"
    />

    <div class="auxfun">
      <p>
        <van-checkbox v-model="remember"
          ><span class="forget">{{ $t('Lletter.Llettertip19') }}</span></van-checkbox
        >
      </p>
      <p @click="forgetPwd">{{ $t('Lletter.Llettertip20') }}</p>
    </div>

    <VButton :disabled="!isValided">
      <span v-if="!isloading">{{ $t('Lletter.login') }}</span>
      <van-loading v-else color="#fff"></van-loading>
    </VButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import CustomInput from '@/components/CustomInput/CustomInput'
import Reg from '@/utils/reg'
import {
  setUsernameAndPassword,
  getUsernameAndPassword,
  removeUsernameAndPassword
} from '@/utils/cache'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const user = useUserStore()
import { showLoadingToast } from 'vant'
import i18n from '@/i18n'
const username = ref('')
const password = ref('')
const remember = ref(true)
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
const isValided = computed(() => {
  return Reg.usernameReg.test(username.value) && Reg.passwordReg.test(password.value)
})

const submit = async (event) => {
  event.preventDefault()
  if (isloading.value) return
  // 验证数据
  if (isValided.value) {
    // 参数验证通过 打开三方验证
    openVerifyPop()
  }
}

const forgetPwd = () => {
  router.push('/forget')
}

onMounted(() => {
  const user = getUsernameAndPassword()
  if (user) {
    username.value = user.username
    password.value = user.password
    remember.value = true
  }
})

const openVerifyPop = () => {
  initCaptcha(async function (validate) {
    const data = {
      validate,
      username: username.value,
      password: password.value
    }
    const loading = showLoadingToast({
      message: i18n.global.t('common.loading'),
      forbidClick: true,
      duration: 0
    })
    try {
      await user.loginAction(data)
      if (remember.value) {
        setUsernameAndPassword({ username: username.value, password: password.value })
      } else {
        removeUsernameAndPassword()
      }
    } catch (error) {
      console.log(error)
    }
    loading.close()
    isloading.value = false
  })
}
</script>

<style lang="scss" scoped>
.split {
  padding: 6px 0;
}
.auxfun {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 17px;
  color: #888;
  span {
    color: #888;
  }
  .forget {
    position: relative;
    top: -1px;
  }
}
</style>
