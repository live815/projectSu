// 收货地址
import service from '@/utils/request'

// 会员收货地址删除
export function getDeleteAddress(id) {
  return service({
    url: `/api/member/address/delete/${id}`,
    method: 'delete',
  })
}

// 会员收货地址查询
export function getAddressList() {
  return service({
    url: '/api/member/address/list',
    method: 'get',
    
  })
}

// 会员收货地址保存
export function getAddressSave(data) {
  return service({
    url: '/api/member/address/save',
    method: 'post',
    data
  })
}

// 会员收货地址修改
export function getAddressUpdate(data) {
  return service({
    url: '/api/member/address/update',
    method: 'post',
    data
  })
}
