import request from '@/utils/request'

// 获取Ios轻量版配置
export const getIOSPureConfig = () => {
  return request({
    url: `/system/appDownload/IOSPure/config/get`,
    method: 'get'
  })
}

// 保存Ios轻量版配置
export const saveIOSPureConfig = (data) => {
  return request({
    url: 'system/appDownload/IOSPure/config/save',
    method: 'post',
    data
  })
}


// 获取安卓webapp包
export const getAndroidWebAppConfig = () => {
  return request({
    url: `/system/appDownload/AndroidWebApp/config/get`,
    method: 'get'
  })
}
// 保存安卓webapp配置
export const saveAndroidWepAppConfig = (data) => {
  return request({
    url: 'system/appDownload/AndroidWepApp/config/save',
    method: 'post',
    data
  })
}
