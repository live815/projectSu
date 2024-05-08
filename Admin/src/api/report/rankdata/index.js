import request from '@/utils/request'

// 排行数据-输赢排名及弹窗、充提排名及弹窗-查询
export function getRankList(data, url) {
  return request({
    url,
    method: 'post',
    data
  })
}

