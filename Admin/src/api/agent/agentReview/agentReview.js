import request from "@/utils/request";

//代理新增审核通过或拒绝
export function approvedOrRejectedApi(data) {
  return request({
    url: `/system/agent/agentAddAudit/auditPassOrRejection`,
    method: "post",
    data,
  });
}

//查询代理新增审核列表
export function agentNewReviewApi(data) {
  console.log(data);
  return request({
    url: `/system/agent/agentAddAudit/getAgentAddAuditList`,
    method: "post",
    data,
  });
}

// 查询代理新增审核详细信息
export function addAgentDetailsApi(id) {
  return request({
    url: `/system/agent/agentAddAudit/getDetailInfo/${id}`,
    method: "get",
  });
}
