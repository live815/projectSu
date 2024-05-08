import request from '@/utils/request'

// 留存分析-留存统计-查询
export function getRetentionStatisticsList(data) {
  return request({
    url: '/system/report/member/queryRetainData',
    method: 'get',
    params:data
  })
}

// 留存分析-代理留存分析-查询
export function getProxyRetentionAnalysisList(data) {
  return request({
    url: '/system/report/member/queryAgentRetainData',
    method: 'get',
    params:data
  })
}

// 留存分析-日活分析-查询
export function getDailyLiveAnalysisList(data) {
  return request({
    url: '/system/report/member/queryDayActiveData',
    method: 'get',
    params:data
  })
}

// 留存分析-代理日活分析-查询
export function getProxyDailyLiveAnalysisList(data) {
  return request({
    url: '/system/report/member/queryProxyRecharge',
    method: 'get',
    params:data
  })
}

// 充值统计-查询
export function getRechargeStatisticsList(data) {
  return request({
    url: '/system/report/member/queryRecharge',
    method: 'get',
    params:data
  })
}

// 代理充值统计-查询
export function getProxyRechargeStatisticsList(data) {
  return request({
    url: '/system/report/member/queryProxyRecharge',
    method: 'get',
    params:data
  })
}

// 沉默会员-查询
export function getSilenceMemberList(data) {
  return request({
    url: '/system/report/member/querySilence',
    method: 'get',
    params:data
  })
}

// 用户分布-查询
export function getDistributeList(data, url) {
  return request({
    url,
    method: 'get',
    params:data
  })
}

