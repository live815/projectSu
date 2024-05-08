import request from "@/utils/request";

//报表管理-充值商户列表
export function getMchNameInfoList(data) {
  return request({
    url: "/system/report/member/queryMchNameInfoAllReport",
    method: "post",
    data: data,
  });
}

//报表管理-查所有的商户下拉列表
export function getMchNamesSelect(data) {
  return request({
    url: "/system/report/member/queryMchNames",
    method: "get",
    params: data,
  });
}

//报表管理-充值商户柱形图
export function getMchNameBar(data) {
  return request({
    url: "/system/report/member/queryMchNameAmountReport",
    method: "post",
    data: data,
  });
}

//报表管理-充值商户饼形图
export function getMchNamePie(data) {
  return request({
    url: "/system/report/member/queryMchNameAmountPerReport",
    method: "post",
    data: data,
  });
}

//报表管理-充值类型-查询所有充值方式下拉
export function getChannelTypeNames(data) {
  return request({
    url: "/system/report/member/queryChannelTypeNames",
    method: "get",
    params: data,
  });
}

//报表管理-充值类型-充值总金额-柱状图
export function getChannelTypeNameAmountReport(data) {
  return request({
    url: "/system/report/member/queryChannelTypeNameAmountReport",
    method: "post",
    data: data,
  });
}

//报表管理-充值类型-充值方式占比-饼图
export function getAmountPerReport(data) {
  return request({
    url: "/system/report/member/queryChannelTypeNameAmountPerReport",
    method: "post",
    data: data,
  });
}

//报表管理-充值类型-vip等级占比-饼图
export function getVipLevelAmountPerReport(data) {
  return request({
    url: "/system/report/member/queryVipLevelAmountPerReport",
    method: "post",
    data: data,
  });
}

//报表管理-充值类型-充值渠道列表统计
export function getChannelTypeNameInfoAllReport(data) {
  return request({
    url: "/system/report/member/queryChannelTypeNameInfoAllReport",
    method: "post",
    data: data,
  });
}
