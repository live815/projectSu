import request from "@/utils/request";

//分页查询短信验证码记录（短信发送记录，短信发送异常记录）
// export function queryInviteDepConfig(data) {
//   return request({
//     url: "/system/invite/queryInviteDepConfig",
//     method: "get",
//     params: data,
//   });
// }

//分页查询短信验证码记录（短信发送记录，短信发送异常记录）
export function queryCodeList(data) {
  return request({
    url: "/system/sms/verification/code/list",
    method: "post",
    data,
  });
}

//分页查询短信服务商信息
export function querySupplierList(data) {
  return request({
    url: "/system/sms/supplier/list",
    method: "post",
    data,
  });
}

//全量查询短信服务商信息
export function querySupplierAllList(data) {
  return request({
    url: "/system/sms/supplier/allList",
    method: "post",
    data,
  });
}

//修改短信服务商信息
export function updateSupplierList(data) {
  return request({
    url: "/system/sms/supplier/update",
    method: "post",
    data,
  });
}

//查询短信服务商详细信息
export function queryInviteDepConfig(data) {
  return request({
    url: `/system/sms/supplier/getInfo/${data}`,
    method: "get"
  });
}

//查询短信验证码记录统计列表
export function queryStatisticsListList(data) {
  return request({
    url: "/system/sms/verification/code/statisticsList",
    method: "post",
    data,
  });
}