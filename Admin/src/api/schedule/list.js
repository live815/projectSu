import request from '@/utils/request'

// 查询赛程列表分页查询
export function getScheduleLit(data) {
  return request({
    url: 'system/video/live/schedule/list',
    method: 'get',
    params: data
  })
}

// 查询赛程列表分页查询
export function getVideoUrl(data) {
  return request({
    url: 'system/video/live/schedule/getPlayUrl',
    method: 'post',
    data: data
  })
}

