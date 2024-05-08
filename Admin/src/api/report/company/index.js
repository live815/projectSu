import request from '@/utils/request'

// 公司日报、月报-实时数据、历史数据-查询
export function getData(data, url) {
  return request({
    url,
    method: 'get',
    params:data
  })
}


