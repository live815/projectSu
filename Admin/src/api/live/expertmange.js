import request from "@/utils/request";

// 专家查询
export function getExpertList(data) {
  return request({
    url: "/system/expert/info/list",
    method: "get",
    params: data,
  });
}
// 新增专家信息
export function addExpertList(data) {
  return request({
    url: "/system/expert/info/save",
    method: "post",
    data: data,
  });
}
// 编辑专家信息
export function editExpertInfo(data) {
  return request({
    url: "/system/expert/info/update",
    method: "put",
    data: data,
  });
}
// 爆料查询
export function getBreaknewsList(data) {
  return request({
    url: "/system/expert/plan/list",
    method: "get",
    params: data,
  });
}
// 新增爆料信息
export function addBreaknewsList(data) {
  return request({
    url: "/system/expert/plan/save",
    method: "post",
    data: data,
  });
}
// 编辑专家信息
export function editBreaknewsInfo(data) {
  return request({
    url: "/system/expert/plan/update",
    method: "put",
    data: data,
  });
}
// 删除爆料信息
export function delBreaknewsInfo(ids) {
  return request({
    url: "/system/expert/plan/delete/" + ids,
    method: "delete",
  });
}
// 爆料详情查询
export function getBreakDetail(ids) {
  return request({
    url: "/system/expert/plan/getInfo/" + ids,
    method: "get",
  });
}
