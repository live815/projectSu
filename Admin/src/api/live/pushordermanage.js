import request from "@/utils/request";

// 推单管理查询
export function getOrderManageList(data) {
  return request({
    url: "/system/push/order/list",
    method: "get",
    params: data,
  });
}
// 跟单人数查询
export function followOrdersList(data) {
  return request({
    url: "/system/follow/order/list",
    method: "get",
    params: data,
  });
}
