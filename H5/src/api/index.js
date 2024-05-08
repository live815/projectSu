import service from '@/utils/request'
export function getVideoList(params) {
  return service({
    url: `https://pxdd.btyyl12.com/match/sportUnionData?ts=${Date.now()}&language=zh_CN`,
    method: 'get',
    params
  })
}

export function getVideoList2(data) {
  return service({
    url: `/api/live/video/videoList`,
    method: 'post',
    data
  })
}

//获取国家编码信息列表
export function getCountryCodeList(params) {
  return service({
    url: `/api/user/countrycode/list`,
    method: 'get',
    params
  })
}

// 全站维护信息
export function getQueryDetail(data) {
  return service({
    url: `/api/operation/siteMain/queryDetail`,
    method: 'post',
    data
  })
}
