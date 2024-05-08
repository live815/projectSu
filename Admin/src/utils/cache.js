import storage from "good-storage";

const TOKEN = "__TOKEN__";
const CURRENT_TIME_STAMP = "__CURRENT_TIME_STAMP__";
const FB_CONFIG = "__FB_CONFIG__";
const USER_INFO = "_USER_INFO_";
const FOLLOW_LIST = "__FOLLOW_LIST__";
const USER_ROLE = "_UESER_ROLE_";
const __LANG__ = '__LANG__'
const SETTINGS = '__SETTINGS__'
export function getSettings() {
  return storage.get(SETTINGS, {
    oddsFormat: 1, //1欧洲盘 2香港盘
    oddsChange: 1, // 0不接受赔率变动 1自动接受最好赔率 2接收任意赔率变动
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
export function getFBConfig() {
  return storage.get(FB_CONFIG, {});
}
export function setFBConfig(flag) {
  storage.set(FB_CONFIG, flag);
  return flag;
}
export function getToken() {
  return storage.get(TOKEN, "");
}
export function getFollowList() {
  return storage.get(FOLLOW_LIST, {});
}
export function setFollowList(flag) {
  return storage.set(FOLLOW_LIST, flag);
}
