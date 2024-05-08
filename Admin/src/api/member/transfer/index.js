import request from '@/utils/request'

//查询会员列表
export function getTransferList(data) {
  return request({
    url: '/system/api/game/pay/pageList',
    method: 'post',
    data:data
  })
}