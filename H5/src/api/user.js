import service from '@/utils/request'
import { getInviteCode, getReferCode } from '@/utils/cache'
export function login({ username, password, validate }) {
  return service({
    url: '/api/user/auth/account-login',
    method: 'post',
    data: { userName: username, password, ...validate }
  })
}

export function register({ username, password, countryCode, validate }) {
  const inviteCode = getInviteCode()
  const referCode = getReferCode()
  return service({
    url: '/api/user/auth/account-register',
    method: 'post',
    data: { userName: username, password, countryCode, inviteCode, referCode, ...validate }
  })
}

export function phoneLogin({ phone, code, countryCode }) {
  const inviteCode = getInviteCode()
  const referCode = getReferCode()
  return service({
    url: '/api/user/auth/mobile-login',
    method: 'post',
    data: { mobile: phone, smsCode: code, countryCode, inviteCode, referCode }
  })
}

export function phoneRegister({ phone, code, countryCode, userName }) {
  const inviteCode = getInviteCode()
  const referCode = getReferCode()
  return service({
    url: '/api/user/auth/mobile-register',
    method: 'post',
    data: { mobile: phone, smsCode: code, countryCode, userName, inviteCode, referCode }
  })
}

export function registerCheckByMobile(params) {
  return service({
    url: `/api/user/auth/mobile-registerCheckByMobile/${params.phone}`,
    method: 'get'
  })
}

export function registerCheckByCode(params) {
  return service({
    url: `/api/user/auth/mobile-registerCheckByCode/${params.phone}/${params.code}`,
    method: 'get'
  })
}

export function registerCreatName() {
  return service({
    url: `/api/user/auth/mobile-registerCreatName`,
    method: 'get'
  })
}

export function getLogout(data) {
  return service({
    url: '/api/user/auth/logout',
    method: 'post',
    data
  })
}

// 一键回收
export function getCollect(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  return service({
    url: `/api/game/fund/collect`,
    method: 'post',
    data
  })
}

// 获取用户钱包余额
export function getBalance(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  return service({
    url: `/api/game/fund/wallet`,
    method: 'post',
    data
  })
}

// 个人识别码
export function getUserRefreshIdentityCode(params) {
  params = params || {}
  params.noNeedResponseMsg = true
  return service({
    url: '/api/member/refreshIdentityCode',
    method: 'get',
    params
  })
}

// 用户信息
export function getUserInfo(params) {
  params = params || {}
  params.noNeedResponseMsg = true
  return service({
    url: '/api/member/get',
    method: 'get',
    params
  })
}

// 领取奖励
export function drawAward(params) {
  return service({
    url: `/api/member/invite/drawAward`,
    method: 'get',
    params
  })
}

// 生成邀请码
export function generateReferralCode(params) {
  return service({
    url: `/api/member/invite/generateReferralCode`,
    method: 'get',
    params
  })
}

// 跑马灯
export function queryHorseRing(params) {
  return service({
    url: `/api/member/invite/queryHorseRing`,
    method: 'get',
    params
  })
}

// 查询邀请好友流水奖励配置
export function queryInviteBetConfig(params) {
  return service({
    url: `/api/member/invite/queryInviteBetConfig`,
    method: 'get',
    params
  })
}

// 查询邀请好友首存奖励配置
export function queryInviteDepConfig(params) {
  return service({
    url: `/api/member/invite/queryInviteDepConfig`,
    method: 'get',
    params
  })
}

// 邀请信息
export function queryInviteInfo(params) {
  return service({
    url: `/api/member/invite/queryInviteInfo`,
    method: 'get',
    params
  })
}

// 查询邀请好友vip奖励配置
export function queryInviteVipConfig(params) {
  return service({
    url: `/api/member/invite/queryInviteVipConfig`,
    method: 'get',
    params
  })
}

// 邀请详情流水分成奖励列表
export function queryInviteBetAwardList(params) {
  return service({
    url: `/api/member/invite/queryInviteBetAwardList`,
    method: 'get',
    params
  })
}

// 邀请详情首存奖励列表
export function queryInviteDepAward(params) {
  return service({
    url: `/api/member/invite/queryInviteDepAward`,
    method: 'get',
    params
  })
}

// 邀请详情累计发放金额和邀请人数
export function queryInviteInfoTotalAward(params) {
  return service({
    url: `/api/member/invite/queryInviteInfoTotalAward`,
    method: 'get',
    params
  })
}