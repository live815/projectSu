import storage from 'good-storage'
import i18n from '@/i18n'
import { useLiveStore } from '@/stores/liveBroadcast'
const TOKEN = '__TOKEN__'
const CURRENT_TIME_STAMP = '__CURRENT_TIME_STAMP__'
const FB_CONFIG = '__FB_CONFIG__'
const USER_INFO = '_USER_INFO_'
const FOLLOW_LIST = '__FOLLOW_LIST__'
const USER_ROLE = '_UESER_ROLE_'
const COLLECT_IDS = '__COLLECT_IDS__'
const INVITE_CODE = '__INVITE_CODE__'
const REFER_CODE = '__REFER_CODE__'
const __LANG__ = '__LANG__'
const SETTINGS = '__SETTINGS__'
const ORDER_INFO = '__ORDER_INFO__'
const WITHDRAW_INFO = '__WITHDRAW_INFO__'
export function getSettings() {
  return storage.get(SETTINGS, {
    oddsFormat: 1, //1欧洲盘 2香港盘
    oddsChange: 1 // 0不接受赔率变动 1自动接受最好赔率 2接收任意赔率变动
  })
}
export function setSettings(flag) {
  return storage.set(SETTINGS, flag)
}

export function getLocalLanguage() {
  return storage.get(__LANG__, '')
}
export function setLocalLanguage(flag) {
  storage.set(__LANG__, flag)
  return flag
}

export function getInviteCode() {
  return storage.session.get(INVITE_CODE, '')
}
export function setInviteCode(flag) {
  return storage.session.set(INVITE_CODE, flag)
}

export function getReferCode() {
  return storage.session.get(REFER_CODE, '')
}
export function setReferCode(flag) {
  return storage.session.set(REFER_CODE, flag)
}

export function getCollectIds() {
  return storage.get(COLLECT_IDS, [])
}
export function setCollectIds(flag) {
  return storage.set(COLLECT_IDS, flag)
}
export function getFollowList() {
  return storage.get(FOLLOW_LIST, {})
}
export function setFollowList(flag) {
  return storage.set(FOLLOW_LIST, flag)
}
export function getToken() {
  return storage.get(TOKEN, '')
}
export function setToken(flag) {
  return storage.set(TOKEN, flag)
}
export function removeToken() {
  return storage.remove(TOKEN)
}
export function setUserRole(flag) {
  return storage.set(USER_ROLE, flag)
}
export function getUserRole() {
  return storage.get(USER_ROLE, '')
}
export function removeUserRole() {
  return storage.set(USER_ROLE)
}

export function getOrderInfo() {
  return storage.get(ORDER_INFO, {})
}
export function setOrderInfo(flag) {
  return storage.set(ORDER_INFO, flag)
}
export function removeOrderInfo() {
  return storage.remove(ORDER_INFO)
}

export function getWithdrawInfo() {
  return storage.get(WITHDRAW_INFO, {})
}
export function setWithdrawInfo(flag) {
  return storage.set(WITHDRAW_INFO, flag)
}
export function removeWithdrawInfo() {
  return storage.remove(WITHDRAW_INFO)
}
export function getPageOpenedCurrentTimestamp() {
  return storage.get(CURRENT_TIME_STAMP, new Date())
}
export function setPageOpenedCurrentTimestamp(flag) {
  storage.set(CURRENT_TIME_STAMP, flag)
  return flag
}

export function getFBConfig() {
  return storage.get(FB_CONFIG, {})
}
export function setFBConfig(flag) {
  storage.set(FB_CONFIG, flag)
  return flag
}

//存账户和密码
export function setUsernameAndPassword(payload) {
  return storage.set(USER_INFO, payload)
}

//获账户和密码
export function getUsernameAndPassword() {
  return storage.get(USER_INFO)
}

//清除缓存的账号和密码
export function removeUsernameAndPassword() {
  return storage.remove(USER_INFO)
}
export function getImgUrl(url) {
  return url
}
//截取图片
export function getIntercept(url, type) {
  if (url) {
    let arr = url.split(',')
    return arr[type]
  } else {
    return 'https://static.fastbs55.com/data/ba97371866a798e46a3068558a00ab00.png'
  }
}
//截取比分
export function getScore(data, type) {
  if (data) {
    let arr = data.split(':')
    return arr[type]
  } else {
    return 0
  }
}
//时间转成 比赛格式
export function formatTime(milliseconds) {
  const date = new Date(milliseconds)
  const MM = String(date.getMonth() + 1).padStart(2, '0') // Month
  const DD = String(date.getDate()).padStart(2, '0') // Day
  const HH = String(date.getHours()).padStart(2, '0') // Hours
  const mm = String(date.getMinutes()).padStart(2, '0') // Minutes
  // const ss = String(date.getSeconds()).padStart(2, '0'); // Seconds

  return `${MM}-${DD} ${HH}:${mm}`
}
export function formatCurrentTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，需要加1
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
//数据排序
export function arrSort(arr) {
  arr.sort((a, b) => {
    if (a.status === 2 && b.status !== 2) {
      return -1 // a置顶
    } else if (a.status !== 2 && b.status === 2) {
      return 1 // b置顶
    } else {
      return 0 // 不变顺序
    }
  })
  return arr
}
export function orderStatus(type) {
  switch (type) {
    case 0:
      return i18n.global.t('JsDocument.CreatedSuccessfully')
    case 1:
      return i18n.global.t('JsDocument.Confirming')
    case 2:
      return i18n.global.t('JsDocument.RejectOrder')
    case 3:
      return i18n.global.t('JsDocument.CancelOrder')
    case 4:
      return i18n.global.t('JsDocument.BetSuccessful')
    case 5:
      return i18n.global.t('JsDocument.Settled')
    default:
      return i18n.global.t('JsDocument.EuropeanHandicap')
  }
}

// 用户每日一执行次的本地数据
export function getDailyFlag(key) {
  return storage.get(key, '')
}
export function setDailyFlag(key, val) {
  return storage.set(key, val)
}
export function removeDailyFlag(key) {
  return storage.remove(key)
}
// 格式化账号名称
export function HandlerAccountName(string) {
  let modifiedString = string?.substring(0, 2) + '***' + string?.substring(string.length - 2)
  return modifiedString
}
// iframe 卫星直播 播放器参数拼接
export function iframeVider(url, controls) {
  const load_error = i18n.global.t('AnchorPlay.LoadError') //加载错误提示文字
  const sound = 1 //是否静音
  const refresh = i18n.global.t('AnchorPlay.Refresh') //刷新按钮的文字
  const pause = i18n.global.t('AnchorPlay.Pause') //暂停按钮的提示文字
  const play = i18n.global.t('AnchorPlay.Play') //播放按钮的提示文字
  const volume_number = 70 //音量值
  const dynamicParams = {
    refresh: encodeURIComponent(refresh),
    load_error: encodeURIComponent(load_error),
    sound,
    pause: encodeURIComponent(pause),
    play: encodeURIComponent(play),
    volume_number,
    controls
  }
  const queryString = Object.entries(dynamicParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `${url}&${queryString}`
}
//主播比赛赛程 查询比分
export function liveScore(gameId, index) {
  const liveStore = useLiveStore()
  let Score = liveStore.liveMatchScore.filter((item) => item.gameId == gameId)
  if (Score && Score.length > 0) {
    console.log(gameId, Score[0].scores[0]?.scores.split(':'))
    let arrScore = Score[0].scores[0]?.scores.split(':')
    return arrScore[index]
  }
  return ''
}
