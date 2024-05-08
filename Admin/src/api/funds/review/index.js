import request from '@/utils/request'

//充值审核(财务审核--->充值补单审核)
export function approveOrder(data) {
  return request({
    url: '/system/fund/deposit/order/approve',
    method: 'put',
    data:data
  })
}

//提款审核(财务审核--->财务提款审核)
export function approveOrderWithdrawl(data) {
  return request({
    url: '/system/fund/withdrawl/order/approve',
    method: 'put',
    data:data
  })
}

//分页查询资金调整待一审的订单列表(财务审核--->资金调整审核(待一审))
export function getFirstReviewList(data) {
  return request({
    url: '/system/fund/adjustment/first-review/list',
    method: 'get',
    params:data
  })
}

//单个审核(财务审核--->资金调整审核(待一审))
export function updateSingleReview(data) {
  return request({
    url: '/system/fund/adjustment/first-review/single-review',
    method: 'post',
    data:data
  })
}

//批量审核(财务审核--->资金调整审核(待一审))
export function updateMultipleReview(data) {
  return request({
    url: '/system/fund/adjustment/first-review/batch-review',
    method: 'post',
    data:data
  })
}

//分页查询资金调整待二审的订单列表(财务审核--->资金调整审核(待二审))
export function getSecondReviewList(data) {
  return request({
    url: '/system/fund/adjustment/final-review/list',
    method: 'get',
    params:data
  })
}

//单个审核(财务审核--->资金调整审核(待二审))
export function updateSingleSecondReview(data) {
  return request({
    url: '/system/fund/adjustment/final-review/single-review',
    method: 'post',
    data:data
  })
}

//批量审核(财务审核--->资金调整审核(待二审))
export function updateMultipleSecondReview(data) {
  return request({
    url: '/system/fund/adjustment/final-review/batch-review',
    method: 'post',
    data:data
  })
}

//已审核列表(财务审核--->已审核)
export function getFinishReviewList(data) {
  return request({
    url: '/system/fund/adjustment/finish-review/list',
    method: 'get',
    params:data
  })
}

//查询资金待审核订单数量
export function getReviewOrderNumt(data) {
  return request({
    url: '/system/fund/message/list/reviewOrderNum',
    method: 'get',
    params:data
  })
}