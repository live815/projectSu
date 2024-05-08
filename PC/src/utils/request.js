import axios from 'axios'
import { ERR_EXPIRED, ERR_OK } from '@/utils/config'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/cache'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAppStore } from '@/stores/app'
import i18n, { getBackEndLanguage } from '@/i18n/index'
import { version } from '@/utils/config'
import { getDeviceId } from '@/utils/mobileDeviceInfo'
let deviceId = null
const service = axios.create({
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore()
    if(userStore.userInfo.userName){
      config.headers['Username'] = userStore.userInfo.userName
    }
    const token = getToken()
    if (!config.headers.Authorization) {
      config.headers['Authorization'] = token
    }
    // 添加语言标识
    const appStore = useAppStore()
    config.headers.Language = appStore.language
    config.headers['Accept-Language'] = getBackEndLanguage(appStore.language)
    if (!deviceId) {
      deviceId = await getDeviceId()
    }
    config.headers.client = 1 // 客户端
    config.headers.deviceNo = deviceId //设备号
    config.headers.clientModel = navigator.userAgent //登录型号
    config.headers.appVersion = version //APP版本号

    // 添加平台
    const platform = import.meta.env.VITE_SITE
    if (platform) {
      config.headers.platform = platform
    }
    if (config.data && config.data instanceof FormData) {
      // 更改请求头为 multipart/form-data
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data, config } = response
    const { code, msg } = data
    let reqData = ''
    if (config.data) {
      // post
      if (config.data instanceof FormData) {
        reqData = 'undefined'
      } else {
        reqData = JSON.parse(config.data)
      }
    } else {
      // get
      reqData = config.params
    }
    // 登录状态已失效
    if (code === ERR_EXPIRED) {
      executeExpiredLogic()
    } else if (code !== ERR_OK) {
      if (reqData && !reqData.noNeedResponseMsg) {
        if(msg.length) {
          ElMessage({
            message: msg,
            type: 'error'
          })
        } 
   
      }
    }
    return data
  },
  (error) => {
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
      ElMessageBox.confirm(
        i18n.global.t('JsDocument.loginTips_1'),
        i18n.global.t('JsDocument.KindTips'),
        {
          confirmButtonText: i18n.global.t('JsDocument.Sure'),
          cancelButtonText: i18n.global.t('JsDocument.Cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          userStore.logOutAction()
        })
        .catch(() => {
          userStore.logOutAction()
        })
    } else {
      // 执行退出
      userStore.logOutAction()
      // 刷新页面
      // location.reload()
    }
  }
}
