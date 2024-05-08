import request from '@/utils/request'
// 查询登录日志列表
export function listOperlog(query) {
  return request({
    url: '/system/operlog/list',
    method: 'get',
    params: query
  })
}