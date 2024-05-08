import request from "@/utils/request";

//帮助中心分类问题-查询
export function queryCategoryApi(data) {
  return request({
    url: `/system/agent/config/classify/list`,
    method: "post",
    data,
  });
}
//帮助中心分类问题-新增
export function addNewCategoryApi(data) {
  return request({
    url: `/system/agent/config/classify/save`,
    method: "post",
    data,
  });
}
//帮助中心分类问题-删除
export function deleteCategoryApi(id) {
  return request({
    url: `/system/agent/config/classify/delete/${id}`,
    method: "delete",
  });
}
//帮助中心分类问题-编辑
export function editCategoryApi(data) {
  return request({
    url: `/system/agent/config/classify/update`,
    method: "put",
    data,
  });
}

//帮助中心-删除
export function deleteHelpCenterApi(id) {
  return request({
    url: `/system/agent/config/help/delete/${id}`,
    method: "delete",
  });
}
//帮助中心-查询
export function queryHelpCenterApi(data) {
  return request({
    url: `/system/agent/config/help/list`,
    method: "post",
    data,
  });
}
//帮助中心-新增
export function addedHelpCenterApi(data) {
  return request({
    url: `/system/agent/config/help/save`,
    method: "post",
    data,
  });
}
//帮助中心-编辑
export function editHelpCenterApi(data) {
  return request({
    url: `/system/agent/config/help/update`,
    method: "put",
    data,
  });
}

//帮助中心-查询问题分类
export function questionCategoryApi(data) {
  return request({
    url: `/system/agent/config/help/classify/list`,
    method: "post",
    data,
  });
}

//

//获取代理详细信息
export function getAgentDetailsApi(id) {
  return request({
    url: `/system/agent/notice/config/getAgentNoticeDetail/${id}`,
    method: "get",
  });
}
//删除代理公告
export function deleteAgentAnnouncementApi(idList) {
  return request({
    url: `/system/agent/notice/config/delete/${idList}`,
    method: "delete",
  });
}
//查询代理公告列表
export function queryAgentAnnouncementListApi(data) {
  return request({
    url: `/system/agent/notice/config/getNoticeList`,
    method: "post",
    data,
  });
}
//新增代理公告
export function newAgentAnnouncementApi(data) {
  return request({
    url: `/system/agent/notice/config/save`,
    method: "post",
    data,
  });
}
//公告发送
export function announcementSentApi(id) {
  return request({
    url: `/system/agent/notice/config/sendNotice/${id}`,
    method: "get",
  });
}
//修改代理公告
export function modifyAgentAnnouncementApi(data) {
  return request({
    url: `/system/agent/notice/config/update`,
    method: "put",
    data,
  });
}
