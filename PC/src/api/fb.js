import request from '@/utils/fb-request'
import { getFBConfig } from '@/utils/cache'
// 所有赛事
export function getMatchList(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/getList`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data: Object.assign({}, data, {
      noNeedResponseMsg: true
    })
  })
}

// 赛事统计
export function getStatistical(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/statistical`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

// 联赛列表
export function getOnSaleLeagues(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/getOnSaleLeagues`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}


// 投注前更新赔率
export function updateOddBeforeBet(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/batchBetMatchMarketOfJumpLine`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

//投注记录
export function betRecord(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/new/bet/list`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

//查询能否提前结算
export function priceRecord(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/cashOut/price`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

//提交提前结算
export function submitPriceRecord(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/cashOut/bet`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

//获取单个赛事详情及玩法
export function getMatchDetail(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/getMatchDetail`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

// 可批量单关投注
export function SingleBet(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/bet/singlePass`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}
// 可批量预约投注
export function bookBet(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/reserve/bet`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}
// 查询预约注单列表
export function bookBetRecordList(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/reserve/betList`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}
// 取消预约
export function cancelBookBet(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/reserve/cancel`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}
// 获取下单状态
export function getStakeOrderStatus(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/getStakeOrderStatus`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

// 串关投注
export function betMultiple(data) {
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/order/betMultiple`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}
//分页获取赛事赛果列表
export function getMatchResultPage(data){
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/matchResultPage`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}
// 根据球队或者赛事名搜索赛事
export function getqueryMatchByRecommend(data){
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/queryMatchByRecommend`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

// 获取体育语言包
export function getSportLanguagePackage(data) {
  data = data || {}
  data.noNeedResponseMsg = true
  return request({
    url: `${import.meta.env.VITE_FB_SPORT_DEFAULT_API}/language/staticList`,
    method: 'post',
    data
  })
}

// 获取赛事未来天数的赛事数量列表
export function getMatchCountList(data){
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/matchCount`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}

// 获取赛事赛果列表 
export function getMatchResultList(data){
  const { FBBaseURL, FBToken } = getFBConfig()
  return request({
    url: `${FBBaseURL}/v1/match/matchResultList`,
    method: 'post',
    headers: {
      Authorization: FBToken
    },
    data
  })
}