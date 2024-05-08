import request from "@/utils/request";

// 推广素材内容管理-查询
export function inquireMaterialListApi(data) {
  return request({
    url: `/system/agent/promotion/content/list`,
    method: "POST",
    data,
  });
}

// 推广素材内容管理 禁用或者开启 1开启 0禁用
export function enableOrDisableApi(data) {
  return request({
    url: `/system/agent/promotion/content/ban`,
    method: "put",
    data,
  });
}

// 推广素材内容管理-删除
export function deleteMaterialApi(id) {
  return request({
    url: `/system/agent/promotion/content/delete/${id}`,
    method: "delete",
  });
}

// 推广素材内容管理-新增
export function newMaterialApi(data) {
  return request({
    url: `/system/agent/promotion/content/save`,
    method: "post",
    data,
  });
}

// 推广素材内容管理-编辑-全字段
export function editMaterialApi(data) {
  return request({
    url: `/system/agent/promotion/content/update`,
    method: "put",
    data,
  });
}

// 代理推广域名管理-查询
export function domainManagementApi(data) {
  return request({
    url: `/system/agent/promotion/domain/list`,
    method: "post",
    data,
  });
}

//代理推广域名管理 禁用或者开启 1开启 0禁用
export function domainNameStatusApi(data) {
  return request({
    url: `/system/agent/promotion/domain/ban`,
    method: "put",
    data,
  });
}

//代理推广域名管理-删除
export function deleteDomainNameApi(id) {
  return request({
    url: `/system/agent/promotion/domain/delete/${id}`,
    method: "delete",
  });
}

//代理推广域名管理-新增
export function addProxyDomainNameApi(data) {
  return request({
    url: `/system/agent/promotion/domain/save`,
    method: "post",
    data,
  });
}

//代理推广域名管理-编辑-全字段
export function editProxyDomainNameApi(data) {
  return request({
    url: `/system/agent/promotion/domain/update`,
    method: "put",
    data,
  });
}

// 短域名

// 代理短链接-查询
export function getShortUrlList(data) {
  return request({
    url: `/system/agent/promotion/domain/getShortDomainList`,
    method: "post",
    data,
  });
}

// 代理短链接-新增
export function AddShortUrlApi(data) {
  return request({
    url: `/system/agent/promotion/domain/addShortDomain`,
    method: "post",
    data,
  });
}
// 代理短链接-删除
export function delShortUrlApi(id) {
  return request({
    url: `/system/agent/promotion/domain/deleteShortDomain/${id}`,
    method: "delete",
  });
}

//代理短域名管理 禁用或者开启 1开启 0禁用
export function updateShortUrlStatusApi(data) {
  return request({
    url: `/system/agent/promotion/domain/editShortDomainStatusById`,
    method: "put",
    data,
  });
}

//代理短域名管理-编辑-全字段
export function editshortUrleApi(data) {
  return request({
    url: `/system/agent/promotion/domain/updateShortDomain`,
    method: "put",
    data,
  });
}

//域名池
//代理域名池-查询
export function queryProxyDomainNamePoolApi(data) {
  return request({
    url: `/system/agent/promotion/domain/getDomainPoolList`,
    method: "post",
    data,
  });
}
//代理域名池-新增
export function addedProxyDomainNamePoolApi(data) {
  return request({
    url: `/system/agent/promotion/domain/addDomainPool`,
    method: "post",
    data,
  });
}
//批量保存域名池
export function saveDomainNamePoolInBatchesApi(data) {
  return request({
    url: `/system/agent/promotion/domain/batchDomainPoolSave`,
    method: "post",
    data,
  });
}
// 代理域名池-删除
export function deleteProxyDomainNamePoolApi(id) {
  return request({
    url: `/system/agent/promotion/domain/deleteDomainPool/${id}`,
    method: "delete",
  });
}
//代理域名池 开启或者关闭 1开启 0关闭
export function proxyDomainNamePoolSwitchApi(data) {
  return request({
    url: `/system/agent/promotion/domain/editDomainPoolStatusById`,
    method: "put",
    data,
  });
}
//代理域名池-编辑-全字段
export function editProxyDomainNamePoolApi(data) {
  return request({
    url: `/system/agent/promotion/domain/updateDomainPool`,
    method: "put",
    data,
  });
}
