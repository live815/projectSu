import service from '@/utils/request'

// 获取福利订单
export function getWelfareListApi(data) {
  return service({
    url: '/api/promotion/welfare/list',
    method: 'post',
    data
  })
}

// 获取福利统计
export function getWelfareStatisticApi(data) {
  return service({
    url: `/api/promotion/welfare/statistic?type=${data}`,
    method: 'get'
  })
}

// 领取福利 2现金券 3存送券 4流水券
export function receiveWelfareApi(id) {
  return service({
    url: `/api/promotion/welfare/claim/?id=${id}`,
    method: 'get'
  })
}
