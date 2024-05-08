<template>
  <form class="form" @submit="submit">
    <CustomInput
      clearable
      hasErrorTip
      v-model="username"
      :placeholder="$t('Rletter.rlettertip48')"
      maxLength="12"
      :rule="{
        reg: Reg.usernameReg,
        errorMessage: $t('Rletter.rlettertip49')
      }"
    />
    <div class="split"></div>
    <CustomInput
      isPwd
      hasErrorTip
      v-model="password"
      maxLength="20"
      :placeholder="$t('Rletter.rlettertip50')"
      :rule="{
        reg: Reg.passwordReg,
        errorMessage: $t('Rletter.rlettertip51')
      }"
    />

    <!-- 国家 -->
    <!--    <div class="country-wrapper">-->
    <!--      <div class="sub-country-wrapper">-->
    <!--        <Country v-model="currentCountry" :type="2" />-->
    <!--      </div>-->
    <!--      <IconArrowDown class="icon-arrow-down" />-->
    <!--    </div>-->
    <p class="tip">{{ $t('Rletter.rlettertip52') }}</p>

    <VButton :disabled="!isValided">
      <span v-if="!isloading">{{ $t('Rletter.register') }}</span>
      <van-loading v-else color="#fff"></van-loading>
    </VButton>
  </form>
</template>

<script setup>
import CustomInput from '@/components/CustomInput/CustomInput'
import { ref, computed } from 'vue'
import Reg from '@/utils/reg'
import { useUserStore } from '@/stores/user'
import { showLoadingToast } from 'vant'
import i18n from '@/i18n'
import { countryCode } from '@/i18n'
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
const user = useUserStore()
const username = ref('')
const password = ref('')
const isValided = computed(() => {
  return Reg.usernameReg.test(username.value) && Reg.passwordReg.test(password.value)
})
const submit = async (event) => {
  event.preventDefault()
  if (isloading.value) return
  if (isValided.value) {
    // 参数验证通过 打开三方验证
    openVerifyPop()
  }
}

function openVerifyPop() {
  initCaptcha(async function (validate) {
    // 发送验证码
    const data = {
      validate,
      username: username.value,
      password: password.value,
      countryCode: countryCode()
    }
    const loading = showLoadingToast({
      message: i18n.global.t('common.loading'),
      forbidClick: true,
      duration: 0
    })
    try {
      await user.registerAction(data)
      await user.getUserInfoAction()
    } catch (error) {
      console.log(error)
    }
    loading.close()
    isloading.value = false
  })
}
</script>

<style lang="scss" scoped>
.country-wrapper {
  position: relative;
  border-bottom: 1px solid #eee;
  padding-bottom: 14px;
  margin-top: 10px;
  .sub-country-wrapper {
    position: relative;
    z-index: 2;
  }
  .icon-arrow-down {
    position: absolute;
    z-index: 0;
    right: 0;
    top: 7px;
    fill: #999;
  }
}
.split {
  padding: 5px 0;
}
.tip {
  line-height: 22px;
  margin-top: 6px;
  font-size: 12px;
  margin-bottom: 22px;
}
</style>
