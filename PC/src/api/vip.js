//  Vip模块
import service from '@/utils/request'
// 查询VIP特权专享
export function getqueryMemberRight(vipLevel) {
  return service({
    url: `/api/member/vip/queryMemberRight/${vipLevel}`,
    method: 'get',
  })
}

// 查询VIP信息
export function getQueryMemberVip(data) {
  return service({
    url: '/api/member/vip/queryMemberVip',
    method: 'get',
    data
  })
}

// 查询VIP信息详情
export function getQueryMemberVipDetail(data) {
  return service({
    url: '/api/member/vip/queryMemberVipDetail',
    method: 'get',
    data
  })
}


// 查询VIP所有等级
export function getQueryMemberVipLevels(data) {
  return service({
    url: '/api/member/vip/queryMemberVipLevels',
    method: 'get',
    data
  })
}


// 查询VIP所有优惠
export function getQueryMemberVipRebates(data) {
  return service({
    url: '/api/member/vip/queryMemberVipRebates',
    method: 'get',
    data
  })
}

// vip特权领取
export function getVipGetCoupon(data) {
  return service({
    url: '/api/member/vip/getCoupon',
    method: 'post',
    data
  })
}

// 查询VIP权益开发配置
export function getQueryVipSwitchConfig(data) {
  return service({
    url: '/api/member/vip/queryVipSwitchConfig',
    method: 'get',
    data
  })
}

// VIP流水误差平账
export function getQueryVipBetVerify(data) {
  return service({
    url: '/api/member/vip/vipBetVerify',
    method: 'get',
    data
  })
}