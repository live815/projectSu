import { parseTime } from './ruoyi'
import i18n from '@/i18n'
/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == '') return ''
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return i18n.global.t('common.just')
  } else if (diff < 3600) {
    // less 1 hour
    return i18n.global.t('common.tip9', { num: Math.ceil(diff / 60) })
  } else if (diff < 3600 * 24) {
    return i18n.global.t('common.tip10', { num: Math.ceil(diff / 3600) })
  } else if (diff < 3600 * 24 * 2) {
    return i18n.global.t('common.tip11')
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      i18n.global.t('common.month') +
      d.getDate() +
      i18n.global.t('common.days') +
      d.getHours() +
      i18n.global.t('common.hours') +
      d.getMinutes() +
      i18n.global.t('common.point')
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, (str1) => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

// 重置空为 '-'
export function resetEmptyValues(obj) {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      obj[key] = '-'
    }
  }
  return obj
}

export function getBrowserType(userAgent) {
  // var userAgent = navigator.userAgent;

  if (userAgent.indexOf('Opera') !== -1 || userAgent.indexOf('OPR') !== -1) {
    return 'Opera'
  } else if (userAgent.indexOf('Edge') !== -1) {
    return 'Edge'
  } else if (userAgent.indexOf('Chrome') !== -1) {
    return 'Chrome'
  } else if (userAgent.indexOf('Safari') !== -1) {
    return 'Safari'
  } else if (userAgent.indexOf('Firefox') !== -1) {
    return 'Firefox'
  } else if (userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
    // IE
    return 'IE'
  } else {
    return 'unknown'
  }
}

export function getImgUrl(url) {
  return  url
}

export const getImgURI = (url) =>  url //url.replace(import.meta.env.VITE_IMG_API, "");

export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj // 如果是基本数据类型或 null，则直接返回
  }

  if (Array.isArray(obj)) {
    // 如果是数组
    const copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  }

  // 如果是对象
  const copy = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key])
    }
  }
  return copy
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

// 保留两位小数
export function toFormatNumber(number) {
  if (Number.isInteger(number)) {
    return number.toFixed(2) // 整数，四舍五入到两位小数
  } else {
    return number.toFixed(2) // 小数，保留两位小数
  }
}

export function filterLabel(list, type) {
  const obj = list.find((item) => item.value === type)
  return obj ? obj.label : '-'
}

export function freshMaxHeight(className, bottom) {
  let dom = document.querySelector(className)
  let clientHeight = document.documentElement.clientHeight
  let top = dom.getBoundingClientRect().top
  return clientHeight - top - bottom
}

export function formatNumber(input) {
  // 如果输入为空或为null，直接返回-
  if (input === null || input === '' || input === undefined) {
    return '-'
  }

  // 将输入转换为数字
  const number = parseFloat(input)
  if (number === 0) return 0

  // 使用toFixed方法将数字保留两位小数
  const formattedNumber = number.toFixed(2)

  return formattedNumber
}
//返回百分比
export function formatDataPercent(data) {
  // 判断数据是否为空或 null
  if (data === null || data === undefined || data === '') {
    return '-' //
  }

  // 判断数据是否为数字类型
  if (typeof data === 'number') {
    // 拼接百分号
    return data + '%'
  }

  // 其他情况直接返回原始数据
  return data
}

// 获取url参数
export function getUrlParams(url = location.href) {
  let params = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    params[key] = value
  })
  return params
}

