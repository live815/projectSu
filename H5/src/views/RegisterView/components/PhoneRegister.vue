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
        :placeholder="$t('Rletter.enternumber')"
        :rule="{
          reg: i18nPhoneReg,
          errorMessage: $t('Rletter.rlettertip44')
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
        :maxLength="6"
        :placeholder="$t('Rletter.rlettertip45')"
        :rule="{
          reg: Reg.codeReg,
          errorMessage: $t('Rletter.rlettertip46')
        }"
      />
      <!-- actionType:1 //注册 -->
      <SendCode @sendCode="onSendCode" v-model="availableSendCode" />
    </div>

    <VButton>
      <span v-if="!isloading">{{ $t('Rletter.register') }}</span>
      <van-loading v-else color="#fff"></van-loading>
    </VButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import CustomInput from '@/components/CustomInput/CustomInput.vue'
import SendCode from '@/components/SendCode/SendCode.vue'
import { useSendCode } from '@/hooks/useSendCode'
const { availableSendCode, sendCode, getPhoneInputLength } = useSendCode()
import { useCaptcha } from '@/hooks/useCaptcha'
const { initCaptcha, isloading } = useCaptcha()
import i18n from '@/i18n'
import { countryCode } from '@/i18n'
import Reg from '@/utils/reg'
import { getRegByPhoneCode } from '@/utils/regCountry'
import { registerCheckByMobile, registerCheckByCode } from '@/api/user'
import { useRouter } from 'vue-router'
import { ERR_OK } from '@/utils/config'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const router = useRouter()
const phone = ref('')
const code = ref('')
const country = ref({})
const isValided = computed(() => {
  return Reg.i18nPhoneReg.test(phone.value) && Reg.codeReg.test(code.value)
})
const i18nPhoneReg = computed(() => {
  return getRegByPhoneCode(country.value?.phoneCode)
})
// 检查手机号是否被占用
const checkPhoneNum = async () => {
  let isChecked = false
  try {
    const data = await registerCheckByMobile({ phone: phone.value })
    if (data.code == '1002000019') {
      showToast(i18n.global.t('Rletter.rlettertip44'))
    } else if (data.code == '1002003001') {
      showToast(i18n.global.t('Rletter.phoneAlready'))
    } else if (data.code === ERR_OK) {
      isChecked = true
    }
  } catch (error) {
    console.log(error)
  }
  return isChecked
}

const submit = async (event) => {
  event.preventDefault()
  if (isloading.value) return
  //验证数据
  if (isValided.value) {
    // 验证通过 发送请求
    const data = {
      phone: phone.value,
      code: code.value
    }
    try {
      isloading.value = true
      const rpt = await registerCheckByCode(data)
      isloading.value = false
      if (rpt.code === ERR_OK) {
        await router.push({
          path: '/registerName',
          state: {
            data: JSON.stringify({
              phone: phone.value,
              code: code.value,
              from: 'register',
              countryCode: countryCode()
            })
          },
          query: { from: 'register' }
        })
      } else {
        showToast(i18n.global.t('Rletter.codeExpired'))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const onSendCode = async () => {
  if (isloading.value) return
  // 打开验证弹框
  if (!phone.value) return showToast(i18n.global.t('Rletter.enternumber'))
  if (!i18nPhoneReg.value?.test(phone.value)) {
    return showToast(i18n.global.t('Lletter.Llettertip13'))
  }
  isloading.value = true
  const isChecked = await checkPhoneNum()
  isloading.value = false
  // 手机号验证通过
  if (isChecked) {
    // 三方图形验证
    initCaptcha(function (validate) {
      isloading.value = false
      sendCode(phone.value, 1, country.value?.phoneCode, validate, user.userInfo.userName)
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
