// 跳转外链重定向
export function webviewBridgeRedirect({ url, isOpenWindow, appFunName }) {
  if (isCTYWebApp()) {
    appFunName = appFunName || 'openNewPage'
    AppH5InteractionMethod(appFunName, url)
  } else {
    console.log('进入h5页面跳转')
    if (isOpenWindow && getMobilePlatform() === 'IOS') {
      setTimeout(() => {
        // window.open(url, '_blank')
        window.location.assign(url)
      }, 100)
    } else {
      window.location.href = url
    }
  }
}

// 套壳app
export function isCTYWebApp() {
  const ua = navigator.userAgent
  return ua.includes('CTYWebApp')
}

// ios轻量版
export function isIOSPure() {
  return window.location.href.includes('isIOSPure')
}
// vue-router-webview
export function vueRouterWebview({ url, title, router, redirect }) {
  let newUrl = `/webview?title=${title}&url=${btoa(url)}`
  if (redirect) {
    newUrl += `&redirect=${redirect}`
  }
  router.push(newUrl)
}

// app&h5交互通用方法
export function AppH5InteractionMethod(funcName, params) {
  console.log(`参数：${params}`)
  let IOS = getMobilePlatform() === 'IOS'
  let Android = getMobilePlatform() === 'Android'
  try {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler(funcName, params)
    } else if (IOS && window.webkit && window.webkit.messageHandlers) {
      window.webkit.messageHandlers[funcName].postMessage(params)
    } else if (Android && window.android) {
      console.log(params)
      window.android[funcName](params)
    } else {
      console.log(`app不支持${funcName}方法交互`)
    }
  } catch (e) {
    console.log(`app不支持${funcName}方法交互`)
    console.log(e.message)
  }
}
export function getMobilePlatform() {
  if (navigator.userAgent.match(/Android/i)) return 'Android'
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i)
  )
    return 'IOS'
  if (navigator.userAgent.match(/Windows Phone/i)) return 'Windows Phone'
  return 'other'
}
// 获取:root下的css变量值
export function getCssVariableValue(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

// 拼接图片地址
export function getImg(url) {
  if (isURL(url)) return url
  return /*import.meta.env.VITE_IMG_API +*/ url
}

export function isURL(str) {
  // 正则表达式匹配 URL 格式
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w .-]*)*\/?$/i
  return urlPattern.test(str)
}

export function parseURLParams(url = location.href) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const keyValuePairs = queryString.split('&')
    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=')
      params[key] = decodeURIComponent(value)
    })
  }
  return params
}

export function formatNumber(number) {
  const formattedNumber = number.toFixed(2) // 保留两位小数
  const indexOfDecimal = formattedNumber.indexOf('.') // 找到小数点的位置

  if (indexOfDecimal !== -1 && formattedNumber[indexOfDecimal + 2] === '0') {
    return formattedNumber.slice(0, indexOfDecimal + 2) // 如果第二位小数为 0，只保留一位小数
  }

  return formattedNumber || 0
}

// 获取指定日期对象
export function getDateOffset(daysOffset) {
  const currentDate = new Date()
  const dayInMillis = 24 * 60 * 60 * 1000
  const targetTimestamp = currentDate.getTime() + daysOffset * dayInMillis
  return new Date(targetTimestamp)
}
// 获取指定日期字符串 2023-01-01
export const getDay = (day) => {
  var today = new Date()
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds) //注意，这行是关键代码
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = formatNum(tMonth + 1)
  tDate = formatNum(tDate)
  return `${tYear}-${tMonth}-${tDate}`
}
// 格式化数字
export const formatNum = (num) => {
  return num < 10 ? '0' + num : num
}

// 将日期对象转化为 数组['2023','08','06']
export function formatDateArray(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 补零
  const day = String(date.getDate()).padStart(2, '0') // 补零
  return [String(year), month, day]
}

// 获取指定日期的开始时间戳与结算时间戳
export function getDateTimeStampRange(date) {
  date = date || new Date()
  return {
    startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime(),
    endTime: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    ).getTime()
  }
}

export function getSafeAreaHeight() {
  const screenHeight = window.innerHeight
  const screenWidth = window.innerWidth
  const isLandscape = screenWidth > screenHeight
  if (isLandscape) {
    return 0
  } else if (screenHeight >= 812) {
    return 34
  } else {
    return 0
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}-${day} ${hours}:${minutes}`
}

export function formatTime(timestamp) {
  // 如果输入是时间戳，则将其转换为 Date 对象
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)

  // 从 Date 对象中获取年、月、日、小时、分钟和秒
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 返回格式化的日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 保留两位小数
export function toFormatNumber(number) {
  if (number !== null) {
    if (Number.isInteger(number)) {
      return number.toFixed(2) // 整数，四舍五入到两位小数
    } else {
      return number.toFixed(2) // 小数，保留两位小数
    }
  }
  return null
}

// 格式化账号名称
export function HandlerAccountName(string) {
  let modifiedString = string?.substring(0, 2) + '***' + string?.substring(string.length - 2)
  return modifiedString
}

// 传入n获得n天前的时间戳fristTimeStamp
export function getTimeStampByPassDay(n) {
  const dayNumber = n
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  if (dayNumber == 0 || dayNumber == 1) {
    const targetDate = new Date(year, currentDate.getMonth(), currentDate.getDate() - n)
    const startTime = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(targetDate.getDate()).padStart(2, '0')} 00:00:00`
    const startTimeStamp = new Date(startTime).getTime()
    const endTime = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(targetDate.getDate()).padStart(2, '0')} 23:59:59`
    const endTimeStamp = new Date(endTime).getTime()
    return [startTimeStamp, endTimeStamp]
  } else {
    const startDate = new Date(year, currentDate.getMonth(), currentDate.getDate() - (n - 1))
    const startTime = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(startDate.getDate()).padStart(2, '0')} 00:00:00`
    const startTimeStamp = new Date(startTime).getTime()
    const endTime = `${year}-${month}-${day} 23:59:59`
    const endTimeStamp = new Date(endTime).getTime()
    return [startTimeStamp, endTimeStamp]
  }
}

// 将日期转化为yyyy/mm/dd
export function getFromatDate(date) {
  let dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}

// 获取IP地址
export function getPublicIPAddress() {
  return new Promise((resolve, reject) => {
    fetch('https://api.ipify.org/?format=json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('网络请求失败')
        }
        return response.json()
      })
      .then((data) => {
        resolve(data.ip)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 获取url参数
export function getUrlParams(url = location.href) {
  let params = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    params[key] = value
  })
  return params
}

// 关闭指定网址
export function closeNewWindow() {
  if (newWindow.value && !newWindow.value.closed) {
    newWindow.value.close()
  }
}

// 对手机号进行脱敏
export function maskPhoneNumber(phoneNumber) {
  if (phoneNumber.length === 11) {
    return phoneNumber.slice(0, 3) + '****' + phoneNumber.slice(7)
  } else if (phoneNumber.length === 9) {
    return phoneNumber.slice(0, 3) + '***' + phoneNumber.slice(6)
  }
}
