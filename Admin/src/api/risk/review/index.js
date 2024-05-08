import request from '@/utils/request'

//提现风控审核-查询风险类型列表
export function getRiskTypeList(data) {
  return request({
    url: `/system/risk/withdrawl/order/selectRiskRuleSettingList`,
    method: 'post',
    data:data
  })
}

//提现风控审核-查询当前用户接单开关（在线状态） 在线状态 （0.离线（关） 1.在线(开)）
export function getCurrentUserSwitch(data) {
  return request({
    url: '/system/risk/withdrawl/order/riskUserStatus/'+data,
    method: 'get'
  })
}

//提现风控审核-修改当前用户接单开关（在线状态） 在线状态 （0.离线（关） 1.在线(开)）
export function updateCurrentUserSwitch(data,status) {
  return request({
    url: `/system/risk/withdrawl/order/updateRiskUserStatus/${data}/${status}`,
    method: 'post'
  })
}

//提现风控审核-查询提款订单列表
export function getWithdrawlOrderList(data) {
  return request({
    url: '/system/risk/withdrawl/order/list',
    method: 'get',
    params:data
  })
}

//提现风控审核-批量审核订单
export function getMulReviewOrder(data) {
  return request({
    url: `/system/risk/withdrawl/order/mutReview`,
    method: 'post',
    data:data
  })
}

//提现风控审核-领取-派发
export function dispatchOrder(data) {
  return request({
    url: `/system/risk/withdrawl/order/dispatch`,
    method: 'post',
    data:data
  })
}

//提现风控审核-查询提款订单详情
export function getWithdrawlOrderUserDetail(data) {
  return request({
    url: '/system/risk/withdrawl/order/orderUserDetail/'+data,
    method: 'get'
  })
}

//提现风控审核-审核查看-基础设置-充提概况
export function getOrderDepWidDetail(data) {
  return request({
    url: '/system/risk/withdrawl/order/orderDepWidDetail',
    method: 'post',
    data:data
  })
}

//提现风控审核-审核查看-基础设置-充提概况
export function getOrderWalletDetail(data) {
  return request({
    url: '/system/risk/withdrawl/order/orderWalletDetail',
    method: 'post',
    data:data
  })
}

//风控管理-风控审核-高额盈利统计-条件设置列表
export function getHighProfitStaticList(data) {
  return request({
    url: '/system/risk/highProfitStatic/ConfigInfoList',
    method: 'get',
    params:data
  })
}

//风控管理-风控审核-高额盈利统计-件设置编辑
export function updateHighProfitStaticList(data) {
  return request({
    url: '/system/risk/highProfitStatic/ConfigInfoUpdate',
    method: 'post',
    data:data
  })
}

//风控管理-风控审核-高额盈利列表
export function getHighProfitMemberList(data) {
  return request({
    url: '/system/risk/highProfitStatic/list',
    method: 'get',
    params:data
  })
}

//风控管理-风控审核-高额盈利查询场馆类型和游戏类型
export function getLobbycodeAndGameList(data) {
  return request({
    url: `/system/risk/highProfitStatic/typeList/${data}`,
    method: 'get'
  })
}

//风控管理-风控审核-体育相似投注-相似注单设置
export function getSportsSimilarBettingList(data) {
  return request({
    url: '/system/risk/sportsSimilarBetting/ConfigInfoList',
    method: 'get',
    params:data
  })
}

//风控管理-风控审核-体育相似投注-相似注单设置编辑
export function updategetSport(data) {
  return request({
    url: '/system/risk/sportsSimilarBetting/ConfigInfoUpdate',
    method: 'post',
    data:data
  })
}

//风控管理-风控审核-体育相似投注-相似注单列表
export function getRiskSimilarBettingList(data) {
  return request({
    url: '/system/risk/sportsSimilarBetting/list',
    method: 'get',
    params:data
  })
}

//风控管理-风控审核-体育相似投注-相似注单会员列表 入参：注单号
export function getSimilarUserOrderList(data) {
  return request({
    url: '/system/risk/sportsSimilarBetting/similarUserOrderList',
    method: 'get',
    params:data
  })
}

//风控管理-风控审核-提现风控审核列表-修改会员备注
export function updateMemberRemark(data) {
  return request({
    url: '/system/risk/withdrawl/order/updateMemberRemark',
    method: 'post',
    data:data
  })
}

//风控管理-查询风控未审核数量
export function getUnAuditCount(data) {
  return request({
    url: '/system/risk/withdrawl/order/notAuditCount',
    method: 'get',
    params:data
  })
}