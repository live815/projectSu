// 收货地址
import service from '@/utils/request'

// 查询新手活动参数配置
export function getNewbieDetail(params) {
  return service({
    url: '/api/promotion/activity/newbie/detail',
    method: 'get',
    params
  })
}

// 查询登录用户新手大礼包完成情况
export function getNewbieGiftDetail(params) {
  return service({
    url: '/api/promotion/get/user/newbie/gift/detail',
    method: 'get',
    params
  })
}

// 查询登录用户参加新手活动资格
export function getNewbieQualifications(params) {
  return service({
    url: '/api/promotion/get/user/newbie/qualifications',
    method: 'get',
    params
  })
}

// 查询登录用户签到完成情况
export function getNewbieSignGiftDetail(params) {
  return service({
    url: '/api/promotion/get/user/sign/gift/detail',
    method: 'get',
    params
  })
}

// 新手活动复活大礼包用户领取
export function getNewbieResurrectionReceive(params) {
  return service({
    url: '/api/promotion/newbie/user/resurrection/receive',
    method: 'get',
    params
  })
}

// 新手活动用户复活大礼包状态查询
export function getNewbieResurrectionStatus(params) {
  return service({
    url: '/api/promotion/newbie/user/resurrection/status/get',
    method: 'get',
    params
  })
}

// 新手活动签到大礼包用户签到
export function getNewbieSign(params) {
  return service({
    url: '/api/promotion/newbie/user/sign',
    method: 'get',
    params
  })
}
