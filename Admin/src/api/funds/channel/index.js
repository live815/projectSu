import request from '@/utils/request'

//新增商户入款通道
export function addChannel(data) {
  return request({
    url: '/system/fund/mch-channel/deposit/add',
    method: 'post',
    data: data
  })
}

//修改商户入款通道
export function editChannel(data) {
  return request({
    url: '/system/fund/mch-channel/deposit/edit',
    method: 'put',
    data: data
  })
}

//查询平台的所有商户入款通道
export function getDepositList(data) {
  return request({
    url: '/system/fund/mch-channel/deposit/list',
    method: 'get',
    params: data
  })
}

//分页查询商户入款通道
export function getListByPage(data) {
  return request({
    url: '/system/fund/mch-channel/deposit/page',
    method: 'get',
    params: data
  })
}

//获取商户入款通道详细信息
export function getDetail(data) {
  return request({
    url: '/system/fund/mch-channel/deposit/'+data,
    method: 'get'
  })
}

//切换商户通道状态（包含出款，入款通道）
export function changeChannelStatus(data) {
  return request({
    url: '/system/fund/mch-channel/status',
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

//查询入款通道商户信息下拉列表
export function getOptionsList(data) {
  return request({
    url: '/system/fund/mch-info/dp-options',
    method: 'get',
    params: data
  })
}

//查询出款款通道商户信息下拉列表
export function getOptionsWDList(data) {
  return request({
    url: '/system/fund/mch-info/wd-options',
    method: 'get',
    params: data
  })
}

//新增商户出款通道
export function addChannelWithdraw(data) {
  return request({
    url: '/system/fund/mch-channel/withdraw/add',
    method: 'post',
    data: data
  })
}

//修改商户出款通道
export function editChannelWithdraw(data) {
  return request({
    url: '/system/fund/mch-channel/withdraw/edit',
    method: 'put',
    data: data
  })
}

//分页查询商户出款通道
export function getWithdrawListByPage(data) {
  return request({
    url: '/system/fund/mch-channel/withdraw/page',
    method: 'get',
    params: data
  })
}

//获取商户出款通道详细信息
export function getDetailWithdraw(data) {
  return request({
    url: '/system/fund/mch-channel/withdraw/'+data,
    method: 'get'
  })
}

//新增入款通道分配
export function getDpWayAssignAdd(data) {
  return request({
    url: '/system/fund/dp-way-assign/add',
    method: 'post',
    data:data
  })
}

//删除入款通道分配
export function getDpWayAssignDelete(data) {
  return request({
    url: '/system/fund/dp-way-assign/delete/'+data,
    method: 'delete'
  })
}

//编辑入款通道分配
export function getDpWayAssignEdit(data) {
  return request({
    url: '/system/fund/dp-way-assign/edit',
    method: 'put',
    data:data
  })
}

//查询入款通道分配
export function getDpWayAssignList(data) {
  return request({
    url: '/system/fund/dp-way-assign/list',
    method: 'get',
    data:data
  })
}

//新增出款方式分配
export function getWdWayAssignAdd(data) {
  return request({
    url: '/system/fund/wd-way-assign/add',
    method: 'post',
    data:data
  })
}

//删除出款方式分配
export function getWdWayAssignDelete(data) {
  return request({
    url: '/system/fund/wd-way-assign/delete/'+data,
    method: 'delete'
  })
}

//编辑出款方式分配
export function getWdWayAssignEdit(data) {
  return request({
    url: '/system/fund/wd-way-assign/edit',
    method: 'put',
    data:data
  })
}

//查询出款方式分配
export function getWdWayAssignList(data) {
  return request({
    url: '/system/fund/wd-way-assign/list',
    method: 'get',
    data:data
  })
}

