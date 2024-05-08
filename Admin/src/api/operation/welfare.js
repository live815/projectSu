// 福利相关接口
import request from "@/utils/request";

// 查询福利记录列表
export const getWelfareListApi = (data) => {
  return request({
    url: "system/welfare/record/list",
    method: "post",
    data,
  });
};

// 红利审核
export const editWelfareApi = (data) => {
  return request({
    url: "system/welfare/config/edit",
    method: "put",
    data,
  });
};

// 查询福利审核记录列表
export const getWelfareApi = (data) => {
  return request({
    url: `system/welfare/config/list`,
    method: "post",
    data
  });
};

//查询发放会员账号列表
export const getWelfareConfigApi = (id) => {
  return request({
    url: `system/welfare/config/list/${id}`,
    method: "get",
  });
};

// 红利审核新增
export const addWelfareApi = (data) => {
  return request({
    url: `system/welfare/config/save`,
    method: "post",
    data,
  });
};

// 活动相关接口
// 活动禁用或者开启 1开启 0禁用
export const getActivityBanApi = (data) => {
  return request({
    url: "system/activity/config/ban",
    method: "put",
    data,
  });
};

// 活动删除
export const deleteActivityApi = (id) => {
  return request({
    url: `system/activity/config/delete/${id}`,
    method: "delete",
  });
};

// 查询活动配置列表
export const getActivityApi = (data) => {
  return request({
    url: `system/activity/config/list`,
    method: "post",
    data
  });
};

// 广告编辑
export const editActivityApi = (data) => {
  return request({
    url: `system/activity/config/update`,
    method: "put",
    data,
  });
};


// 查询活动-代理线内容-量级10万
export const getActivityDetailsApi = (id) => {
  return request({
    url: `system/activity/config/list/${id}`,
    method: "get",
  });
};
