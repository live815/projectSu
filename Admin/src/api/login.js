import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })
}

// 登录方法
// export function loginNew(data) {
//   return request({
//     url: '/auth/loginNew',
//     headers: {
//       isToken: false
//     },
//     method: 'post',
//     data
//   })
// }

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete',
    data: {
      loginUrl: location.host,
      userAgent: navigator.userAgent
    }
  })
}

// 获取验证码
export function getCodeImg() {
  // captchaImage
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 生成谷歌验证码
export function getGoogleQr(params) {
  return request({
    url: '/auth/google/generateQrcode',
    headers: {
      isToken: false
    },
    method: 'get',
    params,
    timeout: 20000
  })
}

// 校验谷歌二维码
export function validQrApi(data) {
  return request({
    url: '/auth/google/googleVerifyCodeCheck',
    headers: {
      isToken: false
    },
    method: 'post',
    data,
    timeout: 20000
  })
}
