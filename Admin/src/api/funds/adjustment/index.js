import request from "@/utils/request";

//新增资金调整订单
export function addAdjustment(data) {
  return request({
    url: "/system/fund/adjustment/add",
    method: "post",
    data: data,
  });
}

//批量新增资金调整订单
export function multipleAddAdjustment(data) {
  return request({
    url: "/system/fund/adjustment/batch-add",
    method: "post",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
