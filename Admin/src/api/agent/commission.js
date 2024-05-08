import request from "@/utils/request";

//佣金一审审核通过或拒绝
export function commissionFirstTrialApi(data) {
  return request({
    url: `/system/agent/commissionRecordAudit/firstPassOrRejection`,
    method: "post",
    data,
  });
}
//查询佣金审核列表
export function queryAuditListApi(data) {
  return request({
    url: `/system/agent/commissionRecordAudit/getCommissionRecordAuditList`,
    method: "post",
    data,
  });
}
//查询佣金审核详细信息
export function inquireAboutCommissionReviewApi(id) {
  return request({
    url: `/system/agent/commissionRecordAudit/getDetailInfo/${id}`,
    method: "get",
  });
}

// 查询下级树状列表
export function getSubAgentTreeList(id) {
  return request({
    url: `/system/agent/agentProxy/getCommissionAuditAgentProxyList`,
    method: "get",
    params: id,
  });
}

//佣金二审审核通过或拒绝
export function commissionSecondReviewApi(data) {
  return request({
    url: `/system/agent/commissionRecordAudit/secondPassOrRejection`,
    method: "post",
    data,
  });
}
// <!--  sdsadasdasd     -->

//查询下级代理佣金记录列表
export function querySubordinateAgentsApi(data) {
  return request({
    url: `/system/agent/commissionRecordAudit/getSubProxyCommissionDetailList`,
    method: "post",
    data,
  });
}
//查询公司输赢调整列表
export function checkTheCompanysWinOrLossApi(data) {
  return request({
    url: `/system/agent/commissionRecordAudit/getCompanyProfitAndLossAdjustRecordList`,
    method: "post",
    data,
  });
}
//查询佣金场馆费列表
export function inquiryAboutVenueFeesApi(data) {
  return request({
    url: `/system/agent/commissionRecordAudit/getCommissionVenueRateList`,
    method: "post",
    data,
  });
}
//查询佣金方案详细信息
export function inquireAboutCommissionPlansApi(id) {
  return request({
    url: `/system/agent/commissionRecordAudit/getCommissionRebateDetailInfo/${id}`,
    method: "get",
  });
}

// 新增佣金加减
export function commisssionAdjustListApi(data) {
  return request({
    url: `/system/agent/commissionAddSubRecord/add`,
    method: "post",
    data,
  });
}

// 查询佣金加减记录
export function getCommisssionAdjustListApi(data) {
  return request({
    url: `/system/agent/commissionAddSubRecord/getCommissionAddSubRecordList`,
    method: "post",
    data,
  });
}
