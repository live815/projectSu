import request from '@/utils/request'
//查询所有VIP等级
export function getVIPList(data) {
  return request({
    url: '/system/member/vipLevel/selectAll',
    method: 'get',
    params:data
  })
}

//查询所有财务等级
export function getTierList(data) {
  return request({
    url: '/system/fund/tier/selectAll',
    method: 'get',
    params:data
  })
}

//查询所有出款通道
export function getMchchannelList(data) {
  return request({
    url: '/system/fund/mch-channel/withdraw/selectAll',
    method: 'get',
    params:data
  })
}

//查询所有入款通道类型(资金记录-->充值记录)
export function getChannelList(data) {
  return request({
    url: '/system/fund/channel/type/selectAll',
    method: 'get',
    params:data
  })
}

//查询所有入款商户信息下拉(资金记录-->充值记录)
export function getDpMchinfoList(data) {
  return request({
    url: '/system/fund/mch-info/dp-options',
    method: 'get',
    params:data
  })
}

//查询所有出款通道商户列表下拉框
export function getMchchannelWithdrawlList(data) {
  return request({
    url: '/system/fund/mch-info/wd-options',
    method: 'get',
    params:data
  })
}