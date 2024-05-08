import request from '@/utils/request'

//查询会员账变记录列表
export function getChangeRecordList(data) {
  return request({
    url: '/system/fund/account/transaction/list',
    method: 'get',
    params:data
  })
}