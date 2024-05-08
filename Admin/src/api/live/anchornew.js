import request from "@/utils/request";

// 查询主播动态列表
export function getAnchornewList(data) {
  return request({
    url: "/system/presenter/dynamics/list",
    method: "get",
    params: data,
  });
}

// 新增主播动态
export function addAnchornewList(data) {
  return request({
    url: "/system/presenter/dynamics/save",
    method: "post",
    data: data,
  });
}
// 删除主播动态
export function delAnchornewList(ids) {
  return request({
    url: "/system/presenter/dynamics/delete/" + ids,
    method: "delete",
  });
}
