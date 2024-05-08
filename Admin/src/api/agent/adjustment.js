import request from "@/utils/request";

// 资金调整一审审核通过或拒绝
export function fundingFirstReviewApi(data) {
  return request({
    url: `/system/agent/fundAdjustAudit/firstPassOrRejection`,
    method: "post",
    data,
  });
}

// 查询资金调整审核列表
export function queryFundAdjustmentApi(data) {
  return request({
    url: `/system/agent/fundAdjustAudit/getFundAdjustAuditList`,
    method: "post",
    data,
  });
}
// 资金调整二审审核通过或拒绝
export function fundSecondReviewApi(data) {
  return request({
    url: `/system/agent/fundAdjustAudit/secondPassOrRejection`,
    method: "post",
    data,
  });
}
// 查询调整总金额
export function queryTotalAmountApi(data) {
  return request({
    url: `/system/agent/fundAdjustAudit/getAdjustMoneyTotal`,
    method: "post",
    data,
  });
}

// 查询代理信息调整审核列表
export function getAgentInfoAdjustAuditListApi(data) {
  return request({
    url: `/system/agent/agentInfoAdjustAudit/getAgentInfoAdjustAuditList`,
    method: "post",
    data,
  });
}
// 代理信息调整审核通过或拒绝
export function proxyInformationPassedOrRejectedApi(data) {
  return request({
    url: `/system/agent/agentInfoAdjustAudit/auditPassOrRejection`,
    method: "post",
    data,
  });
}
// 代理提现风控获取列表
export function getAgentWithdrawListApi(data) {
  return request({
    url: `/system/agent/withdrawalAudit/getWithdrawalAuditList`,
    method: "post",
    data,
  });
}

// 查询提款详情
export function getAgentWithdraDetailApi(id) {
  return request({
    url: `/system/agent/withdrawalAudit/getWithdrawalAuditDetail/${id}`,
    method: "get",
  });
}

// 提现审核通过或拒绝或搁置
export function auditPassOrRejectionOrShuntApi(data) {
  return request({
    url: `/system/agent/withdrawalAudit/auditPassOrRejectionOrShunt`,
    method: "post",
    data,
  });
}

// 查询提款记录列表
export function getWithdrawRecordApi(data) {
  return request({
    url: `/system/agent/withdrawalRecord/getWithdrawalRecordList`,
    method: "post",
    data,
  });
}
