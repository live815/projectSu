import request from "@/utils/fb-request";
const FBBaseURL = import.meta.env.VITE_FB_SPORT_DEFAULT_API;
export function getMatchList(data) {
  data.noNeedResponseMsg = true;

  return request({
    url: `${FBBaseURL}/v1/match/getList`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

// 赛事统计

export function getStatistical(data) {
  data = data || {}
  data.noNeedResponseMsg = true;

  return request({
    url: `${FBBaseURL}/v1/match/statistical`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

// 联赛列表

export function getOnSaleLeagues(data) {
  data.noNeedResponseMsg = true;

  return request({
    url: `${FBBaseURL}/v1/match/getOnSaleLeagues`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

// 投注前更新赔率
export function updateOddBeforeBet(data) {
  data.noNeedResponseMsg = true;

  return request({
    url: `${FBBaseURL}/v1/order/batchBetMatchMarketOfJumpLine`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

//投注记录
export function betRecord(data) {
  data.noNeedResponseMsg = true;

  return request({
    url: `${FBBaseURL}/v1/order/new/bet/list`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

//查询能否提前结算
export function priceRecord(data) {
  data.noNeedResponseMsg = true;
  // const { FBBaseURL, FBToken } = getFBConfig();
  return request({
    url: `${FBBaseURL}/v1/order/cashOut/price`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

//提交提前结算
export function submitPriceRecord(data) {
  return request({
    url: `${FBBaseURL}/v1/order/getCashOutsByIds`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

//冠军内页详情查询
export function getMatchDetail(data) {
  data.noNeedResponseMsg = true;

  return request({
    url: `https://iapi.wtapaakmv.com/v1/match/getMatchDetail`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

// 可批量单关投注
export function SingleBet(data) {
  return request({
    url: `${FBBaseURL}/v1/order/bet/singlePass`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}
// 可批量预约投注
export function bookBet(data) {
  return request({
    url: `${FBBaseURL}/v1/order/reserve/bet`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}
// 查询预约注单列表
export function bookBetRecordList(data) {
  return request({
    url: `${FBBaseURL}/v1/order/reserve/betList`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}
// 获取下单状态
export function getStakeOrderStatus(data) {
  data.noNeedResponseMsg = true;

  return request({
    url: `${FBBaseURL}/v1/order/getStakeOrderStatus`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}

// 串关投注
export function betMultiple(data) {
  return request({
    url: `${FBBaseURL}/v1/order/betMultiple`,
    method: "post",
    headers: {
      Authorization: "",
    },
    data,
  });
}
