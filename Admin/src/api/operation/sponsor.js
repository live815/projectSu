// 赞助配置相关接口
import request from "@/utils/request";

// 赞助新增
export const addSponsorApi = (data) => {
  return request({
    url: "system/sponsor/config/save",
    method: "post",
    data,
  });
};

// 赞助删除
export const deleteSponsorApi = (id) => {
  return request({
    url: `system/sponsor/config/delete/${id}`,
    method: "delete",
  });
};

// 查询赞助配置列表
export const getSponsorApi = (data) => {
  return request({
    url: `system/sponsor/config/list`,
    method: "post",
    data
  });
};

// 赞助编辑
export const editSponsorApi = (data) => {
  return request({
    url: `system/sponsor/config/update`,
    method: "put",
    data,
  });
};

// 赞助禁用或者开启 1开启 0禁用
export const getSponsorStatusApi = (data) => {    
  return request({
    url: "system/sponsor/config/status",
    method: "put",
    data,
  });
};


// 赞助详情
export const getSponsorDetailsApi = (id) => {
  return request({
    url: `system/sponsor/config/detail/${id}`,
    method: "get",
  });
};
