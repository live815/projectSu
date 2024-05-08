import request from "@/utils/request";

// 礼物管理分页查询
export function getGiftList(data) {
  return request({
    url: "/system/gift/list",
    method: "get",
    params: data,
  });
}
// 新增礼物管理
export function addGiftList(data) {
  return request({
    url: "/system/gift/save",
    method: "post",
    data: data,
  });
}
// 编辑礼物管理
export function editGiftList(data) {
  return request({
    url: "/system/gift/update",
    method: "put",
    data: data,
  });
}

// 删除礼物管理
export function delGiftList(ids) {
  return request({
    url: "/system/gift/delete/" + ids,
    method: "delete",
  });
}
// 礼物收益分页查询
export function getGiftIncome(data) {
  return request({
    url: "/system/gift/profit/list",
    method: "get",
    params: data,
  });
}
// 编辑礼物收益分页查询
export function editGiftIncome(data) {
  return request({
    url: "/system/gift/profit/update",
    method: "put",
    data: data,
  });
}
