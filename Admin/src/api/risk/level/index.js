import request from '@/utils/request'

//新增风控层级
export function addRiskHierarchy(data) {
  return request({
    url: '/system/risk/layer/save',
    method: 'post',
    data:data
  })
}

//删除风控层级
export function delRiskHierarchy(data) {
  return request({
    url: '/system/risk/layer/delete/'+data,
    method: 'delete'
  })
}

//修改风控层级
export function editRiskHierarchy(data) {
  return request({
    url: '/system/risk/layer/update',
    method: 'put',
    data:data
  })
}

//获取风控层级详细信息
export function getRiskHierarchyInfo(data) {
  return request({
    url: '/system/risk/layer/getInfo/'+data,
    method: 'get',
  })
}

//查询风控层列表
export function getRiskHierarchyList(data) {
  return request({
    url: '/system/risk/layer/list',
    method: 'post',
    data:data
  })
}

//分页查询风控与会员关系列表
export function getRiskHierarchyUserNameList(data) {
  return request({
    url: '/system/risk/member/relation/list',
    method: 'post',
    data:data
  })
}

//根据层级类型查询风控层级或者财务层级
export function getRiskFinancalList(data) {
  return request({
    url: '/system/risk/layer/list2/'+data,
    method: 'get'
  })
}

//删除风控策略配置
export function delRiskPloy(data) {
  return request({
    url: '/system/risk/ploy/delete/'+data,
    method: 'delete'
  })
}

//获取风控策略配置详细信息
export function getRiskPloyInfo(data) {
  return request({
    url: '/system/risk/ploy/getInfo/'+data,
    method: 'get',
  })
}

//分页查询风控策略配置列表
export function getRiskPloyList(data) {
  return request({
    url: '/system/risk/ploy/list',
    method: 'post',
    data:data
  })
}

//新增风控策略配置
export function addRiskPloy(data) {
  return request({
    url: '/system/risk/ploy/save',
    method: 'post',
    data:data
  })
}

//修改风控策略配置
export function editRiskPloy(data) {
  return request({
    url: '/system/risk/ploy/update',
    method: 'put',
    data:data
  })
}

//根据代理名模糊搜索
export function agentSearch(data) {
  return request({
    url: '/system/agent/agentManage/list',
    method: 'post',
    data:data
  })
}