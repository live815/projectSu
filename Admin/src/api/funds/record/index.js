import request from '@/utils/request'

//创建订单
export function addDepositOrder(data) {
  return request({
    url: '/system/fund/deposit/order/add',
    method: 'post',
    data:data
  })
}

//充值补单审核
export function getApprove(data) {
  return request({
    url: '/system/fund/deposit/order/approve',
    method: 'put',
    data:data
  })
}

//导出充值订单列表
export function exportOrder(data) {
  return request({
    url: '/system/fund/deposit/order/export',
    method: 'post',
    data:data
  })
}

//获取充值订单附件详情
export function getAttachDetail(data) {
  return request({
    url: '/system/fund/deposit/order/getAttach/detail',
    method: 'post',
    data:data
  })
}

//获取充值订单详细信息
export function getOrderInfo(data) {
  return request({
    url: '/system/fund/deposit/order/getInfo/'+data,
    method: 'get'
  })
}

//根据关联单号查询订单信息
export function getInfoByRelno(data) {
  return request({
    url: '/system/fund/deposit/order/getInfoByRelno/'+data,
    method: 'get'
  })
}

//查询充值订单列表
export function getOrderList(data) {
  return request({
    url: '/system/fund/deposit/order/list',
    method: 'get',
    params:data
  })
}

//查询充值订单日志列表
export function getDepositList(data) {
  return request({
    url: '/system/fund/deposit/order/log/list',
    method: 'get',
    params:data
  })
}

//充值补单
export function getReorder(data) {
  return request({
    url: '/system/fund/deposit/order/reorder',
    method: 'put',
    data:data
  })
}

//提款审核
export function withdrawlApprove(data) {
  return request({
    url: '/system/fund/withdrawl/order/approve',
    method: 'put',
    data:data
  })
}

//强制成功
export function forcedSuccess(data) {
  return request({
    url: '/system/fund/withdrawl/order/forced-success',
    method: 'put',
    data:data
  })
}

//获取提款订单详细信息
export function getWithdrawlOrderInfo(data) {
  return request({
    url: '/system/fund/withdrawl/order/getInfo/'+data,
    method: 'get'
  })
}

//查询提款订单列表
export function getWithdrawlOrderList(data) {
  return request({
    url: '/system/fund/withdrawl/order/list',
    method: 'get',
    params:data
  })
}

//查询提款订单日志列表
export function getOrderLogInfo(data) {
  return request({
    url: '/system/fund/withdrawl/order/log/list',
    method: 'get',
    params:data
  })
}

//人工出款
export function manualPayout(data) {
  return request({
    url: '/system/fund/withdrawl/order/manual-payout',
    method: 'put',
    data:data
  })
}

//出款退回
export function paymentRefund(data) {
  return request({
    url: '/system/fund/withdrawl/order/payment-refund',
    method: 'put',
    data:data
  })
}

//拒绝出款
export function paymentReject(data) {
  return request({
    url: '/system/fund/withdrawl/order/payment-reject',
    method: 'put',
    data:data
  })
}

//三方出款
export function thirdPayout(data) {
  return request({
    url: '/system/fund/withdrawl/order/third-payout',
    method: 'put',
    data:data
  })
}

//立即出款
export function immedPayout(data) {
  return request({
    url: '/system/fund/withdrawl/order/immed-payout',
    method: 'put',
    data:data
  })
}

//提现记录-查询拆单的母单与子单的关联关系信息
export function getSplitOrderInfo(data) {
  return request({
    url: '/system/fund/withdrawl/order/getSplitOrderInfo/'+data,
    method: 'get'
  })
}

//查询存款加送记录列表
export function getDepositBonusList(data) {
  return request({
    url: '/system/fund/deposit/bonus/record/list',
    method: 'get',
    params:data
  })
}

//获取预约限时配置数据（资金记录-预约加送记录）
export function getAppHoursList(data) {
  return request({
    url: '/system/fund/appmentwd/getAppHours',
    method: 'get',
    params:data
  })
}

//查询存款加送记录列表/fund/deposit/anomal/log/list
export function getWithdrawlBonusList(data) {
  return request({
    url: '/system/fund/withdrawl/bonus/record/list',
    method: 'get',
    params:data
  })
}

//查询充值异常日志列表(充值异常记录--异常记录)
export function getAnomalLogList(data) {
  return request({
    url: '/system/fund/deposit/anomal/log/list',
    method: 'get',
    params:data
  })
}

//查询充值异常配置(充值异常记录--异常设置)
export function getDpExceConfig(data) {
  return request({
    url: '/system/fund/deposit/anomal/getDpExceConfig',
    method: 'get',
    params:data
  })
}

//修改充值异常配置(充值异常记录--异常设置)
export function editDpExceConfig(data) {
  return request({
    url: '/system/fund/deposit/anomal/dpExceConfig/edit',
    method: 'put',
    data:data
  })
}

//查询充值通道关闭日志列表(充值异常记录--异常设置)
export function getChannelCloseList(data) {
  return request({
    url: '/system/fund/deposit/channel/close/log/list',
    method: 'get',
    params:data
  })
}

//按时间查询充值通道统计列表
export function getDepositListByDatetime(data) {
  return request({
    url: '/system/fund/channel/statistical/depositByDatetime/list',
    method: 'post',
    data:data
  })
}

//按时间查询提现通道统计列表
export function getWithdrawlListByDatetime(data) {
  return request({
    url: '/system/fund/channel/statistical/withdrawByDatetime/list',
    method: 'post',
    data:data
  })
}

//查询充值订单列表
export function getTotalList(data) {
  return request({
    url: '/system/fund/deposit/order/listForStatistic',
    method: 'get',
    params:data
  })
}