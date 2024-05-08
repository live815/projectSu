import request from '@/utils/request'

//查询会员列表
export function getUserList(data) {
  return request({
    url: '/system/member/user/list',
    method: 'get',
    params:data
  })
}

//获取国家编码信息列表
export function getCountrycodeList(data) {
  return request({
    url: '/system/countrycode/list-info',
    method: 'get',
    params:data
  })
}

//会员状态更新
export function updateMemberStatus(data) {
  return request({
    url: '/system/member/user/updateStatus',
    method: 'post',
    data:data
  })
}

//查询会员详细信息
export function getMemberInfo(data) {
  return request({
    url: '/system/member/user/getInfo',
    method: 'post',
    data:data
  })
}

//提交编辑会员指定字段信息申请
export function updateField(data) {
  return request({
    url: '/system/member/user/field',
    method: 'post',
    data:data
  })
}

//修改会员信息
export function updateMemberUserEdit(data) {
  return request({
    url: '/system/member/user/edit',
    method: 'post',
    data:data
  })
}

//获取会员与转账场馆余额，包含中心钱和提现冻结钱包余额
export function getFundWallet(data) {
  return request({
    url: '/system/fund/wallet/getMemberWallet/'+data,
    method: 'post'
  })
}

//获取会员个人充提信息
export function getdepositAndWithdraw(data) {
  return request({
    url: '/system/fund/memberReport/depositAndWithdraw/'+data,
    method: 'get'
  })
}

//获取会员个人提现流水信息
export function getMemberReport(data) {
  return request({
    url: '/system/fund/memberReport/withdrawBetRequest/'+data,
    method: 'get'
  })
}

//获取会员投注信息
export function getMemberBetInfo(data) {
  return request({
    url: '/system/fund/account/transaction/memberBetInfo',
    method: 'get',
    params:data
  })
}

//查询会员游戏平台top3的统计数据
export function getMemberLobbyDataSumTop3(data) {
  return request({
    url: '/system/report/game/queryMemberLobbyDataSumTop3',
    method: 'post',
    data:data
  })
}

//财务信息转入
export function transferIn(data) {
  return request({
    url: '/system/fund/wallet/transferIn',
    method: 'post',
    data:data
  })
}

//财务信息一键回收
export function collectWallet(data) {
  return request({
    url: '/system/fund/wallet/collectWallet/'+data,
    method: 'post'
  })
}

//财务信息一键回收
export function getLoginlogList(data) {
  return request({
    url: '/system/member/loginlog/list',
    method: 'get',
    params:data
  })
}

//查询会员操作日志列表
export function getOperlogList(data) {
  return request({
    url: '/system/member/operlog/list',
    method: 'get',
    params:data
  })
}

//查询会员账号详情变更记录列表（后台操作记录）
export function getOperlogBackList(data) {
  return request({
    url: '/system/member/backendlog/changeListByName',
    method: 'get',
    params:data
  })
}

//查询某个会员禁言记录列表
export function getBanlogList(data) {
  return request({
    url: '/system/member/banLog/memberList',
    method: 'post',
    data
  })
}

//查询会员异常记录列表
export function getVipLogList(data) {
  return request({
    url: '/system/member/vipLog/memberList',
    method: 'get',
    params:data
  })
}

//查询某一个会员VIP变更列表
export function getExceplogList(data) {
  return request({
    url: '/system/member/excelog/list',
    method: 'get',
    params:data
  })
}

//查询会员称号记录列表
export function getTitlelogList(data) {
  return request({
    url: '/system/member/titlelog/list',
    method: 'get',
    params:data
  })
}

//查询会员备注列表
export function getRemarkList(data) {
  return request({
    url: '/system/member/remark/list',
    method: 'post',
    data:data
  })
}

//新增会员备注信息
export function addRemarkList(data) {
  return request({
    url: '/system/member/remark/add',
    method: 'post',
    data:data
  })
}

//玩家标签相关接口
//查询会员标签列表
export function getLabelList(data) {
  return request({
    url: '/system/label/list',
    method: 'get',
    params:data
  })
}

//新增会员标签
export function addLabel(data) {
  return request({
    url: '/system/label/add',
    method: 'post',
    data:data
  })
}

//修改会员标签
export function editLabel(data) {
  return request({
    url: '/system/label/edit',
    method: 'put',
    data:data
  })
}

//删除会员标签
export function deleteLabel(data) {
  return request({
    url: '/system/label/remove/'+data,
    method: 'delete'
  })
}

//获取会员标签详细信息
export function getDetailLabel(data) {
  return request({
    url: '/system/label/getInfo/'+data,
    method: 'get'
  })
}

//获取会员关联的标签列表
export function getRelationLabel(data) {
  return request({
    url: '/system/label/member/'+data,
    method: 'get'
  })
}

//获取标签选择框列表
export function getLabelSelect(data) {
  return request({
    url: '/system/label/member/optionSelect',
    method: 'get',
    params:data
  })
}

//查询标签的所有会员
export function getMemberByLabelId(data) {
  return request({
    url: '/system/label/selectMemberByLabelId',
    method: 'post',
    data:data
  })
}

//标签禁启用
export function startOrDisableStatus(data) {
  return request({
    url: '/system/label/updateStatus',
    method: 'post',
    data:data
  })
}

//修改详情会员标签集合
export function updateLabelMember(data) {
  return request({
    url: '/system/member/user/updateLabel',
    method: 'post',
    data:data
  })
}

//玩家限制接口
//查询会员限制记录日志列表
export function getBlockLogList(data) {
  return request({
    url: '/system/member/blocklog/list',
    method: 'get',
    params:data
  })
}

//修改会员限制状态
export function updateBlockLogStatus(id) {
  return request({
    url: `/system/member/blocklog/updateStatus/${id}`,
    method: 'get'
  })
}

//批量会员限制状态
export function updateBlockLogStatusBatch(ids) {
  return request({
    url: `/system/member/blocklog/updateStatusBatch`,
    method: 'post',
    data:ids
  })
}

//获取会员充值订单列表
export function getListForMember(data) {
  return request({
    url: '/system/fund/deposit/order/listForMember',
    method: 'get',
    params:data
  })
}

//获取会员总充值
export function getMemberTotalMember(data) {
  return request({
    url: '/system/fund/deposit/order/member/total/amount',
    method: 'get',
    params:data
  })
}

//获取会员提款订单列表
export function getListForMemberDeposit(data) {
  return request({
    url: '/system/fund/withdrawl/order/listForMember',
    method: 'get',
    params:data
  })
}

//获取会员总提款
export function getMemberTotalDeposit(data) {
  return request({
    url: '/system/fund/withdrawl/order/member/total/amount',
    method: 'get',
    params:data
  })
}

//重置会员短信次数
export function memberRestVerifyCode(data) {
  return request({
    url: `/system/member/user/restVerifyCode/${data}`,
    method: 'get'
  })
}

//后台会员踢下线
export function memberKickOffline(data) {
  return request({
    url: `/system/member/user/kickOffline`,
    method: 'get',
    params:data
  })
}