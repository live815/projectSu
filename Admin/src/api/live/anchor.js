import request from "@/utils/request";

// 查询主播信息分页查询
export function getAnchorList(data) {
  return request({
    url: "/system/presenter/list",
    method: "get",
    params: data,
  });
}
// 新增主播信息分页查询
export function addAnchorList(data) {
  return request({
    url: "/system/presenter/save",
    method: "post",
    data: data,
  });
}
// 编辑主播信息分页查询
export function editAnchorList(data) {
  return request({
    url: "/system/presenter/update",
    method: "put",
    data: data,
  });
}
// 删除主播信息分页查询
export function delAnchorList(ids) {
  return request({
    url: "/system/presenter/delete/" + ids,
    method: "delete",
  });
}
// 超管信息分页查询
export function getAdminList(data) {
  return request({
    url: "/system/manager/list",
    method: "get",
    params: data,
  });
}
// 新增超管信息
export function addAdminList(data) {
  return request({
    url: "/system/manager/save",
    method: "post",
    data: data,
  });
}
// 编辑超管信息
export function editAdminList(data) {
  return request({
    url: "/system/manager/update",
    method: "put",
    data: data,
  });
}
// 删除超管信息
export function delAdminList(ids) {
  return request({
    url: "/system/manager/delete/" + ids,
    method: "delete",
  });
}
