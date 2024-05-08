import request from "@/utils/request";

// 添加教程或关于我们文档
export const addTutorialOrAboutApi = (data) => {
  return request({
    url: "system/tutorial/config/add",
    method: "post",
    data,
  });
};

// 查询教程或关于我们文档
export const getTutorialOrAboutApi = (data) => {
  return request({
    url: "system/tutorial/config/list",
    method: "post",
    data,
  });
};

export function getChildLit(data) {
  return request({
    url: "/game/game/lobby/list",
    method: "post",
    data: data,
  });
}

export function getFeedbackApi(data) {
  return request({
    url: "system/advice/config/list",
    method: "post",
    data: data,
  });
}

// 增加选项
export function addConfigApi(data) {
  return request({
    url: "system/tutorial/item/add",
    method: "post",
    data: data,
  });
}

//编辑选项
export function editConfigApi(data) {
  return request({
    url: "system/tutorial/item/edit",
    method: "put",
    data: data,
  });
}

//删除选项
export function deleConfigApi(id) {
  return request({
    url: `system/tutorial/item/delete/${id}`,
    method: "delete",
  });
}
