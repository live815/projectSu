import request from "@/utils/request";

// 封面标签分页查询
export function getCoverlabelList(data) {
  return request({
    url: "/system/front/cover/tag/list",
    method: "get",
    params: data,
  });
}

// 新增封面标签
export function addCoverlabelList(data) {
  return request({
    url: "/system/front/cover/tag/save",
    method: "post",
    data: data,
  });
}
// 编辑封面标签
export function editCoverlabelList(data) {
  return request({
    url: "/system/front/cover/tag/update",
    method: "put",
    data: data,
  });
}
// 删除封面标签
export function delCoverlabelList(ids) {
  return request({
    url: "/system/front/cover/tag/delete/" + ids,
    method: "delete",
  });
}
