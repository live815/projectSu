import request from '@/utils/request'

//风控审核设置-自动审核规则
export function getBasicRules(data) {
  return request({
    url: '/system/api/risk/plan/getBasicRules',
    method: 'get',
    params:data
  })
}
//查询风控审核设置列表
export function getConfigList(data) {
  return request({
    url: '/system/risk/config/list',
    method: 'post',
    data:data
  })
}

//修改风控审核设置
export function eidtConfigList(data) {
  return request({
    url: '/system/risk/config/update',
    method: 'put',
    data:data
  })
}

//新增风控公共配置--快捷理由
export function addQuickReason(data) {
  return request({
    url: '/system/risk/config/save',
    method: 'post',
    data:data
  })
}

//新增风控审核设置
export function addConfigList(data) {
  return request({
    url: '/system/risk/config/save',
    method: 'post',
    data:data
  })
}

//删除风控审核设置
export function deleteConfigList(data) {
  return request({
    url: '/system/risk/config/delete/'+data,
    method: 'delete'
  })
}

//查询风控审核接单人员列表
export function getReviewPersonList(data) {
  return request({
    url: '/system/risk/review/person/list',
    method: 'post',
    data:data
  })
}

//查询风控审核接单人员详情
export function getReviewPersonInfo(data) {
  return request({
    url: '/system/risk/review/person/getInfo/'+data,
    method: 'get'
  })
}

//删除风控审核接单人员
export function deleteReviewPerson(data) {
  return request({
    url: '/system/risk/review/person/delete/'+data,
    method: 'delete'
  })
}

//新增风控审核接单人员
export function addReviewPerson(data) {
  return request({
    url: '/system/risk/review/person/save',
    method: 'post',
    data:data
  })
}

//新增风控审核接单人员
export function editReviewPerson(data) {
  return request({
    url: '/system/risk/review/person/update',
    method: 'put',
    data:data
  })
}

//风控方案设置-有效风控方案规则
export function queryValidList(data) {
  return request({
    url: '/system/api/risk/plan/validList',
    method: 'get',
    params:data
  })
}

//查询黑名单信息列表
export function getBlackList(data) {
  return request({
    url: '/system/risk/blacklist/list',
    method: 'post',
    data:data
  })
}

//查询黑名单信息列表(全量)
export function getBlackallList(data) {
  return request({
    url: '/system/risk/blacklist/allList',
    method: 'post',
    data:data
  })
}

//删除黑名单信息（单条）
export function deleteBlackSingle(data) {
  return request({
    url: '/system/risk/blacklist/delete/'+data,
    method: 'delete'
  })
}

//删除黑名单信息（批量）
export function deleteBlackMulti(data) {
  return request({
    url: '/system/risk/blacklist/deleteBatch',
    method: 'post',
    data:data
  })
}

//获取黑名单信息详细信息
export function getBlackInfo(data) {
  return request({
    url: '/system/risk/blacklist/getInfo/'+data,
    method: 'get'
  })
}

//新增黑名单信息
export function addBlack(data) {
  return request({
    url: '/system/risk/blacklist/save',
    method: 'post',
    data:data
  })
}

//修改黑名单信息
export function editBlack(data) {
  return request({
    url: '/system/risk/blacklist/update',
    method: 'put',
    data:data
  })
}

//批量调整黑名单信息列表
export function changeBatchBlack(data) {
  return request({
    url: '/system/risk/blacklist/changeBatch',
    method: 'post',
    data:data
  })
}

//查询黑名单群组列表（下拉框）
export function getBlackGroupList(data) {
  return request({
    url: '/system/risk/blacklist/group/allList',
    method: 'post',
    data:data
  })
}

//查询黑名单群组列表
export function getBlackGroupListTable(data) {
  return request({
    url: '/system/risk/blacklist/group/list',
    method: 'post',
    data:data
  })
}

//删除黑名单群组
export function deleteBlackGroup(data) {
  return request({
    url: '/system/risk/blacklist/group/delete/'+data,
    method: 'delete'
  })
}

//获取黑名单群组详细信息
export function getBlackGroupInfo(data) {
  return request({
    url: '/system/risk/blacklist/group/getInfo/'+data,
    method: 'get'
  })
}

//新增黑名单群组
export function addBlackGroup(data) {
  return request({
    url: '/system/risk/blacklist/group/save',
    method: 'post',
    data:data
  })
}

//修改黑名单群组
export function editBlackGroup(data) {
  return request({
    url: '/system/risk/blacklist/group/update',
    method: 'put',
    data:data
  })
}

//风控方案设置-新增
export function addRiskPlan(data) {
  return request({
    url: '/system/api/risk/plan/add',
    method: 'post',
    data:data
  })
}

//风控方案设置-删除
export function deleteRiskPlan(data) {
  return request({
    url: '/system/api/risk/plan/delete/'+data,
    method: 'delete'
  })
}

//风控方案设置-修改状态
export function editStatus(data) {
  return request({
    url: '/system/api/risk/plan/updateStatus',
    method: 'post',
    data:data
  })
}

//风控方案设置-修改
export function editRiskPlan(data) {
  return request({
    url: '/system/api/risk/plan/edit',
    method: 'post',
    data:data
  })
}

//风控方案设置-详细信息
export function getRiskPlanInfo(data) {
  return request({
    url: '/system/api/risk/plan/getInfo/'+data,
    method: 'get'
  })
}

//风控方案设置-列表
export function getRiskPlanList(data) {
  return request({
    url: '/system/api/risk/plan/list',
    method: 'post',
    data:data
  })
}

//风控方案设置-查询可用的风控层级
export function getValidLevel(data) {
  return request({
    url: '/system/api/risk/plan/validLayerForPlan',
    method: 'post',
    data:data
  })
}

//新版黑名单-查询黑名单信息列表
export function getBlacklist(data) {
  return request({
    url: '/system/risk/blacklist/list',
    method: 'post',
    data:data
  })
}

//新版黑名单-查询黑名单信息详细信息
export function getBlacklistInfo(data) {
  return request({
    url: `/system/risk/blacklist/getInfo/${data}`,
    method: 'get'
  })
}

//新版黑名单-删除黑名单信息
export function deleteBlacklist(data) {
  return request({
    url: '/system/risk/blacklist/delete/'+data,
    method: 'delete'
  })
}

//新版黑名单-批量删除黑名单信息
export function deleteBlacklistBatch(data) {
  return request({
    url: '/system/risk/blacklist/deleteBatch',
    method: 'post',
    data:data
  })
}

//新版黑名单-新增黑名单信息
export function addBlacklist(data) {
  return request({
    url: '/system/risk/blacklist/save',
    method: 'post',
    data:data
  })
}

//新版黑名单-修改黑名单信息
export function editBlacklist(data) {
  return request({
    url: '/system/risk/blacklist/update',
    method: 'put',
    data:data
  })
}
//查询风控审核接单人员列表全量
export function getReviewPersonListAll(data) {
  return request({
    url: '/system/risk/review/person/allList',
    method: 'post',
    data:data
  })
}

//新版黑名单调整记录-分页查询黑名单调整列表
export function getBlackAdjustlist(data) {
  return request({
    url: '/system/risk/blacklist/adjust/list',
    method: 'post',
    data:data
  })
}