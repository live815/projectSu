// 获取:root下的css变量值
export function getCssVariableValue(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

// 拼接图片地址
export function getImg(url) {
  return url
}
// 图片地址拼接
export function getImgUrl(url) {
  return url
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

// 获取指定日期对象 如传 5 则获取5天后的
export function getDateOffset(daysOffset) {
  const currentDate = new Date()
  const dayInMillis = 24 * 60 * 60 * 1000
  const targetTimestamp = currentDate.getTime() + daysOffset * dayInMillis
  return new Date(targetTimestamp)
}

// 将日期对象转化为 数组['2023','08','06']
export function formatDateArray(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 补零
  const day = String(date.getDate()).padStart(2, '0') // 补零
  return [String(year), month, day]
}

// 合并两个数组对象内的所有属性
export function mergeArraysOfObjects(arr1, arr2) {
  const mergedArray = []

  // 合并第一个数组的对象
  arr1.forEach((obj) => {
    const matchingObj = arr2.find((item) => item.id === obj.id) // 假设对象有一个唯一的属性 id
    if (matchingObj) {
      const mergedObj = { ...obj, ...matchingObj }
      mergedArray.push(mergedObj)
    } else {
      mergedArray.push(obj)
    }
  })

  // 合并第二个数组中剩余的对象
  arr2.forEach((obj) => {
    const matchingObj = mergedArray.find((item) => item.id === obj.id)
    if (!matchingObj) {
      mergedArray.push(obj)
    }
  })

  return mergedArray
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

// 传入n获得n天前的时间戳fristTimeStamp
export function getTimeStampByPassDay(n) {
  let fristTimeStamp = new Date(new Date().setHours(0, 0, 0, 0)) * 1
  let secondTimeStamp = fristTimeStamp - n * 24 * 60 * 60 * 1000
  if (fristTimeStamp < secondTimeStamp) {
    let time = new Date(secondTimeStamp)
    let endTimeStamp = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      23,
      59,
      59,
      999
    ).getTime()
    return [fristTimeStamp, endTimeStamp]
  } else {
    if (n == 0 || n == 1) {
      let time = new Date(secondTimeStamp)
      let endTimeStamp = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        23,
        59,
        59,
        999
      ).getTime()
      return [secondTimeStamp, endTimeStamp]
    }
    if (n == 7) {
      let time = new Date()
      let endTimeStamp = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        23,
        59,
        59,
        999
      ).getTime()

      return [secondTimeStamp, endTimeStamp]
    }
    let time = new Date()
    let endTimeStamp = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      23,
      59,
      59,
      999
    ).getTime()

    return [secondTimeStamp, endTimeStamp]
  }
}
//转时间
export function getTime(time) {
  return time ? new Date(parseInt(time)).toLocaleString().replaceAll(/\//gi, '-') : '-'
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
  if (Number.isInteger(number)) {
    return number?.toFixed(2) // 整数，四舍五入到两位小数
  } else {
    return number?.toFixed(2) // 小数，保留两位小数
  }
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
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}-${day} ${hours}:${minutes}`
}

// 将new Date日期转化为yyyy/mm/dd
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

// 传入n获得n天前的时间戳fristTimeStamp// 资金明细模块使用
export function getFristTimeStamp(n) {
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

// 获取url参数
export function getUrlParams(url = location.href) {
  let params = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    params[key] = value
  })
  return params
}

// 对手机号进行脱敏
export function maskPhoneNumber(phoneNumber) {
  if (phoneNumber.length === 11) {
    return phoneNumber.slice(0, 3) + '****' + phoneNumber.slice(7)
  } else if (phoneNumber.length === 9) {
    return phoneNumber.slice(0, 3) + '***' + phoneNumber.slice(6)
  }
}

// 手机脱密
export function hidePhoneNumber(phoneNumber) {
  return `*******${phoneNumber.slice(-4)}`
}

export function removeHtmlAndSpaces(inputString) {
  // 移除HTML标签
  const stringWithoutTags = inputString.replace(/<[^>]*>/g, '')

  // 移除&nbsp;
  const stringWithoutSpaces = stringWithoutTags.replace(/&nbsp;/g, ' ')

  return stringWithoutSpaces.trim() // 去除首尾空格
}
