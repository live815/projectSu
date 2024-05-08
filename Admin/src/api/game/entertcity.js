import request from "@/utils/request";

// 查询角色列表
// export function listRole(query) {
//   return request({
//     url: '/system/role/list',
//     method: 'get',
//     params: query
//   })
// }
// 查询娱乐城子游戏列表
export function listLobby(data) {
  return request({
    url: "/game/api/game/lobby/list",
    method: "post",
    data: data,
  });
}

// 查询娱乐城电子子游戏列表（第三级）
export function listLobbySlot(data) {
  return request({
    url: "/game/api/game/lobby/slot/list",
    method: "post",
    data: data,
  });
}

// 查询场馆类型列表
export function listLobbyType(data) {
  return request({
    url: "/game/api/game/lobby/typeList",
    method: "post",
    data: data,
  });
}

// 娱乐城子游戏修改状态
export function updateStatus(data) {
  return request({
    url: "/game/api/game/lobby/updateStatus",
    method: "post",
    data: data,
  });
}
// 娱乐城游戏修改状态(一级)
// export function updateStatus(data) {
//   return request({
//     url: '/game/api/game/lobby/updateStatus',
//     method: 'post',
//     data: data
//   })
// }

// 娱乐城子游戏編輯（2级）
export function updateInfo(data) {
  return request({
    url: "/game/api/game/lobby/subGameUpdate",
    method: "post",
    data: data,
  });
}

//娱乐城游戏编辑（一级）
export function typeUpdate(data) {
  return request({
    url: "/game/api/game/lobby/typeUpdate",
    method: "post",
    data: data,
  });
}

//娱乐城电子游戏/子游戏的编辑（二级）
export function subGameUpdate(data) {
  return request({
    url: "/game/api/game/lobby/subGameUpdate",
    method: "post",
    data: data,
  });
}

//娱乐城电子子游戏编辑（三级）
export function slotSubGameUpdate(data) {
  return request({
    url: "/game/api/game/lobby/slotSubGameUpdate",
    method: "post",
    data: data,
  });
}
