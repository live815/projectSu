import request from '@/utils/request'

//查询会员列表
export function getOnlineList(data) {
  return request({
    url: '/system/member/user/onlineList',
    method: 'get',
    params:data
  })
}