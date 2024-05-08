import request from "@/utils/request";

//代理转代申请
export function getTransferReviewApi(data) {
  return request({
    url: `/system/agent/agentTransformAudit/agentTransformAuditSave`,
    method: "post",
    data,
  });
}

// 查询会员上级代理
export function getAgentSuperiorApi(data) {
  return request({
    url: `/system/agent/agentTransformAudit/getMemberSuperiorAgentName`,
    method: "post",
    data,
  });
}

//代理转代一审审核通过或拒绝
export function getPassOrRejectInFirstInstanceApi(data) {
  return request({
    url: `/system/agent/agentTransformAudit/firstPassOrRejection`,
    method: "post",
    data,
  });
}

//查询代理转代审核详情
export function getTransferReviewDetailsApi(id) {
  return request({
    url: `/system/agent/agentTransformAudit/getAgentTransformAuditDetail/${id}`,
    method: "get",
  });
}
//查询代理转代审核列表
export function getTransferReviewListApi(data) {
  return request({
    url: `/system/agent/agentTransformAudit/getAgentTransformAuditList`,
    method: "post",
    data,
  });
}

//代理转代二审审核通过或拒绝
export function getPassOrRejectTheSecondInstanceApi(data) {
  return request({
    url: `/system/agent/agentTransformAudit/secondPassOrRejection`,
    method: "post",
    data,
  });
}
