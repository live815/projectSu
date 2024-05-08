// 充值模块
import service from '@/utils/request'

//拉取会员可用的充值通道列表
export function getBankSupport() {
  return service({
    url: '/api/fund/dp-channel/list',
    method: 'get'
  })
}

// 银行卡模块充值
export function getBankOrder(data) {
  return service({
    url: '/api/fund/deposit/order',
    method: 'post',
    data
  })
}

// 上传图片
export function getImageUpload(data) {
  return service({
    url: '/api/file/fund/image/upload',
    method: 'post',
    data
  })
}

// 上传支付凭证
export function getBankUpload(data) {
  return service({
    url: '/api/fund/deposit/upload',
    method: 'post',
    data
  })
}

// 用户撤销充值订单
export function getCancelOrder(data) {
  return service({
    url: '/api/fund/deposit/cancel-order',
    method: 'put',
    data
  })
}

// 查询充值订单状态
export function getOrderNoStatus(orderNo) {
  return service({
    url: `/api/fund/deposit/get-order-status/${orderNo}`,
    method: 'get'
  })
}

// 查询充值订单
export function getOrderNo(data) {
  return service({
    url: `/api/fund/deposit/getOrder`,
    method: 'post',
    data
  })
}

// 拉取充值通道类型页面提示文案
export function getOrderText(channelTypeId) {
  return service({
    url: `/api/fund/dp-channel/content/${channelTypeId}`,
    method: 'get'
  })
}


// 虚拟币充值
export function getVirtualOrder(data) {
  return service({
    url: '/api/fund/deposit/usdtOrder',
    method: 'post',
    data
  })
}

// 获取USDT虚拟币的参考汇率
export function getVirtualGetRate(rateType,fiatCurrency) {
  return service({
    url: `/api/fund/crypto/getRate/usdt/${rateType}/${fiatCurrency}`,
    method: 'get',
  })
}

// C2C银行转账充值
export function getc2cOrder(data) {
  return service({
    url: '/api/fund/deposit/c2cOrder',
    method: 'post',
    data
  })
}

// 查询用户充值当日已加送额度
export function getChannelDepositGift(params) {
  return service({
    url: `/api/fund/deposit/getChannelDepositGift`,
    method: 'get',
    params
  })
}