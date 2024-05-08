// 提款绑定模块 银行卡虚拟币
import service from '@/utils/request'
// 获取支持的银行卡类型列表
export function getBankSupport(data) {
  return service({
    url: '/api/fund/bank/list-support',
    method: 'get',
    data
  })
}

// 已绑定手机号时绑定银行卡
export function getBindBankCard(data) {
  return service({
    url: '/api/user/bankcard/bind',
    method: 'post',
    data
  })
}

// 未绑定手机号时绑定银行卡
export function getBindWithPhone(data) {
  return service({
    url: '/api/user/bankcard/bindWithPhone',
    method: 'post',
    data
  })
}

// 绑卡前检查会员是否绑定手机号
export function getBankCheckMobile(params) {
  return service({
    url: '/api/user/bankcard/check-mobile',
    method: 'get',
    params
  })
}
// 删除银行卡
export function getDeleteBank(id) {
  return service({
    url: `/api/user/bankcard/delete?id=${id}`,
    method: 'delete',
  })
}

// 获取会员的银行卡
export function getBankList(params) {
  return service({
    url: '/api/user/bankcard/list',
    method: 'get',
    params
  })
}

//已绑定手机号时绑定加密货币钱包地址
export function getCryptocyBindAddr(data) {
  return service({
    url: '/api/user/cryptocy/bind',
    method: 'post',
    data
  })
}

//未绑定手机号时绑定加密货币钱包地址
export function getCryptocyBindWithPhone(data) {
  return service({
    url: '/api/user/cryptocy/bindWithPhone',
    method: 'post',
    data
  })
}

// 绑卡前检查会员是否绑定手机号
export function getCryptocyCheckMobile(params) {
  return service({
    url: '/api/user/cryptocy/check-mobile',
    method: 'get',
    params
  })
}
// 删除加密货币地址
export function getCryptocyDelete(id) {
  return service({
    url: `/api/user/cryptocy/delete?id=${id}`,
    method: 'delete'
  })
}
// 获取会员的加密货币钱包地址列表
export function getCryptocyList(currency) {
  return service({
    url: `/api/user/cryptocy/list?currency=${currency}`,
    method: 'get'
  })
}
// 获取支持的加密货币列表
export function getCryptocyListSupport(params) {
  return service({
    url: '/api/user/cryptocy/list/support',
    method: 'get',
    params
  })
}

// 绑定手机号
export function getBindMobile(data) {
  return service({
    url: '/api/member/bind-mobile',
    method: 'put',
    data
  })
}

// 绑定邮箱
export function getBindEmail(data) {
  return service({
    url: '/api/member/bind-email',
    method: 'put',
    data
  })
}

// 修改密码
export function getUpdatePassword(data) {
  return service({
    url: '/api/member/update-password',
    method: 'put',
    data
  })
}

// 修改会员头像
export function getUpdateAvatar(data) {
  return service({
    url: `/api/member/update-avatar`,
    method: 'put',
    data
  })
}
// 修改会员生日
export function getUpdatebBirthday(data) {
  return service({
    url: `/api/member/update-birthday`,
    method: 'put',
    data
  })
}
// 修改会员昵称
export function getUpdateNickname(data) {
  return service({
    url: `/api/member/update-nickname`,
    method: 'put',
    data
  })
}

// 修改会员性别
export function getUpdateSex(data) {
  return service({
    url: `/api/member/update-sex`,
    method: 'put',
    data
  })
}


// 更新会员信息
export function updateMemberInfo(data) {
  return service({
    url: `/api/member/updateMemberInfo`,
    method: 'put',
    data
  })
}

// 查询平台可用的银行列表（C2C提现）
export function getBankListC2C(data) {
  return service({
    url: '/api/fund/bank/list/c2c',
    method: 'get',
    data
  })
}