import request from "@/utils/request";

//银行管理 禁用或者开启 1开启 0禁用
export function bankManagementStatusApi(data) {
  return request({
    url: `/system/agent/config/bank/ban`,
    method: "put",
    data,
  });
}
//银行管理-删除
export function deleteBankManagementApi(id) {
  return request({
    url: `/system/agent/config/bank/delete/${id}`,
    method: "delete",
  });
}
//银行管理-查询
export function queryBankManagementApi(data) {
  return request({
    url: `/system/agent/config/bank/list`,
    method: "post",
    data,
  });
}
//银行管理-新增
export function addBankManagementApi(data) {
  return request({
    url: `/system/agent/config/bank/save`,
    method: "post",
    data,
  });
}
//银行管理-编辑
export function editBankManagementApi(data) {
  return request({
    url: `/system/agent/config/bank/update`,
    method: "put",
    data,
  });
}
