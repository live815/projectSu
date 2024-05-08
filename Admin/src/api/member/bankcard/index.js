import request from '@/utils/request'

//查询银行卡列表
export function getBankcardList(data) {
  return request({
    url: '/system/member/bankcard/list',
    method: 'get',
    params:data
  })
}

//新增银行卡
export function addBankcard(data) {
  return request({
    url: '/system/member/bankcard/add',
    method: 'post',
    data
  })
}

//删除银行卡
export function delBankcard(data) {
  return request({
    url: '/system/member/bankcard/delete',
    method: 'post',
    data:data
  })
}

//修改银行卡
export function editBankcard(data) {
  return request({
    url: '/system/member/bankcard/edit',
    method: 'put',
    data
  })
}

//查询银行卡详细信息
export function getBankcardInfo(data) {
  return request({
    url: '/system/member/bankcard/getInfo/'+data,
    method: 'get'
  })
}

//启用禁用会员银行卡
export function updateBankcardStatus(data) {
  return request({
    url: '/system/member/bankcard/status',
    method: 'put',
    data:data
  })
}

//查询会员银行卡操作记录列表
export function getBankcardLog(data) {
  return request({
    url: '/system/member/bankcardlog/list',
    method: 'get',
    params:data
  })
}

//查询会员虚拟币账号列表
export function getCryptocyList(data) {
  return request({
    url: '/system/member/cryptocy/list',
    method: 'get',
    params:data
  })
}

//新增会员虚拟币账号
export function addCryptocy(data) {
  return request({
    url: '/system/member/cryptocy/add',
    method: 'post',
    data
  })
}

//删除会员虚拟币账号
export function delCryptocy(data) {
  return request({
    url: '/system/member/cryptocy/remove',
    method: 'post',
    data:data
  })
}

//修改会员虚拟币账号
export function editCryptocy(data) {
  return request({
    url: '/system/member/cryptocy',
    method: 'put',
    data
  })
}

//查询会员虚拟币账号详细信息
export function getCryptocyInfo(data) {
  return request({
    url: '/system/member/cryptocy/getInfo/'+data,
    method: 'get'
  })
}

//启用禁用会员虚拟货币账号
export function updateCurrencyStatus(data) {
  return request({
    url: '/system/member/cryptocy/status',
    method: 'put',
    data:data
  })
}

//查询会员虚拟币账号操作记录列表
export function getCryptocyLog(data) {
  return request({
    url: '/system/member/cryptolog/list',
    method: 'get',
    params:data
  })
}

//查询会员EB币钱包列表
export function getEBCryptocyList(data) {
  return request({
    url: '/system/member/cryptocy/eb/list',
    method: 'get',
    params:data
  })
}

//新增会员EB币钱包
export function addEBCryptocy(data) {
  return request({
    url: '/system/member/cryptocy/eb/add',
    method: 'post',
    data
  })
}

//删除会员EB币钱包
export function delEBCryptocy(data) {
  return request({
    url: '/system/member/cryptocy/eb/remove',
    method: 'post',
    data:data
  })
}

//启用禁用会员虚拟货币账号
export function updateEBStatus(data) {
  return request({
    url: '/system/member/cryptocy/eb/status',
    method: 'put',
    data:data
  })
}

//查询员EB币钱包操作记录列表
export function getEBCryptocyLog(data) {
  return request({
    url: '/system/member/cryptolog/eb/list',
    method: 'get',
    params:data
  })
}