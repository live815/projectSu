// 商务合作
import service from '@/utils/request'

// 获取代理配置的所有联系方式
export function getPromotionContact() {
  return service({
    url: `/api/agent/promotion/contact/list`,
    method: 'get'
  })
}
