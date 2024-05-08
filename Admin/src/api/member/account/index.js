import request from '@/utils/request'

//查询会员账号修改审核（一审）
export function getReviewList(data) {
  return request({
    url: '/system/member/backendlog/list',
    method: 'get',
    params:data
  })
}

//查询会员账号修改审核（二审）
export function getSecondReviewList(data) {
  return request({
    url: '/system/member/backendlog/listSecond',
    method: 'get',
    params:data
  })
}

//查询会员账号修改审核（结单查看）
export function getFinalReviewList(data) {
  return request({
    url: '/system/member/backendlog/listFinal',
    method: 'get',
    params:data
  })
}

//会员审核单号审核状态修改(会员一审状态修改)
export function editState(data) {
  return request({
    url: '/system/member/backendlog/editState',
    method: 'put',
    data:data
  })
}

//会员审核单号审核状态修改(会员一审状态修改)
export function editStateSecond(data) {
  return request({
    url: '/system/member/backendlog/editStateSecond',
    method: 'put',
    data:data
  })
}

//获取会员后台操作记录详细信息
export function getInfo(data) {
  return request({
    url: '/system/member/backendlog/getInfo/'+data,
    method: 'get'
  })
}

//查询会员账号变更记录
export function changeMemberRecordList(data) {
  return request({
    url: '/system/member/backendlog/changeList',
    method: 'get',
    params:data
  })
}

//查询会员账号详情变更后端操作项目类型集合
export function getBackendLogTypes(data) {
  return request({
    url: '/system/member/backendlog/queryBackendLogTypes',
    method: 'get',
    params:data
  })
}

//查询会员账号详情变更前端操作项目类型集合
export function getWebLogTypes(data) {
  return request({
    url: '/system/member/backendlog/queryWebLogTypes',
    method: 'get',
    params:data
  })
}
