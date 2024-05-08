import request from '@/utils/request'
// 查询登录日志列表
export function listLoginInfor(query) {
  return request({
    url: '/system/logininfor/list',
    method: 'get',
    params: query
  })
}