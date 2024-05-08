import { onMounted, ref } from 'vue';
import FingerprintJS from 'fingerprintjs2';


export function useDeviceInformation() {
  const deviceId = ref('');
  const optClient = ref('');
  
  onMounted(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    // 判断是否为iOS设备，并设置optClient值
    if (/iphone|ipad|ipod/.test(userAgent)) {
      if (/applewebkit(?!.*safari)/i.test(userAgent)) {
        optClient.value = '3'; // iOS内嵌Webview
      } else {
        optClient.value = '4'; // iOS浏览器
      }
    }

    // 判断是否为Android设备，并设置optClient值
    if (/android/.test(userAgent)) {
      if (/wv|'android'.*Version\/[\d.]+/i.test(userAgent)) {
        optClient.value = '6'; // Android内嵌Webview
      } else {
        optClient.value = '7'; // Android浏览器
      }
    }

    // 判断是否为PC设备，并设置optClient值
    if (!optClient.value) {
      optClient.value = '1'; // PC
    }
  });
    // 获取浏览器指纹
function getBrowserFingerprint() {
  return new Promise((resolve, reject) => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FingerprintJS.get((components) => {
          const values = components.map((component) => component.value)
          const fingerprint = FingerprintJS.x64hash128(values.join(''), 31)
          resolve(fingerprint)
        })
      })
    } else {
      setTimeout(() => {
        FingerprintJS.get((components) => {
          const values = components.map((component) => component.value)
          const fingerprint = FingerprintJS.x64hash128(values.join(''), 31)
          resolve(fingerprint)
        })
      }, 500)
    }
  })
}
// 浏览器指纹（设备标识符）
getBrowserFingerprint()
  .then((fingerprint) => {
    deviceId.value = fingerprint;
  })
  .catch((error) => {
    console.error(error)
  })
 
  return {
    deviceId,
    optClient
  };
}