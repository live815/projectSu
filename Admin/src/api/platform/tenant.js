import request from "@/utils/request";

// 查询平台列表
export function listPlatform(query) {
  return request({
    url: "/system/tenant/list",
    method: "get",
    params: query,
  });
}

// 新增平台
export function addTenant(data) {
  return request({
    url: "/system/tenant/add",
    method: "post",
    data: data,
  });
}

// 修改平台
export function updateTenant(data) {
  return request({
    url: "/system/tenant/edit",
    method: "put",
    data: data,
  });
}

// 角色状态修改
export function changeTenantStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/system/tenant/changeStatus',
    method: 'put',
    data: data
  })
}
