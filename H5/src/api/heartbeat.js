import service from '@/utils/request'
export function heartbeat() {
  return service({
    url: '/api/user/auth/heartbeat',
    method: 'get'
  })
}
