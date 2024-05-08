import axios from 'axios'
import { useFBStore } from '@/stores/fb'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { useFBCurrency } from '@/hooks/useCurrency'
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
    // Toast(error.message)
    return Promise.reject(error.message)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data, config } = response
    const { code, message } = data
    let reqData = JSON.parse(config.data)
    // console.log(code,'code',message,data)
    // data.code = 8
    // data.message = '系统维护中，维护时间[1708927200000-1708930800000]'
    // 接口返回维护信息
    if(data.code == 8){
      return data
    }

    // 登录状态已失效
    if (code === 14010) {
      executeExpiredLogic()
    } else if (code !== 0) {
      // console.log(response)
      if (reqData && !reqData.noNeedResponseMsg) {
        // showToast(message)
        // console.log(message)
        ElMessage(message)
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

// 登录状态过期逻辑
const executeExpiredLogic = () => {
  const userStore = useUserStore()
  // 杜绝重复执行以下代码块
  if (!window.hasExpiredExecuteFlag) {
    window.hasExpiredExecuteFlag = true
    /*
      后台验证token状态过期的情景：
      1.长时间停留在页面未动，当用户再次回来操作时，此时要弹框提示过期
      2.在使用应用的过程中被其他设备登录挤掉了，此时要弹框提示过期
      3.关闭应用后，过了很长时间回来重新打开应用，并使用了上次存的token，此时就不该提示过期弹框，要直接执行退出逻辑

      在代码上如何界定这3种情况呢? 
      你会发现 情景1/2都是应用处于运行或者在后台运行状态，即没有关闭应用，它们需要弹框提示过期.
      情景3是应用关闭了，过了很长时间下次重新打开时则不应该弹框提示登录过期
      于是问题迎刃而解，只要判断当前应用是处于一个长期在运行状态还是重新开启运行状态即可

    */
    // 如果当前应用处于长期运行状态
    if (window.isAppLongRunStatus) {
      // 弹框提示登录失效
      ElMessageBox.confirm(i18n.global.t('JsDocument.loginTips_1'), i18n.global.t('JsDocument.KindTips'), {
        confirmButtonText: i18n.global.t('JsDocument.Sure'),
        cancelButtonText: i18n.global.t('JsDocument.Cancel'),
        type: 'warning'
      })
        .then(() => {
          userStore.logOutAction()
        })
        .catch(() => {
          userStore.logOutAction()
        })
    } else {
      // 执行退出
      userStore.logOutAction()
    }
  }
}
