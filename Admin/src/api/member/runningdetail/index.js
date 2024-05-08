import request from '@/utils/request'

//查询流水稽核历史列表
export function getHistoryList(data) {
  return request({
    url: '/system/fund/transaction/audit/history/list',
    method: 'get',
    params:data
  })
}

//查询流水稽核列表
export function getTransactionList(data) {
  return request({
    url: '/system/fund/transaction/audit/list',
    method: 'get',
    params:data
  })
}

//流水稽核列表-申请一键清零
export function getApplyClearAudit(data) {
  return request({
    url: '/system/fund/transaction/audit/applyClearAudit',
    method: 'post',
    data:data
  })
}

//流水稽核列表-申请调整流水
export function getApplyAudit(data) {
  return request({
    url: '/system/fund/transaction/audit/applyAudit',
    method: 'post',
    data:data
  })
}