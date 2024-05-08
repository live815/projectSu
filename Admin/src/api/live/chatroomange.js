import request from "@/utils/request";

// 会员禁言分页查询
export function getbanRecordList(data) {
  return request({
    url: "/system/member/banLog/list",
    method: "post",
    data: data,
  });
}
// 编辑会员禁言
export function editbanRecordList(data) {
  return request({
    url: "/system/member/banLog/update",
    method: "put",
    data: data,
  });
}
// 批量解禁会员禁言
export function leftbanRecordList(data) {
  return request({
    url: "/system/member/banLog/batchUntie",
    method: "post",
    data: data,
  });
}
//查询敏感词屏蔽记录列表
export function getSensitList(data) {
  return request({
    url: "/system/word/shielded/log/list",
    method: "get",
    params: data,
  });
}
// 新增聊天室配置
export function getChatroomConfig(data) {
  return request({
    url: "/system/chatroom/config/list",
    method: "get",
    params: data,
  });
}
//修改聊天室配置
export function addChatroomConfig(data) {
  return request({
    url: "/system/chatroom/config/save",
    method: "post",
    data: data,
  });
}
// 新增敏感词
export function addSensitiveWord(data) {
  return request({
    url: "/system/sensitive/word/info/save",
    method: "post",
    data: data,
  });
}
//查询敏感词
export function getSensitiveList(data) {
  return request({
    url: "/system/sensitive/word/info/list",
    method: "get",
    params: data,
  });
}
// 删除敏感词配置
export function delSensitive(ids) {
  return request({
    url: "/system/sensitive/word/info/delete/" + ids,
    method: "delete",
  });
}
