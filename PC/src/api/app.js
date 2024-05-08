import service from '@/utils/request'

export function getCountryCodeList(params) {
  return service({
    url: `/api/user/countrycode/list`,
    method: 'get',
    params
  })
}

export function getQueryDetail(data) {
  return service({
    url: `/api/operation/siteMain/queryDetail`,
    method: 'post',
    data
  })
}