//返回千分符和小数点两位
export function formatNumberThousand(input) {
  // 如果输入为空或为null，直接返回-
  if (input === null || input === '' || input === undefined) {
    return '-'
  }

  // 将输入转换为数字
  const number = parseFloat(input)
  if (number === 0) return 0

  // 使用toFixed方法将数字保留两位小数
  const formattedNumber = number.toFixed(2)

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 接收开始和结束数字对比结束是否大于开始
const compareStartEnd = (start, end) => {
  const startNumber = isNaN(start) ? Number(start) : start
  const endNumber = isNaN(end) ? Number(end) : end
  if (isNaN(startNumber) || isNaN(end)) {
    return false
  }
  if (startNumber <= endNumber) {
    return true
  } else {
    return false
  }
}

// 数字加密-文字转成数字
export function fontToNumber(dataSafetyItem_res, dataSafetyItem) {
  for (const el of dataSafetyItem_res) {
    switch (el) {
      case i18n.global.t('member.phoneNumberNoQuote'):
        dataSafetyItem.push(1)
        break
      case i18n.global.t('member.bankCard'):
        dataSafetyItem.push(2)
        break
      case i18n.global.t('member.nameNoQuote'):
        dataSafetyItem.push(3)
        break
      case i18n.global.t('risk.virtualAddress'):
        dataSafetyItem.push(4)
        break
      case i18n.global.t('member.openAccountAddress'):
        dataSafetyItem.push(5)
        break
      case i18n.global.t('member.emailNoQuote'):
        dataSafetyItem.push(6)
        break
      case i18n.global.t('member.weChatNumber'):
        dataSafetyItem.push(7)
        break
      case 'QQ':
        dataSafetyItem.push(8)
        break
      case i18n.global.t('member.phoneNumberVericode'):
        dataSafetyItem.push(9)
        break
    }
  }
}

// 数字加密-数字转成文字
export function numberToFont(dataSafetyItem_res, dataSafetyItem) {
  for (const el of dataSafetyItem_res ?? []) {
    switch (el) {
      case 1:
        dataSafetyItem.push(i18n.global.t('member.phoneNumberNoQuote'))
        break
      case 2:
        dataSafetyItem.push(i18n.global.t('member.bankCard'))
        break
      case 3:
        dataSafetyItem.push(i18n.global.t('member.nameNoQuote'))
        break
      case 4:
        dataSafetyItem.push(i18n.global.t('risk.virtualAddress'))
        break
      case 5:
        dataSafetyItem.push(i18n.global.t('member.openAccountAddress'))
        break
      case 6:
        dataSafetyItem.push(i18n.global.t('member.emailNoQuote'))
        break
      case 7:
        dataSafetyItem.push(i18n.global.t('member.weChatNumber'))
        break
      case 8:
        dataSafetyItem.push('QQ')
        break
      case 9:
        dataSafetyItem.push(i18n.global.t('member.phoneNumberVericode'))
        break
    }
  }
}

// 数字加密-表格页面显示文字而不是相应的数字
export function dataSafetyItemName(dataSafetyItem_res) {
  let dataSafetyItem = []
  numberToFont(dataSafetyItem_res, dataSafetyItem)
  dataSafetyItem = dataSafetyItem.join('，')
  return dataSafetyItem
}

// 重新定义toFixed()方法，n是数字，d是小数位数
export function toFixedNew(n, d) {
  let s = n + ''
  if (!d) d = 0
  if (s.indexOf('.') === -1) s += '.'
  s += new Array(d + 1).join('0')
  if (new RegExp('^(-|\\+)?(\\d+(\\.\\d{0,' + (d + 1) + '})?)\\d*$').test(s)) {
    let s = '0' + RegExp.$2,
      pm = RegExp.$1,
      a = RegExp.$3.length,
      b = true
    if (a === d + 2) {
      a = s.match(/\d/g)
      if (parseInt(a[a.length - 1]) > 4) {
        for (let i = a.length - 2; i >= 0; i--) {
          a[i] = parseInt(a[i]) + 1
          if (a[i] === 10) {
            a[i] = 0
            b = i !== 1
          } else break
        }
      }
      s = a.join('').replace(new RegExp('(\\d+)(\\d{' + d + '})\\d$'), '$1.$2')
    }
    if (b) s = s.substring(1)
    return (pm + s).replace(/\.$/, '')
  }
  return this + ''
}

// 数字位数不够时前面补0
export function fix(num, length) {
  return ('' + num).length < length
    ? (new Array(length + 1).join('0') + num).slice(-length)
    : '' + num
}
