import service from '@/utils/request'
// 发送短信验证码
export function sendCodeApi(data) {
  return service({
    url: '/api/user/verCode/sendSms',
    method: 'post',
    data
  })
}

// 发送邮箱验证码
export function getSendEmail(data) {
  return service({
    url: '/api/user/verify/sendEmail',
    method: 'post',
    data
  })
}