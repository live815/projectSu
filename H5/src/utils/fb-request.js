import axios from 'axios'
import { showToast, showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores/user'
import { useFBStore } from '@/stores/fb'
import { useFBCurrency } from '@/hooks/useCurrency'
import i18n from '@/i18n/index'
const service = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const fbStore = useFBStore()
    config.data = {
      ...config.data,
      oddsChange: fbStore.settings.oddsChange,
      currencyId: useFBCurrency(),
      languageType: fbStore.languageType
    }
    return config
  },
  (error) => {
    Toast(error.message)
    return Promise.reject(error.message)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data, config } = response
    const { code, message } = data
    let reqData = JSON.parse(config.data)

    // 接口返回维护信息
    if (data.code == 8) {
      return data
    }

    // 登录状态已失效
    if (code === 14010) {
      const userStore = useUserStore()
      // 弹框提示登录失效
      showConfirmDialog({
        title: i18n.global.t('common.loginExpired')
      })
        .then(() => {
          // on confirm
          userStore.logOutAction(true)
        })
        .catch(() => {
          // on cancel
          userStore.logOutAction()
        })
    } else if (code !== 0) {
      console.log(response)
      if (reqData && !reqData.noNeedResponseMsg) {
        showToast(message)
      }
    }
    return (data && data.data) || {}
  },
  (error) => {
    // showToast(error.message)
    return Promise.reject(error.message)
  }
)
export default service
