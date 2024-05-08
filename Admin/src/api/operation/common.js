import request from "@/utils/request";

// 获取教程列表（一级菜单）
export const getTutorialListApi = (data) => {
  return request({
    url: `/system/tutorial/config/list`,
    method: "post",
    data,
  });
};

// 删除教程
export const deleTutorialApi = (id) => {
  return request({
    url: `/system/tutorial/config/delete/${id}`,
    method: "delete",
  });
};
// 编辑教程
export const editTutorialApi = (data) => {
  return request({
    url: `/system/tutorial/config/edit`,
    method: "put",
    data,
  });
};

// 新增教程
export const addTutorialApi = (data) => {
  return request({
    url: `/system/tutorial/config/add`,
    method: "post",
    data,
  });
};

// 获取选项（二级菜单）
export const getConfigApi = (tuId) => {
  return request({
    url: `/system/tutorial/item/list/${tuId}`,
    method: "get",
  });
};
// 新增选项
export const addOptionsApi = (data) => {
  return request({
    url: `/system/api/tutorial/config/item/add`,
    method: "post",
    data,
  });
};
