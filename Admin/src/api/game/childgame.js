import request from '@/utils/request'

// 查询娱乐城电子子游戏列表分页查询
export function getChildLit(data) {
  return request({
    url: '/game/api/game/lobby/list',
    method: 'post',
    data: data
  })
}

// 查询场馆类型列表
export function listLobbyType(data) {
  return request({
    url: '/game/api/game/lobby/typeList',
    method: 'post',
    data: data
  })
}

// 娱乐城子游戏修改状态
export function updateStatus(data) {
  return request({
    url: '/game/api/game/lobby/updateStatus',
    method: 'post',
    data: data
  })
}

// 娱乐城子游戏編輯
export function updateInfo(data) {
  return request({
    url: '/game/api/game/lobby/subGameUpdate',
    method: 'post',
    data: data
  })
}

//娱乐城游戏编辑（一级）
export function typeUpdate(data) {
  return request({
    url: '/game/api/game/lobby/typeUpdate',
    method: 'post',
    data: data
  })
}
