
// 赞助模块
import service from '@/utils/request'

// 获取赞助列表数据
export function getSponsorList() {
  return service({
    url: '/api/operation/sponsor/list',
    method: 'get'
  })
}