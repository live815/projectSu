<template>
  <form class="form" @submit="submit">
    <div class="phone-wrapper">
      <div class="country-wrapper">
        <Country v-model="country" />
      </div>
      <CustomInput
        isPhone
        v-number
        clearable
        hasErrorTip
        v-model="phone"
        :maxLength="getPhoneInputLength(country.countryCode)"
        :placeholder="$t('Lletter.title6')"
        :rule="{
          reg: i18nPhoneReg,
          errorMessage: $t('Lletter.Llettertip13')
        }"
      />
    </div>
    <div class="split"></div>
    <div class="code-wrapper">
      <CustomInput
        v-number
        hasErrorTip
        clearable
        verifyCodeIconRight
        v-model="code"
        maxlength="6"
        :placeholder="$t('Lletter.title7')"
        :rule="{
          reg: Reg.codeReg,
          errorMessage: $t('Lletter.Llettertip14')
        }"
      />
      <!-- actionType:2 //登录 -->
      <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
    </div>

    <VButton :disabled="!isValided">
      <span v-if="!isloading">{{ $t('Lletter.login') }}</span>
      <van-loading v-else color="#fff"></van-loading>
    </VButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import CustomInput from '@/components/CustomInput/CustomInput.vue'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import Reg from '@/utils/reg'
import { getRegByPhoneCode } from '@/utils/regCountry'
import { loginCheckByMobile } from '@/api/forget'
import { ERR_OK } from '@/utils/config'
import { useSendCode } from '@/hooks/useSendCode'
import { useCaptcha } from '@/hooks/useCaptcha'
const { availableSendCode, sendCode, getPhoneInputLength } = useSendCode()
const { initCaptcha, isloading } = useCaptcha()
const user = useUserStore()
const phone = ref('')
const code = ref('')
const country = ref({})
const isValided = computed(() => {
  return Reg.i18nPhoneReg.test(phone.value) && Reg.codeReg.test(code.value)
})
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(country.value?.phoneCode)
})
const submit = async (event) => {
  event.preventDefault()
  if (isloading.value) return
  // 验证数据
  if (isValided.value) {
    // 验证通过 发送请求
    const data = {
      phone: phone.value,
      code: code.value,
      cuntryCode: country.value.countryCode
    }
    isloading.value = true
    await user.phoneLoginAction(data)
    isloading.value = false
  }
}

const onSendCode = async () => {
  if (isloading.value) return
  if (!phone.value) {
    return showToast('Rletter.enternumber')
  }
  if (!i18nPhoneReg.value?.test(phone.value)) {
    return showToast(i18n.global.t('Lletter.Llettertip13'))
  }
  isloading.value = true
  const res = await loginCheckByMobile({ phone: phone.value })
  isloading.value = false
  if (res.code == '1002000007') return showToast(i18n.global.t('Lletter.tips1'))
  if (res.code === ERR_OK) {
    // 打开3方图形验证
    initCaptcha(function (validate) {
      isloading.value = false
      sendCode(phone.value, 2, country.value?.phoneCode, validate, user.userInfo.userName)
    })
  }
}
</script>

<style lang="scss" scoped>
.phone-wrapper {
  position: relative;
  .country-wrapper {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 78px;
  }
}
.split {
  padding: 6px 0;
}
.code-wrapper {
  position: relative;
  margin-bottom: 40px;
  .send-code {
    position: absolute;
    right: 0;
    top: 4px;
  }
}
</style>
