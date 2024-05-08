import i18n from '@/i18n'
import { ERR_OK } from '@/utils/config'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sendCodeApi, getSendEmail } from '@/api/sendCode'
import Reg from '@/utils/reg'
import { ref } from 'vue'

export function useSendCode() {
  const availableSendCode = ref(true)
  // 发送验证码
  async function sendCode(phone, actionType, mobileArea, validate) {
    // const loading = showLoadingToast({
    //   message: i18n.global.t('common.loading'),
    //   forbidClick: true,
    //   duration: 0
    // })
    const res = await sendCodeApi({
      ...validate,
      actionType, // 1注册，2登录 3忘记密码
      mobileArea: mobileArea.replace(/\+/gi, ''),
      mobile: phone
    })
    // loading.close()
    if (res.code === ERR_OK) {
      availableSendCode.value = false
    }
  }
  // 发送邮箱验证码
  async function sendEmailCode(email, actionType, userName) {
    const res = await getSendEmail({
      email, //邮箱账号
      actionType, //验证场景类型
      userName //会员账号
    })
    // loading.close()
    if (res['code'] === ERR_OK) {
      availableSendCode.value = false
    }
  }

  function getPhoneInputLength(countryCode) {
    return countryCode === 'CN' ? 11 : 9
  }

  function getBankCardInputMinLength(countryCode) {
    return countryCode === 'CN' ? 16 : 4
  }
  return {
    availableSendCode,
    sendCode,
    sendEmailCode,
    getPhoneInputLength,
    getBankCardInputMinLength
  }
}
