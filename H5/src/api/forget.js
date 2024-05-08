import service from '@/utils/request'
export function getCheckAccount(data) {
    return service({
      url: '/api/user/auth/reset-password/check-account',
      method: 'post',
      data
    })
}
export function getCheckMobile(data,token) {
    return service({
      headers: {
        'Authorization': token
      },
      url: '/api/user/auth/reset-password/check-mobile',
      method: 'post',
      data
    })
}
export function getUpPass(data,token) {
    return service({
      headers: {
        'Authorization': token
      },
      url: '/api/user/auth/reset-password/update-password',
      method: 'post',
      data
    })
}

export function loginCheckByMobile(params) {
  return service({
    url: `/api/user/auth/mobile-loginCheckByMobile/${params.phone}`,
    method: 'get'
  })
}