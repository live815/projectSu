import request from '@/utils/request'

//新增C2C存取款占比配置
export function addDwRatio(data) {
  return request({
    url: '/system/fund/c2c/dwRatio/add',
    method: 'post',
    data:data
  })
}

//删除C2C存取款占比配置
export function delDwRatio(data) {
  return request({
    url: '/system/fund/c2c/dwRatio/delete/'+data,
    method: 'delete'
  })
}

//修改C2C存取款占比配置
export function editDwRatio(data) {
  return request({
    url: '/system/fund/c2c/dwRatio/edit',
    method: 'put',
    data:data
  })
}

//获取C2C存取款占比配置详细信息
export function getDwRatioInfo(data) {
  return request({
    url: '/system/fund/c2c/dwRatio/getInfo/'+data,
    method: 'get'
  })
}

//获取C2C存取款占比配置列表
export function getDwRatioList(data) {
  return request({
    url: '/system/fund/c2c/dwRatio/list',
    method: 'get',
    params:data
  })
}

//修改C2C提现风控配置
export function editConfig(data) {
  return request({
    url: '/system/fund/c2c/risk/config/edit',
    method: 'put',
    data:data
  })
}

//获取C2C提现风控配置信息
export function getConfigInfo(data) {
  return request({
    url: '/system/fund/c2c/risk/config/getInfo',
    method: 'get',
    params:data
  })
}

//查询C2C提现风控配置日志列表
export function getConfigLogList(data) {
  return request({
    url: '/system/fund/c2c/risk/config/log/list',
    method: 'get',
    params:data
  })
}

//查询C2C提现风控配置日志列表
export function getWithdrawHoldList(data) {
  return request({
    url: '/system/fund/c2c/withdraw/hold/list',
    method: 'get',
    params:data
  })
}

//批量操作搁置订单
export function batchUpdate(data) {
  return request({
    url: '/system/fund/c2c/withdraw/hold/batch/update',
    method: 'post',
    data:data
  })
}

//查询拆单开关状态
export function getSplitSwitch(data) {
  return request({
    url: '/system/fund/c2c/split/switch/status',
    method: 'get',
    params:data
  })
}

//拆单开关状态修改
export function updateSplitSwitch(data) {
  return request({
    url: '/system/fund/c2c/split/switch/edit',
    method: 'put',
    data:data
  })
}

//新增C2C提现拆单规则配置
export function addSplitRule(data) {
  return request({
    url: '/system/fund/c2c/split/rule/add',
    method: 'post',
    data:data
  })
}

//删除C2C提现拆单规则配置
export function delSplitRule(data) {
  return request({
    url: '/system/fund/c2c/split/rule/delete/'+data,
    method: 'delete'
  })
}

//修改C2C提现拆单规则配置
export function updateSplitRule(data) {
  return request({
    url: '/system/fund/c2c/split/rule/edit',
    method: 'put',
    data:data
  })
}

//查询拆单开关状态
export function getSplitRule(data) {
  return request({
    url: '/system/fund/c2c/split/rule/list',
    method: 'get',
    params:data
  })
}

//新增C2C充提黑名单
export function addBlackList(data) {
  return request({
    url: '/system/fund/c2c/dw/blackList/add',
    method: 'post',
    data:data
  })
}

//删除C2C充提黑名单
export function delBlackList(data) {
  return request({
    url: '/system/fund/c2c/dw/blackList/delete/'+data,
    method: 'delete'
  })
}

//修改C2C充提黑名单状态
export function updateBlackList(data) {
  return request({
    url: '/system/fund/c2c/dw/blackList/change/status',
    method: 'put',
    data:data
  })
}

//查询C2C充提黑名单列表
export function getBlackList(data) {
  return request({
    url: '/system/fund/c2c/dw/blackList/list',
    method: 'get',
    params:data
  })
}