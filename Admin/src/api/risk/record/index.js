import request from '@/utils/request'

//风险预警记录条件配置列表
export function getConfigInfoList(data) {
  return request({
    url: '/system/risk/riskWarningRecord/ConfigInfoList',
    method: 'get',
    params:data
  })
}

//风险预警记录条件配置列表编辑
export function editConfigInfoUpdate(data) {
  return request({
    url: '/system/risk/riskWarningRecord/ConfigInfoUpdate',
    method: 'post',
    data:data
  })
}

//风险预警记录列表
export function getWarningRecordList(data) {
  return request({
    url: '/system/risk/riskWarningRecord/list',
    method: 'get',
    params:data
  })
}

//风险预警清空
export function clearWarningRecord(data) {
  return request({
    url: '/system/risk/riskWarningRecord/clear/'+data,
    method: 'post'
  })
}

//查询风控层级调整记录列表
export function adjustRecordList(data) {
  return request({
    url: '/system/layer/adjust/record/list',
    method: 'post',
    data:data
  })
}

//查询风控策略与用户关系列表
export function memberRelationList(data) {
  return request({
    url: '/system/ploy/member/relation/list',
    method: 'post',
    data:data
  })
}

//查询黑名单群组调整记录列表
export function adjustBlackRecordList(data) {
  return request({
    url: '/system/blacklist/adjust/record/list',
    method: 'post',
    data:data
  })
}

//查询风控策略全量列表（下拉框）
export function getPloyList(data) {
  return request({
    url: '/system/risk/ploy/allList',
    method: 'get',
    params:data
  })
}

//查询风控记录-风险预警记录-分数详情
export function getScoreDetail(data) {
  return request({
    url: '/system/risk/riskWarningRecord/scoreDetail/'+data,
    method: 'get'
  })
}