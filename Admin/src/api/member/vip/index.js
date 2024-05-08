import request from '@/utils/request'

//查询vip等级配置列表
export function getViplevelList(data) {
  return request({
    url: '/system/member/vipLevel/list',
    method: 'get',
    params:data
  })
}

//保存vip等级配置
export function editViplevelList(data) {
  return request({
    url: '/system/member/vipLevel/edit',
    method: 'put',
    data:data
  })
}

//查询vip权益配置列表
export function getViprightsfigList(data) {
  return request({
    url: '/system/vipRights/list',
    method: 'get',
    params:data
  })
}

//保存vip权益配置
export function editViprightsfigList(data) {
  return request({
    url: '/system/vipRights/save',
    method: 'put',
    data:data
  })
}

//修改权益配置开关
export function editViplevelSwitch(data) {
  return request({
    url: '/system/vipRights/update/status',
    method: 'put',
    data:data
  })
}

//查询vip返水配置列表
export function getViprebatefigList(data) {
  return request({
    url: '/system/vipRebate/list',
    method: 'get',
    params:data
  })
}

//保存vip返水配置
export function editViprebatefigList(data) {
  return request({
    url: '/system/vipRebate/save',
    method: 'put',
    data:data
  })
}

//修改返水开关状态权益配置
export function editViprebatefigSwitch(data) {
  return request({
    url: '/system/vipRebate/update/status',
    method: 'put',
    data:data
  })
}

//查询vip返水配置子项列表
export function getViprebatefigItemList(data) {
  return request({
    url: '/system/vipRebate/queryConfigItem/'+data,
    method: 'get'
  })
}

//保存vip返水配置子项
export function editViprebatefigItemList(data) {
  return request({
    url: '/system/vipRebate/saveConfigItem',
    method: 'post',
    data:data
  })
}

//查询会员vip变更列表
export function getViplogList(data) {
  return request({
    url: '/system/member/vipLog/list',
    method: 'get',
    params:data
  })
}

//vip返水提款流水倍数
export function updateRebateMultiple(data) {
  return request({
    url: '/system/vipRebate/updateRebateMultiple',
    method: 'put',
    data:data
  })
}