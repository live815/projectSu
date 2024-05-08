import { ref } from 'vue'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
export function getDeviceInfo() {
  const deviceId = ref('')
  const ip = ref('')
  const optClient = ref('')
  // 获取IP地址
  fetch('https://api.ipify.org/')
    .then((r) => r.text())
    .then((res) => {
      ip.value = res
    })
  // 唯一标识
  const fpPromise = FingerprintJS.load()
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      deviceId.value = result.visitorId
    })
  const userAgent = navigator.userAgent.toLowerCase()

  // 判断是否为iOS设备，并设置optClient值
  if (/iphone|ipad|ipod/.test(userAgent)) {
    if (/applewebkit(?!.*safari)/i.test(userAgent)) {
      optClient.value = '3' // iOS内嵌Webview
    } else {
      optClient.value = '4' // iOS浏览器
    }
  }

  // 判断是否为Android设备，并设置optClient值
  if (/android/.test(userAgent)) {
    if (/wv|'android'.*Version\/[\d.]+/i.test(userAgent)) {
      optClient.value = '6' // Android内嵌Webview
    } else {
      optClient.value = '7' // Android浏览器
    }
  }

  // 判断是否为PC设备，并设置optClient值
  if (!optClient.value) {
    optClient.value = '1' // PC
  }
  return {
    deviceId,
    ip,
    optClient
  }
}

export function getDeviceId() {
  const fpPromise = FingerprintJS.load()
  return fpPromise.then((fg) => fg.get()).then((result) => result.visitorId)
}
