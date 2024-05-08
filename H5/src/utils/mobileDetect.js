/**
 * 获取设备和系统信息
 * @returns environment
 */
import MobileDetect from 'mobile-detect'
export function getMobSysInfo() {
  Array.prototype.contains = function (needle) {
    for (i in this) {
      if (this[i].indexOf(needle) > 0) return i
    }
    return -1
  }

  let device_type = navigator.userAgent //获取userAgent信息
  let md = new MobileDetect(device_type) //初始化mobile-detect
  let os = md.os() //获取系统
  let model = ''
  if (os == 'iOS') {
    //ios系统的处理
    os = md.os() + md.version('iPhone')
    model = md.mobile()
  } else if (os == 'AndroidOS') {
    //Android系统的处理
    os = md.os() + md.version('Android')
    let sss = device_type.split(';')
    var i = sss.contains('Build/')
    if (i > -1) {
      model = sss[i].substring(0, sss[i].indexOf('Build/'))
    }
  }
  return {
    os,
    model
  }
}