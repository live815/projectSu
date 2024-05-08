import request from "@/utils/request";

// 查询直播信息分页查询
export function getStreamList(data) {
  return request({
    url: "/system/live/stream/list",
    method: "get",
    params: data,
  });
}
// 修改直播信息
export function updateStreamList(data) {
  return request({
    url: "/system/live/stream/update",
    method: "put",
    data: data,
  });
}
// 修改直播信息
export function downStreamList(data) {
  return request({
    url: "/system/live/stream/forbid",
    method: "post",
    data: data,
  });
}

// 删除直播信息分页查询
export function deleteStreamList(ids) {
  return request({
    url: "/system/live/stream/delete/" + ids,
    method: "delete",
  });
}

// 查询结束直播信息分页查询
export function getEndStreamList(data) {
  return request({
    url: "/system/live/stream/finish_list",
    method: "get",
    params: data,
  });
}
