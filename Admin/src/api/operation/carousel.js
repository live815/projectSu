import request from "@/utils/request";

// 广告禁用或者开启 1开启 0禁用
export const getAdvertisingntListApi = (data) => {
  return request({
    url: "system/advertise/config/ban",
    method: "put",
    data,
  });
};

// 广告新增
export const addAdvertisingntApi = (data) => {
  return request({
    url: "system/advertise/config/save",
    method: "post",
    data,
  });
};

// 广告删除
export const deleteAdvertisingntApi = (id) => {
  return request({
    url: `system/advertise/config/delete/${id}`,
    method: "delete",
  });
};

// 查询广告配置列表
export const getAdvertisingntApi = (data) => {
  return request({
    url: `system/advertise/config/list`,
    method: "post",
    data
  });
};

// 广告编辑
export const editAdvertisingntApi = (data) => {
  return request({
    url: `system/advertise/config/update`,
    method: "put",
    data,
  });
};


// 查询广告配置-会员账号内容-量级10万
export const getAdvertisingntDetailsApi = (id) => {
  return request({
    url: `system/advertise/config/list/${id}`,
    method: "get",
  });
};


// 查询当前开启的活动
export const getAdvertisingntListTitleApi = () => {
  return request({
    url: `system/advertise/config/activity/list`,
    method: "get",
  });
};