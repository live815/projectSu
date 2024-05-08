// 提现模块
import service from '@/utils/request'

//查询会员中心钱包的余额
export function getCenterWalletBal() {
  return service({
    url: '/api/fund/wallet/member/center-wallet-bal',
    method: 'get',
  })
}

//拉取会员可用的提现通道列表
export function getWdChannelList() {
  return service({
    url: '/api/fund/wd-channel/list',
    method: 'get',
  })
}

// 法币提现下单
export function getWithdrawOrder(data) {
  return service({
    url: '/api/fund/withdraw/order',
    method: 'post',
    data
  })
}

// 虚拟币提现下单
export function getWithdrawUsdtOrder(data) {
  return service({
    url: '/api/fund/withdraw/usdtOrder',
    method: 'post',
    data
  })
}


// 查询提现订单状态
export function getWithdrawOrderNoStatus(orderNo) {
  return service({
    url: `/api/fund/withdraw/get-order-status/${orderNo}`,
    method: 'get'
  })
}

// 查询会员最近正在进行中的提现订单
export function getWithdrawOrderNo(data) {
  return service({
    url: `/api/fund/withdraw/getOrder`,
    method: 'post',
    data
  })
}

// 拉取提现页面提示文案
export function getWithdrawWdContent() {
  return service({
    url: `/api/fund/wd-channel/content`,
    method: 'get',
  })
}

// 拉取大额提现规则信息
export function getLargeWithdrawLimit() {
  return service({
    url: `/api/fund/wd-channel/largeWithdrawLimit/get`,
    method: 'get',
  })
}

// 提现拆单的子单进行状态确认-确认收款
export function getWithdrawConfirmOrder(data) {
  return service({
    url: `/api/fund/withdraw/confirmOrder`,
    method: 'post',
    data
  })
}

// EB币提现下单
export function getWithdrawEbpayOrder(data) {
  return service({
    url: '/api/fund/withdraw/ebpay/order',
    method: 'post',
    data
  })
}
