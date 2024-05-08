import service from '@/utils/request'
// import axios from 'axios'
export function getAnchorDebut(data) {
    return service({
      url: '/api/live/stream/save',
      method: 'post',
      data
    })
}
export function getVideoList(data) {
    return service({
      url: '/api/live/video/matchListFront',
      method: 'post',
      data
    })
}
//查询直播接口
export function getStreamList(data) {
  return service({
    url: '/api/live/stream/list',
    method: 'post',
    data
  })
}
//关闭直播
export function getStreamStop(data) {
  return service({
    url: '/api/live/stream/stop',
    method: 'post',
    data
  })
}
//修改预约直播 
export function getStreamUpdate(data) {
  return service({
    url: '/api/live/stream/update',
    method: 'post',
    data
  })
}
//直播详情
export function getReserveDetail(id) {
  return service({
    url: '/api/live/stream/getInfo/'+id,
    method: 'get'
  })
}
//预约列表
export function getReserveList(data) {
  return service({
    url: '/api/live/stream/reserveList',
    method: 'post',
    data
  })
}
//卫星直播视频源
export function getSatelliteList(params) {
  return service({
    url: '/api/live/video/videoList',
    method: 'get',
    params
  })
}
//查看主播信息
export function getAnchorInfo(memberId){
  return service({
    url: '/api/user/presenter/getInfo2/'+memberId,
    method: 'get',
  })
}
//取消预约直播
export function getCancel(data) {
  return service({
    url: '/api/live/stream/cancel',
    method: 'post',
    data
  })
}
//修改主播个人信息
export function updateAnchor(data) {
  return service({
    url: '/api/user/presenter/update',
    method: 'PUT',
    data
  })
}
//主播已经预约数量
export function getAnchorNum(presenterId){
  return service({
    url: '/api/live/stream/countReserve/'+presenterId,
    method: 'get',
  })
}
//礼物列表
export function getGiftList(data) {
  return service({
    url: '/api/live/gift/list',
    method: 'post',
    data
  })
}
//主播礼物明细
export function getAnchorGiftList(data) {
  return service({
    url: '/api/live/gift/profit/list',
    method: 'post',
    data
  })
}
//查询封面标签信息列表  
export function getTagList(data) {
  return service({
    url: '/api/live/cover/tag/list',
    method: 'post',
    data
  })
}
//主播推单
export function setPushOrder(data) {
  return service({
    url: '/api/live/push/order/save',
    method: 'post',
    data
  })
}
//用户跟单 /info/save
export function addInfoSave(data) {
  return service({
    url: '/api/live/follow/order/save',
    method: 'post',
    data
  })
}
//主播查询推单信息
export function orderListAnchor(data) {
  return service({
    url: '/api/live/push/order/list',
    method: 'post',
    data
  })
}
//用户晒单
export function orderLisUser(data) {
  return service({
    url: '/api/live/push/order/list2',
    method: 'post',
    data
  })
}
// 用户送礼物
export function giveGifts(data) {
  data = data || {}
  return service({
      url: '/api/live/gift/profit/save',
      method: 'post',
      data
  })
}
//主播查询跟单 用户记录
export function getFollowList(data) {
  data = data || {}
  return service({
      url: '/api/live/follow/order/list',
      method: 'post',
      data
  })
}
//查询会员观看是否付费
export function getIsFee(data) {
  data = data || {}
  return service({
      url: '/api/live/relation/isFee',
      method: 'post',
      data
  })
}
//查询会员付费
export function setPay(data) {
  data = data || {}
  return service({
      url: '/api/live/relation/fee',
      method: 'post',
      data
  })
}
//超管禁言记录列表
export function getBanLogList(data) {
  data = data || {}
  return service({
      url: '/api/user/banLog/list',
      method: 'post',
      data
  })
}
//超管批量解禁
export function setBatchUntie(data) {
  data = data || {}
  return service({
      url: '/api/user/banLog/batchUntie',
      method: 'post',
      data
                                                                                                                                                                                                                                                                                                                                                                                                                                   
  })
}
//超管解禁
export function setBatchUpdata(data) {
  data = data || {}
  return service({
      url: '/api/user/banLog/update',
      method: 'PUT',
      data
  })
}
//查看聊天室配置
export function getRoomConfig(data) {
  data = data || {}
  return service({
      url: '/api/live/chatroom/config/info',
      method: 'POST',
      data
  })
}
//查询会员禁言详情
export function getBanInfo(data) {
  data = data || {}
  return service({
      url: '/api/user/banLog/banInfo',
      method: 'POST',
      data
  })
}
//禁言聊天室 用户
export function setBanLogSave(data) {
  data = data || {}
  return service({
      url: '/api/user/banLog/save',
      method: 'POST',
      data
  })
}
// 敏感词列表
export function getSensitiveWordList() {
  return service({
      url: `/api/live/sensitive/word/list`,
      method: 'get',
  })
}
// 新增敏感词屏蔽记录
export function addShieldedRecord(data) {
  data = data || {}
  return service({
      url: '/api/live/word/shielded/save',
      method: 'post',
      data
  })
}
//根据主播ID统计送礼物总数和总金额
export function getProfitSum(data) {
  data = data || {}
  return service({
      url: '/api/live/gift/profit/sum',
      method: 'post',
      data
  })
}
// 生成用户登录即时通信IM密码
export function genTestUserSig(userName) {
  return service({
      url: `/api/live/chatroom/getSig/${userName}`,
      method: 'get',
  })
}
//查询推流状态  
export function getStreamStatus(data) {
  data = data || {}
  return service({
      url: '/api/live/stream/getStreamStatus',
      method: 'post',
      data
  })
}
// 直播相关的数据统计
export function liveStatistics(data) {
  data = data || {}
  return service({
      url: '/api/live/statistics/sum',
      method: 'post',
      data
  })
}
// 通过赛事ID实时查询直播中的赛事比分
export function getLiveMatchScore(data) {
  data = data || {}
  return service({
      url: '/api/live/match/score',
      method: 'post',
      data
  })
}
