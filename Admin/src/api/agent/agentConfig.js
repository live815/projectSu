import request from "@/utils/request";

// 佣金配置-查询
export function getCommissonListApi() {
  return request({
    url: `/system/agent/config/commission/list`,
    method: "get",
  });
}

// 佣金算法配置-查询
export function getCommissonMethodListApi() {
  return request({
    url: `/system/agent/config/commission/math/list`,
    method: "get",
  });
}
// 佣金算法名称编辑
export function editmathMethodApi(data) {
  return request({
    url: `/system/agent/config/commission/math/update`,
    method: "put",
    data,
  });
}

// 佣金配置-编辑-不含场馆费率
export function editCommissonMethodApi(data) {
  return request({
    url: `/system/agent/config/commission/update`,
    method: "put",
    data,
  });
}

// 佣金配置-编辑-场馆费率
export function editVenueRateApi(data) {
  return request({
    url: `/system/agent/config/commission/update/venue`,
    method: "put",
    data,
  });
}

// 佣金配置-新增
export function addMethodApi(data) {
  return request({
    url: `/system/agent/config/commission/save`,
    method: "post",
    data,
  });
}

// 代理查询场馆费率列表
export function getVenueList() {
  return request({
    url: `/system/agent/config/getGameLobbyList`,
    method: "get",
  });
}

// 删除佣金配置
export function delMethodApi(id) {
  return request({
    url: `/system/agent/config/commission/delete/${id}`,
    method: "delete",
  });
}

// 查询代理相关配置
export function getAgentRelation() {
  return request({
    url: `/system/agent/config/common/relation/list`,
    method: "get",
  });
}

// 编辑代理相关配置

export function updateAgentRelation(data) {
  return request({
    url: `/system/agent/config/common/relation/update`,
    method: "put",
    data,
  });
}

// 提现方式配置-查询
export function getWithdrawWayApi() {
  return request({
    url: `/system/agent/config/common/type/list`,
    method: "get",
  });
}

// 提现方式配置-编辑
export function updateWithdrawWayApi(data) {
  return request({
    url: `/system/agent/config/common/type/update`,
    method: "put",
    data,
  });
}

// 代存配置-查询
export function getDepositConfigApi() {
  return request({
    url: `/system/agent/config/common/deposit/list`,
    method: "get",
  });
}

// 代存配置-编辑
export function updateDepositConfigApi(data) {
  return request({
    url: `/system/agent/config/common/deposit/update`,
    method: "put",
    data,
  });
}

// 提现汇率配置-查询
export function getWithdrawRateApi() {
  return request({
    url: `/system/agent/config/common/rate/list`,
    method: "get",
  });
}

// 提现汇率配置-编辑
export function updateWithdrawRateApi(data) {
  return request({
    url: `/system/agent/config/common/rate/update`,
    method: "put",
    data,
  });
}
