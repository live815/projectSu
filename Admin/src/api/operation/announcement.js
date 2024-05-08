import request from "@/utils/request";

// 获取公告列表
export const getAnnouncementListApi = (data) => {
  return request({
    url: "/system/information/announcement/list",
    method: "post",
    data,
  });
};

// 新增公告
export const addAnnouncementApi = (data) => {
  return request({
    url: "/system/information/announcement/add",
    method: "post",
    data,
  });
};

// 删除公告
export const deleAnnouncementApi = (id) => {
  return request({
    url: `/system/information/announcement/delete/${id}`,
    method: "delete",
  });
};

// 查询单个公告
export const getAnnouncementApi = (id) => {
  return request({
    url: `/system/information/announcement/getInfo/${id}`,
    method: "get",
  });
};

// 编辑修改公告
export const editAnnouncementApi = (data) => {
  return request({
    url: `/system/information/announcement/edit`,
    method: "put",
    data,
  });
};

// 禁用公告
export const updateAnnouncementStatusApi = (data) => {
  return request({
    url: `/system/information/announcement/updateStatus`,
    method: "put",
    data,
  });
};
// 获取站内信列表
export const getLetterListApi = (data) => {
  return request({
    url: `/system/information/letter/list`,
    method: "post",
    data,
  });
};

// 新增站内信
export const addLetterListApi = (data) => {
  return request({
    url: `/system/information/letter/save`,
    method: "post",
    data,
  });
};

// 查询站内信详情
export const getLetterApi = (id) => {
  return request({
    url: `/system/information/letter/detail/${id}`,
    method: "get",
  });
};
