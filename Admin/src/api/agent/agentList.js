import request from '@/utils/request'

//查询代理列表
export function getAgentListApi(data) {
  return request({
    url: `/system/agent/agentManage/getAgentList`,
    method: 'post',
    data
  })
}

// 查询下级代理
export function getSubAgentApi(data) {
  console.log(data)
  return request({
    url: `/system//agent/agentManage/getSubProxyList`,
    method: 'post',
    data
  })
}

// 查询下级会员
export function getSubMembertApi(data) {
  return request({
    url: `/system/agent/agentManage/getSubMemberList`,
    method: 'post',
    data
  })
}

// 查询下级活跃会员()
export function getActiveMembertApi(data) {
  return request({
    url: `/system/agent/agentManage/getSubActiveMemberList`,
    method: 'post',
    data
  })
}

// 查询代理详情)
export function getAgentDetailtApi(id) {
  return request({
    url: `/system/agent/agentDetail/getAgentDetail/${id}`,
    method: 'get'
  })
}

// 查询代理标签
export function getAgentTagApi(id) {
  return request({
    url: `/system/agent/tagRef/getAgentTagRefList/${id}`,
    method: 'get'
  })
}

// 查询代理备注列表
export function getActiveAgentRemarkListApi(data) {
  return request({
    url: `/system/agent/agentRemark/getAgentRemarkList`,
    method: 'post',
    data
  })
}
// 添加代理备注
export function addActiveAgentRemarkApi(data) {
  return request({
    url: `/system/agent/agentRemark/add`,
    method: 'post',
    data
  })
}

// 查询代理标签名称列表
export function getAgentTagListApi(data) {
  return request({
    url: `/system/agent/tagRef/getAllTagList`,
    method: 'get'
  })
}
// 添加代理标签
export function addAgentTagApi(data) {
  return request({
    url: `/system/agent/tagRef/add`,
    method: 'post',
    data
  })
}
// 删除代理标签
export function delAgentTagApi(id) {
  return request({
    url: `/system/agent/tagRef/delete/${id}`,
    method: 'delete'
  })
}

// 查询代理财务信息
export function getAgentFundDetailtApi(id) {
  return request({
    url: `/system/agent/agentDetail/getAgentFinanceInfo/${id}`,
    method: 'get'
  })
}

// 查询代理团队信息
export function getAgentTeamInfoApi(id, monthFlag) {
  return request({
    url: `/system/agent/agentDetail/getAgentTeamInfo/${id}/${monthFlag}`,
    method: 'get'
  })
}
// 查询代理登录记录
export function getAgentLoginInfoApi(data) {
  return request({
    url: `/system/agent/agentDetail/getAgentLoginList`,
    method: 'post',
    data
  })
}

// 查询代理上级列表
export function getSuperiorAgentApi(data) {
  return request({
    url: `/system/agent/agentProxy/getSuperiorAgentProxyList?agentName=${data}`,
    method: 'get'
  })
}

// 添加代理
export function addAgentApi(data) {
  return request({
    url: `/system/agent/agentAdd/add`,
    method: 'post',
    data
  })
}

// 查询佣金方案
export function getCommissionPlanApi() {
  return request({
    url: `/system/agent/agentAdd/getCommissionRebateConfigList`,
    method: 'get'
  })
}

// 代理资金调整
export function addAgentAdjustment(data) {
  return request({
    url: `/system/agent/fundAdjust/fundAdjustSave`,
    method: 'post',
    data
  })
}

// 代理资金批量调整
export function addMutiAgentAdjustment(data) {
  return request({
    url: `/system/agent/fundAdjust/batchFundAdjustSave`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 查询钱包余额
export function getWalletBalance(data) {
  return request({
    url: `/system/agent/fundAdjust/getWalletBalance`,
    method: 'post',
    data
  })
}

// 查询信用钱包是否开启
export function getCreditWalletStatusApi(data) {
  return request({
    url: `/system/agent/fundAdjust/getCreditWalletStatus`,
    method: 'post',
    data
  })
}

// 修改代理基本信息
export function editAgentBaseInfoApi(data) {
  return request({
    url: `/system/agent/agentDetail/updateAgentInfo`,
    method: 'post',
    data
  })
}

// 根据代理账号获取代理详细信息
export function getAgentInfoByNameApi(params) {
  return request({
    url: `/system/agent/agentDetail/getAgentDetailByAgentUserName`,
    method: 'get',
    params
  })
}

// 重置支付密码
export function resetAgentPaywordApi(id) {
  return request({
    url: `/system/agent/agentDetail/clearAgentPaymentPassword/${id}`,
    method: 'get'
  })
}
