import { ref } from 'vue'
import { getMobilePlatform, isCTYWebApp, isIOSPure } from './index'
import FingerprintJS from "@fingerprintjs/fingerprintjs";
// 获取设备id
export function getDeviceInfo() {
  const deviceId = ref('')
  const ip = ref('')
  // 唯一标识
  const fpPromise = FingerprintJS.load();
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      deviceId.value = result.visitorId
    })
  // 获取IP地址
  fetch('https://api.ipify.org/')
    .then((r) => r.text())
    .then((res) => {
      ip.value = res
    })
  return {
    deviceId,
    ip
  }
}

export function getDeviceId() {
  const fpPromise = FingerprintJS.load();
  return fpPromise.then((fg) => fg.get()).then((result) => result.visitorId);
}

// h5客户端
export function getClient() {
  // * 1.PC、2.原生ios、3.ios内嵌网页、4.ios H5、5.原生Android、6.Android内嵌网页、7.Android H5、9.未知、 100.Admin管理后台
  let client = 9
  let IOS = getMobilePlatform() === 'IOS'
  let Android = getMobilePlatform() === 'Android'
  // 套壳
  if (isCTYWebApp()) {
    if (IOS) {
      client = 3
    }
    if (Android) {
      client = 6
    }
  } else if (isIOSPure()) {
    client = 3 // ios轻量版/纯净版，后面可区分下套壳
  } else {
    if (IOS) {
      client = 4
    }
    if (Android) {
      client = 7
    }
  }
  return client
}
