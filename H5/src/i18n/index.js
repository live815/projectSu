import { getUrlParams } from '@/utils'
import { getLocalLanguage, setLocalLanguage } from '@/utils/cache'
import { createI18n } from 'vue-i18n'
import { Locale } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
import viVN from 'vant/es/locale/lang/vi-VN'
import zhCN from 'vant/es/locale/lang/zh-CN'

// 动态设置语言
export async function setLanguageAsync(lang) {
  // 如果该语言包没有加载
  if (Object.keys(i18n.global.getLocaleMessage(lang)).length === 0) {
    const messages = await import(`./lang/${lang}/index.js`)
    i18n.global.setLocaleMessage(lang, messages.default || messages)
  }
  // 更新语言
  if (i18n.mode === 'legacy') {
    i18n.global.locale = lang
  } else {
    i18n.global.locale.value = lang
  }
  // 更新本地存储
  setLocalLanguage(lang)
  // 更新vant语言
  updateVantLanguage(lang)
  return Promise.resolve()
}
export function updateVantLanguage(lang) {
  switch (lang) {
    case 'zh-cn':
      return Locale.use('zh-CN', zhCN)
    case 'vi':
      return Locale.use('vi-VN', viVN)
    case 'en':
      return Locale.use('en-US', enUS)
  }
}

// 后端语言标识
export function getBackEndLanguage(lang) {
  switch (lang) {
    case 'zh-cn':
      return 'zh-CN'
    case 'vi':
      return 'vi-VI'
    case 'en':
      return 'en-US'
    default:
      return 'en-US'
  }
}

// 国家标识字段
export function countryCode() {
  const site = import.meta.env.VITE_SITE
  if (site.includes('cn')) return 'CN'
  if (site.includes('vietnam')) return 'VN'
  if (site.includes('thai')) return 'TH'
  if (site.includes('en')) return 'EN'
}

// 计算FB语言
export function getFBLanguage(lang) {
  switch (lang) {
    case 'zh-cn':
      return 'CMN'
    case 'vi':
      return 'VIE'
    case 'en':
      return 'ENG'

    default:
      return 'ENG'
  }
}

// 视频动画语言
export function getFBAnimationLanguage(lang) {
  switch (lang) {
    case 'zh-cn':
      return 'zh'
    case 'vi':
      return 'vi'
    case 'en':
      return 'en'
    default:
      return lang
  }
}

// 三方图形验证语言标识
export function getCaptchaLanguage(lang) {
  switch (lang) {
    case 'zh-cn':
      return 'zho'
    case 'vi':
      return 'vie'
    case 'en':
      return 'eng'
    default:
      return 'eng'
  }
}

// 语言列表
export const langList = [
  {
    title: '简体中文',
    value: 'zh-cn'
  },
  {
    title: 'English',
    value: 'en'
  },
  {
    title: 'Việt nam',
    value: 'vi'
  }
  // {
  //   title:'ภาษาไทย',
  //   value:'th',
  // },
]

// 默认语言
export function getDefaultLanguage() {
  const { lang } = getUrlParams()
  // 从url中获取语言
  if (lang) {
    return lang
  }
  // 获取本地语言
  const localLang = getLocalLanguage()
  if (localLang) {
    return localLang.toLowerCase()
  }
  // 特定国家站使用特定语言
  let site = import.meta.env.VITE_SITE
  if (site.includes('cn')) {
    // 中国站
    return 'zh-cn'
  }
  if (site.includes('vietnam')) {
    // 越南站
    return 'vi'
  }
  if (site.includes('thai')) {
    // 泰国站
    return 'th'
  }
  if (site.includes('en')) {
    // 国际站
    return 'en'
  }
  // 获取浏览器默认语言
  const browserLang = window.navigator.language.toLowerCase()
  const langObj = langList.find((item) => browserLang.includes(item.value))
  if (langObj) {
    return langObj.value
  }
  return 'en' // 默认使用en
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLanguage(), // 设置默认语言
  fallbackLocale: 'en',
  messages: {}
})

export default i18n
