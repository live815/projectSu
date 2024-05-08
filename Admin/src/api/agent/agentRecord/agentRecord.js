import request from "@/utils/request";

// 查询账变记录列表
export function queryAccountChangeRecordsApi(data) {
  return request({
    url: `/system/agent/walletRecord/getWalletRecordList`,
    method: "post",
    data,
  });
}

// 查询代存记录列表
export function queryDepositRecordApi(data) {
  return request({
    url: `/system/agent/depositRecord/getDepositRecordList`,
    method: "post",
    data,
  });
}

// 查询转账记录列表
export function queryTransferRecordsApi(data) {
  return request({
    url: `/system/agent/transferRecord/getTransferRecordList`,
    method: "post",
    data,
  });
}

// 查询佣金记录列表
export function checkCommissionRecordsApi(data) {
  return request({
    url: `/system/agent/commissionDetail/getCommissionDetailList`,
    method: "post",
    data,
  });
}

// 提现记录-拒绝出款
export function rejectWithdarwApi(data) {
  return request({
    url: `/system/agent/withdrawalRecord/paymentReject`,
    method: "put",
    data,
  });
}

// 提现记录-强制成功
export function forceSuccessApi(data) {
  return request({
    url: `/system/agent/withdrawalRecord/forcedSuccess`,
    method: "put",
    data,
  });
}
// 提款记录-三方出款
export function thirdPayoutApi(data) {
  return request({
    url: `/system/agent/withdrawalRecord/thirdPayout`,
    method: "put",
    data,
  });
}

// 提款记录-人工出款
export function manualPayoutApi(data) {
  return request({
    url: `/system/agent/withdrawalRecord/manualPayout`,
    method: "put",
    data,
  });
}

// 提现记录-获取提款记录详细信息
export function getWithdrawDetailApi(id) {
  return request({
    url: `/system/agent/withdrawalRecord/getWithdrawalRecordDetail/${id}`,
    method: "get",
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

// 查询第三方商户列表
export function getThreeMchListApi(id) {
  return request({
    url: `/system/fund/mch-info/wd-options`,
    method: "get",
  });
}

// 提现记录审核详情第三方数据
export function getThreeMchDetailListApi(params) {
  return request({
    url: `/system/fund/mch-channel/withdrawForAgent/selectAll`,
    method: "get",
    params,
  });
}

// 导出提现记录
export function exportWithdrawRecordAPI(data) {
  return request({
    url: `/system/agent/withdrawalRecord/export`,
    method: "post",
    data,
  });
}
