import request from '@/utils/request'

//查询会员列表-套利分析-ip查询
export function getLoginUserByIp(data) {
  return request({
    url: '/system/member/user/queryLoginUserByIp',
    method: 'get',
    params:data
  })
}

//查询会员列表-套利分析-ip信息
export function getUserSameIp(data) {
  return request({
    url: '/system/member/user/sameIp',
    method: 'get',
    params:data
  })
}