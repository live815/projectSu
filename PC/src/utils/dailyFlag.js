import { getDailyFlag, setDailyFlag, removeDailyFlag } from './cache.js'

const KeyMap = {
  // 首页弹窗广告
  1: '_POPUP_ADS_'
}

// 检测今日是否有开启      id用于多条数据的逻辑
export function checkDailyFlag(key, id) {
  const user = useUserStore()
  const userName = user.userInfo.userName || 'NO_LOGIN'
  let lastVisit
  if (user.isLogin) {
    lastVisit = getDailyFlag(KeyMap[key] + userName)
  } else {
    lastVisit = getDailyFlag(KeyMap[key] + 'NO_LOGIN')
  }

  const time = new Date().toDateString()
  let val = {
    time,
    list: []
  }
  if (!lastVisit) {
    if (id) {
      val.list.push(id)
      setDailyFlag(KeyMap[key] + userName, val)
    } else {
      setDailyFlag(KeyMap[key] + userName, val)
    }
    return true
  } else {
    if (id) {
      val = lastVisit
      if (val.list.includes(id)) {
        return false
      } else {
        val.list.push(id)
        setDailyFlag(KeyMap[key] + userName, val)
        return true
      }
    } else {
      if (lastVisit.time == time) {
        return false
      } else {
        setDailyFlag(KeyMap[key] + userName, val)
        return true
      }
    }
  }
}

// 清除所有相关缓存
export function delDailyFlag() {
  const keys = Object.keys(KeyMap)
  keys.forEach((key) => {
    removeDailyFlag(KeyMap[key])
  })
}
