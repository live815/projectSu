// 广告活动相关
import service from '@/utils/request'

// 广告列表
export function getAdvertiseApi(tenantId, ip) {
  let query = ''
  if (tenantId && ip) {
    query = `?tenantId=${tenantId}&username=${ip}`
  }
  return service({
    url: `/api/promotion/advertise/list${query}`,
    method: 'get'
  })
}
// 广告列表-单独类型数据
export function getAdvertiseSingleApi({ type, tenantId }) {
  let query = ''
  if (tenantId) {
    query = `?tenantId=${tenantId}&type=${type}`
  } else {
    query = `?type=${type}`
  }
  return service({
    url: `/api/promotion/advertise/list/type${query}`,
    method: 'get'
  })
}

// 上传图片和视频
export function getItemUpload(data) {
  return service({
    url: '/api/file/tutorial/image/upload',
    method: 'post',
    data
  })
}

// 访问活动
export function getActivityDetil(data) {
  return service({
    url: '/api/promotion/activity/click',
    method: 'post',
    data
  })
}

// 查询首存活动记录
export function getFirstChargeData(id) {
  return service({
    url: `/api/promotion/activity/record?activityId=${id}`,
    method: 'get'
  })
}

// 查询累计流水
export function getBetTotal(id) {
  return service({
    url: `/api/promotion/activity/bet/total?activityId=${id}`,
    method: 'get'
  })
}

// 首存活动领取-传返回记录的id
export function claimActivity(data) {
  return service({
    url: '/api/promotion/activity/claim',
    method: 'post',
    data
  })
}

// 大转盘活动参数配置
export function getTurntableDetail(params) {
  return service({
    url: '/api/promotion/activity/turntable/detail',
    method: 'get',
    params
  })
}

// 大转盘抽奖
export function getTurntablePrize(params) {
  return service({
    url: '/api/promotion/activity/turntable/prize/get',
    method: 'get',
    params
  })
}

// 查询用户大转盘抽奖次数
export function getTurntableUserNum(params) {
  return service({
    url: '/api/promotion/activity/turntable/user/num',
    method: 'get',
    params
  })
}

// 查询用户大转盘活动抽奖记录
export function getTurntableUserRecord(params) {
  return service({
    url: '/api/promotion/activity/turntable/user/record',
    method: 'get',
    params
  })
}

// 大转盘中奖名单
export function getTurntableRecord(data) {
  return service({
    url: '/api/promotion/activity/turntable/record',
    method: 'post',
    data
  })
}

export function getMatchConfig(params) {
  return service({
    url: '/api/promotion/activity/getMatchConfig',
    method: 'get',
    params
  })
}

export function getCashbackConfig(params) {
  return service({
    url: '/api/promotion/cashback/client/detail',
    method: 'get',
    params
  })
}
