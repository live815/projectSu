import request from '@/utils/request'

//查询代理转账审核列表
export function getQueryTransferListApi(data) {
  return request({
    url: `/system/agent/agentTransferAudit/getAgentTransferAuditList`,
    method: 'post',
    data
  })
}

//代理转账一审审核通过或拒绝
export function getFirstPassOrRejectionApi(data) {
  return request({
    url: `/system/agent/agentTransferAudit/firstPassOrRejection`,
    method: 'post',
    data
  })
}

//代理转账二审审核通过或拒绝
export function getSecondPassOrRejectionApi(data) {
  return request({
    url: `/system/agent/agentTransferAudit/secondPassOrRejection`,
    method: 'post',
    data
  })
}

//保存代理转账
export function getAgentTransferSaveApi(data) {
  return request({
    url: `/system/agent/agentTransferAudit/agentTransferSave`,
    method: 'post',
    data
  })
}
