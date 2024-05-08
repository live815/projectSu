import request from '@/utils/request'

//查询手机区号管理列表
export function getCountrycodeList(data) {
  return request({
    url: '/system/countrycode/list',
    method: 'get',
    params:data
  })
}

//新增手机区号管理
export function addCountrycode(data) {
  return request({
    url: '/system/countrycode/add',
    method: 'post',
    data:data
  })
}

//修改手机区号管理
export function editCountrycode(data) {
  return request({
    url: '/system/countrycode/edit',
    method: 'put',
    data:data
  })
}

//修改手机区号管理状态
export function changeCountrycodeStatus(data) {
  return request({
    url: '/system/countrycode/changeStatus',
    method: 'put',
    data:data
  })
}

//ID查询单个手机区号管理详情
export function getInfo(data) {
  return request({
    url: '/system/countrycode/getInfo/'+data,
    method: 'get',
  })
}

//查询会员验证码记录列表
export function getVercodeList(data) {
  return request({
    url: '/system/vercodelog/list',
    method: 'post',
    data:data
  })
}