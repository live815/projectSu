import request from "@/utils/request";

//好友推荐查询（首存奖励配置查询）
export function queryInviteDepConfig(data) {
  return request({
    url: "/system/invite/queryInviteDepConfig",
    method: "get",
    params: data,
  });
}

//好友推荐保存（首存奖励配置保存）
export function saveInviteDepConfig(data) {
  return request({
    url: "/system/invite/saveInviteDepConfig",
    method: "POST",
    data,
  });
}

// 流水分成配置查询
export function queryInviteBetConfig(data) {
  return request({
    url: "/system/invite/queryInviteBetConfig",
    method: "get",
    params: data,
  });
}

// 流水奖励列表查询
export function queryBetAwardList(data) {
  return request({
    url: "/system/invite/queryBetAwardList",
    method: "get",
    params: data,
  });
}

// 查询邀请连接列表
export function queryInviteUrlList(data) {
  return request({
    url: "/system/Invite/queryInviteUrlList",
    method: "POST",
    data,
  });
}

// 邀请人列表查询
export function queryInviteList(data) {
  return request({
    url: "/system/invite/queryInviteList",
    method: "get",
    params: data,
  });
}

// 邀请人状态修改
export function updateInviteStatus(data) {
  return request({
    url: "/system/invite/updateInviteStatus",
    method: "get",
    params: data,
  });
}

// 受邀人列表查询
export function queryInviteSubList(data) {
  return request({
    url: "/system/invite/queryInviteSubList",
    method: "get",
    params: data,
  });
}

// 查询累计邀请玩家列表
export function querySubNameList(data) {
  return request({
    url: "/system/Invite/querySubNameList",
    method: "get",
    params: data,
  });
}

// 流水分成配置查询
export function queryInviteVipConfig(data) {
  return request({
    url: "/system/invite/queryInviteVipConfig",
    method: "post",
    data,
  });
}

// 流水分成配置保存
export function saveInviteBetConfig(data) {
  return request({
    url: "/system/invite/saveInviteBetConfig",
    method: "post",
    data,
  });
}

// 流水礼金提现倍数配置保存
export function saveInviteBetDraw(data) {
  return request({
    url: "/system/invite/saveInviteBetDraw",
    method: "get",
    params: data,
  });
}

// 好友vip奖励配置保存
export function saveInviteVipConfig(data) {
  return request({
    url: "/system/invite/saveInviteVipConfig",
    method: "post",
    data,
  });
}

// 一审待审核列表查询
export function querySubFirstList(data) {
  return request({
    url: "/system/invite/queryInviteSubFirstList",
    method: "get",
    params: data,
  });
}

// 二审待审核列表查询
export function querySubSecondList(data) {
  return request({
    url: "/system/invite/queryInviteSubSecondList",
    method: "get",
    params: data,
  });
}

// 已审核列表查询
export function querySubFinalList(data) {
  return request({
    url: "/system/invite/queryInviteSubFinalList",
    method: "get",
    params: data,
  });
}

// 邀请好友关系解绑申请
export function unbindStatusApply(data) {
  return request({
    url: "/system/invite/reviewUnbindStatusApply",
    method: "post",
    data,
  });
}

// 邀请好友关系解绑一审
export function unbindStatusFirst(data) {
  return request({
    url: "/system/invite/reviewUnbindStatusFirst",
    method: "post",
    data,
  });
}

// 邀请好友关系解绑二审
export function unbindStatusFinal(data) {
  return request({
    url: "/system/invite/reviewUnbindStatusFinal",
    method: "post",
    data,
  });
}