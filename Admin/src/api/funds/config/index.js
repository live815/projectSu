import request from '@/utils/request'

//查询虚拟币汇率设置列表
export function getVirtcyList(data) {
  return request({
    url: '/system/fund/virtcy/rate/list',
    method: 'get',
    params: data
  })
}

// 更新汇率
export function updateList(data) {
  return request({
    url: '/system/fund/virtcy/rate/edit',
    method: 'put',
    data: data
  })
}

//查询所有通道下拉列表
export function getSelectAll(data) {
  return request({
    url: '/system/fund/channel/type/selectAll',
    method: 'get',
    params: data
  })
}

//查询分页列表
export function getListByPagination(data) {
  return request({
    url: '/system/fund/channel/type/list',
    method: 'get',
    params: data
  })
}

//查询通道类型页面提示语
export function getContent(data) {
  return request({
    url: '/system/fund/channel/type/getContent/'+data,
    method: 'get'
  })
}

//新增通道类型页面提示语
export function addContent(data) {
  return request({
    url: '/system/fund/channel/type/add/content',
    method: 'post',
    data:data
  })
}

//根据ID查询通道类型详情
export function getInfo(data) {
  return request({
    url: '/system/fund/channel/type/getInfo/'+data,
    method: 'get'
  })
}

//提交通道类型详情
export function saveInfo(data) {
  return request({
    url: '/system/fund/channel/type/edit',
    method: 'put',
    data:data
  })
}

//修改通道类型（银行卡-手机号）绑定状态
export function changeStatus(data) {
  return request({
    url: '/system/fund/channel/type/changeStatus',
    method: 'put',
    data:data
  })
}

//获取预约提现配置详细信息
export function getAppmentwdList(data) {
  return request({
    url: '/system/fund/appmentwd/getInfo',
    method: 'get',
    params: data
  })
}

//获取预约提现配置详细信息
export function saveAppmentwdList(data) {
  return request({
    url: '/system/fund/appmentwd/edit',
    method: 'put',
    data: data
  })
}

//获取自动出款剩余小时数
export function gethHoursLeftPayout(data) {
  return request({
    url: '/system/fund/appmentwd/hoursLeftPayout',
    method: 'get',
    params: data
  })
}

//查询大额提现配置信息
export function getLargewdList(data) {
  return request({
    url: '/system/fund/largewd/data',
    method: 'get',
    params: data
  })
}

//获取预约提现配置详细信息
export function savelargewdList(data) {
  return request({
    url: '/system/fund/largewd/edit',
    method: 'put',
    data: data
  })
}

//查询提现类型显示文案配置列表
export function getContentList(data) {
  return request({
    url: '/system/fund/wdt/content/list',
    method: 'get',
    params: data
  })
}

//修改提现类型显示文案配置列表
export function editContentList(data) {
  return request({
    url: '/system/fund/wdt/content/edit',
    method: 'put',
    data: data
  })
}

//查询银行信息列表
export function getBankList(data) {
  return request({
    url: '/system/fund/bank/list',
    method: 'get',
    params: data
  })
}

//根据ID获取银行信息详细信息
export function getBankInfo(data) {
  return request({
    url: '/system/fund/bank/getInfo/'+data,
    method: 'get'
  })
}

//修改银行信息
export function updateBankInfo(data) {
  return request({
    url: '/system/fund/bank/edit',
    method: 'put',
    data:data
  })
}

//修改银行状态
export function updateBankStatus(data) {
  return request({
    url: '/system/fund/bank/changeStatus',
    method: 'put',
    data:data
  })
}

//查询所有VIP等级
export function getVIPList(data) {
  return request({
    url: '/system/member/vipLevel/selectAll',
    method: 'get',
    params:data
  })
}

//查询所有财务等级
export function getTierList(data) {
  return request({
    url: '/system/fund/tier/selectAll',
    method: 'get',
    params:data
  })
}

//查询所有出款通道
export function getChannelList(data) {
  return request({
    url: '/system/fund/mch-channel/withdraw/selectAll',
    method: 'get',
    params:data
  })
}

//查询提现分单配置列表
export function getAssignList(data) {
  return request({
    url: '/system/fund/poa/assign/list',
    method: 'get',
    params:data
  })
}

//修改提现分单配置
export function getAssignEdit(data) {
  return request({
    url: '/system/fund/poa/assign/edit',
    method: 'put',
    data:data
  })
}

//删除提现分单配置
export function getAssignDelete(data) {
  return request({
    url: '/system/fund/poa/assign/delete/'+data,
    method: 'delete'
  })
}

//新增提现分单配置
export function getAssignAdd(data) {
  return request({
    url: '/system/fund/poa/assign/add',
    method: 'post',
    data:data
  })
}

//提现分单配置同步余额
export function getBalance(data) {
  return request({
    url: '/system/fund/mch-info/queryBalance',
    method: 'get',
    params:data
  })
}

//查询充值流水倍数
export function getDepositMultiple(data) {
  return request({
    url: '/system/fund/deposit/multiple/data',
    method: 'get',
    params:data
  })
}

//编辑充值流水倍数
export function editDepositMultiple(data) {
  return request({
    url: '/system/fund/deposit/multiple/edit',
    method: 'put',
    data:data
  })
}