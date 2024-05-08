// 资金明细模块
import service from '@/utils/request'

// 查询会员资金明细
export function getListByDate(data) {
  return service({
    url: '/api/fund/report/trade/page',
    method: 'post',
    data
  })
}
