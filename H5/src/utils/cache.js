import storage from 'good-storage'
const TOKEN = '__TOKEN__'
const CURRENT_TIME_STAMP = '__CURRENT_TIME_STAMP__'
const FB_CONFIG = '__FB_CONFIG__'
const USER_INFO = '_USER_INFO_'
const FOLLOW_LIST = '__FOLLOW_LIST__'
const COLLECT_IDS = '__COLLECT_IDS__'

const INVITE_CODE = '__INVITE_CODE__'
const REFER_CODE = '__REFER_CODE__'
const SETTINGS = '__SETTINGS__'
const __LANG__ = '__LANG__'
const WINDOW_RUL = '__WINDOW_RUL__'
const __DOWNLOAD_APP__ = '__DOWNLOAD_APP__'
const MATCH_FILTER = 'MATCH_FILTER'
export function getIsHideDownload() {
  return storage.session.get(__DOWNLOAD_APP__, '')
}
export function setIsHideDownload(flag) {
  storage.session.set(__DOWNLOAD_APP__, flag)
  return flag
}

export function getLocalLanguage() {
  return storage.get(__LANG__, '')
}
export function setLocalLanguage(flag) {
  storage.set(__LANG__, flag)
  return flag
}

export function getSettings() {
  return storage.get(SETTINGS, {
    oddsFormat: 1, //1欧洲盘 2香港盘
    oddsChange: 1 // 0不接受赔率变动 1自动接受最好赔率 2接收任意赔率变动
  })
}
export function setSettings(flag) {
  return storage.set(SETTINGS, flag)
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

// 存储充值打开的url
export function setWindowUrl(flag) {
  return storage.set(WINDOW_RUL, flag)
}

//获取充值的url
export function getWindowUrl() {
  return storage.get(WINDOW_RUL)
}

//清除充值的url
export function removeWindowUrl() {
  return storage.remove(WINDOW_RUL)
}

// 保存赛事筛选项
export function setMatchScreening(flag) {
  return storage.set(MATCH_FILTER,flag)
}

// 获取赛事筛选项
export function getMatchScreening() {
  return storage.get(MATCH_FILTER)
}
