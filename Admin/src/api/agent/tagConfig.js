import request from "@/utils/request";

//删除标签
export function deleteTagApi(id) {
  return request({
    url: `/system/agent/tagConfig/delete/${id}`,
    method: "delete",
  });
}
//查询标签列表
export function queryTagApi(data) {
  return request({
    url: `/system/agent/tagConfig/getTagList`,
    method: "post",
    data,
  });
}
//查询标签用户数列表
export function queryTagUsersApi(data) {
  return request({
    url: `/system/agent/tagConfig/getTagAgentList`,
    method: "post",
    data,
  });
}
//新增标签
export function addNewTagApi(data) {
  return request({
    url: `/system/agent/tagConfig/save`,
    method: "post",
    data,
  });
}
//修改标签
export function editTagApi(data) {
  return request({
    url: `/system/agent/tagConfig/update`,
    method: "put",
    data,
  });
}
