import request from '@/utils/request'

// 活动禁用或者开启 1开启 0禁用
export const getConfigurationListApi = (data) => {
  return request({
    url: 'system/activity/config/ban',
    method: 'put',
    data
  })
}

// 活动新增
export const addConfigurationApi = (data) => {
  return request({
    url: 'system/activity/config/save',
    method: 'post',
    data
  })
}
//查询参与游戏名称
export const palyInGameNameApi = () => {
  return request({
    url: `system/activity/config/queryLobbyNames`,
    method: 'get'
  })
}
// 活动删除
export const deleteConfigurationApi = (id) => {
  return request({
    url: `system/activity/config/delete/${id}`,
    method: 'delete'
  })
}

// 查询活动配置列表
export const getConfigurationApi = (data) => {
  return request({
    url: `system/activity/config/list`,
    method: 'post',
    data
  })
}

// 活动编辑
export const editConfigurationApi = (data) => {
  return request({
    url: `system/activity/config/update`,
    method: 'put',
    data
  })
}

// 查询活动-代理线内容-量级10万
export const getConfigurationDetailsApi = (id) => {
  return request({
    url: `system/activity/config/list/${id}`,
    method: 'get'
  })
}

// 活动记录访问列表
export const getLogAccessApi = (data) => {
  return request({
    url: `system/activity/enter/record/list`,
    method: 'post',
    data
  })
}

// 活动埋点

// 1.查询活动明细分布列表
export const getDemandStatisticApi = (data) => {
  return request({
    url: `system/activity/enter/record/list`,
    method: 'post',
    data
  })
}

// 2.访问来源分布情况
export const getDemandStatisticTotalApi = (data) => {
  return request({
    url: `system/activity/enter/statistic/total`,
    method: 'post',
    data
  })
}
//3.访问类型分布情况
export const getTypeDistributionsApi = (data) => {
  return request({
    url: `system/activity/enter/statistic/list`,
    method: 'post',
    data
  })
}
// 4.获奖记录
export const getActivityRecordApi = (data) => {
  return request({
    url: `system/activity/reward/record/list`,
    method: 'post',
    data
  })
}
//返水记录查询
export const cashbackRecordApi = (data) => {
  return request({
    url: `system/rebate/record/list`,
    method: 'post',
    data
  })
}
// 返水记录明细
export const cashbackDetailsApi = (data) => {
  return request({
    url: `system/rebate/record/detail`,
    method: 'post',
    data
  })
}
// 导出返水记录明细
export const exportRebateRecordsApi = (data) => {
  return request({
    url: `system/rebate/record/export`,
    method: 'post',
    data
  })
}
// 大转盘参数配置详情
export const getTurntableDetail = (params) => {
  return request({
    url: `system/activity/config/turntable/detail/`,
    method: 'get',
    params
  })
}
// 查询新手活动统计报表
export const newbieActivityReport = (data) => {
  return request({
    url: `system/activity/newbie/report/list`,
    method: 'post',
    data
  })
}

// 查询新手活动统计报表
export const newbieActivityRecord = (data) => {
  return request({
    url: `system/activity/newbie/record/list`,
    method: 'post',
    data
  })
}
// 查询新手大礼包记录
export const newbieGiftRecord = (data) => {
  return request({
    url: `system/activity/newbie/gift/record/list`,
    method: 'post',
    data
  })
}
// 查询签到大礼包记录
export const newbieSignGiftRecord = (data) => {
  return request({
    url: `system/activity/sign/gift/record/list`,
    method: 'post',
    data
  })
}
// 查询签到大礼包记录
export const newbieResurrectionGiftRecord = (data) => {
  return request({
    url: `system/activity/resurrection/gift/record/list`,
    method: 'post',
    data
  })
}
// 查询签到记录
export const newbieSignRecord = (data) => {
  return request({
    url: `system/activity/sign/record/list`,
    method: 'post',
    data
  })
}

// 查询新手活动参数配置详情
export const newbieConfigDetail = (params) => {
  return request({
    url: `system/activity/config/newbie/detail`,
    method: 'get',
    params
  })
}

// 查询大转盘抽奖记录
export const getTurntableRecordList = (data) => {
  return request({
    url: `system/activity/reward/record/turntable/list`,
    method: 'post',
    data
  })
}

export const getCondition = (params) => {
  return request({
    url: `system/activity/config/condition/getCondition`,
    method: 'get',
    params
  })
}

export const queryMatchCondition = (params) => {
  return request({
    url: `system/activity/config/condition/queryMatchCondition`,
    method: 'get',
    params
  })
}

export const queryReward = (params) => {
  return request({
    url: `system/activity/config/condition/queryReward`,
    method: 'get',
    params
  })
}

export const getCashbackDetail = (params) => {
  return request({
    url: `system/activity/config/cashback/detail`,
    method: 'get',
    params
  })
}
