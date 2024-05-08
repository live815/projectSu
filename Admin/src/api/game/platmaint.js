import request from "@/utils/request";
// 查询平台列表
export function platFormaintList(data) {
  return request({
    url: "/game/api/game/lobby-maintain/list",
    method: "post",
    data: data,
  });
}

// 新增平台
export function addPlatFormaint(data) {
  return request({
    url: "/game/api/game/lobby-maintain/add",
    method: "post",
    data: data,
  });
}
// 编辑平台
export function editPlatFormaint(data) {
  return request({
    url: "/game/api/game/lobby-maintain/update",
    method: "post",
    data: data,
  });
}

// 删除
export function delPlatFormaint(data) {
  return request({
    url: "/game/api/game/lobby-maintain/delete",
    method: "post",
    data: data,
  });
}
// 娱乐城子游戏
export function gamePlantList(data) {
  return request({
    url: "/game/api/game/lobby/list",
    method: "post",
    data: data,
  });
}

// 娱乐城场馆费修改
export function editPlantCost(data) {
  return request({
    url: "/game/api/game/lobby/lobbyFeeUpdate",
    method: "post",
    data: data,
  });
}
// 查询场馆类型

export function getVenueList(data) {
  return request({
    url: "/game/api/game/lobby/typeList",
    method: "post",
    data: data,
  });
}
