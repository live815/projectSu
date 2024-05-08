import service from '@/utils/request'
export function getGameListApi(params) {
  return service({
    url: '/api/game/home/bar/list',
    method: 'get',
    params
  })
}

export function getSubGameListApi(data) {
  return service({
    url: '/api/game/home/slot/list/',
    method: 'post',
    data
  })
}

export function entryGameApi(data) {
  return service({
    url: '/api/game/bet/single-wallet/jump',
    method: 'post',
    timeout:10000,
    data
  })
}

// 获取登录状态下的FBToken
export function getFBToken(data) {
  return service({
    url: '/api/game/bet/cSports/token',
    method: 'post',
    data
  })
}

// 获取游客模式下的FBToken
export function getGuestModeFBToken() {
  return new Promise((res) => {
    res({
      code: 200,
      msg: '操作成功',
      data: {
        token: '', // token传空
        apiServerAddress: import.meta.env.VITE_FB_SPORT_DEFAULT_API
      }
    })
  })
}
// 获取游戏账户列表
export function getGameBetList(data) {
  return service({
    url: '/api/game/bet/order/mybet/sum',
    method: 'post',
    data
  })
}

// 获取游戏注单详情
export function getGameBetDetail(data) {
  return service({
    url: '/api/game/bet/order/mybet/detail',
    method: 'post',
    data
  })
}

//投注记录新接口
export function vsportBetRecord(data) {
  return service({
    url: '/api/game/bet/cSports/order/mybet/detail',
    method: 'post',
    data
  })
}
