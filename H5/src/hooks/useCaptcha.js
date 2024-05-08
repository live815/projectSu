import { captchaId } from '@/utils/config'
import { onUnmounted } from 'vue'
import { showToast } from 'vant'
import { getCaptchaLanguage } from '@/i18n'
import { useAppStore } from '@/stores/app'
// 图形验证
export function useCaptcha() {
  const appStore = useAppStore()
  const isloading = ref(false)
  let captchaObj = null
  onMounted(async () => {
    captchaObj = await getCaptcha()
  })
  onUnmounted(() => {
    destoryCaptcha()
  })
  // 图形验证
  async function initCaptcha(callback) {
    isloading.value = true
    if (!captchaObj) {
      captchaObj = await getCaptcha()
    }
    captchaObj.showCaptcha()
    captchaObj
      .onSuccess(function () {
        // 获取前端验证通过后的票据参数
        let validate = captchaObj.getValidate()
        if (!validate) {
          return showToast('Verify fail')
        }
        callback(validate)
        destoryCaptcha()
      })
      .onFail(() => {
        // destoryCaptcha()
      })
      .onError(() => {
        destoryCaptcha()
      })
      .onClose(() => {
        destoryCaptcha()
      })
  }
  function destoryCaptcha() {
    captchaObj?.destroy()
    captchaObj = null
    isloading.value = false
  }
  function getCaptcha() {
    return new Promise((res) => {
      initBotion(
        {
          captchaId, // Use your own captchaId
          apiServers: [
            'bcaptcha.botion.com',
            'bcaptcha.netshunt.com',
            'bcaptcha-botion.vtybotion.com',
            'bcaptcha-netshunt.vtybotion.com',
          ],
          // staticServers:[
          //   'https://static-botion.vtybotion.com',
          //   'https://static-netshunt.vtybotion.com'
          // ],
          product: 'bind',
          language: getCaptchaLanguage(appStore.language),
          riskType: 'slide',
          protocol: window.location.protocol + '//',
          timeout: 10000
        },
        function (captcha) {
          res(captcha)
        }
      )
    })
  }
  return {
    initCaptcha,
    isloading
  }
}
